// app.js - W杯2026 試合日程＆お気に入り確認ロジック

document.addEventListener("DOMContentLoaded", () => {
  // Load data from global W杯Data
  const { TEAMS, GROUP_STAGE_MATCHES, KNOCKOUT_MATCHES } = window.W杯Data;

  // State
  let favorites = JSON.parse(localStorage.getItem("wc_favorites")) || [];
  let activeTab = "schedule";
  let activeStageFilter = "all";
  let activeGroupFilter = "all";
  let searchFilter = "";
  let showJapanOnly = false;

  // DOM Elements
  const tabs = document.querySelectorAll(".nav-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const stageFilterEl = document.getElementById("stage-filter");
  const groupFilterEl = document.getElementById("group-filter");
  const groupFilterContainer = document.getElementById("group-filter-container");
  const teamSearchEl = document.getElementById("team-search");
  const japanFilterBtn = document.getElementById("japan-filter-btn");
  
  const matchesList = document.getElementById("matches-list");
  const favoritesList = document.getElementById("favorites-list");
  const statsFavCount = document.getElementById("stats-fav-count");

  // --- COUNTDOWN TIMER ---
  const openingTime = new Date("2026-06-12T04:00:00+09:00").getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = openingTime - now;
    
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-mins");
    const secsEl = document.getElementById("cd-secs");
    
    if (diff <= 0) {
      document.getElementById("countdown-card").innerHTML = `
        <div class="countdown-label" style="color: #00ff87"><i class="fa-solid fa-circle-play"></i> 大会進行中</div>
        <div class="countdown-timer" style="font-size: 20px; font-weight: 800; color: #fff; padding: 4px 0;">
          FIFA ワールドカップ 2026 開幕！
        </div>
      `;
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(minutes).padStart(2, "0");
    secsEl.textContent = String(seconds).padStart(2, "0");
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // --- TAB NAVIGATION ---
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));
      
      tab.classList.add("active");
      activeTab = tab.dataset.tab;
      document.getElementById(`tab-${activeTab}`).classList.add("active");
      
      if (activeTab === "schedule") {
        renderMatchesList();
      } else if (activeTab === "bracket") {
        renderBracket();
      } else if (activeTab === "favorites") {
        renderFavoritesList();
      }
    });
  });

  // --- SAVE & UPDATE FAVORITES ---
  function updateFavoritesStats() {
    statsFavCount.textContent = favorites.length;
  }

  // --- MATCH CARD RENDERING ---
  function createMatchCard(match, isKnockout = false) {
    const isFav = favorites.includes(match.id);
    const teamA = match.teamA;
    const teamB = match.teamB;
    
    const flagA = TEAMS[teamA]?.flag || "🏳️";
    const flagB = TEAMS[teamB]?.flag || "🏳️";
    const isJapanMatch = teamA === "日本" || teamB === "日本";
    
    const card = document.createElement("div");
    card.className = `match-card glass-panel ${isJapanMatch ? "japan-match" : ""}`;
    card.dataset.id = match.id;
    
    let groupLabel = match.group ? `${match.group}組` : match.stage;
    
    card.innerHTML = `
      <div class="match-card-header">
        <span class="match-stage-badge">${groupLabel}</span>
        <span class="match-datetime"><i class="fa-regular fa-clock"></i> ${match.date}(${match.day}) ${match.time}</span>
        <button class="fav-btn ${isFav ? "active" : ""}" title="お気に入り追加"><i class="${isFav ? "fa-solid" : "fa-regular"} fa-star"></i></button>
      </div>
      <div class="match-card-body">
        <div class="team-row" data-team-slot="teamA">
          <div class="team-info">
            <span class="team-flag">${flagA}</span>
            <span class="team-name">${teamA}</span>
          </div>
        </div>
        <div class="vs-divider">VS</div>
        <div class="team-row" data-team-slot="teamB">
          <div class="team-info">
            <span class="team-flag">${flagB}</span>
            <span class="team-name">${teamB}</span>
          </div>
        </div>
      </div>
    `;
    
    // Bind Favorite event
    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(match.id);
    });
    
    return card;
  }

  // Toggle Favorite
  function toggleFavorite(matchId) {
    const index = favorites.indexOf(matchId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(matchId);
    }
    localStorage.setItem("wc_favorites", JSON.stringify(favorites));
    updateFavoritesStats();
    
    // Re-render current tab
    if (activeTab === "schedule") {
      renderMatchesList();
    } else if (activeTab === "favorites") {
      renderFavoritesList();
    }
  }

  // --- RENDER MATCHES SCHEDULE TAB ---
  function renderMatchesList() {
    matchesList.innerHTML = "";
    
    let filteredMatches = [];
    
    // Step 1: Merge stage/group filters
    if (activeStageFilter === "knockout") {
      filteredMatches = [...KNOCKOUT_MATCHES];
    } else if (activeStageFilter === "all") {
      filteredMatches = [...GROUP_STAGE_MATCHES, ...KNOCKOUT_MATCHES];
    } else {
      // Specific group stage
      filteredMatches = GROUP_STAGE_MATCHES.filter(m => m.stage === activeStageFilter);
    }
    
    // Step 2: Apply group filter (only for group stage)
    if (activeStageFilter !== "knockout" && activeGroupFilter !== "all") {
      filteredMatches = filteredMatches.filter(m => m.group === activeGroupFilter);
    }
    
    // Step 3: Apply team search filter
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      filteredMatches = filteredMatches.filter(m => 
        m.teamA.toLowerCase().includes(q) || 
        m.teamB.toLowerCase().includes(q)
      );
    }
    
    // Step 4: Apply Japan filter
    if (showJapanOnly) {
      filteredMatches = filteredMatches.filter(m => m.teamA === "日本" || m.teamB === "日本");
    }
    
    if (filteredMatches.length === 0) {
      matchesList.innerHTML = `
        <div class="empty-state">
          <i class="fa-regular fa-calendar-minus"></i>
          <p>一致する試合日程はありません。検索キーワードやフィルターを変更してください。</p>
        </div>
      `;
      return;
    }
    
    filteredMatches.forEach(match => {
      const isKo = match.id.startsWith("ko-");
      matchesList.appendChild(createMatchCard(match, isKo));
    });
  }

  // --- RENDER FAVORITES TAB ---
  function renderFavoritesList() {
    favoritesList.innerHTML = "";
    
    const favMatches = [...GROUP_STAGE_MATCHES, ...KNOCKOUT_MATCHES].filter(m => favorites.includes(m.id));
    
    if (favMatches.length === 0) {
      favoritesList.innerHTML = `
        <div class="empty-state">
          <i class="fa-regular fa-star"></i>
          <p>お気に入り登録された試合はありません。試合日程カードの星アイコンをクリックして追加してください。</p>
        </div>
      `;
      return;
    }
    
    favMatches.forEach(match => {
      const isKo = match.id.startsWith("ko-");
      favoritesList.appendChild(createMatchCard(match, isKo));
    });
  }

  // --- FILTER CHANGE EVENTS ---
  stageFilterEl.addEventListener("change", (e) => {
    activeStageFilter = e.target.value;
    
    // Hide group filter for knockout stage
    if (activeStageFilter === "knockout") {
      groupFilterContainer.style.display = "none";
    } else {
      groupFilterContainer.style.display = "flex";
    }
    
    renderMatchesList();
  });
  
  groupFilterEl.addEventListener("change", (e) => {
    activeGroupFilter = e.target.value;
    renderMatchesList();
  });
  
  teamSearchEl.addEventListener("input", (e) => {
    searchFilter = e.target.value;
    renderMatchesList();
  });
  
  japanFilterBtn.addEventListener("click", () => {
    showJapanOnly = !showJapanOnly;
    japanFilterBtn.classList.toggle("active", showJapanOnly);
    renderMatchesList();
  });

  // --- RENDER BRACKET VIEW TAB (STATIC) ---
  function renderBracket() {
    const rounds = {
      r32: document.getElementById("bracket-r32"),
      r16: document.getElementById("bracket-r16"),
      qf: document.getElementById("bracket-qf"),
      sf: document.getElementById("bracket-sf"),
      finals: document.getElementById("bracket-finals")
    };

    // Clear all
    Object.values(rounds).forEach(el => { el.innerHTML = ""; });

    // Helper to render a bracket node
    function renderBracketNode(match) {
      const node = document.createElement("div");
      node.className = "bracket-match-node";
      
      const flagA = TEAMS[match.teamA]?.flag || "🏳️";
      const flagB = TEAMS[match.teamB]?.flag || "🏳️";
      
      node.innerHTML = `
        <div class="bracket-match-info">
          <span>No.${match.matchNum} | ${match.date} ${match.time}</span>
        </div>
        <div class="bracket-card">
          <div class="bracket-team-slot placeholder">
            <span>${flagA} ${match.teamA}</span>
          </div>
          <div class="bracket-team-slot placeholder">
            <span>${flagB} ${match.teamB}</span>
          </div>
        </div>
      `;

      return node;
    }

    // Populate columns
    KNOCKOUT_MATCHES.forEach(match => {
      const node = renderBracketNode(match);
      
      if (match.stage === "ラウンド32") {
        rounds.r32.appendChild(node);
      } else if (match.stage === "ラウンド16") {
        rounds.r16.appendChild(node);
      } else if (match.stage === "準々決勝") {
        rounds.qf.appendChild(node);
      } else if (match.stage === "準決勝") {
        rounds.sf.appendChild(node);
      } else if (match.stage === "決勝" || match.stage === "3位決定戦") {
        rounds.finals.appendChild(node);
      }
    });

    // Append Final Trophy Card
    const championNode = document.createElement("div");
    championNode.className = "champion-card-node";
    championNode.innerHTML = `
      <div class="label"><i class="fa-solid fa-trophy"></i> WORLD CUP 2026</div>
      <div class="champion-display">
        <span class="champion-flag">🏆</span>
        <span class="champion-name">CHAMPION</span>
      </div>
    `;
    rounds.finals.appendChild(championNode);
  }

  // Initial Load
  updateFavoritesStats();
  renderMatchesList();
});

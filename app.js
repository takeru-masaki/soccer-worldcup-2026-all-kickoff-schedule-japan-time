// app.js - W杯2026 試合日程＆お気に入り確認・カレンダー連携ロジック

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
  const downloadAllIcsBtn = document.getElementById("download-all-ics");

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
    
    // Toggle "Download All" button visibility in Favorites Tab
    if (favorites.length > 0) {
      downloadAllIcsBtn.style.display = "inline-flex";
    } else {
      downloadAllIcsBtn.style.display = "none";
    }
  }

  // --- CALENDAR INTEGRATION HELPERS ---
  
  // Helper to parse "MM/DD" and "HH:mm" as JST Date
  function getJstMatchDate(dateStr, timeStr) {
    const [month, day] = dateStr.split("/").map(Number);
    const [hour, min] = timeStr.split(":").map(Number);
    // Month is 0-indexed in JS Date (Jan = 0, June = 5, July = 6)
    const monthIndex = month - 1;
    
    // Format JST Date String (e.g., 2026-06-12T04:00:00+09:00)
    const year = 2026;
    const pad = (n) => String(n).padStart(2, "0");
    
    const formattedIso = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(min)}:00+09:00`;
    return new Date(formattedIso);
  }

  // Format Date to UTC string YYYYMMDDTHHMMSSZ for Google/iCal
  function formatUtcForCalendar(date) {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  // Generate Google Calendar Add URL
  function getGoogleCalendarUrl(match) {
    const start = getJstMatchDate(match.date, match.time);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // assume 2 hours match length
    
    const dates = `${formatUtcForCalendar(start)}/${formatUtcForCalendar(end)}`;
    const title = `🏆 [W杯] ${match.teamA} vs ${match.teamB}`;
    
    let groupLabel = match.group ? `${match.group}組` : match.stage;
    const description = `FIFAワールドカップ2026 - ${match.stage} (${groupLabel})\nキックオフ時間: 日本時間 ${match.date}(${match.day}) ${match.time}`;
    
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(description)}`;
  }

  // Generate iCal ICS file content and trigger download
  function downloadIcsFile(matches, filename) {
    const pad = (n) => String(n).padStart(2, "0");
    const nowUtc = formatUtcForCalendar(new Date());
    
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//W杯2026日程//NONSGML v1.0//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH"
    ];

    matches.forEach(match => {
      const start = getJstMatchDate(match.date, match.time);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
      
      const startStr = formatUtcForCalendar(start);
      const endStr = formatUtcForCalendar(end);
      
      const title = `🏆 [W杯] ${match.teamA} vs ${match.teamB}`;
      let groupLabel = match.group ? `${match.group}組` : match.stage;
      const description = `FIFAワールドカップ2026 - ${match.stage} (${groupLabel})\\n日本時間: ${match.date}(${match.day}) ${match.time}`;
      
      icsContent.push(
        "BEGIN:VEVENT",
        `UID:${match.id}_2026@worldcup-schedule.net`,
        `DTSTAMP:${nowUtc}`,
        `DTSTART:${startStr}`,
        `DTEND:${endStr}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        "END:VEVENT"
      );
    });

    icsContent.push("END:VCALENDAR");

    const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    
    // Google Calendar URL
    const googleUrl = getGoogleCalendarUrl(match);
    
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
        
        <div class="calendar-actions">
          <a href="${googleUrl}" target="_blank" class="cal-btn google-cal" title="Googleカレンダーに追加">
            <i class="fa-brands fa-google"></i> Google追加
          </a>
          <button class="cal-btn apple-cal" data-action="ical" title="iPhone/Appleカレンダーに登録">
            <i class="fa-regular fa-calendar-plus"></i> カレンダー登録 (.ics)
          </button>
        </div>
      </div>
    `;
    
    // Bind Favorite event
    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(match.id);
    });

    // Bind individual iCal download event
    const icalBtn = card.querySelector('[data-action="ical"]');
    icalBtn.addEventListener("click", () => {
      downloadIcsFile([match], `w杯2026_${match.teamA}_vs_${match.teamB}.ics`);
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

  // --- DOWNLOAD ALL ICS HANDLER ---
  downloadAllIcsBtn.addEventListener("click", () => {
    const favMatches = [...GROUP_STAGE_MATCHES, ...KNOCKOUT_MATCHES].filter(m => favorites.includes(m.id));
    if (favMatches.length === 0) return;
    
    downloadIcsFile(favMatches, "w杯2026_お気に入り観戦日程.ics");
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
      
      const googleUrl = getGoogleCalendarUrl(match);
      
      node.innerHTML = `
        <div class="bracket-match-info">
          <span>No.${match.matchNum} | ${match.date} ${match.time}</span>
          <div class="bracket-card-cal-actions">
            <a href="${googleUrl}" target="_blank" title="Googleカレンダーに追加"><i class="fa-brands fa-google"></i></a>
            <span class="ical-mini-btn" data-action="ical-mini" title="カレンダー登録 (.ics)"><i class="fa-regular fa-calendar-plus"></i></span>
          </div>
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

      // Bind iCal for bracket nodes
      node.querySelector('[data-action="ical-mini"]').addEventListener("click", () => {
        downloadIcsFile([match], `w杯2026_${match.teamA}_vs_${match.teamB}.ics`);
      });

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

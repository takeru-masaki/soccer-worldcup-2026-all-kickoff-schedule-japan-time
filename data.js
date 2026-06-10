// W杯2026年 大会データ

const TEAMS = {
  "メキシコ": { flag: "🇲🇽", group: "A", nameEn: "Mexico" },
  "南アフリカ": { flag: "🇿🇦", group: "A", nameEn: "South Africa" },
  "韓国": { flag: "🇰🇷", group: "A", nameEn: "South Korea" },
  "チェコ": { flag: "🇨🇿", group: "A", nameEn: "Czech Republic" },

  "カナダ": { flag: "🇨🇦", group: "B", nameEn: "Canada" },
  "ボスニア・ヘルツェゴビナ": { flag: "🇧🇦", group: "B", nameEn: "Bosnia and Herzegovina" },
  "スイス": { flag: "🇨🇭", group: "B", nameEn: "Switzerland" },
  "カタール": { flag: "🇶🇦", group: "B", nameEn: "Qatar" },

  "ブラジル": { flag: "🇧🇷", group: "C", nameEn: "Brazil" },
  "モロッコ": { flag: "🇲🇦", group: "C", nameEn: "Morocco" },
  "ハイチ": { flag: "🇭🇹", group: "C", nameEn: "Haiti" },
  "スコットランド": { flag: "🏴\u200d🏴\u200d🌾", flagAlt: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", flagEmoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", nameEn: "Scotland" },

  "アメリカ": { flag: "🇺🇸", group: "D", nameEn: "USA" },
  "パラグアイ": { flag: "🇵🇾", group: "D", nameEn: "Paraguay" },
  "オーストラリア": { flag: "🇦🇺", group: "D", nameEn: "Australia" },
  "トルコ": { flag: "🇹🇷", group: "D", nameEn: "Turkey" },

  "ドイツ": { flag: "🇩🇪", group: "E", nameEn: "Germany" },
  "キュラソー": { flag: "🇨🇼", group: "E", nameEn: "Curacao" },
  "コートジボワール": { flag: "🇨🇮", group: "E", nameEn: "Ivory Coast" },
  "エクアドル": { flag: "🇪🇨", group: "E", nameEn: "Ecuador" },

  "オランダ": { flag: "🇳🇱", group: "F", nameEn: "Netherlands" },
  "日本": { flag: "🇯🇵", group: "F", nameEn: "Japan" },
  "スウェーデン": { flag: "🇸🇪", group: "F", nameEn: "Sweden" },
  "チュニジア": { flag: "🇹🇳", group: "F", nameEn: "Tunisia" },

  "ベルギー": { flag: "🇧🇪", group: "G", nameEn: "Belgium" },
  "エジプト": { flag: "🇪🇬", group: "G", nameEn: "Egypt" },
  "イラン": { flag: "🇮🇷", group: "G", nameEn: "Iran" },
  "ニュージーランド": { flag: "🇳🇿", group: "G", nameEn: "New Zealand" },

  "スペイン": { flag: "🇪🇸", group: "H", nameEn: "Spain" },
  "カーボベルデ": { flag: "🇨🇻", group: "H", nameEn: "Cape Verde" },
  "サウジアラビア": { flag: "🇸🇦", group: "H", nameEn: "Saudi Arabia" },
  "ウルグアイ": { flag: "🇺🇾", group: "H", nameEn: "Uruguay" },

  "フランス": { flag: "🇫🇷", group: "I", nameEn: "France" },
  "セネガル": { flag: "🇸🇳", group: "I", nameEn: "Senegal" },
  "イラク": { flag: "🇮🇶", group: "I", nameEn: "Iraq" },
  "ノルウェー": { flag: "🇳🇴", group: "I", nameEn: "Norway" },

  "アルゼンチン": { flag: "🇦🇷", group: "J", nameEn: "Argentina" },
  "アルジェリア": { flag: "🇩🇿", group: "J", nameEn: "Algeria" },
  "オーストリア": { flag: "🇦🇹", group: "J", nameEn: "Austria" },
  "ヨルダン": { flag: "🇯🇴", group: "J", nameEn: "Jordan" },

  "ポルトガル": { flag: "🇵🇹", group: "K", nameEn: "Portugal" },
  "DRコンゴ": { flag: "🇨🇩", group: "K", nameEn: "DR Congo" },
  "ウズベキスタン": { flag: "🇺🇿", group: "K", nameEn: "Uzbekistan" },
  "コロンビア": { flag: "🇨🇴", group: "K", nameEn: "Colombia" },

  "イングランド": { flag: "🏴\u200d🏴\u200d🌾", flagAlt: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L", nameEn: "England" },
  "クロアチア": { flag: "🇭🇷", group: "L", nameEn: "Croatia" },
  "ガーナ": { flag: "🇬🇭", group: "L", nameEn: "Ghana" },
  "パナマ": { flag: "🇵🇦", group: "L", nameEn: "Panama" }
};

// Fix flag rendering for UK countries if needed
TEAMS["スコットランド"].flag = "🏴󠁧󠁢󠁳󠁣󠁴󠁿";
TEAMS["イングランド"].flag = "🏴󠁧󠁢󠁥󠁮󠁧󠁿";

const GROUP_STAGE_MATCHES = [
  // グループ第1節
  { id: "g1-1", stage: "グループ第1節", date: "6/12", day: "金", time: "4:00", group: "A", teamA: "メキシコ", teamB: "南アフリカ" },
  { id: "g1-2", stage: "グループ第1節", date: "6/12", day: "金", time: "11:00", group: "A", teamA: "韓国", teamB: "チェコ" },
  { id: "g1-3", stage: "グループ第1節", date: "6/13", day: "土", time: "4:00", group: "B", teamA: "カナダ", teamB: "ボスニア・ヘルツェゴビナ" },
  { id: "g1-4", stage: "グループ第1節", date: "6/13", day: "土", time: "10:00", group: "D", teamA: "アメリカ", teamB: "パラグアイ" },
  { id: "g1-5", stage: "グループ第1節", date: "6/14", day: "日", time: "4:00", group: "C", teamA: "カタール", teamB: "スイス" },
  { id: "g1-6", stage: "グループ第1節", date: "6/14", day: "日", time: "7:00", group: "C", teamA: "ブラジル", teamB: "モロッコ" },
  { id: "g1-7", stage: "グループ第1節", date: "6/14", day: "日", time: "10:00", group: "C", teamA: "ハイチ", teamB: "スコットランド" },
  { id: "g1-8", stage: "グループ第1節", date: "6/14", day: "日", time: "13:00", group: "D", teamA: "オーストラリア", teamB: "トルコ" },
  { id: "g1-9", stage: "グループ第1節", date: "6/15", day: "月", time: "2:00", group: "E", teamA: "ドイツ", teamB: "キュラソー" },
  { id: "g1-10", stage: "グループ第1節", date: "6/15", day: "月", time: "5:00", group: "F", teamA: "オランダ", teamB: "日本" },
  { id: "g1-11", stage: "グループ第1節", date: "6/15", day: "月", time: "8:00", group: "E", teamA: "コートジボワール", teamB: "エクアドル" },
  { id: "g1-12", stage: "グループ第1節", date: "6/15", day: "月", time: "11:00", group: "F", teamA: "スウェーデン", teamB: "チュニジア" },
  { id: "g1-13", stage: "グループ第1節", date: "6/16", day: "火", time: "1:00", group: "H", teamA: "スペイン", teamB: "カーボベルデ" },
  { id: "g1-14", stage: "グループ第1節", date: "6/16", day: "火", time: "4:00", group: "G", teamA: "ベルギー", teamB: "エジプト" },
  { id: "g1-15", stage: "グループ第1節", date: "6/16", day: "火", time: "7:00", group: "H", teamA: "サウジアラビア", teamB: "ウルグアイ" },
  { id: "g1-16", stage: "グループ第1節", date: "6/16", day: "火", time: "10:00", group: "G", teamA: "イラン", teamB: "ニュージーランド" },
  { id: "g1-17", stage: "グループ第1節", date: "6/17", day: "水", time: "4:00", group: "I", teamA: "フランス", teamB: "セネガル" },
  { id: "g1-18", stage: "グループ第1節", date: "6/17", day: "水", time: "7:00", group: "I", teamA: "イラク", teamB: "ノルウェー" },
  { id: "g1-19", stage: "グループ第1節", date: "6/17", day: "水", time: "10:00", group: "J", teamA: "アルゼンチン", teamB: "アルジェリア" },
  { id: "g1-20", stage: "グループ第1節", date: "6/17", day: "水", time: "13:00", group: "J", teamA: "オーストリア", teamB: "ヨルダン" },
  { id: "g1-21", stage: "グループ第1節", date: "6/18", day: "木", time: "2:00", group: "K", teamA: "ポルトガル", teamB: "DRコンゴ" },
  { id: "g1-22", stage: "グループ第1節", date: "6/18", day: "木", time: "5:00", group: "L", teamA: "イングランド", teamB: "クロアチア" },
  { id: "g1-23", stage: "グループ第1節", date: "6/18", day: "木", time: "8:00", group: "L", teamA: "ガーナ", teamB: "パナマ" },
  { id: "g1-24", stage: "グループ第1節", date: "6/18", day: "木", time: "11:00", group: "K", teamA: "ウズベキスタン", teamB: "コロンビア" },

  // グループ第2節
  { id: "g2-1", stage: "グループ第2節", date: "6/19", day: "金", time: "1:00", group: "A", teamA: "チェコ", teamB: "南アフリカ" },
  { id: "g2-2", stage: "グループ第2節", date: "6/19", day: "金", time: "4:00", group: "B", teamA: "スイス", teamB: "ボスニア・ヘルツェゴビナ" },
  { id: "g2-3", stage: "グループ第2節", date: "6/19", day: "金", time: "7:00", group: "B", teamA: "カナダ", teamB: "カタール" },
  { id: "g2-4", stage: "グループ第2節", date: "6/19", day: "金", time: "10:00", group: "A", teamA: "メキシコ", teamB: "韓国" },
  { id: "g2-5", stage: "グループ第2節", date: "6/20", day: "土", time: "4:00", group: "D", teamA: "アメリカ", teamB: "オーストラリア" },
  { id: "g2-6", stage: "グループ第2節", date: "6/20", day: "土", time: "7:00", group: "C", teamA: "スコットランド", teamB: "モロッコ" },
  { id: "g2-7", stage: "グループ第2節", date: "6/20", day: "土", time: "9:30", group: "C", teamA: "ブラジル", teamB: "ハイチ" },
  { id: "g2-8", stage: "グループ第2節", date: "6/20", day: "土", time: "12:00", group: "D", teamA: "トルコ", teamB: "パラグアイ" },
  { id: "g2-9", stage: "グループ第2節", date: "6/21", day: "日", time: "2:00", group: "F", teamA: "オランダ", teamB: "スウェーデン" },
  { id: "g2-10", stage: "グループ第2節", date: "6/21", day: "日", time: "5:00", group: "E", teamA: "ドイツ", teamB: "コートジボワール" },
  { id: "g2-11", stage: "グループ第2節", date: "6/21", day: "日", time: "9:00", group: "E", teamA: "エクアドル", teamB: "キュラソー" },
  { id: "g2-12", stage: "グループ第2節", date: "6/21", day: "日", time: "13:00", group: "F", teamA: "チュニジア", teamB: "日本" },
  { id: "g2-13", stage: "グループ第2節", date: "6/22", day: "月", time: "1:00", group: "H", teamA: "スペイン", teamB: "サウジアラビア" },
  { id: "g2-14", stage: "グループ第2節", date: "6/22", day: "月", time: "4:00", group: "G", teamA: "ベルギー", teamB: "イラン" },
  { id: "g2-15", stage: "グループ第2節", date: "6/22", day: "月", time: "7:00", group: "H", teamA: "ウルグアイ", teamB: "カーボベルデ" },
  { id: "g2-16", stage: "グループ第2節", date: "6/22", day: "月", time: "10:00", group: "G", teamA: "ニュージーランド", teamB: "エジプト" },
  { id: "g2-17", stage: "グループ第2節", date: "6/23", day: "火", time: "2:00", group: "J", teamA: "アルゼンチン", teamB: "オーストリア" },
  { id: "g2-18", stage: "グループ第2節", date: "6/23", day: "火", time: "6:00", group: "I", teamA: "フランス", teamB: "イラク" },
  { id: "g2-19", stage: "グループ第2節", date: "6/23", day: "火", time: "9:00", group: "I", teamA: "ノルウェー", teamB: "セネガル" },
  { id: "g2-20", stage: "グループ第2節", date: "6/23", day: "火", time: "12:00", group: "J", teamA: "ヨルダン", teamB: "アルジェリア" },
  { id: "g2-21", stage: "グループ第2節", date: "6/24", day: "水", time: "2:00", group: "K", teamA: "ポルトガル", teamB: "ウズベキスタン" },
  { id: "g2-22", stage: "グループ第2節", date: "6/24", day: "水", time: "5:00", group: "L", teamA: "イングランド", teamB: "ガーナ" },
  { id: "g2-23", stage: "グループ第2節", date: "6/24", day: "水", time: "8:00", group: "L", teamA: "パナマ", teamB: "クロアチア" },
  { id: "g2-24", stage: "グループ第2節", date: "6/24", day: "水", time: "11:00", group: "K", teamA: "コロンビア", teamB: "DRコンゴ" },

  // グループ第3節
  { id: "g3-1", stage: "グループ第3節", date: "6/25", day: "木", time: "4:00", group: "B", teamA: "スイス", teamB: "カナダ" },
  { id: "g3-2", stage: "グループ第3節", date: "6/25", day: "木", time: "4:00", group: "B", teamA: "ボスニア・ヘルツェゴビナ", teamB: "カタール" },
  { id: "g3-3", stage: "グループ第3節", date: "6/25", day: "木", time: "7:00", group: "C", teamA: "スコットランド", teamB: "ブラジル" },
  { id: "g3-4", stage: "グループ第3節", date: "6/25", day: "木", time: "7:00", group: "C", teamA: "モロッコ", teamB: "ハイチ" },
  { id: "g3-5", stage: "グループ第3節", date: "6/25", day: "木", time: "10:00", group: "A", teamA: "チェコ", teamB: "メキシコ" },
  { id: "g3-6", stage: "グループ第3節", date: "6/25", day: "木", time: "10:00", group: "A", teamA: "南アフリカ", teamB: "韓国" },
  { id: "g3-7", stage: "グループ第3節", date: "6/26", day: "金", time: "5:00", group: "E", teamA: "キュラソー", teamB: "コートジボワール" },
  { id: "g3-8", stage: "グループ第3節", date: "6/26", day: "金", time: "5:00", group: "E", teamA: "エクアドル", teamB: "ドイツ" },
  { id: "g3-9", stage: "グループ第3節", date: "6/26", day: "金", time: "8:00", group: "F", teamA: "日本", teamB: "スウェーデン" },
  { id: "g3-10", stage: "グループ第3節", date: "6/26", day: "金", time: "8:00", group: "F", teamA: "チュニジア", teamB: "オランダ" },
  { id: "g3-11", stage: "グループ第3節", date: "6/26", day: "金", time: "11:00", group: "D", teamA: "トルコ", teamB: "アメリカ" },
  { id: "g3-12", stage: "グループ第3節", date: "6/26", day: "金", time: "11:00", group: "D", teamA: "パラグアイ", teamB: "オーストラリア" },
  { id: "g3-13", stage: "グループ第3節", date: "6/27", day: "土", time: "4:00", group: "I", teamA: "ノルウェー", teamB: "フランス" },
  { id: "g3-14", stage: "グループ第3節", date: "6/27", day: "土", time: "4:00", group: "I", teamA: "セネガル", teamB: "イラク" },
  { id: "g3-15", stage: "グループ第3節", date: "6/27", day: "土", time: "9:00", group: "H", teamA: "カーボベルデ", teamB: "サウジアラビア" },
  { id: "g3-16", stage: "グループ第3節", date: "6/27", day: "土", time: "9:00", group: "H", teamA: "ウルグアイ", teamB: "スペイン" },
  { id: "g3-17", stage: "グループ第3節", date: "6/27", day: "土", time: "12:00", group: "G", teamA: "エジプト", teamB: "イラン" },
  { id: "g3-18", stage: "グループ第3節", date: "6/27", day: "土", time: "12:00", group: "G", teamA: "ニュージーランド", teamB: "ベルギー" },
  { id: "g3-19", stage: "グループ第3節", date: "6/28", day: "日", time: "6:00", group: "L", teamA: "パナマ", teamB: "イングランド" },
  { id: "g3-20", stage: "グループ第3節", date: "6/28", day: "日", time: "6:00", group: "L", teamA: "クロアチア", teamB: "ガーナ" },
  { id: "g3-21", stage: "グループ第3節", date: "6/28", day: "日", time: "8:30", group: "K", teamA: "コロンビア", teamB: "ポルトガル" },
  { id: "g3-22", stage: "グループ第3節", date: "6/28", day: "日", time: "8:30", group: "K", teamA: "DRコンゴ", teamB: "ウズベキスタン" },
  { id: "g3-23", stage: "グループ第3節", date: "6/28", day: "日", time: "11:00", group: "J", teamA: "アルジェリア", teamB: "オーストリア" },
  { id: "g3-24", stage: "グループ第3節", date: "6/28", day: "日", time: "11:00", group: "J", teamA: "ヨルダン", teamB: "アルゼンチン" }
];

const KNOCKOUT_MATCHES = [
  // ラウンド32
  { id: "ko-1", matchNum: 1, stage: "ラウンド32", date: "6/29", day: "月", time: "4:00", label: "A組2位 vs B組2位", placeholderA: "A組2位", placeholderB: "B組2位", teamA: "A組2位", teamB: "B組2位", nextMatchNum: 17, nextSlot: "teamA" },
  { id: "ko-2", matchNum: 2, stage: "ラウンド32", date: "6/30", day: "火", time: "2:00", label: "C組1位 vs F組2位", placeholderA: "C組1位", placeholderB: "F組2位", teamA: "C組1位", teamB: "F組2位", nextMatchNum: 17, nextSlot: "teamB" },
  { id: "ko-3", matchNum: 3, stage: "ラウンド32", date: "6/30", day: "火", time: "5:30", label: "E組1位 vs 3位(A/B/C/D/F)", placeholderA: "E組1位", placeholderB: "A/B/C/D/F組3位", teamA: "E組1位", teamB: "A/B/C/D/F組3位", nextMatchNum: 18, nextSlot: "teamA" },
  { id: "ko-4", matchNum: 4, stage: "ラウンド32", date: "6/30", day: "火", time: "10:00", label: "F組1位 vs C組2位", placeholderA: "F組1位", placeholderB: "C組2位", teamA: "F組1位", teamB: "C組2位", nextMatchNum: 18, nextSlot: "teamB" },
  { id: "ko-5", matchNum: 5, stage: "ラウンド32", date: "7/1", day: "水", time: "2:00", label: "E組2位 vs I組2位", placeholderA: "E組2位", placeholderB: "I組2位", teamA: "E組2位", teamB: "I組2位", nextMatchNum: 19, nextSlot: "teamA" },
  { id: "ko-6", matchNum: 6, stage: "ラウンド32", date: "7/1", day: "水", time: "6:00", label: "I組1位 vs 3位(C/D/F/G/H)", placeholderA: "I組1位", placeholderB: "C/D/F/G/H組3位", teamA: "I組1位", teamB: "C/D/F/G/H組3位", nextMatchNum: 19, nextSlot: "teamB" },
  { id: "ko-7", matchNum: 7, stage: "ラウンド32", date: "7/1", day: "水", time: "10:00", label: "A組1位 vs 3位(C/E/F/H/I)", placeholderA: "A組1位", placeholderB: "C/E/F/H/I組3位", teamA: "A組1位", teamB: "C/E/F/H/I組3位", nextMatchNum: 20, nextSlot: "teamA" },
  { id: "ko-8", matchNum: 8, stage: "ラウンド32", date: "7/2", day: "木", time: "1:00", label: "L組1位 vs 3位(E/H/I/J/K)", placeholderA: "L組1位", placeholderB: "E/H/I/J/K組3位", teamA: "L組1位", teamB: "E/H/I/J/K組3位", nextMatchNum: 20, nextSlot: "teamB" },
  { id: "ko-9", matchNum: 9, stage: "ラウンド32", date: "7/2", day: "木", time: "5:00", label: "G組1位 vs 3位(A/E/H/I/J)", placeholderA: "G組1位", placeholderB: "A/E/H/I/J組3位", teamA: "G組1位", teamB: "A/E/H/I/J組3位", nextMatchNum: 21, nextSlot: "teamA" },
  { id: "ko-10", matchNum: 10, stage: "ラウンド32", date: "7/2", day: "木", time: "9:00", label: "D組1位 vs 3位(B/E/F/I/J)", placeholderA: "D組1位", placeholderB: "B/E/F/I/J組3位", teamA: "D組1位", teamB: "B/E/F/I/J組3位", nextMatchNum: 21, nextSlot: "teamB" },
  { id: "ko-11", matchNum: 11, stage: "ラウンド32", date: "7/3", day: "金", time: "4:00", label: "H組1位 vs J組2位", placeholderA: "H組1位", placeholderB: "J組2位", teamA: "H組1位", teamB: "J組2位", nextMatchNum: 22, nextSlot: "teamA" },
  { id: "ko-12", matchNum: 12, stage: "ラウンド32", date: "7/3", day: "金", time: "8:00", label: "K組2位 vs L組2位", placeholderA: "K組2位", placeholderB: "L組2位", teamA: "K組2位", teamB: "L組2位", nextMatchNum: 22, nextSlot: "teamB" },
  { id: "ko-13", matchNum: 13, stage: "ラウンド32", date: "7/3", day: "金", time: "12:00", label: "B組1位 vs 3位(E/F/G/I/J)", placeholderA: "B組1位", placeholderB: "E/F/G/I/J組3位", teamA: "B組1位", teamB: "E/F/G/I/J組3位", nextMatchNum: 23, nextSlot: "teamA" },
  { id: "ko-14", matchNum: 14, stage: "ラウンド32", date: "7/4", day: "土", time: "3:00", label: "D組2位 vs G組2位", placeholderA: "D組2位", placeholderB: "G組2位", teamA: "D組2位", teamB: "G組2位", nextMatchNum: 23, nextSlot: "teamB" },
  { id: "ko-15", matchNum: 15, stage: "ラウンド32", date: "7/4", day: "土", time: "6:30", label: "J組1位 vs H組2位", placeholderA: "J組1位", placeholderB: "H組2位", teamA: "J組1位", teamB: "H組2位", nextMatchNum: 24, nextSlot: "teamA" },
  { id: "ko-16", matchNum: 16, stage: "ラウンド32", date: "7/4", day: "土", time: "10:30", label: "K組1位 vs L組2位", placeholderA: "K組1位", placeholderB: "L組2位", teamA: "K組1位", teamB: "L組2位", nextMatchNum: 24, nextSlot: "teamB" },

  // ラウンド16
  { id: "ko-17", matchNum: 17, stage: "ラウンド16", date: "7/5", day: "日", time: "2:00", label: "No.1の勝者 vs No.2の勝者", placeholderA: "No.1の勝者", placeholderB: "No.2の勝者", teamA: "No.1の勝者", teamB: "No.2の勝者", nextMatchNum: 25, nextSlot: "teamA", prevMatchA: 1, prevMatchB: 2 },
  { id: "ko-18", matchNum: 18, stage: "ラウンド16", date: "7/5", day: "日", time: "5:00", label: "No.3の勝者 vs No.4の勝者", placeholderA: "No.3の勝者", placeholderB: "No.4の勝者", teamA: "No.3の勝者", teamB: "No.4の勝者", nextMatchNum: 25, nextSlot: "teamB", prevMatchA: 3, prevMatchB: 4 },
  { id: "ko-19", matchNum: 19, stage: "ラウンド16", date: "7/6", day: "月", time: "2:00", label: "No.5の勝者 vs No.6の勝者", placeholderA: "No.5の勝者", placeholderB: "No.6の勝者", teamA: "No.5の勝者", teamB: "No.6の勝者", nextMatchNum: 26, nextSlot: "teamA", prevMatchA: 5, prevMatchB: 6 },
  { id: "ko-20", matchNum: 20, stage: "ラウンド16", date: "7/6", day: "月", time: "5:00", label: "No.7の勝者 vs No.8の勝者", placeholderA: "No.7の勝者", placeholderB: "No.8の勝者", teamA: "No.7の勝者", teamB: "No.8の勝者", nextMatchNum: 26, nextSlot: "teamB", prevMatchA: 7, prevMatchB: 8 },
  { id: "ko-21", matchNum: 21, stage: "ラウンド16", date: "7/7", day: "火", time: "4:00", label: "No.9の勝者 vs No.10の勝者", placeholderA: "No.9の勝者", placeholderB: "No.10の勝者", teamA: "No.9の勝者", teamB: "No.10の勝者", nextMatchNum: 27, nextSlot: "teamA", prevMatchA: 9, prevMatchB: 10 },
  { id: "ko-22", matchNum: 22, stage: "ラウンド16", date: "7/7", day: "火", time: "8:00", label: "No.11の勝者 vs No.12の勝者", placeholderA: "No.11の勝者", placeholderB: "No.12の勝者", teamA: "No.11の勝者", teamB: "No.12の勝者", nextMatchNum: 27, nextSlot: "teamB", prevMatchA: 11, prevMatchB: 12 },
  { id: "ko-23", matchNum: 23, stage: "ラウンド16", date: "7/8", day: "水", time: "2:00", label: "No.13の勝者 vs No.14の勝者", placeholderA: "No.13の勝者", placeholderB: "No.14の勝者", teamA: "No.13の勝者", teamB: "No.14の勝者", nextMatchNum: 28, nextSlot: "teamA", prevMatchA: 13, prevMatchB: 14 },
  { id: "ko-24", matchNum: 24, stage: "ラウンド16", date: "7/8", day: "水", time: "5:00", label: "No.15の勝者 vs No.16の勝者", placeholderA: "No.15の勝者", placeholderB: "No.16の勝者", teamA: "No.15の勝者", teamB: "No.16の勝者", nextMatchNum: 28, nextSlot: "teamB", prevMatchA: 15, prevMatchB: 16 },

  // 準々決勝
  { id: "ko-25", matchNum: 25, stage: "準々決勝", date: "7/10", day: "金", time: "5:00", label: "No.17の勝者 vs No.18の勝者", placeholderA: "No.17の勝者", placeholderB: "No.18の勝者", teamA: "No.17の勝者", teamB: "No.18の勝者", nextMatchNum: 29, nextSlot: "teamA", prevMatchA: 17, prevMatchB: 18 },
  { id: "ko-26", matchNum: 26, stage: "準々決勝", date: "7/10", day: "金", time: "8:00", label: "No.19の勝者 vs No.20の勝者", placeholderA: "No.19の勝者", placeholderB: "No.20の勝者", teamA: "No.19の勝者", teamB: "No.20の勝者", nextMatchNum: 29, nextSlot: "teamB", prevMatchA: 19, prevMatchB: 20 },
  { id: "ko-27", matchNum: 27, stage: "準々決勝", date: "7/11", day: "土", time: "10:00", label: "No.21の勝者 vs No.22の勝者", placeholderA: "No.21の勝者", placeholderB: "No.22の勝者", teamA: "No.21の勝者", teamB: "No.22の勝者", nextMatchNum: 30, nextSlot: "teamA", prevMatchA: 21, prevMatchB: 22 },
  { id: "ko-28", matchNum: 28, stage: "準々決勝", date: "7/12", day: "日", time: "10:00", label: "No.23の勝者 vs No.24の勝者", placeholderA: "No.23の勝者", placeholderB: "No.24の勝者", teamA: "No.23の勝者", teamB: "No.24の勝者", nextMatchNum: 30, nextSlot: "teamB", prevMatchA: 23, prevMatchB: 24 },

  // 準決勝
  { id: "ko-29", matchNum: 29, stage: "準決勝", date: "7/15", day: "水", time: "4:00", label: "No.25の勝者 vs No.26の勝者", placeholderA: "No.25の勝者", placeholderB: "No.26の勝者", teamA: "No.25の勝者", teamB: "No.26の勝者", nextMatchNum: 32, nextSlot: "teamA", prevMatchA: 25, prevMatchB: 26 },
  { id: "ko-30", matchNum: 30, stage: "準決勝", date: "7/16", day: "木", time: "4:00", label: "No.27の勝者 vs No.28の勝者", placeholderA: "No.27の勝者", placeholderB: "No.28の勝者", teamA: "No.27の勝者", teamB: "No.28の勝者", nextMatchNum: 32, nextSlot: "teamB", prevMatchA: 27, prevMatchB: 28 },

  // 3位決定戦
  { id: "ko-31", matchNum: 31, stage: "3位決定戦", date: "7/19", day: "日", time: "6:00", label: "No.29の敗者 vs No.30の敗者", placeholderA: "No.29の敗者", placeholderB: "No.30の敗者", teamA: "No.29の敗者", teamB: "No.30の敗者", prevMatchA: "loser-29", prevMatchB: "loser-30" },

  // 決勝
  { id: "ko-32", matchNum: 32, stage: "決勝", date: "7/20", day: "月", time: "4:00", label: "No.29の勝者 vs No.30の勝者", placeholderA: "No.29の勝者", placeholderB: "No.30の勝者", teamA: "No.29の勝者", teamB: "No.30の勝者", prevMatchA: 29, prevMatchB: 30 }
];

window.W杯Data = {
  TEAMS,
  GROUP_STAGE_MATCHES,
  KNOCKOUT_MATCHES
};

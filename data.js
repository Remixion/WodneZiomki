// =====================================================================
// GITHUB SYNC CONFIG
// =====================================================================
window.GH_CONFIG = {
  owner:  'Remixion',
  repo:   'WodneZiomki',
  branch: 'main',
  path:   'data.js'
};
const GH_CONFIG = window.GH_CONFIG;
// Raw URL skąd aplikacja ładuje dane przy starcie
const GH_RAW_URL = `https://raw.githubusercontent.com/${GH_CONFIG.owner}/${GH_CONFIG.repo}/${GH_CONFIG.branch}/${GH_CONFIG.path}`;
// Token przechowywany tylko w localStorage przeglądarki osoby zapisującej
const LS_GH_TOKEN = 'rd_gh_token';

// =====================================================================
// GOOGLE SHEETS CONFIG
// =====================================================================
const GS_CONFIG = {
  // Publiczny CSV (odczyt — bez logowania)
  csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjZVf5nAGy-yyxmbu09cfzTZML2HSqKgSM0PLsp4jxvE-2QV-WRLpLiIF5rRru0F7Lw5FfiAzQmEBz/pub?gid=0&single=true&output=csv',
  // Apps Script Web App URL (zapis) — uzupełnij po deploymencie skryptu
  scriptUrl: '',
};
const LS_GS_SCRIPT = 'rd_gs_script';

// =====================================================================
// CONSTANTS
// =====================================================================
const ROLES=['top','jng','mid','adc','supp'];
const RI={top:'⚔',jng:'🌿',mid:'⚡',adc:'🏹',supp:'🛡'};
const CHAMPS={
  top:["Darius","Garen","Malphite","Fiora","Camille","Renekton","Sett","Mordekaiser","Gwen","Illaoi","Nasus","Teemo","Ornn","Aatrox","Jax","Irelia","Gangplank","Kennen","Vladimir","Urgot","Tryndamere","Gnar","Rumble","Jayce","Riven","Yasuo","Yone","Akali","Wukong","Poppy"],
  jng:["Vi","Amumu","Hecarim","Jarvan IV","Kindred","Nidalee","Nunu","Rammus","Sejuani","Volibear","Warwick","Xin Zhao","Lee Sin","Kayn","Kha'Zix","Ekko","Graves","Viego","Lillia","Diana","Elise","Evelynn","Fiddlesticks","Gragas","Ivern","Rengar","Shaco","Taliyah","Trundle","Udyr"],
  mid:["Ahri","Akali","Annie","Cassiopeia","Diana","Galio","Katarina","LeBlanc","Lissandra","Lux","Malzahar","Orianna","Syndra","Twisted Fate","Zed","Viktor","Yone","Yasuo","Vex","Sylas","Azir","Corki","Ekko","Fizz","Irelia","Kassadin","Qiyana","Swain","Veigar","Ziggs"],
  adc:["Ashe","Caitlyn","Draven","Ezreal","Jinx","Kai'Sa","Lucian","Miss Fortune","Samira","Tristana","Twitch","Vayne","Sivir","Xayah","Zeri","Jhin","Varus","Nilah","Aphelios","Kog'Maw","Corki","Kalista","Kindred","Seraphine","Senna","Smolder","Swain","Taliyah","Ziggs","Ziggs"],
  supp:["Alistar","Blitzcrank","Brand","Janna","Karma","Leona","Lulu","Morgana","Nami","Nautilus","Pyke","Rakan","Senna","Thresh","Yuumi","Soraka","Renata","Milio","Bard","Zyra","Lux","Seraphine","Xerath","Vel'Koz","Sona","Swain","Heimerdinger","Tahm Kench","Taric","Zilean"]
};
const PC={Arek:'#C8AA6E',Resek:'#5DADE2',Kosior:'#1DE9B6',Songo:'#E84855',Radio:'#9B59B6',Jusko:'#F39C12',Limcia:'#2ECC71',Pajfu:'#E67E22',Jagoda:'#FF69B4',Toffic:'#00BCD4',Kamila:'#FF6B9D',Shot:'#A78BFA',Ezra:'#34D399',Derko:'#FCD34D',Maciej:'#60A5FA',Abrose:'#F87171',Ban:'#818CF8',Ashdevil:'#FB923C',Koharu:'#4ADE80',Funfel:'#38BDF8',Salencja:'#E879F9',Falafel:'#FACC15',EloŻelo:'#A3E635',Jumcia:'#FB7185',Fsmesdek:'#67E8F9',Emoś:'#86EFAC'};
const ini=n=>n?n.slice(0,2).toUpperCase():'??';

// =====================================================================
// MATCH HISTORY
// =====================================================================
let MH=[
  {gid:'1',patch:'25.24',date:'2025-12-23',win:'PRAWA',blue:{top:'Kosior',jng:'Resek',mid:'Radio',adc:'Limcia',supp:'Jusko'},red:{top:'Pajfu',jng:'Songo',mid:'Jagoda',adc:'Toffic',supp:'Arek'},imgUrl:'https://i.imgur.com/NAyASin.png'},
  {gid:'2',patch:'25.24',date:'2025-12-23',win:'PRAWA',blue:{top:'Songo',jng:'Arek',mid:'Radio',adc:'Jusko',supp:'Kosior'},red:{top:'Toffic',jng:'Pajfu',mid:'Limcia',adc:'Jagoda',supp:'Resek'},imgUrl:'https://i.imgur.com/d1EJG7D.png'},
  {gid:'3',patch:'25.24',date:'2025-12-26',win:'PRAWA',blue:{top:'Arek',jng:'Kamila',mid:'Shot',adc:'Limcia',supp:'Radio'},red:{top:'Ezra',jng:'Kosior',mid:'Pajfu',adc:'Resek',supp:'Songo'},imgUrl:'https://i.imgur.com/WhiLUuM.png'},
  {gid:'4',patch:'25.24',date:'2025-12-26',win:'LEWA',blue:{top:'Resek',jng:'Shot',mid:'Kosior',adc:'Arek',supp:'Pajfu'},red:{top:'Radio',jng:'Songo',mid:'Kamila',adc:'Ezra',supp:'Limcia'}},
  {gid:'5',patch:'25.24',date:'2025-12-26',win:'LEWA',blue:{top:'Arek',jng:'Resek',mid:'Limcia',adc:'Shot',supp:'Jusko'},red:{top:'Pajfu',jng:'Kosior',mid:'Songo',adc:'Radio',supp:'Kamila'}},
  {gid:'6',patch:'25.24',date:'2025-12-26',win:'LEWA',blue:{top:'Songo',jng:'Radio',mid:'Arek',adc:'Jusko',supp:'Pajfu'},red:{top:'Kosior',jng:'Kamila',mid:'Resek',adc:'Limcia',supp:'Shot'}},
  {gid:'7',patch:'25.24',date:'2025-12-26',win:'PRAWA',blue:{top:'Arek',jng:'Radio',mid:'Shot',adc:'Limcia',supp:'Songo'},red:{top:'Kosior',jng:'Kamila',mid:'Jusko',adc:'Resek',supp:'Pajfu'}},
  {gid:'8',patch:'25.24',date:'2025-12-27',win:'LEWA',blue:{top:'Derko',jng:'Arek',mid:'Shot',adc:'Resek',supp:'Limcia'},red:{top:'Songo',jng:'Pajfu',mid:'Maciej',adc:'Jusko',supp:'Radio'}},
  {gid:'9',patch:'25.24',date:'2025-12-27',win:'LEWA',blue:{top:'Jusko',jng:'Derko',mid:'Kosior',adc:'Pajfu',supp:'Arek'},red:{top:'Limcia',jng:'Songo',mid:'Resek',adc:'Maciej',supp:'Shot'},imgUrl:'https://i.imgur.com/SjbCL6T.png'},
  {gid:'10',patch:'25.24',date:'2025-12-27',win:'PRAWA',blue:{top:'Arek',jng:'Limcia',mid:'Pajfu',adc:'Shot',supp:'Songo'},red:{top:'Radio',jng:'Maciej',mid:'Kosior',adc:'Resek',supp:'Jusko'}},
  {gid:'11',patch:'25.24',date:'2025-12-27',win:'LEWA',blue:{top:'Resek',jng:'Kosior',mid:'Limcia',adc:'Songo',supp:'Arek'},red:{top:'Maciej',jng:'Shot',mid:'Pajfu',adc:'Radio',supp:'Jusko'},imgUrl:'https://i.imgur.com/65k5C0m.png'},
  {gid:'12',patch:'25.24',date:'2025-12-28',win:'LEWA',blue:{top:'Abrose',jng:'Arek',mid:'Songo',adc:'Limcia',supp:'Resek'},red:{top:'Ban',jng:'Jusko',mid:'Kosior',adc:'Radio',supp:'Shot'},imgUrl:'https://i.imgur.com/1SFkGdc.png'},
  {gid:'13',patch:'25.24',date:'2025-12-28',win:'PRAWA',blue:{top:'Arek',jng:'Abrose',mid:'Songo',adc:'Jusko',supp:'Radio'},red:{top:'Ban',jng:'Resek',mid:'Kosior',adc:'Limcia',supp:'Shot'}},
  {gid:'14',patch:'25.24',date:'2025-12-28',win:'PRAWA',blue:{top:'Ban',jng:'Shot',mid:'Radio',adc:'Resek',supp:'Arek'},red:{top:'Kosior',jng:'Songo',mid:'Limcia',adc:'Pajfu',supp:'Jusko'}},
  {gid:'15',patch:'25.24',date:'2025-12-28',win:'PRAWA',blue:{top:'Limcia',jng:'Kosior',mid:'Ban',adc:'Toffic',supp:'Arek'},red:{top:'Shot',jng:'Resek',mid:'Songo',adc:'Jusko',supp:'Pajfu'},imgUrl:'https://i.imgur.com/yv55N0N.png'},
  {gid:'16',patch:'25.24',date:'2026-01-03',win:'PRAWA',blue:{top:'Ashdevil',jng:'Radio',mid:'Maciej',adc:'Arek',supp:'Songo'},red:{top:'Resek',jng:'Koharu',mid:'Jagoda',adc:'Kosior',supp:'Shot'}},
  {gid:'17',patch:'25.24',date:'2026-01-03',win:'PRAWA',blue:{top:'Arek',jng:'Koharu',mid:'Kosior',adc:'Radio',supp:'Maciej'},red:{top:'Shot',jng:'Resek',mid:'Songo',adc:'Ashdevil',supp:'Jagoda'}},
  {gid:'18',patch:'26.01',date:'2026-01-10',win:'PRAWA',blue:{top:'Songo',jng:'Koharu',mid:'Jagoda',adc:'Jusko',supp:'Shot'},red:{top:'Pajfu',jng:'Radio',mid:'Resek',adc:'Arek',supp:'Kosior'}},
  {gid:'19',patch:'26.01',date:'2026-01-10',win:'LEWA',blue:{top:'Shot',jng:'Jusko',mid:'Koharu',adc:'Resek',supp:'Arek'},red:{top:'Radio',jng:'Pajfu',mid:'Songo',adc:'Jagoda',supp:'Kosior'}},
  {gid:'20',patch:'26.01',date:'2026-01-10',win:'LEWA',blue:{top:'Resek',jng:'Radio',mid:'Kosior',adc:'Jagoda',supp:'Arek'},red:{top:'Jusko',jng:'Koharu',mid:'Shot',adc:'Songo',supp:'Pajfu'},imgUrl:'https://i.imgur.com/QMEOP9k.png'},
  {gid:'21',patch:'26.01',date:'2026-01-10',win:'PRAWA',blue:{top:'Resek',jng:'Jagoda',mid:'Arek',adc:'Jusko',supp:'Radio'},red:{top:'Koharu',jng:'Kosior',mid:'Songo',adc:'Pajfu',supp:'Shot'},imgUrl:'https://i.imgur.com/q3alo5N.png'},
  {gid:'22',patch:'26.01',date:'2026-01-10',win:'PRAWA',blue:{top:'Arek',jng:'Limcia',mid:'Radio',adc:'Resek',supp:'Koharu'},red:{top:'Jusko',jng:'Songo',mid:'Toffic',adc:'Shot',supp:'Kosior'},imgUrl:'https://i.imgur.com/714mwXu.png'},
  {gid:'23',patch:'26.01',date:'2026-01-11',win:'LEWA',blue:{top:'Arek',jng:'Radio',mid:'Jusko',adc:'Kosior',supp:'Funfel'},red:{top:'Toffic',jng:'Songo',mid:'Resek',adc:'Limcia',supp:'Ashdevil'},imgUrl:'https://i.imgur.com/zOzzmDD.png'},
  {gid:'24',patch:'26.01',date:'2026-01-11',win:'LEWA',blue:{top:'Kosior',jng:'Resek',mid:'Limcia',adc:'Jusko',supp:'Radio'},red:{top:'Ashdevil',jng:'Toffic',mid:'Songo',adc:'Funfel',supp:'Arek'},imgUrl:'https://i.imgur.com/XIyiRWh.png'},
  {gid:'25',patch:'26.01',date:'2026-01-11',win:'LEWA',blue:{top:'Songo',jng:'Radio',mid:'Ashdevil',adc:'Resek',supp:'Shot'},red:{top:'Jusko',jng:'Arek',mid:'Limcia',adc:'Kosior',supp:'Toffic'},imgUrl:'https://i.imgur.com/U51qZXZ.png'},
  {gid:'26',patch:'26.01',date:'2026-01-11',win:'PRAWA',blue:{top:'Limcia',jng:'Resek',mid:'Radio',adc:'Toffic',supp:'Kosior'},red:{top:'Songo',jng:'Arek',mid:'Ashdevil',adc:'Shot',supp:'Jusko'},imgUrl:'https://i.imgur.com/MUNOUsg.png'},
  {gid:'27',patch:'26.01',date:'2026-01-11',win:'LEWA',blue:{top:'Radio',jng:'Shot',mid:'Jagoda',adc:'Resek',supp:'Limcia'},red:{top:'Songo',jng:'Kosior',mid:'Jusko',adc:'Arek',supp:'Ashdevil'},imgUrl:'https://i.imgur.com/kSdN5Zv.png'},
  {gid:'28',patch:'26.01',date:'2026-01-16',win:'LEWA',blue:{top:'Limcia',jng:'Songo',mid:'Radio',adc:'Resek',supp:'Arek'},red:{top:'Toffic',jng:'Jagoda',mid:'Kosior',adc:'Salencja',supp:'Jusko'},imgUrl:'https://i.imgur.com/qWgmkiD.png'},
  {gid:'29',patch:'26.01',date:'2026-01-16',win:'PRAWA',blue:{top:'Resek',jng:'Radio',mid:'Falafel',adc:'Songo',supp:'Arek'},red:{top:'Kosior',jng:'Jagoda',mid:'Toffic',adc:'Limcia',supp:'Jusko'},imgUrl:'https://i.imgur.com/L9KZZV4.png'},
  {gid:'30',patch:'26.01',date:'2026-01-16',win:'LEWA',blue:{top:'Jusko',jng:'Limcia',mid:'Radio',adc:'Arek',supp:'Jagoda'},red:{top:'Kosior',jng:'Falafel',mid:'Resek',adc:'Songo',supp:'Toffic'},imgUrl:'https://i.imgur.com/GxcJc7y.png'},
  {gid:'31',patch:'26.01',date:'2026-01-16',win:'LEWA',blue:{top:'Kosior',jng:'Songo',mid:'Jagoda',adc:'Limcia',supp:'Radio'},red:{top:'Resek',jng:'Jusko',mid:'Arek',adc:'Toffic',supp:'Falafel'},imgUrl:'https://i.imgur.com/6NGBgwo.png'},
  {gid:'32',patch:'26.02',date:'2026-01-29',win:'LEWA',blue:{top:'EloŻelo',jng:'Kosior',mid:'Jusko',adc:'Jumcia',supp:'Ashdevil'},red:{top:'Kamila',jng:'Pajfu',mid:'Toffic',adc:'Resek',supp:'Arek'},imgUrl:'https://i.imgur.com/st7aAH7.png'},
  {gid:'33',patch:'26.02',date:'2026-01-29',win:'PRAWA',blue:{top:'Kamila',jng:'Arek',mid:'Jusko',adc:'Jumcia',supp:'Kosior'},red:{top:'Pajfu',jng:'Resek',mid:'Toffic',adc:'Ashdevil',supp:'EloŻelo'},imgUrl:'https://i.imgur.com/3fKMR9Y.png'},
  {gid:'34',patch:'26.02',date:'2026-01-29',win:'PRAWA',blue:{top:'Pajfu',jng:'Jumcia',mid:'Jusko',adc:'Kamila',supp:'Toffic'},red:{top:'EloŻelo',jng:'Arek',mid:'Resek',adc:'Ashdevil',supp:'Kosior'},imgUrl:'https://i.imgur.com/UFKtz4h.png'},
  {gid:'35',patch:'26.02',date:'2026-01-31',win:'LEWA',blue:{top:'Falafel',jng:'Arek',mid:'Jagoda',adc:'Kosior',supp:'Radio'},red:{top:'Resek',jng:'Jumcia',mid:'Ashdevil',adc:'Kamila',supp:'Jusko'},imgUrl:'https://i.imgur.com/Cgv0HIe.png'},
  {gid:'36',patch:'26.02',date:'2026-01-31',win:'PRAWA',blue:{top:'Arek',jng:'Kamila',mid:'Radio',adc:'Fsmesdek',supp:'Jusko'},red:{top:'Falafel',jng:'Emoś',mid:'Jumcia',adc:'Resek',supp:'Kosior'},imgUrl:'https://i.imgur.com/mo3eP9Q.png'},
  {gid:'37',patch:'26.02',date:'2026-01-31',win:'PRAWA',blue:{top:'Falafel',jng:'Kamila',mid:'Arek',adc:'Radio',supp:'Emoś'},red:{top:'Fsmesdek',jng:'Jusko',mid:'Jumcia',adc:'Kosior',supp:'Resek'},imgUrl:'https://i.imgur.com/awonjS0.png'},
  {gid:'38',patch:'26.02',date:'2026-01-31',win:'PRAWA',blue:{top:'Radio',jng:'Jusko',mid:'Fsmesdek',adc:'Kamila',supp:'Resek'},red:{top:'Jumcia',jng:'Falafel',mid:'Emoś',adc:'Arek',supp:'Kosior'},imgUrl:'https://i.imgur.com/zUUAq2L.png'}
];

// =====================================================================
// PERSISTENCE — localStorage (per-device: scan results, UI prefs)
// =====================================================================
const LS_ALIASES='rd_aliases';
const LS_PLAYERS='rd_players';
const LS_EXTRA  ='rd_extra';
const LS_SCAN   ='rd_scan';
const LS_RESTR  ='rd_restr';
const LS_META   ='rd_meta'; // per-player: avatarUrl, bannerUrl, monsterKey

let EXTRA_PLAYERS=[];
// PLAYER_META: { playerName: { avatarUrl, bannerUrl, monsterKey } }
let PLAYER_META={};

function lsSave(){
  try{
    localStorage.setItem(LS_ALIASES, JSON.stringify(ALIASES));
    localStorage.setItem(LS_PLAYERS, JSON.stringify(PC));
    localStorage.setItem(LS_EXTRA,   JSON.stringify(EXTRA_PLAYERS));
    const scans={};
    MH.forEach(m=>{if(m.scanResult)scans[m.gid]=m.scanResult;});
    localStorage.setItem(LS_SCAN, JSON.stringify(scans));
    localStorage.setItem(LS_RESTR, JSON.stringify(restr));
    localStorage.setItem(LS_META, JSON.stringify(PLAYER_META));
  }catch(e){console.warn('localStorage save failed',e);}
}

function lsLoad(){
  try{
    const a=localStorage.getItem(LS_ALIASES);
    if(a) Object.assign(ALIASES, JSON.parse(a));
    const p=localStorage.getItem(LS_PLAYERS);
    if(p) Object.assign(PC, JSON.parse(p));
    const ex=localStorage.getItem(LS_EXTRA);
    if(ex){ const arr=JSON.parse(ex); EXTRA_PLAYERS.splice(0,EXTRA_PLAYERS.length,...arr); }
    const s=localStorage.getItem(LS_SCAN);
    if(s){ const scans=JSON.parse(s); MH.forEach(m=>{if(scans[m.gid])m.scanResult=scans[m.gid];}); }
    const r=localStorage.getItem(LS_RESTR);
    if(r){ const loaded=JSON.parse(r); restr.splice(0,restr.length,...loaded); }
    const mt=localStorage.getItem(LS_META);
    if(mt) Object.assign(PLAYER_META, JSON.parse(mt));
  }catch(e){console.warn('localStorage load failed',e);}
}

// =====================================================================
// ALIASES: appName -> gameNick
// =====================================================================
let ALIASES = {Resek:'Cytrusia'};
function getAppName(gameNick) {
  for(const [app,game] of Object.entries(ALIASES)) {
    if(game.toLowerCase()===gameNick.toLowerCase()) return app;
  }
  return gameNick;
}
function getGameNick(appName) { return ALIASES[appName] || appName; }

// =====================================================================
// STATE
// =====================================================================

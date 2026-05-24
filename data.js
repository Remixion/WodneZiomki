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
// PATCH DATES — automatyczne wykrywanie patcha po dacie
// =====================================================================
const PATCHES=[
  {patch:'25.24',start:'2025-12-10'},
  {patch:'26.01',start:'2026-01-08'},
  {patch:'26.02',start:'2026-01-22'},
  {patch:'26.03',start:'2026-02-04'},
  {patch:'26.04',start:'2026-02-19'},
  {patch:'26.05',start:'2026-03-04'},
  {patch:'26.06',start:'2026-03-18'},
  {patch:'26.07',start:'2026-04-01'},
  {patch:'26.08',start:'2026-04-15'},
  {patch:'26.09',start:'2026-04-29'},
  {patch:'26.10',start:'2026-05-13'},
  {patch:'26.11',start:'2026-05-28'},
  {patch:'26.12',start:'2026-06-10'},
  {patch:'26.13',start:'2026-06-24'},
  {patch:'26.14',start:'2026-07-15'},
  {patch:'26.15',start:'2026-07-29'},
  {patch:'26.16',start:'2026-08-12'},
  {patch:'26.17',start:'2026-08-26'},
  {patch:'26.18',start:'2026-09-10'},
  {patch:'26.19',start:'2026-09-23'},
  {patch:'26.20',start:'2026-10-07'},
  {patch:'26.21',start:'2026-10-21'},
  {patch:'26.22',start:'2026-11-04'},
  {patch:'26.23',start:'2026-11-18'},
  {patch:'26.24',start:'2026-12-09'},
];

function getCurrentPatch(dateStr){
  const d=new Date(dateStr||new Date().toISOString().split('T')[0]);
  let result=PATCHES[0].patch;
  for(const p of PATCHES){
    if(new Date(p.start)<=d) result=p.patch;
    else break;
  }
  return result;
}

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
let MH=[];

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

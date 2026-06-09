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
// Complete champion list — updated dynamically from Data Dragon at startup
// This is a fallback list; fetchAllChamps() will update it at runtime
const CHAMPS={
  top:["Aatrox","Camille","Darius","Fiora","Gangplank","Garen","Gnar","Gwen","Illaoi","Irelia","Jax","Jayce","Kayle","Kennen","Malphite","Mordekaiser","Nasus","Ornn","Poppy","Quinn","Renekton","Riven","Rumble","Sett","Shen","Singed","Teemo","Tryndamere","Urgot","Vladimir","Volibear","Wukong","Yasuo","Yone"],
  jng:["Amumu","Bel'Veth","Briar","Diana","Ekko","Elise","Evelynn","Fiddlesticks","Gragas","Graves","Hecarim","Ivern","Jarvan IV","Kayn","Kha'Zix","Kindred","Lee Sin","Lillia","Master Yi","Nidalee","Nocturne","Nunu","Rammus","Rek'Sai","Rengar","Sejuani","Shaco","Shyvana","Taliyah","Trundle","Udyr","Vi","Viego","Volibear","Warwick","Wukong","Xin Zhao","Zac"],
  mid:["Ahri","Akali","Anivia","Annie","Aurora","Azir","Cassiopeia","Corki","Diana","Ekko","Fizz","Galio","Hwei","Irelia","Kassadin","Katarina","LeBlanc","Lissandra","Lux","Malzahar","Naafiri","Neeko","Orianna","Qiyana","Ryze","Sylas","Syndra","Taliyah","Twisted Fate","Veigar","Vel'Koz","Vex","Viktor","Yasuo","Yone","Zed","Ziggs","Zoe"],
  adc:["Aphelios","Ashe","Caitlyn","Corki","Draven","Ezreal","Jhin","Jinx","Kai'Sa","Kalista","Kindred","Kog'Maw","Lucian","Miss Fortune","Nilah","Samira","Senna","Seraphine","Sivir","Smolder","Swain","Tristana","Twitch","Varus","Vayne","Xayah","Zeri"],
  supp:["Alistar","Bard","Blitzcrank","Brand","Heimerdinger","Janna","Karma","Leona","Lulu","Lux","Milio","Morgana","Nami","Nautilus","Neeko","Pyke","Rakan","Renata","Senna","Seraphine","Sona","Soraka","Swain","Tahm Kench","Taric","Thresh","Vel'Koz","Xerath","Yuumi","Zilean","Zyra"]
};

// Full champion roster with EXACT Data Dragon key names (case-sensitive, used for image URLs)
let ALL_CHAMPS=["Aatrox","Ahri","Akali","Akshan","Alistar","Ambessa","Amumu","Anivia","Annie","Aphelios","Ashe","AurelionSol","Aurora","Azir","Bard","Belveth","Blitzcrank","Brand","Braum","Briar","Caitlyn","Camille","Cassiopeia","Chogath","Corki","Darius","Diana","DrMundo","Draven","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Hwei","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","KSante","Kaisa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Khazix","Kindred","Kled","KogMaw","LeBlanc","LeeSin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","MasterYi","Mel","Milio","MissFortune","MonkeyKing","Mordekaiser","Morgana","Naafiri","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","NunuWillump","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","RekSai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Smolder","Sona","Soraka","Swain","Sylas","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Velkoz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra","Zaahen"];

// Display names map: Data Dragon key (exact, case-sensitive) → display name shown to user
const CHAMP_DISPLAY={
  // Keys with special chars — exact Data Dragon filenames
  AurelionSol:"Aurelion Sol",
  Belveth:"Bel'Veth",
  Chogath:"Cho'Gath",
  DrMundo:"Dr. Mundo",
  JarvanIV:"Jarvan IV",
  Kaisa:"Kai'Sa",
  Khazix:"Kha'Zix",
  KogMaw:"Kog'Maw",
  KSante:"K'Sante",
  LeeSin:"Lee Sin",
  LeBlanc:"LeBlanc",
  MasterYi:"Master Yi",
  MissFortune:"Miss Fortune",
  MonkeyKing:"Wukong",
  NunuWillump:"Nunu & Willump",
  RekSai:"Rek'Sai",
  TahmKench:"Tahm Kench",
  TwistedFate:"Twisted Fate",
  Velkoz:"Vel'Koz",
  XinZhao:"Xin Zhao",
};

// Normalize any apostrophe/quote variant to straight apostrophe for comparison
function normApos(s){
  if(!s)return'';
  return s.replace(/[’‘ʼ`´]/g,"'");
}

function champDisplayName(key){return CHAMP_DISPLAY[key]||key;}

function champKey(displayName){
  if(!displayName)return'';
  const norm=normApos(displayName).trim();
  // 1. Exact match in CHAMP_DISPLAY values
  for(const [k,v] of Object.entries(CHAMP_DISPLAY)){
    if(normApos(v).toLowerCase()===norm.toLowerCase())return k;
  }
  // 2. Direct key match (already a Data Dragon key)
  const direct=norm.replace(/[' \-\.&]/g,'');
  const found=ALL_CHAMPS.find(k=>k.toLowerCase()===direct.toLowerCase());
  if(found)return found;
  // 3. Partial strip
  return direct;
}

// Helper: get Data Dragon image URL from champion name or key
function champImgUrl(nameOrKey){
  if(!nameOrKey)return'';
  const key=champKey(nameOrKey);
  const v=(typeof window!=='undefined'&&window._ddVersion)||'15.10.1';return key?'https://ddragon.leagueoflegends.com/cdn/'+v+'/img/champion/'+key+'.png':'';
}

// Fetch full champion list from Data Dragon at startup
async function fetchAllChamps(){
  try{
    // Fetch latest version first, then champion data
    const vr=await fetch('https://ddragon.leagueoflegends.com/api/versions.json',{cache:'no-store'});
    const versions=vr.ok?await vr.json():['15.10.1'];
    const latestVer=versions[0]||'15.10.1';
    const r=await fetch('https://ddragon.leagueoflegends.com/cdn/'+latestVer+'/data/en_US/champion.json',{cache:'no-store'});
    if(!r.ok)return;
    const data=await r.json();
    const keys=Object.keys(data.data).sort();
    ALL_CHAMPS=keys;
    // Update CHAMP_DISPLAY from data
    Object.values(data.data).forEach(c=>{
      // Store both straight and normalized versions
      if(c.id!==c.name)CHAMP_DISPLAY[c.id]=c.name;
    });
    // Rebuild autocomplete datalists if open
    // Update the patch version for image URLs
    window._ddVersion = latestVer;
    console.log('Champions loaded from Data Dragon:',ALL_CHAMPS.length,'version:',latestVer);
  }catch(e){
    console.warn('fetchAllChamps failed:',e.message);
  }
}

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
    if(typeof recentPlayers!=='undefined') localStorage.setItem('rd_recent', JSON.stringify(recentPlayers));
    // Save imported match JSON data (survives refresh)
    if(typeof _meczeData!=='undefined'){
      try{
        // Trim runes/itemsEnriched to save space
        const trimmed={};
        Object.entries(_meczeData).forEach(([k,m])=>{
          trimmed[k]={...m,participants:(m.participants||[]).map(p=>{
            const {itemsEnriched,...rest}=p;
            return rest;
          })};
        });
        localStorage.setItem('wc_meczeData', JSON.stringify(trimmed));
      }catch(e2){/* quota exceeded - skip */}
    }
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
    const rc=localStorage.getItem('rd_recent');
    if(rc&&typeof recentPlayers!=='undefined'){ const arr=JSON.parse(rc); recentPlayers.splice(0,recentPlayers.length,...arr); }
  }catch(e){console.warn('localStorage load failed',e);}
}

// =====================================================================
// ALIASES: appName -> gameNick
// =====================================================================
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

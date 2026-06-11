// =====================================================================
// CONFIG.JS — publiczne URLe do Google Sheets
// Edytuj TYLKO ten plik gdy zmieniają się adresy arkuszy.
// =====================================================================

// ID opublikowanego arkusza (część po /e/ w URL publikacji)
const SHEETS_PUB_ID = '2PACX-1vQjZVf5nAGy-yyxmbu09cfzTZML2HSqKgSM0PLsp4jxvE-2QV-WRLpLiIF5rRru0F7Lw5FfiAzQmEBz';

// GID każdego arkusza — znajdź klikając zakładkę w Sheets i patrząc na #gid=XXXX w URL
const SHEETS_GIDS = {
  Mecze:        0,           // zwykle 0 (pierwszy arkusz)
  MatchDetails: 781182254,
  Gracze:       1833978133,
};

// ── Wygenerowane URLe (nie edytuj) ─────────────────────────────────
function _sheetCsvUrl(gid){
  return `https://docs.google.com/spreadsheets/d/e/${SHEETS_PUB_ID}/pub?gid=${gid}&single=true&output=csv`;
}

// Nadpisz GS_CONFIG po załadowaniu data.js
window.addEventListener('DOMContentLoaded', ()=>{}, {once:true});
(function applySheetUrls(){
  if(typeof GS_CONFIG !== 'undefined'){
    if(SHEETS_GIDS.Mecze        !== 'WKLEJ_GID') GS_CONFIG.csvUrl        = _sheetCsvUrl(SHEETS_GIDS.Mecze);
    if(SHEETS_GIDS.MatchDetails !== 'WKLEJ_GID') GS_CONFIG.detailsCsvUrl = _sheetCsvUrl(SHEETS_GIDS.MatchDetails);
    if(SHEETS_GIDS.Gracze       !== 'WKLEJ_GID') GS_CONFIG.playersCsvUrl = _sheetCsvUrl(SHEETS_GIDS.Gracze);
  }
})();

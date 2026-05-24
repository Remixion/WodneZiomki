// =====================================================================
// PLAYERS.JS — lista graczy, kolory, aliasy, meta profili
// Edytuj ten plik aby dodać/usunąć graczy lub zmienić ich dane.
// =====================================================================

// Kolory graczy { NazwaWAplikacji: '#hexkolor' }
// Dodaj nowego gracza: 'Nick': '#kolor',
const PC = {
  Arek:      '#C8AA6E',
  Resek:     '#5DADE2',
  Kosior:    '#1DE9B6',
  Songo:     '#E84855',
  Radio:     '#9B59B6',
  Jusko:     '#F39C12',
  Limcia:    '#2ECC71',
  Pajfu:     '#E67E22',
  Jagoda:    '#FF69B4',
  Toffic:    '#00BCD4',
  Kamila:    '#FF6B9D',
  Shot:      '#A78BFA',
  Ezra:      '#34D399',
  Derko:     '#FCD34D',
  Maciej:    '#60A5FA',
  Abrose:    '#F87171',
  Ban:       '#818CF8',
  Ashdevil:  '#FB923C',
  Koharu:    '#4ADE80',
  Funfel:    '#38BDF8',
  Salencja:  '#E879F9',
  Falafel:   '#FACC15',
  'EloŻelo': '#A3E635',
  Jumcia:    '#FB7185',
  Fsmesdek:  '#67E8F9',
  'Emoś':    '#86EFAC',
};

// Aliasy: NazwaWAplikacji → Nick w grze (Riot ID)
// Używane przy AI Scan i wyświetlaniu
let ALIASES = {
  Resek: 'Cytrusia',
  // Dodaj kolejne: NickAplikacja: 'NickWGrze',
};

// Gracze dodani ręcznie przez UI (persystowane w localStorage)
let EXTRA_PLAYERS = [];

// Meta profili: avatary, banery, stwory { NazwaGracza: { avatarUrl, bannerUrl, monsterKey } }
let PLAYER_META = {};

// =====================================================================
// HELPER — inicjały gracza (do awatara)
const ini = n => n ? n.slice(0, 2).toUpperCase() : '??';

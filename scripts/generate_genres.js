const fs = require('fs');
const path = require('path');

const mediaPath = path.join(__dirname, '..', 'MediaList.json');
const addonPath = path.join(__dirname, '..', 'addon.js');
const outPath = path.join(__dirname, '..', 'genres.json');

const mediaContent = fs.readFileSync(mediaPath, 'utf8');
const addonContent = fs.readFileSync(addonPath, 'utf8');

// Extract quoted titles from MediaList.json (ignore comments and blank lines)
const titleRegex = /"([^"]+)"/g;
let m;
const titles = [];
while ((m = titleRegex.exec(mediaContent)) !== null) {
  titles.push(m[1].trim());
}

// Helper to extract genre array for a given title from addon.js
function extractGenresForTitle(title) {
  const nameEsc = title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  // Find the block that contains name: "title"
  const objRegex = new RegExp('name:\\s*"' + nameEsc + '"([\\s\\S]{0,800})genre:\\s*\\[([^\\]]*)\\]', 'i');
  const objMatch = addonContent.match(objRegex);
  if (!objMatch) return null;
  const genreListRaw = objMatch[2];
  // split by commas, remove quotes and whitespace
  const genres = genreListRaw
    .split(',')
    .map((g) => g.replace(/["'`]/g, '').trim())
    .filter(Boolean);
  return genres;
}

// Custom tag keyword lists (should match filter logic)
const animeTitles = [
  "invincible fight girl",
  "bleach",
  "one piece",
  "cowboy bebop",
  "inuyasha",
  "fullmetal alchemist",
  "full metal alchemist: brotherhood",
  "samurai champloo",
  "trigun",
  "flcl",
  "yu yu hakusho",
  "big o",
  "s-cry-ed",
  "afro samurai",
  "megas xlr",
  "akira",
  "paprika",
  "redline",
  "sword of the stranger",
  "ghost in the shell",
  "summer wars",
  "cowboy bebop: the movie",
];
const liveTitles = [
  "the eric andre show",
  "delocated",
  "dream corp llc",
  "your pretty face is going to hell",
  "eagleheart",
  "nts f:sd:suv::",
  "hot streets",
  "king star king",
  "ballmastrz: 9009",
  "the ripping friends",
];
const fxTitles = [
  "golan the insatiable",
  "mr. pickles",
  "momma named me sheriff",
  "the ripping friends",
];

function determineCustomTags(title, stdGenres) {
  const custom = new Set();
  const titleLower = title.toLowerCase();
  const genreLower = (stdGenres || []).map((g) => g.toLowerCase());

  // Adult Animation
  if (genreLower.some((g) => g.includes('animation'))) custom.add('Adult Animation');

  // Anime
  if (
    genreLower.some((g) => g.includes('anime') || g.includes('japan')) ||
    animeTitles.some((a) => titleLower.includes(a))
  )
    custom.add('Anime');

  // Action
  if (genreLower.some((g) => g.includes('action') || g.includes('adventure'))) custom.add('Action');

  // Comedy
  if (genreLower.some((g) => g.includes('comedy'))) custom.add('Comedy');

  // FX
  if (fxTitles.some((f) => titleLower.includes(f)) || genreLower.some((g) => g.includes('horror'))) custom.add('FX');

  // Sci-Fi
  if (genreLower.some((g) => g.includes('sci') || g.includes('science') || g.includes('fantasy'))) custom.add('Sci-Fi');

  // Live
  if (
    genreLower.some((g) => g.includes('live') || g.includes('reality') || g.includes('talk') || g.includes('music')) ||
    liveTitles.some((l) => titleLower.includes(l))
  )
    custom.add('Live');

  return Array.from(custom);
}

const output = [];
for (const t of titles) {
  const std = extractGenresForTitle(t);
  const custom = determineCustomTags(t, std);
  output.push({ title: t, standard_genres: std || [], custom_genres: custom });
}

fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`Wrote ${output.length} entries to ${outPath}`);

// --- 24/7 Adult Swim Live Channels (M3U/EPG) ---
let xml2js;
try {
  xml2js = require("xml2js");
} catch (e) {
  xml2js = null;
}

// Prefer the global fetch (Node 18+ / Vercel) and fall back to node-fetch v2 when installed
let fetchFn;
try {
  fetchFn = globalThis.fetch || require("node-fetch");
} catch (e) {
  fetchFn = globalThis.fetch || null;
}

function parseM3U(content) {
  const lines = content.split("\n");
  const items = [];
  let currentItem = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("#EXTINF:")) {
      const matches = line.match(/#EXTINF:(-?\d+)(?:\s+(.*))?,(.*)/);
      if (matches) {
        currentItem = {
          duration: parseInt(matches[1]),
          attributes: parseAttributes(matches[2] || ""),
          name: (matches[3] || "").trim(),
        };
      }
    } else if (line && !line.startsWith("#") && currentItem) {
      currentItem.url = line;
      currentItem.logo = currentItem.attributes["tvg-logo"];
      currentItem.epg_channel_id =
        currentItem.attributes["tvg-id"] || currentItem.attributes["tvg-name"];
      currentItem.category = currentItem.attributes["group-title"];
      currentItem.id = `iptv_${Buffer.from(currentItem.name + currentItem.url)
        .toString("base64")
        .slice(0, 16)}`;
      items.push(currentItem);
      currentItem = null;
    }
  }
  return items;
}

function parseAttributes(str) {
  const attrs = {};
  const regex = /(\w+(?:-\w+)*)="([^"]*)"/g;
  let m;
  while ((m = regex.exec(str)) !== null) attrs[m[1]] = m[2];
  return attrs;
}

async function parseEPG(content) {
  if (!xml2js) return {};
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(content);
  const epgData = {};
  if (result.tv && result.tv.programme) {
    for (const prog of result.tv.programme) {
      const ch = prog.$.channel;
      if (!epgData[ch]) epgData[ch] = [];
      epgData[ch].push({
        start: prog.$.start,
        stop: prog.$.stop,
        title: prog.title ? prog.title[0]._ || prog.title[0] : "Unknown",
        desc: prog.desc ? prog.desc[0]._ || prog.desc[0] : "",
      });
    }
  }
  return epgData;
}
const { addonBuilder } = require("stremio-addon-sdk");

// Addon manifest
const manifest = {
  id: "com.adultswim.catalog.addon",
  version: "1.1.0",
  name: "Adult Swim Catalog",
  description: "Adult Swim movies and series catalog for Stremio",

  // Resources provided by this addon
  resources: ["catalog", "meta"],

  // Types of content this addon provides
  types: ["movie", "series", "tv"],

  // Catalog definition
  catalogs: [
    {
      type: "movie",
      id: "adultswim-movies",
      name: "Adult Swim Movies",
      extra: [
        { name: "skip", isRequired: false },
        {
          name: "genre",
          isRequired: false,
          options: [
            "Adult Animation",
            "Anime",
            "Action",
            "Comedy",
            "FX",
            "Sci-Fi",
            "Live",
          ],
          optionsLimit: 1,
        },
        {
          name: "sort",
          isRequired: false,
          options: ["A-Z", "Z-A", "Newest First", "Oldest First"],
          optionsLimit: 1,
        },
      ],
    },
    {
      type: "series",
      id: "adultswim-series",
      name: "Adult Swim Series",
      extra: [
        { name: "skip", isRequired: false },
        {
          name: "genre",
          isRequired: false,
          options: [
            "Adult Animation",
            "Anime",
            "Action",
            "Comedy",
            "FX",
            "Sci-Fi",
            "Live",
          ],
          optionsLimit: 1,
        },
        {
          name: "sort",
          isRequired: false,
          options: ["A-Z", "Z-A", "Newest First", "Oldest First"],
          optionsLimit: 1,
        },
      ],
    },
    {
      type: "tv",
      id: "adultswim-live",
      name: "24/7 Adult Swim Channels",
      extra: [
        { name: "skip", isRequired: false },
        {
          name: "genre",
          isRequired: false,
          options: ["Live", "Adult Swim"],
          optionsLimit: 1,
        },
      ],
    },
  ],
};

// Create addon builder
const builder = new addonBuilder(manifest);

// Adult Swim Movies
const adultSwimMovies = [
  {
    id: "13158",
    type: "movie",
    name: "Aqua Teen Hunger Force Colon Movie Film for Theaters",
    poster: "https://image.tmdb.org/t/p/w500/q3Ln4x4rv4nJsBBfukjvH2wiU28.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/zNGe2UHloFU0RXMyLukhhMAUi14.jpg",
    genre: [
      "Comedy",
      "Action",
      "Animation",
      "Adventure",
      "Fantasy",
      "Science Fiction",
    ],
    releaseInfo: "2007-04-13",
    description:
      "An action epic that explores the origins of the Aqua Teen Hunger Force (better known as Master Shake, Frylock, and Meatwad,) who somehow become pitted in a battle over an immortal piece of exercise equipment.",
  },
  {
    id: "828900",
    type: "movie",
    name: "Aqua Teen Forever: Plantasm",
    poster: "https://image.tmdb.org/t/p/w500/sQGpuvOporRBSjFFPuQxaRhDx2n.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/3vNbMbgPXGpvhtviYfQyTHFDElc.jpg",
    genre: ["Animation", "Comedy", "Science Fiction"],
    releaseInfo: "2022-10-06",
    description:
      "Everyone’s favorite rascals, the Aqua Teens, and everyone’s favorite perverted neighbor, Carl, split up then get back together to fight everyone’s favorite corporate overlord, Amazin, led by everyone’s favorite tech mogul, Neil, and his trusty scientist sidekick, Elmer.",
  },
  {
    id: "828899",
    type: "movie",
    name: "Metalocalypse: Army of the Doomstar",
    poster: "https://image.tmdb.org/t/p/w500/fGc9HKeGKebC1RD7WPt0NYDONTo.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/qIZ0MS67mJPvEXFgUymBJiU22mc.jpg",
    genre: ["Animation", "Comedy", "Music"],
    releaseInfo: "2023-08-22",
    description:
      "After the heroic rescue of Toki Wartooth, DETHKLOK frontman Nathan Explosion finds himself traumatized in a BRUTAL professional and romantic flat-spin all while he is tasked with fulfilling the prophecy and confronting the ultimate songwriting challenge: write the SONG OF SALVATION and save the planet. Can Nathan Explosion look beyond his brutally damaged ego to save his band, stop the Metalocalypse, and finally face the ultimate evil: Salacia?",
  },
  {
    id: "328407",
    type: "movie",
    name: "Metalocalypse: The Doomstar Requiem - A Klok Opera",
    poster: "https://image.tmdb.org/t/p/w500/AjZcj7wB6GRpKeKEqeqgcU1r03Y.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/xRw4cBKGQ1LTftGjav34RoKrLuL.jpg",
    genre: ["Animation", "Music", "Comedy", "Drama"],
    releaseInfo: "2013-10-27",
    description:
      "While Toki and Abigail remain in the clutches of Magnus Hammersmith and the Metal Masked Assassin, the remaining members of Dethklok carry on with their lives while pretending not to care. But as their guilt mounts and their fans become increasingly restless with Toki's absence, they realize that they must find a way to rescue their brother.",
  },
  {
    id: "828898",
    type: "movie",
    name: "The Venture Bros.: Radiant Is the Blood of the Baboon Heart",
    poster: "https://image.tmdb.org/t/p/w500/u3ZgJfyBpTox5U7RfhCDIXlHnO4.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/wzZdAtGdnVgrbjiXEbhjarENs16.jpg",
    genre: ["Animation", "Action", "Adventure", "Science Fiction"],
    releaseInfo: "2023-07-21",
    description:
      "A nationwide manhunt for Hank Venture leads to untold dangers and unexpected revelations, while The Monarch is literally out for Dr Venture's blood. An imposing evil from the past reemerges to wreak havoc on the Ventures, The Guild, and even the Monarch marriage—it will take friends and foes alike to restore the Ventures' world to order… or end it once and for all.",
  },
  {
    id: "42979",
    type: "movie",
    name: "Robot Chicken: Star Wars",
    poster: "https://image.tmdb.org/t/p/w500/h44WN4mVJ6wEpJgLaaNoFjv0NAo.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/ab69mLLogDKRKAPiEXSUEvrafTZ.jpg",
    genre: [""],
    releaseInfo: "2007-07-17",
    description:
      "A series of 30 sketches, following the hilarious antics of various characters from a galaxy, far, far away.",
  },
  {
    id: "42982",
    type: "movie",
    name: "Robot Chicken: Star Wars Episode II",
    poster: "https://image.tmdb.org/t/p/w500/dM5eCurdAXYd3Dvyr9Rz2YSj3rJ.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/oJNrNkSb6NBRlOCplioFQhvR7M4.jpg",
    genre: [
      "Science Fiction",
      "Animation",
      "Comedy",
      "Action",
      "Adventure",
      "Fantasy",
      "TV Movie",
    ],
    releaseInfo: "2008-11-16",
    description:
      'Seth Green and Matthew Senreich serve up more hilarious Star Wars-inspired satire in this second compilation of sketches featuring the zany stop-motion animation of Adult Swim\'s "Robot Chicken." Gary the stormtrooper deals with irascible boss Darth Vader on Take Your Daughter to Work Day, while Anakin babysits a certain up-and-coming Jedi.',
  },
  {
    id: "51888",
    type: "movie",
    name: "Robot Chicken: Star Wars Episode III",
    poster: "https://image.tmdb.org/t/p/w500/mi2lVho2zpfwcxI6yC1QYJi435D.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/rrQJwg3jFQasEilhmq8TMpGocb1.jpg",
    genre: [
      "Comedy",
      "Science Fiction",
      "Animation",
      "TV Movie",
      "Action",
      "Adventure",
      "Fantasy",
    ],
    releaseInfo: "2010-12-19",
    description:
      "Millions of years from now, after Socrates, Shakespeare and the bible are long forgotten, only two great works will remain: the sci-fi cinema epic Star Wars and Adult Swim's stop-motion animated, cheap gag extravanganza Robot Chicken. And now, for the first time, they come together for the third time, in this all new special. That's right, all your mot beloved Star Wars characters are going back through the comedy meat grinder.",
  },
  {
    id: "145174",
    type: "movie",
    name: "Robot Chicken: DC Comics Special",
    poster: "https://image.tmdb.org/t/p/w500/kYHOYvRApTTY2TzxCixEsNeDKC2.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/x15h3hhEJ3moV9bojeYJddi5yW1.jpg",
    genre: ["Animation", "Comedy", "Science Fiction"],
    releaseInfo: "2012-09-09",
    description:
      "The Robot Chicken DC Comics Special brings you the awesomeness of the DC Comics universe of characters as only Robot Chicken can, with amazing guest stars and the stop-motion sketch comedy you've come to love.",
  },
  {
    id: "263484",
    type: "movie",
    name: "Robot Chicken DC Comics Special II: Villains in Paradise",
    poster: "https://image.tmdb.org/t/p/w500/oeM92UDXNqvOcm5fpTeWsyGKsuX.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/oDvmpIo6zBalZw3wOqTnA3IegOK.jpg",
    genre: ["Animation", "Comedy", "Science Fiction"],
    releaseInfo: "2014-04-06",
    description:
      "The Robot Chicken crew takes a peek at what happens when the DC villains end up on the same beach as the DC heroes on spring break!",
  },
  {
    id: "363863",
    type: "movie",
    name: "Robot Chicken DC Comics Special III: Magical Friendship",
    poster: "https://image.tmdb.org/t/p/w500/1SCkb0XAJUlqr9ugt91Up94P1LF.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/cXOmsj07pbIpAbI8sZ4UGqiyjco.jpg",
    genre: ["Animation", "Comedy", "Science Fiction"],
    releaseInfo: "2015-10-18",
    description:
      "The Robot Chicken DC Comics Special 3: Magical Friendship surrenders DC Comics' multitude of Super Heroes and Super-Villains to the demented whims of the award-winning Robot Chicken for a triumphant third time. This time around, Batman and Superman’s bromance takes a competitive turn and the fate of the universe somehow hangs in the balance!",
  },
  {
    id: "15575",
    type: "movie",
    name: "Bleach the Movie: Memories of Nobody",
    poster: "https://image.tmdb.org/t/p/w500/1QXGWJ0bsmbMUDBXXfS1RnFadkS.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/5VhdliaIS5Y4QQRDT0jpxfJQdfM.jpg",
    genre: ["Fantasy", "Animation", "Science Fiction"],
    releaseInfo: "2006-12-16",
    description:
      "In Karakura Town, unidentifiable spirits begin appearing en mases. While attempting to deal with these strange souls, Ichigo Kurosaki and Rukia Kuchiki meet Senna, a mysterious shinigami who wipes out most of them. Senna refuses to answer any questions, so Ichigo is forced to follow her while Rukia tries to find out what's going on.",
  },
  {
    id: "17101",
    type: "movie",
    name: "Bleach the Movie: The DiamondDust Rebellion",
    poster: "https://image.tmdb.org/t/p/w500/1PV8OKvHSYvgmdVnU2wcuzQGthP.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/vmuvk8DSUyk6IUyrvgyxZAAITmP.jpg",
    genre: ["Action", "Animation", "Thriller"],
    releaseInfo: "2007-12-22",
    description:
      'When an artifact known as the "King\'s Seal" is stolen during transport from Soul Society, Hitsugaya Toushirou is assigned to retrieve it. Toushirou goes missing after a battle with the thieves, leading Seireitei to suspect him of treachery. They order his immediate capture and execution. Unwilling to believe him capable of such a crime, Ichigo, Rangiku, Rukia, and Renji set out to find Toushirou.',
  },
  {
    id: "17165",
    type: "movie",
    name: "Bleach the Movie: Fade to Black",
    poster: "https://image.tmdb.org/t/p/w500/IfR2DrWLb26AAdQFwGkhvPTflX.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/4RnhZgXAwvPR1P3MYj3rLfW3kts.jpg",
    genre: ["Action", "Animation", "Fantasy", "Drama"],
    releaseInfo: "2008-12-13",
    description:
      "A mysterious reiatsu (spiritual particle) explosion occurs in the center of Seireitei in Soul Society, causing it to be destroyed. At the exact same time, a major change overwhelms Kuchiki Rukia, which leaves her losing something important inside. Urahara Kisuke sends Kurosaki Ichigo to Soul Society to investigate the disturbance. Upon reaching Seireitei, Ichigo is attacked by his ally shinigamis.",
  },
  {
    id: "73245",
    type: "movie",
    name: "Bleach the Movie: Hell Verse",
    poster: "https://image.tmdb.org/t/p/w500/pd7V5iCB19VBPJkihxFXFwSRW2M.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/nuQSpGRKJkxnLOMWzZD8UZ6E92B.jpg",
    genre: ["Action", "Animation", "Fantasy", "Adventure"],
    releaseInfo: "2010-12-04",
    description:
      "Hell – A place where beings that have committed mortal sins during their lifetime are sent. It is a realm where even Soul Reapers are forbidden to interfere. When a group of vicious Sinners plot to escape from this eternal prison, they discover that Substitute Soul Reaper Ichigo Kurosaki is the key to their freedom.",
  },
  {
    id: "11299",
    type: "movie",
    name: "Cowboy Bebop: The Movie",
    poster: "https://image.tmdb.org/t/p/w500/34H5bsNc0EPILVr49TfOYXj50qV.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/19EKawKy1Z7nUJMhQE28XBL6Guc.jpg",
    genre: ["Action", "Animation", "Science Fiction"],
    releaseInfo: "2001-09-01",
    description:
      "The year is 2071. Following a terrorist bombing, a deadly virus is released on the populace of Mars and the government has issued the largest bounty in history, for the capture of whoever is behind it. The bounty hunter crew of the spaceship Bebop; Spike, Faye, Jet and Ed, take the case with hopes of cashing in the bounty. However, the mystery surrounding the man responsible, Vincent, goes deeper than they ever imagined, and they aren't the only ones hunting him.",
  },
  {
    id: "42360",
    type: "movie",
    name: "Inuyasha the Movie: Affections Touching Across Time",
    poster: "https://image.tmdb.org/t/p/w500/gl8TvgVL6B2PR71cnrG7PbAUPls.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/aWg40fkUvghFwrCya2fHvAEvjud.jpg",
    genre: ["Action", "Animation", "Adventure", "Fantasy"],
    releaseInfo: "2001-12-15",
    description:
      "InuYasha is a half-demon who was trapped in the Legendary Tree and was set free by Kagome, a girl who traveled 500 years through time. This time, both of them will have to face Menomaru, a Chinese demon whose father, known as Hyoga, came 300 years ago to invade Japan, but was stopped by InuYasha's Father. InuYasha and Kagome, along with Sango, Miroku, Shippou, Kaede and Myoga, will try to stop Menomaru in his becoming the most powerful demon ever.",
  },
  {
    id: "80518",
    type: "movie",
    name: "Fullmetal Alchemist: The Sacred Star of Milos",
    poster: "https://image.tmdb.org/t/p/w500/7RvBQOTZGhCoPvLiF3Ugp2Q94Ux.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/rFkiZNiub7Q7eGPYdM4JGRVLcCn.jpg",
    genre: ["Adventure", "Fantasy", "Animation", "Action", "Science Fiction"],
    releaseInfo: "2011-07-02",
    description:
      "A fugitive alchemist with mysterious abilities leads the Elric brothers to a distant valley of slums inhabited by the Milos, a proud people struggling against bureaucratic exploitation. Ed and Al quickly find themselves in the middle of a rising rebellion, as the exiled Milos lash out against their oppressors. At the heart of the conflict is Julia, a young alchemist befriended by Alphonse. She'll stop at nothing to restore the Milos to their former glory – even if that means harnessing the awful power of the mythical Philosopher's Stone.",
  },
  {
    id: "18874",
    type: "movie",
    name: "Ghost in the Shell: Stand Alone Complex - Solid State Society",
    poster: "https://image.tmdb.org/t/p/w500/tExdDYmxqv30rtf2dMkTAVpzORf.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/xl7yVV8WH71aOBfcTgnkoGOx2qz.jpg",
    genre: ["Animation", "Action", "Thriller", "Crime", "Science Fiction"],
    releaseInfo: "2007-09-01",
    description:
      "The story takes place in the year 2034, two years after the events in Ghost in the Shell: S.A.C. 2nd GIG. Female cyborg Major Motoko Kusanagi has left Public Security Section 9, an elite counter-terrorist and anti-crime unit specializing in cyber-warfare, which has expanded to a team of 20 field operatives with Togusa acting as the field lead.",
  },
  {
    id: "149",
    type: "movie",
    name: "Akira",
    poster: "https://image.tmdb.org/t/p/w500/neZ0ykEsPqxamsX6o5QNUFILQrz.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/fK40VGYIm7hmKrLJ26fgPQU0qRG.jpg",
    genre: ["Animation", "Science Fiction", "Action"],
    releaseInfo: "1988-06-10",
    description:
      "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath that only two teenagers and a group of psychics can stop.",
  },
  {
    id: "19544",
    type: "series",
    name: "Afro Samurai",
    poster: "https://image.tmdb.org/t/p/w500/1wif9a57obZA5N1UujiluoUahkI.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/4MgI4sp5hLdz4ZZ9OieYjHk7y5N.jpg",
    genre: ["Animation", "Action & Adventure", "Drama", "Sci-Fi & Fantasy"],
    releaseInfo: "2007-01-04",
    description:
      "In a futuristic Japan where conflicts are settled by the sword, Afro Samurai must avenge his father's murder by challenging a powerful warrior.",
  },
  {
    id: "14711",
    type: "movie",
    name: "Afro Samurai: Resurrection",
    poster: "https://image.tmdb.org/t/p/w500/6snrLj3Ydmbu5L9giAYtiSNwE0U.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/4rNjTccVltQHKKJd6INzqHtfV5x.jpg",
    genre: [
      "Animation",
      "Action",
      "Adventure",
      "Drama",
      "Fantasy",
      "Science Fiction",
      "TV Movie",
    ],
    releaseInfo: "2009-10-16",
    description:
      "Afro Samurai avenged his father and found a life of peace. But the legendary master is forced back into the game by a beautiful and deadly woman from his past. The sparks of violence dropped along Afro’s bloody path now burn out of control – and nowhere are the flames of hatred more intense than in the eyes of Sio.",
  },
  {
    id: "51859",
    type: "movie",
    name: "Trigun: Badlands Rumble",
    poster: "https://image.tmdb.org/t/p/w500/7JYK0FBs2nX6ikqeT6rDzEZRM.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/1MWwdzZAdEac2VRkvNWRAWx340s.jpg",
    genre: ["Action", "Animation", "Science Fiction", "Adventure"],
    releaseInfo: "2010-04-24",
    description:
      "In a quicksand surrounded town called Makka, rumors spread of a legendary robber named Gasback is after the town. To protect it, Mayor Kepler has hired bounty hunters. These hunters have been following Gasback from town to town in hopes of getting the bounty. Vash the Stampede is in town, along with Meryl and Milly, along with the female bounty hunter Amelia and Nicholas D. Wolfwood.",
  },
  {
    id: "28874",
    type: "movie",
    name: "Summer Wars",
    poster: "https://image.tmdb.org/t/p/w500/yHy8TrRLnuBZ4t2C0l0pSpRXVHO.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/wSFAoevZuVBo4L9f8NgYSD1o9cQ.jpg",
    genre: ["Animation", "Science Fiction"],
    releaseInfo: "2009-08-01",
    description:
      "Teenage math whiz Kenji Koiso agrees to take a summer job at the Nagano hometown of his crush, Natsuki. When he arrives, he finds that her family have reunited to celebrate the 90th birthday of their matriarch. His job: pretend to be Natsuki's fiancé. Meanwhile, his attempt to solve a mathematical equation causes a parallel world's collision with Earth.",
  },
  {
    id: "4977",
    type: "movie",
    name: "Paprika",
    poster: "https://image.tmdb.org/t/p/w500/bLUUr474Go1DfeN1HLjE3rnZXBq.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/zfbuY4A9X5sTJ2bzTt84rtiDK9t.jpg",
    genre: [""],
    releaseInfo: "2006-10-01",
    description:
      "When a machine that allows therapists to enter their patient's dreams is stolen, all hell breaks loose. Only a young female therapist can stop it and recover it before damage is done: Paprika.",
  },
  {
    id: "71883",
    type: "movie",
    name: "Redline",
    poster: "https://image.tmdb.org/t/p/w500/yUkH0y9OsY7J08Dvfzi1P0di559.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/cftD8o34P6N8zTwySfaaMnaNkTT.jpg",
    genre: ["Animation", "Action", "Science Fiction"],
    releaseInfo: "2009-08-14",
    description:
      "A daredevil driver is determined to compete in Redline, the most popular race in the galaxy. The race only occurs every five years, but in order to participate he must overcome the mafia, the government and even love.",
  },
  {
    id: "13980",
    type: "movie",
    name: "Sword of the Stranger",
    poster: "https://image.tmdb.org/t/p/w500/lMsUYZq5ITW3rAqF3tB7v74KEnH.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/zUARkXDmYN2zOlzTFG8g4k7037p.jpg",
    genre: ["Action", "Animation", "History"],
    releaseInfo: "2007-09-29",
    description:
      "Pursued by formidable Chinese assassins, young Kotaro and his dog run into No Name, a mysterious stranger who gets pulled into the chase. The unlikely companions form a bond over saving the dog from a poison attack, but chaos erupts when the assassins find Kotaro, and No Name must face his past before a horrible fate is met again.",
  },
];

// Adult Swim Series
const adultSwimSeries = [
  {
    id: "60625",
    type: "series",
    name: "Rick and Morty",
    poster: "https://image.tmdb.org/t/p/w500/WGRQ8FpjkDTzivQJ43t94bOuY0.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/9In9QgVJx7PlFOAgVHCKKSbo605.jpg",
    genre: ["Animation", "Comedy", "Sci-Fi & Fantasy", "Action & Adventure"],
    releaseInfo: "2013-12-02",
    description:
      "Follows a sociopathic genius scientist who drags his inherently timid grandson on adventures across the universe.",
  },
  {
    id: "1434",
    type: "series",
    name: "Family Guy",
    poster: "https://image.tmdb.org/t/p/w500/8o8kiBkWFK3gVytHdyzEWUBXVfK.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/lgGZ2ysbRyAOi2VgIZpp6k8qILj.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "1999-01-31",
    description:
      "Sick, twisted, politically incorrect and Freakin' Sweet animated series featuring the adventures of the dysfunctional Griffin family. Bumbling Peter and long-suffering Lois have three kids. Stewie (a brilliant but sadistic baby bent on killing his mother and taking over the world), Meg (the oldest, and is the most unpopular girl in town) and Chris (the middle kid, he's not very bright but has a passion for movies). The final member of the family is Brian - a talking dog and much more than a pet, he keeps Stewie in check whilst sipping Martinis and sorting through his own life issues.",
  },
  {
    id: "1433",
    type: "series",
    name: "American Dad!",
    poster: "https://image.tmdb.org/t/p/w500/aC1q422YhQR7k82GB8gW4KoD91p.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/skBNukpZWvr5AhqPDEaO262Rjkr.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2005-02-06",
    description:
      "The series focuses on an eccentric motley crew that is the Smith family and their three housemates: Father, husband, and breadwinner Stan Smith; his better half housewife, Francine Smith; their college-aged daughter, Hayley Smith; and their high-school-aged son, Steve Smith. Outside of the Smith family, there are three additional main characters, including Hayley's boyfriend turned husband, Jeff Fischer; the family's man-in-a-goldfish-body pet, Klaus; and most notably the family's zany alien, Roger, who is \"full of masquerades, brazenness, and shocking antics.\"",
  },
  {
    id: "32726",
    type: "series",
    name: "Bob's Burgers",
    poster: "https://image.tmdb.org/t/p/w500/iIHsQe3Qjs3NH62HdamyQEPeqTR.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/xnU9b4IehJ08Ikz3sweABtY5IwU.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2011-01-09",
    description:
      "Bob's Burgers follows a third-generation restaurateur, Bob, as he runs Bob's Burgers with the help of his wife and their three kids. Bob and his quirky family have big ideas about burgers, but fall short on service and sophistication. Despite the greasy counters, lousy location and a dearth of customers, Bob and his family are determined to make Bob's Burgers \"grand re-re-re-opening\" a success.",
  },
  {
    id: "15632",
    type: "series",
    name: "The Cleveland Show",
    poster: "https://image.tmdb.org/t/p/w500/Qp4gvTc5Cp15VBdt77oXKQ54xF.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/2CmVYL5aOebxlE4cUl5xU4kcgdc.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2009-09-27",
    description: "The bizarre adventures of Cleveland Brown and his family.",
  },
  {
    id: "251",
    type: "series",
    name: "Aqua Teen Hunger Force",
    poster: "https://image.tmdb.org/t/p/w500/jCWOkfMLsT2sGHadCkmR65MWtJu.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/5QWdGKrPWJQ3WcafuYA2PXL6uQG.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2000-12-30",
    description:
      "The surreal adventures of three anthropomorphic fast food items: Master Shake, Frylock and Meatwad, and their human nextdoor neighbor, Carl Brutananadilewski.",
  },
  {
    id: "709",
    type: "series",
    name: "Robot Chicken",
    poster: "https://image.tmdb.org/t/p/w500/lMZv3mJC9QRolgzflM3ajtB3o2U.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/mofoDq8K1tvhSKE00NrlLkS7Mrg.jpg",
    genre: ["Comedy", "Animation"],
    releaseInfo: "2005-02-20",
    description:
      "A series of pop-culture parodies using stop-motion animation of toys, action figures and dolls. The title character was an ordinary chicken until he was run down by a car and subsequently brought back to life in cyborg form by mad scientist Fritz Huhnmorder, who tortures Robot Chicken by forcing him to watch a random selection of TV shows, the sketches that make up the body of each episode.",
  },
  {
    id: "2418",
    type: "series",
    name: "The Venture Bros.",
    poster: "https://image.tmdb.org/t/p/w500/ckQE1aLYQkRpp2HmHljiELAiOr1.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/pP3z3VS68PFRqTmypsYJWhWRkrG.jpg",
    genre: ["Animation", "Comedy", "Action & Adventure", "Sci-Fi & Fantasy"],
    releaseInfo: "2004-08-07",
    description:
      "Hank and Dean Venture, with their father Doctor Venture and faithful bodyguard Brock Samson, go on wild adventures facing megalomaniacs, zombies, and suspicious ninjas, all for the glory of adventure. Or something like that.",
  },
  {
    id: "653",
    type: "series",
    name: "Metalocalypse",
    poster: "https://image.tmdb.org/t/p/w500/aJ8e3EjggpnnGOPjLRUka6lt1Ly.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/nLaF4UJbjotJzXhTZWUJgD7FeFI.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2006-08-06",
    description:
      "Part-American, part-Scandinavian death-metal band Dethklok has a lingering effect on its fans, who take the words seriously and do anything Dethklok lyrics say. The government fears the band's influence and sets out to destroy it by covert means; for example, by sending military pharmaceutical psychotropic drug manufacturers. Deemed sociopaths for tossing hot coffee at their concert attendees, two of the band members are alcoholics, and they all have self-esteem issues.",
  },
  {
    id: "2604",
    type: "series",
    name: "The Boondocks",
    poster: "https://image.tmdb.org/t/p/w500/vAvT2RXjOpgH0COriRm9riPqA0m.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/7BC6fkd6ldjXFfzV75kzliZXX3S.jpg",
    genre: ["Action & Adventure", "Comedy", "Animation"],
    releaseInfo: "2005-11-06",
    description:
      'When Robert “Granddad” Freeman becomes legal guardian to his two grandsons, he moves from the tough south side of Chicago to the upscale neighborhood of Woodcrest (a.k.a. "The Boondocks") so he can enjoy his golden years in safety and comfort. But with Huey, a 10-year-old leftist revolutionary, and his eight-year-old misfit brother, Riley, suburbia is about to be shaken up.',
  },
  {
    id: "256748",
    type: "series",
    name: "Haha, You Clowns",
    poster: "https://image.tmdb.org/t/p/w500/5baap1Y3pED0HltMRnUDW6w9Bny.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/b0ms0pwRZql7bP8WaV83nV93Hjz.jpg",
    genre: ["Comedy", "Animation"],
    releaseInfo: "2025-10-19",
    description:
      "Join the Campbell boys, three doting teenagers and their tenderhearted dad, as they live, laugh, love their way into your living rooms. They're big dudes with big feelings who are learning to navigate life in the wake of their mother's death, sensing her presence in everyday adventures.",
  },
  {
    id: "126506",
    type: "series",
    name: "Smiling Friends",
    poster: "https://image.tmdb.org/t/p/w500/q3CSxl3G06MBc73TpHWwBYYTPxL.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/atoWevhc9DZQaJXx5aimtYdtruc.jpg",
    genre: ["Animation", "Comedy", "Sci-Fi & Fantasy"],
    releaseInfo: "2020-04-01",
    description:
      "Smiling Friends Inc. is a small company whose main purpose is to bring happiness and make people smile. The series follows the day-to-day lives and misadventures of its representatives, the lazy, cynical Charlie, and the cheerful, optimistic Pim, as they try to cheer up and comfort the troubled people who call their company's hotline. They receive seemingly simple requests but the jobs turn out to be more complicated than they seem, making it difficult to bring happiness to the world.",
  },
  {
    id: "89456",
    type: "series",
    name: "Primal",
    poster: "https://image.tmdb.org/t/p/w500/ebupzTwgP8nBy0T5J3abqTqUMjK.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/zBfnpI8883yeQkXK2kpLavHv9Yw.jpg",
    genre: ["Action & Adventure", "Animation", "Drama"],
    releaseInfo: "2019-10-08",
    description:
      "A caveman forms a bond with a dinosaur as they struggle to survive in a hostile world.",
  },
  {
    id: "228878",
    type: "series",
    name: "Common Side Effects",
    poster: "https://image.tmdb.org/t/p/w500/a8X5XXP49DHrySTXJMUIN5HI1Wz.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/4drV6iluttgjZmU1Q0xDqjrBQ1.jpg",
    genre: ["Animation", "Drama", "Comedy", "Sci-Fi & Fantasy"],
    releaseInfo: "2025-02-02",
    description:
      "Former high school lab partners Marshall and Frances begin to unravel a conspiracy involving big pharma and the federal government to suppress knowledge of a rare mushroom that may hold the key to curing all the world’s diseases.",
  },
  {
    id: "201643",
    type: "series",
    name: "Invincible Fight Girl",
    poster: "https://image.tmdb.org/t/p/w500/t9lcNmzb5XMksUfUq3rtxYVbQnv.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/uS3PNfRgSdVyCs6nYTrZqI8wGZ7.jpg",
    genre: ["Animation", "Action & Adventure", "Comedy"],
    releaseInfo: "2024-11-03",
    description:
      'Andy dreams of becoming the greatest pro wrestler of all time. Assuming the wrestler alias: "Fight Girl", Andy sets out into the bizarre and colorful Wrestling World, determined to make a name for herself.',
  },
  {
    id: "202282",
    type: "series",
    name: "Rick and Morty: The Anime",
    poster: "https://image.tmdb.org/t/p/w500/bGf8CzFaqdTgINZOq4zvK7H0UFH.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/dhb5lfSpElYIaLLyJjeswn2dfnl.jpg",
    genre: ["Animation", "Sci-Fi & Fantasy", "Action & Adventure"],
    releaseInfo: "2024-08-16",
    description:
      "It's life mostly as usual for the Smith family. Rick is in a pseudo-world, Summer helps Space Beth and Morty's in love. And they're all an anime.",
  },
  {
    id: "30991",
    type: "series",
    name: "Cowboy Bebop",
    poster: "https://image.tmdb.org/t/p/w500/xDiXDfZwC6XYC6fxHI1jl3A3Ill.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/A4PHx94G7mvM3b8vsDJ5HEaQ6uv.jpg",
    genre: ["Animation", "Action & Adventure", "Sci-Fi & Fantasy", "Western"],
    releaseInfo: "1998-04-03",
    description:
      'In 2071, roughly fifty years after an accident with a hyperspace gateway made the Earth almost uninhabitable, humanity has colonized most of the rocky planets and moons of the Solar System. Amid a rising crime rate, the Inter Solar System Police (ISSP) set up a legalized contract system, in which registered bounty hunters, also referred to as "Cowboys", chase criminals and bring them in alive in return for a reward.',
  },
  {
    id: "26453",
    type: "series",
    name: "TRIGUN",
    poster: "https://image.tmdb.org/t/p/w500/lwLFZFB3S2PeOLtWksaWerF6B4D.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/unrJI17xAoGNgD2Yzspg51vkWeq.jpg",
    genre: ["Sci-Fi & Fantasy", "Action & Adventure", "Animation"],
    releaseInfo: "1998-04-02",
    description:
      "Trigun takes place in the distant future on a desert planet. Vash the Stampede is a gunfighter with a legend so ruthless he has a $$60,000,000,000 bounty on his head. Entire towns evacuate at the rumor of his arrival. But the real Vash the Stampede, the enigmatic and conflicted lead character, is more heroic, even though he usually acts like a complete idiot.",
  },
  {
    id: "18241",
    type: "series",
    name: "The Big O",
    poster: "https://image.tmdb.org/t/p/w500/AsL5J7k9diSxQcxwNEYJSKqtRCS.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/lNVwMT6PpQGriJN0Xi6CwpDwoas.jpg",
    genre: ["Animation", "Drama", "Action & Adventure"],
    releaseInfo: "1999-10-13",
    description:
      "Forty years ago, the minds of Paradigm City's inhabitants were wiped clean of all recollections of the past. Now, ruled by a powerful corporation and cut off from the rest of the world by desolate wastelands, Paradigm has become a virtual police state where Negotiators like Roger Smith keep the wheels of progress, commerce, and society turning.",
  },
  {
    id: "42676",
    type: "series",
    name: "s-CRY-ed",
    poster: "https://image.tmdb.org/t/p/w500/qjTNWCwl1fZuYjkJMHg4kYNUpPF.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/lvNBckTghErG0OGnGGRNyzQ3Wdu.jpg",
    genre: ["Animation", "Action & Adventure", "Sci-Fi & Fantasy"],
    releaseInfo: "2001-07-04",
    description:
      "The aftermath of a mysterious environmental catastrophe has left the land in complete desolation! While mankind has been able to rebuild the city, the catastrophe has caused some humans to undergo genetic mutations granting them special powers and abilities. These genetically enhanced humans are known as Alters. Kazuma has spent his entire life in the wastelands relying on his special powers to survive, but when a secret organization called ‘Holy’ threatens to take away his freedom, he will be left with a choice to join or die. His fight to seek the truth behind the ‘Holy’ will rage and consume humanity and Alter alike!",
  },
  {
    id: "30669",
    type: "series",
    name: "Yu Yu Hakusho",
    poster: "https://image.tmdb.org/t/p/w500/5OnjguJwkujo3R23w95EEX8eAEN.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/uNM5dbnPJXJJs1eggepRWjSvdIR.jpg",
    genre: ["Animation", "Action & Adventure", "Sci-Fi & Fantasy"],
    releaseInfo: "1992-10-10",
    description:
      'After dying to save a boy, delinquent tough guy Yusuke Urameshi is granted another chance at life by redeeming himself as a "Spirit Detective."',
  },
  {
    id: "35610",
    type: "series",
    name: "InuYasha",
    poster: "https://image.tmdb.org/t/p/w500/jgvW9n0EwKtq9nbztWhyTvvoqjS.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/mVE1ULmLaYhCkBQPt3JC5xZC6T6.jpg",
    genre: [
      "Animation",
      "Sci-Fi & Fantasy",
      "Action & Adventure",
      "Comedy",
      "Mystery",
    ],
    releaseInfo: "2000-10-16",
    description:
      'Kagome Higurashi is a modern day young girl who lives with her family by the old Higure shrine. Unbeknownst to Kagome, she is the reincarnation of priestess Kikyo and posseses the "Jewel of Four Souls" (the Shikon jewel). One ill-fated day, Kagome locates an ancient well near her home and is abruptly transported through the well and into a feudal Japan, inhabited by demons. There, she encounters Inuyasha, son of a powerful demon father and a human mother, who is pinned to a tree by an enchanted arrow.',
  },
  {
    id: "30984",
    type: "series",
    name: "Bleach",
    poster: "https://image.tmdb.org/t/p/w500/2EewmxXe72ogD0EaWM8gqa0ccIw.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/o0NsbcIvsllg6CJX0FBFY8wWbsn.jpg",
    genre: ["Action & Adventure", "Animation", "Sci-Fi & Fantasy"],
    releaseInfo: "2004-10-05",
    description:
      "For as long as he can remember, Ichigo Kurosaki has been able to see ghosts. But when he meets Rukia, a Soul Reaper who battles evil spirits known as Hollows, he finds his life is changed forever. Now, with a newfound wealth of spiritual energy, Ichigo discovers his true calling: to protect the living and the dead from evil.",
  },
  {
    id: "37854",
    type: "series",
    name: "One Piece",
    poster: "https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg",
    genre: ["Action & Adventure", "Comedy", "Animation"],
    releaseInfo: "1999-10-20",
    description:
      'Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous "One Piece" behind. Whoever claims the "One Piece" will be named the new King of the Pirates.\n\nMonkey D. Luffy, a boy who consumed a "Devil Fruit," decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that he\'s surrounded by a bevy of skilled fighters and thieves to help him along the way.\n\nLuffy will do anything to get the One Piece and become King of the Pirates!',
  },
  {
    id: "37863",
    type: "series",
    name: "Fullmetal Alchemist",
    poster: "https://image.tmdb.org/t/p/w500/kKOQbCKbGB75h1d3Jlx9Gy4ZTfv.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/p1z1B4bMf6tgUA4VLpI4smLxbCf.jpg",
    genre: ["Action & Adventure", "Animation", "Sci-Fi & Fantasy"],
    releaseInfo: "2003-10-04",
    description:
      "Two young brothers are raised as alchemists, but when they are severely injured trying to perform a forbidden act, they begin searching for the one thing that can save them; the fabled philosopher's stone.",
  },
  {
    id: "31911",
    type: "series",
    name: "Fullmetal Alchemist: Brotherhood",
    poster: "https://image.tmdb.org/t/p/w500/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/A6tMQAo6t6eRFCPhsrShmxZLqFB.jpg",
    genre: ["Animation", "Action & Adventure", "Sci-Fi & Fantasy"],
    releaseInfo: "2009-04-05",
    description:
      "Disregard for alchemy’s laws ripped half of Edward Elric’s limbs from his body and left his brother Alphonse’s soul clinging to a suit of armor. To restore what was lost, the brothers seek the Philosopher’s Stone. Enemies and allies – the corrupt military, the Homunculi, and foreign alchemists – will alter the Elric brothers course, but their purpose will remain unchanged and their bond unbreakable.",
  },
  {
    id: "1063",
    type: "series",
    name: "Samurai Champloo",
    poster: "https://image.tmdb.org/t/p/w500/lYpHeSm7BcUxAbBx1ucuEH7oGAe.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/zsRvBsAVcJYz8wjpZnitMJz7HYr.jpg",
    genre: ["Animation", "Action & Adventure", "Comedy"],
    releaseInfo: "2004-05-20",
    description:
      "Break-dancing but fierce warrior Mugen has to deal with the cold-blooded and conceited Jin, a samurai who believes he is above all. These sworn enemies are brought together by Fuu for a special task.",
  },
  {
    id: "5895",
    type: "series",
    name: "FLCL",
    poster: "https://image.tmdb.org/t/p/w500/FkgA8CcmiLJGVCRYRQ2g2UfVtF.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/uiBb01nmHwyVTSILSMKJ4WIvijc.jpg",
    genre: ["Animation", "Comedy", "Action & Adventure", "Sci-Fi & Fantasy"],
    releaseInfo: "2000-04-26",
    description:
      "Naota is a normal boy who kills some time with a normal girl by a stream that flows underneath a bridge. Nothing unusual happens in this town. The fact that Haruhara Haruko crashes into the main character with her Vespa a short while later and subsequently hits him over the head with her Rickenbacker 4003 bass guitar doesn’t really make any difference to any other day here. The at first glance unconnected, bizarre events that don’t seem to follow any pattern whatsoever don’t change anything about Naota’s boring life, either – because nothing incredible ever happens in this town.",
  },
  {
    id: "472",
    type: "series",
    name: "Megas XLR",
    poster: "https://image.tmdb.org/t/p/w500/d4Mc687WE8wFAk5nlmJJh4qNuIO.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/vhDErhLUBnyLdDNtgaeOYAfIoM2.jpg",
    genre: [
      "Animation",
      "Action & Adventure",
      "Comedy",
      "Sci-Fi & Fantasy",
      "Kids",
    ],
    releaseInfo: "2004-05-01",
    description:
      "Megas XLR is a series about an overweight couch potato named Coop who stumbles across a giant robot in a junkyard. He soon discovers that the robot was sent from the future when a woman named Kiva returns to the past to claim what is rightfully hers, though Coop made so many modification to the machine so he's the only one who can fully operate it. Things also heat up when Coop learns that an alien race called the Glorft are also after his MEGAS robot, so he teams up with Kiva and his best friend Jamie to fight them off, though mostly so he can keep his new toy.",
  },
  {
    id: "39479",
    type: "series",
    name: "Off the Air",
    poster: "https://image.tmdb.org/t/p/w500/uZrln31dbJx6jhEYqz37zd1BvGQ.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/eMMyoF8M1jrq847exL6YZOpYPGW.jpg",
    genre: ["Sci-Fi & Fantasy", "Animation"],
    releaseInfo: "2011-01-01",
    description:
      "A collection of psychedelic and visually complex animation, art, and culture.",
  },
  {
    id: "2073",
    type: "series",
    name: "Mission Hill",
    poster: "https://image.tmdb.org/t/p/w500/hJV2F5jR8clYnQ2jgV0eU90HbiE.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/gkumTWD2gMTRr3JjU604QKz0tdt.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "1999-09-24",
    description:
      "Meet overqualified, underemployed, 24-year-old Andy French. Ambition: to be a cartoonist. Occupation: salesman at Waterbed World. Hobby: Where's the party? But responsibility soon knocks on the door of the loft apartment Andy shares with two fellow slackers when Kevin, a nerdy 17 -year-old who wears his SAT score on his shirt and his admiration for big brother Andy on his sleeve, moves in. And, for good measure, so does the French family's dog. Friends, roomies, canines, countrymen: lend me your beers. They're all part of the daze of Andy's life.",
  },
  {
    id: "2274",
    type: "series",
    name: "Home Movies",
    poster: "https://image.tmdb.org/t/p/w500/m3yC4oIdb6vMxgoghXGPbGQNxu7.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/8AxQ9gYFVjj74gP6vG6UQNinIss.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "1999-04-26",
    description:
      "TV series about the life of Brendon Small, an eight-year-old visionary who, using his friends Jason and Melissa as actors, have managed to direct over a thousand homemade films. His parents are divorced, but it doesn't feel strange since so many other kids' parents are divorced. His friend Jason actually feels upset because his parents are still together. At school, he is taught soccer by his coach John McGuirk, or as he calls him, \"that weird Irish guy\".",
  },
  {
    id: "292",
    type: "series",
    name: "Moral Orel",
    poster: "https://image.tmdb.org/t/p/w500/1OSdgNEIYzCDYDmvJcGGBXgsAnR.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/40GC5powBaJz9JfEsqPFFc79RzF.jpg",
    genre: ["Animation", "Comedy", "Drama"],
    releaseInfo: "2005-12-12",
    description:
      "Orel is an 11-year-old boy who loves church. His unbridled enthusiasm for piousness and his misinterpretation of religious morals often lead to disastrous results, including self-mutilation and crack addiction. No matter how much trouble he gets into, his reverence always keeps him cheery.",
  },
  {
    id: "2568",
    type: "series",
    name: "The Oblongs",
    poster: "https://image.tmdb.org/t/p/w500/zHgUbiQnYhU7F4GSPv2yBU8GrRo.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/eEWRUbqNgaHhcJLfqr473D15clB.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2001-04-01",
    description:
      "The Oblongs are not so much dysfunctional as slightly nonfunctional. Living next to a polluted swamp has left them with the occasional missing limb or mysterious growth, but through it all, this close-knit family sticks together.Sometimes literally.",
  },
  {
    id: "539",
    type: "series",
    name: "Squidbillies",
    poster: "https://image.tmdb.org/t/p/w500/ffXx3qq4eopQMof6M26tZ2yiiT3.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/3gTIwbdGPE5d448o0dqOtYeDXBx.jpg",
    genre: ["Comedy", "Animation"],
    releaseInfo: "2005-10-16",
    description:
      "Squidbillies is an animated television series about the Cuylers, an impoverished family of anthropomorphic hillbilly mud squids living in the Appalachian region of Georgia's mountains. The show is produced by Williams Street Studios for the Adult Swim programming block of Cartoon Network and premiered on October 16, 2005. It is written by Dave Willis, co-creator of Aqua Teen Hunger Force, and Jim Fortier, previously of The Brak Show, both of whom worked on the Adult Swim series Space Ghost Coast to Coast. The animation is done by Awesome Incorporated, with background design by Ben Prisk.",
  },
  {
    id: "3108",
    type: "series",
    name: "Superjail!",
    poster: "https://image.tmdb.org/t/p/w500/kNw5w1YfQDgT8cJoqW38q8BVZUY.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/ozcbkw5DNifVoOoFGZZWrNTEwVd.jpg",
    genre: ["Action & Adventure", "Animation", "Comedy"],
    releaseInfo: "2008-09-28",
    description:
      "An eccentric warden and his staff run a bizarre maximum security prison full of dangerous prisoners.",
  },
  {
    id: "39680",
    type: "series",
    name: "China, IL",
    poster: "https://image.tmdb.org/t/p/w500/gxzKGspzftXVmhIquL2tYdt9ZU5.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/8yF2AzMBDYQpCFgaZrSftDdy8Dw.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2011-10-02",
    description:
      'China, IL – meaning "China, Illinois" – is an animated television series for the cable network Adult Swim. The series is created by Brad Neely, and features Neely\'s existing characters from the China, IL web series and special. Characters include Frank and Steve Smith, aka "The Professor Brothers," and Mark "Baby" Cakes. Neely provides the voice for all three characters. The series is produced by Williams Street and animated by Titmouse, Inc. China, IL has been renewed for a second season with the possibility of a new half-hour runtime.\n\nOn May 25, 2008, Adult Swim ran The Funeral, an 11-minute special which was streamed on the now defunct Super Deluxe website. The special combined Brad Neely\'s Professor Brothers and Baby Cakes webseries, which were also streamed at Super Deluxe, and established a larger environment for the characters. The special, as well as Brad Neely\'s other videos, can be viewed at Neely\'s YouTube page.',
  },
  {
    id: "61949",
    type: "series",
    name: "Mike Tyson Mysteries",
    poster: "https://image.tmdb.org/t/p/w500/iQq8OApBL5sCgtLGnKKWwAgN8Zy.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/6lPzHOe39KRZBCdWW0BJgU0X77A.jpg",
    genre: ["Mystery", "Animation", "Comedy"],
    releaseInfo: "2014-10-27",
    description:
      "Mike Tyson is taking the fight from the boxing ring to the streets … by solving mysteries! Aided by the Mike Tyson Mystery Team — the Ghost of the Marquess of Queensberry, Mike’s adopted Korean daughter and a pigeon who was once a man — Mike Tyson will answer any plea sent to him.",
  },
  {
    id: "40064",
    type: "series",
    name: "Black Dynamite",
    poster: "https://image.tmdb.org/t/p/w500/o1E5J4QQ3ATBpns69LR5FQy1QJI.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/fyborNmaXj3CujrDmcm6tcOzoUZ.jpg",
    genre: ["Action & Adventure", "Animation", "Comedy"],
    releaseInfo: "2012-07-15",
    description:
      "Black Dynamite is an American animated television series based on the 2009 film of the same name, although the series follows a separate continuity, with some back-references to the film. The series was announced shortly after the release of the film, the 10-minute pilot episode was released on Adult Swim Video on August 8, 2011, and the full series premiered on Cartoon Network's late night programming block, Adult Swim, on July 15, 2012. Michael Jai White, Byron Minns, Tommy Davidson and Kym Whitley reprise their film roles as Black Dynamite, Bullhorn, Cream Corn and Honeybee, respectively.",
  },
  {
    id: "416",
    type: "series",
    name: "Harvey Birdman, Attorney at Law",
    poster: "https://image.tmdb.org/t/p/w500/tBVSDa48aOcq7vF0xLFprRWZgbh.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/2CqC0XVbK2mdEkVVDDKXi1jWG0M.jpg",
    genre: [
      "Sci-Fi & Fantasy",
      "Animation",
      "Comedy",
      "Action & Adventure",
      "Crime",
    ],
    releaseInfo: "2000-12-30",
    description:
      "Harvey Birdman, Attorney at Law features ex-superhero Harvey T. Birdman of Birdman and the Galaxy Trio as an attorney working for a law firm alongside other cartoon stars from 1960s and 1970s Hanna-Barbera cartoon series. Similarly, Harvey's clients are also primarily composed of characters taken from Hanna-Barbera cartoon series of the same era. Many of Birdman's nemeses featured in his former cartoon series also became attorneys, often representing the opposing side of a given case.",
  },
  {
    id: "334",
    type: "series",
    name: "Sealab 2021",
    poster: "https://image.tmdb.org/t/p/w500/eA4JJfHZ6DdfPd3BCu5qWm99Fl5.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/e1WQUxuwgfwEEKPQ49wqxKf5fqA.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2000-12-21",
    description:
      "The year is 2021. Deep below the ocean's surface, looms a vast, magnificently high-tech compound: Sealab. A multi-national scientific station with an annual budget in the trillions, manned by a motley collection of malcontents and screw-ups who were unfit for work in the private sector. They really don't get any research done, but instead spend their time bickering among themselves or just plain goofing off. The crew have manipulated their luckless leader, Captain Murphy, into submission, and are content to ride the government clock, raking in fat, hazardous-duty paychecks.",
  },
  {
    id: "2798",
    type: "series",
    name: "Space Ghost Coast to Coast",
    poster: "https://image.tmdb.org/t/p/w500/sjTe8T7FRhNcSlmT4XF38dd1BEF.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/okJecNEHxfxAkf36sfeWu0AJC7M.jpg",
    genre: ["Animation", "Comedy", "Talk"],
    releaseInfo: "1994-04-15",
    description:
      "A cartoon superhero interacts with live guests via his television set in this parody talk show based on 1960s Hanna-Barbera cartoon character Space Ghost.",
  },
  {
    id: "481",
    type: "series",
    name: "The Brak Show",
    poster: "https://image.tmdb.org/t/p/w500/pkCCKPKQGOjsrGHkn09FQ6AYc2I.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/w7hYO6RYRCUoT5FfBEUsS7Cm0e5.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2000-12-21",
    description:
      'In this spin-off of "Space Ghost: Coast to Coast," sidekick Brak goes through a series of bizarre circumstances in his daily suburban life with his alien mom and Cuban dad.',
  },
  {
    id: "1542",
    type: "series",
    name: "Frisky Dingo",
    poster: "https://image.tmdb.org/t/p/w500/htOTzAqXEuf5rmqmmcHJG6avqde.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/lupHqKwfIY4J1D5RuePwmimypvO.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2006-10-16",
    description:
      "Alien supervillain Killface wants to destroy Earth. Billionaire playboy Xander Crews realizes he can make more money if he stops him. Who will win?",
  },
  {
    id: "2590",
    type: "series",
    name: "Stroker and Hoop",
    poster: "https://image.tmdb.org/t/p/w500/w34yxFrhptVHLbAOJ6GHwv9OQo.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/i8e3v7YBJ700IIfgscnhdLoGLQQ.jpg",
    genre: ["Animation", "Action & Adventure", "Comedy"],
    releaseInfo: "2004-08-01",
    description:
      'Stroker and Hoop is an American Flash animated television series on Cartoon Network\'s late night programming block, Adult Swim. The series is a parody of buddy cop films and television series such as Starsky & Hutch, and features the voices of Jon Glaser as Stroker and Timothy "Speed" Levitch as Hoop. This might also be a parody of the two Burt Reynolds characters: "Stroker Ace" and "Hooper".\n\nStroker and Hoop premiered on August 1, 2004, and ended on December 25, 2005, with 13 episodes. Adult Swim continues to air reruns of Stroker and Hoop on an infrequent basis.',
  },
  {
    id: "6318",
    type: "series",
    name: "Assy McGee",
    poster: "https://image.tmdb.org/t/p/w500/stSGJNl7TDWqD6QFOdo3sXDakwo.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/zrKMvWghaz8h2GIj2cvZzhaqUpG.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2006-11-26",
    description:
      "Assy McGee is an animated sitcom featuring police detective Assy McGee, a parody of tough-guy cop shows and movies, who is literally a walking pair of buttocks. Along with his partner Don Sanchez, the trigger-happy McGee solves crimes in a fictionalized Exeter, New Hampshire. Larry Murphy voices all of the main characters. The series premiered on November 26, 2006, on Adult Swim and was canceled after season two ended on July 6, 2008.",
  },
  {
    id: "3043",
    type: "series",
    name: "12 oz. Mouse",
    poster: "https://image.tmdb.org/t/p/w500/8lt7ltHs5s1pdIqxsNN0TeI9L10.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/uyD0j3OXFfKDe0LixZupVQoLJBv.jpg",
    genre: ["Animation", "Comedy", "Mystery"],
    releaseInfo: "2005-06-19",
    description:
      '12 oz. Mouse revolves around Mouse Fitzgerald, nicknamed "Fitz", an alcoholic mouse who performs odd jobs so he can buy more beer. Together with his chinchilla companion Skillet, Fitz begins to recover suppressed memories that he once had a wife and a child who have now vanished. This leads him to seek answers about his past and the shadowy forces that seem to be manipulating his world.',
  },
  {
    id: "2788",
    type: "series",
    name: "Perfect Hair Forever",
    poster: "https://image.tmdb.org/t/p/w500/qs9LfBFT70jZUNysIzdbBnCJ2I7.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/acrpVaWYVhhKEH0vjS8V5q2U7N6.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2004-11-07",
    description:
      'Perfect Hair Forever is an American comedy animated television series which is largely a parody of anime. It was created and produced by Williams Street, and aired on Adult Swim and Teletoon at Night in the US and Canada respectively. Perfect Hair Forever premiered with "Perfect Hair Forever" on November 7, 2004, and ended with "Return to Balding Victory" on April 1, 2007; with a total of seven episodes.',
  },
  {
    id: "11936",
    type: "series",
    name: "Minoriteam",
    poster: "https://image.tmdb.org/t/p/w500/q4mFWcIS9ypSrO5kxXM4WT7Sm9B.jpg",
    background: "",
    genre: ["Animation", "Comedy", "Action & Adventure"],
    releaseInfo: "2005-11-06",
    description:
      "Minoriteam is an animated television series on Cartoon Network's late night programming block, Adult Swim. The pilot episode premiered on November 6, 2005. The series officially started on March 20, 2006, and ended on July 24, 2006, with a total of 20 episodes, over the course of one season.\n\nMinoriteam stars a team of five superheroes, each one having his own racial or ethnic stereotype. They join forces to fight against discrimination, such as The White Shadow, Racist Frankenstein and The Corporate Ladder. The Minoriteam is made up of Non-Stop, an Arab convenience-store owner who cannot be shot. El Jefe, a Mexican that fights crime with a leaf blower. Dr. Wang, an Asian human calculator and the leader of the team. Fasto, the fastest man that ever was. Lastly, Jewcano, a man with the powers of the Jewish faith and a volcano.",
  },
  {
    id: "272",
    type: "series",
    name: "Korgoth of Barbaria",
    poster: "https://image.tmdb.org/t/p/w500/lch9Qu3HD5CBx9VoUvRgRJ04mFE.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/z2QdEiQPtIiBnfocVuKSmPPVt77.jpg",
    genre: ["Action & Adventure", "Animation", "Comedy"],
    releaseInfo: "2006-06-03",
    description:
      "Korgoth of Barbaria is a pilot episode for what was originally planned as an American animated television series created by Aaron Springer, storyboard writer and director for Dexter's Laboratory, The Grim Adventures of Billy & Mandy and SpongeBob SquarePants.",
  },
  {
    id: "86501",
    type: "series",
    name: "Tigtone",
    poster: "https://image.tmdb.org/t/p/w500/35iIZANE4UTP3trCrVjZZVMcYf0.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/37eSTo6jjELb7LsOQZrlfDKeu88.jpg",
    genre: ["Action & Adventure", "Animation", "Comedy"],
    releaseInfo: "2019-01-14",
    description:
      "A quest-addicted hero slashes his way across a satirical fantasy universe with melodramatic ferocity, always obeying the letter of the law but never its spirit.",
  },
  {
    id: "61593",
    type: "series",
    name: "Mr. Pickles",
    poster: "https://image.tmdb.org/t/p/w500/bSWmZnvXIOoqZ7eLderyInsouiF.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/73LbmgVYOVo3Jkyol1r8LVhOyYZ.jpg",
    genre: ["Comedy", "Animation"],
    releaseInfo: "2014-09-21",
    description:
      "The Goodman family lives with their lovable pet dog, Mr. Pickles, a deviant border collie with a secret satanic streak.",
  },
  {
    id: "55850",
    type: "series",
    name: "Golan, The Insatiable",
    poster: "https://image.tmdb.org/t/p/w500/mASCppIDaS1pd7YBWXImKMDkRyP.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/rCT2T7LFjBWITBI9AedJ6xIV4FE.jpg",
    genre: ["Comedy", "Animation"],
    releaseInfo: "2013-11-23",
    description:
      '"Golan the Insatiable" is the story of a mighty godlord from an alternate universe who arrives in the small town of Oak Grove, where his only friend is a 10-year-old goth girl named DYLAN. Together they fight the boredom of suburban life. GOLAN is Dylan’s ideal playmate and constantly urges him to destroy and wreak havoc on the town that makes her so miserable.',
  },
  {
    id: "96372",
    type: "series",
    name: "Momma Named Me Sheriff",
    poster: "https://image.tmdb.org/t/p/w500/xJUZVkvkYlIo6iXT49pZBB37Qwl.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/90IsYNbXA61LUEg98TNSjkU6zmk.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2019-11-18",
    description:
      "He still lives at home with his Momma, his best friend is a doll, and he's the Sheriff of Old Town.",
  },
  {
    id: "56590",
    type: "series",
    name: "The Eric Andre Show",
    poster: "https://image.tmdb.org/t/p/w500/mXmZJy8AtOF5s5SMW3WfAVxYG7V.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/bYx97fcrrAQOJldXdKW4iXCsHsl.jpg",
    genre: ["Comedy"],
    releaseInfo: "2012-05-20",
    description:
      "A comedic talk show from an alternate reality featuring unstable hosts, a variety of celebrities—both real and fake—and unusual studio action.",
  },
  {
    id: "5124",
    type: "series",
    name: "Saul of the Mole Men",
    poster: "https://image.tmdb.org/t/p/w500/kVUZmdtWK4tJ2GMBTtpqB6KkyZG.jpg",
    background: "",
    genre: ["Comedy"],
    releaseInfo: "2007-02-11",
    description:
      "Saul of the Mole Men is a live-action show created by Craig Lewis. The series first aired February 11, 2007 on Adult Swim. Described as \"an ultra-patriotic Land of the Lost set in the center of the Earth\", the series is directed by Tom Stern and stars Josh Gardner. Gardner is known for his previous collaboration with Stern on the television series, Gerhard Reinke's Wanderlust. The show's theme song is performed by South Park creator Trey Parker.\n\nLewis' primary inspirations behind this homage to 1970s-era Saturday morning live-action television were Sid and Marty Krofft, Doctor Who, and the Planet of the Apes franchise. On October 31, 2008 Adult Swim ran a special Halloween marathon.",
  },
  {
    id: "48000",
    type: "series",
    name: "Your Pretty Face Is Going to Hell",
    poster: "https://image.tmdb.org/t/p/w500/9NHMwsnDCRf9ML9WJnAcg9oJPOP.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/tgXY8BagC12Luvc6rWEEbIOLW1k.jpg",
    genre: ["Comedy"],
    releaseInfo: "2013-04-18",
    description:
      "A live-action workplace comedy about Gary, an associate demon, as he attempts to capture souls on earth in order to climb the corporate ladder of the underworld. Gary hopes to advance in Hell, but he may be too stupid, lazy and kind-hearted to realize his dreams of promotion. Meanwhile, Gary's intern Claude is more talented, more devious and will do whatever it takes to impress Satan.",
  },
  {
    id: "17425",
    type: "series",
    name: "Delocated",
    poster: "https://image.tmdb.org/t/p/w500/daV0YFc0HNwm2JSDN0zwKm3kPe5.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/i5T2Hz2tpg5BdxnjlXNrrZbsxZj.jpg",
    genre: ["Comedy"],
    releaseInfo: "2009-02-12",
    description:
      "A man in the Witness Protection Program moves his family to New York City so they exploit the situation by starring in a reality tv show.",
  },
  {
    id: "85000",
    type: "series",
    name: "The Shivering Truth",
    poster: "https://image.tmdb.org/t/p/w500/41r0yzrZOrnL1U8v5I19F0hXWlF.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/fhdEdDXlrhqvZTH0dkILYkmE82q.jpg",
    genre: ["Comedy", "Animation"],
    releaseInfo: "2018-12-09",
    description:
      "A miniature propulsive omnibus clusterbomb of painfully riotous daymares all dripping with the orange goo of dream logic. A series of loosely linked emotional parables about stories within tales that crawled out of the deepest caverns of your unconscious mind and became lovingly animated in breath-slapping stop motion - in other words, it is the truth.",
  },
  {
    id: "68380",
    type: "series",
    name: "Dream Corp LLC",
    poster: "https://image.tmdb.org/t/p/w500/vxkgH0KHiN8ilJCafYWDbz8WSjL.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/cU4R4AdpTylvrERZGHj4nFKk4Sg.jpg",
    genre: ["Comedy"],
    releaseInfo: "2016-10-23",
    description:
      "Helmed by the easily distracted Dr. Roberts, a psychotherapeutic facility treats patients with troubling dreams. Roberts employs a team of incompetent scientists to help analyze and record those thoughts plaguing the doctor's patients.",
  },
  {
    id: "88477",
    type: "series",
    name: "Lazor Wulf",
    poster: "https://image.tmdb.org/t/p/w500/xlQKZln9eUooNZQ95giyTgB875X.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/o0u9pXB6wwisx8pyanDKXPDO7E6.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2019-04-07",
    description:
      "Lazor Wulf follows the adventures of a wolf who carries a laser on his back...obviously.",
  },
  {
    id: "39106",
    type: "series",
    name: "NTSF:SD:SUV::",
    poster: "https://image.tmdb.org/t/p/w500/8QaVSHiZSOlKEqBkwcn6HdcLBI5.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/9qXbj6BU2R7m8dGOX9rThukuK3G.jpg",
    genre: ["Comedy", "Action & Adventure"],
    releaseInfo: "2011-07-21",
    description:
      "NTSF:SD:SUV:: – meaning National Terrorism Strike Force: San Diego: Sport Utility Vehicle:: – is a quarter-hour format American television comedy that parodies the police procedural and action film genres.",
  },
  {
    id: "32752",
    type: "series",
    name: "Eagleheart",
    poster: "https://image.tmdb.org/t/p/w500/rybOTxmklk2K2J8yGxcusXQ0Ue0.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/uygoYK3T3LakvHECVveANMqdpIS.jpg",
    genre: ["Comedy", "Action & Adventure", "Crime"],
    releaseInfo: "2011-02-03",
    description:
      "Eagleheart is an action-comedy television series that premiered on February 3, 2011, on Adult Swim.",
  },
  {
    id: "78672",
    type: "series",
    name: "Ballmastrz: 9009",
    poster: "https://image.tmdb.org/t/p/w500/lyCKQDRCtv2EOrzQi69K5h4Wuod.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/zZGG7jsktlGaenPeknKSZZtVZ9T.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2018-04-09",
    description:
      "Thousands of years in the future, teams of Ballmastrz face off against each other using their own hyper-creative and artificially intelligent combat weapons to attack, defend and score.",
  },
  {
    id: "65520",
    type: "series",
    name: "King Star King",
    poster: "https://image.tmdb.org/t/p/w500/gzF6Xswd3UzsUwkDeMBiyGpKWIf.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/nfGQaXY67fTV12EtsaGXm4wnt5C.jpg",
    genre: ["Sci-Fi & Fantasy", "Animation", "Comedy"],
    releaseInfo: "2014-06-15",
    description:
      "King Star King is a tall, blond muscular man who after seducing his love, Princess Snow White, falls from his higher plane of existence to serve as a fry cook in a run-down waffle house. In order to reclaim his place in the heavens, he must battle his amnesia to defeat the evil Spring Bunny and rescue Snow White.",
  },
  {
    id: "76246",
    type: "series",
    name: "Hot Streets",
    poster: "https://image.tmdb.org/t/p/w500/gzXmauyc1zPKNZZGqPulWaC3ZH7.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/utW6Tx40aHnxsQGyCKYKQ8zpK9z.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2018-01-14",
    description:
      "An FBI agent, his partner, his niece and her cowardly dog investigate supernatural phenomena.",
  },
  {
    id: "138883",
    type: "series",
    name: "Gemusetto",
    poster: "https://image.tmdb.org/t/p/w500/dF9wz9OZooDSgWky31sP1UrxJwm.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/ndwilZK2MS7sTzhqRO6nLEXg0O5.jpg",
    genre: ["Animation", "Comedy", "Sci-Fi & Fantasy"],
    releaseInfo: "2019-04-01",
    description:
      "Sportsman/relic-thief Makasu travels the world defeating religious pantheons in sports and stealing their mystical artifacts. But can he overcome his emotional memories in order to defeat the gods of the Inca in tennis?",
  },
  {
    id: "21554",
    type: "series",
    name: "Titan Maximum",
    poster: "https://image.tmdb.org/t/p/w500/gXcoYwYkMOQJOxKScjqWAgeKXv9.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/p1q1RpY11X2cu0bkIMpvMipB3pz.jpg",
    genre: ["Action & Adventure", "Animation", "Comedy", "Sci-Fi & Fantasy"],
    releaseInfo: "2009-09-27",
    description:
      'Titan Maximum is an American stop motion animated television series created by Tom Root and Matthew Senreich. The series premiered on Cartoon Network\'s late night programing block, Adult Swim, on September 27, 2009, and was canceled after only one season. A teaser premiered during the "Robot Chicken on Wheels" tour and at the 2009 San Diego Comic-Con International. It is a parody of the "Super Robot" anime style produced using stop motion animation.',
  },
  {
    id: "31548",
    type: "series",
    name: "Mary Shelley's Frankenhole",
    poster: "https://image.tmdb.org/t/p/w500/icJDzrUzeCKIGXwigyvvMp1zpCt.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/8wgPjQgoTFezUJrrniWsT116mJU.jpg",
    genre: ["Animation", "Comedy"],
    releaseInfo: "2010-06-28",
    description:
      "Mary Shelley's Frankenhole is a stop-motion animated TV series by Dino Stamatopoulos, creator of Moral Orel.",
  },
  {
    id: "14756",
    type: "series",
    name: "Baby Blues",
    poster: "https://image.tmdb.org/t/p/w500/38mF8iUMR2UJmMDCtEr7l6Pe8mp.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/ymiGvObwr1iv9SCBbEOw2AgLepj.jpg",
    genre: [""],
    releaseInfo: "2000-07-28",
    description:
      "An animated television series based on the Baby Blues comic strip.",
  },
  {
    id: "79356",
    type: "series",
    name: "Tuca & Bertie",
    poster: "https://image.tmdb.org/t/p/w500/vZIJVEZn9RnimJjKL370dy1bEBu.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/4jj1tHgDFJebTe2F9a77WMsS5zU.jpg",
    genre: ["Comedy", "Animation"],
    releaseInfo: "2019-05-03",
    description:
      "Free-spirited toucan Tuca and self-doubting song thrush Bertie are best friends – and birds – who guide each other through life's ups and downs.",
  },
  {
    id: "2315",
    type: "series",
    name: "The Ripping Friends",
    poster: "https://image.tmdb.org/t/p/w500/1ZseRB5JKBiGK1aAow5tEXHgd4a.jpg",
    background:
      "https://image.tmdb.org/t/p/w500/2B4gChd4M1iSqhd0VLderVtxNpv.jpg",
    genre: ["Animation"],
    releaseInfo: "2001-09-22",
    description:
      "The Ripping Friends: The World's Most Manly Men! is a Canadian animated television series, created by John Kricfalusi. The show premiered September 22, 2001 on Fox Kids, but was cancelled in September 2002. Adult Swim later picked up the show. The series occasionally airs in Canada on Teletoon. The series also aired briefly in the UK on the CNX channel. The show is rated TV-Y7 on Fox Kids and TV-PG on [adult swim] in the United States, and C8 to 14+ on Teletoon in Canada.",
  },
];

// Helper function to filter and sort catalog
function filterAndSortCatalog(metas, extra) {
  let results = [...metas];

  // Filter by genre if specified
  if (extra && extra.genre) {
    results = results.filter((meta) => {
      if (!meta.genre) return false;

      const filterGenre = extra.genre.toLowerCase();

      // Custom genre mapping logic
      switch (filterGenre) {
        case "Adult Animation":
          // All animation content from Adult Swim catalog
          return meta.genre.some((g) => g.toLowerCase().includes("animation"));

        case "anime":
          // Japanese anime shows - typically have specific titles or styles
          // Matches: Cowboy Bebop, Bleach, Inuyasha, etc.
          const animeTitles = [
            "bleach",
            "cowboy bebop",
            "inuyasha",
            "fullmetal",
            "samurai champloo",
            "trigun",
            "flcl",
            "yu yu hakusho",
            "s-cry-ed",
            "afro samurai",
          ];
          const titleLower = meta.name.toLowerCase();
          return animeTitles.some((anime) => titleLower.includes(anime));

        case "action":
          return meta.genre.some(
            (g) =>
              g.toLowerCase().includes("action") ||
              g.toLowerCase().includes("adventure")
          );

        case "comedy":
          return meta.genre.some((g) => g.toLowerCase().includes("comedy"));

        case "fx":
          // FX/Special Effects heavy content - experimental, surreal, visually unique
          const fxTitles = [
            "paprika",
            "akira",
            "redline",
            "flcl",
            "superjail",
            "mr. pickles",
            "shivering truth",
            "xavier",
            "perfect hair forever",
          ];
          const nameLower = meta.name.toLowerCase();
          return (
            fxTitles.some((fx) => nameLower.includes(fx)) ||
            meta.genre.some((g) => g.toLowerCase().includes("horror"))
          );

        case "sci-fi":
          return meta.genre.some((g) => {
            const genreLower = g.toLowerCase();
            return (
              genreLower.includes("sci") ||
              genreLower.includes("science") ||
              genreLower.includes("fantasy")
            );
          });

        default:
          // Fallback to partial matching
          const normalizedMetaGenre = meta.genre.map((g) =>
            g.toLowerCase().replace(/[^a-z]/g, "")
          );
          const normalizedFilterGenre = filterGenre.replace(/[^a-z]/g, "");
          return normalizedMetaGenre.some(
            (g) =>
              g === normalizedFilterGenre ||
              g.includes(normalizedFilterGenre) ||
              normalizedFilterGenre.includes(g)
          );
      }
    });
  }

  // Sort results
  if (extra && extra.sort) {
    switch (extra.sort) {
      case "A-Z":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Newest First":
        results.sort((a, b) => {
          const yearA = parseInt(a.releaseInfo.match(/\d{4}/)?.[0] || "0");
          const yearB = parseInt(b.releaseInfo.match(/\d{4}/)?.[0] || "0");
          return yearB - yearA;
        });
        break;
      case "Oldest First":
        results.sort((a, b) => {
          const yearA = parseInt(a.releaseInfo.match(/\d{4}/)?.[0] || "0");
          const yearB = parseInt(b.releaseInfo.match(/\d{4}/)?.[0] || "0");
          return yearA - yearB;
        });
        break;
    }
  }

  return results;
}

// Catalog handler
builder.defineCatalogHandler(({ type, id, extra }) => {
  console.log(
    `Catalog request: type=${type}, id=${id}, extra=${JSON.stringify(extra)}`
  );

  if (type === "movie" && id === "adultswim-movies") {
    const filtered = filterAndSortCatalog(adultSwimMovies, extra);
    const metas = filtered.map((m) => ({ ...m, id: `tmdb:${m.id}` }));
    return Promise.resolve({ metas });
  }

  if (type === "series" && id === "adultswim-series") {
    const filtered = filterAndSortCatalog(adultSwimSeries, extra);
    const metas = filtered.map((m) => ({ ...m, id: `tmdb:${m.id}` }));
    return Promise.resolve({ metas });
  }

  if (type === "tv" && id === "adultswim-live") {
    // URLs for M3U and EPG (provided by user)
    const m3uUrl =
      "https://raw.githubusercontent.com/Ripshift/IPTV/refs/heads/main/AdultSwim/AdultSwim.m3u";
    const epgUrl =
      "https://raw.githubusercontent.com/Ripshift/IPTV/refs/heads/main/AdultSwim/epg.xml";
    const fetch = fetchFn;
    if (!fetch) {
      console.error("No fetch available in runtime; cannot fetch M3U/EPG");
      return Promise.resolve({ metas: [] });
    }

    // Fetch and parse M3U and EPG, then return metas
    return fetch(m3uUrl)
      .then((res) => res.text())
      .then(async (m3uContent) => {
        const channels = parseM3U(m3uContent);
        // Optionally fetch EPG (not used in catalog metas, but could be used for description)
        let epgData = {};
        try {
          const epgRes = await fetch(epgUrl);
          if (epgRes.ok) {
            const epgContent = await epgRes.text();
            epgData = await parseEPG(epgContent);
          }
        } catch (e) {
          epgData = {};
        }

        // Map channels to Stremio meta objects
        const metas = channels.map((ch) => ({
          id: ch.id,
          type: "tv",
          name: ch.name,
          poster: ch.logo || "https://static.strem.io/images/tv.png",
          background: ch.logo || "https://static.strem.io/images/tv.png",
          description: ch.category
            ? `Category: ${ch.category}`
            : "24/7 Adult Swim Channel",
          // Optionally, add EPG info to description
        }));
        return { metas };
      })
      .catch((err) => {
        console.error("Failed to fetch or parse M3U/EPG:", err);
        return { metas: [] };
      });
  }

  // Return empty catalog if no match
  return Promise.resolve({ metas: [] });
});

// Meta handler
builder.defineMetaHandler(({ type, id }) => {
  console.log(`Meta request: type=${type}, id=${id}`);

  // Movie meta
  if (type === "movie") {
    const rawId = id && id.startsWith("tmdb:") ? id.split(":")[1] : id;
    const found = adultSwimMovies.find((m) => m.id === rawId);
    if (!found) return Promise.resolve({ meta: null });
    const meta = { ...found, id: `tmdb:${rawId}`, tmdb: parseInt(rawId, 10) };
    return Promise.resolve({ meta });
  }

  // Series meta
  if (type === "series") {
    const rawId = id && id.startsWith("tmdb:") ? id.split(":")[1] : id;
    const found = adultSwimSeries.find((m) => m.id === rawId);
    if (!found) return Promise.resolve({ meta: null });
    const meta = { ...found, id: `tmdb:${rawId}`, tmdb: parseInt(rawId, 10) };
    return Promise.resolve({ meta });
  }

  // TV (live channel) meta - fetch M3U and find channel by id
  if (type === "tv") {
    const m3uUrl =
      "https://raw.githubusercontent.com/Ripshift/IPTV/refs/heads/main/AdultSwim/AdultSwim.m3u";
    const fetch = fetchFn;
    if (!fetch) {
      return Promise.resolve({ meta: null });
    }
    return fetch(m3uUrl)
      .then((res) => res.text())
      .then((m3uContent) => {
        const channels = parseM3U(m3uContent);
        const ch = channels.find((c) => c.id === id);
        if (!ch) return { meta: null };
        const meta = {
          id: ch.id,
          type: "tv",
          name: ch.name,
          poster: ch.logo || "https://static.strem.io/images/tv.png",
          background: ch.logo || "https://static.strem.io/images/tv.png",
          description: ch.category ? `Category: ${ch.category}` : "24/7 Adult Swim Channel",
        };
        return { meta };
      })
      .catch(() => ({ meta: null }));
  }

  return Promise.resolve({ meta: null });
});

module.exports = builder.getInterface();

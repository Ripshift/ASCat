const { addonBuilder } = require('stremio-addon-sdk');

// Addon manifest
const manifest = {
    id: 'com.adultswim.catalog.addon',
    version: '1.1.0',
    name: 'Adult Swim Catalog',
    description: 'Adult Swim movies and series catalog for Stremio',
    
    // Resources provided by this addon
    resources: ['catalog'],
    
    // Types of content this addon provides
    types: ['movie', 'series'],
    
    // Catalog definition
    catalogs: [
        {
            type: 'movie',
            id: 'adultswim-movies',
            name: 'Adult Swim Movies',
            extra: [
                { name: 'skip', isRequired: false },
                { 
                    name: 'genre', 
                    isRequired: false,
                    options: ["Adult Animation", 'Anime', 'Action', 'Comedy', 'FX', 'Sci-Fi', 'Live'],
                    optionsLimit: 1
                },
                { 
                    name: 'sort', 
                    isRequired: false,
                    options: ['A-Z', 'Z-A', 'Newest First', 'Oldest First'],
                    optionsLimit: 1
                }
            ]
        },
        {
            type: 'series',
            id: 'adultswim-series',
            name: 'Adult Swim Series',
            extra: [
                { name: 'skip', isRequired: false },
                { 
                    name: 'genre', 
                    isRequired: false,
                    options: ["Adult Animation", 'Anime', 'Action', 'Comedy', 'FX', 'Sci-Fi', 'Live'],
                    optionsLimit: 1
                },
                { 
                    name: 'sort', 
                    isRequired: false,
                    options: ['A-Z', 'Z-A', 'Newest First', 'Oldest First'],
                    optionsLimit: 1
                }
            ]
        }
    ]
};

// Create addon builder
const builder = new addonBuilder(manifest);

// Adult Swim Movies
const adultSwimMovies = [
    {
        id: 'tt6710474',
        type: 'movie',
        name: 'Aqua Teen Forever: Plantasm',
        poster: 'https://image.tmdb.org/t/p/w500/vbWfDxHhSmpuSBboJSDLY2DgHui.jpg',
        background: 'https://image.tmdb.org/t/p/original/zOwBtLgf6HdqLNjANc3pRxeqBdg.jpg',
        genre: ["Adult Animation", 'Comedy', 'Sci-Fi'],
        releaseInfo: '2022',
        description: 'Everyone\'s favorite rascals, the Aqua Teens, and all-around child genius, Frylock, go on new adventures that test their patience, their courage, and their skill at hiding in plain sight.'
    },
    {
        id: 'tt0469754',
        type: 'movie',
        name: 'Aqua Teen Hunger Force Colon Movie Film for Theaters',
        poster: 'https://image.tmdb.org/t/p/w500/qBIEXLJhaiNXJ93hZNF8MfFa4b.jpg',
        background: 'https://image.tmdb.org/t/p/original/z7QqbLd1SwVnBVzZC6RdJqx7pj5.jpg',
        genre: ["Adult Animation", 'Comedy', 'Sci-Fi'],
        releaseInfo: '2007',
        description: 'An action epic that explores the origins of the Aqua Teen Hunger Force (better known as Master Shake, Frylock, and Meatwad,) who somehow become pitted in a battle over an immortal piece of exercise equipment.'
    },
    {
        id: 'tt1033289',
        type: 'movie',
        name: 'Metalocalypse: Army of the Doomstar',
        poster: 'https://image.tmdb.org/t/p/w500/rUnAai7YFsHXDMKFxprYxID7NqZ.jpg',
        background: 'https://image.tmdb.org/t/p/original/g9k55f0nYOHHfAEQXkHRBF0jR8g.jpg',
        genre: ["Adult Animation", 'Comedy', 'Action'],
        releaseInfo: '2023',
        description: 'After the heroic rescue of Toki Wartooth, DETHKLOK frontman Nathan Explosion finds himself traumatized in a BRUTAL professional and romantic flat-spin all while he is tasked with fulfilling the prophecy and confronting the ultimate songwriting challenge: write the SONG OF SALVATION and save the planet.'
    },
    {
        id: 'tt3312910',
        type: 'movie',
        name: 'Metalocalypse: The Doomstar Requiem',
        poster: 'https://image.tmdb.org/t/p/w500/wWq8Gw8SrVYbGlLzSL2QxfLgj6Q.jpg',
        background: 'https://image.tmdb.org/t/p/original/4WqYcgcWgBPL1TfPIxOkFPxMqOe.jpg',
        genre: ["Adult Animation", 'Comedy', 'Action'],
        releaseInfo: '2013',
        description: 'While Toki and Abigail remain in the clutches of Magnus Hammersmith and the Metal Masked Assassin, the remaining members of Dethklok carry on with their lives while pretending not to care.'
    },
    {
        id: 'tt7221388',
        type: 'movie',
        name: 'Mike Tyson Mysteries: The Movie',
        poster: 'https://image.tmdb.org/t/p/w500/aQQKVYHzXLgBqFIMYJmFAHJi3YD.jpg',
        background: 'https://image.tmdb.org/t/p/original/cFqZ3Q0kJw9T9kD8NbS9XzF2XDh.jpg',
        genre: ["Adult Animation", 'Comedy'],
        releaseInfo: '2020',
        description: 'Mike Tyson and his team solve mysteries together in this animated movie.'
    },
    {
        id: 'tt5168086',
        type: 'movie',
        name: 'The Venture Bros.: Radiant Is the Blood of the Baboon Heart',
        poster: 'https://image.tmdb.org/t/p/w500/6y8NSlHysoqvMeLZToEvtRqqQhU.jpg',
        background: 'https://image.tmdb.org/t/p/original/fjLLhYUnfFC224zJyoEVrVFXf3.jpg',
        genre: ["Adult Animation", 'Comedy', 'Action'],
        releaseInfo: '2023',
        description: 'Doc\'s latest invention will either bankrupt the Ventures or launch them to new heights.'
    },
    {
        id: 'tt0408664',
        type: 'movie',
        name: 'Bleach the Movie: Memories of Nobody',
        poster: 'https://image.tmdb.org/t/p/w500/gCFSrZ8eKTdFDlHdL0rD3VbqSYv.jpg',
        background: 'https://image.tmdb.org/t/p/original/fNTIqzhN5AXz2LLUW9CnSh0tD7m.jpg',
        genre: ['Anime', 'Action'],
        releaseInfo: '2006',
        description: 'In Karakura Town, unidentifiable spirits begin appearing en mases. While attempting to deal with these strange souls, Ichigo Kurosaki and Rukia Kuchiki meet Senna, a mysterious girl who wipes out most of the spirits.'
    },
    {
        id: 'tt1226251',
        type: 'movie',
        name: 'Bleach the Movie: The DiamondDust Rebellion',
        poster: 'https://image.tmdb.org/t/p/w500/wRcxXqQ9YNnIU4B0kDjVYfPcZe5.jpg',
        background: 'https://image.tmdb.org/t/p/original/z4PigKoxxvHuHBLvxDlqK9p3xJf.jpg',
        genre: ['Anime', 'Action'],
        releaseInfo: '2007',
        description: 'A valuable artifact known as "King\'s Seal" is stolen by a mysterious group of people during transport in Soul Society. Hitsugaya Toushiro, the captain of the 10th division, is assigned to transport the seal, fights the intruders.'
    },
    {
        id: 'tt1324060',
        type: 'movie',
        name: 'Bleach the Movie: Fade to Black',
        poster: 'https://image.tmdb.org/t/p/w500/8BNaKTWPmypfVzCDRkL26zVmOH0.jpg',
        background: 'https://image.tmdb.org/t/p/original/sWS7Xp01zcOyYfUTGYPT9v2F8Gq.jpg',
        genre: ['Anime', 'Action'],
        releaseInfo: '2008',
        description: 'A mysterious reiatsu suddenly appears in Soul Society and Rukia is taken away by it. Ichigo must find the truth behind this strange occurrence and save Rukia.'
    },
    {
        id: 'tt1724543',
        type: 'movie',
        name: 'Bleach the Movie: Hell Verse',
        poster: 'https://image.tmdb.org/t/p/w500/e0HhJRFfAmEOWz6YtvmMCWNsFMY.jpg',
        background: 'https://image.tmdb.org/t/p/original/vYdlqLmsfBXTfAiZ5mh6kxfQKIH.jpg',
        genre: ['Anime', 'Action'],
        releaseInfo: '2010',
        description: 'Hell – A place where beings that have committed mortal sins during their lifetime are sent. It is a realm where even Soul Reapers are forbidden to interfere. When a group of vicious Sinners plot to escape from this eternal prison, they discover that Ichigo has the key to open the gates of Hell.'
    },
    {
        id: 'tt0346314',
        type: 'movie',
        name: 'Robot Chicken: DC Comics Special',
        poster: 'https://image.tmdb.org/t/p/w500/6x4h9KNfVQdYXu3v8r2qHJGFnFl.jpg',
        background: 'https://image.tmdb.org/t/p/original/7Q7mVNaZRxZpqJLHbqC3hLBhvFl.jpg',
        genre: ["Adult Animation", 'Comedy'],
        releaseInfo: '2012',
        description: 'Robot Chicken DC Comics Special brings the DC Comics universe to life the Robot Chicken way.'
    },
    {
        id: 'tt0424618',
        type: 'movie',
        name: 'Cowboy Bebop: The Movie',
        poster: 'https://image.tmdb.org/t/p/w500/yeKAZ4yhYReHgMKLqY4S8uGdp7u.jpg',
        background: 'https://image.tmdb.org/t/p/original/4fWyzgnEVWMrsDnvTO6TqfNAAGc.jpg',
        genre: ['Anime', 'Action', 'Sci-Fi'],
        releaseInfo: '2001',
        description: 'Mars. Days before Halloween 2071. Villains blow up a tanker truck on Highway One, releasing a deadly virus that kills hundreds. Fearing a bigger, even more devastating biochemical attack, an astronomical reward is offered.'
    },
    {
        id: 'tt0213338',
        type: 'movie',
        name: 'Inuyasha the Movie: Affections Touching Across Time',
        poster: 'https://image.tmdb.org/t/p/w500/3QsfSKRwNPXfQqjT0hfEZn0lJr1.jpg',
        background: 'https://image.tmdb.org/t/p/original/17QqYVdNqMCPqQBD0UxKu8F6ZNr.jpg',
        genre: ['Anime', 'Action'],
        releaseInfo: '2001',
        description: 'InuYasha is a half-demon who was trapped in the Legendary Tree and was set free by Kagome, a girl who traveled 500 years through time. This time, both of them will have to face Menomaru, a Chinese demon whose father, known as Hyoga, came 300 years ago to invade Japan.'
    },
    {
        id: 'tt1606378',
        type: 'movie',
        name: 'Fullmetal Alchemist: The Sacred Star of Milos',
        poster: 'https://image.tmdb.org/t/p/w500/zbHv9MlYVvITcDFgLibxVKr3jVZ.jpg',
        background: 'https://image.tmdb.org/t/p/original/gWDirbqmgP7XT8GVQe6vYhqJQax.jpg',
        genre: ['Anime', 'Action'],
        releaseInfo: '2011',
        description: 'After a mysterious prisoner with only a few weeks left on his sentence breaks out of prison in Central City, the Elric brothers attempt to track him down.'
    },
    {
        id: 'tt0493329',
        type: 'movie',
        name: 'Ghost in the Shell: Stand Alone Complex - Solid State Society',
        poster: 'https://image.tmdb.org/t/p/w500/8uCjFqL1dLbVVfLO9YIqJC8lVrM.jpg',
        background: 'https://image.tmdb.org/t/p/original/vKXPiNqMVRKBgSaTVqXELqHhDYO.jpg',
        genre: ['Anime', 'Action', 'Sci-Fi'],
        releaseInfo: '2006',
        description: 'A.D. 2034. It has been two years since Motoko Kusanagi left Section 9. Togusa is now the new leader of the team, that has considerably increased its appointed personnel.'
    },
    {
        id: 'tt0347246',
        type: 'movie',
        name: 'Trigun: Badlands Rumble',
        poster: 'https://image.tmdb.org/t/p/w500/2fHFdqr5xKCbCqkXHVK6VQJBKYL.jpg',
        background: 'https://image.tmdb.org/t/p/original/yPpfEGbX8K0g5l2LhE9k3sJ8Y3E.jpg',
        genre: ['Anime', 'Action', 'Sci-Fi'],
        releaseInfo: '2010',
        description: 'In a quicksand surrounded town called Makka, rumors spread of a legendary robber named Gasback is after the town. To protect it, Mayor Kepler has hired bounty hunters.'
    },
    {
        id: 'tt1219342',
        type: 'movie',
        name: 'Summer Wars',
        poster: 'https://image.tmdb.org/t/p/w500/9VRGKZIARbEL3bT8e5c0xYCnJFw.jpg',
        background: 'https://image.tmdb.org/t/p/original/mj4DqfLrG5zUcLKVdp0pEoS1hM4.jpg',
        genre: ['Anime', 'Comedy', 'Sci-Fi'],
        releaseInfo: '2009',
        description: 'A student tries to fix a problem he accidentally caused in OZ, a digital world, while pretending to be the fiancé of his friend at her grandmother\'s 90th birthday.'
    },
    {
        id: 'tt0851578',
        type: 'movie',
        name: 'Paprika',
        poster: 'https://image.tmdb.org/t/p/w500/ue6tWKFulmMQEokgJzWlfsS2C6i.jpg',
        background: 'https://image.tmdb.org/t/p/original/8uXqSjNePepOKNXahjXqrHdqx6Y.jpg',
        genre: ["Anime","Fantasy","Sci-Fi"],
        releaseInfo: '2006',
        description: 'When a machine that allows therapists to enter their patient\'s dreams is stolen, all hell breaks loose. Only the young female therapist who uses the machine can stop it.'
    },
    {
        id: 'tt1410218',
        type: 'movie',
        name: 'Redline',
        poster: 'https://image.tmdb.org/t/p/w500/9QFmv1KTQKz9NKLdQ2hkq5lJXq7.jpg',
        background: 'https://image.tmdb.org/t/p/original/5Hgf8HhRv5y6KKXaJf4Cr8vRCJA.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '2009',
        description: 'The most dangerous and exciting car race in the universe is held only once every five years. And that\'s tonight. The competitors are lined up at the starting block.'
    },
    {
        id: 'tt0347149',
        type: 'movie',
        name: 'Sword of the Stranger',
        poster: 'https://image.tmdb.org/t/p/w500/pjqvLNZAYqxvl5IB4v9wLrwL7w5.jpg',
        background: 'https://image.tmdb.org/t/p/original/1gv7rCWt3Gf5sZEb8P7KpVKXC1H.jpg',
        genre: ['Anime', 'Action'],
        releaseInfo: '2007',
        description: 'A swordsman from a strange land is caught in a struggle between morality, righteousness, and devotion as he reluctantly agrees to take a raggedy boy and his dog to a remote, Buddhist temple.'
    },
    {
        id: 'tt0347618',
        type: 'movie',
        name: 'Akira',
        poster: 'https://image.tmdb.org/t/p/w500/4LazyDBKZZLlLZOCUL7NpBeFxhH.jpg',
        background: 'https://image.tmdb.org/t/p/original/5WXeYnezavNI6hXH749Z6QY9r8.jpg',
        genre: ["Anime","Action","FX","Sci-Fi"],
        releaseInfo: '1988',
        description: 'A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath that only two teenagers and a group of psychics can stop.'
    },
    {
        id: 'tt1022883',
        type: 'movie',
        name: 'Afro Samurai',
        poster: 'https://image.tmdb.org/t/p/w500/yhKuD4YVPfZAqZAWZPFQNEKLOLq.jpg',
        background: 'https://image.tmdb.org/t/p/original/3bXRXw3RIFSCqcPJdnfMbcXUdZw.jpg',
        genre: ["Adult Animation","Action","FX"],
        releaseInfo: '2007',
        description: 'A Black samurai goes on a mission to avenge the wrongful death of his father in a futuristic feudal Japan. He is on a quest to challenge a powerful warrior who holds the Number 1 headband.'
    },
    {
        id: 'tt0465316',
        type: 'movie',
        name: 'Afro Samurai: Resurrection',
        poster: 'https://image.tmdb.org/t/p/w500/7g5gHWqR4pKjqIqAqSXZzXJmKXC.jpg',
        background: 'https://image.tmdb.org/t/p/original/5V7LDdXn1v7BXzKJCZyBzQo5Ncc.jpg',
        genre: ["Adult Animation","Action","FX"],
        releaseInfo: '2009',
        description: 'Afro Samurai avenged his father and found a life of peace. But the legendary master is forced back into the game by a beautiful and deadly woman from his past.'
    }
];

// Adult Swim Series
const adultSwimSeries = [
    {
        id: 'tt0436992',
        type: 'series',
        name: 'Rick and Morty',
        poster: 'https://image.tmdb.org/t/p/w500/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg',
        background: 'https://image.tmdb.org/t/p/original/yxw3Q35fHQDV2dqY5a1kMfb6SyV.jpg',
        genre: ["Adult Animation","Comedy","Sci-Fi"],
        releaseInfo: '2013',
        description: 'Rick is a mentally-unbalanced but scientifically gifted old man who has recently reconnected with his family. He spends most of his time involving his young grandson Morty in dangerous, outlandish adventures throughout space and alternate universes.'
    },
    {
        id: 'tt0182576',
        type: 'series',
        name: 'Family Guy',
        poster: 'https://image.tmdb.org/t/p/w500/y0HUz4eUNUe3TeEd8fQWYazPaC7.jpg',
        background: 'https://image.tmdb.org/t/p/original/pH38r4TWTqq7Mcs6XAlwgzNUqu2.jpg',
        genre: ["Adult Animation","Comedy","FX"],
        releaseInfo: '1999',
        description: 'Sick, twisted, politically incorrect and Freakin\' Sweet animated series featuring the adventures of the dysfunctional Griffin family. Bumbling Peter and long-suffering Lois have three kids.'
    },
    {
        id: 'tt0397306',
        type: 'series',
        name: 'American Dad!',
        poster: 'https://image.tmdb.org/t/p/w500/xnFFz3etm1vftF0ns8RMHA83PMz.jpg',
        background: 'https://image.tmdb.org/t/p/original/uNMtVAaEM40MdiMFeGD3CZauPT.jpg',
        genre: ["Adult Animation","Comedy","FX"],
        releaseInfo: '2005',
        description: 'The series focuses on an eccentric motley crew that is the Smith family and their three housemates: Father, husband, and breadwinner Stan Smith; his better half housewife, Francine Smith; their college-aged daughter, Hayley Smith; and their high-school-aged son, Steve Smith.'
    },
    {
        id: 'tt1561755',
        type: 'series',
        name: 'Bob\'s Burgers',
        poster: 'https://image.tmdb.org/t/p/w500/couFnWryh9JRmmfDyPU6hUyTKIa.jpg',
        background: 'https://image.tmdb.org/t/p/original/7gRe83TGWGJlebHV48JG8JqfR8F.jpg',
        genre: ["Adult Animation","Comedy","FX"],
        releaseInfo: '2011',
        description: 'Bob\'s Burgers follows a third-generation restaurateur, Bob, as he runs Bob\'s Burgers with the help of his wife and their three kids.'
    },
    {
        id: 'tt0213338',
        type: 'series',
        name: 'Cowboy Bebop',
        poster: 'https://image.tmdb.org/t/p/w500/gvlim4ZlerbazLWrHkxPPreMprx.jpg',
        background: 'https://image.tmdb.org/t/p/original/m8r7XyhqeGPWCRX6dtXdMCXg6pd.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '1998',
        description: 'In 2071, roughly fifty years after an accident with a hyperspace gateway made the Earth almost uninhabitable, humanity has colonized most of the rocky planets and moons of the Solar System.'
    },
    {
        id: 'tt0297494',
        type: 'series',
        name: 'Aqua Teen Hunger Force',
        poster: 'https://image.tmdb.org/t/p/w500/jCWOorL3rZETacfvamplO9kTYnu.jpg',
        background: 'https://image.tmdb.org/t/p/original/byC9T6SrEdjDIq8Kc2FnqmC9Ebi.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2000-2015',
        description: 'The surreal adventures of three anthropomorphic fast food items: Master Shake, Frylock and Meatwad, and their human nextdoor neighbor, Carl Brutananadilewski.'
    },
    {
        id: 'tt0346314',
        type: 'series',
        name: 'Robot Chicken',
        poster: 'https://image.tmdb.org/t/p/w500/lYDPvP1iYbqnJbJMxiUFKJ7viGR.jpg',
        background: 'https://image.tmdb.org/t/p/original/72qHzYrXKm30nGrqJjsOVuQ9Gbb.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2005',
        description: 'A series of pop-culture parodies using stop-motion animation of toys, action figures and dolls.'
    },
    {
        id: 'tt0862467',
        type: 'series',
        name: 'The Venture Bros.',
        poster: 'https://image.tmdb.org/t/p/w500/mhb1KHXFObkRhNAGzCT9QHQR0x1.jpg',
        background: 'https://image.tmdb.org/t/p/original/nqL8gR75Np6H5c1yPxGfGNEXvzn.jpg',
        genre: ["Adult Animation","Action","Comedy"],
        releaseInfo: '2003',
        description: 'Hank and Dean Venture, with their father Doctor Venture and faithful bodyguard Brock Samson, go on wild adventures facing megalomaniacs, zombies, and suspicious ninjas.'
    },
    {
        id: 'tt0437745',
        type: 'series',
        name: 'Metalocalypse',
        poster: 'https://image.tmdb.org/t/p/w500/eP7ZkcTbASKpZ43DRb5oUqVLBXB.jpg',
        background: 'https://image.tmdb.org/t/p/original/8VLKkjAyWNzQ4cqoMwYW7V3RsCN.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2006',
        description: 'Metalocalypse follows the adventures of Dethklok, the world\'s most brutal death metal band, as they navigate their way through everyday life and the music industry.'
    },
    {
        id: 'tt0421357',
        type: 'series',
        name: 'The Boondocks',
        poster: 'https://image.tmdb.org/t/p/w500/17PYZ35atGk5fHM5mLT6Bjv4f46.jpg',
        background: 'https://image.tmdb.org/t/p/original/w7CxY2W91qRtkpCHkbT84pLXVRX.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2005',
        description: 'When Robert "Granddad" Freeman becomes legal guardian to his two grandsons, he moves from the tough south side of Chicago to the upscale neighborhood of Woodcrest so he can enjoy his golden years in safety and comfort.'
    },
    {
        id: 'tt9140342',
        type: 'series',
        name: 'Smiling Friends',
        poster: 'https://image.tmdb.org/t/p/w500/m8xMg6RWTy6Bv2JxIoQABEuOz3a.jpg',
        background: 'https://image.tmdb.org/t/p/original/mNYNJpKTEKmY1dNmgDCOk1TUgNo.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2022',
        description: 'Smiling Friends Inc. is a small company whose main purpose is to bring happiness and make people smile. The show follows the day-to-day lives and misadventures of its representatives.'
    },
    {
        id: 'tt7930782',
        type: 'series',
        name: 'Primal',
        poster: 'https://image.tmdb.org/t/p/w500/cHR4E2f3YqiGqxh26V9tCOFKL7f.jpg',
        background: 'https://image.tmdb.org/t/p/original/2VN0VRVGM9Cz3Q5wETqBpfTLmkA.jpg',
        genre: ["Adult Animation","Action","Sci-Fi"],
        releaseInfo: '2019',
        description: 'A caveman and a dinosaur on the brink of extinction bond over unfortunate tragedies and become each other\'s only hope of survival in a treacherous world.'
    },
    {
        id: 'tt11771270',
        type: 'series',
        name: 'Genndy Tartakovsky\'s Primal',
        poster: 'https://image.tmdb.org/t/p/w500/cHR4E2f3YqiGqxh26V9tCOFKL7f.jpg',
        background: 'https://image.tmdb.org/t/p/original/2VN0VRVGM9Cz3Q5wETqBpfTLmkA.jpg',
        genre: ["Adult Animation","Action"],
        releaseInfo: '2019',
        description: 'A caveman and a dinosaur bond over unfortunate tragedies and become each other\'s only hope of survival in a treacherous world.'
    },
    {
        id: 'tt0434665',
        type: 'series',
        name: 'Bleach',
        poster: 'https://image.tmdb.org/t/p/w500/2EewmanNnZF1bzkPRiOIJpqqUmo.jpg',
        background: 'https://image.tmdb.org/t/p/original/9BRazr69lebF4uh2TLqHMbqBaZt.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '2004',
        description: 'For as long as he can remember, Ichigo Kurosaki has been able to see ghosts. But when he meets Rukia, a Soul Reaper who battles evil spirits known as Hollows, he finds his life is changed forever.'
    },
    {
        id: 'tt0337742',
        type: 'series',
        name: 'Fullmetal Alchemist',
        poster: 'https://image.tmdb.org/t/p/w500/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg',
        background: 'https://image.tmdb.org/t/p/original/dFpkFTpJXLHxB96i8jZxcJMfCzE.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '2003',
        description: 'Edward and Alphonse Elric are two brothers gifted with the ability of alchemy, the science of taking one thing and changing it into another. When their mother dies, they attempt to bring her back using forbidden techniques.'
    },
    {
        id: 'tt0388629',
        type: 'series',
        name: 'Inuyasha',
        poster: 'https://image.tmdb.org/t/p/w500/lRB1fCZ06k0DYX7A3hFvCXBmCkB.jpg',
        background: 'https://image.tmdb.org/t/p/original/4cZIa0VgfezY5O2Pf7K4Mb2Scai.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '2000',
        description: 'Kagome Higurashi is a modern day young girl who lives with her family by the old Higure shrine. Unbeknownst to Kagome, she is the reincarnation of priestess Kikyo and posseses the "Jewel of Four Souls".'
    },
    {
        id: 'tt0409591',
        type: 'series',
        name: 'Samurai Champloo',
        poster: 'https://image.tmdb.org/t/p/w500/cVtb5M8A1biHPVAYfzEBXPRHNlX.jpg',
        background: 'https://image.tmdb.org/t/p/original/vCvqFx0o1m9FvKLLIvBhhhCxVuu.jpg',
        genre: ["Anime","Action","Comedy"],
        releaseInfo: '2004',
        description: 'Mugen is a fierce animal-like warrior with a unique Bboy style of fighting. Jin is a vagrant ronin warrior. Fuu is a young waitress. Together they travel across feudal Japan seeking adventure.'
    },
    {
        id: 'tt0318871',
        type: 'series',
        name: 'Trigun',
        poster: 'https://image.tmdb.org/t/p/w500/7FvWLm0wwJJHiDCXvH4hue8b7mK.jpg',
        background: 'https://image.tmdb.org/t/p/original/7KvdLUFxpLhtMdYgw29PjzAe7Dk.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '1998',
        description: 'Vash the Stampede is the man with a $60,000,000,000 bounty on his head. The reason: he\'s a merciless villain who lays waste to all those that oppose him.'
    },
    {
        id: 'tt0279077',
        type: 'series',
        name: 'FLCL',
        poster: 'https://image.tmdb.org/t/p/w500/3se2pudICkdY6HXa7I2dOWSkkZq.jpg',
        background: 'https://image.tmdb.org/t/p/original/mYKjVEXsXVJ6c6QqGckdVUwqFCR.jpg',
        genre: ["Anime","Comedy","Sci-Fi"],
        releaseInfo: '2000',
        description: 'Naota is a normal boy who kills some time with a normal girl by a stream that flows underneath a bridge. Nothing unusual happens in this town.'
    },
    {
        id: 'tt0290295',
        type: 'series',
        name: 'Big O',
        poster: 'https://image.tmdb.org/t/p/w500/cyYfvO0Xj4BO1WHZCQJpmG1k3sD.jpg',
        background: 'https://image.tmdb.org/t/p/original/kZxB5OuUQTxvD02L5dmMlYNqQNN.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '1999',
        description: 'Forty years ago, the minds of Paradigm City\'s inhabitants were wiped clean of all recollections of the past. Now, ruled by a powerful corporation, Paradigm City is plagued by crime.'
    },
    {
        id: 'tt0069278',
        type: 'series',
        name: 'Yu Yu Hakusho',
        poster: 'https://image.tmdb.org/t/p/w500/jq8H1CtwqRlGmLBqbxfWicEYCcu.jpg',
        background: 'https://image.tmdb.org/t/p/original/gQQVHf4bwpZKUwRp3ZGCHYgKvgG.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '1992',
        description: 'One day, 14-year-old Yusuke Urameshi suddenly finds himself dead, having died pushing a child out of the way of oncoming traffic. He is reborn as a Spirit Detective to defeat demons.'
    },
    {
        id: 'tt1884367',
        type: 'series',
        name: 'The Eric Andre Show',
        poster: 'https://image.tmdb.org/t/p/w500/3OX22kBKBVvVnRMlN8VsHjVV0b8.jpg',
        background: 'https://image.tmdb.org/t/p/original/tVNU4v6NjXWX9yU8bZ6MF8SqZay.jpg',
        genre: ["Live","Comedy"],
        releaseInfo: '2012',
        description: 'A comedic talk show from an alternate reality featuring unstable hosts, a variety of celebrities—both real and fake—and unusual studio action.'
    },
    {
        id: 'tt3398228',
        type: 'series',
        name: 'Mike Tyson Mysteries',
        poster: 'https://image.tmdb.org/t/p/w500/rjcdaKHF3eH8gSsQElqJPKl3wZs.jpg',
        background: 'https://image.tmdb.org/t/p/original/hNgVXLBhcS8bPZ0pEUB8D5YvV2J.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2014',
        description: 'Mike Tyson is taking the fight from the boxing ring to the streets… by solving mysteries!'
    },
    {
        id: 'tt1103966',
        type: 'series',
        name: 'Superjail!',
        poster: 'https://image.tmdb.org/t/p/w500/b8WHQC4RmSNwvNshP6UjxFAZjbU.jpg',
        background: 'https://image.tmdb.org/t/p/original/d0h7qGxw19VXBuLAW2YYUP3Q7LH.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2007',
        description: 'Superjail! is an American animated television series produced by Augenblick Studios in its first season and Titmouse, Inc. in its second, third and fourth seasons.'
    },
    {
        id: 'tt1195935',
        type: 'series',
        name: 'The Cleveland Show',
        poster: 'https://image.tmdb.org/t/p/w500/dVPjiqY62tJCUL2nuDK4OzonOvT.jpg',
        background: 'https://image.tmdb.org/t/p/original/h9f5g8MhPZIDnKM8ayhq8NfGgHj.jpg',
        genre: ["Adult Animation","Comedy", "FX"],
        releaseInfo: '2009',
        description: 'Follow everyone\'s favorite bartender from Family Guy, Cleveland Brown, as he leaves Quahog and settles into his hometown of Stoolbend, Virginia.'
    },
    {
        id: 'tt10638036',
        type: 'series',
        name: 'Tuca & Bertie',
        poster: 'https://image.tmdb.org/t/p/w500/fVDeGFBqRjKBqB8TuB8hZGxRCiZ.jpg',
        background: 'https://image.tmdb.org/t/p/original/xyy3hJcZvPwbNtKy3HsYeebJhyc.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2019',
        description: 'Free-spirited toucan Tuca and self-doubting song thrush Bertie are best friends – and birds – who guide each other through life\'s ups and downs.'
    },
    {
        id: 'tt2069322',
        type: 'series',
        name: 'Squidbillies',
        poster: 'https://image.tmdb.org/t/p/w500/vYvOZWxP2LHdFqHNl9Z5OOGQgYk.jpg',
        background: 'https://image.tmdb.org/t/p/original/wgVSL5HVQwMKqMU0SvRhF3WgS15.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2005',
        description: 'Squidbillies is an animated television series about the Cuylers, an impoverished family of anthropomorphic hillbilly mud squids living in the Georgia region of the Blue Ridge Mountains.'
    },
    {
        id: 'tt0401792',
        type: 'series',
        name: 'Harvey Birdman, Attorney at Law',
        poster: 'https://image.tmdb.org/t/p/w500/hRKfOpgvpKZWCrCZKjVVWP3EYQO.jpg',
        background: 'https://image.tmdb.org/t/p/original/4KWEbKJmhBUzVj1m6cYNbHKF2c5.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2000',
        description: 'Harvey Birdman, Attorney at Law features ex-superhero Harvey T. Birdman of Birdman and the Galaxy Trio as an attorney working for a law firm alongside other cartoon stars from 1960s and 1970s Hanna-Barbera cartoon series.'
    },
    {
        id: 'tt0251418',
        type: 'series',
        name: 'Sealab 2021',
        poster: 'https://image.tmdb.org/t/p/w500/6eMy8zEy6Q8aCMfqKvXGpv0Z5Tg.jpg',
        background: 'https://image.tmdb.org/t/p/original/pIRfN6y5XW3gMJMfLZGJqPwJvVU.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2000',
        description: 'The year is 2021. Deep below the ocean\'s surface, looms a vast, magnificently high-tech compound: Sealab. A multi-national scientific station with an annual budget in the trillions.'
    },
    {
        id: 'tt0423731',
        type: 'series',
        name: 'Space Ghost Coast to Coast',
        poster: 'https://image.tmdb.org/t/p/w500/2cW6cxLQ5k3d3VTvVQlhDEpQNjQ.jpg',
        background: 'https://image.tmdb.org/t/p/original/hM8RK9Q0xQVHLcE2xh0Lr8cM6LK.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '1994',
        description: 'A spoof of late night talk shows hosted by space ghost Tad Ghostal, re-purposed from the 1960s cartoon Space Ghost.'
    },
    {
        id: 'tt0196146',
        type: 'series',
        name: 'Home Movies',
        poster: 'https://image.tmdb.org/t/p/w500/4UwqbBjWlE8xYCpE4kqYKKHJkWs.jpg',
        background: 'https://image.tmdb.org/t/p/original/w1y9uHjbYUVdLZKCFqvBQkBUVKs.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '1999',
        description: 'Home Movies follows an eight-year-old aspiring filmmaker and his friends as they create homemade movies using an outdated camcorder.'
    },
    {
        id: 'tt0870111',
        type: 'series',
        name: 'Moral Orel',
        poster: 'https://image.tmdb.org/t/p/w500/d1c4qcAaLhfJfQjh6YgP5YYMv3E.jpg',
        background: 'https://image.tmdb.org/t/p/original/6YzXgXBiY8HjgGQ4Bz1S8hQPAD7.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2005',
        description: 'Orel Puppington is an optimistic, well-intentioned, and devoutly religious 11-year-old who often misinterprets and misapplies the teachings of Christianity.'
    },
    {
        id: 'tt0461829',
        type: 'series',
        name: 'Frisky Dingo',
        poster: 'https://image.tmdb.org/t/p/w500/x2WOMGQqQx3qJy8pCYKwxVwDTPR.jpg',
        background: 'https://image.tmdb.org/t/p/original/fS5I2OgEQNjqLLCQVNDkVQVQaPc.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2006',
        description: 'Frisky Dingo is an American animated cartoon series created by Adam Reed and Matt Thompson for Adult Swim.'
    },
    {
        id: 'tt0423733',
        type: 'series',
        name: 'Stroker and Hoop',
        poster: 'https://image.tmdb.org/t/p/w500/pY3h8DgLxGvOGJxVuHYqZ0Q4Gg8.jpg',
        background: 'https://image.tmdb.org/t/p/original/zQ4wX4LcJ7YkQJOZnD1f8xZ1BZZ.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2004',
        description: 'Stroker and Hoop is an animated series about two inept private detectives who tackle cases in Southern California.'
    },
    {
        id: 'tt0423732',
        type: 'series',
        name: 'Megas XLR',
        poster: 'https://image.tmdb.org/t/p/w500/qJyXPdZYLQj5zVvBqKMjS0PYPZx.jpg',
        background: 'https://image.tmdb.org/t/p/original/sYkEPMlS3ZUwKyqtVDpM0XlF3wU.jpg',
        genre: ["Adult Animation","Comedy","Sci-Fi"],
        releaseInfo: '2004',
        description: 'Megas XLR is a series about an overweight couch potato named Coop who finds a giant robot from the future, modifies it, and defends Earth from alien invaders.'
    },
    {
        id: 'tt0423735',
        type: 'series',
        name: 'The Oblongs',
        poster: 'https://image.tmdb.org/t/p/w500/bYi8P1rVqKq4u9WfPcmVBzQXCKD.jpg',
        background: 'https://image.tmdb.org/t/p/original/zWdcPKjJ2H7Q3Mq7vVjqJKfQVqV.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2001',
        description: 'The Oblongs are not so much dysfunctional as slightly nonfunctional. Living next to a polluted swamp has left them with the occasional missing limb or mysterious growth.'
    },
    {
        id: 'tt3544796',
        type: 'series',
        name: 'Mr. Pickles',
        poster: 'https://image.tmdb.org/t/p/w500/k0wQdRlOyHUCy7cZ6UUCj4y3i2L.jpg',
        background: 'https://image.tmdb.org/t/p/original/yj5V2bLbfX9fvNAHHC4KmCqP3DL.jpg',
        genre: ["Adult Animation","Comedy","FX"],
        releaseInfo: '2014',
        description: 'The Goodman family lives with their lovable pet dog, Mr. Pickles, a deviant border collie with a secret satanic streak.'
    },
    {
        id: 'tt1389132',
        type: 'series',
        name: 'China, IL',
        poster: 'https://image.tmdb.org/t/p/w500/bGjHeBnLvvYqWMc6LFvfH2b3xAn.jpg',
        background: 'https://image.tmdb.org/t/p/original/3Oq5IqVN3lHJXGjxgEqtcAkqL6x.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2011',
        description: 'Professor Brothers and the inhabitants of China, IL, a down-and-out university with no endowment.'
    },
    {
        id: 'tt3230780',
        type: 'series',
        name: 'Black Dynamite',
        poster: 'https://image.tmdb.org/t/p/w500/pM3nxgHZfXTTzKXlH0zUkPc4aSd.jpg',
        background: 'https://image.tmdb.org/t/p/original/iOdxmFqYlWsJxRGJqYyYs9EXu7a.jpg',
        genre: ["Adult Animation","Action","Comedy"],
        releaseInfo: '2012',
        description: 'Black Dynamite is an American animated television series based on the 2009 film of the same name.'
    },
    {
        id: 'tt1018800',
        type: 'series',
        name: 'S-CRY-ed',
        poster: 'https://image.tmdb.org/t/p/w500/nqILT9KZlGZHLVUuGqPzFDp7jNY.jpg',
        background: 'https://image.tmdb.org/t/p/original/uS7ygB7QTRhYOT5m3B1qPqZHFMa.jpg',
        genre: ["Anime","Action","Sci-Fi"],
        releaseInfo: '2001',
        description: '22 years ago, a cataclysmic earthquake destroyed the prefectures of Kanagawa and Yokohama. The site of the disaster is called the Lost Ground, and it birthed a new breed of humans with special powers.'
    },
    {
        id: 'tt5663122',
        type: 'series',
        name: 'The Shivering Truth',
        poster: 'https://image.tmdb.org/t/p/w500/hJmSfPKhYXdCqZbzKXM4KGC5qfY.jpg',
        background: 'https://image.tmdb.org/t/p/original/qV9hhLdkuqnPxP4xVGE1RdNQC1y.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2018',
        description: 'A miniature propulsive omnibus clusterbomb of painfully riotous daymares all dripping with the orange goo of dream logic.'
    },
    {
        id: 'tt5580390',
        type: 'series',
        name: 'Dream Corp LLC',
        poster: 'https://image.tmdb.org/t/p/w500/4eUxPqhC8Lq6DWLYBdPvM9Q8SXe.jpg',
        background: 'https://image.tmdb.org/t/p/original/kfBBzJmZVWFXULYRkPl8hGC2DYV.jpg',
        genre: ["Live","Comedy","Sci-Fi"],
        releaseInfo: '2016',
        description: 'Patients seeking the services of a dream therapy facility are treated to more than they bargained for when they discover that life can truly become a nightmare.'
    },
    {
        id: 'tt8910918',
        type: 'series',
        name: 'Lazor Wulf',
        poster: 'https://image.tmdb.org/t/p/w500/hFPPXPUQyLGdDi2N2pO3gMXCG9O.jpg',
        background: 'https://image.tmdb.org/t/p/original/8DjtXXJVqN1wFx8xLaCHW1mDTZc.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2019',
        description: 'The adventures of a wolf with a laser on his back and his friends living in a dystopian desert.'
    },
    {
        id: 'tt2758770',
        type: 'series',
        name: 'Your Pretty Face Is Going to Hell',
        poster: 'https://image.tmdb.org/t/p/w500/pYYWqFmXILT1VdXLBZYXh9VTkjy.jpg',
        background: 'https://image.tmdb.org/t/p/original/gE4PJY4kR8YFNwQYCwVPFXOiTKq.jpg',
        genre: ["Live","Comedy","FX"],
        releaseInfo: '2013',
        description: 'A live-action workplace comedy about Gary, an associate demon, as he attempts to capture souls on earth in order to climb the corporate ladder of the underworld.'
    },
    {
        id: 'tt5613920',
        type: 'series',
        name: 'Ballmastrz: 9009',
        poster: 'https://image.tmdb.org/t/p/w500/gBqr8KWQZ0m2Kh0sF9J3fOvqKZ5.jpg',
        background: 'https://image.tmdb.org/t/p/original/cqhC8GqfJG4YrAXQqKKFkTR2eYy.jpg',
        genre: ["Adult Animation","Action","Comedy"],
        releaseInfo: '2018',
        description: 'Thousands of years in the future, teams of Ballmastrz face off against each other using their own hyper-creative and artificially intelligent combat weapons to attack, defend and score.'
    },
    {
        id: 'tt2218791',
        type: 'series',
        name: 'NTSF:SD:SUV::',
        poster: 'https://image.tmdb.org/t/p/w500/b7TVCXBxXv1TF8w8wFJqRi8zE5B.jpg',
        background: 'https://image.tmdb.org/t/p/original/2lE5hqJQY3YpR7Dz6BL0GVhLLEV.jpg',
        genre: ["Live","Action","Comedy"],
        releaseInfo: '2011',
        description: 'NTSF:SD:SUV:: chronicles the adventures of the National Terrorism Strike Force: San Diego: Sport Utility Vehicle, a task force charged with preventing terrorist activity in San Diego.'
    },
    {
        id: 'tt1797648',
        type: 'series',
        name: 'Eagleheart',
        poster: 'https://image.tmdb.org/t/p/w500/2pqDghtR6T9mGl4XvFCnHNQSVsJ.jpg',
        background: 'https://image.tmdb.org/t/p/original/cQXgaQPdAm7y6V0pYILKdWxVWSX.jpg',
        genre: ["Live","Action","Comedy"],
        releaseInfo: '2011',
        description: 'Eagleheart is an action-comedy television series that premiered on February 3, 2011, on Adult Swim.'
    },
    {
        id: 'tt1625346',
        type: 'series',
        name: 'Delocated',
        poster: 'https://image.tmdb.org/t/p/w500/jDHkjuiYzhKMvN0NHYWOzMkJo2M.jpg',
        background: 'https://image.tmdb.org/t/p/original/6Qpr5G0vqVVaUu2fQ4nt7zZJ6V4.jpg',
        genre: ["Live","Comedy"],
        releaseInfo: '2009',
        description: 'A man in witness protection has his cover blown when he decides to star in a reality show.'
    },
    {
        id: 'tt3865352',
        type: 'series',
        name: 'King Star King',
        poster: 'https://image.tmdb.org/t/p/w500/zGZbQxVZOqLqUV47DGKpQPdg8wY.jpg',
        background: 'https://image.tmdb.org/t/p/original/3RRMIvMxXFD9V9rN0w4UqKmQoGP.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2014',
        description: 'King Star King is a tall, blond muscular man who after seducing his love, Princess Snow White, falls from his higher plane of existence to serve as a fry cook in a run-down waffle house.'
    },
    {
        id: 'tt4477976',
        type: 'series',
        name: 'Hot Streets',
        poster: 'https://image.tmdb.org/t/p/w500/kEy43R3v9bWQxYg9GbMK0Wl8IxW.jpg',
        background: 'https://image.tmdb.org/t/p/original/wKtQElU7j9DlTyqnNjgJCXH3YgZ.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2016',
        description: 'An FBI agent, his partner and their group investigate conspiracy theories and supernatural phenomena.'
    },
    {
        id: 'tt5884266',
        type: 'series',
        name: 'Tigtone',
        poster: 'https://image.tmdb.org/t/p/w500/j7qQMXbgw8k3Wp3o0qcqkTFHhtE.jpg',
        background: 'https://image.tmdb.org/t/p/original/tLi8rYiPOeQEjJlYUcA0XW0C1EF.jpg',
        genre: ["Adult Animation","Action","Comedy"],
        releaseInfo: '2019',
        description: 'A warrior and his magical quest through an adult fantasy world.'
    },
    {
        id: 'tt8910922',
        type: 'series',
        name: 'Gemusetto Machu Picchu',
        poster: 'https://image.tmdb.org/t/p/w500/oesjPFqxcHLVi3LfGm8aOa7pqSJ.jpg',
        background: 'https://image.tmdb.org/t/p/original/eqM6RvlvH47cN2IYhX6oPFMjjUq.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2019',
        description: 'Sportsmanlike artist Makasu travels from Japan to Peru to meet the internationally renowned sushi chef Yoshihiro, but is denied an apprenticeship.'
    },
    {
        id: 'tt0405326',
        type: 'series',
        name: 'Perfect Hair Forever',
        poster: 'https://image.tmdb.org/t/p/w500/gqCBJqQ5OEh4v5RNjrXF8YX6q8Q.jpg',
        background: 'https://image.tmdb.org/t/p/original/2wQnxYZhPOPv0Q4HXILz1K9pQvQ.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2004',
        description: 'Perfect Hair Forever is a parody of anime, specifically Dragon Ball Z, about a young boy\'s quest to find perfect hair.'
    },
    {
        id: 'tt0461758',
        type: 'series',
        name: 'Minoriteam',
        poster: 'https://image.tmdb.org/t/p/w500/tYQV5y6xZz1QCdUVkQJM8jT6tSk.jpg',
        background: 'https://image.tmdb.org/t/p/original/8NdVQ7IzVLGvMqJxWp9wLNBY2yE.jpg',
        genre: ["Adult Animation","Action","Comedy"],
        releaseInfo: '2005',
        description: 'Minoriteam is a cartoon about a team of minority superheroes who fight against the forces of evil, specifically The White Shadow and his henchmen.'
    },
    {
        id: 'tt0461760',
        type: 'series',
        name: '12 oz. Mouse',
        poster: 'https://image.tmdb.org/t/p/w500/dJxp9KVFqv3v5x7yH8o0eC6LhZQ.jpg',
        background: 'https://image.tmdb.org/t/p/original/5GnG4Z7y9JQqWf9xFqhQzQvLqr2.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2005',
        description: '12 oz. Mouse follows the adventures of Mouse Fitzgerald, a beer-drinking mouse who gets caught up in various bizarre and surreal escapades.'
    },
    {
        id: 'tt0461814',
        type: 'series',
        name: 'Assy McGee',
        poster: 'https://image.tmdb.org/t/p/w500/6Eb3xNxXmyUMNT0gK7VxLFqy8Jg.jpg',
        background: 'https://image.tmdb.org/t/p/original/xlJ5AQJdMZxQ4YmJvZQH7N0ByIj.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2006',
        description: 'Assy McGee is a parody of 1970s cop shows featuring a detective who is literally just a pair of buttocks with legs.'
    },
    {
        id: 'tt0889617',
        type: 'series',
        name: 'Saul of the Mole Men',
        poster: 'https://image.tmdb.org/t/p/w500/9gFvMl1KQrJ6mV3Z5QMQ2kPfQlI.jpg',
        background: 'https://image.tmdb.org/t/p/original/gWgcNJKKf2Y5l3qV7HxM5LfYvfD.jpg',
        genre: ["Live","Comedy","Sci-Fi"],
        releaseInfo: '2007',
        description: 'Saul of the Mole Men is a live-action series about a soil scientist who discovers an underground civilization of mole people.'
    },
    {
        id: 'tt1307914',
        type: 'series',
        name: 'Titan Maximum',
        poster: 'https://image.tmdb.org/t/p/w500/2c8Q7PK0vjH7xIHK5YqF8wJOaZT.jpg',
        background: 'https://image.tmdb.org/t/p/original/pQmz9Nn5CqC1b7r5k3wXHcG0FZx.jpg',
        genre: ["Adult Animation","Comedy","Sci-Fi"],
        releaseInfo: '2009',
        description: 'From the creators of Robot Chicken, Titan Maximum is a stop-motion animated show about a team of space pilots who operate a giant robot.'
    },
    {
        id: 'tt1650051',
        type: 'series',
        name: 'Mary Shelley\'s Frankenhole',
        poster: 'https://image.tmdb.org/t/p/w500/9OHklwRwQ6Z0t3jW4Qx9pGX2YBl.jpg',
        background: 'https://image.tmdb.org/t/p/original/3X7QkqhFx3x5vD8yR1wVg0i9HBZ.jpg',
        genre: ["Adult Animation", "Comedy"],
        releaseInfo: '2010',
        description: 'Dr. Victor Frankenstein creates a door to another dimension where he solves the problems of famous historical and literary figures using his dark scientific powers.'
    },
    {
        id: 'tt0386312',
        type: 'series',
        name: 'Aqua TV Show Show',
        poster: 'https://image.tmdb.org/t/p/w500/kQMqGWsM2FxD1v0i3Vz6rXp1hG5.jpg',
        background: 'https://image.tmdb.org/t/p/original/h9W3F8r1q3pWX8cGj1cF9pKZYJL.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2011',
        description: 'The continuation of Aqua Teen Hunger Force under a new name, featuring the same characters in absurd adventures.'
    },
    {
        id: 'tt0493359',
        type: 'series',
        name: 'Korgoth of Barbaria',
        poster: 'https://image.tmdb.org/t/p/w500/aGBqKWzQz0YmkKG8M0pKqFrZQoL.jpg',
        background: 'https://image.tmdb.org/t/p/original/2D0pZCyY7aZ6fAqGKXp5x9KXQzK.jpg',
        genre: ["Adult Animation","Action","Comedy"],
        releaseInfo: '2006',
        description: 'In a dark future wasteland, the great cities have risen and fallen, primordial beasts have reclaimed the wilderness and thieves and savages populate sparse, dirty towns. Korgoth is a mighty barbarian warrior.'
    },
    {
        id: 'tt0270589',
        type: 'series',
        name: 'Mission Hill',
        poster: 'https://image.tmdb.org/t/p/w500/e0hKWxQOI9V6nB3r0vZ0kZjYdF8.jpg',
        background: 'https://image.tmdb.org/t/p/original/uY6KxmWQM7KQ3Q6hVGGg8qLQ7Vy.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '1999',
        description: 'The misadventures of a group of disparate roommates who live in a hip neighborhood in a major city.'
    },
    {
        id: 'tt0318260',
        type: 'series',
        name: 'Baby Blues',
        poster: 'https://image.tmdb.org/t/p/w500/7x1hOpzbNx5y2W0mXjTQ5z4nKWe.jpg',
        background: 'https://image.tmdb.org/t/p/original/dFh5o6vJ6r3pYmYH2KfW3qQqKnT.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2000',
        description: 'Baby Blues is about a married couple with young children trying to survive modern life.'
    },
    {
        id: 'tt0273262',
        type: 'series',
        name: 'The Ripping Friends',
        poster: 'https://image.tmdb.org/t/p/w500/qDx8F0YZM7W1z0TgF5vZ0dQ4nPY.jpg',
        background: 'https://image.tmdb.org/t/p/original/h8k8W4J6vQHqh4p5M6HWgkO5RGZ.jpg',
        genre: ["Adult Animation","Action","Comedy"],
        releaseInfo: '2001',
        description: 'From Ren & Stimpy creator John Kricfalusi, The Ripping Friends are a team of superheroes who fight for justice, truth, and \"really great abs.\"'
    },
    {
        id: 'tt0297753',
        type: 'series',
        name: 'Aqua Teen Hunger Force Zombie Ninja Pro-Am',
        poster: 'https://image.tmdb.org/t/p/w500/uZp7F9R0F6LQYYHdHhKJ4VqHhKL.jpg',
        background: 'https://image.tmdb.org/t/p/original/9QGLHhZ8vX5nQ4LKYvPpQZ0fQhP.jpg',
        genre: ["Adult Animation","Comedy"],
        releaseInfo: '2011',
        description: 'Another iteration of the Aqua Teen Hunger Force series.'
    },
    {
        id: 'tt3435548',
        type: 'series',
        name: 'Golan the Insatiable',
        poster: 'https://image.tmdb.org/t/p/w500/iF6T3u7k7fmGMXK8ztJXyFKKqxW.jpg',
        background: 'https://image.tmdb.org/t/p/original/ksqzaGI0hVmPV4z9ykpXWLQ8FNK.jpg',
        genre: ["Adult Animation","Comedy", "FX"],
        releaseInfo: '2013',
        description: 'Golan is a mighty godlord from an alternate dimension who was banished to Earth and now lives in the suburbs with a goth girl named Dylan.'
    },
    {
        id: 'tt7846056',
        type: 'series',
        name: 'Momma Named Me Sheriff',
        poster: 'https://image.tmdb.org/t/p/w500/lJO0c9QMHMfwGqPzBBzQYCVjVze.jpg',
        background: 'https://image.tmdb.org/t/p/original/gkF6MmQxBZ0Y6QdKJYkOmqYw6D5.jpg',
        genre: ["Adult Animation","Comedy", "FX"],
        releaseInfo: '2019',
        description: 'The new sheriff of a small town who can\'t quite live up to his mother\'s expectations. He\'s not the sharpest tool in the shed, but he has his heart set on cleaning up the streets.'
    }
];

// Helper function to filter and sort catalog
function filterAndSortCatalog(metas, extra) {
    let results = [...metas];
    
    // Filter by genre if specified
    if (extra && extra.genre) {
        results = results.filter(meta => {
            if (!meta.genre) return false;
            
            const filterGenre = extra.genre.toLowerCase();
            
            // Custom genre mapping logic
            switch (filterGenre) {
                case "Adult Animation":
                    // All animation content from Adult Swim catalog
                    return meta.genre.some(g => g.toLowerCase().includes('animation'));
                
                case 'anime':
                    // Japanese anime shows - typically have specific titles or styles
                    // Matches: Cowboy Bebop, Bleach, Inuyasha, etc.
                    const animeTitles = ['bleach', 'cowboy bebop', 'inuyasha', 'fullmetal', 'samurai champloo', 
                                        'trigun', 'flcl', 'yu yu hakusho', 's-cry-ed', 'afro samurai'];
                    const titleLower = meta.name.toLowerCase();
                    return animeTitles.some(anime => titleLower.includes(anime));
                
                case 'action':
                    return meta.genre.some(g => 
                        g.toLowerCase().includes('action') || 
                        g.toLowerCase().includes('adventure')
                    );
                
                case 'comedy':
                    return meta.genre.some(g => g.toLowerCase().includes('comedy'));
                
                case 'fx':
                    // FX/Special Effects heavy content - experimental, surreal, visually unique
                    const fxTitles = ['paprika', 'akira', 'redline', 'flcl', 'superjail', 'mr. pickles',
                                     'shivering truth', 'xavier', 'perfect hair forever'];
                    const nameLower = meta.name.toLowerCase();
                    return fxTitles.some(fx => nameLower.includes(fx)) ||
                           meta.genre.some(g => g.toLowerCase().includes('horror'));
                
                case 'sci-fi':
                    return meta.genre.some(g => {
                        const genreLower = g.toLowerCase();
                        return genreLower.includes('sci') || 
                               genreLower.includes('science') || 
                               genreLower.includes('fantasy');
                    });
                
                default:
                    // Fallback to partial matching
                    const normalizedMetaGenre = meta.genre.map(g => g.toLowerCase().replace(/[^a-z]/g, ''));
                    const normalizedFilterGenre = filterGenre.replace(/[^a-z]/g, '');
                    return normalizedMetaGenre.some(g => 
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
            case 'A-Z':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Z-A':
                results.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'Newest First':
                results.sort((a, b) => {
                    const yearA = parseInt(a.releaseInfo.match(/\d{4}/)?.[0] || '0');
                    const yearB = parseInt(b.releaseInfo.match(/\d{4}/)?.[0] || '0');
                    return yearB - yearA;
                });
                break;
            case 'Oldest First':
                results.sort((a, b) => {
                    const yearA = parseInt(a.releaseInfo.match(/\d{4}/)?.[0] || '0');
                    const yearB = parseInt(b.releaseInfo.match(/\d{4}/)?.[0] || '0');
                    return yearA - yearB;
                });
                break;
        }
    }
    
    return results;
}

// Catalog handler
builder.defineCatalogHandler(({ type, id, extra }) => {
    console.log(`Catalog request: type=${type}, id=${id}, extra=${JSON.stringify(extra)}`);
    
    if (type === 'movie' && id === 'adultswim-movies') {
        const filtered = filterAndSortCatalog(adultSwimMovies, extra);
        return Promise.resolve({ metas: filtered });
    }
    
    if (type === 'series' && id === 'adultswim-series') {
        const filtered = filterAndSortCatalog(adultSwimSeries, extra);
        return Promise.resolve({ metas: filtered });
    }
    
    // Return empty catalog if no match
    return Promise.resolve({ metas: [] });
});

module.exports = builder.getInterface();

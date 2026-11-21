// Canonical facts and verified project photography.
// Gathering covers, posters & galleries live in gatherings.json / MongoDB so admin uploads persist cleanly.

export const SITE = {
  name: 'Youth Spark Summit',
  city: 'Nairobi',
  email: 'youthsparksummit@gmail.com',
  whatsapp: 'https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K',
  whatsappDirect: 'https://wa.me/254711425593',
  instagram: 'https://www.instagram.com/youthsparksummitofficial/',
  instagramHandle: '@youthsparksummitofficial',
  facebook: 'https://www.facebook.com/search/top?q=youth%20spark%20summit',
  facebookHandle: 'Youth Spark Summit',
  youtube: 'https://www.youtube.com/channel/UCx0MZvWSyw9nE85eJF4Dmbg',
  noRegistrationLine: 'Browse dates, venues, and recaps across all six Nairobi programs.',
};

export const VISION_MISSION = {
  tagline: 'Empowering a Generation, Discipling Nations',
  subtitle: 'Igniting a movement of Kingdom-minded youth shaping Africa’s future.',
  vision: 'Discipling Nations through the Gospel of the Kingdom.',
  mission:
    'To disciple and equip young leaders through Kingdom-centered leadership training, practical skills development, and industry-focused mentorship — empowering them to transform industries, shape culture, influence societies, and advance nation-building with excellence.',
};

export const FOUR_PILLARS = [
  { name: 'Faith', line: 'Deep spiritual growth & clear identity.' },
  { name: 'Leadership', line: 'Bold, ethical, visionary leaders.' },
  { name: 'Influence', line: 'Youth shaping industries & nations.' },
  { name: 'Community', line: 'Spaces for growth & connection.' },
];

export const WHO_WE_SERVE = [
  'University students',
  'Recent graduates & professionals',
  'Student leaders & influencers',
  'Young entrepreneurs & creatives',
];

export const PARTNERSHIP_DECK = [
  {
    title: 'Partners',
    line: 'Faith groups, universities, corporates, and NGOs aligning with our work in Nairobi.',
  },
  {
    title: 'Why partner',
    line: 'Connect with ambitious young leaders, develop emerging talent, and build meaningful community presence.',
  },
  {
    title: 'We seek',
    line: 'Strategic allies, mentors, speakers, sponsors, and donors.',
  },
];

export const FOUNDERS = [
  {
    name: 'Kevin Kimani',
    role: 'Co-founder',
    image: '/gatherings/founders/kevin.webp',
    bio: 'Communications and marketing professional who builds youth leadership platforms.',
  },
  {
    name: 'Daphne Kimani',
    role: 'Co-founder',
    image: '/gatherings/founders/daphne.webp',
    bio: 'Leadership coach, corporate trainer, and youth empowerment advocate.',
  },
];

export const FOUNDERS_PHOTO = '/gatherings/founders/together.webp';
export const HERO_PHOTO = '/gatherings/summit-2026/01.webp';

// Existing project frames used on homepage tiles when a gathering's own cover is not yet uploaded.
export const BORROWED_COVERS = {
  'youth-spark-summit-2025-the-unveiling': '/gatherings/summit-2025/01.webp',
  'youth-spark-nexus-may-2025': '/gatherings/nexus/00.webp',
  'youth-spark-nexus-august-2025': '/gatherings/nexus/03.webp',
  'youth-spark-summit-2026-the-reset': '/gatherings/summit-2026/01.webp',
  'reconstructive-leadership-creative-economy-2026': '/gatherings/extras/hangout-2.webp',
  'let-her-ladies-conference-2026': '/gatherings/let-her-2026/01.webp',
  'becoming-limitless-mens-meeting-2026': '/gatherings/becoming-limitless-2026/01.webp',
  'nxt-africa-forum-2026': '/gatherings/nxt-2026/01.webp',
};

export const WATCH_REELS = [
  {
    slug: 'youth-spark-summit-2026-the-reset',
    theme: 'The Reset',
    title: 'Youth Spark Summit 2026',
    meta: '14 March 2026 · CITAM Valley Road',
    image: '/gatherings/summit-2026/03.webp',
    url: 'https://www.youtube.com/watch?v=1zU-8DwNkAY',
  },
  {
    slug: 'youth-spark-summit-2025-the-unveiling',
    theme: 'The Unveiling',
    title: 'Youth Spark Summit 2025',
    meta: '15 March 2025 · Nairobi Cinema',
    image: '/gatherings/summit-2025/05.webp',
    url: 'https://www.youtube.com/watch?v=gDaZRRZNANk',
  },
  {
    slug: 'youth-spark-nexus-may-2025',
    theme: 'May Nexus',
    title: 'Youth Spark Nexus — May 2025',
    meta: 'May 2025 · After40 Hotel',
    image: '/gatherings/nexus/03.webp',
    url: 'https://www.youtube.com/watch?v=HoeH5TSccPs',
  },
];

export const EQUIP_AREAS = [
  {
    key: 'business',
    name: 'Business',
    line: 'Building ethical enterprises, practical financial stewardship, and ventures that serve real needs.',
  },
  {
    key: 'government',
    name: 'Government',
    line: 'Preparing principled young leaders for civic responsibility, policy, and public service.',
  },
  {
    key: 'media-tech',
    name: 'Media & Tech',
    line: 'Using software, AI, and digital storytelling with honesty and skill.',
  },
  {
    key: 'arts',
    name: 'Arts',
    line: 'Developing photographers, designers, filmmakers, and hosts who sustain their craft.',
  },
  {
    key: 'education',
    name: 'Education',
    line: 'Connecting university students and campus leaders with mentors and practical training.',
  },
  {
    key: 'family',
    name: 'Family',
    line: 'Strengthening character, accountability, and healthy relationships across generations.',
  },
  {
    key: 'church',
    name: 'Church',
    line: 'Rooting leadership and daily work in Scripture, prayer, and Christian community.',
  },
];

const pad = (n) => String(n).padStart(2, '0');

export const SUMMIT_PHOTOS = [
  ...Array.from({ length: 10 }, (_, i) => `/gatherings/summit-2026/${pad(i + 1)}.webp`),
  ...Array.from({ length: 9 }, (_, i) => `/gatherings/summit-2025/${pad(i + 1)}.webp`),
  '/gatherings/extras/pillar-1.webp',
  '/gatherings/extras/pillar-2.webp',
  '/gatherings/extras/impact-2.webp',
];

export const NEXUS_PHOTOS = [
  ...Array.from({ length: 9 }, (_, i) => `/gatherings/nexus/${pad(i)}.webp`),
  '/Nexus 4.webp',
  '/Nexus 5.webp',
];

export const NXT_PHOTOS = [
  ...Array.from({ length: 12 }, (_, i) => `/gatherings/nxt-2026/${pad(i + 1)}.webp`),
  '/NXT 1.webp',
  '/NXT 2.webp',
  '/NXT 3.webp',
  '/NXT4.webp',
  '/NXT 5.webp',
  '/NXT 6.webp',
  '/NXT 7.webp',
  '/NXT 8.webp',
];

export const RECONSTRUCTIVE_PHOTOS = [
  '/gatherings/extras/hangout-1.webp',
  '/gatherings/extras/hangout-2.webp',
  '/gatherings/extras/hangout-3.webp',
];

export const LET_HER_PHOTOS = Array.from({ length: 10 }, (_, i) => `/gatherings/let-her-2026/${pad(i + 1)}.webp`);

export const BECOMING_LIMITLESS_PHOTOS = Array.from({ length: 9 }, (_, i) => `/gatherings/becoming-limitless-2026/${pad(i + 1)}.webp`);

export const PROGRAMS = [
  {
    slug: 'youth-spark-summit',
    name: 'Youth Spark Summit',
    cadence: 'Annual',
    cover: '/gatherings/summit-2026/01.webp',
    blurb: 'Annual one-day flagship in Nairobi focused on Kingdom leadership, career workshops, wealth creation purpose, and innovation.',
    facts: [
      '2025 theme: The Unveiling — Nairobi Cinema (15 March 2025).',
      '2026 theme: The Reset: His Purpose Will Stand — CITAM Valley Road — Dennis White Hall (14 March 2026).',
      'Combines worship, word, marketplace panels, workshops, networking, and exhibitions.',
    ],
    photos: {
      caption: 'Youth Spark Summit 2026 (Dennis White Hall) and 2025 (Nairobi Cinema)',
      images: SUMMIT_PHOTOS,
      alt: 'Youth Spark Summit gathering',
    },
  },
  {
    slug: 'youth-spark-nexus',
    name: 'Youth Spark Nexus',
    cadence: 'Monthly',
    cover: '/gatherings/nexus/03.webp',
    blurb:
      'Monthly discipleship and leadership gathering in Nairobi CBD—bringing young professionals and students together for the Word, worship, and honest peer discussion.',
    facts: [
      'Hosted in Nairobi CBD, including After40 Hotel on Biashara Street.',
      'Combines practical teaching, worship, prayer, and interactive group dialogue.',
    ],
    photos: {
      caption: 'From Youth Spark Nexus gatherings',
      images: NEXUS_PHOTOS,
      alt: 'A Youth Spark Nexus gathering',
    },
  },
  {
    slug: 'nxt-africa-forum',
    name: 'NXT Africa Forum',
    cadence: 'Forum',
    cover: '/gatherings/nxt-2026/01.webp',
    blurb:
      'An intimate, interactive, and application-driven forum convening voices from business, technology, finance, leadership, and the creative economy.',
    facts: [
      'Combines keynotes, masterclasses, and fireside dialogues focused on execution, collaboration, and scalable ventures.',
      '2026 edition held on 14 November 2026 at After40 Hotel, Biashara Street, Nairobi CBD.',
    ],
    photos: {
      caption: 'From NXT Africa Forum 2026 and earlier editions',
      images: NXT_PHOTOS,
      alt: 'NXT Africa Forum gathering',
    },
  },
  {
    slug: 'reconstructive-leadership',
    name: 'Reconstructive Leadership',
    cadence: 'Cohort',
    cover: '/gatherings/extras/hangout-2.webp',
    blurb: 'A structured, practical leadership cohort equipping creatives and emerging builders to position and sustain their craft.',
    facts: [
      'Creative Economy Chapter: an 8-week hybrid cohort launched on 15 May 2026.',
      'Designed for photographers, videographers, designers, artists, hosts, content creators, and creative entrepreneurs.',
    ],
    photos: {
      caption: 'Cohort community sessions',
      images: RECONSTRUCTIVE_PHOTOS,
      alt: 'Reconstructive Leadership cohort gathering',
    },
  },
  {
    slug: 'let-her',
    name: 'Let Her Conference',
    cadence: 'Conference',
    cover: '/gatherings/let-her-2026/01.webp',
    blurb: 'A ladies conference in Nairobi gathering women for purpose, leadership, community, and bold conversation.',
    facts: [
      '2026 edition held on 18 July 2026 at Swiss Lenana Mount Hotel, Ralph Bunche Rd, Nairobi.',
      'Dress code theme: Bold & Bright.',
    ],
    photos: {
      caption: 'Let Her Ladies Conference at Swiss Lenana Mount Hotel (18 July 2026)',
      images: LET_HER_PHOTOS,
      alt: 'Let Her Ladies Conference gathering',
    },
  },
  {
    slug: 'becoming-limitless',
    name: 'Becoming Limitless',
    cadence: "Men's Meeting",
    cover: '/gatherings/becoming-limitless-2026/01.webp',
    blurb: 'A candid men’s gathering in Nairobi focused on clarity, brotherhood, accountability, and building a lasting legacy.',
    facts: [
      '2026 edition held on 22 August 2026 at After40 Hotel, Biashara Street, Nairobi CBD.',
      'Hosted by Kevin Kimani with guest speaker Dr. Wale Akinyemi.',
    ],
    photos: {
      caption: 'Becoming Limitless — Men’s Meeting at After40 Hotel (22 August 2026)',
      images: BECOMING_LIMITLESS_PHOTOS,
      alt: 'Becoming Limitless men’s meeting',
    },
  },
];

export const programBySlug = (slug) => PROGRAMS.find((p) => p.slug === slug);
export const programName = (slug) => programBySlug(slug)?.name ?? '';

export const VENUES_USED = [
  'Nairobi Cinema, Aga Khan Walk, Nairobi CBD',
  'After40 Hotel, Biashara Street, Nairobi CBD',
  'CITAM Valley Road — Dennis White Hall, Nairobi',
  'Swiss Lenana Mount Hotel, Ralph Bunche Rd, Nairobi',
];

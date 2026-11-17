// Canonical facts and existing project images.
// Gathering covers & galleries remain in gatherings.json / MongoDB so founder uploads never get overwritten.

export const SITE = {
  name: 'Youth Spark Summit',
  city: 'Nairobi',
  email: 'youthsparksummit@gmail.com',
  phone: '+254 711 425 593',
  phoneHref: 'tel:+254711425593',
  whatsapp: 'https://chat.whatsapp.com/IVLWWZyO2GT6ONfjCgOw7K',
  instagram: 'https://www.instagram.com/youthsparksummitofficial/',
  instagramHandle: '@youthsparksummitofficial',
  youtube: 'https://www.youtube.com/channel/UCx0MZvWSyw9nE85eJF4Dmbg',
  noRegistrationLine: 'This site lists our gatherings. It does not take registrations.',
};

export const FOUNDERS = [
  {
    name: 'Kevin Kimani',
    role: 'Co-founder',
    bio: 'Communications and marketing professional who builds youth leadership platforms.',
  },
  {
    name: 'Daphne Kimani',
    role: 'Co-founder',
    bio: 'Leadership coach, corporate trainer, and youth empowerment advocate.',
  },
];

export const FOUNDERS_PHOTO = '/gatherings/founders.webp';
export const HERO_PHOTO = '/gatherings/summit-2025/01.webp';

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
  ...Array.from({ length: 9 }, (_, i) => `/gatherings/summit-2025/${pad(i + 1)}.webp`),
  '/pillar.jpg',
  '/pillar 2.jpg',
  '/Impact (2).jpg',
];

export const NEXUS_PHOTOS = [
  ...Array.from({ length: 9 }, (_, i) => `/gatherings/nexus/${pad(i)}.webp`),
  '/Nexus 4.webp',
  '/Nexus 5.webp',
];

export const NXT_PHOTOS = [
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
  '/Hangout1.jpg',
  '/Hangout 2.jpg',
  '/Hangout 3.jpg',
];

export const PROGRAMS = [
  {
    slug: 'youth-spark-summit',
    name: 'Youth Spark Summit',
    cadence: 'Annual',
    cover: '/gatherings/summit-2025/01.webp',
    blurb: 'Annual one-day flagship in Nairobi.',
    facts: [
      '2025 theme: The Unveiling — Nairobi Cinema.',
      '2026 theme: The Reset: His Purpose Will Stand — CITAM Valley Road — Dennis White Hall, 14 March 2026.',
    ],
    photos: {
      caption: 'Youth Spark Summit 2025, Nairobi Cinema',
      images: SUMMIT_PHOTOS,
      alt: 'Youth Spark Summit 2025 at Nairobi Cinema',
    },
  },
  {
    slug: 'youth-spark-nexus',
    name: 'Youth Spark Nexus',
    cadence: 'Monthly',
    cover: '/gatherings/nexus/03.webp',
    blurb:
      'Monthly discipleship and leadership gathering in Nairobi CBD, repeatedly hosted at After40 Hotel on Biashara Street. Word, worship, and group discussion. Not a conference.',
    facts: [],
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
    cover: '/NXT 1.webp',
    blurb:
      'A smaller forum for practical conversations across business, technology, finance, leadership, and the creative economy.',
    facts: ['2026 edition: 14 November 2026 at After40 Hotel.'],
    photos: {
      caption: 'From NXT Africa Forum',
      images: NXT_PHOTOS,
      alt: 'NXT Africa Forum gathering',
    },
  },
  {
    slug: 'reconstructive-leadership',
    name: 'Reconstructive Leadership',
    cadence: 'Cohort',
    cover: '/Hangout 2.jpg',
    blurb: 'A structured, practical leadership cohort.',
    facts: [
      'The public chapter is the Creative Economy chapter, a cohort that started on 15 May 2026.',
      'It was publicly described as an 8-week hybrid experience for creatives.',
    ],
    photos: {
      caption: 'Cohort community sessions',
      images: RECONSTRUCTIVE_PHOTOS,
      alt: 'Reconstructive Leadership cohort gathering',
    },
  },
];

export const programBySlug = (slug) => PROGRAMS.find((p) => p.slug === slug);
export const programName = (slug) => programBySlug(slug)?.name ?? '';

export const VENUES_USED = [
  'Nairobi Cinema, Aga Khan Walk, Nairobi CBD',
  'After40 Hotel, Biashara Street, Nairobi CBD',
  'CITAM Valley Road — Dennis White Hall, Nairobi',
];

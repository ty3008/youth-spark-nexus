// Facts that appear in more than one place on the site.
// Only things we have been given. If it is not here, it is not on the site.

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

// Photos whose gathering we can identify from the photo itself.
const pad = (n) => String(n).padStart(2, '0');
export const SUMMIT_2025_PHOTOS = Array.from({ length: 9 }, (_, i) => `/gatherings/summit-2025/${pad(i + 1)}.webp`);
// Nexus photos: the edition of each one is not recorded, so they are shown at program level only.
export const NEXUS_PHOTOS = Array.from({ length: 9 }, (_, i) => `/gatherings/nexus/${pad(i)}.webp`);

export const PROGRAMS = [
  {
    slug: 'youth-spark-summit',
    name: 'Youth Spark Summit',
    cadence: 'Annual',
    blurb: 'Annual one-day flagship in Nairobi.',
    facts: [
      '2025 theme: The Unveiling — Nairobi Cinema.',
      '2026 theme: The Reset: His Purpose Will Stand — CITAM Valley Road — Dennis White Hall, 14 March 2026.',
    ],
    photos: { caption: 'Youth Spark Summit 2025, Nairobi Cinema', images: SUMMIT_2025_PHOTOS, alt: 'Youth Spark Summit 2025 at Nairobi Cinema' },
  },
  {
    slug: 'youth-spark-nexus',
    name: 'Youth Spark Nexus',
    cadence: 'Monthly',
    blurb:
      'Monthly discipleship and leadership gathering in Nairobi CBD, repeatedly hosted at After40 Hotel on Biashara Street. Word, worship, and group discussion. Not a conference.',
    facts: [],
    photos: { caption: 'From Youth Spark Nexus gatherings', images: NEXUS_PHOTOS, alt: 'A Youth Spark Nexus gathering' },
  },
  {
    slug: 'nxt-africa-forum',
    name: 'NXT Africa Forum',
    cadence: 'Forum',
    blurb:
      'A smaller forum for practical conversations across business, technology, finance, leadership, and the creative economy.',
    facts: ['2026 edition: 14 November 2026 at After40 Hotel.'],
    photos: null,
  },
  {
    slug: 'reconstructive-leadership',
    name: 'Reconstructive Leadership',
    cadence: 'Cohort',
    blurb: 'A structured, practical leadership cohort.',
    facts: [
      'The public chapter is the Creative Economy chapter, a cohort that started on 15 May 2026.',
      'It was publicly described as an 8-week hybrid experience for creatives.',
    ],
    photos: null,
  },
];

export const programBySlug = (slug) => PROGRAMS.find((p) => p.slug === slug);
export const programName = (slug) => programBySlug(slug)?.name ?? '';

export const VENUES_USED = [
  'Nairobi Cinema, Aga Khan Walk, Nairobi CBD',
  'After40 Hotel, Biashara Street, Nairobi CBD',
  'CITAM Valley Road — Dennis White Hall, Nairobi',
];

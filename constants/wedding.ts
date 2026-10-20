/**
 * Wedding Invitation Configuration & Content
 * All hardcoded values, text strings, dates, and couple details are maintained here.
 */

/** Wedding date & time configuration */
export const WEDDING_DATE = '2026-12-04'
export const GATHERING_DATE = '2026-12-05'
export const NEXT_DAY_DATE_STR = GATHERING_DATE
export const WEDDING_TIMEZONE = '+05:30'

/** Schedule Milestones */
export const SCHEDULE_TIMES = {
  ceremony: '10:30',      // 10:30 AM - Ceremony begins
  ceremonyEnd: '11:30',   // 11:30 AM - Ceremony concludes, reception celebration starts
  receptionEnd: '14:30',  // 02:30 PM - Afternoon reception concludes
  gathering: '18:30',     // 06:30 PM - Reception Gathering (next day, Saturday 5 Dec)
} as const

export const WEDDING_DAY_START = `${WEDDING_DATE}T00:00:00${WEDDING_TIMEZONE}`
export const WEDDING_DAY_END = `${GATHERING_DATE}T00:00:00${WEDDING_TIMEZONE}`

export const CEREMONY_DATETIME = `${WEDDING_DATE}T${SCHEDULE_TIMES.ceremony}:00${WEDDING_TIMEZONE}`
export const CEREMONY_END_DATETIME = `${WEDDING_DATE}T${SCHEDULE_TIMES.ceremonyEnd}:00${WEDDING_TIMEZONE}`
export const RECEPTION_END_DATETIME = `${WEDDING_DATE}T${SCHEDULE_TIMES.receptionEnd}:00${WEDDING_TIMEZONE}`
export const GATHERING_DATETIME = `${GATHERING_DATE}T${SCHEDULE_TIMES.gathering}:00${WEDDING_TIMEZONE}`

/** Backward-compatible alias */
export const WEDDING_DATETIME = CEREMONY_DATETIME

/** Human-readable date strings */
export const HERO_DISPLAY_DATE = {
  dayShort: 'FRI',
  dateNum: '04',
  month: 'DECEMBER',
  yearShort: '26',
} as const

export const DISPLAY_DATE_FULL = '04 December 2026'
export const DISPLAY_DAY_AND_DATE = 'Friday, 04 December 2026'
export const DISPLAY_NEXT_DAY_AND_DATE = 'Saturday, 05 December 2026'

/** Couple information */
export const COUPLE = {
  groom: {
    firstName: 'Jaffrin',
    fullName: 'S. Jaffrin Sampaul',
    role: 'The groom',
    detail: 'Son of Mr. J. Selvan Paul and Mrs. G. Johsi Rani',
    note: 'A steady soul, a joyful laugh, and a promise kept for a lifetime.',
    initials: 'JS',
  },
  bride: {
    firstName: 'Shifforah',
    fullName: 'P. Shifforah Rajam',
    role: 'The bride',
    detail: 'Daughter of Mr. A. Pondurai and Dr. J. Sumitha',
    note: 'A gentle heart, a bright spirit, and a beautiful new beginning.',
    initials: 'SR',
  },
} as const

export type PersonKey = keyof typeof COUPLE

/**
 * Stage configuration for real-time timeline on the wedding date:
 * - before_day: Prior to wedding day (4 Dec 2026)
 * - before_ceremony: On wedding day, morning until 10:30 AM (shows timer to 10:30 AM)
 * - ceremony_ongoing: 10:30 AM – 11:30 AM (holy ceremony in progress)
 * - reception_time: 11:30 AM – 2:30 PM ("marriage is over, catch them in wedding reception at Moon Mahal")
 * - gathering_countdown: 2:30 PM onwards until gathering (starts timer for reception gathering on 5 Dec 6:30 PM)
 * - after_all: Post reception gathering ("Happily Ever After")
 */
export type ScheduleStage =
  | 'before_day'
  | 'before_ceremony'
  | 'ceremony_ongoing'
  | 'reception_time'
  | 'gathering_countdown'
  | 'after_all'

export interface StageContent {
  stageKey: ScheduleStage
  banner: {
    kicker: string
    title: string
    message: string
  }
  hero: {
    badge?: string
    title: string
    sub?: string
    ctaText?: string
    ctaHref?: string
    showCountdown: boolean
    targetDatetime?: string
  }
}

export const STAGE_CONFIG: Record<ScheduleStage, StageContent> = {
  before_day: {
    stageKey: 'before_day',
    banner: {
      kicker: `✦ ${DISPLAY_DATE_FULL} ✦`,
      title: 'Counting Down',
      message: "The celebration of Jaffrin & Shifforah's love begins soon.",
    },
    hero: {
      badge: '⛪ Friday, 04 December 2026',
      title: 'Counting down to our wedding day',
      sub: 'Holy Trinity Cathedral · Palayamkottai',
      showCountdown: true,
      targetDatetime: CEREMONY_DATETIME,
    },
  },
  before_ceremony: {
    stageKey: 'before_ceremony',
    banner: {
      kicker: `✦ TODAY IS THE DAY · ${SCHEDULE_TIMES.ceremony} AM ✦`,
      title: 'Today is the Day!',
      message:
        "The celebration of Jaffrin & Shifforah's love begins now.\nHoly Matrimony at Holy Trinity Cathedral at 10:30 in the morning.",
    },
    hero: {
      badge: '⛪ Ceremony at 10:30 AM',
      title: 'Wedding Ceremony begins in',
      sub: 'Holy Trinity Cathedral · Palayamkottai',
      ctaText: 'View Cathedral Directions',
      ctaHref: 'https://maps.app.goo.gl/iRxFvW8CazVdvKoR6',
      showCountdown: true,
      targetDatetime: CEREMONY_DATETIME,
    },
  },
  ceremony_ongoing: {
    stageKey: 'ceremony_ongoing',
    banner: {
      kicker: '✦ HAPPENING NOW · HOLY TRINITY CATHEDRAL ✦',
      title: 'Holy Matrimony in Progress',
      message:
        'Jaffrin & Shifforah are exchanging their sacred vows right now.\nMay God bless this beautiful union with grace and joy.',
    },
    hero: {
      badge: '💍 Now in Progress',
      title: 'Holy Matrimony is Taking Place',
      sub: 'Holy Trinity Cathedral · Palayamkottai',
      ctaText: 'Directions to Cathedral',
      ctaHref: 'https://maps.app.goo.gl/iRxFvW8CazVdvKoR6',
      showCountdown: false,
    },
  },
  reception_time: {
    stageKey: 'reception_time',
    banner: {
      kicker: '✦ CEREMONY CONCLUDED · JOIN THE CELEBRATION ✦',
      title: 'Marriage is Over! Catch Them at the Reception 🎉',
      message:
        'The holy matrimony ceremony is over!\nCatch Jaffrin & Shifforah at the Wedding Reception at Moon Mahal to celebrate.',
    },
    hero: {
      badge: '🥂 Reception Underway',
      title: 'Marriage is over! Catch them in the wedding reception',
      sub: 'Moon Mahal · Pothigai Nagar, Perumalpuram',
      ctaText: 'Directions to Moon Mahal',
      ctaHref: 'https://maps.app.goo.gl/woapsnZSxm61oYsd8',
      showCountdown: false,
    },
  },
  gathering_countdown: {
    stageKey: 'gathering_countdown',
    banner: {
      kicker: '✦ NEXT CELEBRATION · RECEPTION GATHERING ✦',
      title: 'The Celebration Continues!',
      message:
        'The ceremony and afternoon reception have concluded.\nJoin us for the grand Reception Gathering at JD Grand Hall Nazareth on Saturday, 05 December!',
    },
    hero: {
      badge: '✨ Next Celebration: Saturday, 6:30 PM',
      title: 'Reception Gathering starts in',
      sub: 'JD Grand Hall Nazareth · Saturday, 05 December',
      ctaText: 'Directions to JD Grand Hall',
      ctaHref: 'https://maps.app.goo.gl/3jPmWYQJ4yqT9J1SA',
      showCountdown: true,
      targetDatetime: GATHERING_DATETIME,
    },
  },
  after_all: {
    stageKey: 'after_all',
    banner: {
      kicker: '✦ FOREVER & ALWAYS ✦',
      title: 'Thank You for Celebrating With Us!',
      message:
        'May God bless each of you for your love, prayers, and blessings upon Jaffrin & Shifforah as husband and wife.',
    },
    hero: {
      badge: '♥ Celebrations Concluded',
      title: 'Happily Ever After ♥',
      sub: 'With joyful memories and grateful hearts.',
      showCountdown: false,
    },
  },
}

/**
 * Optional override for testing/demo purposes.
 * Set to null for automatic live-clock operation.
 */
export const STAGE_PREVIEW_OVERRIDE: ScheduleStage | null = null

/** Hero section content */
export const HERO_CONTENT = {
  eyebrow: 'A Christian wedding invitation',
  script: 'With joyful hearts and grateful prayers',
  intro:
    'invite you to witness the beginning of their forever, surrounded by faith, family, and the people they love.',
  scrollCta: 'Discover the invitation',
} as const

/** Story section content */
export const STORY_CONTENT = {
  kicker: 'By grace, together',
  titleMain: 'Two hearts.',
  titleEm: 'One beautiful promise.',
  description:
    'We would be honored by your prayers and presence as we step into this new chapter of our lives.',
  tapPrompt: 'Tap to discover their story',
  artworkKicker: 'The invitation',
  artworkAlt: 'Lavender floral wedding invitation with church and wedding details',
} as const

/** Invitation artwork hosted on Vercel Blob */
export const INVITATION_ARTWORK_URL =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5VQ38nu3yH9SvxvxXGC4tPaUHawqcq.png'

/** Event data */
export interface EventData {
  eyebrow: string
  title: string
  date: string
  time: string
  venue: string
  place: string
  href: string
  iconName: 'church' | 'sparkles' | 'heart'
}

export const EVENTS_SECTION_CONTENT = {
  kicker: 'Save the dates',
  titleMain: 'Join us for',
  titleEm: 'the celebration.',
  description:
    'Three moments, one joyful weekend. Find each gathering below and open the map for directions.',
  mapCta: 'Open map',
} as const

export const EVENTS: EventData[] = [
  {
    eyebrow: 'The sacred beginning',
    title: 'Wedding Ceremony',
    date: DISPLAY_DAY_AND_DATE,
    time: '10:30 in the morning',
    venue: 'Holy Trinity Cathedral',
    place: 'Palayamkottai',
    href: 'https://maps.app.goo.gl/iRxFvW8CazVdvKoR6',
    iconName: 'church',
  },
  {
    eyebrow: 'An evening of celebration',
    title: 'Wedding Reception',
    date: DISPLAY_DAY_AND_DATE,
    time: 'After the ceremony',
    venue: 'Moon Mahal',
    place: 'Pothigai Nagar, Perumalpuram',
    href: 'https://maps.app.goo.gl/woapsnZSxm61oYsd8',
    iconName: 'sparkles',
  },
  {
    eyebrow: 'The celebration continues',
    title: 'Reception Gathering',
    date: DISPLAY_NEXT_DAY_AND_DATE,
    time: '6:30 in the evening',
    venue: 'JD Grand Hall Nazareth',
    place: 'Nazareth',
    href: 'https://maps.app.goo.gl/3jPmWYQJ4yqT9J1SA',
    iconName: 'heart',
  },
]

/** Calendar section content */
export const CALENDAR_CONTENT = {
  kicker: 'Save the date',
  titleMain: 'Add to Your',
  titleEm: 'Calendar.',
  description:
    'Save all wedding events to your calendar with a single tap — complete with ceremony, reception, venue locations, and timings.',
  appleButtonText: 'Add to Apple Calendar',
  googleButtonText: 'Add to Google Calendar',
  smartButtonText: 'Add to Calendar',
  allEventsNote: 'Includes all 3 events · Ceremony, Reception & Gathering',
} as const

/** Footer content */
export const FOOTER_CONTENT = {
  blessing: 'With love and blessings',
} as const

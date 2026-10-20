import {
  CEREMONY_DATETIME,
  CEREMONY_END_DATETIME,
  RECEPTION_END_DATETIME,
  GATHERING_DATETIME,
} from '@/constants/wedding'

/**
 * Detects whether the current device is an Apple device (Mac, iPhone, iPad, iPod)
 * which supports native .ics calendar import with one tap.
 */
export function isAppleDevice(): boolean {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent.toLowerCase()
  const isMac = /macintosh|mac os x/.test(ua)
  const isIos = /iphone|ipad|ipod/.test(ua)
  const isIpadOs = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  return isMac || isIos || isIpadOs
}

/** Formats a Date object to RFC 5545 UTC timestamp format: YYYYMMDDTHHMMSSZ */
function toIcsUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

/**
 * Generates an RFC 5545 compliant iCalendar string containing ALL 3 wedding events:
 * 1. Wedding Ceremony (Friday, 04 December 2026 at Holy Trinity Cathedral)
 * 2. Wedding Reception (Friday, 04 December 2026 at Moon Mahal)
 * 3. Reception Gathering (Saturday, 05 December 2026 at JD Grand Hall Nazareth)
 */
export function generateWeddingIcs(): string {
  const nowUtc = toIcsUtc(new Date())

  const ceremonyStart = toIcsUtc(new Date(CEREMONY_DATETIME))
  const ceremonyEnd = toIcsUtc(new Date(CEREMONY_END_DATETIME))

  // Afternoon reception starts when ceremony concludes (11:30 AM - 2:30 PM)
  const receptionStart = toIcsUtc(new Date(CEREMONY_END_DATETIME))
  const receptionEnd = toIcsUtc(new Date(RECEPTION_END_DATETIME))

  // Evening gathering on Saturday, 5 December (6:30 PM - 9:30 PM)
  const gatheringStart = toIcsUtc(new Date(GATHERING_DATETIME))
  const gatheringEndObj = new Date(GATHERING_DATETIME)
  gatheringEndObj.setHours(gatheringEndObj.getHours() + 3)
  const gatheringEnd = toIcsUtc(gatheringEndObj)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jaffrin and Shifforah//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Jaffrin & Shifforah Wedding Celebrations',
    'X-WR-TIMEZONE:Asia/Kolkata',

    // Event 1: Wedding Ceremony
    'BEGIN:VEVENT',
    'UID:wedding-ceremony-20261204@jaffrin-shifforah.wedding',
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${ceremonyStart}`,
    `DTEND:${ceremonyEnd}`,
    'SUMMARY:Wedding Ceremony — Jaffrin & Shifforah',
    'DESCRIPTION:Holy Matrimony of S. Jaffrin Sampaul & P. Shifforah Rajam.\\nVenue: Holy Trinity Cathedral, Palayamkottai.\\nDirections: https://maps.app.goo.gl/iRxFvW8CazVdvKoR6',
    'LOCATION:Holy Trinity Cathedral, Palayamkottai',
    'URL:https://maps.app.goo.gl/iRxFvW8CazVdvKoR6',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Wedding Ceremony starts in 2 hours at Holy Trinity Cathedral',
    'END:VALARM',
    'END:VEVENT',

    // Event 2: Wedding Reception
    'BEGIN:VEVENT',
    'UID:wedding-reception-20261204@jaffrin-shifforah.wedding',
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${receptionStart}`,
    `DTEND:${receptionEnd}`,
    'SUMMARY:Wedding Reception — Jaffrin & Shifforah',
    'DESCRIPTION:Wedding Reception celebrating the newlyweds Jaffrin & Shifforah.\\nVenue: Moon Mahal, Pothigai Nagar, Perumalpuram.\\nDirections: https://maps.app.goo.gl/woapsnZSxm61oYsd8',
    'LOCATION:Moon Mahal, Pothigai Nagar, Perumalpuram',
    'URL:https://maps.app.goo.gl/woapsnZSxm61oYsd8',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Wedding Reception starts in 1 hour at Moon Mahal',
    'END:VALARM',
    'END:VEVENT',

    // Event 3: Reception Gathering
    'BEGIN:VEVENT',
    'UID:wedding-gathering-20261205@jaffrin-shifforah.wedding',
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${gatheringStart}`,
    `DTEND:${gatheringEnd}`,
    'SUMMARY:Reception Gathering — Jaffrin & Shifforah',
    'DESCRIPTION:Continued celebration and evening reception gathering for Jaffrin & Shifforah.\\nVenue: JD Grand Hall Nazareth.\\nDirections: https://maps.app.goo.gl/3jPmWYQJ4yqT9J1SA',
    'LOCATION:JD Grand Hall Nazareth, Nazareth',
    'URL:https://maps.app.goo.gl/3jPmWYQJ4yqT9J1SA',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reception Gathering starts in 2 hours at JD Grand Hall Nazareth',
    'END:VALARM',
    'END:VEVENT',

    'END:VCALENDAR',
  ]

  return lines.join('\r\n')
}

/**
 * Endpoint URL for the multi-event .ics file.
 * iOS Safari natively recognizes this HTTP endpoint and launches the native Apple Calendar
 * sheet ("Add All (3 Events)").
 */
export const APPLE_CALENDAR_ICS_URL = '/api/calendar'

/**
 * Directly opens or downloads the Apple Calendar (.ics) file via the server route.
 */
export function openAppleCalendar(): void {
  window.location.href = APPLE_CALENDAR_ICS_URL
}

/**
 * Generates a Google Calendar web template URL covering the entire wedding celebrations.
 */
export function getGoogleCalendarUrl(): string {
  const ceremonyStart = toIcsUtc(new Date(CEREMONY_DATETIME))
  const receptionEnd = toIcsUtc(new Date(RECEPTION_END_DATETIME))

  const title = 'Wedding Celebrations: Jaffrin & Shifforah'
  const details = [
    'With joyful hearts, you are invited to celebrate the holy matrimony of Jaffrin & Shifforah!',
    '',
    'SCHEDULE OF CELEBRATIONS:',
    '1. Wedding Ceremony (Friday, 04 December · 10:30 AM)',
    '   Holy Trinity Cathedral, Palayamkottai',
    '   Directions: https://maps.app.goo.gl/iRxFvW8CazVdvKoR6',
    '',
    '2. Wedding Reception (Friday, 04 December · After Ceremony)',
    '   Moon Mahal, Pothigai Nagar, Perumalpuram',
    '   Directions: https://maps.app.goo.gl/woapsnZSxm61oYsd8',
    '',
    '3. Reception Gathering (Saturday, 05 December · 6:30 PM)',
    '   JD Grand Hall Nazareth, Nazareth',
    '   Directions: https://maps.app.goo.gl/3jPmWYQJ4yqT9J1SA',
    '',
    'With love, prayers, and blessings!',
  ].join('\n')

  const location = 'Holy Trinity Cathedral, Palayamkottai & Moon Mahal'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${ceremonyStart}/${receptionEnd}`,
    details: details,
    location: location,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

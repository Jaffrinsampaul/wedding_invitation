'use client'

import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Calendar,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Church,
  Clock3,
  Download,
  Heart,
  MapPin,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import {
  INVITATION_ARTWORK_URL,
  EVENTS,
  COUPLE,
  HERO_CONTENT,
  STORY_CONTENT,
  EVENTS_SECTION_CONTENT,
  CALENDAR_CONTENT,
  FOOTER_CONTENT,
  HERO_DISPLAY_DATE,
  DISPLAY_DATE_FULL,
  WEDDING_DAY_START,
  CEREMONY_DATETIME,
  CEREMONY_END_DATETIME,
  RECEPTION_END_DATETIME,
  GATHERING_DATETIME,
  STAGE_CONFIG,
  STAGE_PREVIEW_OVERRIDE,
  type PersonKey,
  type ScheduleStage,
} from '@/constants/wedding'
import {
  isAppleDevice,
  APPLE_CALENDAR_ICS_URL,
  getGoogleCalendarUrl,
} from '@/lib/calendar'

const ICON_MAP: Record<string, LucideIcon> = {
  church: Church,
  sparkles: Sparkles,
  heart: Heart,
}

export default function Page() {
  const [openPersons, setOpenPersons] = useState<Record<PersonKey, boolean>>({
    groom: false,
    bride: false,
  })
  const [currentStage, setCurrentStage] = useState<ScheduleStage>('before_ceremony')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isApple, setIsApple] = useState(false)
  const [calendarStatus, setCalendarStatus] = useState<string | null>(null)

  useScrollReveal()

  useEffect(() => {
    // Detect Apple device on client mount
    setIsApple(isAppleDevice())

    // Check for optional stage query param override for demo/testing (e.g. ?stage=reception_time)
    const urlParams = new URLSearchParams(window.location.search)
    const queryStage = urlParams.get('stage') as ScheduleStage | null

    const determineStage = (now: number): ScheduleStage => {
      if (queryStage && STAGE_CONFIG[queryStage]) {
        return queryStage
      }
      if (STAGE_PREVIEW_OVERRIDE && STAGE_CONFIG[STAGE_PREVIEW_OVERRIDE]) {
        return STAGE_PREVIEW_OVERRIDE
      }

      const weddingDayStart = new Date(WEDDING_DAY_START).getTime()
      const ceremonyTime = new Date(CEREMONY_DATETIME).getTime()
      const ceremonyEndTime = new Date(CEREMONY_END_DATETIME).getTime()
      const receptionEndTime = new Date(RECEPTION_END_DATETIME).getTime()
      const gatheringTime = new Date(GATHERING_DATETIME).getTime()

      if (now < weddingDayStart) {
        return 'before_day'
      }
      if (now < ceremonyTime) {
        return 'before_ceremony'
      }
      if (now < ceremonyEndTime) {
        return 'ceremony_ongoing'
      }
      if (now < receptionEndTime) {
        return 'reception_time'
      }
      if (now < gatheringTime) {
        return 'gathering_countdown'
      }
      return 'after_all'
    }

    const updateTimeline = () => {
      const now = Date.now()
      const stage = determineStage(now)
      setCurrentStage(stage)

      const stageConfig = STAGE_CONFIG[stage]
      if (stageConfig.hero.showCountdown && stageConfig.hero.targetDatetime) {
        const targetTime = new Date(stageConfig.hero.targetDatetime).getTime()
        const distance = Math.max(0, targetTime - now)

        setTimeLeft({
          days: Math.floor(distance / 86400000),
          hours: Math.floor((distance / 3600000) % 24),
          minutes: Math.floor((distance / 60000) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        })
      }
    }

    updateTimeline()
    const timer = window.setInterval(updateTimeline, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const togglePerson = (person: PersonKey) => {
    setOpenPersons((prev) => ({
      ...prev,
      [person]: !prev[person],
    }))
  }

  const handleAppleCalendarClick = () => {
    setCalendarStatus('Opening Apple Calendar with all 3 events...')
    setTimeout(() => setCalendarStatus(null), 5000)
  }

  const handleGoogleCalendarClick = () => {
    setCalendarStatus('Opening Google Calendar...')
    setTimeout(() => setCalendarStatus(null), 5000)
  }

  const stageConfig = STAGE_CONFIG[currentStage]
  const showBanner = currentStage !== 'before_day'

  // Formulate countdown units: hide Days if 0 for cleaner focus on hours/minutes/seconds
  const countdownUnits: [string, number][] =
    timeLeft.days > 0
      ? [
          ['Days', timeLeft.days],
          ['Hours', timeLeft.hours],
          ['Minutes', timeLeft.minutes],
          ['Seconds', timeLeft.seconds],
        ]
      : [
          ['Hours', timeLeft.hours],
          ['Minutes', timeLeft.minutes],
          ['Seconds', timeLeft.seconds],
        ]

  return (
    <main className="wedding-page">
      {/* ── Wedding Day Celebration Banner ── */}
      {showBanner && (
        <div className="wedding-day-banner">
          <div className="banner-shimmer" aria-hidden="true" />
          <div className="banner-floating-hearts" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <Heart key={i} className="floating-heart" style={{ '--i': i } as React.CSSProperties} />
            ))}
          </div>
          <div className="banner-content">
            <p className="banner-kicker">{stageConfig.banner.kicker}</p>
            <h2 className="banner-title">{stageConfig.banner.title}</h2>
            <p className="banner-message" style={{ whiteSpace: 'pre-line' }}>
              {stageConfig.banner.message}
            </p>
          </div>
        </div>
      )}

      {/* ── Hero Section ── */}
      <section className="hero-editorial">
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="particle" style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>
        <div className="hero-flower" aria-hidden="true"><img src={INVITATION_ARTWORK_URL} alt="" /></div>
        <div className="hero-ornament" aria-hidden="true">✦</div>
        <div className="hero-copy">
          <p className="eyebrow-light">{HERO_CONTENT.eyebrow}</p>
          <p className="hero-script">{HERO_CONTENT.script}</p>
          <h1><span>{COUPLE.groom.firstName}</span><i>&amp;</i><span>{COUPLE.bride.firstName}</span></h1>
          <p className="hero-intro">{HERO_CONTENT.intro}</p>
          <div className="hero-date">
            <span>{HERO_DISPLAY_DATE.dayShort}</span>
            <strong>{HERO_DISPLAY_DATE.dateNum}</strong>
            <span>{HERO_DISPLAY_DATE.month}</span>
            <strong>{HERO_DISPLAY_DATE.yearShort}</strong>
          </div>

          {/* ── Live Schedule Container (Countdown / Stage Message) ── */}
          {stageConfig.hero.showCountdown ? (
            <div className="countdown" aria-label={stageConfig.hero.title}>
              {stageConfig.hero.badge && (
                <div className="countdown-badge">{stageConfig.hero.badge}</div>
              )}
              <p>{stageConfig.hero.title}</p>
              <div
                className="countdown-grid"
                style={{ gridTemplateColumns: `repeat(${countdownUnits.length}, 1fr)` }}
              >
                {countdownUnits.map(([label, value]) => (
                  <div key={label}>
                    <strong>{String(value).padStart(2, '0')}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              {stageConfig.hero.sub && (
                <div className="countdown-sub">{stageConfig.hero.sub}</div>
              )}
              {stageConfig.hero.ctaText && stageConfig.hero.ctaHref && (
                <div style={{ marginTop: '12px' }}>
                  <a
                    href={stageConfig.hero.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="countdown-cta-link"
                  >
                    <MapPin /> {stageConfig.hero.ctaText} <ArrowUpRight />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="countdown" aria-label={stageConfig.hero.title}>
              <div className="countdown-message-box">
                {stageConfig.hero.badge && (
                  <div className="countdown-badge">{stageConfig.hero.badge}</div>
                )}
                <h3 className="countdown-message-title">{stageConfig.hero.title}</h3>
                {stageConfig.hero.sub && (
                  <p className="countdown-message-sub">{stageConfig.hero.sub}</p>
                )}
                {stageConfig.hero.ctaText && stageConfig.hero.ctaHref && (
                  <a
                    href={stageConfig.hero.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="countdown-cta-link"
                  >
                    <MapPin /> {stageConfig.hero.ctaText} <ArrowUpRight />
                  </a>
                )}
              </div>
            </div>
          )}

          <a href="#story" className="hero-scroll">{HERO_CONTENT.scrollCta} <ArrowDown /></a>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section id="story" className="story-section section-shell">
        <div className="section-heading" data-reveal="fade-up">
          <p className="section-kicker">{STORY_CONTENT.kicker}</p>
          <h2>{STORY_CONTENT.titleMain}<br /><em>{STORY_CONTENT.titleEm}</em></h2>
          <p>{STORY_CONTENT.description}</p>
        </div>
        <div className="people-editorial" data-reveal="fade-up">
          {(['groom', 'bride'] as const).map((person) => {
            const item = COUPLE[person]
            const open = !!openPersons[person]
            return (
              <button
                key={person}
                type="button"
                className={`person-editorial ${open ? 'is-open' : ''}`}
                onClick={() => togglePerson(person)}
                aria-expanded={open}
              >
                <div className={`portrait-oval portrait-${person}`}>
                  <span>{item.initials}</span>
                </div>
                <div>
                  <p className="section-kicker">{item.role}</p>
                  <h3>{item.fullName}</h3>
                  <p className="person-detail">{open ? item.detail : STORY_CONTENT.tapPrompt}</p>
                  {open && <p className="person-note">{item.note}</p>}
                </div>
                <ArrowDown className="person-chevron" />
              </button>
            )
          })}
        </div>
        <div className="artwork-lockup" data-reveal="scale-up">
          <p className="section-kicker">{STORY_CONTENT.artworkKicker}</p>
          <img src={INVITATION_ARTWORK_URL} alt={STORY_CONTENT.artworkAlt} />
        </div>
      </section>

      {/* ── Events Section ── */}
      <section className="events-section">
        <div className="section-shell">
          <div className="events-heading" data-reveal="fade-up">
            <div>
              <p className="section-kicker">{EVENTS_SECTION_CONTENT.kicker}</p>
              <h2>{EVENTS_SECTION_CONTENT.titleMain}<br /><em>{EVENTS_SECTION_CONTENT.titleEm}</em></h2>
            </div>
            <p>{EVENTS_SECTION_CONTENT.description}</p>
          </div>
          <div className="event-list">
            {EVENTS.map((event, index) => {
              const Icon = ICON_MAP[event.iconName]
              // Highlight the event corresponding to current stage
              const isCeremonyActive =
                (currentStage === 'before_ceremony' || currentStage === 'ceremony_ongoing') && index === 0
              const isReceptionActive = currentStage === 'reception_time' && index === 1
              const isGatheringActive = currentStage === 'gathering_countdown' && index === 2
              const isHighlighted = isCeremonyActive || isReceptionActive || isGatheringActive

              return (
                <article
                  className={`event-row ${isHighlighted ? 'event-row-active' : ''}`}
                  key={event.title}
                  data-reveal="slide-left"
                  data-reveal-delay={index * 120}
                  style={
                    isHighlighted
                      ? {
                          background: 'rgba(255, 255, 255, 0.45)',
                          borderRadius: '12px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                        }
                      : undefined
                  }
                >
                  <div className="event-number">0{index + 1}</div>
                  <div className="event-main">
                    <div className="event-titleline">
                      <span className="event-icon"><Icon /></span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <p className="section-kicker">{event.eyebrow}</p>
                          {isHighlighted && (
                            <span
                              style={{
                                fontSize: '9px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '.1em',
                                padding: '2px 8px',
                                borderRadius: '999px',
                                background: '#70446f',
                                color: '#fff',
                              }}
                            >
                              {currentStage === 'ceremony_ongoing' || currentStage === 'reception_time'
                                ? 'Now Active'
                                : 'Next Event'}
                            </span>
                          )}
                        </div>
                        <h3>{event.title}</h3>
                      </div>
                    </div>
                    <div className="event-facts">
                      <span><CalendarDays />{event.date}</span>
                      <span><Clock3 />{event.time}</span>
                      <span><MapPin />{event.venue}, {event.place}</span>
                    </div>
                  </div>
                  <div className="map-preview">
                    <div className="map-grid" />
                    <span className="map-road map-road-one" />
                    <span className="map-road map-road-two" />
                    <span className="map-pin"><MapPin /></span>
                    <span className="map-label">{event.place}</span>
                    <a href={event.href} target="_blank" rel="noreferrer" className="map-link">{EVENTS_SECTION_CONTENT.mapCta} <ArrowUpRight /></a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Add to Calendar Section ── */}
      <section className="calendar-section" data-reveal="fade-up">
        <div className="section-shell">
          <div className="calendar-card">
            <span className="section-kicker">✦ {CALENDAR_CONTENT.kicker} ✦</span>
            <h2>{CALENDAR_CONTENT.titleMain} <em>{CALENDAR_CONTENT.titleEm}</em></h2>
            <p className="calendar-desc">{CALENDAR_CONTENT.description}</p>

            <div className="calendar-button-group">
              <a
                href={isApple ? APPLE_CALENDAR_ICS_URL : getGoogleCalendarUrl()}
                target={isApple ? undefined : '_blank'}
                rel={isApple ? undefined : 'noopener,noreferrer'}
                className="btn-calendar-primary"
                onClick={isApple ? handleAppleCalendarClick : handleGoogleCalendarClick}
                aria-label={isApple ? CALENDAR_CONTENT.appleButtonText : CALENDAR_CONTENT.googleButtonText}
              >
                <CalendarPlus />
                {isApple ? CALENDAR_CONTENT.appleButtonText : CALENDAR_CONTENT.smartButtonText}
              </a>

              <a
                href={APPLE_CALENDAR_ICS_URL}
                className="btn-calendar-secondary"
                onClick={handleAppleCalendarClick}
                title="Open or download .ics file containing all 3 events for Apple Calendar, Outlook, etc."
              >
                <Download />
                Apple Calendar (.ics)
              </a>

              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener,noreferrer"
                className="btn-calendar-secondary"
                onClick={handleGoogleCalendarClick}
                title="Open and save to Google Calendar"
              >
                <Calendar />
                Google Calendar
              </a>
            </div>

            {calendarStatus && (
              <div className="calendar-feedback" role="status">
                <CheckCircle2 style={{ width: '15px', height: '15px', color: '#70446f' }} />
                <span>{calendarStatus}</span>
              </div>
            )}

            <p className="calendar-note">{CALENDAR_CONTENT.allEventsNote}</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-editorial" data-reveal="fade-up">
        <div className="footer-flower" aria-hidden="true"><img src={INVITATION_ARTWORK_URL} alt="" /></div>
        <Heart className="footer-heart" />
        <p className="footer-names">{COUPLE.groom.firstName} <i>&amp;</i> {COUPLE.bride.firstName}</p>
        <p>{DISPLAY_DATE_FULL} · {FOOTER_CONTENT.blessing}</p>
      </footer>
    </main>
  )
}

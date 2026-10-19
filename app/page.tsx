'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUpRight, CalendarDays, Church, Clock3, Heart, MapPin, Sparkles } from 'lucide-react'

const invitationArtwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5VQ38nu3yH9SvxvxXGC4tPaUHawqcq.png'

const events = [
  { eyebrow: 'The sacred beginning', title: 'Wedding Ceremony', date: 'Friday, 04 December 2026', time: '10:30 in the morning', venue: 'Holy Trinity Cathedral', place: 'Palayamkottai', href: 'https://maps.app.goo.gl/iRxFvW8CazVdvKoR6', icon: Church },
  { eyebrow: 'An evening of celebration', title: 'Wedding Reception', date: 'Friday, 04 December 2026', time: 'After the ceremony', venue: 'Moon Mahal', place: 'Pothigai Nagar, Perumalpuram', href: 'https://maps.app.goo.gl/woapsnZSxm61oYsd8', icon: Sparkles },
  { eyebrow: 'The celebration continues', title: 'Reception Gathering', date: 'Saturday, 05 December 2026', time: '6:30 in the evening', venue: 'JD Grand Hall Nazareth', place: 'Nazareth', href: 'https://maps.app.goo.gl/3jPmWYQJ4yqT9J1SA', icon: Heart },
]

const people = {
  bride: { name: 'P. Shifforah Rajam', role: 'The bride', detail: 'Daughter of Mr. A. Pondurai and Dr. J. Sumitha', note: 'A gentle heart, a bright spirit, and a beautiful new beginning.', initials: 'SR' },
  groom: { name: 'S. Jaffrin Sampaul', role: 'The groom', detail: 'Son of Mr. J. Selvan Paul and Mrs. G. Johsi Rani', note: 'A steady soul, a joyful laugh, and a promise kept for a lifetime.', initials: 'JS' },
}

export default function Page() {
  const [selectedPerson, setSelectedPerson] = useState<'bride' | 'groom' | null>(null)
  return (
    <main className="wedding-page">
      <section className="hero-editorial">
        <div className="hero-flower" aria-hidden="true"><img src={invitationArtwork} alt="" /></div>
        <div className="hero-ornament" aria-hidden="true">✦</div>
        <div className="hero-copy">
          <p className="eyebrow-light">A Christian wedding invitation</p>
          <p className="hero-script">With joyful hearts and grateful prayers</p>
          <h1><span>Jaffrin</span><i>&amp;</i><span>Shifforah</span></h1>
          <p className="hero-intro">invite you to witness the beginning of their forever, surrounded by faith, family, and the people they love.</p>
          <div className="hero-date"><span>FRI</span><strong>04</strong><span>DECEMBER</span><strong>26</strong></div>
          <a href="#story" className="hero-scroll">Discover the invitation <ArrowDown /></a>
        </div>
      </section>

      <section id="story" className="story-section section-shell">
        <div className="section-heading"><p className="section-kicker">By grace, together</p><h2>Two hearts.<br /><em>One beautiful promise.</em></h2><p>We would be honored by your prayers and presence as we step into this new chapter of our lives.</p></div>
        <div className="people-editorial">
          {(['bride', 'groom'] as const).map((person) => { const item = people[person]; const open = selectedPerson === person; return <button key={person} className={`person-editorial ${open ? 'is-open' : ''}`} onClick={() => setSelectedPerson(open ? null : person)} aria-expanded={open}><div className={`portrait-oval portrait-${person}`}><span>{item.initials}</span></div><div><p className="section-kicker">{item.role}</p><h3>{item.name}</h3><p className="person-detail">{open ? item.detail : 'Tap to discover their story'}</p>{open && <p className="person-note">{item.note}</p>}</div><ArrowDown className="person-chevron" /></button> })}
        </div>
        <div className="artwork-lockup"><p className="section-kicker">The invitation</p><img src={invitationArtwork} alt="Lavender floral wedding invitation with church and wedding details" /></div>
      </section>

      <section className="events-section"><div className="section-shell"><div className="events-heading"><div><p className="section-kicker">Save the dates</p><h2>Join us for<br /><em>the celebration.</em></h2></div><p>Three moments, one joyful weekend. Find each gathering below and open the map for directions.</p></div><div className="event-list">{events.map((event, index) => { const Icon = event.icon; return <article className="event-row" key={event.title}><div className="event-number">0{index + 1}</div><div className="event-main"><div className="event-titleline"><span className="event-icon"><Icon /></span><div><p className="section-kicker">{event.eyebrow}</p><h3>{event.title}</h3></div></div><div className="event-facts"><span><CalendarDays />{event.date}</span><span><Clock3 />{event.time}</span><span><MapPin />{event.venue}, {event.place}</span></div></div><div className="map-preview"><div className="map-grid" /><span className="map-road map-road-one" /><span className="map-road map-road-two" /><span className="map-pin"><MapPin /></span><span className="map-label">{event.place}</span><a href={event.href} target="_blank" rel="noreferrer" className="map-link">Open map <ArrowUpRight /></a></div></article> })}</div></div></section>

      <footer className="footer-editorial"><div className="footer-flower" aria-hidden="true"><img src={invitationArtwork} alt="" /></div><Heart className="footer-heart" /><p className="footer-names">Jaffrin <i>&amp;</i> Shifforah</p><p>04 December 2026 · With love and blessings</p></footer>
    </main>
  )
}

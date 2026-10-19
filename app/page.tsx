'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUpRight, CalendarDays, Church, Clock3, Heart, MapPin, Sparkles } from 'lucide-react'

const invitationArtwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5VQ38nu3yH9SvxvxXGC4tPaUHawqcq.png'

const events = [
  {
    eyebrow: 'The sacred beginning',
    title: 'Wedding Ceremony',
    date: 'Friday, 04 December 2026',
    time: '10:30 in the morning',
    venue: 'Holy Trinity Cathedral',
    place: 'Palayamkottai',
    href: 'https://maps.app.goo.gl/iRxFvW8CazVdvKoR6',
    icon: Church,
  },
  {
    eyebrow: 'An evening of celebration',
    title: 'Wedding Reception',
    date: 'Friday, 04 December 2026',
    time: 'After the ceremony',
    venue: 'Moon Mahal',
    place: 'Pothigai Nagar, Perumalpuram',
    href: 'https://maps.app.goo.gl/woapsnZSxm61oYsd8',
    icon: Sparkles,
  },
  {
    eyebrow: 'The celebration continues',
    title: 'Reception Gathering',
    date: 'Saturday, 05 December 2026',
    time: '6:30 in the evening',
    venue: 'JD Grand Hall Nazareth',
    place: 'Nazareth',
    href: 'https://maps.app.goo.gl/3jPmWYQJ4yqT9J1SA',
    icon: Heart,
  },
]

const people = {
  bride: {
    name: 'P. Shifforah Rajam',
    role: 'The bride',
    detail: 'Daughter of Mr. A. Pondurai and Dr. J. Sumitha',
    note: 'A gentle heart, a bright spirit, and a beautiful new beginning.',
    initials: 'SR',
  },
  groom: {
    name: 'S. Jaffrin Sampaul',
    role: 'The groom',
    detail: 'Son of Mr. J. Selvan Paul and Mrs. G. Johsi Rani',
    note: 'A steady soul, a joyful laugh, and a promise kept for a lifetime.',
    initials: 'JS',
  },
}

export default function Page() {
  const [selectedPerson, setSelectedPerson] = useState<'bride' | 'groom' | null>(null)

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1f5] text-[#40344b]">
      <section className="hero-section relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#4d285c] px-6 py-20 text-center text-white">
        <div className="hero-glow absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5VQ38nu3yH9SvxvxXGC4tPaUHawqcq.png')] bg-cover bg-center opacity-10 mix-blend-screen" />
        <div className="hero-content relative z-10 mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.38em] text-[#ebcce6]">With joyful hearts & grateful prayers</p>
          <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full border border-[#dfb6d2]/60 bg-white/10 text-[#f1d8e8] shadow-2xl backdrop-blur-sm">
            <Heart className="size-7 fill-current" />
          </div>
          <p className="mb-5 font-serif text-xl italic text-[#f5deed]">Together with their families</p>
          <h1 className="font-serif text-6xl leading-[0.92] tracking-[-0.04em] text-[#fff8fd] sm:text-8xl md:text-9xl">Jaffrin <span className="text-[#d8a8ca]">&</span> Shifforah</h1>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-[#ead8e9] sm:text-base">invite you to witness the beginning of their forever, surrounded by faith, family, and the people they love.</p>
          <div className="mx-auto mt-12 flex max-w-lg items-center justify-center gap-4 text-xs uppercase tracking-[0.25em] text-[#e9c9dd]">
            <span className="h-px flex-1 bg-[#dca9cf]/60" /><span>04 · 12 · 2026</span><span className="h-px flex-1 bg-[#dca9cf]/60" />
          </div>
          <a href="#celebration" className="mt-14 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/20">Discover the celebration <ArrowDown className="size-4" /></a>
        </div>
        <div className="floral-corner floral-corner-left" aria-hidden="true">✦</div>
        <div className="floral-corner floral-corner-right" aria-hidden="true">✦</div>
      </section>

      <section id="celebration" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">A promise made in love</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight text-[#4d285c] sm:text-6xl">The story begins here</h2>
          <p className="mt-6 text-base leading-8 text-[#766a7a]">Every detail has been chosen with love. We would be honored to have your prayers and presence as we step into this beautiful chapter.</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 reveal-group">
          {(['bride', 'groom'] as const).map((person) => {
            const item = people[person]
            const isSelected = selectedPerson === person
            return (
              <button key={person} onClick={() => setSelectedPerson(isSelected ? null : person)} className={`person-card group text-left ${isSelected ? 'person-card-selected' : ''}`} aria-expanded={isSelected}>
                <div className={`person-monogram ${person === 'bride' ? 'person-monogram-bride' : 'person-monogram-groom'}`}><span>{item.initials}</span></div>
                <div className="flex-1">
                  <p className="section-kicker">{item.role}</p>
                  <h3 className="mt-2 font-serif text-3xl text-[#4d285c]">{item.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#766a7a]">{isSelected ? item.detail : 'Tap to open their story'}</p>
                  {isSelected && <p className="mt-4 border-t border-[#dbc9da] pt-4 text-sm italic leading-6 text-[#8a668c]">{item.note}</p>}
                </div>
                <span className="person-arrow"><ArrowDown className={`size-4 transition-transform ${isSelected ? 'rotate-180' : ''}`} /></span>
              </button>
            )
          })}
        </div>

        <div className="invitation-frame mx-auto mt-20 max-w-5xl">
          <div className="mb-4 flex items-center justify-between px-1 text-xs uppercase tracking-[0.25em] text-[#927b91]"><span>Our invitation</span><span>By grace, together</span></div>
          <img src={invitationArtwork} alt="Lavender floral wedding invitation artwork" className="w-full rounded-sm shadow-2xl" />
        </div>
      </section>

      <section className="bg-[#efe3ee] px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="section-kicker">Save the dates</p><h2 className="mt-4 font-serif text-5xl text-[#4d285c] sm:text-6xl">Come celebrate with us</h2></div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {events.map((event, index) => { const Icon = event.icon; return <article key={event.title} className="event-card" style={{ animationDelay: `${index * 120}ms` }}><div className="flex items-start justify-between"><span className="event-icon"><Icon className="size-5" /></span><span className="text-xs font-semibold tracking-[0.2em] text-[#a076a2]">{event.date.split(',')[0]}</span></div><p className="mt-9 text-xs uppercase tracking-[0.2em] text-[#a076a2]">{event.eyebrow}</p><h3 className="mt-3 font-serif text-3xl text-[#4d285c]">{event.title}</h3><div className="mt-7 flex flex-col gap-3 text-sm text-[#766a7a]"><span className="flex items-center gap-3"><CalendarDays className="size-4 text-[#9b6596]" />{event.date}</span><span className="flex items-center gap-3"><Clock3 className="size-4 text-[#9b6596]" />{event.time}</span><span className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-[#9b6596]" /><span>{event.venue}<br />{event.place}</span></span></div><a href={event.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6b3f72] hover:text-[#4d285c]">View on map <ArrowUpRight className="size-4" /></a></article> })}
          </div>
        </div>
      </section>

      <footer className="footer-glow bg-[#4d285c] px-6 py-20 text-center text-white"><Heart className="mx-auto size-6 fill-[#e1b4d2] text-[#e1b4d2]" /><p className="mt-6 font-serif text-4xl">Jaffrin & Shifforah</p><p className="mt-4 text-sm text-[#dfc8df]">04 December 2026 · A day to remember, a love to last forever</p><div className="mx-auto mt-10 h-px max-w-xs bg-white/20" /><p className="mt-8 text-xs uppercase tracking-[0.24em] text-[#c9a9c8]">With love and blessings</p></footer>
    </main>
  )
}

import { useEffect, useRef, useState } from 'react'
import './FlavourShowcase.css'
import mangoDrink from '../assets/MangoDrink.png'
import coffeeCola from '../assets/CoffeeCola.png'
import classicWild from '../assets/ClassicWildDrink.png'

const items = [
  {
    id: 'mango',
    img: mangoDrink,
    title: 'MANGO MAYHEM',
    tagline: 'Tropical Energy',
    text: 'Bright mango flavour with a caffeinated protein kick. Cold, loud and zero sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    bg: 'linear-gradient(135deg, #FFB84D 0%, #FF8C42 100%)',
  },
  {
    id: 'coffee',
    img: coffeeCola,
    title: 'COFFEE COLA',
    tagline: 'Double Kick Energy',
    text: 'Coffee and cola in one can. Double the kick, none of the sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    bg: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
  },
  {
    id: 'classic',
    img: classicWild,
    title: 'CLASSIC WILD BERRY',
    tagline: 'Untamed Power',
    text: 'Wild berry taste that hits hard and finishes clean. Pure classic, zero sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    bg: 'linear-gradient(135deg, #4169E1 0%, #0047AB 100%)',
  },
]

const N = items.length
const clamp = (v) => Math.min(1, Math.max(0, v))

function FlavourShowcase() {
  const trackRef = useRef(null)
  const [view, setView] = useState({ active: 0, enter: 0, sway: 0 })

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight

      // can neeche aata hai jab section screen me aata hai
      const enter = Math.round(clamp((vh - r.top) / (vh * 0.9)) * 100) / 100

      // sticky hone ke baad har 100vh scroll = ek naya content
      const progress = clamp(-r.top / (r.height - vh))
      const active = Math.min(N - 1, Math.floor(progress * N))

      // scroll ke saath halka 3D ghumna (-18deg se +18deg)
      const local = progress * N - active
      const sway = Math.round((local - 0.5) * 36)

      setView((prev) =>
        prev.active === active && prev.enter === enter && prev.sway === sway
          ? prev
          : { active, enter, sway }
      )
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const { active, enter, sway } = view
  const ready = enter >= 0.95

  return (
    <section
      className="showcase-track"
      ref={trackRef}
      style={{ height: `${(N + 1) * 100}vh` }}
    >
      {/* Scrolling Marquee above the showcase */}
      <div className="showcase-marquee">
        <div className="showcase-marquee-content">
          <span>ZERO NONSENSE • PROTEIN-INFUSED • ZERO NONSENSE • PROTEIN-INFUSED • ZERO NONSENSE • PROTEIN-INFUSED • </span>
          <span>ZERO NONSENSE • PROTEIN-INFUSED • ZERO NONSENSE • PROTEIN-INFUSED • ZERO NONSENSE • PROTEIN-INFUSED • </span>
        </div>
      </div>
      
      <div className="showcase-stage">
        {/* Content: left se aata hai */}
        {items.map((it, i) => (
          <div
            key={it.id}
            className={`showcase-content ${i === active && ready ? 'is-active' : ''}`}
          >
            <p className="showcase-tagline">{it.tagline}</p>
            <h3 className="showcase-title">{it.title}</h3>
            <p className="showcase-text">{it.text}</p>
            <div className="showcase-tags">
              {it.tags.map((t) => (
                <span key={t} className="showcase-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}

        {/* Can: hamesha center me, upar se tilt hoke neeche aata hai */}
        <div
          className="showcase-can"
          style={{
            opacity: enter,
            transform: `translate(-50%, calc(-50% - ${(1 - enter) * 100}vh)) rotate(${(1 - enter) * -25}deg)`,
          }}
        >
          <div className="showcase-float">
            <div
              className="showcase-sway"
              style={{ transform: `rotateY(${sway}deg)` }}
            >
              {items.map((it, i) => (
                <img
                  key={it.id}
                  src={it.img}
                  alt={it.title}
                  className={`showcase-img ${
                    i === active ? 'is-active' : i < active ? 'is-before' : 'is-after'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="showcase-shadow" style={{ opacity: enter }} />

      </div>
    </section>
  )
}

export default FlavourShowcase
import { useEffect, useRef, useState } from 'react'
import './OurFlavours.css'
import mangoDrink from '../assets/MangoDrink.png'
import classicWild from '../assets/ClassicWildDrink.png'

const flavours = [
  {
    id: 'mango',
    img: mangoDrink,
    alt: 'Mango Mayhem',
    panels: [
      { title: 'MANGO MAYHEM', text: 'Tropical Energy' },
      { title: 'ZERO SUGAR', text: 'All the flavour, none of the guilt.' },
      { title: 'DIETARY FIBER', text: 'Fuel that keeps you going longer.' },
      { title: 'GO WILD', text: 'No nonsense. Just mayhem.' },
    ],
  },
  {
    id: 'classic',
    img: classicWild,
    alt: 'Classic Wild',
    panels: [
      { title: 'CLASSIC WILD', text: 'Untamed Power' },
      { title: 'PURE ENERGY', text: 'Built for the fearless.' },
      { title: 'ZERO COMPROMISE', text: 'Bold taste, clean ingredients.' },
      { title: 'STAY WILD', text: 'No nonsense. Just power.' },
    ],
  },
]

const clamp = (v) => Math.min(Math.max(v, 0), 1)

function FlavourSection({ flavour, first }) {
  const sectionRef = useRef(null)
  const bottleRef = useRef(null)
  const [active, setActive] = useState(-1)
  const n = flavour.panels.length

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight

      // first: hero ke upar se side se center tak (0..1 vh scroll)
      // baaki: neeche se upar aate waqt
      const enter = first ? clamp(-rect.top / vh) : clamp(1 - rect.top / vh)
      if (bottleRef.current) {
        bottleRef.current.style.setProperty('--enter', enter)
      }

      const offset = first ? vh : 0
      const progress = clamp((-rect.top - offset) / (rect.height - vh - offset))
      const index = Math.min(Math.floor(progress * n), n - 1)
      setActive(enter < 0.98 ? -1 : index)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [n, first])

  return (
    <div
      className={`flavour-scroll ${first ? 'first' : ''}`}
      ref={sectionRef}
      style={{ height: `${(n + (first ? 2 : 1)) * 100}vh` }}
    >
      <div className="flavour-stage">
        {first && (
          <h2 className={`section-title ${active === 0 ? 'show' : ''}`}>OUR FLAVORS</h2>
        )}

        <div className={`bottle-wrap ${first ? 'from-hero' : ''}`} ref={bottleRef}>
          <img src={flavour.img} alt={flavour.alt} className="drink-image" />
        </div>

        {flavour.panels.map((panel, i) => (
          <div
            key={i}
            className={`drink-info ${i % 2 === 0 ? 'right-side' : 'left-side'} ${
              active === i ? 'visible' : ''
            }`}
          >
            <h3>{panel.title}</h3>
            <p>{panel.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OurFlavours() {
  return (
    <section className="products-section" id="story">
      {flavours.map((f, i) => (
        <FlavourSection key={f.id} flavour={f} first={i === 0} />
      ))}
    </section>
  )
}

export default OurFlavours
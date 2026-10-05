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

function FlavourSection({ flavour }) {
  const sectionRef = useRef(null)
  const bottleRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight

      // Bottle entry: neeche se upar aate waqt 0 -> 1
      const enter = Math.min(Math.max(1 - rect.top / vh, 0), 1)
      if (bottleRef.current) {
        bottleRef.current.style.setProperty('--enter', enter)
      }

      // Panels: scroll progress se active panel
      const total = rect.height - vh
      const progress = Math.min(Math.max(-rect.top / total, 0), 1)
      const index = Math.min(
        Math.floor(progress * flavour.panels.length),
        flavour.panels.length - 1
      )
      setActive(index)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [flavour.panels.length])

  return (
    <div className="flavour-scroll" ref={sectionRef}>
      <div className="flavour-stage">
        <div className="bottle-wrap" ref={bottleRef}>
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
      <h2 className="section-title">OUR FLAVORS</h2>
      {flavours.map(f => (
        <FlavourSection key={f.id} flavour={f} />
      ))}
    </section>
  )
}

export default OurFlavours
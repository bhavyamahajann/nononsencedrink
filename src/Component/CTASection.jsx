import { useEffect, useRef, useState } from 'react'
import './CTASection.css'

// Button ka link / text yahan badlo
const CTA_HREF = '#final'
const CTA_LABEL = 'Grab your can'

const CHIPS = [
  { big: '2.4g', small: 'Protein' },
  { big: '75mg', small: 'Caffeine' },
  { big: '0g', small: 'Added sugar' },
]

function CTASection() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className={`cta-section ${inView ? 'is-in' : ''}`} ref={ref}>
      <div className="cta-glow" aria-hidden="true" />

      <div className="cta-content">
        <h2>
          <span>Big energy</span>
          <em>Zero nonsense</em>
        </h2>

        <p>
          Protein. Caffeine Flavour All in one can
        </p>

        <ul className="cta-chips">
          {CHIPS.map((c) => (
            <li key={c.small} className="cta-chip">
              <b>{c.big}</b>
              <span>{c.small}</span>
            </li>
          ))}
        </ul>

        <a href={CTA_HREF} className="cta-btn">
          {CTA_LABEL}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      <div className="cta-visual">
        <div className="cta-float">
          <img
            src="/ZombieSkullScoop.png"
            alt="Zombie skull scoop spilling protein powder"
            className="zombie-skull-img"
          />
        </div>
      </div>
    </section>
  )
}

export default CTASection
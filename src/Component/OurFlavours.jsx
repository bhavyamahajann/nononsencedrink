import { useEffect, useRef, useState } from 'react'
import './OurFlavours.css'
import mangoDrink from '../assets/MangoDrink.png'
import coffeeCola from '../assets/CoffeeCola.png'
import classicWild from '../assets/ClassicWildDrink.png'

// Videos public folder me hain, isliye seedha '/' se path dete hain (import nahi)
const mangoVideo = '/MangoDrink.mp4'
const coffeeVideo = '/Beverage_can_product_commercial_20261005110710.mp4'
const classicVideo = '/Beverage_can_product_commercial_20261005105933.mp4'

const flavours = [
  {
    id: 'mango',
    img: mangoDrink,
    alt: 'Mango Mayhem',
    title: 'MANGO MAYHEM',
    subtitle: 'Tropical Energy',
    text: 'Bright mango flavour with a caffeinated protein kick. Cold, loud and zero sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    scale: 1, // can ka size tune karne ke liye
    video: mangoVideo,
    bg: 'linear-gradient(135deg, #FFB84D 0%, #FF8C42 100%)',
  },
  {
    id: 'coffee',
    img: coffeeCola,
    alt: 'Coffee Cola',
    title: 'COFFEE COLA',
    subtitle: 'Double Kick Energy',
    text: 'Coffee and cola in one can. Double the kick, none of the sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    scale: 1.02,
    video: coffeeVideo,   // agar ulta ho to coffeeVideo aur classicVideo swap kar do
    bg: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
  },
  {
    id: 'classic',
    img: classicWild,
    alt: 'Classic Wild Berry',
    title: 'CLASSIC WILD BERRY',
    subtitle: 'Untamed Power',
    text: 'Wild berry taste that hits hard and finishes clean. Pure classic, zero sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    scale: 1.03,
    video: classicVideo,
    bg: 'linear-gradient(135deg, #4169E1 0%, #0047AB 100%)',
  },
]

const N = flavours.length
const clamp = (v) => Math.min(1, Math.max(0, v))

function OurFlavours() {
  const trackRef = useRef(null)
  const videoRefs = useRef([])
  const triggeredRef = useRef(false)
  const aRef = useRef(0)
  const [s, setS] = useState(0)                 // 0..N : scroll progress (har 1 = ek video)
  const [triggered, setTriggered] = useState(false) // thoda sa scroll hote hi true
  const [a, setA] = useState(0)                 // 0..1 : cans neeche aane + video start (apne aap chalta hai)
  const [contentOn, setContentOn] = useState(false)

  // ---------- scroll ----------
  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = clamp(-r.top / total)
      const next = Math.round(p * N * 1000) / 1000
      setS((prev) => (prev === next ? prev : next))

      // thoda sa scroll (~3%) hote hi video section start
      if (!triggeredRef.current && next > 0.03) {
        triggeredRef.current = true
        setTriggered(true)
      } else if (triggeredRef.current && next < 0.01) {
        triggeredRef.current = false
        setTriggered(false)
      }
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

  // ---------- auto transition (cans neeche -> video) ----------
  useEffect(() => {
    const from = aRef.current
    const to = triggered ? 1 : 0
    if (from === to) return
    const dur = 1400 * Math.abs(to - from)
    const t0 = performance.now()
    let raf = 0

    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur)
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
      const v = from + (to - from) * e
      aRef.current = v
      setA(v)
      if (k < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [triggered])

  const phaseB = a >= 1
  const active = Math.min(N - 1, Math.floor(s))
  const sway = 0

  // ---------- video play + content 3 second baad ----------
  useEffect(() => {
    setContentOn(false)
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (phaseB && i === active) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
    if (!phaseB) return
    const timer = setTimeout(() => setContentOn(true), 3000)
    return () => clearTimeout(timer)
  }, [phaseB, active])

  const cardsOpacity = clamp(1 - a * 1.6)

  // white se video ke dark color me smooth change (beech me white khali jagah nahi dikhti)
  const t = clamp((a - 0.1) / 0.7)
  const mix = (from, to) => Math.round(from + (to - from) * t)
  const stageBg = `rgb(${mix(250, 6)}, ${mix(250, 9)}, ${mix(250, 13)})`

  return (
    <section
      className="fl-track"
      id="story"
      ref={trackRef}
      style={{ height: `${(N + 1) * 100}vh` }}
    >
      <div className="fl-stage" data-phase={phaseB ? 'B' : 'A'} style={{ background: stageBg }}>
        {/* ---------- Heading + colored cards ---------- */}
        <div className="fl-marquee" style={{ opacity: cardsOpacity }} aria-label="Protein-infused, zero nonsense">
          <div className="fl-marquee-track" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="fl-marquee-item">
                PROTEIN-INFUSED <b>•</b> ZERO NONSENSE <b>•</b>
              </span>
            ))}
          </div>
        </div>

        <div
          className="fl-cols"
          style={{ opacity: cardsOpacity, pointerEvents: a > 0.2 ? 'none' : 'auto' }}
        >
          {flavours.map((f) => (
            <div key={f.id} className="fl-col" style={{ '--card-bg': f.bg }}>
              <div className="fl-info">
                <h3 className="fl-title">{f.title}</h3>
                <p className="fl-subtitle">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Content (left se aata hai) ---------- */}
        {flavours.map((f, i) => (
          <div
            key={f.id}
            className={`fl-content ${contentOn && phaseB && i === active ? 'is-active' : ''}`}
          >
            <p className="fl-tagline">{f.subtitle}</p>
            <h3 className="fl-content-title">{f.title}</h3>
            <p className="fl-text">{f.text}</p>
            <div className="fl-tags">
              {f.tags.map((t) => (
                <span key={t} className="fl-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}

        {/* ---------- Videos (cans ki jagah, 3D me ghoomke aate hain) ---------- */}
        <div className="fl-videos">
          <div className="fl-videos-sway">
            {flavours.map((f, i) => (
              <div
                key={f.id}
                className={`fl-video ${phaseB && i === active ? 'is-active' : ''}`}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={f.video}
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Cans ---------- */}
        {flavours.map((f, i) => {
          let xmul = 0
          let y = 0
          let scale = 1
          let opacity = 1

          if (!phaseB) {
            if (i === 0) {
              // mango: card se center me aata hai
              xmul = -(1 - a)
              y = 4 * (1 - a)
              scale = 0.86 + 0.14 * a
            } else {
              // baaki cans neeche gir jaate hain
              xmul = i - 1
              y = 4 + a * 110
              scale = 0.86
              opacity = clamp(1 - a * 1.3)
            }
          } else {
            opacity = 0 // can image fade ho jata hai, uski jagah video aata hai
          }

          const imgState = !phaseB
            ? 'is-active'
            : i === active
            ? 'is-active'
            : i < active
            ? 'is-before'
            : 'is-after'

          return (
            <div
              key={f.id}
              className="fl-can"
              style={{
                opacity,
                transform: `translate(calc(-50% + ${xmul} * var(--step)), calc(-50% + ${y}vh)) scale(${scale * f.scale})`,
                zIndex: i === active ? 3 : 2,
              }}
            >
              <div className="fl-float">
                <div className="fl-sway" style={{ transform: `rotateY(${sway}deg)` }}>
                  <img src={f.img} alt={f.alt} className={`fl-img ${imgState}`} />
                </div>
              </div>
              <span className="fl-shadow" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default OurFlavours
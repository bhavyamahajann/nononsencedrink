import { useEffect, useRef, useState } from 'react'
import './OurFlavours.css'
import mangoDrink from '../assets/MangoDrink.png'
import coffeeCola from '../assets/CoffeeCola.png'
import classicWild from '../assets/ClassicWildDrink.png'

// Videos public folder me hain, isliye seedha '/' se path (import nahi)
const mangoVideo = '/MangoDrink.mp4'
const coffeeVideo = '/Beverage_can_product_commercial_20261005110710.mp4'
const classicVideo = '/Beverage_can_product_commercial_20261005105933.mp4'

// Video colour frame ke andar halke texture ki tarah chalta hai.
// Sirf colour frame chahiye to false kar do.
const SHOW_VIDEO = true

const flavours = [
  {
    id: 'mango',
    img: mangoDrink,
    alt: 'Mango Mayhem',
    title: 'Mango Mayhem',
    subtitle: 'Tropical Energy',
    text: 'Bright mango flavour with a caffeinated protein kick. Cold, loud and zero sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    notes: ['zero sugar', 'ice cold'],
    scale: 1,
    video: mangoVideo,
    bg: 'linear-gradient(135deg, #FFB84D 0%, #FF8C42 100%)',
  },
  {
    id: 'coffee',
    img: coffeeCola,
    alt: 'Coffee Cola',
    title: 'Coffee Cola',
    subtitle: 'Double Kick Energy',
    text: 'Coffee and cola in one can. Double the kick, none of the sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    notes: ['double kick', 'no sugar'],
    scale: 1.02,
    video: coffeeVideo, // ulta ho to coffeeVideo aur classicVideo swap kar do
    bg: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
  },
  {
    id: 'classic',
    img: classicWild,
    alt: 'Classic Wild Berry',
    title: 'Classic Wild Berry',
    subtitle: 'Untamed Power',
    text: 'Wild berry taste that hits hard and finishes clean. Pure classic, zero sugar.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    notes: ['finishes clean', 'wild berry'],
    scale: 1.03,
    video: classicVideo,
    bg: 'linear-gradient(135deg, #4169E1 0%, #0047AB 100%)',
  },
]

// Stats cards (yahan apne asli numbers / text daal do)
const stats = [
  { value: 15, suffix: 'g', label: 'Protein', text: 'Pure protein in every can. Fuel your muscles while you stay energized.', bg: flavours[0].bg },
  { value: 3, suffix: '', label: 'Bold flavours', text: 'Mango, coffee cola and wild berry, each built to hit hard.', bg: flavours[2].bg },
  { value: 250, suffix: 'ml', label: 'Per can', text: 'Cold, loud and exactly the right size for one go.', bg: flavours[1].bg },
  { value: 100, suffix: '%', label: 'Protein + Energy', text: 'The perfect mix of protein power and energy boost in one can.', bg: 'linear-gradient(135deg, #6B1A1A 0%, #4B1111 100%)' },
]

const N = flavours.length

// ---- scroll timeline (1 = ek screen ki scroll) ----
const REVEAL = 0.8                 // 0 -> 0.8 : coloured panels cans ke peeche uthte hain
const MOVE_AT = 1.0                // yahan se cans focus frame me jaate hain
const MOVE_LEN = 0.7
const SF = MOVE_AT + MOVE_LEN      // focus phase start
const SEG = 1                      // har flavour ke liye itni screen scroll
// Arrows apne aap aate hain (scroll se nahi): pehla NOTE_FIRST ms baad, phir har NOTE_GAP ms me ek
const NOTE_COUNT = 2
const NOTE_FIRST = 1000
const NOTE_GAP = 600
const TOTAL = SF + N * SEG

// ---- stats stack timeline ----
const STAT_ENTER = 0.9   // ek card ko upar aane me itni screen scroll lagti hai
const STAT_SEG = 1       // do cards ke beech gap (screens me)

const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const easeOut = (x) => 1 - Math.pow(1 - x, 3)
const num = (v, d = 3) => Number(v.toFixed(d))

function StatsStack() {
  const trackRef = useRef(null)
  const [s, setS] = useState(-1)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const next = Math.round(clamp(-r.top / window.innerHeight, -1, stats.length) * 500) / 500
      setS((prev) => (prev === next ? prev : next))
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

  // har card ka entry progress (0 = neeche, 1 = apni jagah)
  const ks = stats.map((_, i) =>
    i === 0 ? 1 : clamp((s - (i - 1) * STAT_SEG) / STAT_ENTER)
  )

  return (
    <section
      className="fl-stats"
      id="stats"
      ref={trackRef}
      style={{ height: `${(stats.length + 0.5) * 100}vh` }}
    >
      <div className="fl-stats-stage">
        <div className="fl-stats-inner">
          <div>
            <h2 className="fl-stats-title">
              What goes into <em>every can</em>
            </h2>
            <p className="fl-stats-copy">
              The perfect blend of protein and energy. Here is what makes us different.
            </p>
          </div>

          <div className="fl-stack">
            {stats.map((st, i) => {
              const k = ks[i]
              const e = easeInOut(k)
              // is card ke upar jitne cards aa chuke hain, utna ye peeche dabta hai
              let depth = 0
              for (let j = i + 1; j < stats.length; j++) depth += easeInOut(ks[j])

              const enterY = i === 0 ? 0 : (1 - e) * 110 // vh
              const lift = depth * 22
              const sc = 1 - depth * 0.045
              const rot = depth * (i % 2 ? 1.6 : -1.6)

              // number count: card aate waqt ginta hai
              const cnt = i === 0 ? clamp((s + 0.5) / 0.5) : k
              const val = Math.round(st.value * easeOut(cnt))

              return (
                <div
                  key={st.label}
                  className="fl-stat"
                  style={{
                    background: st.bg,
                    zIndex: i + 1,
                    transform: `translateY(calc(${num(enterY, 2)}vh - ${num(lift, 1)}px)) scale(${num(sc, 4)}) rotate(${num(rot, 2)}deg)`,
                  }}
                >
                  <div className="fl-stat-num">
                    {val}
                    <small>{st.suffix}</small>
                  </div>
                  <div>
                    <p className="fl-stat-label">{st.label}</p>
                    <p className="fl-stat-text">{st.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function OurFlavours() {
  const trackRef = useRef(null)
  const videoRefs = useRef([])
  const [s, setS] = useState(0) // scroll position in screens: 0..TOTAL

  // ---------- scroll ----------
  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const next = Math.round(clamp(-r.top / window.innerHeight, 0, TOTAL) * 500) / 500
      setS((prev) => (prev === next ? prev : next))
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

  // ---------- derived values ----------
  const a = clamp(s / REVEAL)                                 // panels grow
  const t = easeInOut(clamp((s - MOVE_AT) / MOVE_LEN))        // lineup -> focus
  const phaseB = s >= SF                                      // focus phase
  const rel = Math.max(0, s - SF) / SEG
  const active = Math.min(N - 1, Math.floor(rel))
  const local = phaseB ? clamp(rel - active) : 0              // 0..1 current flavour ke andar
  const sway = phaseB ? (local - 0.5) * 30 : 0                // halka 3D ghumna
  const framed = t > 0.05

  // arrows: drink aate hi apne aap ek ke baad ek aate hain
  const [shown, setShown] = useState(0)
  useEffect(() => {
    setShown(0)
    if (!phaseB) return
    const ids = []
    for (let k = 0; k < NOTE_COUNT; k++) {
      ids.push(setTimeout(() => setShown(k + 1), NOTE_FIRST + k * NOTE_GAP))
    }
    return () => ids.forEach(clearTimeout)
  }, [phaseB, active])

  // ---------- video: sirf active wala chalta hai ----------
  useEffect(() => {
    if (!SHOW_VIDEO) return
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (framed && i === active) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [framed, active])

  const headOpacity = clamp(1 - t * 3)
  const colsOpacity = clamp(1 - t * 2)
  const frameOpacity = clamp((t - 0.15) / 0.6)

  return (
    <>
      <section
        className="fl-track"
        id="story"
        ref={trackRef}
        style={{ height: `${(TOTAL + 1) * 100}vh` }}
      >
        <div className="fl-stage" data-phase={phaseB ? 'B' : 'A'}>
          {/* ---------- Headline ---------- */}
          <div
            className="fl-head"
            style={{ opacity: headOpacity, transform: `translateY(${num(-t * 30, 1)}px)` }}
          >
            <h2 className="fl-headline">
              <span>Three Flavours</span> <em>One Perfect Kick</em>
            </h2>
          </div>

          {/* ---------- Coloured panels (cans ke peeche uthte hain) ---------- */}
          <div
            className="fl-cols"
            style={{ opacity: colsOpacity, pointerEvents: 'none' }}
          >
            {flavours.map((f, i) => {
              const g = easeOut(clamp(a * 1.5 - i * 0.25))
              return (
                <div
                  key={f.id}
                  className="fl-col"
                  style={{ '--card-bg': f.bg, '--grow': num(g) }}
                >
                  <div className="fl-info">
                    <h3 className="fl-title">{f.title}</h3>
                    <p className="fl-subtitle">{f.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ---------- Focus frame (rounded colour panel) ---------- */}
          <div
            className="fl-frame"
            style={{
              opacity: frameOpacity,
              transform: `scale(${num(0.94 + 0.06 * t, 4)})`,
            }}
          >
            {flavours.map((f, i) => (
              <div
                key={f.id}
                className={`fl-frame-bg ${i === active ? 'is-active' : ''}`}
                style={{ background: f.bg }}
              >
                {SHOW_VIDEO && (
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={f.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            ))}
          </div>

          {/* ---------- Content (left se aata hai) ---------- */}
          {flavours.map((f, i) => {
            const on = phaseB && i === active
            return (
              <div key={f.id}>
                <div className={`fl-content ${on ? 'is-active' : ''}`}>
                  <p className="fl-tagline">{f.subtitle}</p>
                  <h3 className="fl-content-title">{f.title}</h3>
                  <p className="fl-text">{f.text}</p>
                  <div className="fl-tags">
                    {f.tags.map((tg) => (
                      <span key={tg} className="fl-tag">{tg}</span>
                    ))}
                  </div>
                </div>

                {/* drink ke aas paas 2 arrows (sirf desktop) */}
                {f.notes.map((line, k) => (
                  <div
                    key={line}
                    className={`fl-note fl-n${k + 1} ${on && k < shown ? 'is-active' : ''}`}
                    aria-hidden="true"
                  >
                    <span>{line}</span>
                    <svg viewBox="0 0 90 60">
                      <path pathLength="1" d="M80 4 C 78 30 50 46 10 48" />
                      <path pathLength="1" d="M22 38 L9 48 L24 56" />
                    </svg>
                  </div>
                ))}
              </div>
            )
          })}

          {/* ---------- Cans ---------- */}
          {flavours.map((f, i) => {
            const xmul = num((i - 1) * (1 - t), 4)
            const yv = num((1 - t) * 4, 3)
            const scale = num((0.86 + 0.14 * t) * f.scale, 4)
            const rot = i === 0 ? num(Math.sin(t * Math.PI) * -8, 2) : 0

            let opacity
            if (phaseB) opacity = i === active ? 1 : 0
            else opacity = i === 0 ? 1 : num(clamp(1 - t * 1.6), 3)

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
                  transform: `translate(calc(-50% + ${xmul} * var(--step) + ${num(t, 4)} * var(--fx)), calc(-50% + ${yv}vh + ${num(t, 4)} * var(--fy))) rotate(${rot}deg) scale(${scale})`,
                  zIndex: i === active ? 4 : 3,
                }}
              >
                <div className="fl-float">
                  <div
                    className="fl-sway"
                    style={{ transform: `rotateY(${i === active ? num(sway, 2) : 0}deg)` }}
                  >
                    <img src={f.img} alt={f.alt} className={`fl-img ${imgState}`} />
                  </div>
                </div>
                <span className="fl-shadow" />
              </div>
            )
          })}

        </div>
      </section>

      {/* ---------- Stats (sticky card stack) ---------- */}
      <StatsStack />
    </>
  )
}

export default OurFlavours
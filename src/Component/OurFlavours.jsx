import { useEffect, useRef, useState } from 'react'
import './OurFlavours.css'
import mangoDrink from '../assets/MangoDrink (2).png'
import coffeeCola from '../assets/CoffeeCola (2).png'
import classicWild from '../assets/ClassicWildDrink.png'

// Videos public folder me hain, isliye seedha '/' se path (import nahi)
const mangoVideo = '/MangoDrink.mp4'
const coffeeVideo = '/Beverage_can_product_commercial_20261005110710.mp4'
const classicVideo = '/Beverage_can_product_commercial_20261005105933.mp4'

// Video colour frame ke andar halke texture ki tarah chalta hai.
// Sirf colour frame chahiye to false kar do.
const SHOW_VIDEO = true

const CTA_LABEL = 'Discover the flavour'

// Arrows ke paas aane wale notes (pehla highlighted pill me)
const PROTEIN_NOTES = ['protein infused', 'fuel your muscles']

const baseFlavours = [
  {
    id: 'mango',
    img: mangoDrink,
    alt: 'Mango Mayhem',
    title: 'MANGO MAYHEM',
    subtitle: 'A LITTLE TROPICAL. A LOT OF TROUBLE.',
    text: 'A bold mango-flavoured caffeinated protein drink with a tropical twist.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    notes: ['tropical twist', 'bold flavour'],
    scale: 1,
    video: mangoVideo,
    bg: 'linear-gradient(135deg, #FFB84D 0%, #FF8C42 100%)',
  },
  {
    id: 'coffee',
    img: coffeeCola,
    alt: 'Coffee Cola',
    title: 'COFFEE COLA',
    subtitle: 'COFFEE MEETS COLA. CHAOS FOLLOWS.',
    text: 'The bold character of coffee with a fizzy cola-inspired twist.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    notes: ['coffee + cola', 'chaos follows'],
    scale: 1.02,
    video: coffeeVideo,
    bg: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
  },
  {
    id: 'classic',
    img: classicWild,
    alt: 'Classic Wild Berry',
    title: 'CLASSIC WILD BERRY',
    subtitle: 'BERRY BOLD. NEVER BASIC.',
    text: 'A vibrant wild berry flavour that brings a refreshing twist to your everyday routine.',
    tags: ['Zero Sugar', 'Dietary Fiber', '250 ml'],
    notes: ['never basic', 'wild berry'],
    scale: 1.03,
    video: classicVideo,
    bg: 'linear-gradient(135deg, #4169E1 0%, #0047AB 100%)',
  },
]

// Order: pehle red, phir blue, last me yellow (lineup + focus dono me yahi order)
const FLAVOUR_ORDER = ['coffee', 'classic', 'mango']
const flavours = FLAVOUR_ORDER.map((id) => baseFlavours.find((f) => f.id === id))
const byId = Object.fromEntries(baseFlavours.map((f) => [f.id, f]))

// What's inside: 5 markers (values are per 250 ml can)
// value + decimals = counting number | display = number ki jagah chhota text
const stats = [
  { value: 6, suffix: 'g', label: 'Protein', mark: '6g', text: 'Pure protein in every can. Fuel your muscles while you stay energized.', bg: byId.mango.bg },
  { value: 75, suffix: 'mg', label: 'Caffeine', mark: '75mg', text: 'Just the right kick to power through your day.', bg: byId.classic.bg },
  { display: 'Prebiotic', label: 'Fibre', mark: 'Prebiotic', text: 'Prebiotic fibre in every can, built into the flavour.', bg: byId.coffee.bg },
  { display: 'B2 , B3 , B6 , B12', label: 'Vitamins', mark: 'B2 B3 B6 B12', text: 'A blend of B vitamins to keep up with your everyday hustle.', bg: 'linear-gradient(135deg, #6B1A1A 0%, #4B1111 100%)' },
  { value: 0, suffix: 'g', label: 'Added Sugar', mark: 'Zero', text: 'Zero added sugar. All the flavour, none of the nonsense.', bg: 'linear-gradient(135deg, #2E2E2E 0%, #0F0F0F 100%)' },
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

// section andar aate hi true ho jaata hai (reveal animations ke liye)
function useInView(threshold = 0.25) {
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
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ============================================
   03 / WHAT'S INSIDE
   ============================================ */
// har stat card ka bada watermark icon (energy-drink vibe)
const STAT_ICON = {
  Protein: 'dumbbell',
  Caffeine: 'bolt',
  Fibre: 'leaf',
  Vitamins: 'capsule',
  'Added Sugar': 'sugar',
}

// fizz bubbles jo card me neeche se upar uthte hain
const BUBBLES = Array.from({ length: 14 }, (_, b) => ({
  left: (b * 37) % 92 + 4,
  size: 6 + ((b * 7) % 16),
  dur: 5 + (b % 5),
  delay: -(b * 0.85),
}))

function StatArt({ type }) {
  return (
    <div className="fl-stat-art" aria-hidden="true">
      <span className="fl-stat-glow" />
      <svg className="fl-stat-icon" viewBox="0 0 100 100">
        {type === 'bolt' && <polygon points="58,4 20,56 46,56 38,96 80,40 54,40" />}
        {type === 'dumbbell' && (
          <path d="M8 40v20M20 30v40M80 30v40M92 40v20M20 50h60" />
        )}
        {type === 'leaf' && (
          <>
            <path d="M16 84C14 42 46 12 88 12C90 56 62 88 16 84Z" />
            <path d="M16 84L62 38" />
          </>
        )}
        {type === 'capsule' && (
          <>
            <rect x="10" y="32" width="80" height="36" rx="18" />
            <path d="M50 32v36" />
            <path d="M28 44v12" />
          </>
        )}
        {type === 'sugar' && (
          <>
            <path d="M50 12L85 30V70L50 88L15 70V30Z" />
            <path d="M15 30L50 48L85 30M50 48V88" />
            <path d="M8 92L92 8" className="fl-stat-slash" />
          </>
        )}
      </svg>
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="fl-bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

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

  // abhi kaun sa card upar hai (left list highlight ke liye)
  let act = 0
  for (let i = 1; i < stats.length; i++) if (ks[i] >= 0.5) act = i

  return (
    <section
      className="fl-stats"
      id="stats"
      ref={trackRef}
      style={{ height: `${(stats.length + 0.5) * 100}vh` }}
    >
      <div className="fl-stats-stage">
        <div className="fl-stats-inner">
          <div className="fl-stats-left">
            <div>
              <p className="fl-kicker">What&apos;s inside</p>
              <h2 className="fl-stats-title">
                ALL THE GOOD STUFF NONE OF THE  <em>NONSENSE</em>
              </h2>
              <p className="fl-stats-copy">
                Built for flavour. Made for your everyday hustle.
              </p>
            </div>

            <div>
              <ul className="fl-stats-list">
                {stats.map((st, i) => (
                  <li
                    key={st.label}
                    className={`fl-stats-item ${i === act ? 'is-on' : ''}`}
                    style={{ '--p': ks[i] }}
                  >
                    <span className="fl-stats-idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fl-stats-name">{st.label}</span>
                    <span className="fl-stats-val">{st.mark}</span>
                  </li>
                ))}
              </ul>
              <p className="fl-stats-foot">
                One can. Multiple reasons to crack it open.
                <small>Values are per 250 ml can.</small>
              </p>
            </div>
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
              const isWord = st.display !== undefined
              const val = isWord ? st.display : (st.value * easeOut(cnt)).toFixed(st.decimals || 0)

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
                  <StatArt type={STAT_ICON[st.label]} />
                  <div className="fl-stat-top">
                    <span className="fl-stat-badge">per 250 ml</span>
                    <div className={`fl-stat-num ${isWord ? 'is-word' : ''}`}>
                      {val}
                      {!isWord && <small>{st.suffix}</small>}
                    </div>
                  </div>
                  <div className="fl-stat-body">
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

/* ============================================
   04 / OUR STORY — "CHAOS -> ORDER"
   Words pehle bikhre aur tilted hote hain. Scroll karte hi apni jagah
   aate hain, seedhe hote hain, marker se highlight hote hain, aur end me
   "NO NONSENSE" stamp slam hota hai.
   ============================================ */

// deterministic random (re-render me same rahe)
const rnd = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const DRIPS = [
  { x: 4, w: 26, h: 70, c: 0 }, { x: 11, w: 18, h: 40, c: 2 }, { x: 19, w: 30, h: 110, c: 1 },
  { x: 28, w: 20, h: 55, c: 0 }, { x: 37, w: 28, h: 90, c: 2 }, { x: 46, w: 18, h: 45, c: 1 },
  { x: 55, w: 30, h: 120, c: 0 }, { x: 64, w: 20, h: 60, c: 1 }, { x: 73, w: 28, h: 85, c: 2 },
  { x: 82, w: 18, h: 50, c: 0 }, { x: 90, w: 30, h: 105, c: 1 }, { x: 97, w: 20, h: 60, c: 2 },
]
const DRIP_COLORS = ['#FFB84D', '#8B3A1E', '#4169E1']

// hl = marker highlight colour (mango / cola / berry)
const STORY_TEXT = [
  { t: "We didn't come here to make another ordinary drink" },
  { t: 'We came to' },
  { t: 'shake things up', hl: 'mango' },
  { t: 'Unexpected flavours ', hl: 'cola' },
  { t: 'Unapologetic attitude ', hl: 'berry' },
  { t: 'A little madness in every can ' },
]

const STORY_WORDS = STORY_TEXT.flatMap((seg) =>
  seg.t.split(' ').map((w) => ({ w, hl: seg.hl }))
).map((o, i) => ({
  ...o,
  // bikhra hua starting position (vw / vh) + tilt
  dx: (rnd(i, 1) - 0.5) * 90,
  dy: (rnd(i, 2) - 0.5) * 80,
  rot: (rnd(i, 3) - 0.5) * 70,
  sc: 0.7 + rnd(i, 4) * 1.1,
}))

const SHAPES = [
  { c: '#FFB84D', s: 120, x: 8, y: 22, sp: -160, r: 50 },
  { c: '#4169E1', s: 90, x: 86, y: 18, sp: 120, r: 12 },
  { c: '#DC143C', s: 150, x: 78, y: 70, sp: -200, r: 50 },
  { c: '#FFB84D', s: 60, x: 20, y: 78, sp: 140, r: 8 },
  { c: '#4169E1', s: 130, x: 44, y: 88, sp: -120, r: 50 },
  { c: '#8B3A1E', s: 70, x: 60, y: 10, sp: 180, r: 14 },
]

const SW = STORY_WORDS.length

function Story() {
  const [ref, inView] = useInView(0.05)
  const [p, setP] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const next = Math.round(clamp(-r.top / total) * 500) / 500
      setP((prev) => (prev === next ? prev : next))
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
  }, [ref])

  const SPAN = 7
  const reveal = clamp(p / 0.7) * (SW + SPAN)
  const chaos = Math.round((1 - clamp(p / 0.7)) * 100)

  const s = clamp((p - 0.76) / 0.14) // stamp progress
  const slam = s >= 1
  const stampScale = 2.6 - 1.6 * easeOut(s)
  const textDim = 1 - 0.55 * clamp((p - 0.74) / 0.12)

  return (
    <section className={`st ${inView ? 'is-in' : ''}`} id="our-story" ref={ref}>
      <div className="st-drips" aria-hidden="true">
        <span className="st-drip-bar" />
        {DRIPS.map((d, i) => (
          <span
            key={i}
            className="st-drip"
            style={{
              left: `${d.x}%`,
              width: `${d.w}px`,
              height: `${d.h}px`,
              background: DRIP_COLORS[d.c],
              '--dd': `${0.1 + i * 0.07}s`,
            }}
          />
        ))}
      </div>

      <div className="st-stage">
        {/* floating colour shapes (parallax) */}
        <div className="st-shapes" aria-hidden="true">
          {SHAPES.map((sh, i) => (
            <span
              key={i}
              className="st-shape"
              style={{
                left: `${sh.x}%`,
                top: `${sh.y}%`,
                width: sh.s,
                height: sh.s,
                background: sh.c,
                borderRadius: `${sh.r}%`,
                transform: `translateY(${num(p * sh.sp, 1)}px) rotate(${num(p * sh.sp * 0.4, 1)}deg)`,
              }}
            />
          ))}
        </div>
        <div className="st-grain" aria-hidden="true" />

        {/* chaos meter */}
        <div className="st-meter" aria-hidden="true">
          <span className="st-meter-label">Chaos level</span>
          <span className="st-meter-val">{String(chaos).padStart(2, '0')}%</span>
          <span className="st-meter-bar">
            <i style={{ transform: `scaleX(${num(chaos / 100, 3)})` }} />
          </span>
        </div>

        <div className="st-inner">
          <p className="st-kicker">Our story</p>

          <h2 className="st-text" style={{ opacity: num(textDim, 3) }}>
            {STORY_WORDS.map((o, i) => {
              const k = easeOut(clamp((reveal - i) / SPAN))
              const inv = 1 - k
              return (
                <span
                  key={i}
                  className={`st-w ${o.hl ? `hl-${o.hl}` : ''}`}
                  style={{
                    opacity: num(0.12 + 0.88 * k, 3),
                    transform: `translate(${num(o.dx * inv, 2)}vw, ${num(o.dy * inv, 2)}vh) rotate(${num(o.rot * inv, 2)}deg) scale(${num(1 + (o.sc - 1) * inv, 3)})`,
                    '--k': num(k, 3),
                  }}
                >
                  {o.w}
                  {'\u00A0'}
                </span>
              )
            })}
          </h2>
        </div>

        {/* stamp */}
        <div
          className={`st-stamp-wrap ${slam ? 'is-slam' : ''}`}
          style={{ opacity: num(clamp(s * 3), 3) }}
        >
          <div className="st-stamp" style={{ transform: `rotate(-5deg) scale(${num(stampScale, 3)})` }}>
            <span className="st-stamp-a">NO LIMITS</span>
            <span className="st-stamp-b">NO NONSENSE </span>
          </div>
          <span className="st-ring" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

/* ============================================
   05 / FINAL CALL TO ACTION
   ============================================ */
function FinalCTA() {
  const [ref, inView] = useInView(0.25)
  return (
    <section className={`fl-final ${inView ? 'is-in' : ''}`} id="final" ref={ref}>
      <div className="fl-final-inner">
        <p className="fl-kicker"> Ready?</p>
        <h2 className="fl-final-title">
          READY FOR SOME NONSENSE?
        </h2>
        <p className="fl-final-sub">Three flavours One wild experience </p>

        {/* teeno cans ek saath */}
        <div className="fl-final-cans">
          <img src={byId.mango.img} alt={byId.mango.alt} className="fl-fc fl-fc-1" />
          <img src={byId.coffee.img} alt={byId.coffee.alt} className="fl-fc fl-fc-2" />
          <img src={byId.classic.img} alt={byId.classic.alt} className="fl-fc fl-fc-3" />
        </div>

        <p className="fl-final-pick">PICK YOUR CHAOS</p>
        <a href="#story" className="fl-final-btn">
          EXPLORE NO NONSENSE
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  )
}

/* ============================================
   02 / THE FLAVOURS
   ============================================ */
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
               <span>THE FLAVOURS</span>
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
                  <a href="#stats" className="fl-cta">
                    {CTA_LABEL}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>

                {/* drink ke aas paas 2 arrows (sirf desktop) */}
                {PROTEIN_NOTES.map((line, k) => (
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
            const FOCUS_BOOST = 0 // focus me can kitna bada: 0 = default, +0.1 = thoda bada, -0.1 = thoda chhota
            const scale = num((0.86 + 0.14 * t) * f.scale * (1 + FOCUS_BOOST * t), 4)
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
                {/* shadow can ke PEECHE (pehle render) taaki can ke upar na aaye */}
                <span className="fl-shadow" />
                <div className="fl-float">
                  <div
                    className="fl-sway"
                    style={{ transform: `rotateY(${i === active ? num(sway, 2) : 0}deg)` }}
                  >
                    <img src={f.img} alt={f.alt} className={`fl-img ${imgState}`} />
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </section>

      {/* ---------- 03 What's inside (sticky card stack) ---------- */}
      <StatsStack />

      {/* ---------- 04 Our story ---------- */}
      <Story />

      {/* ---------- 05 Final CTA ---------- */}
      <FinalCTA />
    </>
  )
}

export default OurFlavours
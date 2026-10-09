import './Home.css'

function Home() {
  return (
    <section className="hero" id="home">
      {/* Video background */}
      <div className="hero-video-container">
        <video
          className="hero-video"
          src="/3inOne.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Soft gradients so text stays readable without covering the cans */}
      <div className="hero-shade hero-shade-top" />
      <div className="hero-shade hero-shade-bottom" />

      {/* Top: brand + headline (cans ke upar, unhe nahi dhakta) */}
      <div className="hero-top">
        <span className="hero-eyebrow">No Nonsense &middot; Caffeinated Protein Drink</span>
        <h1 className="hero-headline">
          Big energy - <em>Zero nonsense</em>
        </h1>
      </div>

      {/* Bottom: left me tagline + button, right me specs (cans ke dono taraf) */}
      <div className="hero-bottom">
        <div className="hero-left">
          <p className="hero-tagline">Protein. Caffeine. Flavour. All in one can.</p>
          <a href="#story" className="hero-cta">
            Explore the flavours
            <span className="hero-cta-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="hero-specs">
          <span className="hero-pill">250 ml</span>
          <span className="hero-pill">Zero added sugar</span>
        </div>
      </div>
    </section>
  )
}

export default Home
import './Home.css'

function Home() {
  return (
    <section className="hero" id="home">
      {/* Video Background - 3inOne.mp4 - Full screen without text */}
      <div className="hero-video-container">
        <video
          className="hero-video"
          src="/3inOne.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {/* Hero Content Overlay */}
        <div className="hero-content">
          <h1 className="hero-title">NO NONSENSE.</h1>
          <h2 className="hero-headline">BIG ENERGY. ZERO NONSENSE.</h2>
          <p className="hero-tagline">Protein. Caffeine. Flavour. All in one can.</p>
          
          <a href="#story" className="hero-cta">
            EXPLORE THE FLAVOURS
          </a>
          
          <div className="hero-specs">
            <span>250 ML</span>
            <span className="hero-divider">|</span>
            <span>ZERO ADDED SUGAR</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

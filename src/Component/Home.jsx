import './Home.css'
import classicWild from '../assets/ClassicWildDrink.png'

function Home() {
  return (
    <section className="hero" id="home">
      {/* Video Background */}
      <div className="hero-video-container">
        <video
          className="hero-video-bg"
          src="/Beverage_can_product_commercial_20261005105933.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-video-overlay"></div>
      </div>

      {/* Sirf right can. Left (mango) OurFlavours se aata hai */}
      <div className="hero-cans">
        <img src={classicWild} alt="Classic Wild" className="hero-can hero-can-right" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title fade-in">
          <span className="unleash">UNLEASH</span>
          <span className="no-nonsense">NO NONSENSE</span>
        </h1>
        <p className="hero-subtitle fade-in">PROTEIN + CAFFEINATED</p>
      </div>

      <div className="blood-drip"></div>
    </section>
  )
}

export default Home
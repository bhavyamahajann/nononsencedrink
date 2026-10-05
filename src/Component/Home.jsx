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
      </div>
    </section>
  )
}

export default Home
import { useEffect } from 'react'
import './App.css'
import Home from './Component/Home'
import OurFlavours from './Component/OurFlavours'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      {/* Simplified Header with Logo Only */}
      <header className="header">
        <div className="header-top-bar">
          <div className="header-logo">
            <img src="/logo.png" alt="No Nonsense" />
          </div>
        </div>
      </header>

      {/* Hero Section - Home Component */}
      <Home />

      {/* Products Section - OurFlavours Component */}
      <OurFlavours />

      {/* Video Section 2 - 3inOne after products */}
      <section className="video-section">
        <video 
          className="fullscreen-video"
          src="/3inOne.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content fade-in">
          <h2>READY TO UNLEASH?</h2>
          <p>Join the revolution. No crash. No chart shakes. No nonsense.</p>
          <button className="cta-button">
            <span>SHOP NOW</span>
            <div className="button-glow"></div>
          </button>
        </div>
      </section>

      {/* Video Section 3 - Second Can Video */}
      <section className="video-section">
        <video 
          className="fullscreen-video"
          src="/Beverage_can_product_commercial_20261005110710.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="No Nonsense" />
          </div>
          <p>© 2026 NO NONSENSE. All rights reserved.</p>
          <p className="footer-tagline">PROTEIN + CAFFEINATED • ZERO CRASH • PURE ENERGY</p>
        </div>
      </footer>
    </div>
  )
}

export default App

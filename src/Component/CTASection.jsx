import './CTASection.css'

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-background-image">
        <img src="/ZombieSkullScoop.png" alt="Zombie Skull Scoop" className="zombie-skull-img" />
      </div>
      <div className="cta-content fade-in">
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif" }}>FUEL YOUR CHAOS</h2>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Pure protein. Real energy. Zero nonsense. Unleash your inner beast with every scoop.</p>
      </div>
    </section>
  )
}

export default CTASection

import './CTASection.css'

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-background-image">
        <img src="/ZombieSkullScoop.png" alt="Zombie Skull Scoop" className="zombie-skull-img" />
      </div>
      <div className="cta-content fade-in">
        <h2>
          Wake the dead <em>Fuel the beast</em>
        </h2>
        <p>
          Protein for the muscle, caffeine for the kick, zero sugar and zero
          nonsense. One can is all it takes.
        </p>
      </div>
    </section>
  )
}

export default CTASection
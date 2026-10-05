import { useEffect } from 'react'
import './App.css'
import Header from './Component/Header'
import Home from './Component/Home'
import OurFlavours from './Component/OurFlavours'
import CTASection from './Component/CTASection'
import Footer from './Component/Footer'

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
      <Header />
      <Home />
      <OurFlavours />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App

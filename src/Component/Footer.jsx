import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/logo.png" alt="No Nonsense" />
        </div>
        
        <p className="footer-brand">NO NONSENSE — NOT YOUR ORDINARY DRINK.</p>
        
        <div className="footer-warning">
          <p className="footer-warning-title">PRODUCT INFORMATION</p>
          <p className="footer-warning-text">
            Contains caffeine (75mg per can) and non-caloric sweeteners (sucralose and erythritol). 
            Not recommended for children, pregnant or lactating women, or people sensitive to caffeine. 
            Consume no more than two cans per day.
          </p>
        </div>
        
        <p className="footer-copyright">© 2026 NO NONSENSE. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

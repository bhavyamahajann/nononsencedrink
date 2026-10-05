import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-top-bar">
        <div className="header-logo">
          <video
            className="logo-video"
            src="/LogoVideo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </header>
  )
}

export default Header

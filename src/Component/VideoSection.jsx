import './VideoSection.css'

function VideoSection({ videoSrc }) {
  return (
    <section className="video-section">
      <video 
        className="fullscreen-video"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
    </section>
  )
}

export default VideoSection

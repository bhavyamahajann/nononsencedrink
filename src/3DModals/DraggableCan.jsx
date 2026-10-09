import { useState, useRef } from 'react'
import './DraggableCan.css'

/**
 * 3D Draggable Can Component
 * 
 * Usage:
 * <DraggableCan 
 *   frontImage="/path/to/front.png"
 *   backImage="/path/to/back.png"
 *   alt="Mango Mayhem"
 * />
 */

function DraggableCan({ frontImage, backImage, alt = 'Can' }) {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const currentRotationRef = useRef(0)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    startXRef.current = e.clientX
    currentRotationRef.current = rotation
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - startXRef.current
    const newRotation = currentRotationRef.current + (deltaX * 0.5) // 0.5 = sensitivity
    setRotation(newRotation)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    startXRef.current = e.touches[0].clientX
    currentRotationRef.current = rotation
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    
    const deltaX = e.touches[0].clientX - startXRef.current
    const newRotation = currentRotationRef.current + (deltaX * 0.5)
    setRotation(newRotation)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div 
      className={`draggable-can ${isDragging ? 'is-dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="draggable-can__container"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {/* Front Face */}
        <div className="draggable-can__face draggable-can__face--front">
          <img src={frontImage} alt={`${alt} - Front`} draggable="false" />
        </div>

        {/* Back Face */}
        <div className="draggable-can__face draggable-can__face--back">
          <img src={backImage} alt={`${alt} - Back`} draggable="false" />
        </div>
      </div>

      <div className="draggable-can__hint">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        <span>Drag to rotate</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>
  )
}

export default DraggableCan

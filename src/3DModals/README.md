# 3D Draggable Can Component

## Features
- ✅ Mouse drag to rotate 360°
- ✅ Touch support for mobile
- ✅ Smooth transitions
- ✅ Front & back image flip
- ✅ Lightweight (no external libraries)

## Usage

### 1. Import the component:
```jsx
import DraggableCan from './3DModals/DraggableCan'
```

### 2. Add images to `/public` folder:
- MangoBack.png
- CoffeeBack.png
- ClassicBack.png

### 3. Use in your component:
```jsx
<DraggableCan 
  frontImage="/MangoDrink.png"
  backImage="/MangoBack.png"
  alt="Mango Mayhem"
/>
```

## Example Implementation

### Replace current can images in OurFlavours:
```jsx
// Instead of:
<img src={f.img} alt={f.alt} className="fl-img" />

// Use:
<DraggableCan 
  frontImage={f.img}
  backImage={f.backImg}  // Add backImg to flavours data
  alt={f.alt}
/>
```

### Update flavours data:
```jsx
const flavours = [
  {
    id: 'mango',
    img: mangoDrink,
    backImg: '/MangoBack.png',  // ← ADD THIS
    alt: 'Mango Mayhem',
    // ... rest of data
  },
  // ... other flavours
]
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `frontImage` | string | ✅ Yes | Path to front can image |
| `backImage` | string | ✅ Yes | Path to back can image |
| `alt` | string | No | Alt text for accessibility |

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (iOS 12+)
- ✅ Mobile browsers

## Performance
- No external dependencies
- Pure CSS 3D transforms (GPU accelerated)
- Lightweight: ~3KB gzipped

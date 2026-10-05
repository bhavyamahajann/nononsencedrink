# 🧟 NO NONSENSE Energy Drink Website

A stunning, zombie-themed energy drink website with 3D animations, scroll effects, and a dark brownish aesthetic inspired by drinknononsense.com.

## ✨ Features

### 🎨 Design Elements
- **Dark Brownish Theme** - Professional energy drink aesthetic
- **Full-Screen Video Background** - 3D can video plays in hero section
- **Zombie Characters** - 5 unique animated character GIFs
- **3D Video Can** - Center-stage rotating beverage can with scroll effects
- **Blood & Horror Effects** - Dripping text, red glow effects
- **Smooth Scroll Animations** - Fade-in, slide-left, slide-right effects

### 🚀 Sections
1. **Hero Section** - Full-screen 3D can video background with floating zombies
2. **3D Can Showcase** - Scrollable 3D can with information cards on both sides
3. **Manifesto Section** - "NO WINGS. NO LIES. NO NONSENSE." statement
4. **Characters Section** - Meet the crew with all 5 flavors/characters
5. **CTA Section** - Call-to-action with shop button
6. **Footer** - Clean footer with branding

### 🎯 Scroll Interactions
- Can rotates and scales as you scroll
- Information cards slide in from left and right
- Smooth fade-in animations throughout
- Parallax effects on zombie characters

## 🛠️ Tech Stack
- **React** - UI framework
- **Vite** - Build tool
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Framer Motion** - Animation library
- **CSS3** - Custom animations and styling

## 📁 Project Structure
```
nononsensedrink/
├── src/
│   ├── assets/
│   │   ├── gif1.png - gif5.png (Zombie characters)
│   │   └── NonnonsenceLogo.png
│   ├── 3Dmodals/
│   │   └── Beverage_can_product_commercial_*.mp4
│   ├── App.jsx (Main component)
│   ├── App.css (Styling)
│   └── main.jsx
├── public/
│   └── logo.png
└── package.json
```

## 🎮 How to Run

### Start Development Server
```powershell
npm run dev
```

### Build for Production
```powershell
npm run build
```

### Preview Production Build
```powershell
npm run preview
```

## 🌐 Live URL
**Local Development:** http://localhost:5174/

## 🎨 Color Scheme
- **Black:** #0a0a0a (Main background)
- **Dark Brown:** #1a0f0a (Secondary background)
- **Brown:** #2d1810 (Accent background)
- **Red:** #c41e1e (Primary brand color)
- **Dark Red:** #8b0000 (Accent)
- **Cream:** #f5e6d3 (Text)

## 📝 Key Features Implemented

### ✅ 3D Can Animation
- Video element with scroll-based rotation
- Scale effect on scroll
- Center-positioned with sticky behavior

### ✅ Information Cards
- 6 total cards (3 left, 3 right)
- Slide animations from opposite sides
- Hover effects with red glow
- Staggered appearance timing

### ✅ Zombie Theme
- 5 character GIFs floating in hero
- Circular character cards in dedicated section
- Horror-inspired typography
- Blood-drip effects

### ✅ Brownish Theme
- Dark brown gradients throughout
- Red accents for energy vibe
- Cream text for readability
- Professional energy drink aesthetic

## 🎯 Sections Breakdown

### 1. Header
- Sticky navigation bar
- Top information banner
- Logo with red glow effect
- Menu items with hover animations

### 2. Hero
- Full-screen impact
- Floating zombie characters
- "UNLEASH NO NONSENSE" typography
- Protein + Caffeinated badge

### 3. Can Showcase
- 3D beverage can video in center
- Scroll-triggered rotation
- Left side: Protein, Focus, Stamina info
- Right side: Sparkling, Gut-friendly, No Crash info

### 4. Manifesto
- White background section
- Dripping red text effect
- Bold statement typography
- Red badge with tagline

### 5. Characters
- Grid layout of 5 characters
- Circular frames with red borders
- Character descriptions
- Hover animations

### 6. CTA
- Red gradient background
- Large "READY TO UNLEASH?" heading
- Shop Now button with glow effect

### 7. Footer
- Clean branding
- Logo with glow
- Tagline and copyright

## 🔥 Animations & Effects
- Floating zombie animation (4s loop)
- Text glow pulse effect
- Scroll-based can rotation
- Card slide-in animations
- Button shine effect
- Hover transformations
- Fade-in on viewport entry

## 📱 Responsive Design
- Desktop-first approach
- Tablet breakpoint at 1200px
- Mobile breakpoint at 768px
- Flexible grid layouts
- Adaptive typography

## 🎬 Assets Used
- 5x Zombie character PNGs (gif1-gif5)
- 2x Beverage can videos (3D models folder)
- 1x Logo PNG
- Custom CSS animations

## 💡 Inspiration
Based on the design aesthetic of [drinknononsense.com](https://drinknononsense.com/)
- Dark, horror-themed branding
- Zombie/skull characters
- Red and brown color palette
- Protein + caffeinated messaging
- Bold, impactful typography

## 🚀 Next Steps (Optional Enhancements)
- [ ] Add actual GLB 3D models with Three.js
- [ ] Implement hamburger menu for mobile
- [ ] Add product purchase functionality
- [ ] Create flavor selector interaction
- [ ] Add loading screen animation
- [ ] Implement smooth scroll library
- [ ] Add video backgrounds
- [ ] Create interactive 3D can viewer

---

**Created with ❤️ using React + Vite**

*No Wings. No Lies. No Nonsense.*

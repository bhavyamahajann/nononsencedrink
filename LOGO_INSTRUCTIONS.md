# 🎨 Logo Setup Instructions

## How to Add Your Logo

1. **Copy your logo file** (`NonnonsenceLogo.png`) to the `public` folder
2. **Rename it** to `logo.png` (or update the path in `src/App.jsx`)
3. **Replace the temporary SVG logo** currently being used

### Quick Command:
```powershell
# If your logo is in the parent directory:
Copy-Item ..\NonnonsenceLogo.png public\logo.png

# If your logo is somewhere else, provide the full path:
Copy-Item "C:\path\to\your\NonnonsenceLogo.png" public\logo.png
```

### Update App.jsx (if needed):
If you named your logo file something different, update line 25 and 120 in `src/App.jsx`:

```jsx
// Change from:
<img src="/logo-temp.svg" alt="No Nonsense Logo" className="logo-3d" />

// To:
<img src="/logo.png" alt="No Nonsense Logo" className="logo-3d" />
```

## Current Status:
✅ Premium 3D animated website created
✅ Temporary placeholder logo in place
⏳ Waiting for actual logo file (NonnonsenceLogo.png)

## To View the Website:
```powershell
npm run dev
```
Then open: http://localhost:5173/

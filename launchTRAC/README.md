# LaunchTRAC Desktop

A Windows-themed launcher for HTML applications with multiple retro OS themes.

![LaunchTRAC Desktop](https://img.shields.io/badge/LaunchTRAC-Desktop-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootswatch](https://img.shields.io/badge/Bootswatch-5.3.8-7952B3?style=for-the-badge)

## Overview

LaunchTRAC Desktop is a nostalgic, Windows-themed launcher application that provides a desktop interface for launching HTML-based tools and applications. Switch between classic Windows themes (98, XP, Vista, 7, 10) while maintaining modern functionality.

## Features

### 🎨 **Multiple Windows Themes**
- **Windows 98**: Classic gray taskbar, teal desktop, iconic Start button
- **Windows XP**: Blue gradient taskbar, Bliss-inspired background, green Start button
- **Windows Vista**: Aero glass effects, transparent taskbar
- **Windows 7**: Refined Aero glass, modern taskbar with transparency
- **Windows 10**: Flat design, dark taskbar, centered icons

### 🚀 **Application Launcher**
- Desktop icons for quick access
- Start menu with categorized apps
- Double-click desktop icons to launch
- Single-click Start menu items to launch
- Integrated with mdown gradient theme (#667eea to #764ba2)

### 🪟 **Window Management**
- Draggable windows with titlebar
- Minimize, Maximize, Close buttons
- Themed window styles matching OS
- Windowed app execution via iframes
- Window persistence (stays in taskbar when minimized)

### ⏰ **System Features**
- Live clock in system tray
- Volume and network indicators
- Theme persistence (localStorage)
- Loading animations
- Keyboard shortcuts

### 📱 **Responsive Design**
- Mobile-friendly layouts
- Touch support for desktop icons
- Adaptive Start menu sizing
- Fluid window dimensions

## Included Applications

### 1. **AI Hub** (`aihub/index.html`)
- Comprehensive AI tools directory
- 2,442 lines of production-ready code
- Filter by categories, pricing, ratings
- Search and sort functionality
- Data import/export capabilities

### 2. **Mdown** (`mdown/renderer.html`)
- HTML to Markdown converter
- Live preview with Marked.js
- Dark mode support
- Copy to clipboard
- File import/export
- Conversion history
- 1,759 lines of documented code

## Usage

### Opening Applications

**Desktop Icons:**
1. Single-click to select
2. Double-click to open
3. Or press Enter when selected

**Start Menu:**
1. Click Start button (bottom-left)
2. Single-click any app to launch

### Changing Themes

**Via Settings:**
1. Double-click Settings icon on desktop
2. Or click Settings in Start menu
3. Choose from 5 Windows themes
4. Theme persists across sessions

**Keyboard Shortcuts:**
- `Windows Key` - Toggle Start menu
- `Escape` - Close all menus/windows
- `Enter` - Open selected icon

### Window Controls

- **Drag titlebar** - Move window
- **Minimize** - Hide window (stays in taskbar)
- **Maximize** - Toggle fullscreen
- **Close** - Exit application

## Technical Details

### Architecture
- **Pure vanilla JavaScript** - No frameworks
- **CSS Variables** - Dynamic theming system
- **localStorage** - Theme persistence
- **iframe isolation** - Secure app sandboxing

### File Structure
```
launchTRAC/
├── desktop.html          # Main launcher (1,100+ lines)
├── aihub/
│   └── index.html       # AI tools directory (2,442 lines)
└── mdown/
    ├── renderer.html    # Mdown converter (106 lines)
    ├── renderer.css     # Styles (656 lines)
    ├── renderer.js      # Logic (547 lines)
    ├── main.js          # Electron main (357 lines)
    └── preload.js       # IPC bridge (94 lines)
```

### Dependencies
- **Font Awesome 6.4.0** - Icons via CDN
- **Bootswatch 5.3.8** - Bootstrap theming (Superhero)
- **Turndown** - HTML to Markdown (via CDN in mdown)
- **Marked** - Markdown to HTML (via CDN in mdown)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (responsive)

## Customization

### Adding New Applications

1. **Create/place HTML file** in launchTRAC folder
2. **Add desktop icon**:
```html
<div class="desktop-icon" data-app="your-app/index.html" tabindex="0">
    <i class="fas fa-your-icon"></i>
    <span>Your App</span>
</div>
```

3. **Add Start menu item**:
```html
<div class="start-menu-item" data-app="your-app/index.html">
    <i class="fas fa-your-icon"></i>
    <span>Your App</span>
</div>
```

### Modifying Themes

Edit CSS variables in `<style>` section:
```css
:root {
    --win98-bg: #008080;        /* Desktop background */
    --win98-taskbar: #c0c0c0;   /* Taskbar color */
    --win98-titlebar: ...;       /* Window titlebar */
    /* ... more variables */
}
```

### Changing Default Theme

Update JavaScript configuration:
```javascript
const CONFIG = {
    defaultTheme: 'win98',  // Change to: winxp, vista, win7, win10
    // ...
};
```

## Performance Optimizations

- **Debounced events** - Smooth interactions
- **CSS containment** - Faster rendering
- **GPU acceleration** - transform: translateZ(0)
- **Lazy loading** - Apps load on-demand via iframes
- **Theme caching** - localStorage persistence

## Accessibility

- **Keyboard navigation** - Tab through icons, Enter to open
- **ARIA labels** - Screen reader support
- **Focus indicators** - Visual feedback
- **Semantic HTML** - Proper element usage
- **Touch targets** - 44x44px minimum (mobile)

## Development

### Local Testing
```bash
# Navigate to folder
cd launchTRAC

# Start local server
python3 -m http.server 8080

# Open in browser
# http://localhost:8080/desktop.html
```

### Debugging
- Open browser DevTools (F12)
- Check Console for logs
- Errors logged with context
- Theme changes logged

## Known Limitations

- **Window dragging** - Simplified (no snapping)
- **Taskbar buttons** - Not implemented (minimize only hides)
- **Multi-window** - One app at a time currently
- **Right-click menus** - Not implemented
- **Desktop wallpapers** - Static CSS backgrounds

## Future Enhancements

- [ ] Multiple simultaneous windows
- [ ] Taskbar app buttons
- [ ] Context menus (right-click)
- [ ] Window snapping/docking
- [ ] Custom desktop wallpapers
- [ ] Window animations
- [ ] Sound effects
- [ ] File system browser

## Credits

**Original Concept:**
- Sean Henderson - Markdownizr Chrome extension (Public Domain)

**LaunchTRAC Desktop:**
- Hannah Bellesheart - Desktop launcher, theme system, integration

**Dependencies:**
- Font Awesome - Icons (CC BY 4.0)
- Bootswatch - Bootstrap themes (MIT)
- Turndown - HTML to Markdown conversion (MIT)
- Marked - Markdown parsing (MIT)

## License

MIT License - See main repository LICENSE file

Copyright 2025 Hannah Bellesheart

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

## Support

For issues, questions, or contributions, please refer to the main repository.

---

**Built with ❤️ for productivity and nostalgia**

*Relive the glory days of Windows while using modern web applications!*

# LaunchTRAC Desktop - Quick Start Guide

## What is LaunchTRAC Desktop?

A Windows-themed desktop launcher that lets you run HTML applications in a nostalgic, retro OS interface. Switch between Windows 98, XP, Vista, 7, and 10 themes!

## Getting Started

### 1. Open the Desktop
```bash
# IMPORTANT: Must be in the launchTRAC directory
cd /workspaces/ext-markdownizr/launchTRAC
python3 -m http.server 8080
```

**Opening in Browser (Codespaces/Dev Container):**

**Method 1: Command Line (Easiest)**
```bash
"$BROWSER" http://localhost:8080/desktop.html
```

**Method 2: VS Code Simple Browser**
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Simple Browser" and select "Simple Browser: Show"
3. Enter URL: `http://localhost:8080/desktop.html`
4. Press Enter

**Method 3: External Browser (via Ports)**
1. Find the "PORTS" tab in VS Code (bottom panel)
2. Locate port 8080 in the list
3. Hover over port 8080 and click the globe icon (🌐)
4. **IMPORTANT:** Manually add `/desktop.html` to the end of the URL
   - The URL will look like: `https://your-codespace-xxxxx-8080.app.github.dev/desktop.html`

**Note:** The root URL shows a directory listing. You MUST append `/desktop.html` to access the launcher.

**Managing the Server:**
```bash
# Stop the server
# Press Ctrl+C in the terminal where server is running

# Or force stop if running in background
pkill -f "python3 -m http.server 8080"

# Restart the server (stop first, then start)
pkill -f "python3 -m http.server 8080" && python3 -m http.server 8080

# other commands
$ ps aux | grep "python3 -m http.server"
cd /workspaces/ext-markdownizr/launchTRAC && python3 -m http.server 8080 &
```

### 2. Launch Applications

**Desktop Icons** (double-click):
- 🤖 **AI Hub** - Comprehensive AI tools directory
- 📝 **Mdown** - HTML to Markdown converter
- ⚙️ **Settings** - Change Windows theme
- ℹ️ **About** - Application information

**Start Menu** (single-click):
1. Click "Start" button (bottom-left)
2. Click any application to launch

### 3. Change Theme

1. Double-click "Settings" icon
2. Choose from 5 Windows themes:
   - **Windows 98** (default) - Teal desktop, gray taskbar
   - **Windows XP** - Blue gradient, green Start button
   - **Windows Vista** - Aero glass effects
   - **Windows 7** - Refined Aero, transparent taskbar
   - **Windows 10** - Flat design, dark taskbar

## Features Highlight

✨ **Theme System**: 5 authentic Windows OS themes  
🚀 **App Launcher**: Desktop icons + Start menu  
🪟 **Window Manager**: Draggable, resizable windows  
⏰ **System Tray**: Live clock + status icons  
💾 **Persistence**: Theme saved to localStorage  
📱 **Responsive**: Works on mobile/tablet  
⌨️ **Keyboard**: Windows key, Escape, Enter shortcuts  
🎨 **Gradient Theme**: Integrated mdown colors (#667eea to #764ba2)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Windows Key` | Toggle Start menu |
| `Escape` | Close all menus/windows |
| `Enter` | Open selected icon |
| `Tab` | Navigate desktop icons |

## Included Apps

### AI Hub
- 2,442 lines of production code
- AI tools directory with filters
- Search, sort, import/export data
- Beautiful gradient UI

### Mdown
- 1,759 lines of documented code
- HTML to Markdown converter
- Live preview, dark mode
- Clipboard, history, file I/O

## Adding Your Own Apps

```html
<!-- Add to desktop icons -->
<div class="desktop-icon" data-app="your-folder/index.html" tabindex="0">
    <i class="fas fa-rocket"></i>
    <span>My App</span>
</div>

<!-- Add to start menu -->
<div class="start-menu-item" data-app="your-folder/index.html">
    <i class="fas fa-rocket"></i>
    <span>My App</span>
</div>
```

## Technical Stack

- **HTML5** - Structure
- **CSS3** - Theming with variables
- **Vanilla JS** - No frameworks
- **Bootswatch 5.3.8** - Bootstrap styling
- **Font Awesome 6.4.0** - Icons

## File Overview

```
launchTRAC/
├── desktop.html       # Main launcher (1,100+ lines)
│   ├── Theme system (Win98/XP/Vista/7/10)
│   ├── Desktop icons
│   ├── Start menu
│   ├── Window manager
│   ├── System tray
│   └── Settings panel
│
├── aihub/
│   └── index.html    # AI tools directory (2,442 lines)
│
├── mdown/
│   ├── renderer.html # Converter UI (106 lines)
│   ├── renderer.css  # Styles (656 lines)
│   ├── renderer.js   # Logic (547 lines)
│   ├── main.js       # Electron main (357 lines)
│   └── preload.js    # IPC bridge (94 lines)
│
└── README.md         # Full documentation
```

## Tips & Tricks

💡 **Tip 1**: Double-click desktop icons, single-click Start menu items  
💡 **Tip 2**: Drag window titlebar to reposition  
💡 **Tip 3**: Maximize button toggles fullscreen  
💡 **Tip 4**: Theme persists across browser sessions  
💡 **Tip 5**: Works offline after first load (CDN caching)

## Troubleshooting

**App won't open?**
- Check console (F12) for errors
- Verify file paths are correct
- Ensure local server is running

**Theme not saving?**
- Check if localStorage is enabled
- Clear browser cache and try again

**Window stuck?**
- Click desktop to reset
- Refresh page (F5)

## What Makes It Special?

🎨 **Authentic Theming**: Pixel-perfect recreation of Windows UI  
🔧 **Zero Dependencies**: Pure vanilla JavaScript  
📦 **Modular**: Easy to add new apps  
🎯 **Lightweight**: Fast loading, no bloat  
🌈 **Beautiful**: Mdown gradient integration  
🛠️ **Production Ready**: 1,100+ lines of polished code  

## Quick Comparison

| Feature | Win98 | WinXP | Vista/7 | Win10 |
|---------|-------|-------|---------|-------|
| Style | Classic | Luna | Aero | Flat |
| Taskbar | Gray | Blue | Glass | Dark |
| Effects | None | Shadows | Blur | Minimal |
| Start | Left | Left | Left | Center |
| Icons | Colored | 3D | Glossy | Flat |

## Next Steps

1. ✅ Open `desktop.html` in browser
2. ✅ Try all 5 Windows themes
3. ✅ Launch AI Hub and Mdown apps
4. ✅ Add your own HTML applications
5. ✅ Customize colors and icons

---

**Enjoy the nostalgia! 🎉**

Built by Hannah Bellesheart with ❤️ for productivity

*"The best way to predict the future is to create it... with retro UI!"*

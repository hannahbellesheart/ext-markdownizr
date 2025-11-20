# Markdownizr Demo - Electron Fiddle

A ready-to-run Electron Fiddle project for converting HTML to Markdown in real-time.

## Quick Start with Electron Fiddle

1. **Open Electron Fiddle**
2. **File → Open Fiddle** (or drag the `mdown` folder into Electron Fiddle)
3. **Click "Run"** button

That's it! The app will launch immediately.

## Files Structure (Electron Fiddle Format)

```
mdown/
├── main.js          # Main process (menu, file ops, window state)
├── preload.js       # Secure IPC bridge
├── renderer.html    # HTML content with enhanced UI
├── renderer.css     # Styles with dark mode support
├── renderer.js      # All app logic (conversion, history, etc.)
└── README.md        # This file
```

Electron Fiddle recognizes these files:
- `main.js` - Main Electron process with full menu system
- `preload.js` - Secure communication bridge
- `renderer.html` - Complete UI with all controls
- `renderer.css` - Beautiful styles + dark mode
- `renderer.js` - Enhanced functionality

## Features

### Core Functionality
- 🔄 **Real-time HTML to Markdown conversion** with debouncing for performance
- 👁️ **Preview rendered Markdown** in a beautiful modal
- 📋 **Copy to Clipboard** with one click
- 📊 **Character & Word Count** for both inputs

### File Operations
- 📂 **Import HTML files** (Ctrl/Cmd + O)
- 💾 **Export Markdown files** (Ctrl/Cmd + S)
- 📁 **Drag & drop support** for HTML files

### UI Enhancements
- 🌙 **Dark Mode** toggle with persistence
- 🔄 **Swap Panels** to reverse inputs
- 🗑️ **Clear All** button (Ctrl/Cmd + K)
- 🎨 **Beautiful, modern interface**
- ⚡ **Fast and responsive**

### Smart Features
- 📜 **Conversion History** - Keeps last 10 conversions
- 💾 **Settings Persistence** - Remembers theme & window size
- 🪟 **Window State** - Remembers position and size
- 🎯 **Application Menu** - Professional desktop app experience

## How to Use

1. **Paste HTML** in the left textarea (or import a file)
2. **See Markdown** output on the right instantly
3. **Click Copy** to copy Markdown to clipboard
4. **Click Preview** to see rendered HTML version
5. **Access History** to revisit previous conversions

## Keyboard Shortcuts

### Conversion
- `Ctrl/Cmd + Enter` - Manually trigger conversion
- `Ctrl/Cmd + C` (on Markdown panel) - Copy to clipboard

### File Operations
- `Ctrl/Cmd + O` - Open HTML file
- `Ctrl/Cmd + S` - Save Markdown as file
- `Ctrl/Cmd + K` - Clear all content

### View
- `Ctrl/Cmd + D` - Toggle dark mode
- `Ctrl/Cmd + Shift + S` - Swap panels
- `Ctrl/Cmd + H` - Show history
- `ESC` - Close any modal

### Standard
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Ctrl/Cmd + A` - Select all
- `Ctrl/Cmd + X/C/V` - Cut/Copy/Paste

## Technology

- **Electron** - Desktop app framework
- **Turndown** - HTML to Markdown converter (via CDN)
- **Marked** - Markdown to HTML renderer (via CDN)
- Pure JavaScript - No build process needed

## Electron Fiddle Tips

- Click **Run** to test your changes
- Changes auto-reload when you save
- View console with **View → Toggle Developer Tools**
- Share your fiddle via GitHub Gist

## Credits

This project is based on the original [Markdownizr](https://github.com/sh78/markdownizr-chrome) concept by [Sean Henderson](https://sean.sh/).

Special thanks to Sean for creating Markdownizr and releasing it to the public domain, making projects like this possible!

**Original Project:**
- Chrome Extension: https://github.com/sh78/markdownizr-chrome
- Website: https://markdownizr.com/

**Built with:**
- [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- [Turndown](https://github.com/mixmark-io/turndown) - HTML to Markdown converter
- [Marked](https://marked.js.org/) - Markdown to HTML renderer

## License

MIT

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

### 🔄 Core Conversion
- **Real-time HTML to Markdown** - Instant conversion as you type
- **Debounced Processing** - Optimized for large inputs (300ms delay)
- **Custom Filtering Rules** - Strips container elements, removes scripts
- **Error Handling** - Graceful degradation with error messages
- **Initial Content** - Pre-loaded with example HTML

### 📋 Clipboard & Preview
- **Copy to Clipboard** - One-click copy with visual feedback
- **Markdown Preview Modal** - See rendered HTML output
- **Toast Notifications** - Non-intrusive success/error messages
- **Auto-copy on Ctrl+C** - Smart clipboard when focused on markdown

### 📊 Statistics & Tracking
- **Character Count** - Real-time character tracking
- **Word Count** - Accurate word count for markdown output
- **Conversion History** - Stores last 10 conversions in localStorage
- **History Modal** - Browse and restore previous conversions
- **Click to Restore** - One-click to load historical conversions

### 📂 File Operations
- **Open HTML Files** (Ctrl/Cmd + O) - Import HTML from disk (10MB limit)
- **Save Markdown Files** (Ctrl/Cmd + S) - Export to .md, .markdown, or .txt
- **File Validation** - Size checks and error handling
- **Success Dialogs** - Confirmation on successful save

### 🎨 UI & Theme
- **Dark Mode Toggle** (Ctrl/Cmd + D) - Full dark theme with persistence
- **Swap Panels** (Ctrl/Cmd + Shift + S) - Reverse HTML/Markdown positions
- **Clear All** (Ctrl/Cmd + K) - Reset both panels with confirmation
- **Modern Gradient Design** - Beautiful purple/blue color scheme
- **Responsive Layout** - Adapts to different screen sizes
- **Watermark Effects** - Subtle background text effects

### 🪟 Window Management
- **Window State Persistence** - Remembers size and position
- **Minimum Size** - 900x600 minimum dimensions
- **Default Size** - 1400x900 starting dimensions
- **Smooth Transitions** - Fade-in on launch (no flicker)
- **macOS Integration** - Proper dock icon behavior

### 📝 Application Menu
- **File Menu** - Open, Save, Clear, Quit
- **Edit Menu** - Undo, Redo, Cut, Copy, Paste, Select All
- **View Menu** - Dark Mode, Swap, Reload, DevTools, Zoom, Fullscreen
- **History Menu** - Show History, Clear History
- **Help Menu** - About dialog with version info

### ⚡ Performance & Security
- **Debounced Conversion** - Prevents UI lag during typing
- **Context Isolation** - Secure renderer process
- **No Node Integration** - Security best practice
- **IPC Communication** - Secure preload bridge
- **Error Boundaries** - Comprehensive try-catch blocks
- **Input Validation** - File size limits and type checking

## How to Use

### Basic Workflow
1. **Paste HTML** in the left textarea (or File → Open HTML File)
2. **See Markdown** appear instantly in the right textarea
3. **Copy to Clipboard** - Click the 📋 Copy button
4. **Preview Rendered** - Click the 👁️ Preview button to see HTML output
5. **Save to File** - Click File → Save Markdown As (or Ctrl/Cmd + S)

### Additional Features
- **View History** - Click 📜 History button or Ctrl/Cmd + H
- **Toggle Dark Mode** - Click 🌙 Dark button or Ctrl/Cmd + D
- **Clear Content** - Click 🗑️ Clear All button or Ctrl/Cmd + K
- **Swap Sides** - Click 🔄 Swap button or Ctrl/Cmd + Shift + S
- **Check Stats** - Character and word count shown below markdown panel

### Tips
- Conversion happens automatically as you type (300ms debounce)
- History stores your last 10 conversions automatically
- Dark mode preference is saved between sessions
- Window size and position are remembered
- Large HTML files (up to 10MB) are supported

## Keyboard Shortcuts

### 🔄 Conversion
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Manually trigger conversion |
| `Ctrl/Cmd + C` | Auto-copy when focused on Markdown panel |

### 📂 File Operations
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + O` | Open HTML file from disk |
| `Ctrl/Cmd + S` | Save Markdown to file |
| `Ctrl/Cmd + K` | Clear all content (with confirmation) |

### 🎨 View & UI
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + D` | Toggle dark mode |
| `Ctrl/Cmd + Shift + S` | Swap HTML/Markdown panels |
| `Ctrl/Cmd + H` | Show conversion history |
| `ESC` | Close any open modal |
| `Ctrl/Cmd + 0` | Reset zoom |
| `Ctrl/Cmd + Plus` | Zoom in |
| `Ctrl/Cmd + Minus` | Zoom out |

### ✏️ Standard Editing
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Ctrl/Cmd + A` | Select all |
| `Ctrl/Cmd + X` | Cut |
| `Ctrl/Cmd + C` | Copy |
| `Ctrl/Cmd + V` | Paste |

### 🐛 Developer
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + R` | Reload window |
| `Ctrl/Cmd + Shift + R` | Force reload |
| `Ctrl/Cmd + Shift + I` | Toggle Developer Tools |
| `F11` | Toggle fullscreen |

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

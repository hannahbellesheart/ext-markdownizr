/**
 * Markdownizr - Main Process
 * Handles window management, file operations, and application menu
 */

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Reference to main window
let mainWindow;

/**
 * Window State Keeper
 * Persists window size and position between sessions
 */
const windowStateKeeper = {
  bounds: { width: 1400, height: 900, x: undefined, y: undefined },
  
  /**
   * Load saved window state from disk
   * Falls back to defaults if file doesn't exist or is corrupted
   */
  load() {
    try {
      const stateFile = path.join(app.getPath('userData'), 'window-state.json');
      if (fs.existsSync(stateFile)) {
        const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
        // Validate bounds before applying
        if (state.bounds && typeof state.bounds.width === 'number') {
          this.bounds = state.bounds;
        }
      }
    } catch (e) {
      console.error('Failed to load window state:', e);
      // Gracefully continue with defaults
    }
  },
  
  /**
   * Save current window state to disk
   * @param {Object} bounds - Window bounds object with width, height, x, y
   */
  save(bounds) {
    try {
      // Validate bounds before saving
      if (!bounds || typeof bounds.width !== 'number') {
        console.warn('Invalid bounds, skipping save');
        return;
      }
      const stateFile = path.join(app.getPath('userData'), 'window-state.json');
      fs.writeFileSync(stateFile, JSON.stringify({ bounds }, null, 2));
    } catch (e) {
      console.error('Failed to save window state:', e);
      // Non-critical error, app continues normally
    }
  }
};

/**
 * Create the main application window
 * Sets up window configuration, loads renderer, and creates menu
 */
function createWindow() {
  // Load saved window state
  windowStateKeeper.load();

  // Create browser window with security best practices
  mainWindow = new BrowserWindow({
    width: windowStateKeeper.bounds.width,
    height: windowStateKeeper.bounds.height,
    x: windowStateKeeper.bounds.x,
    y: windowStateKeeper.bounds.y,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,      // Security: disable Node.js in renderer
      contextIsolation: true,       // Security: isolate context
      preload: path.join(__dirname, 'preload.js')  // Secure IPC bridge
    },
    backgroundColor: '#667eea',
    title: 'Markdownizr',
    show: false  // Prevent flickering by showing after ready
  });

  // Load the main HTML file
  mainWindow.loadFile('renderer.html').catch(err => {
    console.error('Failed to load renderer.html:', err);
    app.quit();
  });

  // Show window when ready to prevent flickering
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Save window state on close
  mainWindow.on('close', () => {
    const bounds = mainWindow.getBounds();
    windowStateKeeper.save(bounds);
  });

  // Handle window errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load window:', errorCode, errorDescription);
  });

  // Create application menu
  createApplicationMenu();
}

/**
 * Create and set the application menu
 * Provides File, Edit, View, History, and Help menus
 */
function createApplicationMenu() {
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open HTML File...',
          accelerator: 'CmdOrCtrl+O',
          click: () => openHTMLFile()
        },
        {
          label: 'Save Markdown As...',
          accelerator: 'CmdOrCtrl+S',
          click: () => saveMarkdownFile()
        },
        { type: 'separator' },
        {
          label: 'Clear All',
          accelerator: 'CmdOrCtrl+K',
          click: () => mainWindow.webContents.send('clear-all')
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Dark Mode',
          accelerator: 'CmdOrCtrl+D',
          click: () => mainWindow.webContents.send('toggle-dark-mode')
        },
        {
          label: 'Swap Panels',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => mainWindow.webContents.send('swap-panels')
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'History',
      submenu: [
        {
          label: 'Show History',
          accelerator: 'CmdOrCtrl+H',
          click: () => mainWindow.webContents.send('show-history')
        },
        {
          label: 'Clear History',
          click: () => mainWindow.webContents.send('clear-history')
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Markdownizr',
              message: 'Markdownizr',
              detail: 'Convert HTML to Markdown in real-time.\n\nVersion: 1.0.0\nPowered by Turndown & Marked'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

/**
 * File Operations
 */

/**
 * Open HTML file dialog and load content
 * Handles file reading errors gracefully
 */
async function openHTMLFile() {
  if (!mainWindow) {
    console.error('Main window not available');
    return;
  }

  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'HTML Files', extensions: ['html', 'htm'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      
      // Check file exists and is readable
      if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist');
      }
      
      const stats = fs.statSync(filePath);
      if (stats.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File is too large (max 10MB)');
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      mainWindow.webContents.send('load-html', content);
    }
  } catch (error) {
    console.error('Error opening HTML file:', error);
    dialog.showErrorBox('Error', `Failed to open file: ${error.message}`);
  }
}

/**
 * Save markdown file dialog
 * Requests content from renderer and saves to disk
 */
async function saveMarkdownFile() {
  if (!mainWindow) {
    console.error('Main window not available');
    return;
  }

  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath: 'output.md',
      filters: [
        { name: 'Markdown Files', extensions: ['md', 'markdown'] },
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result.canceled && result.filePath) {
      // Request markdown content from renderer
      mainWindow.webContents.send('request-markdown-content', result.filePath);
    }
  } catch (error) {
    console.error('Error in save dialog:', error);
    dialog.showErrorBox('Error', `Failed to save: ${error.message}`);
  }
}

/**
 * IPC Handlers
 */

/**
 * Handle save markdown content from renderer
 * Writes content to disk and shows success/error dialog
 */
ipcMain.on('save-markdown-content', (event, filePath, content) => {
  try {
    // Validate inputs
    if (!filePath || typeof filePath !== 'string') {
      throw new Error('Invalid file path');
    }
    if (typeof content !== 'string') {
      throw new Error('Invalid content');
    }

    // Write file with UTF-8 encoding
    fs.writeFileSync(filePath, content, 'utf8');
    
    // Show success message
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Success',
      message: 'Markdown saved successfully!',
      detail: `File: ${path.basename(filePath)}`
    });
  } catch (error) {
    console.error('Error saving markdown:', error);
    dialog.showErrorBox('Error', `Failed to save file: ${error.message}`);
  }
});

/**
 * Application Lifecycle
 */

// Create window when app is ready
app.whenReady().then(() => {
  createWindow();

  // macOS: Re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}).catch(err => {
  console.error('Failed to start app:', err);
  app.quit();
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app errors
app.on('render-process-gone', (event, webContents, details) => {
  console.error('Render process gone:', details);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  dialog.showErrorBox('Unexpected Error', `An error occurred: ${error.message}`);
});

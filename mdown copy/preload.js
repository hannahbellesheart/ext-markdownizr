/**
 * Markdownizr - Preload Script
 * Secure IPC bridge between main and renderer processes
 * 
 * This script runs in a privileged context with access to Node.js APIs
 * while the renderer runs in an isolated context for security.
 * 
 * Uses contextBridge to safely expose IPC methods to the renderer.
 */

const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose secure electron API to renderer process
 * All IPC communication goes through this bridge
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Register listeners for messages from main process
   * Each listener is wrapped to ensure proper cleanup and security
   */
  
  // Clear all content
  onClearAll: (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    ipcRenderer.on('clear-all', callback);
  },
  
  // Toggle dark mode
  onToggleDarkMode: (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    ipcRenderer.on('toggle-dark-mode', callback);
  },
  
  // Swap input/output panels
  onSwapPanels: (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    ipcRenderer.on('swap-panels', callback);
  },
  
  // Show conversion history
  onShowHistory: (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    ipcRenderer.on('show-history', callback);
  },
  
  // Clear conversion history
  onClearHistory: (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    ipcRenderer.on('clear-history', callback);
  },
  
  // Load HTML content from file
  onLoadHTML: (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    ipcRenderer.on('load-html', callback);
  },
  
  // Request markdown content for saving
  onRequestMarkdownContent: (callback) => {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    ipcRenderer.on('request-markdown-content', callback);
  },
  
  /**
   * Send markdown content to main process for saving
   * @param {string} filePath - Destination file path
   * @param {string} content - Markdown content to save
   */
  saveMarkdownContent: (filePath, content) => {
    // Validate inputs before sending
    if (typeof filePath !== 'string' || !filePath) {
      throw new Error('Invalid file path');
    }
    if (typeof content !== 'string') {
      throw new Error('Invalid content');
    }
    ipcRenderer.send('save-markdown-content', filePath, content);
  }
});

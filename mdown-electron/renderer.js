/**
 * Markdownizr - Renderer Process
 * Main application logic for HTML to Markdown conversion
 * 
 * Features:
 * - Real-time HTML to Markdown conversion with debouncing
 * - Copy to clipboard functionality
 * - Markdown preview modal
 * - Conversion history (localStorage)
 * - Dark mode toggle
 * - Character and word count
 * - File import/export via IPC
 */

/**
 * Initialize Turndown converter with custom options
 * Turndown converts HTML to Markdown with configurable rules
 */
const turndownService = new TurndownService({
    headingStyle: 'atx',           // Use # style headings
    codeBlockStyle: 'fenced',      // Use ``` style code blocks
    emDelimiter: '*',              // Use * for emphasis
    strongDelimiter: '**',         // Use ** for strong
    linkStyle: 'inlined'           // Use [text](url) style links
});

/**
 * Custom rule: Strip container elements but keep their content
 * These elements are removed but their inner HTML is preserved
 */
turndownService.addRule('stripElements', {
    filter: ['div', 'span', 'small', 'aside', 'section', 'article', 'header', 'footer', 'hgroup', 'time', 'address', 'button'],
    replacement: function (content) {
        return content;  // Keep inner content, remove wrapper
    }
});

/**
 * Custom rule: Delete elements completely including content
 * These elements and their content are removed entirely
 */
turndownService.addRule('deleteElements', {
    filter: ['script', 'noscript', 'canvas', 'embed', 'object', 'param', 'svg', 'source', 'nav', 'iframe'],
    replacement: function () {
        return '';  // Remove element and all content
    }
});

/**
 * DOM Element References
 * Cache DOM queries for better performance
 */
const htmlInput = document.getElementById('html-input');
const markdownOutput = document.getElementById('markdown-output');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');

// Validate critical elements exist
if (!htmlInput || !markdownOutput) {
    console.error('Critical DOM elements not found');
    throw new Error('Required elements missing from DOM');
}

/**
 * Conversion History Storage
 * Stores last N conversions in localStorage for quick access
 */
const MAX_HISTORY = 10;
let conversionHistory = [];

// Load history from localStorage with error handling
try {
    const stored = localStorage.getItem('conversionHistory');
    conversionHistory = stored ? JSON.parse(stored) : [];
    
    // Validate history structure
    if (!Array.isArray(conversionHistory)) {
        console.warn('Invalid history format, resetting');
        conversionHistory = [];
    }
} catch (error) {
    console.error('Failed to load conversion history:', error);
    conversionHistory = [];
}

/**
 * Core Functions
 */

/**
 * Debounce function for performance optimization
 * Delays function execution until after a specified wait time
 * Prevents excessive conversions during rapid typing
 * 
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Convert HTML to Markdown
 * Main conversion function with error handling
 * Updates UI and saves to history on success
 */
function convertToMarkdown() {
    const htmlContent = htmlInput.value;
    
    try {
        // Perform conversion using Turndown
        const markdown = turndownService.turndown(htmlContent);
        markdownOutput.value = markdown;
        
        // Update character/word count
        updateStats(markdown);
        
        // Save to history if content is meaningful (not empty/whitespace)
        if (htmlContent.trim() && markdown.trim()) {
            saveToHistory(htmlContent, markdown);
        }
    } catch (error) {
        // Display user-friendly error message
        markdownOutput.value = 'Error converting HTML to Markdown. Please check your input.';
        console.error('Conversion error:', error);
        
        // Show error toast
        if (typeof showToast === 'function') {
            showToast('Conversion failed. Check console for details.', 'error');
        }
    }
}

// Debounced version for real-time input (300ms delay)
const debouncedConvert = debounce(convertToMarkdown, 300);

/**
 * Update character and word count display
 * Handles empty strings and provides grammatically correct labels
 * 
 * @param {string} text - Text to analyze
 */
function updateStats(text) {
    if (!charCount || !wordCount) {
        return;  // Elements not available
    }
    
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    // Update with proper pluralization
    charCount.textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
    wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
}

/**
 * Save conversion to history
 * Maintains a rolling list of the last MAX_HISTORY conversions
 * Removes duplicates and stores in localStorage
 * 
 * @param {string} html - Original HTML content
 * @param {string} markdown - Converted Markdown content
 */
function saveToHistory(html, markdown) {
    try {
        const entry = {
            html,
            markdown,
            timestamp: Date.now(),
            preview: markdown.substring(0, 100)  // First 100 chars for preview
        };
        
        // Remove duplicates (same markdown content)
        conversionHistory = conversionHistory.filter(item => 
            item.markdown !== markdown
        );
        
        // Add new entry to front of array
        conversionHistory.unshift(entry);
        
        // Keep only last MAX_HISTORY items
        conversionHistory = conversionHistory.slice(0, MAX_HISTORY);
        
        // Persist to localStorage
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    } catch (error) {
        console.error('Failed to save history:', error);
        // Non-critical error, continue without history
    }
}

// Convert initial content on page load
document.addEventListener('DOMContentLoaded', function() {
    convertToMarkdown();
});

// Listen for input changes and convert in real-time (debounced)
htmlInput.addEventListener('input', debouncedConvert);
htmlInput.addEventListener('paste', function() {
    setTimeout(convertToMarkdown, 10);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to manually trigger conversion
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        convertToMarkdown();
    }
    // Escape to close modals
    if (e.key === 'Escape') {
        closeModal();
        closeHistoryModal();
    }
    // Ctrl/Cmd + C when markdown is focused = auto copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === markdownOutput) {
        copyToClipboard();
    }
});

// Modal functionality
const modal = document.getElementById('preview-modal');
const previewBtn = document.getElementById('preview-btn');
const closeBtn = document.getElementById('close-modal');
const previewOutput = document.getElementById('preview-output');

function openModal() {
    const markdown = markdownOutput.value;
    
    if (!markdown.trim()) {
        previewOutput.innerHTML = '<p class="empty">No markdown to preview yet. Start typing in the HTML box!</p>';
        previewOutput.classList.add('empty');
    } else {
        // Convert markdown to HTML using Marked
        const html = marked.parse(markdown);
        previewOutput.innerHTML = html;
        previewOutput.classList.remove('empty');
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for modal
previewBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

/**
 * Clipboard Functionality
 */

const copyBtn = document.getElementById('copy-btn');

if (copyBtn) {
    copyBtn.addEventListener('click', copyToClipboard);
}

/**
 * Copy markdown content to clipboard
 * Provides visual feedback and handles errors gracefully
 */
function copyToClipboard() {
    const markdown = markdownOutput.value;
    
    // Validate content exists
    if (!markdown.trim()) {
        showToast('Nothing to copy!', 'error');
        return;
    }
    
    // Use modern Clipboard API
    navigator.clipboard.writeText(markdown).then(() => {
        // Update button appearance
        if (copyBtn) {
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<span class="icon">✓</span> Copied!';
        }
        
        showToast('Markdown copied to clipboard!', 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            if (copyBtn) {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = '<span class="icon">📋</span> Copy';
            }
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy to clipboard', 'error');
        
        // Fallback: try execCommand (older browsers)
        try {
            markdownOutput.select();
            document.execCommand('copy');
            showToast('Copied using fallback method', 'success');
        } catch (fallbackError) {
            console.error('Fallback copy failed:', fallbackError);
        }
    });
}

/**
 * UI Feedback
 */

/**
 * Show toast notification
 * Non-intrusive popup message that auto-dismisses
 * 
 * @param {string} message - Message to display
 * @param {string} type - Toast type: 'success' or 'error'
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    
    if (!toast) {
        console.warn('Toast element not found');
        return;
    }
    
    // Set message and style
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Clear All functionality
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    if (confirm('Clear all content?')) {
        htmlInput.value = '';
        markdownOutput.value = '';
        updateStats('');
        showToast('Content cleared', 'success');
    }
});

// Swap Panels functionality
const swapBtn = document.getElementById('swap-btn');
swapBtn.addEventListener('click', () => {
    const htmlValue = htmlInput.value;
    const markdownValue = markdownOutput.value;
    htmlInput.value = markdownValue;
    markdownOutput.value = htmlValue;
    showToast('Panels swapped!', 'success');
});

// Dark Mode functionality
const darkModeBtn = document.getElementById('dark-mode-btn');
const themeLabel = document.getElementById('theme-label');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
    themeLabel.textContent = isDarkMode ? 'Light' : 'Dark';
    darkModeBtn.querySelector('.icon').textContent = isDarkMode ? '☀️' : '🌙';
    showToast(`${isDarkMode ? 'Dark' : 'Light'} mode enabled`, 'success');
}

// Apply saved theme on load
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeLabel.textContent = 'Light';
    darkModeBtn.querySelector('.icon').textContent = '☀️';
}

darkModeBtn.addEventListener('click', toggleDarkMode);

// History Modal functionality
const historyModal = document.getElementById('history-modal');
const historyBtn = document.getElementById('history-btn');
const closeHistoryBtn = document.getElementById('close-history-modal');
const historyList = document.getElementById('history-list');

function showHistory() {
    if (conversionHistory.length === 0) {
        historyList.innerHTML = '<div class="history-empty">No conversion history yet. Start converting some HTML!</div>';
    } else {
        historyList.innerHTML = conversionHistory.map((item, index) => `
            <div class="history-item" data-index="${index}">
                <div class="history-item-date">${new Date(item.timestamp).toLocaleString()}</div>
                <div class="history-item-preview">${item.preview}${item.markdown.length > 100 ? '...' : ''}</div>
            </div>
        `).join('');
        
        // Add click handlers to history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const entry = conversionHistory[index];
                htmlInput.value = entry.html;
                markdownOutput.value = entry.markdown;
                updateStats(entry.markdown);
                closeHistoryModal();
                showToast('Loaded from history', 'success');
            });
        });
    }
    
    historyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeHistoryModal() {
    historyModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

historyBtn.addEventListener('click', showHistory);
closeHistoryBtn.addEventListener('click', closeHistoryModal);

historyModal.addEventListener('click', function(e) {
    if (e.target === historyModal) {
        closeHistoryModal();
    }
});

/**
 * Electron IPC Integration
 * Handle messages from main process (menu commands, file operations)
 * Only available when running in Electron, gracefully ignored in browser
 */
if (window.electronAPI) {
    try {
        /**
         * Handle Clear All command from menu
         */
        window.electronAPI.onClearAll(() => {
            htmlInput.value = '';
            markdownOutput.value = '';
            updateStats('');
            showToast('Content cleared', 'success');
        });
        
        /**
         * Handle Toggle Dark Mode command from menu
         */
        window.electronAPI.onToggleDarkMode(() => {
            toggleDarkMode();
        });
        
        /**
         * Handle Swap Panels command from menu
         */
        window.electronAPI.onSwapPanels(() => {
            const htmlValue = htmlInput.value;
            const markdownValue = markdownOutput.value;
            htmlInput.value = markdownValue;
            markdownOutput.value = htmlValue;
            showToast('Panels swapped!', 'success');
        });
        
        /**
         * Handle Show History command from menu
         */
        window.electronAPI.onShowHistory(() => {
            showHistory();
        });
        
        /**
         * Handle Clear History command from menu
         */
        window.electronAPI.onClearHistory(() => {
            if (confirm('Clear all conversion history?')) {
                conversionHistory = [];
                try {
                    localStorage.setItem('conversionHistory', '[]');
                    showToast('History cleared', 'success');
                } catch (error) {
                    console.error('Failed to clear history:', error);
                    showToast('Failed to clear history', 'error');
                }
            }
        });
        
        /**
         * Handle Load HTML file content from main process
         * Triggered when user opens a file via menu
         */
        window.electronAPI.onLoadHTML((event, content) => {
            if (typeof content === 'string') {
                htmlInput.value = content;
                convertToMarkdown();
                showToast('HTML file loaded', 'success');
            } else {
                console.error('Invalid HTML content received');
                showToast('Failed to load HTML file', 'error');
            }
        });
        
        /**
         * Handle request for markdown content to save
         * Sends current markdown back to main process for file writing
         */
        window.electronAPI.onRequestMarkdownContent((event, filePath) => {
            const content = markdownOutput.value;
            
            if (!content.trim()) {
                showToast('No content to save', 'error');
                return;
            }
            
            try {
                window.electronAPI.saveMarkdownContent(filePath, content);
            } catch (error) {
                console.error('Failed to send markdown content:', error);
                showToast('Failed to save file', 'error');
            }
        });
        
        console.log('✓ Electron IPC handlers registered');
    } catch (error) {
        console.error('Failed to register IPC handlers:', error);
    }
} else {
    console.log('Running in browser mode (Electron API not available)');
}

// Application initialization complete
console.log('🎉 Markdownizr initialized successfully!');

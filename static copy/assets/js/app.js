// Initialize Turndown converter with custom options
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined'
});

// Add custom rules to filter out unwanted elements
turndownService.addRule('stripElements', {
    filter: ['div', 'span', 'small', 'aside', 'section', 'article', 'header', 'footer', 'hgroup', 'time', 'address', 'button'],
    replacement: function (content) {
        return content;
    }
});

turndownService.addRule('deleteElements', {
    filter: ['script', 'noscript', 'canvas', 'embed', 'object', 'param', 'svg', 'source', 'nav', 'iframe'],
    replacement: function () {
        return '';
    }
});

// Get DOM elements
const htmlInput = document.getElementById('html-input');
const markdownOutput = document.getElementById('markdown-output');

// Function to convert HTML to Markdown
function convertToMarkdown() {
    const htmlContent = htmlInput.value;
    try {
        const markdown = turndownService.turndown(htmlContent);
        markdownOutput.value = markdown;
    } catch (error) {
        markdownOutput.value = 'Error converting HTML to Markdown. Please check your input.';
        console.error('Conversion error:', error);
    }
}

// Convert initial content on page load
document.addEventListener('DOMContentLoaded', function() {
    convertToMarkdown();
});

// Listen for input changes and convert in real-time
htmlInput.addEventListener('input', convertToMarkdown);
htmlInput.addEventListener('paste', function() {
    // Small delay to ensure paste content is available
    setTimeout(convertToMarkdown, 10);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to manually trigger conversion
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        convertToMarkdown();
    }
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
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

console.log('Markdownizr Demo initialized! 🎉');

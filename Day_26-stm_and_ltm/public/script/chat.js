// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const themeToggle = document.getElementById('themeToggle');
const chatArea = document.querySelector('.chat-area');

// Sidebar functionality
function toggleSidebar() {
    sidebar.classList.toggle('open');
    chatArea.classList.toggle('sidebar-open');
}

function closeSidebarFunc() {
    sidebar.classList.remove('open');
    chatArea.classList.remove('sidebar-open');
}

// Event Listeners
menuBtn.addEventListener('click', toggleSidebar);
closeSidebar.addEventListener('click', closeSidebarFunc);

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        closeSidebarFunc();
    }
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = newTheme;
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
});

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + B to toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
    
    // Escape key to close sidebar
    if (e.key === 'Escape') {
        closeSidebarFunc();
    }
});

// Chat functionality (placeholder for future implementation)
const chatInput = document.querySelector('.input-box input');
const sendButton = document.querySelector('.input-box button');

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add message to chat (placeholder)
        console.log('Sending message:', message);
        chatInput.value = '';
    }
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize chat list items
const chatListItems = document.querySelectorAll('.chat-list li');
chatListItems.forEach((item, index) => {
    if (index === 0) {
        item.addEventListener('click', () => {
            // New chat functionality
            console.log('Starting new chat');
        });
    } else {
        item.addEventListener('click', () => {
            // Load previous chat
            console.log(`Loading chat ${index}`);
        });
    }
});



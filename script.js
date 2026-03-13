// Get elements
const supportBtn = document.getElementById('supportBtn');
const supportPanel = document.getElementById('supportPanel');
const closeBtn = document.getElementById('closePanel');
const overlay = document.getElementById('overlay');

// Function to open panel
function openPanel() {
    supportPanel.classList.add('open');
    overlay.classList.add('show');
}

// Function to close panel
function closePanel() {
    supportPanel.classList.remove('open');
    overlay.classList.remove('show');
}

// Event listeners
supportBtn.addEventListener('click', openPanel);
closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

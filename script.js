// ==================== SLIDING PANEL CODE (keep this) ====================
const supportBtn = document.getElementById('supportBtn');
const supportPanel = document.getElementById('supportPanel');
const closeBtn = document.getElementById('closePanel');
const overlay = document.getElementById('overlay');

function openPanel() {
    supportPanel.classList.add('open');
    overlay.classList.add('show');
}

function closePanel() {
    supportPanel.classList.remove('open');
    overlay.classList.remove('show');
}

supportBtn.addEventListener('click', openPanel);
closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

// ==================== NEW: CATEGORY GRID CODE ====================
async function loadCategories() {
    try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        const grid = document.getElementById('category-grid');
        if (!grid) return;

        // Clear any existing content
        grid.innerHTML = '';

        // Loop through categories and create card HTML
        data.categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            // We'll add clickable link later
            card.innerHTML = `
                <h3>${cat.name}</h3>
                <p>${cat.count} Recipes</p>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load categories when the page loads
loadCategories();

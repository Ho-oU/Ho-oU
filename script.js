// ==================== SLIDING PANEL CODE (works on all pages) ====================
const supportBtn = document.getElementById('supportBtn');
const supportPanel = document.getElementById('supportPanel');
const closeBtn = document.getElementById('closePanel');
const overlay = document.getElementById('overlay');

if (supportBtn) {
    supportBtn.addEventListener('click', function() {
        supportPanel.classList.add('open');
        overlay.classList.add('show');
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        supportPanel.classList.remove('open');
        overlay.classList.remove('show');
    });
}

if (overlay) {
    overlay.addEventListener('click', function() {
        supportPanel.classList.remove('open');
        overlay.classList.remove('show');
    });
}

// ==================== HOME PAGE (index.html) ====================
async function loadCategories() {
    try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        const grid = document.getElementById('category-grid');
        if (!grid) return;

        grid.innerHTML = '';
        data.categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            // Make the card clickable – go to category.html with the category id
            card.onclick = function() {
                window.location.href = `category.html?cat=${cat.id}`;
            };
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

// ==================== CATEGORY PAGE (category.html) ====================
async function loadCategoryRecipes() {
    // Get category id from URL (e.g., ?cat=chicken)
    const urlParams = new URLSearchParams(window.location.search);
    const catId = urlParams.get('cat');
    if (!catId) {
        document.getElementById('category-title').textContent = 'Category not found';
        return;
    }

    try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        const category = data.categories.find(c => c.id === catId);
        if (!category) {
            document.getElementById('category-title').textContent = 'Category not found';
            return;
        }

        // Set the page title
        document.getElementById('category-title').textContent = `${category.name} Recipes`;

        const container = document.getElementById('recipe-list');
        if (!container) return;

        // If no recipes yet
        if (!category.recipes || category.recipes.length === 0) {
            container.innerHTML = '<p>No recipes yet.</p>';
            return;
        }

        // Create recipe cards
        container.innerHTML = '';
        category.recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-item';
            // We'll make it clickable later to go to recipe detail
            card.innerHTML = `
                <h3>${recipe.name}</h3>
                <p>${recipe.time} | ${recipe.servings} serves | ${recipe.calories} cal</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

// ==================== RUN THE RIGHT FUNCTION BASED ON PAGE ====================
// Check which page we're on by looking at the filename
if (window.location.pathname.includes('category.html')) {
    // We are on category.html
    loadCategoryRecipes();
} else {
    // Assume we are on index.html (or any other page)
    loadCategories();
}

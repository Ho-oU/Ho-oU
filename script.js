// ==================== SLIDING PANEL CODE ====================
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

// ==================== HOME PAGE ====================
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

// ==================== CATEGORY PAGE ====================
async function loadCategoryRecipes() {
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

        document.getElementById('category-title').textContent = `${category.name} Recipes`;

        const container = document.getElementById('recipe-list');
        if (!container) return;

        if (!category.recipes || category.recipes.length === 0) {
            container.innerHTML = '<p>No recipes yet.</p>';
            return;
        }

        container.innerHTML = '';
        category.recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-item';
            // Make recipe clickable – go to recipe.html with category and recipe id
            card.onclick = function() {
                window.location.href = `recipe.html?cat=${catId}&recipe=${recipe.id}`;
            };
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

// ==================== RECIPE DETAIL PAGE ====================
async function loadRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const catId = urlParams.get('cat');
    const recipeId = urlParams.get('recipe');
    if (!catId || !recipeId) {
        document.getElementById('recipe-title').textContent = 'Recipe not found';
        return;
    }

    try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        const category = data.categories.find(c => c.id === catId);
        if (!category) {
            document.getElementById('recipe-title').textContent = 'Recipe not found';
            return;
        }
        const recipe = category.recipes.find(r => r.id === recipeId);
        if (!recipe) {
            document.getElementById('recipe-title').textContent = 'Recipe not found';
            return;
        }

        // Set page title
        document.getElementById('recipe-title').textContent = recipe.name;

        // Set meta info
        const metaDiv = document.getElementById('recipe-meta');
        metaDiv.innerHTML = `
            <span>⏱️ ${recipe.time}</span>
            <span>🍽️ ${recipe.servings} serves</span>
            <span>🔥 ${recipe.calories} cal</span>
        `;

        // Build ingredients HTML (with sections)
        let ingredientsHtml = '';
        if (recipe.ingredients && recipe.ingredients.length > 0) {
            recipe.ingredients.forEach(section => {
                ingredientsHtml += `<div class="ingredient-section">`;
                if (section.section) {
                    ingredientsHtml += `<h3>${section.section}</h3>`;
                }
                ingredientsHtml += `<ul>`;
                section.items.forEach(item => {
                    ingredientsHtml += `<li>${item}</li>`;
                });
                ingredientsHtml += `</ul></div>`;
            });
        } else {
            ingredientsHtml = '<p>No ingredients listed.</p>';
        }
        document.getElementById('ingredients').innerHTML = ingredientsHtml;

        // Instructions (convert newlines to <br> for display)
        const instructionsText = recipe.instructions || 'No instructions provided.';
        document.getElementById('instructions').innerHTML = `<div class="instructions">${instructionsText.replace(/\n/g, '<br>')}</div>`;

    } catch (error) {
        console.error('Error loading recipe:', error);
    }
}

// ==================== PAGE DETECTION ====================
if (window.location.pathname.includes('recipe.html')) {
    loadRecipe();
} else if (window.location.pathname.includes('category.html')) {
    loadCategoryRecipes();
} else {
    loadCategories();
}

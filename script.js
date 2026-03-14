// ==================== HOME PAGE CATEGORY GRID ====================
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
            card.onclick = () => {
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
            card.onclick = () => {
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

        document.getElementById('recipe-title').textContent = recipe.name;

        const metaDiv = document.getElementById('recipe-meta');
        metaDiv.innerHTML = `
            <span>⏱️ ${recipe.time}</span>
            <span>🍽️ ${recipe.servings} serves</span>
            <span>🔥 ${recipe.calories} cal</span>
        `;

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

        const instructionsText = recipe.instructions || 'No instructions provided.';
        document.getElementById('instructions').innerHTML = `<div class="instructions">${instructionsText.replace(/\n/g, '<br>')}</div>`;

    } catch (error) {
        console.error('Error loading recipe:', error);
    }
}

// ==================== FOOTER SUPPORT ITEMS ====================
function setupSupportItems() {
    const contact = document.getElementById('contact');
    if (contact) {
        contact.addEventListener('click', () => {
            window.location.href = 'mailto:support@cookbook.com?subject=Hello';
        });
    }

    const rate = document.getElementById('rate');
    if (rate) {
        rate.addEventListener('click', () => {
            window.open('https://play.google.com/store/apps/details?id=com.example', '_blank');
        });
    }

    const share = document.getElementById('share');
    if (share) {
        share.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Cookbook Recipes',
                    text: 'Check out this awesome cookbook app!',
                    url: window.location.href
                }).catch(() => {});
            } else {
                prompt('Copy this link to share:', window.location.href);
            }
        });
    }

    const more = document.getElementById('more');
    if (more) {
        more.addEventListener('click', () => {
            window.open('https://play.google.com/store/apps/developer?id=YourName', '_blank');
        });
    }

    const privacy = document.getElementById('privacy');
    if (privacy) {
        privacy.addEventListener('click', () => {
            window.open('privacy.html', '_blank');
        });
    }

    const exit = document.getElementById('exit');
    if (exit) {
        exit.addEventListener('click', () => {
            if (confirm('Exit app?')) {
                alert('Thanks for using Cookbook!');
            }
        });
    }
}

// ==================== RUN APPROPRIATE FUNCTION ====================
if (window.location.pathname.includes('recipe.html')) {
    loadRecipe();
} else if (window.location.pathname.includes('category.html')) {
    loadCategoryRecipes();
} else {
    loadCategories();
}

// Also set up support items on every page
setupSupportItems();

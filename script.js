async function loadMasterLists() {
    const res = await fetch('data/data.json');
    const data = await res.json();
    const container = document.getElementById('lists-container');
    if (!container) return;
    container.innerHTML = data.lists.map(list => `
        <div class="list-card" onclick="location.href='list.html?id=${list.id}'">
            <h3>${list.name}</h3>
            <p>Modified ${list.modified}</p>
        </div>
    `).join('');
}

async function loadListItems() {
    const urlParams = new URLSearchParams(window.location.search);
    const listId = urlParams.get('id');
    if (!listId) { document.getElementById('list-title').textContent = 'List not found'; return; }
    const res = await fetch('data/data.json');
    const data = await res.json();
    const list = data.lists.find(l => l.id === listId);
    if (!list) { document.getElementById('list-title').textContent = 'List not found'; return; }
    document.getElementById('list-title').textContent = list.name;
    const container = document.getElementById('items-container');
    container.innerHTML = list.items.map(item => `
        <div class="item-card">
            <a href="${item.url}" target="_blank">${item.name}</a>
            <span class="date">Modified ${item.modified}</span>
        </div>
    `).join('');
}

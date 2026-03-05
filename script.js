const products = [
    { id: 1, name: 'Mountain Wallpaper', price: 4.99, image: 'https://via.placeholder.com/300x200?text=Mountain', description: 'Schönes Berg-Wallpaper in HD.', category: 'Wallpapers', rating: 4.5, downloadLink: '#' },
    { id: 2, name: 'Ocean Wallpaper', price: 4.99, image: 'https://via.placeholder.com/300x200?text=Ocean', description: 'Entspannendes Ozean-Wallpaper.', category: 'Wallpapers', rating: 4.7, downloadLink: '#' },
    { id: 3, name: 'City Skyline Wallpaper', price: 5.99, image: 'https://via.placeholder.com/300x200?text=City', description: 'Moderne Stadt-Skyline in 4K.', category: 'Wallpapers', rating: 4.3, downloadLink: '#' },
    { id: 4, name: 'Abstract Wallpaper', price: 3.99, image: 'https://via.placeholder.com/300x200?text=Abstract', description: 'Künstlerisches abstraktes Design.', category: 'Wallpapers', rating: 4.0, downloadLink: '#' },
    { id: 5, name: 'Nature Wallpaper Pack', price: 9.99, image: 'https://via.placeholder.com/300x200?text=Nature+Pack', description: 'Pack mit 5 Natur-Wallpapers.', category: 'Wallpapers', rating: 4.8, downloadLink: '#' },
    { id: 6, name: 'Tech Icon Set', price: 7.99, image: 'https://via.placeholder.com/300x200?text=Tech+Icons', description: '20 moderne Tech-Icons in SVG.', category: 'Icons', rating: 4.6, downloadLink: '#' },
    { id: 7, name: 'Social Media Icons', price: 6.99, image: 'https://via.placeholder.com/300x200?text=Social+Icons', description: 'Icons für alle gängigen Social-Media-Plattformen.', category: 'Icons', rating: 4.4, downloadLink: '#' },
    { id: 8, name: 'Business Card Template', price: 8.99, image: 'https://via.placeholder.com/300x200?text=Business+Card', description: 'Professionelle Visitenkarten-Vorlage in PSD.', category: 'Templates', rating: 4.2, downloadLink: '#' },
    { id: 9, name: 'Resume Template', price: 5.99, image: 'https://via.placeholder.com/300x200?text=Resume', description: 'Moderner Lebenslauf-Template.', category: 'Templates', rating: 4.5, downloadLink: '#' },
    { id: 10, name: 'Flyer Template Pack', price: 12.99, image: 'https://via.placeholder.com/300x200?text=Flyer+Pack', description: '5 kreative Flyer-Templates.', category: 'Templates', rating: 4.7, downloadLink: '#' },
];

let cart = [];
let exchangeRates = {};
let currentCategory = 'all';
let currentSearch = '';

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadExchangeRates();
    setupEventListeners();
});

function loadProducts() {
    displayProducts(products);
}

function displayProducts(productList) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4 col-sm-6';
        productDiv.innerHTML = `
            <div class="product card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="mb-2">
                        <span class="badge bg-secondary">${product.category}</span>
                        <span class="ms-2">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})</span>
                    </div>
                    <p class="card-text fw-bold">${product.price.toFixed(2)} EUR</p>
                    <button class="btn btn-primary btn-add-cart mt-auto" onclick="addToCart(${product.id})">In den Warenkorb</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
}

function loadExchangeRates() {
    fetch('https://api.exchangerate-api.com/v4/latest/EUR')
        .then(response => response.json())
        .then(data => {
            exchangeRates = data.rates;
        })
        .catch(error => console.error('Fehler beim Laden der Wechselkurse:', error));
}

function setupEventListeners() {
    document.getElementById('checkout-btn').addEventListener('click', showCheckout);
    document.getElementById('back-to-cart').addEventListener('click', showCart);
    document.getElementById('currency-select').addEventListener('change', updateConvertedTotal);
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            alert(`Bezahlung mit ${e.target.dataset.provider} ausgewählt. Download-Link wurde an Ihre E-Mail gesendet! (Simuliert)`);
        });
    });
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Bestellung erfolgreich! Ihre digitalen Produkte wurden heruntergeladen. (Simuliert)');
    });
}

function searchProducts(event) {
    event.preventDefault();
    currentSearch = document.getElementById('search-input').value.toLowerCase();
    filterProducts();
}

function filterByCategory(category) {
    currentCategory = category;
    filterProducts();
}

function filterProducts() {
    let filtered = products;
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (currentSearch) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(currentSearch) || p.description.toLowerCase().includes(currentSearch));
    }
    displayProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    updateCartDisplay();
    showNotification(`${product.name} wurde zum Warenkorb hinzugefügt!`);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong> (x${item.quantity})<br>
                <small>${item.description}</small>
            </div>
            <div class="text-end">
                ${(item.price * item.quantity).toFixed(2)} EUR
                <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">Entfernen</button>
            </div>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    document.getElementById('total-price').textContent = total.toFixed(2);
    updateConvertedTotal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function showProducts() {
    document.getElementById('products').style.display = 'block';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'none';
}

function showCart() {
    document.getElementById('products').style.display = 'none';
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
}

function showCheckout() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';
    updateConvertedTotal();
}

function updateConvertedTotal() {
    const currency = document.getElementById('currency-select').value;
    const totalEUR = parseFloat(document.getElementById('total-price').textContent);
    const totalConverted = totalEUR * (exchangeRates[currency] || 1);

    document.getElementById('selected-currency-checkout3').textContent = currency;
    document.getElementById('converted-total').textContent = totalConverted.toFixed(2);
}

function showNotification(message) {
    // Einfache Benachrichtigung
    alert(message);
}

function subscribeNewsletter(event) {
    event.preventDefault();
    alert('Vielen Dank für Ihre Anmeldung zum Newsletter!');
}
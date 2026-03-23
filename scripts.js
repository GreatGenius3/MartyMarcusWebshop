// Funktion f?r att h?mta produkter fr?n Fake Store API
// Anv?nd async/await f?r att hantera asynkrona operationer
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Fel vid h?mtning av produkter:', error);
    }
}

// Funktion f?r att visa produkter p? sidan
function displayProducts(products) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // T?m den befintliga listan

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
            <button>Add to Cart</button>
        `;

        productList.appendChild(productDiv);
    });
}

// K?r funktionen n?r sidan laddas
document.addEventListener('DOMContentLoaded', fetchProducts);

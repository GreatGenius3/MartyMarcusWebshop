// Funktion får att hämta produkter från Fake Store API
// Använd async/await för att hantera asynkrona operationer
async function fetchProducts()
{
    try 
    {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } 
    catch (error)
    {
        console.error('Fel vid hämtning av produkter:', error);
    }
}

// Funktion för att visa produkter på sidan
function displayProducts(products)
{
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Töm den befintliga listan

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

// Kör funktionen när sidan laddas
document.addEventListener('DOMContentLoaded', fetchProducts);

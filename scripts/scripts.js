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
    // vi kollar först om sektionen finns på sidan innan vi försöker lägga in produkter
    const productList = document.querySelector('.product-list');
    if (!productList)
         return;

    productList.innerHTML = ''; // Töm den befintliga listan
    productList.classList.add('row');

    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-lg-4 mb-4';

        const productDiv = document.createElement('div');
        productDiv.className = 'product card h-100 shadow-sm';

        productDiv.innerHTML = `
            <img class="card-img-top product-image" src="${product.image}" alt="${product.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text text-success fw-bold">$${product.price}</p>
                <button class="btn btn-primary mt-auto">Add to Cart</button>
            </div>
        `;

        col.appendChild(productDiv);
        productList.appendChild(col);
    });
}

// Kör funktionen när sidan laddas
document.addEventListener('DOMContentLoaded', fetchProducts);

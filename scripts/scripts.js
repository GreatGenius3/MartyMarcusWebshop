// Funktion för att hämta produkter med fallback
// Använder fakestoreapi.com först, vid fel provar dummyjson.com
async function fetchProducts() {
    let apiSource = ''; // Lokal variabel för att spåra API-källa
    
    try {
        // Försök först med fakestoreapi.com
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Fortsätt att ladda artiklar om hämtningen lyckades
        apiSource = 'fakestoreapi';
        const products = await response.json();
        displayProducts(products, apiSource);
        console.log('Produkter hämtade från fakestoreapi.com');
    }
    catch (error) {
        console.warn('Kunde inte hämta från fakestoreapi.com, försöker dummyjson.com:', error.message);
        try {
            // Skulle nu laddningen till https://fakestoreapi.com/products misslyckas så provar
            // Vi ett annat alternativ
            // Fallback till dummyjson.com
            const response = await fetch('https://dummyjson.com/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            apiSource = 'dummyjson';
            const data = await response.json();
            displayProducts(data.products, apiSource); // dummyjson returnerar {products: [...]}
            console.log('Produkter hämtade från dummyjson.com');
        }
        catch (fallbackError) {
            console.error('Kunde inte hämta produkter från någon källa:', fallbackError);
            // Visa felmeddelande för användaren
            const productList = document.querySelector('.product-list');
            if (productList) {
                productList.innerHTML = '<div class="col-12"><div class="alert alert-danger">Kunde inte ladda produkter just nu. Försök igen senare.</div></div>';
            }
        }
    }
}

// Funktion för att visa produkter på sidan
function displayProducts(products, apiSource) 
{
    // vi kollar först om sektionen finns på sidan innan vi försöker lägga in produkter
    const productList = document.querySelector('.product-list');
    if (!productList)
        return;

    productList.innerHTML = ''; // Tömm den befintliga listan
    productList.classList.add('row');

    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-lg-4 mb-4';

        const productDiv = document.createElement('div');
        productDiv.className = 'product card h-100 shadow-sm';

        // Välj rätt bild-fält beroende på API-källa
        const imageUrl = apiSource === 'dummyjson' ? product.thumbnail : product.image;
        
        productDiv.innerHTML = `
            <img class="card-img-top product-image" src="${imageUrl}" alt="${product.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text text-success fw-bold">$${product.price}</p>
                <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${imageUrl}')">Lägg till vara</button>
            </div>
        `;

        // Fluttade detta till en egen funktionsom heter addToCart nedan
        //   const button = productDiv.querySelector("button");
        /// button.addEventListener("click", function() {
         //    localStorage.setItem("valdProdukt", JSON.stringify(product));
         //   window.location.href = "order.html";
         col.appendChild(productDiv);
        productList.appendChild(col);
    });
}

// Funktion för att ta vald produkt i varukorg och skicka till order-sidan
function addToCart(id, title, price, image)
{
    // Spara produktdata i sessionStorage
    const product = { id, title, price, image };
    // sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    sessionStorage.setItem("valdProdukt", JSON.stringify(product));
    
    // Skicka anvأ¤ndaren till order.html
    window.location.href = 'order.html';
}

// Funktion som anropas när vi trycker på beställ knappen
const form = document.querySelector("form");
if (form) {
    document.querySelector("form").addEventListener("submit", function (e) {

        e.preventDefault();
        if (validateAll()) {
            const produkt = JSON.parse(sessionStorage.getItem("valdProdukt"));
            alert(`Tack för din beställning utav ${produkt.title} har tagits emot!`);

            // Vi återvänder till index.html och rensar sessionStorage så att produkten inte
            // finns kvar i varukorgen
            sessionStorage.removeItem('valdProdukt');
            window.location.href = 'index.html';

        };//If stas då produkten hämtas ifall order formuläret fyllt i korrekt.

    });
}

function validateAll() {
    return (
        validateName() &&
        validateEmail() &&
        validateMobil() &&
        validateStreetAdress() &&
        validatePostNumber() &&
        validateLocality()
    );
}

function validateName() {
    const value = document.getElementById("name").value;
    if (value.length < 2 || value.length > 50) {
        alert("Namnet får enbart vara mellan 2 - 50 tecken.")
        return false;
    }
    return true;
}
function validateEmail() {
    const value = document.getElementById("email").value;
    if (!value.includes("@") || value.length > 50) {
        alert("Eposten ska ha @ och får inte vara mer än 50 tecken.")
        return false;
    }
    return true;
}
function validateMobil() {
    const value = document.getElementById("mobile_number").value;
    const regex = /^[0-9\+\s]+$/;
    if (!regex.test(value) || value.length < 3 || value.length > 20) {
        alert("Telefonnumret ffår enbart innehålla siffror, mellanslag och ett plustecken.")
        return false;
    }
    return true;
}
function validateStreetAdress() {
    const value = document.getElementById("street_adress").value;
    if (value.length < 2 || value.length > 20) {
        alert("Adressen får enbart vara mellan 2 till 50 tecken.")
        return false;
    }
    return true;
}
function validatePostNumber() {
    const value = document.getElementById("post_number").value;
    const regex = /^[0-9]{5}$/
    if (!regex.test(value)) {
        alert("Post nummer får max vara 5 siffror långa.")
        return false;
    }
    return true;
}
function validateLocality() {
    const value = document.getElementById("locality").value;
    if (value.length < 2 || value.length > 20) {
        alert("Gatuadressen får max vara mellan 2 och 50 tecken")
        return false;
    }
    return true;
}

// Kör funktionen när sidan laddas
document.addEventListener('DOMContentLoaded', fetchProducts);

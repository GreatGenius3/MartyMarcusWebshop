// Funktion för att hämta produkter från Fake Store API
// Använd async/await för att hantera asynkrona operationer
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    }
    catch (error) {
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

    productList.innerHTML = ''; // Tأ¶m den befintliga listan
    productList.classList.add('row');

    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-lg-4 mb-4';

        const productDiv = document.createElement('div');
        productDiv.className = 'product card h-100 shadow-sm';

        //Lyssnaren till knappen b bör vara här.

        productDiv.innerHTML = `
            <img class="card-img-top product-image" src="${product.image}" alt="${product.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text text-success fw-bold">$${product.price}</p>
                <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Lägg till vara</button>
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
    

    //{I}=(I@I)={I}\\

    //lyssnare 
    //grenar av den för varje fält?
    //huvud validering sektor metod med AO antal metoder innanför sig

    //Validation.JS

    //Hemsida.getform.addactionlistner(metod.)


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
        alert("Namnet ska fأ¥r enbart vara mellan 2 - 50 tecken.")
        return false;
    }
    return true;
}
function validateEmail() {
    const value = document.getElementById("email").value;
    if (!value.includes("@") || value.length > 50) {
        alert("Eposten ska ha @ och fأ¥r inte vara mer أ¤n 50 tecken.")
        return false;
    }
    return true;
}
function validateMobil() {
    const value = document.getElementById("mobile_number").value;
    const regex = /^[0-9\+\s]+$/;
    if (!regex.test(value) || value.length < 3 || value.length > 20) {
        alert("Telefonnumret fأ¥r enbart innehأ¥lla siffror, mellanslag och ett plustecken.")
        return false;
    }
    return true;
}
function validateStreetAdress() {
    const value = document.getElementById("street_adress").value;
    if (value.length < 2 || value.length > 20) {
        alert("Adressen fأ¥r enbart vara mellan 2 till 50 tecken.")
        return false;
    }
    return true;
}
function validatePostNumber() {
    const value = document.getElementById("post_number").value;
    const regex = /^[0-9]{5}$/
    if (!regex.test(value)) {
        alert("Post nummer fأ¥r max vara 5 siffror lأ¥nga.")
        return false;
    }
    return true;
}
function validateLocality() {
    const value = document.getElementById("locality").value;
    if (value.length < 2 || value.length > 20) {
        alert("Gatuadressen fأ¥r max vara mellan 2 och 50 karaktأ¤rer")
        return false;
    }
    return true;
}

// Kör funktionen när sidan laddas
document.addEventListener('DOMContentLoaded', fetchProducts);

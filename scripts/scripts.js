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

    //{I}=(I@I)={I}\\

    //lyssnare 
    //grenar av den för varje fält?
    //huvud validering sektor metod med AO antal metoder innanför sig

    //Validation.JS

    //Hemsida.getform.addactionlistner(metod.)

}

document.querySelector("form").addEventListener("submit", function(e) {

        e.preventDefault();
        validateAll();

    });

    function validateAll(){
       return(
        validateName()&&
        vaidateEmail()&&
        validateMobil()&&
        validateStreetAdress()&&
        validatePostNumber()&&
        validateLocality()
       );
    }

        function validateName() {
            const value = document.getElementById("name").value;
            if(value.length < 2 || value.length > 50) {
                alert("Namnet ska får enbart vara mellan 2 - 50 tecken.")
                return false;
            }
            return true;
        }
        function vaidateEmail() {
            const value = document.getElementById("email").value;
            if(!value.includes("@") || value.length > 50){
                alert("Eposten ska ha @ och får inte vara mer än 50 tecken.")
                return false;
            }
            return true;
        }
        function validateMobil() {
            const value = document.getElementById("mobile_number").value;
            const regex = /^[0-9\+\s]+$/;
            if(!regex.test(value) || value.length < 3 || value.length > 20){
                alert("Telefonnumret får enbart innehålla siffror, mellanslag och ett plustecken.")
                return false;
            }
            return true;
        }
        function validateStreetAdress() {
            const value = document.getElementById("street_adress").value;
            if(value.length < 2 || value.length > 20){
                alert("Adressen får enbart vara mellan 2 till 50 tecken.")
                return false;
            }
            return true;
        }
        function validatePostNumber() {
            const value = document.getElementById("post_number").value;
            const regex = /^[0-9]{5}$/
            if(!regex.test(value)){
                alert("Post nummer får max vara 5 siffror långa.")
                return false;
            }
            return true;
        }
        function validateLocality() {
            const value = document.getElementById("locality").value;
            if(value.length < 2 || value.length > 20){
                alert("Gatuadressen får max vara mellan 2 och 50 karaktärer")
                return false;
            }
            return true;
        }

// Kör funktionen när sidan laddas
document.addEventListener('DOMContentLoaded', fetchProducts);

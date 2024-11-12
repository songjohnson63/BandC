// Sample JSON data (for demonstration, you can fetch this from an actual file or server)
const products = [
    {
        "id": 1,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/joeson.png",
        "section": "new-arrival"
    },
    {
        "id": 2,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/cica.jpg",
        "section": "new-arrival"
    },
    {
        "id": 2,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/tree.jpg",
        "section": "new-arrival"
    },
    {
        "id": 2,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/serum2.jpg",
        "section": "new-arrival"
    },
    {
        "id": 3,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../products/img/cleanser/skin1004 bha.png",
        "section": "best-seller"
    },
    {
        "id": 4,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../products/img/cleanser/skin1004 bha.png",
        "section": "best-seller"
    },
    {
        "id": 3,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../products/img/cleanser/skin1004 bha.png",
        "section": "promotions"
    },
    {
        "id": 4,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../products/img/cleanser/skin1004 bha.png",
        "section": "promotions"
    },

    {
        "id": 4,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../products/img/cleanser/skin1004 bha.png",
        "section": "all-product"
    }

    // You can add more products here
];
// Function to display products by category
// Function to display products by section
function displayProductsBySection(section, containerClass) {
    const productContainer = document.querySelector(`.${containerClass}`);
    productContainer.innerHTML = ''; // Clear any existing content

    // Filter products based on the section
    const filteredProducts = products.filter(product => product.section === section);

    // Loop through filtered products and create HTML for each product
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="cart col-sm-6 col-md-6 col-lg-3 mt-5">
                <div class="card shadow-lg">
                    <img class="rounded" src="${product.img}" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="card-price d-flex justify-content-between">
                            <div class="price d-flex mt-4">
                                <h5 class="text-decoration-line-through">$20.00</h5>
                                <h5 class="mx-2 text-danger">$${product.price}</h5>
                            </div>
                            <button class="border-0 bg-transparent fs-4">
                                <i class="fa-solid fa-cart-shopping mx-3"></i>
                                <i class="fa-solid fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

// Call the function for each section and its respective container class
displayProductsBySection('new-arrival', 'new-arrival');
displayProductsBySection('best-seller', 'best-seller');
displayProductsBySection('promotions', 'promotions');
displayProductsBySection('all-product', 'all-product'); // This can display all products if needed

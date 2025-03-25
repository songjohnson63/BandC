// Function to fetch product details by ID from the API
async function fetchProductDetails(productId) {
    const apiURL = `http://127.0.0.1:8000/api/product/${productId}`; // Fetch product by ID

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result.data; // Assuming the product is inside the "data" property
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
}

// Function to load and display product details
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')); // Get the product ID from the URL

    if (isNaN(productId)) {
        document.getElementById("product-details").innerHTML = "<p class='text-danger'>Product not found!</p>";
        return;
    }

    const product = await fetchProductDetails(productId);

    if (product) {
        const container = document.getElementById("product-details");
        container.innerHTML = `
            <div class="container mt-0">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-5 col-md-5 col-sm-6">
                                <div class="img text-center">
                                    <img src="${product.img}" alt="${product.name}">

                                </div>
                            </div>
                            <div class="col-lg-7 col-md-7 col-sm-6">
                                <h3 class="box-title mt-4">${product.name}</h3>
                                <div class="price d-flex mt-4">
                                    <h3 class="mx-2 text-danger">$${product.price_after_discount}</h3>
                                    <h3 class="text-decoration-line-through">$${product.price}</h3>
                                </div>

                                <div class="number d-flex mt-4">
                                    <button type="button" class="btn btn-secondary" id="decrease-btn">-</button>
                                    <h1 id="quantity-display" class="mx-3">0</h1>
                                    <button type="button" class="btn btn-secondary" id="increase-btn">+</button>

                                    <button type="button" class="cart btn btn-secondary mx-2">
                                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                                    </button>
                                    <button type="button" class="cart btn btn-secondary">
                                        <i class="fa-regular fa-heart"></i> Add to Favorite
                                    </button>
                                </div>

                                <h5 class="box-title mt-5">Key Ingredients</h5>
                                <p>${product.KeyIngredient}</p>

                                <h5 class="box-title mt-4">Description</h5>
                                <p>${product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Event listeners for quantity controls
        let quantity = 0; // Initial quantity
        const quantityDisplay = document.getElementById("quantity-display");
        const increaseBtn = document.getElementById("increase-btn");
        const decreaseBtn = document.getElementById("decrease-btn");

        increaseBtn.addEventListener("click", () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });

        decreaseBtn.addEventListener("click", () => {
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
    } else {
        document.getElementById("product-details").innerHTML = "<p class='text-danger'>Product not found!</p>";
    }
}

// Initialize when the DOM is loaded
document.addEventListener("DOMContentLoaded", loadProductDetails);

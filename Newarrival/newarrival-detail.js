
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
        const productId = parseInt(urlParams.get('id'));

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
                                        <h1 id="quantity-display" class="mx-3">1</h1>
                                        <button type="button" class="btn btn-secondary" id="increase-btn">+</button>

                                        <button type="button" class="cart btn btn-secondary mx-2" id="add-to-cart-btn">
                                            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                                        </button>
                                        <button type="button" class="cart btn btn-secondary">
                                            <i class="fa-regular fa-heart"></i> Add to Favorite
                                        </button>
                                    </div>

                                    <h5 class="box-title mt-5">Key Ingredients</h5>
                                    <p>${product.key_ingredient}</p>

                                    <h5 class="box-title mt-4">Description</h5>
                                    <p>${product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Quantity logic
            let quantity = 1;
            const quantityDisplay = document.getElementById("quantity-display");
            document.getElementById("increase-btn").addEventListener("click", () => {
                quantity++;
                quantityDisplay.textContent = quantity;
            });

            document.getElementById("decrease-btn").addEventListener("click", () => {
                if (quantity > 1) {
                    quantity--;
                    quantityDisplay.textContent = quantity;
                }
            });

            // Add to Cart button logic
            // Add to Cart button logic
            document.getElementById("add-to-cart-btn").addEventListener("click", async () => {
                const authToken = localStorage.getItem("authToken");
                if (!authToken) {
                    alert("Please log in first.");
                    return;
                }

                if (quantity < 1) {
                    alert("Please select at least 1 item before adding to cart.");
                    return;
                }

                try {
                    const response = await fetch("http://127.0.0.1:8000/api/cart/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authToken}`,
                        },
                        body: JSON.stringify({
                            product_id: product.id,
                            quantity: quantity,
                        }),
                    });

                    const result = await response.json();
                    console.log("Cart response:", result);

                    if (response.ok) {
                        alert("Added to cart successfully! 🛒");
                    } else {
                        alert("Failed to add to cart: " + (result.message || "Unknown error"));
                    }
                } catch (error) {
                    console.error("Error adding to cart:", error);
                    alert("Something went wrong while adding to cart.");
                }
            });

        } else {
            document.getElementById("product-details").innerHTML = "<p class='text-danger'>Product not found!</p>";
        }
    }

    document.addEventListener("DOMContentLoaded", loadProductDetails);

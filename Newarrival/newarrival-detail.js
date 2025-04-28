
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
            const card = document.getElementById("product-details");
            card.innerHTML = `
                        <div class="card shadow-lg">
                            <a href="../Newarrival/newarrival-detail.html?id=${item.id}" class="text-decoration-none text-dark">
                                <img class="rounded" src="http://127.0.0.1:8000/storage/${item.img}" alt="${item.name}">
                            </a>
                            <div class="card-body">
                                <div class="card-title">
                                    <h5>${item.name}</h5>
                                </div>
                                <div class="card-text">
                                    <p>${item.description}</p>                      
                                </div>
                                <div class="card-price d-flex justify-content-between align-items-center mt-4">
                                    <div class="price">
                                        <h5 class="text-decoration-line-through">$${item.price}</h5>
                                        <h5 class="mx-2 text-danger">$${item.price_after_discount}</h5>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <button class="border-0 bg-transparent fs-4 me-2" onclick="addToCart(${item.id})">
                                            <i class="fa-solid fa-cart-shopping"></i>
                                        </button>
                                        <button class="border-0 bg-transparent fs-4" onclick="toggleFavorite(${item.id})">
                                            <i class="fa-solid fa-heart ${item.favorited_by_current_user ? 'text-danger' : ''}"></i>
                                        </button>
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
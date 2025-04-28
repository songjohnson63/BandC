document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");

    // ✅ Get category from query string
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (!category) {
        console.error("No category specified in URL");
        return;
    }

    // ✅ Set the page title to match the category
    const categoryTitle = document.getElementById("category-title");
    if (categoryTitle) {
        categoryTitle.textContent = category;
    }

    console.log("Fetching products for category:", category);

    fetch(`http://127.0.0.1:8000/api/product?product_type=${category}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(result => {
            const products = result.data;
            if (!Array.isArray(products)) {
                console.error("Data is not an array:", products);
                return;
            }

            if (products.length === 0) {
                productContainer.innerHTML = `<p class="text-center">No products found in this category.</p>`;
                return;
            }

            // ✅ Render product cards with updated style and direct image URL
            productContainer.innerHTML = products.map(item => {
                const imageUrl = item.img || 'path/to/fallback-image.jpg'; // Use fallback if no image URL
                return `
                    <div class=" col-sm-6 col-md-6 col-lg-3 mt-5">
                        <div class="cart shadow-lg ">
                            <a href="../Newarrival/newarrival-detail.html?id=${item.id}" class="text-decoration-none text-dark">
                                <img class="card-img-top rounded w-100" style="height: 200px; object-fit: cover;" src="${imageUrl}" alt="${item.name}">
                            </a>
                            <div class="card-body p-3">
                                <div class="card-title">
                                    <h5>${item.name}</h5>
                                </div>
                                <div class="card-text">
                                    <p>${item.description}</p>
                                </div>
                                <div class="card-price d-flex justify-content-between align-items-center">
                                    <div class="price d-flex mt-4">
                                        <h5 class="text-decoration-line-through">$${item.price}</h5>
                                        <h5 class="mx-2 text-danger">$${item.price_after_discount}</h5>
                                    
                                    </div>
                                    <div class="d-flex align-items-center gap-3">
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
                    </div>
                `;
            }).join('');
        })
        .catch(error => {
            console.error("Fetch error:", error);
            productContainer.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
        });
});

async function addToCart(productId) {
    try {
        const apiURL = "http://127.0.0.1:8000/api/cart/add";
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("⚠️ No authentication token found. User must log in first.");
            alert("You must be logged in to add to cart."); 
            return;
        }

        console.log("🛒 Adding to cart. Product ID:", productId);

        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                products: [
                    {
                        product_id: productId,
                        quantity: 1
                    }
                ]
            })
        });

        const result = await response.json();
        console.log("✅ Add to cart response:", result);

        if (response.ok && (result.success || result.message === "Products added to cart")) {
            alert("Products added to cart successfully! 🎉");
        } else {
            console.warn("⚠️ Failed to add to cart:", result.message);
            alert("Failed to add product to cart: " + (result.message || "Unknown error"));
        }


    } catch (error) {
        console.error("❌ Error adding product to cart:", error);
        alert("An error occurred while adding to cart. Please try again.");
    }
}

// Function to favorite/unfavorite product
async function toggleFavorite(productId, heartIconElement) {
    try {
        const apiURL = "http://127.0.0.1:8000/api/favorites/toggle"; // Replace with your Favorite API
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("⚠️ No authentication token found. User must log in first.");
            alert("You must be logged in to add to favorites.");
            return;
        }

        console.log("❤️ Toggling favorite status for product ID:", productId);

        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                product_id: productId
            })
        });

        const result = await response.json();
        console.log("API Response:", result);  // Log the API response to debug

        // Check if the response was successful and contains the necessary success message
        if (response.ok) {
            // Successfully added to favorite, toggle the heart icon state
            if (heartIconElement.classList.contains("filled")) {
                heartIconElement.classList.remove("filled");
                alert("Product removed from favorites!");
            } else {
                heartIconElement.classList.add("filled");
                alert("Product added to favorites!");
            }

            // Optionally reload or update the UI dynamically
            loadNewArrivals();  // Example: Update the UI, you may customize this function to reflect changes
        } else {
            console.warn("⚠️ API Error:", result.message || 'No message in response');
            alert(`Failed to favorite: ${result.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("❌ Error toggling favorite:", error);
        alert("Product Added to Favorites!");
    }
}
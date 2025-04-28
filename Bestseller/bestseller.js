const favProduct = {};
let favoriteIdCounter = 1;

// Toggle favorite products
async function toggleFavorite(event) {
    const heartIcon = event.target;
    const cateName = heartIcon.getAttribute('data-cateName');
    const productId = heartIcon.getAttribute('data-id');
    let isFavorite = heartIcon.getAttribute('data-favorite') === 'true';
    isFavorite = !isFavorite;
    heartIcon.setAttribute('data-favorite', isFavorite);
    heartIcon.style.color = isFavorite ? 'red' : 'gray';

    try {
        const product = await fetchProductById(productId);
        if (product) {
            if (isFavorite) {
                if (!product.FavoriteId) {
                    product.FavoriteId = favoriteIdCounter++;
                }
                favProduct[productId] = product;
            } else {
                delete product.FavoriteId;
                delete favProduct[productId];
            }
            console.log(favProduct);
        }
    } catch (error) {
        console.error(`Error fetching product ID ${productId}:`, error);
    }
}

// Fetch a single product by ID
async function fetchProductById(productId) {
    const response = await fetch(`http://localhost:8000/api/products/${productId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product ${productId}`);
    }
    return await response.json();
}

// Load and display best-selling products with responsiveness and grouping
async function loadBestSellers() {
    try {
        const response = await fetch('http://localhost:8000/api/best-sellers');
        const result = await response.json();
        const products = result.data || [];

        const container = document.getElementById('products');
        container.innerHTML = ''; // Clear previous content

        // Group by product type
        const groupedByType = {};
        products.forEach(product => {
            const type = product.type || 'Others';
            if (!groupedByType[type]) {
                groupedByType[type] = [];
            }
            groupedByType[type].push(product);
        });

        Object.entries(groupedByType).forEach(([type, items]) => {
            // Section title
            const titleElement = document.createElement('div');
            titleElement.classList.add('container', 'line-title');
            titleElement.innerHTML = `
                <div class="text mt-5">${type}</div>
                <div class="line"></div>
            `;

            const row = document.createElement('div');
            row.classList.add('row', 'mt-3');

            // Display up to 4 items per type
            items.slice(0, 4).forEach(item => {
                const card = document.createElement('div');
                // Responsive Bootstrap classes
                card.classList.add('cart', 'mt-5', 'col-sm-6', 'col-md-4', 'col-lg-3');

                card.innerHTML = `
                   <div class="card shadow-lg">
                            <a href="../Newarrival/newarrival-detail.html?id=${item.id}" class="text-decoration-none text-dark">
                                <img class="card-img-top rounded" src="http://127.0.0.1:8000/storage/${item.img}" alt="${item.name}">
                            </a>
                            <div class="card-body">
                                <div class="card-title">
                                    <h5>${item.name}</h5>
                                </div>
                                <div class="card-text">
                                    <p>${item.description}</p>
                                </div>
                                <div class="card-price d-flex justify-content-between align-items-center mt-4">
                                    <div class="price d-flex mt-4">
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
                row.appendChild(card);
            });

            container.appendChild(titleElement);
            container.appendChild(row);
        });

    } catch (error) {
        console.error('Error loading best sellers:', error);
    }
}

// Call the function to load best sellers when the page loads
window.addEventListener('DOMContentLoaded', loadBestSellers);


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
        alert("Product Added to Favorite");
    }
}
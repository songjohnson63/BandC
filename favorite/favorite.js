document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Page Loaded - Fetching Favorite Products...");
    await loadFavoriteProducts();
});

async function loadFavoriteProducts() {
    try {
        const apiURL = "http://127.0.0.1:8000/api/favorites"; // Replace with your actual API endpoint
        const authToken = localStorage.getItem("authToken");

        const container = document.getElementById("product-container");
        container.innerHTML = "<div class='text-center mt-5'><div class='spinner-border' role='status'></div></div>";

        if (!authToken) {
            console.error("⚠️ No authentication token found. User might not be logged in.");
            container.innerHTML = "<p class='text-center text-danger'>Please log in to view your favorite products.</p>";
            return;
        }

        console.log("🔍 Fetching from API:", apiURL);

        const response = await fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ API Response:", result);

        if (!result.data || result.data.length === 0) {
            console.warn("⚠️ No favorite products found.");
            container.innerHTML = "<p class='text-center'>No favorite products found.</p>";
            return;
        }

        container.innerHTML = ""; // Clear spinner or previous content

        result.data.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("cart", "col-12", "col-md-6", "col-lg-4", "mt-5");

            // Set the heart color to red since all products are favorites
            const heartColor = 'red';

            productDiv.innerHTML = `
                <a href="../Newarrival/newarrival-detail.html?id=${product.id}" class="text-decoration-none text-dark">
                    <div class="card shadow-lg" style="flex-direction: row;">
                        <img class="rounded" src="http://127.0.0.1:8000/storage/${product.img}" alt="Product Image" style="width: 30%; height: 40vh">
                        <div class="card-body" style="width: 70%">
                            <div class="card-title" style="height: 17%;">
                                <h6 class="fs-5" style="font-weight: bold;">${product.name}</h6>
                            </div>
                            <div class="card-title" style="height: 40%; font-size: 13px;">
                                <p><span style="font-weight: bold;">Description:</span> ${product.description}</p>
                            </div>
                            <div class="card-text" style="height: 15%; font-size: 13px;">
                                <p><span style="font-weight: bold;">Key Ingredient:</span> ${product.key_ingredient}</p>
                            </div>
                            <div class="card-text" style="height: 10%; font-size: 13px;">
                                <p><span style="font-weight: bold;">Volume:</span> ${product.volume}</p>
                            </div>
                            <div class="card-price d-flex mt-1" style="justify-content: space-between; height: 10%; align-items: center;">
                                <div class="price d-flex">
                                    <h5 class="text-decoration-line-through">$${product.price}</h5>
                                    <h5 class="mx-2 text-danger">$${product.price_after_discount}</h5>
                                </div>
                                <button class="border-0 fs-4 bg-transparent mb-3">
                                    <i class="fa-solid fa-heart"
                                       data-favorite="true"
                                       onclick="toggleFavorite(event, ${product.id})"
                                       style="color: ${heartColor};"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            container.appendChild(productDiv);
        });
    } catch (error) {
        console.error("❌ Error fetching favorite products:", error);
        document.getElementById("product-container").innerHTML = "<p class='text-center text-danger'>Failed to load favorite products. Please try again later.</p>";
    }
}

async function toggleFavorite(event, productId) {
    try {
        const apiURL = "http://127.0.0.1:8000/api/favorite"; // Replace with your actual API endpoint
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("⚠️ No authentication token found. User must log in first.");
            alert("You must be logged in to update favorites.");
            return;
        }

        const heartIconElement = event.target; // Get the heart icon element

        // Check if the heart is red (favorite)
        const isFavorite = heartIconElement.style.color === 'red';

        if (isFavorite) {
            // If the heart is red, we want to remove it from favorites
            console.log("❤️ Removing product from favorites, Product ID:", productId);

            const response = await fetch(apiURL, {
                method: "DELETE", // Assuming the backend API supports DELETE method for removal
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    product_id: productId
                })
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (response.ok) {
                heartIconElement.style.color = "black"; // Change the heart icon color back
                alert("Product removed from favorites!");
                // Optionally, reload or update the UI dynamically
                loadFavoriteProducts(); // Refresh the favorite products list
            } else {
                alert(`Failed to remove from favorites: ${result.message || 'Unknown error'}`);
            }
        } else {
            // If the heart is not red, we want to add it to favorites
            console.log("❤️ Adding product to favorites, Product ID:", productId);

            const response = await fetch(apiURL, {
                method: "POST", // API call to add to favorites
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    product_id: productId
                })
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (response.ok) {
                heartIconElement.style.color = "red"; // Change the heart icon color to red
                alert("Product added to favorites!");
                // Optionally, reload or update the UI dynamically
                loadFavoriteProducts(); // Refresh the favorite products list
            } else {
                alert(`Failed to favorite: ${result.message || 'Unknown error'}`);
            }
        }

    } catch (error) {
        console.error("❌ Error toggling favorite:", error);
        alert("An error occurred while updating favorite. Please try again.");
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Page Loaded - Fetching Favorite Products...");
    await loadFavoriteProducts();
});

async function loadFavoriteProducts() {
    try {
        const apiURL = "http://127.0.0.1:8000/api/favorites"; // Replace with your actual API endpoint

        // 🔑 Retrieve authentication token from localStorage
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("⚠️ No authentication token found. User might not be logged in.");
            document.getElementById("product-container").innerHTML = "<p class='text-center text-danger'>Please log in to view your favorite products.</p>";
            return;
        }
        
        console.log("🔍 Fetching from API:", apiURL);

        const response = await fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}` // 🔑 Include token for authentication
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ API Response:", result);

        if (!result.data || result.data.length === 0) {
            console.warn("⚠️ No favorite products found.");
            document.getElementById("product-container").innerHTML = "<p class='text-center'>No favorite products found.</p>";
            return;
        }

        const container = document.getElementById("product-container");
        container.innerHTML = ""; // Clear previous content

        result.data.forEach(product => {

            const productDiv = document.createElement("div");
            productDiv.classList.add("cart", "col-sm-6", "col-md-6", "col-lg-3", "mt-5");
            productDiv.style.width = "49%";

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
                                    <h5 class="text-decoration-line-through">$${(parseFloat(product.price) * 1.2).toFixed(2)}</h5>
                                    <h5 class="mx-2 text-danger">$${product.price}</h5>
                                </div>
                                <button class="border-0 fs-4 bg-transparent mb-3">
                                    <i class="fa-solid fa-cart-shopping" data-cateName="${product.cateName}" data-id="${product.id}"></i>
                                    <i class="fa-solid fa-heart" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)" style="color: red;"></i>
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

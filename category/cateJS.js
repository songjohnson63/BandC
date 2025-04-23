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
                    <div class="col-sm-6 col-md-6 col-lg-3 mb-4">
                        <div class="card shadow-lg">
                            <a href="../Newarrival/newarrival-detail.html?id=${item.id}" class="text-decoration-none text-dark">
                                <img class="card-img-top rounded w-100" style="height: 200px; object-fit: cover;" src="${imageUrl}" alt="${item.name}">
                            </a>
                            <div class="card-body">
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
                                    <button class="border-0 bg-transparent fs-4">
                                        <i class="fa-solid fa-cart-shopping mx-3" id="cart-${item.id}" data-cateName="${item.product_type.type_name}" data-id="${item.id}" onclick="addToCart(event)"></i>
                                        <i class="fa-solid fa-heart heart-icon ${item.favorited_by_current_user ? 'text-danger' : ''}" id="heart-${item.id}" data-cateName="${item.product_type.type_name}" data-id="${item.id}" data-favorite="${item.favorited_by_current_user}" onclick="toggleFavorite(event)"></i>
                                    </button>
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

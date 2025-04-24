
async function FavProducts() {
    const allFavoriteProducts = [];
    for (const [category, path] of Object.entries(productFiles)) {
        try {
            const categoryProducts = await fetchJSON(path);
            for (let i = 0; i < 3; i++) {
                if (categoryProducts[i]) {
                    categoryProducts[i].IsFavorite = !categoryProducts[i].IsFavorite;
                }
            }
            const favoriteProducts = categoryProducts.filter(product => product.IsFavorite === true);
            // Add the filtered products to the allFavoriteProducts array
            allFavoriteProducts.push(...favoriteProducts);
        } catch (error) {
            console.error(error);
        }
    }
    const container = document.getElementById('product-container');
    container.innerHTML = '';
  allFavoriteProducts.forEach(product=>{
    const productDiv = document.createElement('div');
        productDiv.classList.add('cart', 'col-12', 'col-lg-6', 'mt-5');
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

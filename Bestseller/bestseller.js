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
                            <div class="card-title text-center">
                                <h5>${item.name}</h5>
                            </div>
                            <div class="card-text">
                                <p>${item.description ?? ''}</p>
                            </div>
                            <div class="card-price d-flex justify-content-between align-items-center">
                                <div class="price d-flex align-items-center">
                                    <h6 class="text-decoration-line-through mt-2 button-cart-font">$${parseFloat(item.price).toFixed(2)}</h6>
                                    <h6 class="mx-2 text-danger mt-2 button-cart-font">$${item.price_after_discount ?? item.price}</h6>
                                </div>
                                <button class="border-0 bg-transparent d-flex align-items-center">
                                    <i class="fa-solid fa-heart heart-icon" id="heart-${item.id}" data-cateName="${item.type}" data-id="${item.id}" data-favorite="false" onclick="toggleFavorite(event)"></i>
                                </button>
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

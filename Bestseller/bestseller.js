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

// Fetch a single product by ID (assuming API has full data)
async function fetchProductById(productId) {
    const response = await fetch(`http://localhost:8000/api/products/${productId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product ${productId}`);
    }
    return await response.json();
}

// Load and display best-selling products
async function loadBestSellers() {
    try {
        const response = await fetch('http://localhost:8000/api/best-sellers');
        const result = await response.json();
        const products = result.data || [];

        const container = document.getElementById('products');
  
        // Create the title element and append it to the container
        const titleElement = document.createElement('div');
        titleElement.classList.add('container', 'line-title');
        titleElement.innerHTML = `
          
          <div class="text mt-5">${categoryName}</div>
          <div class="line"></div>
        `;
        container.appendChild(titleElement);
  
        // Sort the products by 'id' in descending order (newest products first)
        const sortedData = data.sort((a, b) => b.id - a.id); // Sort by ID (descending)
  
        // Limit to the first 8 items (latest ones)
        const latestData = sortedData.slice(0,4);
  
        latestData.forEach(product => {
          const card = document.createElement('div');
          // Use Bootstrap's responsive grid classes
          card.classList.add('cart', 'mt-5', 'col-sm-6', 'col-md-4', 'col-lg-3'); // These classes will handle responsiveness
  
          card.innerHTML = `
            <div class="card shadow-lg">
            <a href="../Newarrival/newarrival-detail.html?id=${product.id}" class="text-decoration-none text-dark">
                <img class="card-img-top rounded" src="${product.img}" alt="${product.name}">
            </a>
                <div class="card-body">
                    <div class="card-title  text-center">
                        <h5>${product.name}</h5>
                    </div>
                    <div class="card-text">
                        <p>${product.description}</p>
                    </div>
                    <div class="card-price d-flex justify-content-between ">
                  <div class="price d-flex align-items-center align-items-center ">
                    <h6 class="text-decoration-line-through mt-2 button-cart-font">$${product["ori-price"]}</h6>
                    <h6 class="mx-2 text-danger mt-2 button-cart-font">$${product.price}</h6>
                  </div>
                  <button class=" border-0 bg-transparent d-flex justify-content-between align-items-center button-cart-font">
                    <i class="fa-solid fa-cart-shopping mx-3 mt-0" id="heart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>
                    <i class="fa-solid fa-heart heart-icon mt-0" id="heart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>

                  </button>
                </div>
                </div>
            </div>
          `;
  
          // Append the card to the container
          container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading best sellers:', error);
    }
}

// Call the function to load best sellers when the page loads
window.addEventListener('DOMContentLoaded', loadBestSellers);

// Function to fetch products from JSON files
async function fetchAllProducts() {
  // List of product categories and their JSON files
  const jsonFiles = [
      '../products/cleanser.json',
      '../products/sunscreen.json',
      '../products/serum.json',
      '../products/toner.json',
      '../products/moisturizer.json'
  ];

  try {
      // Fetch and combine products from all JSON files
      const productPromises = jsonFiles.map(url => fetch(url).then(response => response.json()));
      const productArrays = await Promise.all(productPromises);
      
      // Flatten the array of arrays into a single array of products
      return productArrays.flat();
  } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return empty array on error
  }
}

// Function to load and display product details
async function loadProductDetails() {
  // Get product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id')); // Convert to integer

  try {
      // Fetch all products
      const products = await fetchAllProducts();

      // Find the product by ID
      const product = products.find(p => p.id === productId);

      // Check if the product is found
      if (product) {
          // Render product details in the container
          const container = document.getElementById("product-details");
          container.innerHTML = `
              <div class="container mt-4">
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
                                      <h3 class="mx-2 text-danger">$${product.price}</h3>
                                      <h3 class="text-decoration-line-through">$${product["ori-price"]}</h3>
                                  </div>

                                  <div class="number d-flex mt-4">
                                      <button type="button" class="btn btn-secondary" id="decrease-btn">-</button>
                                      <h1 id="quantity-display" class="mx-3">0</h1>
                                      <button type="button" class="btn btn-secondary" id="increase-btn">+</button>

                                      <button type="button" class="cart btn btn-secondary mx-2">
                                          <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                                      </button>
                                      <button type="button" class="cart btn btn-secondary">
                                          <i class="fa-regular fa-heart"></i> Add to Favorite
                                      </button>
                                  </div>

                                  <h5 class="box-title mt-5">Key Ingredients</h5>
                                  <p>${product.KeyIngredient}</p>

                                  <h5 class="box-title mt-4">Description</h5>
                                  <p>${product.description}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          `;

          // Add event listeners for quantity control
          let quantity = 0; // Initial quantity
          const quantityDisplay = document.getElementById("quantity-display");
          const increaseBtn = document.getElementById("increase-btn");
          const decreaseBtn = document.getElementById("decrease-btn");

          // Increase quantity
          increaseBtn.addEventListener("click", () => {
              quantity++;
              quantityDisplay.textContent = quantity;
          });

          // Decrease quantity
          decreaseBtn.addEventListener("click", () => {
              if (quantity > 0) {
                  quantity--;
                  quantityDisplay.textContent = quantity;
              }
          });

      } else {
          // If product is not found, show an error message
          const container = document.getElementById("product-details");
          container.innerHTML = "<p class='text-danger'>Product not found!</p>";
      }
  } catch (error) {
      console.error("Error loading product details:", error);
      const container = document.getElementById("product-details");
      container.innerHTML = "<p class='text-danger'>Error loading product details!</p>";
  }
}

// Initialize when the DOM is loaded
document.addEventListener("DOMContentLoaded", loadProductDetails);

// const favProduct = {};
// let favoriteIdCounter = 1;

// async function fetchProductData(category, productId) {
//     const filePath = `../products/${category}.json`;
//     const response = await fetch(filePath);
//     if (!response.ok) {
//         throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
//     }

//     const categoryProducts = await response.json();
//     return categoryProducts.find(p => p.id === parseInt(productId));
// }

async function displayNewArrivalOrBestSeller(section) {
  const productContainer = document.querySelector(".NewArrival-BestSell");

  // Clear previous carousel-inner if exists
  productContainer.innerHTML = '';

  let apiUrl = '';

  if (section === 'new-arrival') {
    apiUrl = 'http://127.0.0.1:8000/api/new-arrival';  // Correct New Arrival API URL
  } else if (section === 'best-seller') {
    apiUrl = 'http://127.0.0.1:8000/api/best-sellers';  // Correct Best Seller API URL
  }

  console.log("Fetching from:", apiUrl); // Log URL for debugging

  try {
    const response = await fetch(apiUrl);

    console.log('Response Status:', response.status); // Log the response status

    if (!response.ok) {
      throw new Error(`Failed to load products. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched Data:', data); // Log data received

    // Debug: Check the structure of the response
    if (data && data.status_code === "success" && Array.isArray(data.data)) {
      console.log('Valid data received:', data); // Log valid data case

      if (section === 'new-arrival') {
        console.log('Processing New Arrival products...');
        // New Arrival: Loop through each product type
        data.data.forEach((productType) => {
          productType.products.forEach((product, index) => {
            renderProductCard(product, index, productContainer);  // Pass productContainer here
          });
        });
      } else if (section === 'best-seller') {
        console.log('Processing Best Seller products...');
        // Best Seller: Loop through the flat list of products
        data.data.forEach((product, index) => {
          renderProductCard(product, index, productContainer);  // Pass productContainer here
        });
      }
    } else {
      console.error('Invalid Data Format:', data); // Log invalid data format issues
      throw new Error('Invalid data format. Expected "status_code" to be "success" and "data" to be an array.');
    }
  } catch (error) {
    console.error('Error fetching products:', error); // Log the error in detail
    productContainer.innerHTML = `<p class="text-center w-100">Failed to load products. Please try again later.</p>`;
  }
}


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
    
  }
}

// Function to render product cards
// Example function to render product card with Add to Cart and Favorite buttons
function renderProductCard(product) {
  const productContainer = document.querySelector('.NewArrival-BestSell');  // Make sure this is the correct container for your carousel
  
  const productCard = `
    <div class="cart carousel-item d-flex justify-content-center py-4">
      <div class="card" style="width:94%">
        <a href="../Newarrival/newarrival-detail.html?id=${product.id}" class="text-decoration-none text-dark">
          <img class="card-img-top rounded" src="http://127.0.0.1:8000/storage/${product.img}" alt="${product.name}">
        </a>
        <div class="card-body">
          <h5 class="card-title text-center">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <div class="card-price d-flex justify-content-between">
            <div class="price d-flex align-items-center">
              <h5 class="text-decoration-line-through mt-2">$${product.price}</h5>
              <h5 class="mx-2 text-danger mt-2">$${product.price_after_discount}</h5>
            </div>
            <div class="d-flex align-items-center">
              <button class="border-0 bg-transparent fs-4 me-2" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
              <button class="border-0 bg-transparent fs-4" onclick="toggleFavorite(${product.id}, this)">
                <i class="fa-solid fa-heart ${product.favorited_by_current_user ? 'text-danger' : ''}"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  productContainer.innerHTML += productCard;  // Add the generated product card to the container
}




//code for change the button to it's corresponding page when click on tab at the home page of new arrival and best seller 
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.newArrival-head h3');
  const buttons = {
    'New Arrival': document.querySelector('a[href*="arrival.html"]'),
    'Best Seller': document.querySelector('a[href*="sample.html"]')
  };

  displayNewArrivalOrBestSeller('new-arrival');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const section = tab.textContent.trim() === 'New Arrival' ? 'new-arrival' : 'best-seller';
      displayNewArrivalOrBestSeller(section);

      buttons['New Arrival'].classList.toggle('d-none', section !== 'new-arrival');
      buttons['Best Seller'].classList.toggle('d-none', section !== 'best-seller');
    });
  });
});

fetch('http://127.0.0.1:8000/api/discounted')
  .then(response => response.json())
  .then(data => {
    console.log('API Response:', data); // Log the entire API response

    if (data.status_code === "success" && Array.isArray(data.data) && data.data.length > 0) {
      const products = data.data;
      const productsContainer = document.getElementById('discounted-products');
      
      // Clear the container before adding new products
      productsContainer.innerHTML = '';

      // Loop through products and create the product cards
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-3', 'mb-4');

        productCard.innerHTML = `
          <div class="cart carousel-item d-flex justify-content-center py-4">
      <div class="card" style="width:94%">
        <a href="../Newarrival/newarrival-detail.html?id=${product.id}" class="text-decoration-none text-dark">
          <img class="card-img-top rounded" src="http://127.0.0.1:8000/storage/${product.img}" alt="${product.name}">
        </a>
        <div class="card-body">
          <h5 class="card-title text-center">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <div class="card-price d-flex justify-content-between">
            <div class="price d-flex align-items-center">
              <h5 class="text-decoration-line-through mt-2">$${product.price}</h5>
              <h5 class="mx-2 text-danger mt-2">$${product.price_after_discount}</h5>
            </div>
            <div class="d-flex align-items-center">
              <button class="border-0 bg-transparent fs-4 me-2" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
              <button class="border-0 bg-transparent fs-4" onclick="toggleFavorite(${product.id}, this)">
                <i class="fa-solid fa-heart ${product.favorited_by_current_user ? 'text-danger' : ''}"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

        // Append the product card to the container
        productsContainer.appendChild(productCard);
      });
    } else {
      const noProductsMessage = document.createElement('p');
      noProductsMessage.textContent = 'No discounted products available at the moment.';
      document.getElementById('discounted-products').appendChild(noProductsMessage);
    }
  })
  .catch(error => {
    console.error('Error fetching discounted products:', error);
  });

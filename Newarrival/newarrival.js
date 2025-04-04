const API_URL = "http://127.0.0.1:8000/api/new-arrival"; // Replace with your actual API URL

// Fetch new arrival products from API
async function fetchNewArrivalProducts() {
  try {
      const response = await fetch(API_URL);  // Replace API_URL with your actual endpoint
      if (!response.ok) {
          throw new Error(`Failed to fetch new arrivals: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);  // Log the full response to check its structure
      return data.data;  // Assuming the actual products are inside `data.data`
  } catch (error) {
      console.error("Error fetching new arrivals:", error);
      return [];
  }
}

function loadNewArrivals() {
  fetchNewArrivalProducts()
      .then(newArrivals => {
          const container = document.getElementById('products-container');
          
          // Ensure the structure of the data is correct
          console.log(newArrivals); // Log new arrivals to verify their structure

          newArrivals.forEach(({ product_type, products }) => {
              const typeName = product_type && product_type.type_name ? product_type.type_name : 'Default Type Name';  // Accessing type_name correctly
              console.log(typeName); // Log type_name to verify it

              if (!products || products.length === 0) return;

              const titleElement = document.createElement('div');
              titleElement.classList.add('container', 'line-title');
              titleElement.innerHTML = `
                  <div class="text mt-5">${typeName}</div>
                  <div class="line"></div>
              `;
              container.appendChild(titleElement);

              // Process each product
              products.forEach(item => {
                  const card = document.createElement('div');
                  card.classList.add('cart', 'mt-5', 'col-sm-6', 'col-md-6', 'col-lg-3');
                  card.innerHTML = `
                      <div class="card shadow-lg">
                          <a href="../Newarrival/newarrival-detail.html?id=${item.id}" class="text-decoration-none text-dark">
                              <img class="rounded" src="http://127.0.0.1:8000/storage/${item.img}"" alt="${item.name}">
                          </a>
                          <div class="card-body">
                              <div class="card-title">
                                  <h5>${item.name}</h5>
                              </div>
                              <div class="card-text">
                                  <p>${item.description}</p>
                              </div>
                              <div class="card-price d-flex" style="justify-content: space-between;">
                                  <div class="price d-flex mt-4">
                                       <h5 class="text-decoration-line-through">$${item.price}</h5>
                                        <h5 class="mx-2 text-danger">$${item.price_after_discount}</h5>
                                  </div>
                                  <button class="border-0 bg-transparent fs-4">
                                      <i class="fa-solid fa-cart-shopping mx-3" id="heart-${item.id}" data-cateName="${product_type.type_name}" data-id="${item.id}" data-favorite="${item.favorited_by_current_user}" onclick="toggleFavorite(event)"></i>
                                      <i class="fa-solid fa-heart heart-icon" id="heart-${item.id}" data-cateName="${product_type.type_name}" data-id="${item.id}" data-favorite="${item.favorited_by_current_user}" onclick="toggleFavorite(event)"></i>
                                  </button>
                              </div>
                          </div>
                      </div>
                  `;
                  container.appendChild(card);
              });
          });
      })
      .catch(error => console.error('Error loading new arrivals:', error));
}

loadNewArrivals();  // Call the function to load products when the page loads

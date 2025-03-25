document.addEventListener("DOMContentLoaded", async function () {
  console.log("🚀 Page Loaded - Fetching Cart Products...");
  await loadCartProducts();
});

async function loadCartProducts() {
  try {
      const apiURL = "http://127.0.0.1:8000/api/cart";

      // 🔑 Retrieve authentication token from localStorage
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
          console.error("⚠️ No authentication token found. User might not be logged in.");
          document.getElementById("product-container").innerHTML = "<p class='text-center text-danger'>Please log in to view your cart.</p>";
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

      // Check if data exists in the result
      if (!result.data || !result.data.cart_items || result.data.cart_items.length === 0) {
          console.warn("⚠️ No cart products found.");
          document.getElementById("product-container").innerHTML = "<p class='text-center'>No cart products found.</p>";
          return;
      }

      const container = document.getElementById("product-container");
      container.innerHTML = ""; // Clear previous content

      // Loop through each item in cart and display product info
      result.data.cart_items.forEach(item => {
          const product = item.product; // Extract the product from each cart item
          const imgPath = product.img.includes('public') ? product.img : `/storage/${product.img}`;

          // Create a product container to display
          const productDiv = document.createElement("div");
          productDiv.classList.add("cart", "col-sm-6", "col-md-6", "col-lg-3", "mt-5");
          productDiv.style.width = "49%";

          // Fill the product div with information
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
                              <!-- Quantity control buttons -->
                              <button type="button" class="btn btn-secondary" style="border-radius:50%;" id="decrease-btn-${item.id}">-</button>
                              <h4 id="quantity-display-${item.id}">${item.quantity}</h4>
                              <button type="button" class="btn btn-secondary" style="border-radius:50%;" id="increase-btn-${item.id}">+</button>
                          </div>
                      </div>
                  </div>
              </a>
          `;

          container.appendChild(productDiv);

          // Add event listeners to increase/decrease buttons
          document.getElementById(`decrease-btn-${item.id}`).addEventListener("click", () => updateQuantity(item.id, "decrease"));
          document.getElementById(`increase-btn-${item.id}`).addEventListener("click", () => updateQuantity(item.id, "increase"));
      });

      // Update Total Price in the HTML after fetching data from API
      const totalElement = document.getElementById("total-price");
      if (totalElement) {
          totalElement.innerHTML = `Total: $${result.data.total}`;
      }

  } catch (error) {
      console.error("❌ Error fetching cart products:", error);
      document.getElementById("product-container").innerHTML = "<p class='text-center text-danger'>Failed to load cart products. Please try again later.</p>";
  }
}

// Function to handle quantity changes (if needed)
async function updateQuantity(cartItemId, action) {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
      console.error("⚠️ No authentication token found.");
      return;
  }

  try {
      const apiURL = `http://127.0.0.1:8000/api/cart/update/${cartItemId}`;
      const response = await fetch(apiURL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify({ action })
      });

      if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Quantity updated:", result);

      // Reload the cart after updating quantity
      loadCartProducts();
  } catch (error) {
      console.error("❌ Error updating quantity:", error);
  }
}

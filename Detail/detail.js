document.addEventListener("DOMContentLoaded", () => {
    // Get product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    fetch("../products/homepage.js")  // Fetch product data
      .then(response => response.json())
      .then(products => {
        // Find the product by ID
        const product = products.find(p => p.id === parseInt(productId));
  
        if (product) {
          // Render product details in the container
          const container = document.getElementById("product-details");
          container.innerHTML = `
            <div class="card">
              <img src="path/to/images/${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="fs-4 fw-bold">$${product.price}</p> <!-- Add price if available -->
              </div>
            </div>
          `;
        } else {
          container.innerHTML = "<p class='text-danger'>Product not found!</p>";
        }
      })
      .catch(error => console.error("Error loading product details:", error));
  });
  
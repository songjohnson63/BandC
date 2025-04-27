async function loadProductsFromAPI() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/product"); // Ensure the API endpoint is correct
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const responseData = await response.json(); // Fetch the entire response

    // Log the entire response to check its structure
    console.log(responseData);

    // Access the 'data' array from the response
    const data = responseData.data;

    // Check if 'data' is an array before proceeding with forEach
    if (Array.isArray(data)) {
      const container = document.getElementById("products-container");
      container.innerHTML = ''; // Clear any existing content

      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("cart", "mt-5", "col-sm-6", "col-md-6", "col-lg-3");

        card.innerHTML = `
          <div class="card shadow-lg">
            <a href="../Newarrival/newarrival-detail.html?id=${item.id}" class="text-decoration-none text-dark">
              <img class="rounded" src="${item.img}" alt="${item.name}">
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
                  <i class="fa-solid fa-cart-shopping mx-3" id="heart-${item.id}" data-cateName="${item.cateName}" data-id="${item.id}" data-favorite="${item.IsFavorite}" onclick="toggleFavorite(event)"></i>
                  <i class="fa-solid fa-heart heart-icon" id="heart-${item.id}" data-cateName="${item.cateName}" data-id="${item.id}" data-favorite="${item.IsFavorite}" onclick="toggleFavorite(event)"></i>
                </button>
              </div>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    } else {
      console.error("API response data is not an array:", data);
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

loadProductsFromAPI(); // Call the function to load products when the page loads

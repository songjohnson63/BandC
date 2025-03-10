document.addEventListener("DOMContentLoaded", () => {
  // Paths to your JSON files
  const jsonFiles = [
    '../products/sunscreen.json',
    '../products/serum.json',
    '../products/moisturizer.json',
    '../products/cleanser.json',
    '../products/toner.json'
  ];

  let allProducts = [];

  // Fetch and combine all products
  Promise.all(jsonFiles.map(file => fetch(file).then(response => response.json())))
    .then(dataArrays => {
      // Flatten and combine all products from different files
      allProducts = dataArrays.flat();
      
      // Load products from localStorage or generate and save them
      loadOrGenerateSection('.all-product', 12, 'popularNow');
      loadOrGenerateSection('.promotions', 8, 'megaSale');
      loadOrGenerateSection('.best-seller', 12, 'bestSellers');
      loadOrGenerateSection('.new-arrival', 12, 'newArrivals');
    })
    .catch(error => {
      console.error("Error loading or parsing JSON files:", error);
    });

  // Function to load products from localStorage or generate and save them
  function loadOrGenerateSection(containerSelector, count, storageKey) {
    const storedProducts = localStorage.getItem(storageKey);
    let selectedProducts;

    if (storedProducts) {
      // Load products from localStorage if they exist
      selectedProducts = JSON.parse(storedProducts);
    } else {
      // Generate random products and save to localStorage
      selectedProducts = getRandomProducts(allProducts, count);
      localStorage.setItem(storageKey, JSON.stringify(selectedProducts));
    }

    populateSection(containerSelector, selectedProducts);
  }

  // Function to populate a section with selected products
  function populateSection(containerSelector, products) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = ''; // Clear previous content
    
    products.forEach(product => {
      const productCard = `
        <div class="cart col-sm-6 col-md-4 col-lg-3 mt-5">
          <div class="card shadow-lg">
            <a href="../Detail/detail.html?id=${product.id}" class="text-decoration-none text-dark">
              <img class="card-img-top rounded" src="${product.img}" alt="${product.name}">
            </a>
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <div class="card-price d-flex justify-content-between">
                <div class="price d-flex mt-4">
                  <h5 class="text-decoration-line-through">$${product["ori-price"]}</h5>
                  <h5 class="mx-2 text-danger">$${product.price}</h5>
                </div>
                <button class="border-0 bg-transparent fs-4">
                  <i class="fa-solid fa-cart-shopping mx-3" id="cart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>
                  <i class="fa-solid fa-heart heart-icon" id="heart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productCard;
    });
  }

  // Function to shuffle and get random products
  function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
});

const products = [
    {
      "id": 1,
      "name": "TEA-TRICA BHA foam",
      "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
      "IsCart": 0,
      "IsFavorite": false,
      "price": "12.75",
      "img": "../Homepage/images/joeson.png",
      "section": "new-arrival",
      "KeyIngredient": "Haloooooo"
    },
    {
      "id": 2,
      "name": "TEA-TRICA BHA foam",
      "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
      "IsCart": 0,
      "IsFavorite": false,
      "price": "12.75",
      "img": "../Homepage/images/cica.jpg",
      "section": "new-arrival",
      "KeyIngredient": "Haloooooo"

    },
    {
      "id": 3,
      "name": "TEA-TRICA BHA foam",
      "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
      "IsCart": 0,
      "IsFavorite": false,
      "price": "12.75",
      "img": "../Homepage/images/tree.jpg",
      "section": "new-arrival",
      "KeyIngredient": "Haloooooo"

    },
    {
        "id": 4,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/tree.jpg",
        "section": "best-seller",
        "KeyIngredient": "Haloooooo"

      },
      {
        "id": 5,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/tree.jpg",
        "section": "best-seller",
        "KeyIngredient": "Haloooooo"

      },

      {
        "id": 6,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/tree.jpg",
        "section": "all-product",
        "KeyIngredient": "Haloooooo"

      },
      {
        "id": 7,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/tree.jpg",
        "section": "all-product",
        "KeyIngredient": "Haloooooo"

      },
      {
        "id": 8,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/tree.jpg",
        "section": "promotions",
        "KeyIngredient": "Haloooooo"

      },
      {
        "id": 9,
        "name": "TEA-TRICA BHA foam",
        "description": "A deep cleansing foam with BHA and Tea tree unclogs pores and exfoliates dead skin cells, leaving a refreshed finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "12.75",
        "img": "../Homepage/images/tree.jpg",
        "section": "new-arrival",
        "KeyIngredient": "Haloooooo"

      },
   
  ];

  // export default products;  // Export the array so it can be used in other files

  
  
  // Function to display products by section
  function displayProductsBySection(section, containerClass) {
    const productContainer = document.querySelector(`.${containerClass}`);
    productContainer.innerHTML = ''; // Clear existing content
  
    const filteredProducts = products.filter(product => product.section === section);
  
    filteredProducts.forEach(product => {
      const productCard = `
        <div class="cart col-sm-6 col-md-4 col-lg-3 mt-5">
          <div class="card shadow-lg">
            <a href="/Detail/detail.html?id=${product.id}" class="text-decoration-none text-dark">
              <img class="card-img-top rounded" src="${product.img}" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <div class="card-price d-flex justify-content-between">
                  <div class="price d-flex mt-4">
                    <h5 class="text-decoration-line-through">$20.00</h5>
                    <h5 class="mx-2 text-danger">$${product.price}</h5>
                  </div>
                  <button class="border-0 bg-transparent fs-4">
                    <i class="fa-solid fa-cart-shopping mx-3"></i>
                    <i class="fa-solid fa-heart"></i>
                  </button>
                </div>
              </div>
            </a>
          </div>
        </div>
      `;
      productContainer.innerHTML += productCard;
    });
  }
  
  // Call the function for each section
  displayProductsBySection('new-arrival', 'new-arrival');
  displayProductsBySection('best-seller', 'best-seller');
  displayProductsBySection('promotions', 'promotions');
  displayProductsBySection('all-product', 'all-product');
  
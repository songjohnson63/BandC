const products = [
  {
    "id": 1,
    "name": "Relief Sun : Rice + Probiotics (SPF50+ PA++++)",
    "description": "Relief Sun is a lightweight and creamy type organic sunscreen that's comfortable on skin. Even if you apply a large amount several times, it is not sticky and gives a moist finish like that of a light moisturizing cream. Containing 30% rice extract and grain fermented extracts, it provides moisture and nourishment to the skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "price": "13.00",
    "img": "../Homepage/images/joeson.png",
    "section": "new-arrival",
    "KeyIngredient": "Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-benzotriazolyl Tetramethylbutylphenol, Coco-caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, Butylene Glycol, Oryza Sativa (Rice) Germ Extract, Camellia Sinensis Leaf Extract, Lactobacillus/Pumpkin Ferment Extract, Bacillus/Soybean Ferment Extract, Saccharum Officinarum (Sugarcane) Extract, Macrocystis Pyrifera (Kelp) Extract, Cocos Nucifera (Coconut) Fruit Extract, Panax Ginseng Root Extract, Camellia Sinensis Leaf Extract, Monascus/Rice Ferment, Pentylene Glycol, Behenyl Alcohol, Poly C10-30 Alkyl Acrylate, Polyglyceryl-3 Methylglucose Distearate, Decyl Glucoside, Tromethamine, Carbomer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, 1,2-Hexanediol,Sodium Stearoyl Glutamate, Polyacrylate Crosspolymer-6, Ethylhexylglycerin, Adenosine, Xanthan Gum, Tocopherol, Lactobacillus/Rice Ferment, Aspergillus Ferment, Saccharomyces/Rice Ferment Filtrate"
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


document.addEventListener("DOMContentLoaded", () => {
    // Get product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');  // Get the 'id' parameter from the URL

    console.log("Product ID from URL:", productId);  // Debugging line: check if the productId is correctly fetched

    // Find the product by ID
    const product = products.find(p => p.id === parseInt(productId));  // Find product by matching ID

    // Check if the product is found
    if (product) {
        console.log("Product found:", product);  // Debugging line: check if product is correctly found

        // Render product details in the container
        const container = document.getElementById("product-details");
        container.innerHTML = `
        <div class="container mt-4">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 col-sm-6">
                            <div class="img text-center">
                                <img src="${product.img}">
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-6">
                            <h3 class="box-title mt-4">${product.name}</h3>
                            <div class="price d-flex mt-4">
                                <h3 class="mx-2 text-danger">$${product.price}</h3>
                                <h3 class="text-decoration-line-through">$20.00</h3>
                            </div>

                            <div class="number d-flex mt-4">
                                <button type="button" class="btn btn-secondary">-</button>
                                <h1>0</h1>
                                <button type="button" class="btn btn-secondary">+</button>

                                <button type="button" class="cart btn btn-secondary">
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
    } else {
        // If product is not found, show an error message
        const container = document.getElementById("product-details");
        container.innerHTML = "<p class='text-danger'>Product not found!</p>";
    }
});

const products = [
  {
    "id": 1,
    "name": "Relief Sun : Rice + Probiotics (SPF50+ PA++++)",
    "description": "Relief Sun is a lightweight and creamy type organic sunscreen that's comfortable on skin. Even if you apply a large amount several times, it is not sticky and gives a moist finish like that of a light moisturizing cream. Containing 30% rice extract and grain fermented extracts, it provides moisture and nourishment to the skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "price": "13.00",
    "ori-price" : "15.00",
    "img": "../Homepage/images/joeson.png",
    "section": "all-product",
    "KeyIngredient": "Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-benzotriazolyl Tetramethylbutylphenol, Coco-caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, Butylene Glycol, Oryza Sativa (Rice) Germ Extract, Camellia Sinensis Leaf Extract, Lactobacillus/Pumpkin Ferment Extract, Bacillus/Soybean Ferment Extract, Saccharum Officinarum (Sugarcane) Extract, Macrocystis Pyrifera (Kelp) Extract, Cocos Nucifera (Coconut) Fruit Extract, Panax Ginseng Root Extract, Camellia Sinensis Leaf Extract, Monascus/Rice Ferment, Pentylene Glycol, Behenyl Alcohol, Poly C10-30 Alkyl Acrylate, Polyglyceryl-3 Methylglucose Distearate, Decyl Glucoside, Tromethamine, Carbomer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, 1,2-Hexanediol,Sodium Stearoyl Glutamate, Polyacrylate Crosspolymer-6, Ethylhexylglycerin, Adenosine, Xanthan Gum, Tocopherol, Lactobacillus/Rice Ferment, Aspergillus Ferment, Saccharomyces/Rice Ferment Filtrate"
  },
  {
    "id": 2,
    "name": "Dynasty Cream",
    "brand": "Beauty of Joseon",
    "description": "Meet the 'Dynasty Cream,' our very first product here at Beauty of Joseon, and a long-time favorite of many of our customers. Its firm and creamy texture gives your skin deep, long-lasting moisture and nourishment. This all-in-one cream is filled with good-for-skin ingredients like rice bran water, ginseng water, squalane, and niacinamide. These ingredients help to keep your skin healthy, hydrated, and balanced. Its firm texture sinks into your skin, providing moisture and nourishment from deep within.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Rice bran water 29%, Ginseng root water 5%, Squalane 2%, Niacinamide 2%",
    "price": "20.00",
    "ori-price" : "22.00",
    "img": "../products/img/moisturizer/01.jpg",
    "section": "all-product",
  },
  {
    "id": 3,
    "name": "Glow Serum : Propolis + Niacinamide",
    "brand":"beauty of joseon",
    "description": "A serum-like chemical sunscreen that is super lightweight, hydrating, and quickly absorbed, with a non-greasy, dewy finish",
    "IsCart":0,
    "IsFavorite": false,
    "volume":"30ml",
    "KeyIngredient":"Propolis extract 60%, Niacinamide 2%, BHA 0.5%",
    "price":"12.00",
    "img":"../products/img/serum/01.jpg",
    "section": "all-product",
    "ori-price" : "13.50"
  },
  {
    "id": 4,
    "name": "Miracle Cleansing Foam",
    "brand": "Some By Mi",
    "description": "A miracle foam cleanser that contains AHA, BHA, and PHA to deeply cleanse and exfoliate for clearer skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "100ml",
    "KeyIngredient": "Salicylic Acid, Niacinamide, Melaleuca Alternifolia (Tea Tree) Leaf Extract",
    "price": "16.00",
    "img": "../products/img/cleanser/11.webp",
    "section": "all-product",
    "ori-price" : "17.00"
  },
  {
    "id": 5,
    "name": "Alcohol-Free Toner",
    "brand": "Klairs",
    "description": "A gentle toner that balances the skin's pH level and provides deep hydration without irritation, perfect for sensitive skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "180ml",
    "KeyIngredient": "Sodium Hyaluronate, Betaine, Panthenol",
    "price": "21.00",
    "img": "../products/img/toner/10.jpg",
    "section": "all-product",
    "ori-price" : "21.50"
  },
  {
    "id": 6,
    "name": "AHA/BHA Exfoliating Cleanser",
    "brand": "COSRX",
    "description": "A daily exfoliating cleanser with AHA and BHA that helps remove dead skin cells and unclog pores for a clearer complexion.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "150ml",
    "KeyIngredient": "Glycolic Acid, Salicylic Acid, Betula Alba Juice, Tea Tree Leaf Oil",
    "price": "18.00",
    "img": "../products/img/cleanser/10.webp",
    "section": "all-product",
    "ori-price" : "18.50"
  },
  {
    "id": 7,
    "name": "Cica Cream",
    "brand": "Dr. Jart+",
    "description": "A fast-acting cream that calms sensitive skin, formulated with Centella Asiatica complex to soothe and hydrate irritated skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Centella Asiatica Extract, Niacinamide, Glycerin",
    "price": "48.00",
    "img": "../products/img/moisturizer/05.avif",
    "section": "all-product",
    "ori-price" : "60.00"
  },
  {
    "id": 8,
    "name": "Soft Airy UV Essence",
    "brand": "Klairs",
    "description": "This water-based sun essence offers SPF50+ PA++++ protection and is formulated with mild ingredients, making it suitable for sensitive skin. It leaves a soft, airy finish without greasiness.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "80ml",
    "KeyIngredient": "Niacinamide, Adenosine, Sodium Hyaluronate, Tocopherol",
    "price": "18.00",
    "img": "../products/img/sunscreen/03.jpg",
    "section": "all-product",
    "ori-price" : "19.00"
  },
  {
    "id": 9,
    "name": "Vitamin C 21.5% Advanced Serum",
    "brand": "By Wishtrend",
    "description": "A potent vitamin C serum that brightens the skin and improves the appearance of pigmentation and scars.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "30ml",
    "KeyIngredient": "Ascorbic Acid 21.5%, Sodium Hyaluronate, Panthenol",
    "price": "30.00",
    "img": "../products/img/serum/09.jpg",
    "section": "all-product",
    "ori-price" : "33.00"
  },
  {
    "id": 10,
    "name": "Rich Moist Soothing Cream",
    "brand": "Klairs",
    "description": "A rich cream that provides soothing moisture for sensitive skin, formulated with shea butter and ceramides to strengthen the skin barrier.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "60ml",
    "KeyIngredient": "Shea Butter, Ceramide NP, Jojoba Seed Oil",
    "price": "25.00",
    "img": "../products/img/moisturizer/09.webp",
    "section": "all-product",
    "ori-price" : "25.50"
  },
  {
    "id": 11,
    "name": "Bija Trouble Facial Foam",
    "brand": "Innisfree",
    "description": "A trouble-care cleansing foam containing bija seed oil that helps soothe and care for troubled skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "150ml",
    "KeyIngredient": "Torreya Nucifera Seed Oil, Glycerin, Stearic Acid, Myristic Acid, Lauric Acid",
    "price": "14.00",
    "img": "../products/img/cleanser/09.webp",
    "section": "all-product",
    "ori-price" : "15.00"
  },
  {
    "id": 12,
    "name": "Centella Unscented Toner",
    "brand": "Purito",
    "description": "A soothing toner that helps calm and strengthen the skin barrier with Centella Asiatica extract, ideal for sensitive skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "200ml",
    "KeyIngredient": "Centella Asiatica Extract 10%, Panthenol, Hyaluronic Acid",
    "price": "20.00",
    "img": "../products/img/toner/07.jpg",
    "section": "all-product",
    "ori-price" : "20.20"
  },



  {
    "id": 13,
    "name": "Egg White Pore Foam",
    "brand": "Skinfood",
    "description": "A pore-refining cleanser with egg white extract that removes dirt and oil while minimizing the appearance of pores.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "150ml",
    "KeyIngredient": "Albumen Extract, Glycerin, Stearic Acid, Myristic Acid, Lauric Acid",
    "price": "11.00",
    "img": "../products/img/cleanser/08.jpg",
    "section": "best-seller",
    "ori-price" : "11.40"
  },
  {
    "id": 14,
    "name": "Air Fit UV Defense Sun Cream",
    "brand": "Etude House",
    "description": "This sun cream offers SPF50+ PA+++ protection and is formulated with silica powder to control excess sebum. It leaves a matte finish and is suitable for oily and combination skin types.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Silica Powder, Niacinamide, Adenosine, Sodium Hyaluronate",
    "price": "11.00",
    "img": "../products/img/sunscreen/07.webp",
    "section": "best-seller",
    "ori-price" : "11.40"
  },
  {
    "id": 15,
    "name": "Intensive Vitalizing Cream EX",
    "brand": "Sulwhasoo",
    "description": "A rich anti-aging cream that revitalizes skin, improves resilience, and strengthens the skin barrier, leaving it firm and smooth.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Ginseng Root Extract, Glycyrrhiza Uralensis (Licorice) Root Extract, Camellia Sinensis Leaf Extract",
    "price": "150.00",
    "img": "../products/img/moisturizer/08.webp",
    "section": "best-seller",
    "ori-price" : "187.50"
  },
  {
    "id": 16,
    "name": "Propolis Light Ampoule",
    "brand": "COSRX",
    "description": "A lightweight ampoule enriched with propolis extract that provides intensive moisture and a radiant glow.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "20ml",
    "KeyIngredient": "Propolis Extract 80%, Sodium Hyaluronate, Panthenol",
    "price": "24.00",
    "img": "../products/img/serum/10.jpg",
    "section": "best-seller",
    "ori-price" : "24.99"
  },



  {
    "id": 17,
    "name": "Moisture Surge 72-Hour Auto-Replenishing Hydrator",
    "brand": "Clinique",
    "description": "An enhanced moisture boost that works non-stop for 72 hours, even after washing your face, to keep skin almost twice as hydrated at the end of the day.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Aloe Vera Bioferment, Hyaluronic Acid, Activated Aloe Water",
    "price": "39.00",
    "img": "../products/img/moisturizer/07.jpg",
    "section": "promotions",
    "ori-price" : "45.00"
  },
  {
    "id": 18,
    "name": "All Around Safe Block Aqua Sun Gel",
    "brand": "MISSHA",
    "description": "This refreshing sun gel provides SPF50+ PA++++ protection and is enriched with glacial water and ice plant extract to hydrate and cool the skin. It absorbs quickly without leaving a sticky residue.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Glacial Water, Ice Plant Extract, Niacinamide, Adenosine",
    "price": "13.00",
    "img": "../products/img/sunscreen/04.webp",
    "section": "promotions",
    "ori-price" : "15.00"
  },
  {
    "id": 19,
    "name": "Daily Mild Sunscreen",
    "brand": "Dr. Jart+",
    "description": "This daily mild sunscreen offers SPF50+ PA++++ protection and is formulated with cica and tea tree extract to soothe and protect sensitive skin. It leaves a lightweight, non-sticky finish.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Centella Asiatica Extract, Tea Tree Extract, Niacinamide, Adenosine",
    "price": "20.00",
    "img": "../products/img/sunscreen/05.webp",
    "section": "promotions",
    "ori-price" : "27.77"
  },
  {
    "id": 20,
    "name": "Bija Trouble Facial Foam",
    "brand": "Innisfree",
    "description": "A trouble-care cleansing foam containing bija seed oil that helps soothe and care for troubled skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "150ml",
    "KeyIngredient": "Torreya Nucifera Seed Oil, Glycerin, Stearic Acid, Myristic Acid, Lauric Acid",
    "price": "14.00",
    "img": "../products/img/cleanser/09.webp",
    "section": "promotions",
    "ori-price" : "17.99"
  },
  {
    "id": 21,
    "name": "UV Defense Me. Daily Sun Essence",
    "brand": "MAKE P:REM",
    "description": "This lightweight sun essence offers SPF50+ PA++++ protection and is infused with moisturizing ingredients like panthenol and ceramides. It leaves a dewy finish without any white cast.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Panthenol, Ceramides, Niacinamide, Adenosine",
    "price": "15.00",
    "img": "../products/img/sunscreen/08.jpg",
    "section": "promotions",
    "ori-price" : "17.00"
  },
  {
    "id": 22,
    "name": "Essence Toner",
    "brand": "Pyunkang Yul",
    "description": "A nourishing toner that absorbs quickly into the skin, providing deep hydration and a glowing complexion.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "200ml",
    "KeyIngredient": "Astragalus Membranaceus Root Extract, Butylene Glycol, Glycerin",
    "price": "14.00",
    "img": "../products/img/toner/09.png",
    "section": "promotions",
    "ori-price" : "18.50"
  },
  {
    "id": 23,
    "name": "Moisture Ampoule",
    "brand": "Isntree",
    "description": "A hydrating ampoule that contains hyaluronic acid and botanical extracts to deeply moisturize and nourish the skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Hyaluronic Acid, Centella Asiatica Extract, Aloe Vera Extract",
    "price": "25.00",
    "img": "../products/img/serum/08.jpg",
    "section": "promotions",
    "ori-price" : "30.50"
  },
  {
    "id": 24,
    "name": "Perfect Whip Foam",
    "brand": "Senka",
    "description": "A rich and creamy cleansing foam that deeply cleanses while leaving the skin soft and smooth.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "120g",
    "KeyIngredient": "Sericin, Aqua, Glycerin, Stearic Acid, Myristic Acid, Lauric Acid",
    "price": "13.00",
    "img": "../products/img/cleanser/07.jpg",
    "section": "promotions",
    "ori-price" : "17.00"
  },

  {
    "id": 25,
    "name": "UV Shield Essential Moisture Sun Cream",
    "brand": "Laneige",
    "description": "This moisture sun cream offers SPF50+ PA+++ protection and is infused with hydro ionized mineral water to deeply hydrate the skin. It provides a dewy, natural finish without a white cast.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Hydro Ionized Mineral Water, Niacinamide, Adenosine, Glycerin",
    "price": "22.00",
    "img": "../products/img/sunscreen/10.jpg",
    "section": "new-arrival",
    "ori-price" : "22.99"
  },
  {
    "id": 26,
    "name": "Cica Cream",
    "brand": "Dr. Jart+",
    "description": "A fast-acting cream that calms sensitive skin, formulated with Centella Asiatica complex to soothe and hydrate irritated skin.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Centella Asiatica Extract, Niacinamide, Glycerin",
    "price": "48.00",
    "img": "../products/img/moisturizer/05.avif",
    "section": "new-arrival",
    "ori-price" : "60.00"
  },
  {
    "id": 27,
    "name": "Time Revolution Night Repair Ampoule",
    "brand": "Missha",
    "description": "A night repair ampoule that helps to improve skin elasticity and radiance while you sleep.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Bifida Ferment Lysate, Lactobacillus Ferment, Niacinamide",
    "price": "28.00",
    "img": "../products/img/serum/06.webp",
    "section": "new-arrival",
    "ori-price" : "29.00"
  },
  {
    "id": 28,
    "name": "Perfect UV Protection Cream Triple Care",
    "brand": "Innisfree",
    "description": "This sunscreen provides SPF50+ PA+++ protection and is enriched with sunflower oil and green tea extract. It helps to brighten the skin tone and offers anti-aging benefits.",
    "IsCart": 0,
    "IsFavorite": false,
    "volume": "50ml",
    "KeyIngredient": "Sunflower Oil, Green Tea Extract, Niacinamide, Adenosine",
    "price": "16.00",
    "img": "../products/img/sunscreen/06.webp",
    "section": "new-arrival",
    "ori-price" : "20.00"
  },
];


// import products from '../products/home';  // Import the product data
document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id'); // Get the 'id' parameter from the URL

  // Find the product by ID
  const product = products.find(p => p.id === parseInt(productId)); // Match ID

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
                  <img src="${product.img}">
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
});

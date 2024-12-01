const products = [
    {
        "id": 1,
        "name": "Glow Serum : Propolis + Niacinamide",
        "brand":"beauty of joseon",
        "description": "A serum-like chemical sunscreen that is super lightweight, hydrating, and quickly absorbed, with a non-greasy, dewy finish",
        "IsCart":0,
        "IsFavorite": false,
        "price":"12.00",
        "img":"../products/img/serum/01.jpg",
        "section": "best-seller"
    },
    {
        "id": 3,
        "name": "Propolis Vitamin Sleeping Mask",
        "brand": "COSRX",
        "description": "A nourishing sleeping mask that revitalizes the skin overnight with propolis extract and vitamin E, leaving it hydrated and glowing.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "22.00",
        "img": "../products/img/moisturizer/03.webp",
        "section":"best-seller"
    },

    {
        "id": 2,
        "name": "Snail Repair Intensive Ampoule",
        "brand": "Mizon",
        "description": "A highly concentrated ampoule containing 80% snail mucin that helps repair damaged skin and improve skin texture.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "15.00",
        "img": "../products/img/serum/02.jpg",
        "section": "best-seller"
    },
    {
        "id": 5,
        "name": "C Pure Vitamin C Serum",
        "brand": "Klairs",
        "description": "A vitamin C serum that brightens the skin tone and improves the appearance of pigmentation and scars.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "22.00",
        "img": "../products/img/serum/05.jpg",
        "section":"best-seller"
    },

    {
        "id": 7,
        "name": "Advanced Night Repair Synchronized Recovery Complex II",
        "brand": "Estée Lauder",
        "description": "A powerful nighttime serum that reduces the appearance of multiple signs of aging and gives the skin a smoother, more radiant look.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "98.00",
        "img": "../products/img/serum/07.jpg",
        "section":"best-seller"
    },
    {
        "id": 8,
        "name": "Moisture Ampoule",
        "brand": "Isntree",
        "description": "A hydrating ampoule that contains hyaluronic acid and botanical extracts to deeply moisturize and nourish the skin.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "25.00",
        "img": "../products/img/serum/08.jpg",
        "section":"best-seller"
    },
    {
        "id": 9,
        "name": "Vitamin C 21.5% Advanced Serum",
        "brand": "By Wishtrend",
        "description": "A potent vitamin C serum that brightens the skin and improves the appearance of pigmentation and scars.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "30.00",
        "img": "../products/img/serum/09.jpg",
        "section":"best-seller"
    },
    {
        "id": 10,
        "name": "Propolis Light Ampoule",
        "brand": "COSRX",
        "description": "A lightweight ampoule enriched with propolis extract that provides intensive moisture and a radiant glow.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "24.00",
        "img": "../products/img/serum/10.jpg",
        "section":"best-seller"
    },
    {
        "id": 3,
        "name": "Soft Airy UV Essence",
        "brand": "Klairs",
        "description": "This water-based sun essence offers SPF50+ PA++++ protection and is formulated with mild ingredients, making it suitable for sensitive skin. It leaves a soft, airy finish without greasiness.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "18.00",
        "img": "../products/img/sunscreen/03.jpg",
        "section": "best-seller"
    },
    {
        "id": 4,
        "name": "All Around Safe Block Aqua Sun Gel",
        "brand": "MISSHA",
        "description": "This refreshing sun gel provides SPF50+ PA++++ protection and is enriched with glacial water and ice plant extract to hydrate and cool the skin. It absorbs quickly without leaving a sticky residue.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "13.00",
        "img": "../products/img/sunscreen/04.webp",
        "section":"best-seller"
    },
    {
        "id": 5,
        "name": "Daily Mild Sunscreen",
        "brand": "Dr. Jart+",
        "description": "This daily mild sunscreen offers SPF50+ PA++++ protection and is formulated with cica and tea tree extract to soothe and protect sensitive skin. It leaves a lightweight, non-sticky finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "20.00",
        "img": "../products/img/sunscreen/05.webp",
        "section":"best-seller"
    },
    {
        "id": 6,
        "name": "Perfect UV Protection Cream Triple Care",
        "brand": "Innisfree",
        "description": "This sunscreen provides SPF50+ PA+++ protection and is enriched with sunflower oil and green tea extract. It helps to brighten the skin tone and offers anti-aging benefits.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "16.00",
        "img": "../products/img/sunscreen/06.webp",
        "section":"best-seller"
    },
    {
        "id": 7,
        "name": "Air Fit UV Defense Sun Cream",
        "brand": "Etude House",
        "description": "This sun cream offers SPF50+ PA+++ protection and is formulated with silica powder to control excess sebum. It leaves a matte finish and is suitable for oily and combination skin types.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "11.00",
        "img": "../products/img/sunscreen/07.webp",
        "section":"best-seller"
    },
    {
        "id": 6,
        "name": "Time Revolution Night Repair Ampoule",
        "brand": "Missha",
        "description": "A night repair ampoule that helps to improve skin elasticity and radiance while you sleep.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "28.00",
        "img": "../products/img/serum/06.webp",
        "section":"best-seller"
    },
    {
        "id": 8,
        "name": "UV Defense Me. Daily Sun Essence",
        "brand": "MAKE P:REM",
        "description": "This lightweight sun essence offers SPF50+ PA++++ protection and is infused with moisturizing ingredients like panthenol and ceramides. It leaves a dewy finish without any white cast.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "15.00",
        "img": "../products/img/sunscreen/08.jpg",
        "section":"best-seller"
    },
    {
        "id": 9,
        "name": "Aqua Rich Watery Essence",
        "brand": "Biore",
        "description": "This watery essence sunscreen offers SPF50+ PA++++ protection and is enriched with hyaluronic acid and royal jelly extract for intense hydration. It absorbs quickly and leaves a refreshing finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "14.00",
        "img": "../products/img/sunscreen/09.jpg",
        "section":"best-seller"
    },
    {
        "id": 10,
        "name": "UV Shield Essential Moisture Sun Cream",
        "brand": "Laneige",
        "description": "This moisture sun cream offers SPF50+ PA+++ protection and is infused with hydro ionized mineral water to deeply hydrate the skin. It provides a dewy, natural finish without a white cast.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "22.00",
        "img": "../products/img/sunscreen/10.jpg",
        "section":"best-seller"
    },
    {
        "id": 4,
        "name": "Ultra Facial Cream",
        "brand": "Kiehl's",
        "description": "A 24-hour, light-textured daily hydrator that leaves skin feeling comfortable and visibly well-balanced, particularly in harsh weather conditions.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "32.00",
        "img": "../products/img/moisturizer/04.jpg",
        "section":"best-seller"
    },
    {
        "id": 5,
        "name": "Cica Cream",
        "brand": "Dr. Jart+",
        "description": "A fast-acting cream that calms sensitive skin, formulated with Centella Asiatica complex to soothe and hydrate irritated skin.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "48.00",
        "img": "../products/img/moisturizer/05.avif",
        "section":"best-seller"
    },

    {
        "id": 7,
        "name": "Moisture Surge 72-Hour Auto-Replenishing Hydrator",
        "brand": "Clinique",
        "description": "An enhanced moisture boost that works non-stop for 72 hours, even after washing your face, to keep skin almost twice as hydrated at the end of the day.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "39.00",
        "img": "../products/img/moisturizer/07.jpg",
        "section":"best-seller"
    },
    {
        "id": 8,
        "name": "Intensive Vitalizing Cream EX",
        "brand": "Sulwhasoo",
        "description": "A rich anti-aging cream that revitalizes skin, improves resilience, and strengthens the skin barrier, leaving it firm and smooth.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "150.00",
        "img": "../products/img/moisturizer/08.webp",
        "section":"best-seller"
    },
    {
        "id": 9,
        "name": "Rich Moist Soothing Cream",
        "brand": "Klairs",
        "description": "A rich cream that provides soothing moisture for sensitive skin, formulated with shea butter and ceramides to strengthen the skin barrier.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "25.00",
        "img": "../products/img/moisturizer/09.webp",
        "section":"best-seller"
    },
    {
        "id": 10,
        "name": "Perfect Renew Regenerating Cream",
        "brand": "Laneige",
        "description": "An anti-aging cream that provides deep hydration and revitalization, improving the appearance of fine lines and wrinkles.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "65.00",
        "img": "../products/img/moisturizer/10.jpg",
        "section":"best-seller"
    },
    {
        "id": 2,
        "name": "Supple Preparation Facial Toner",
        "brand": "Klairs",
        "description": "A gentle, hydrating toner that balances the skin's pH level and enhances the effectiveness of your entire skincare routine.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "21.00",
        "img": "../products/img/toner/02.jpg",
        "section":"best-seller"
    },
    {
        "id": 6,
        "name": "Green Tea Balancing Cream",
        "brand": "Innisfree",
        "description": "A lightweight gel-cream that replenishes moisture and soothes the skin with Jeju green tea extract.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "18.00",
        "img": "../products/img/moisturizer/06.jpg",
        "section":"best-seller"
    },
    {
        "id": 11,
        "name": "Miracle Cleansing Foam",
        "brand": "Some By Mi",
        "description": "A miracle foam cleanser that contains AHA, BHA, and PHA to deeply cleanse and exfoliate for clearer skin.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "16.00",
        "img": "../products/img/cleanser/11.webp",
        "section":"best-seller"
    },
    {
        "id": 3,
        "name": "Wonder Pore Freshner",
        "brand": "Etude House",
        "description": "A multi-functional toner that deep cleanses pores, maintains pH balance, controls sebum, and provides a fresh, cooling sensation.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "15.00",
        "img": "../products/img/toner/03.jpg",
        "section":"best-seller"
    },
    {
        "id": 4,
        "name": "Green Tea Fresh Toner",
        "brand": "Innisfree",
        "description": "A refreshing toner made with Jeju green tea extract that hydrates and soothes the skin while controlling oil.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "18.00",
        "img": "../products/img/toner/04.webp",
        "section":"best-seller"
    },
    {
        "id": 5,
        "name": "Time Revolution The First Treatment Essence",
        "brand": "Missha",
        "description": "A highly concentrated essence that hydrates, restores, and rejuvenates the skin, leaving it smooth and radiant.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "49.00",
        "img": "../products/img/toner/05.avif",
        "section":"best-seller"
    },
    {
        "id": 6,
        "name": "Mugwort Essence",
        "brand": "I'm From",
        "description": "A calming essence made with 100% mugwort extract to soothe and hydrate irritated skin.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "40.00",
        "img": "../products/img/toner/06.jpg",
        "section":"best-seller"
    },
    {
        "id": 7,
        "name": "Centella Unscented Toner",
        "brand": "Purito",
        "description": "A soothing toner that helps calm and strengthen the skin barrier with Centella Asiatica extract, ideal for sensitive skin.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "20.00",
        "img": "../products/img/toner/07.jpg",
        "section":"best-seller"
    },
    {
        "id": 8,
        "name": "Rice Toner",
        "brand": "I'm From",
        "description": "A brightening toner that harnesses the power of rice extract to provide hydration and improve skin tone.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "28.00",
        "img": "../products/img/toner/08.jpg",
        "section":"best-seller"
    },
    {
        "id": 9,
        "name": "Essence Toner",
        "brand": "Pyunkang Yul",
        "description": "A nourishing toner that absorbs quickly into the skin, providing deep hydration and a glowing complexion.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "14.00",
        "img": "../products/img/toner/09.png",
        "section":"best-seller"
    },
    {
        "id": 4,
        "name": "Rice Water Bright Foaming Cleanser",
        "brand": "The Face Shop",
        "description": "A brightening cleansing foam enriched with rice water that gently cleanses and hydrates for a radiant complexion.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "9.00",
        "img": "../products/img/cleanser/04.jpg",
        "section":"best-seller"
    },
    // // {
    //     "id": 5,
    //     "name": "Super Volcanic Pore Micellar Cleansing Foam",
    //     "brand": "Innisfree",
    //     "description": "A deep cleansing foam with Jeju volcanic clusters and micellar particles to remove impurities and control sebum.",
    //     "IsCart": 0,
    //     "IsFavorite": false,
    //     "volume": "150ml",
    //     "img": "../products/img/cleanser/05.webp",
    //     "section":"best-seller"
    // },
    {
        "id": 6,
        "name": "Blueberry Rebalancing 5.5 Cleanser",
        "brand": "Innisfree",
        "description": "A rebalancing cleanser with a pH level of 5.5 that helps maintain the skin’s natural acidity while providing a fresh and hydrated finish.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "8.00",
        "img": "../products/img/cleanser/06.webp",
        "section":"best-seller"
    },
    {
        "id": 7,
        "name": "Perfect Whip Foam",
        "brand": "Senka",
        "description": "A rich and creamy cleansing foam that deeply cleanses while leaving the skin soft and smooth.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "13.00",
        "img": "../products/img/cleanser/07.jpg",
        "section":"best-seller"
    },
    {
        "id": 8,
        "name": "Egg White Pore Foam",
        "brand": "Skinfood",
        "description": "A pore-refining cleanser with egg white extract that removes dirt and oil while minimizing the appearance of pores.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "11.00",
        "img": "../products/img/cleanser/08.jpg",
        "section":"best-seller"
    },
    {
        "id": 9,
        "name": "Bija Trouble Facial Foam",
        "brand": "Innisfree",
        "description": "A trouble-care cleansing foam containing bija seed oil that helps soothe and care for troubled skin.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "14.00",
        "img": "../products/img/cleanser/09.webp",
        "section":"best-seller"
    },
    {
        "id": 10,
        "name": "AHA/BHA Exfoliating Cleanser",
        "brand": "COSRX",
        "description": "A daily exfoliating cleanser with AHA and BHA that helps remove dead skin cells and unclog pores for a clearer complexion.",
        "IsCart": 0,
        "IsFavorite": false,
        "price": "18.00",
        "img": "../products/img/cleanser/10.webp",
        "section":"best-seller"
    },

    
]
// function displayProductsBySection(section, containerClass) {
//     const productContainer = document.querySelector(`.${containerClass}`);
//     productContainer.innerHTML = ''; // Clear any existing content

//     // Filter products based on the section
//     const filteredProducts = products.filter(product => product.section === section);

//     // Loop through filtered products and create HTML for each product
//     filteredProducts.forEach(product => {
//         const productCard = `
//             <div class="cart col-sm-6 col-md-6 col-lg-3 mt-5">
//                 <div class="card shadow-lg">
//                     <img class="rounded" src="${product.img}" alt="${product.name}">
//                     <div class="card-body">
//                         <h5 class="card-title">${product.name}</h5>
//                         <p class="card-text">${product.description}</p>
//                         <div class="card-price d-flex justify-content-between">
//                             <div class="price d-flex mt-4">
//                                 <h5 class="text-decoration-line-through">$20.00</h5>
//                                 <h5 class="mx-2 text-danger">$${product.price}</h5>
//                             </div>
//                             <button class="border-0 bg-transparent fs-4">
//                                 <i class="fa-solid fa-cart-shopping mx-3"></i>
//                                 <i class="fa-solid fa-heart"></i>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//         productContainer.innerHTML += productCard;
//     });
// }

// displayProductsBySection('best-seller', 'best-seller');


function loadProducts(url, categoryName) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('products');
  
        // Create the title element and append it to the container
        const titleElement = document.createElement('div');
        titleElement.classList.add('container', 'line-title');
        titleElement.innerHTML = `
          
          <div class="text mt-5">${categoryName}</div>
          <div class="line"></div>
        `;
        container.appendChild(titleElement);
  
        // Sort the products by 'id' in descending order (newest products first)
        const sortedData = data.sort((a, b) => b.id - a.id); // Sort by ID (descending)
  
        // Limit to the first 8 items (latest ones)
        const latestData = sortedData.slice(0,4);
  
        latestData.forEach(item => {
          const card = document.createElement('div');
          // Use Bootstrap's responsive grid classes
          card.classList.add('cart', 'mt-5', 'col-sm-6', 'col-md-6', 'col-lg-3'); // These classes will handle responsiveness
  
          card.innerHTML = `
            <div class="card shadow-lg">
              <img class="rounded" src="${item.img}" alt="${item.name}">
              <div class="card-body">
                <div class="card-title">
                  <h5>${item.name}</h5>
                </div>
                <div class="card-text">
                  <p>${item.description}</p>
                </div>
                <div class="card-price d-flex" style="justify-content: space-between;">
                  <div class="price d-flex mt-4">
                    <h5 class="text-decoration-line-through">$${parseFloat(item.price * 1.25).toFixed(2)}</h5>
                    <h5 class="mx-2 text-danger">$${item.price}</h5>
                  </div>
                  <button class="border-0 bg-transparent fs-4">
                    <i class="fa-solid fa-cart-shopping mx-3"></i>
                    <i class="fa-solid fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
  
          // Append the card to the container
          container.appendChild(card);
        });
      })
      .catch(error => console.error('Error loading JSON:', error));
  }
  
  const jsonFiles = [
    ['../products/cleanser.json', 'Cleanser'],
    ['../products/sunscreen.json', 'Sunscreen'],
    ['../products/serum.json', 'Serum'],
    ['../products/toner.json', 'Toner'],
    ['../products/moisturizer.json', 'Moisturizer']
  ];
  
  jsonFiles.forEach(([url, categoryName]) => {
    loadProducts(url, categoryName);
  });

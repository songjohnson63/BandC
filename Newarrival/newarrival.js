const favProduct = {};
let favoriteIdCounter = 1;
async function fetchProductData(category,productId) {
    const filePath = `../products/${category}.json`;
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }

    const categoryProducts = await response.json();
    return categoryProducts.find(p => p.id === parseInt(productId));
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//this function below is about when click on each product then it's create an object that store all the product with IsFavorite= true
//toggle icon to be red or gray
async function toggleFavorite(event) {
    const heartIcon = event.target;
    const cateName = heartIcon.getAttribute('data-cateName');
    const productId = heartIcon.getAttribute('data-id');
    let isFavorite = heartIcon.getAttribute('data-favorite') === 'true';
    isFavorite = !isFavorite;
    heartIcon.setAttribute('data-favorite', isFavorite);
    heartIcon.style.color =isFavorite? 'red':'gray';
    try {
        const product = await fetchProductData(cateName,productId);
        if (product) {
            if (isFavorite) {
// Assign a FavoriteId if it's marked as favorite
                if (!product.FavoriteId) {
                    product.FavoriteId = favoriteIdCounter++;
                }
                favProduct[productId] = product;
            } else {
                delete product.FavoriteId;
                delete favProduct[productId];
            }
            console.log(favProduct); 
           
        }
    } catch (error) {
        console.error(`Error fetching product data for ID ${productId}:`, error);
    }
    }


function loadProducts(url, categoryName) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('products-container');
  
        const titleElement = document.createElement('div');
        titleElement.classList.add('container', 'line-title');
        titleElement.innerHTML = `
          
          <div class="text mt-5">${categoryName}</div>
          <div class="line"></div>
        `;
        container.appendChild(titleElement);
  
        // Sort the products by 'id' in descending order (newest products first)
        const sortedData = data.sort((a, b) => b.id - a.id); 
  
        // Limit to the first 8 items (latest ones)
        const latestData = sortedData.slice(0, 8);
  
        latestData.forEach(product => {
          const card = document.createElement('div');
          card.classList.add('cart', 'mt-5', 'col-sm-6', 'col-md-4', 'col-lg-3');
  

          
          card.innerHTML = `
           <div class="card shadow-lg">
            <a href="../Newarrival/newarrival-detail.html?id=${product.id}" class="text-decoration-none text-dark">
                <img class="card-img-top rounded" src="${product.img}" alt="${product.name}">
            </a>
                <div class="card-body">
                    <div class="card-title  text-center">
                        <h5>${product.name}</h5>
                    </div>
                    <div class="card-text">
                        <p>${product.description}</p>
                    </div>
                    <div class="card-price d-flex justify-content-between ">
                  <div class="price d-flex align-items-center align-items-center ">
                    <h6 class="text-decoration-line-through mt-2 button-cart-font">$${product["ori-price"]}</h6>
                    <h6 class="mx-2 text-danger mt-2 button-cart-font">$${product.price}</h6>
                  </div>
                  <button class=" border-0 bg-transparent d-flex justify-content-between align-items-center button-cart-font">
                    <i class="fa-solid fa-cart-shopping mx-3 mt-0" id="heart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>
                    <i class="fa-solid fa-heart heart-icon mt-0" id="heart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>

                  </button>
                </div>
                </div>
            </div>
          `;
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



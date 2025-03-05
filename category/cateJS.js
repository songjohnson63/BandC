
const productFiles = {
    'cleanser': '../products/cleanser.json',
    'serum':'../products/serum.json',
    'sunscreen':'../products/sunscreen.json',
    'toner':'../products/toner.json',
    'moisturizer':'../products/moisturizer.json'
};
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function getParameterByName(name){                                            //for get the category title parameter from ?category=............
    const urlPar = new URLSearchParams(window.location.search);    /// will get the url but get after ? symbol
    return urlPar.get(name);   // this will return the value of category(name)=  
  }
document.addEventListener("DOMContentLoaded", async function() {
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//test
    // console.log(favProduct);
    // const savedFavorites = localStorage.getItem('favProduct');
    // if (savedFavorites) {
    //     favProduct = JSON.parse(savedFavorites);
    //     initializeFavoritesUI(favProduct);
    // }

    // function initializeFavoritesUI(favProduct) {
    //     Object.keys(favProduct).forEach(productId => {
    //         const product = favProduct[productId];
    //         const heartIcon = document.querySelector(`.heart-icon[data-id='${productId}']`);
    //         if (heartIcon) {
    //             heartIcon.setAttribute('data-favorite', 'true');
    //             heartIcon.style.color = 'red'; // Set the favorite color
    //         }
    //     });
    // }
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
     const categoryTitle = document.getElementById("category-title");
    const category = getParameterByName('category');
  if(categoryTitle.textContent && category){
    categoryTitle.textContent = category;
  }
  if (category){
        try{
            const categoryProducts = await fetchJSON(productFiles[category.toLowerCase()]);
            displayCategoryProducts(category, categoryProducts);
       }
       catch(error){
        console.error('Error fetching category products:', error);
       }
    }
  });
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//fetch JSON data from a given path
async function fetchJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    }
    return await response.json();
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//fetch products (just check) but has'nt used in the context
async function fetchAllProducts() {
    const allProducts = {};
    for (const [category, path] of Object.entries(productFiles)) {
        try {
            const categoryProducts = await fetchJSON(path);
            allProducts[category] = categoryProducts;
        } catch (error) {
            console.error(error);
        }
    }
    return allProducts;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//fetch products that has Isfavorite= true and store all that product in favProduct {}
const favProduct = {};
let favoriteIdCounter = 1;
async function fetchProductData(category,productId) {
    console.log(category);
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
        console.log(cateName);
        console.log(productId);
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
      //      localStorage.setItem('favProduct', JSON.stringify(favProduct));
            console.log(favProduct); 
           
        }
    } catch (error) {
        console.error(`Error fetching product data for ID ${productId}:`, error);
    }
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//list product by each category
function displayCategoryProducts(category, products) {
    const container = document.getElementById('product-container');
  container.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart', 'col-sm-6', 'col-md-6', 'col-lg-3', 'mt-5');
        productDiv.innerHTML = `
            <div class="card shadow-lg">
            <a href="../Newarrival/newarrival-detail.html?id=${product.id}" class="text-decoration-none text-dark">
                <img class="rounded" src="${product.img}" alt="${product.name}">
            </a>
                <div class="card-body">
                    <div class="card-title">
                        <h5>${product.name}</h5>
                    </div>
                    <div class="card-text">
                        <p>${product.description}</p>
                    </div>
                    <div class="card-price d-flex" style="justify-content: space-between;">
                        <div class="price d-flex mt-4">
                            <h5 class="text-decoration-line-through">$${(parseFloat(product.price) * 1.2).toFixed(2)}</h5>
                            <h5 class="mx-2 text-danger">$${product.price}</h5>
                        </div>
                        <button class="border-0 bg-transparent fs-4">
                            <i class="fa-solid fa-cart-shopping mx-3" id="heart-${product.id}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>
                            <i class="fa-solid fa-heart heart-icon" id="heart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(productDiv);
    });
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

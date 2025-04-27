
// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function getParameterByName(name){                                            //for get the category title parameter from ?category=............
//     const urlPar = new URLSearchParams(window.location.search);    /// will get the url but get after ? symbol
//     return urlPar.get(name);   // this will return the value of category(name)=  
//   }
// document.addEventListener("DOMContentLoaded", async function() {
// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// //test
//     // console.log(favProduct);
//     // const savedFavorites = localStorage.getItem('favProduct');
//     // if (savedFavorites) {
//     //     favProduct = JSON.parse(savedFavorites);
//     //     initializeFavoritesUI(favProduct);
//     // }

//     // function initializeFavoritesUI(favProduct) {
//     //     Object.keys(favProduct).forEach(productId => {
//     //         const product = favProduct[productId];
//     //         const heartIcon = document.querySelector(`.heart-icon[data-id='${productId}']`);
//     //         if (heartIcon) {
//     //             heartIcon.setAttribute('data-favorite', 'true');
//     //             heartIcon.style.color = 'red'; // Set the favorite color
//     //         }
//     //     });
//     // }
// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
//      const categoryTitle = document.getElementById("category-title");
//     const category = getParameterByName('category');
//   if(categoryTitle.textContent && category){
//     categoryTitle.textContent = category;
//   }
//   if (category){
//         try{
//             const categoryProducts = await fetchJSON(productFiles[category.toLowerCase()]);
//             displayCategoryProducts(category, categoryProducts);
//        }
//        catch(error){
//         console.error('Error fetching category products:', error);
//        }
//     }
//   });
// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// //fetch JSON data from a given path
// async function fetchJSON(path) {
//     const response = await fetch(path);
//     if (!response.ok) {
//         throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
//     }
//     return await response.json();
// }
// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// //fetch products (just check) but has'nt used in the context
// async function fetchAllProducts() {
//     const allProducts = {};
//     for (const [category, path] of Object.entries(productFiles)) {
//         try {
//             const categoryProducts = await fetchJSON(path);
//             allProducts[category] = categoryProducts;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     return allProducts;
// }
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// //fetch products that has Isfavorite= true and store all that product in favProduct {}
// const favProduct = {};
// let favoriteIdCounter = 1;
// async function fetchProductData(category,productId) {
//     console.log(category);
//     const filePath = `../products/${category}.json`;
//     const response = await fetch(filePath);
//     if (!response.ok) {
//         throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
//     }

//     const categoryProducts = await response.json();
//     return categoryProducts.find(p => p.id === parseInt(productId));
// }
// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// //this function below is about when click on each product then it's create an object that store all the product with IsFavorite= true
// //toggle icon to be red or gray
// async function toggleFavorite(event) {
//     const heartIcon = event.target;
//     const cateName = heartIcon.getAttribute('data-cateName');
//     const productId = heartIcon.getAttribute('data-id');
//     let isFavorite = heartIcon.getAttribute('data-favorite') === 'true';
//     isFavorite = !isFavorite;
//     heartIcon.setAttribute('data-favorite', isFavorite);
//     heartIcon.style.color =isFavorite? 'red':'gray';
//     try {
//         console.log(cateName);
//         console.log(productId);
//         const product = await fetchProductData(cateName,productId);
//         if (product) {
//             if (isFavorite) {
// // Assign a FavoriteId if it's marked as favorite
//                 if (!product.FavoriteId) {
//                     product.FavoriteId = favoriteIdCounter++;
//                 }
//                 favProduct[productId] = product;
//             } else {
//                 delete product.FavoriteId;
//                 delete favProduct[productId];
//             }
//       //      localStorage.setItem('favProduct', JSON.stringify(favProduct));
//             console.log(favProduct); 
           
//         }
//     } catch (error) {
//         console.error(`Error fetching product data for ID ${productId}:`, error);
//     }
//     }
// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// //list product by each category
// function displayCategoryProducts(category, products) {
//     const container = document.getElementById('product-container');
//   container.innerHTML = '';
//     products.forEach(product => {
//         const productDiv = document.createElement('div');
//         productDiv.classList.add('cart', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-5');
//         productDiv.innerHTML = `
//             <div class="card shadow-lg">
//             <a href="../Newarrival/newarrival-detail.html?id=${product.id}" class="text-decoration-none text-dark">
//                 <img class="card-img-top rounded" src="${product.img}" alt="${product.name}">
//             </a>
//                 <div class="card-body">
//                     <div class="card-title  text-center">
//                         <h5>${product.name}</h5>
//                     </div>
//                     <div class="card-text">
//                         <p>${product.description}</p>
//                     </div>
//                     <div class="card-price d-flex justify-content-between ">
//                   <div class="price d-flex align-items-center align-items-center ">
//                     <h6 class="text-decoration-line-through mt-2 button-cart-font">$${product["ori-price"]}</h6>
//                     <h6 class="mx-2 text-danger mt-2 button-cart-font">$${product.price}</h6>
//                   </div>
//                   <button class=" border-0 bg-transparent d-flex justify-content-between align-items-center button-cart-font">
//                     <i class="fa-solid fa-cart-shopping mx-3 mt-0" id="heart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>
//                     <i class="fa-solid fa-heart heart-icon mt-0" id="heart-${product.id}" data-cateName="${product.cateName}" data-id="${product.id}" data-favorite="${product.IsFavorite}" onclick="toggleFavorite(event)"></i>

//                   </button>
//                 </div>
//                 </div>
//             </div>
//         `;
//         container.appendChild(productDiv);
//     });
// }
// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");

    // ✅ Get category from query string
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (!category) {
        console.error("No category specified in URL");
        return;
    }

    // ✅ Set the page title to match the category
    const categoryTitle = document.getElementById("category-title");
    if (categoryTitle) {
        categoryTitle.textContent = category;
    }

    console.log("Fetching products for category:", category);

    fetch(`http://127.0.0.1:8000/api/product?product_type=${category}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(result => {
            const products = result.data;
            if (!Array.isArray(products)) {
                console.error("Data is not an array:", products);
                return;
            }

            if (products.length === 0) {
                productContainer.innerHTML = `<p class="text-center">No products found in this category.</p>`;
                return;
            }

            // ✅ Render product cards with updated style and direct image URL
            productContainer.innerHTML = products.map(item => {
                const imageUrl = item.img || 'path/to/fallback-image.jpg'; // Use fallback if no image URL
                return `
                    <div class=" col-sm-6 col-md-6 col-lg-3 mt-5">
                        <div class="cart shadow-lg ">
                            <a href="../Newarrival/newarrival-detail.html?id=${item.id}" class="text-decoration-none text-dark">
                                <img class="card-img-top rounded w-100" style="height: 200px; object-fit: cover;" src="${imageUrl}" alt="${item.name}">
                            </a>
                            <div class="card-body p-3">
                                <div class="card-title">
                                    <h5>${item.name}</h5>
                                </div>
                                <div class="card-text">
                                    <p>${item.description}</p>
                                </div>
                                <div class="card-price d-flex justify-content-between align-items-center">
                                    <div class="price d-flex mt-4">
                                        <h5 class="text-decoration-line-through">$${item.price}</h5>
                                        <h5 class="mx-2 text-danger">$${item.price_after_discount}</h5>
                                    
                                    </div>
                                    <div class="d-flex align-items-center gap-3">
                                        <button class="border-0 bg-transparent fs-4 me-2" onclick="addToCart(${item.id})">
                                            <i class="fa-solid fa-cart-shopping"></i>
                                        </button>
                                        <button class="border-0 bg-transparent fs-4" onclick="toggleFavorite(${item.id})">
                                            <i class="fa-solid fa-heart ${item.favorited_by_current_user ? 'text-danger' : ''}"></i>
                                        </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        })
        .catch(error => {
            console.error("Fetch error:", error);
            productContainer.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
        });
});

async function addToCart(productId) {
    try {
        const apiURL = "http://127.0.0.1:8000/api/cart/add";
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("⚠️ No authentication token found. User must log in first.");
            alert("You must be logged in to add to cart."); 
            return;
        }

        console.log("🛒 Adding to cart. Product ID:", productId);

        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                products: [
                    {
                        product_id: productId,
                        quantity: 1
                    }
                ]
            })
        });

        const result = await response.json();
        console.log("✅ Add to cart response:", result);

        if (response.ok && (result.success || result.message === "Products added to cart")) {
            alert("Products added to cart successfully! 🎉");
        } else {
            console.warn("⚠️ Failed to add to cart:", result.message);
            alert("Failed to add product to cart: " + (result.message || "Unknown error"));
        }


    } catch (error) {
        console.error("❌ Error adding product to cart:", error);
        alert("An error occurred while adding to cart. Please try again.");
    }
}

// Function to favorite/unfavorite product
async function toggleFavorite(productId, heartIconElement) {
    try {
        const apiURL = "http://127.0.0.1:8000/api/favorites/toggle"; // Replace with your Favorite API
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("⚠️ No authentication token found. User must log in first.");
            alert("You must be logged in to add to favorites.");
            return;
        }

        console.log("❤️ Toggling favorite status for product ID:", productId);

        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                product_id: productId
            })
        });

        const result = await response.json();
        console.log("API Response:", result);  // Log the API response to debug

        // Check if the response was successful and contains the necessary success message
        if (response.ok) {
            // Successfully added to favorite, toggle the heart icon state
            if (heartIconElement.classList.contains("filled")) {
                heartIconElement.classList.remove("filled");
                alert("Product removed from favorites!");
            } else {
                heartIconElement.classList.add("filled");
                alert("Product added to favorites!");
            }

            // Optionally reload or update the UI dynamically
            loadNewArrivals();  // Example: Update the UI, you may customize this function to reflect changes
        } else {
            console.warn("⚠️ API Error:", result.message || 'No message in response');
            alert(`Failed to favorite: ${result.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("❌ Error toggling favorite:", error);
        alert("Product Added to Favorites!");
    }
}

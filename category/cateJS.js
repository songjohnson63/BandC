
// get each product by each categroy 

async function showProducts(category) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';

  try {
      const response = await fetch(`../products/${category}.json`); 
      if (!response.ok) {
          throw new Error(`Failed to fetch ${category}.json`);
      }
      const products = await response.json();
      products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart', 'col-sm-6', 'col-md-6', 'col-lg-3', 'mt-5');

            productDiv.innerHTML = `
                <div class="card shadow-lg">
                    <img class="rounded" src="${product.img}" alt="${product.name}">
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
                                <i class="fa-solid fa-cart-shopping mx-3"></i>
                                <i class="fa-solid fa-heart heart-icon" id="heart-${product.id}" data-id="${product.id}"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(productDiv);
        });



        //add action to the heart-icon 
        document.querySelectorAll('.heart-icon').forEach(icon=>{
            icon.onclick=()=> toggleFavorite(parseInt(icon.getAttribute('data-id')));
        });
        
        function toggleFavorite(productId){
            const product = products.find(p => p.id === productId);
            if(product){
                product.IsFavorite=!product.IsFavorite;
                const heartIcon= document.getElementById(`heart-${productId}`);
                if (product.IsFavorite) {
                    heartIcon.style.color = 'red';
                } else {
                    heartIcon.style.color = 'gray';
                }
            }
        }

  } catch (error) {
      console.error('Error fetching the products:', error);
      container.innerHTML = `<p>Could not load ${category} products. Please try again later.</p>`;
  }
}




//for click on category and show the category title

document.addEventListener("DOMContentLoaded", function() {
  const categoryTitle = document.getElementById("category-title");

function getParameterByName(name){                                            //for get the category title parameter from ?category=............
  const urlPar = new URLSearchParams(window.location.search);    /// will get the url but get after ? symbol
  return urlPar.get(name);   // this will return the value of category(name)=  
}

const category = getParameterByName('category');
if(categoryTitle.textContent && category){
  categoryTitle.textContent = category;
}

if (category) {
  showProducts((category.toLowerCase()));       //display product
}

});



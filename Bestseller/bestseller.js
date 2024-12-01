
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
            <a href="../Newarrival/newarrival-detail.html?id=${item.id}" class="text-decoration-none text-dark">
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
    ['../products/moisturizer.json', 'Moisturizer'],
    ['../products/sunscreen.json', 'Sunscreen'],
    ['../products/serum.json', 'Serum'],
    ['../products/cleanser.json', 'Cleanser'],
    ['../products/toner.json', 'Toner']
    
  ];
  
  jsonFiles.forEach(([url, categoryName]) => {
    loadProducts(url, categoryName);
  });

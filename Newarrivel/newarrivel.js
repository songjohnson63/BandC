
// Fetch JSON and populate the product cards
fetch('../products/cleanser.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('products-container');

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('cart', 'col-sm-6', 'col-md-6', 'col-lg-3', 'mt-5');

            card.innerHTML = `
                        <div class="card shadow-lg">
                            <img class="rounded" src="${item.img}" alt="${item.name}" >
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
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));



    

fetch('../products/sunscreen.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('products-container');

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('cart', 'col-sm-6', 'col-md-6', 'col-lg-3', 'mt-5');

            card.innerHTML = `
                        <div class="card shadow-lg">
                            <img class="rounded" src="${item.img}" alt="${item.name}" >
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
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));



fetch('../products/serum.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('products-container');

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('cart', 'col-sm-6', 'col-md-6', 'col-lg-3', 'mt-5');

            card.innerHTML = `
                        <div class="card shadow-lg">
                            <img class="rounded" src="${item.img}" alt="${item.name}" >
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
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));





fetch('../products/sunscreen.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('products-container');

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('cart', 'col-sm-6', 'col-md-6', 'col-lg-3', 'mt-5');

            card.innerHTML = `
                        <div class="card shadow-lg">
                            <img class="rounded" src="${item.img}" alt="${item.name}" >
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
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));




fetch('../products/toner.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('products-container');

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('cart', 'col-sm-6', 'col-md-6', 'col-lg-3', 'mt-5');

            card.innerHTML = `
                        <div class="card shadow-lg">
                            <img class="rounded" src="${item.img}" alt="${item.name}" >
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
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));


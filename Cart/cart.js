document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Page Loaded - Fetching Cart Products...");
    await loadCartProducts();
});

async function loadCartProducts() {
    try {
        const apiURL = "http://127.0.0.1:8000/api/cart";
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            console.error("⚠️ No authentication token found. User might not be logged in.");
            document.getElementById("product-container").innerHTML = "<p class='text-center text-danger'>Please log in to view your cart.</p>";
            return;
        }

        console.log("🔍 Fetching from API:", apiURL);

        const response = await fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ API Response:", result);

        if (!result.data || !result.data.cart_items || result.data.cart_items.length === 0) {
            console.warn("⚠️ No cart products found.");
            document.getElementById("product-container").innerHTML = "<p class='text-center'>No cart products found.</p>";
            return;
        }

        const container = document.getElementById("product-container");
        container.innerHTML = "";
        let totalCartPrice = 0;

        result.data.cart_items.forEach(item => {
            const product = item.product;
            const imgPath = product.img.includes('public') ? product.img : `/storage/${product.img}`;
            const totalPrice = (product.price_after_discount * item.quantity).toFixed(2);

            const productDiv = document.createElement("div");
            productDiv.classList.add("cart", "col-sm-6", "col-md-6", "col-lg-3", "mt-5");
            productDiv.style.width = "49%";

            productDiv.innerHTML = `
                <div class="card shadow-lg" style="flex-direction: row;">
                    <img class="rounded" src="http://127.0.0.1:8000/storage/${product.img}" alt="Product Image" style="width: 30%; height: 40vh">
                    <div class="card-body" style="width: 70%">
                        <div class="card-title" style="height: 17%;">
                            <h6 class="fs-5" style="font-weight: bold;">${product.name}</h6>
                        </div>
                        <div class="card-title" style="height: 40%; font-size: 13px;">
                            <p><span style="font-weight: bold;">Description:</span> ${product.description}</p>
                        </div>
                        <div class="card-text" style="height: 15%; font-size: 13px;">
                            <p><span style="font-weight: bold;">Key Ingredient:</span> ${product.key_ingredient}</p>
                        </div>
                        <div class="card-text" style="height: 10%; font-size: 13px;">
                            <p><span style="font-weight: bold;">Volume:</span> ${product.volume}</p>
                        </div>
                        <div class="card-price d-flex mt-1" style="justify-content: space-between; height: 10%; align-items: center;">
                            <div class="price d-flex">
                                <h5 class="text-decoration-line-through">$${product.price}</h5>
                                <h5 class="mx-2 text-danger">$${product.price_after_discount}</h5>
                            </div>
                            <button type="button" class="btn btn-secondary" style="border-radius:50%;" id="decrease-btn-${item.id}">-</button>
                            <input type="number" id="quantity-display-${item.id}" value="${item.quantity}" min="1" style="width: 50px; text-align: center;" data-price="${product.price_after_discount}">
                            <button type="button" class="btn btn-secondary" style="border-radius:50%;" id="increase-btn-${item.id}">+</button>
                        </div>
                        <div class="total-price mt-2" style="display:none;">Total: $<span id="total-price-${item.id}">${totalPrice}</span></div>
                    </div>
                </div>
            `;

            container.appendChild(productDiv);

            document.getElementById(`decrease-btn-${item.id}`).addEventListener("click", () => updateQuantity(item.id, "decrease"));
            document.getElementById(`increase-btn-${item.id}`).addEventListener("click", () => updateQuantity(item.id, "increase"));
            document.getElementById(`quantity-display-${item.id}`).addEventListener("change", (event) => updateQuantity(item.id, "manual", event.target.value));

            // Add the current item's total price to the cart total
            totalCartPrice += parseFloat(totalPrice);
        });

        // Update the total price in the header section
        document.getElementById("total-price").innerText = `Total: $${totalCartPrice.toFixed(2)}`;

    } catch (error) {
        console.error("❌ Error fetching cart products:", error);
        document.getElementById("product-container").innerHTML = "<p class='text-center text-danger'>Failed to load cart products. Please try again later.</p>";
    }
}

async function updateQuantity(cartItemId, action, manualValue = null) {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        console.error("⚠️ No authentication token found.");
        return;
    }

    try {
        const quantityInput = document.getElementById(`quantity-display-${cartItemId}`);
        let currentQuantity = parseInt(quantityInput.value);

        if (action === "increase") {
            currentQuantity++;
        } else if (action === "decrease" && currentQuantity > 1) {
            currentQuantity--;
        } else if (action === "manual" && manualValue) {
            currentQuantity = parseInt(manualValue);
        }

        quantityInput.value = currentQuantity;

        // Update the total price for this product
        updateTotalPrice(cartItemId);

        // Recalculate the total price for the entire cart
        updateCartTotalPrice();

        // Update the backend with the new quantity
        const apiURL = `http://127.0.0.1:8000/api/cart/update/${cartItemId}`;
        await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ quantity: currentQuantity })
        });
    } catch (error) {
        console.error("❌ Error updating quantity:", error);
    }
}

function updateTotalPrice(cartItemId) {
    const quantityInput = document.getElementById(`quantity-display-${cartItemId}`);
    const currentQuantity = parseInt(quantityInput.value);

    const productPrice = parseFloat(quantityInput.dataset.price);

    if (isNaN(productPrice)) {
        console.error("❌ Invalid price value.");
        return;
    }

    const totalPrice = (currentQuantity * productPrice).toFixed(2);

    document.getElementById(`total-price-${cartItemId}`).innerText = totalPrice;
}

function updateCartTotalPrice() {
    let totalCartPrice = 0;
    
    // Calculate the total price of the cart again after any changes
    const cartItems = document.querySelectorAll('.cart');
    cartItems.forEach(item => {
        const itemId = item.querySelector('.total-price span').id.split('-')[2];
        const itemTotalPrice = parseFloat(document.getElementById(`total-price-${itemId}`).innerText);
        totalCartPrice += itemTotalPrice;
    });

    // Update the total price displayed outside the cart
    document.getElementById("total-price").innerText = `Total: $${totalCartPrice.toFixed(2)}`;
}

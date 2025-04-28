document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Page Loaded - Fetching Cart Products...");
    await loadCartProducts();

    await loadCartProducts();

    // Attach event listener for "Purchase Now" button
    document.querySelector("[data-bs-target='#paymentModal']").addEventListener("click", loadPaymentModal);
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
            productDiv.style.position = "relative"; // Set relative positioning for the container

            productDiv.innerHTML = `
                <div class="card shadow-lg" style="flex-direction: row;">
                    <img class="rounded" src="http://127.0.0.1:8000/storage/${product.img}" alt="Product Image" style="width: 50%; height: 40vh">
                    <div class="card-body" style="width: 70%; padding:30px;">
                        <button type="button" class="btn" id="delete-btn-${item.id}" style="position: absolute; top: 1px; left: 10px; border: none; background: transparent; font-size: 1.5em; color: red; cursor: pointer;">
                            <i class="fas fa-times"></i> <!-- Font Awesome X Icon -->
                        </button>

                        <!-- Product Name and other details -->
                        <div class="card-title" style="height: 17%; margin-top: 5px;"> <!-- Added margin-top for spacing -->
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

            // Add event listener for delete button (X icon)
            document.getElementById(`delete-btn-${item.id}`).addEventListener("click", async () => {
                // Show confirmation popup
                document.getElementById('confirmation-popup').style.display = 'flex';
            
                // Get the buttons
                const cancelBtn = document.getElementById('cancel-btn');
                const confirmBtn = document.getElementById('confirm-btn');
            
                // When cancel is clicked, hide the popup
                cancelBtn.addEventListener('click', () => {
                    document.getElementById('confirmation-popup').style.display = 'none';
                });
            
                // When confirm is clicked, remove the product and refresh the page
                confirmBtn.addEventListener('click', async () => {
                    try {
                        const removeRes = await fetch(`http://127.0.0.1:8000/api/cart/remove/${item.id}`, {
                            method: "DELETE",
                            headers: {
                                "Authorization": `Bearer ${authToken}`,
                                "Content-Type": "application/json"
                            }
                        });
            
                        const removeResult = await removeRes.json();
            
                        // ✅ Fix: use removeResult instead of result
                        if (removeResult.success || removeResult.message === "Item removed from cart") {
                            document.getElementById('confirmation-popup').style.display = 'none';
                            location.reload(); // Refresh page after removal
                        } else {
                            console.warn("Failed to remove:", removeResult.message);
                        }
                    } catch (error) {
                        console.error("❌ Error removing product:", error);
                    }
                });
            });
            
            
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


let updateTimeout; // Global variable to manage debounce

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
        updateTotalPrice(cartItemId);
        updateCartTotalPrice();

        // 🔹 Ensure quantity is sent to the backend before refreshing cart
        const apiURL = `http://127.0.0.1:8000/api/cart/update/${cartItemId}`;
        console.log(`🚀 Updating cart item ${cartItemId} with quantity:`, currentQuantity);

        const response = await fetch(apiURL, {
            method: "POST", // ✅ Make sure this matches the Laravel route method
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ quantity: currentQuantity }) // ✅ Send updated quantity
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const result = await response.json();
        console.log("✅ API Response:", result);

        // 🔄 Refresh cart AFTER saving the quantity
        await loadCartProducts();

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

async function loadPaymentModal() {
    console.log("🛒 Updating Payment Modal...");
    const cartItems = document.querySelectorAll("#product-container .cart");
    const paymentTableBody = document.querySelector("#payment-table tbody");
    paymentTableBody.innerHTML = ""; // Clear previous modal content

    let totalPaymentAmount = 0;

    cartItems.forEach((cartItem) => {
        const productImage = cartItem.querySelector("img").src; // Get the product image source
        const productName = cartItem.querySelector(".fs-5").innerText;
        const quantity = cartItem.querySelector("input[type='number']").value;
        const discountPrice = cartItem.querySelector(".text-danger").innerText.replace("$", "");
        const totalPrice = (parseFloat(discountPrice) * parseInt(quantity)).toFixed(2);

        totalPaymentAmount += parseFloat(totalPrice);

        // Append a new row for each product with image + name in the Payment Modal
        const row = `
            <tr>
                <td>
                    <img src="${productImage}" alt="${productName}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    ${productName}
                </td>
                <td>${quantity}</td>
                <td>$${discountPrice}</td>
                <td id="td-price">$${totalPrice}</td>
            </tr>
        `;
        paymentTableBody.innerHTML += row;
    });

    // Update total amount in the payment modal
    document.getElementById("total-amount").innerText = `Total: $${totalPaymentAmount.toFixed(2)}`;
}

document.getElementById('order-button').addEventListener('click', async function () {
    const address = document.getElementById('address').value;
    const token = localStorage.getItem("authToken");

    if (!address) {
        alert("Please enter your pick-up address!");
        return;
    }

    try {
        const cartRes = await fetch("http://127.0.0.1:8000/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const cartData = await cartRes.json();
        const cartItemIds = cartData.data.cart_items.map(item => item.id);
        const total = cartData.data.total;

        const paymentRes = await fetch("http://127.0.0.1:8000/api/payment", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                total: total,
                pick_up_address: address,
                payment_method: "ABA KHQR", // Static for now
                cart_item_ids: cartItemIds
            })
        });

        const paymentResult = await paymentRes.json();

        if (paymentResult.success) {
            // ✅ Payment saved — open receipt in a new tab
            window.open('../Receipt/receipt.html', '_blank'); // This opens a new tab
        } else {
            alert("❌ Payment failed: " + paymentResult.message);
        }
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Something went wrong!");
    }

});
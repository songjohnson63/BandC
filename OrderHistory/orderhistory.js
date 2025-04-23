document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Page Loaded - Fetching Order History...");
    await loadOrderHistory();

    async function loadOrderHistory() {
        const container = document.querySelector(".container");
        container.innerHTML = "<h2>Order History</h2>";

        try {
            const apiURL = "http://127.0.0.1:8000/api/order-history";
            const authToken = localStorage.getItem("authToken");

            if (!authToken) {
                console.warn("⚠️ No authentication token found.");
                container.innerHTML += "<p class='text-danger'>Please log in to view your order history.</p>";
                return;
            }

            const response = await fetch(apiURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();
            console.log("📦 API Response:", res);

            const orders = res.data || [];

            if (!orders.length) {
                container.innerHTML += "<p class='text-center'>No orders found.</p>";
                return;
            }

            const groupedOrders = {};

            // Group orders by date
            orders.forEach(order => {
                if (!groupedOrders[order.date]) {
                    groupedOrders[order.date] = [];
                }
                groupedOrders[order.date].push(order);
            });

            for (const [date, ordersOnDate] of Object.entries(groupedOrders)) {
                const orderGroup = document.createElement("div");
                orderGroup.classList.add("order-group");

                const orderDate = document.createElement("div");
                orderDate.classList.add("order-date");
                orderDate.textContent = date;
                orderGroup.appendChild(orderDate);

                ordersOnDate.forEach(order => {
                    const orderItem = document.createElement("div");
                    orderItem.classList.add("order-item");

                    const orderDetails = document.createElement("div");
                    orderDetails.classList.add("order-details");

                    const price = document.createElement("div");
                    price.classList.add("price");
                    price.textContent = `$${parseFloat(order.total_price).toFixed(2)}`;

                    const description = document.createElement("div");
                    description.classList.add("description");

                    const productList = order.products.length > 0
                        ? order.products.map(p => `${p.name}`).join(", ")
                        : "Unknown items";

                    description.textContent = `Purchased: ${productList}`;

                    orderDetails.appendChild(price);
                    orderDetails.appendChild(description);

                    const reorderButton = document.createElement("button");
                    reorderButton.classList.add("reorder-button");
                    reorderButton.textContent = "Re-Order";

                    // ✅ Add data-payment-id attribute
                    reorderButton.setAttribute("data-payment-id", order.payment_id);

                    orderItem.appendChild(orderDetails);
                    orderItem.appendChild(reorderButton);

                    orderGroup.appendChild(orderItem);
                });

                container.appendChild(orderGroup);
            }

        } catch (error) {
            console.error("❌ Error loading order history:", error);
            container.innerHTML += "<p class='text-danger'>Failed to load order history. Please try again later.</p>";
        }
    }

    // Handle Re-Order Button Click
   document.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('reorder-button')) {
        const paymentId = event.target.getAttribute('data-payment-id');
        console.log("🖱️ Clicked Reorder for Payment ID:", paymentId);

        if (paymentId) {
            loadPaymentDetails(paymentId);

            // Show the Bootstrap modal
            const myModal = new bootstrap.Modal(document.getElementById('paymentModal'));
            myModal.show();
        } else {
            console.warn("⚠️ No payment ID found for this button.");
        }
    }
});


    // Load Payment Details
    async function loadPaymentDetails(paymentId) {
        const token = localStorage.getItem("authToken");
        const paymentTableBody = document.querySelector("#paymentDetailsTable tbody");
        paymentTableBody.innerHTML = ""; // Clear previous rows
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/payments/${paymentId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
    
            if (data.status === "success") {
                const products = data.data;  // <-- data.data is now an array of products
                let totalAmount = 0;
            
                products.forEach(product => {
                    const productImage = product.image || "/images/default.jpg";
                    const name = product.product_name || "Unnamed";
                    const quantity = product.quantity || 1;
                    const price = parseFloat(product.price || 0);
                    const totalPrice = (price * quantity).toFixed(2);
            
                    totalAmount += parseFloat(totalPrice);
            
                    const row = `
                        <tr>
                            <td>
                                <img src="${productImage}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                                ${name}
                            </td>
                            <td>${quantity}</td>
                            <td>$${price.toFixed(2)}</td>
                            <td>$${totalPrice}</td>
                        </tr>
                    `;
                    paymentTableBody.innerHTML += row;
                });
            
                document.getElementById("total-amount").innerText = `Total: $${totalAmount.toFixed(2)}`;
            }
            else {
                paymentTableBody.innerHTML = "<tr><td colspan='4'>No products found.</td></tr>";
            }
        } catch (error) {
            console.error("Error loading payment details:", error);
            paymentTableBody.innerHTML = "<tr><td colspan='4'>Error loading data.</td></tr>";
        }
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
    
    
});

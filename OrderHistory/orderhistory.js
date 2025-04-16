
document.addEventListener("DOMContentLoaded", async function () {
    console.log("🚀 Page Loaded - Fetching Order History...");
    await loadOrderHistory();
});

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
                description.textContent = `Purchased : ${order.products.join(", ")}`;

                orderDetails.appendChild(price);
                orderDetails.appendChild(description);

                const reorderButton = document.createElement("button");
                reorderButton.classList.add("reorder-button");
                reorderButton.textContent = "Re-Order";

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


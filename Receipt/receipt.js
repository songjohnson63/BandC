async function loadReceipt() {
  const token = localStorage.getItem("authToken"); // Get token from localStorage

  if (!token) {
    console.error("❌ No token found in localStorage.");
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const { total, cart_items } = data.data;

    // 🕒 Display date & time
    const now = new Date();
    const formattedDate =
      now.getFullYear() +
      "/" +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      now.getDate().toString().padStart(2, "0") +
      " " +
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.getElementById("date-time").innerText = `Date : ${formattedDate}`;

    // 🛍️ Display product items
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = ""; // Clear previous items if any

    cart_items.forEach((item) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <h4>${item.quantity}x ${item.product.name}</h4>
        <h4>$${(item.product.price_after_discount * item.quantity).toFixed(2)}</h4>
      `;
      productsContainer.appendChild(productDiv);
    });

    // 💵 Display total price
    document.getElementById("total-price").innerText = `$${parseFloat(total).toFixed(2)}`;

  } catch (err) {
    console.error("❌ Failed to load receipt:", err);
    document.getElementById("products").innerHTML = "<p>Failed to load receipt.</p>";
  }
}

loadReceipt();

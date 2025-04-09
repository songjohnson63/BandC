const searchIcon = document.querySelector('.search-icon');
const searchForm = document.querySelector('.search-form');
const overlay = document.querySelector('.overlay');
const searchDropdown = document.getElementById("search-dropdown");

// Show search form
searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchForm.style.display = 'block';
    overlay.classList.add('active');
});

// Hide search form when clicking overlay
overlay.addEventListener('click', () => {
    searchForm.style.display = 'none';
    overlay.classList.remove('active');
});

let allProducts = [];

// Load products from your real API
async function loadProducts() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/product"); // use your actual endpoint here
        const json = await response.json();
        allProducts = json.data || [];
        console.log("Loaded from API:", allProducts);
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

// Filter by search query
function filterProducts(query) {
    const lowerCaseQuery = query.toLowerCase();
    return allProducts.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery)
    );
}

// Update the dropdown with filtered results
function updateDropdown(filteredProducts) {
    searchDropdown.innerHTML = ""; // Clear previous

    if (filteredProducts.length === 0) {
        searchDropdown.style.display = "none";
        return;
    }

    searchDropdown.style.display = "block";
    filteredProducts.forEach(product => {
        const listItem = document.createElement("li");
        listItem.style.padding = "5px 10px";
        listItem.style.cursor = "pointer";

        const link = document.createElement("a");
        link.href = `../Newarrival/newarrival-detail.html?id=${product.id}`;
        link.style.textDecoration = "none";
        link.style.color = "inherit";

        link.innerHTML = `
            <img src="${product.img}" alt="${product.name}" style="width: 40px; height: 40px; margin-right: 10px; vertical-align: middle;">
            <span>${product.name} - $${product.price_after_discount ?? product.price}</span>
        `;

        listItem.appendChild(link);
        searchDropdown.appendChild(listItem);
    });
}

// Search input behavior
const searchBox = document.querySelector(".form-control");
searchBox.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    if (query.length > 0) {
        const filtered = filterProducts(query);
        updateDropdown(filtered);
    } else {
        searchDropdown.style.display = "none";
    }
});

// Hide dropdown if clicked outside
document.addEventListener("click", (event) => {
    if (!searchDropdown.contains(event.target) && event.target !== searchBox) {
        searchDropdown.style.display = "none";
    }
});

// Load on page load
loadProducts();

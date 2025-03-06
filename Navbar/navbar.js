// navbar.js

// Function to show the search form and overlay
const searchIcon = document.querySelector('.search-icon');
const searchForm = document.querySelector('.search-form');
const overlay = document.querySelector('.overlay');
const searchDropdown = document.getElementById("search-dropdown");

searchIcon.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    searchForm.style.display = 'block';
    overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
    searchForm.style.display = 'none';
    overlay.classList.remove('active');
});

// Now, we will load the products for search functionality

const jsonFiles = [
    "../products/cleanser.json",
    "../products/moisturizer.json",
    "../products/sunscreen.json",
    "../products/toner.json",
    "../products/serum.json"
];

let allProducts = [];

// Load products from all JSON files
async function loadProducts() {
    const fetchPromises = jsonFiles.map((file) =>
        fetch(file)
            .then((response) => {
                if (!response.ok) {
                    console.error(`Failed to load ${file}`);
                    return [];
                }
                return response.json();
            })
            .catch((error) => {
                console.error(`Error loading ${file}:`, error);
                return [];
            })
    );

    const results = await Promise.all(fetchPromises);
    allProducts = results.flat(); // Combine all products into one array
    console.log("All Products Loaded:", allProducts);
}

// Function to filter products based on search query
function filterProducts(query) {
    const lowerCaseQuery = query.toLowerCase();
    return allProducts.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseQuery)
    );
}

// Function to update the dropdown with the filtered products
// Function to update the dropdown with the filtered products
function updateDropdown(filteredProducts) {
    const dropdown = document.getElementById("search-dropdown");
    dropdown.innerHTML = ""; // Clear previous results

    if (filteredProducts.length === 0) {
        dropdown.style.display = "none"; // Hide dropdown if no results
        return;
    }

    dropdown.style.display = "block"; // Show dropdown
    filteredProducts.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.style.padding = "5px 10px";
        listItem.style.cursor = "pointer";

        // Create a link element for each product
        const link = document.createElement("a");
        link.href = `../Newarrival/newarrival-detail.html?id=${product.id}`;  // Product detail page URL
        link.style.textDecoration = "none";
        link.style.color = "inherit";

        // Add product details inside the link
        link.innerHTML = `
            <img src="${product.img}" alt="${product.name}" style="width: 40px; height: 40px; margin-right: 10px; vertical-align: middle;">
            <span>${product.name} - $${product.price}</span>
        `;

        listItem.appendChild(link);
        dropdown.appendChild(listItem);
    });
}


// Handle input events in the search box
const searchBox = document.querySelector(".form-control");
searchBox.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    if (query.length > 0) {
        const filteredProducts = filterProducts(query);
        updateDropdown(filteredProducts);
    } else {
        const dropdown = document.getElementById("search-dropdown");
        dropdown.style.display = "none"; // Hide dropdown if input is empty
    }
});

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("search-dropdown");
    if (!dropdown.contains(event.target) && event.target !== searchBox) {
        dropdown.style.display = "none";
    }
});

// Load products on page load
loadProducts().catch((error) => console.error("Error loading products:", error));
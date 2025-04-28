// ========================
// Dropdown Caret Animation
// ========================
const dropdownButtons = document.querySelectorAll('.dropdown-click');
dropdownButtons.forEach(button => {
    const dropdownIcon = button.querySelector('.fa-caret-down');
    button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded');
        dropdownIcon.style.transition = 'transform 0.3s ease-in-out';
        dropdownIcon.style.transform = isExpanded === 'true' ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'aria-expanded') {
                const newValue = mutation.target.getAttribute('aria-expanded');
                dropdownIcon.style.transition = 'transform 0.3s ease-in-out';
                dropdownIcon.style.transform = newValue === 'true' ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    });

    observer.observe(button, { attributes: true, attributeFilter: ['aria-expanded'] });
});

// ===========================
// Navbar Menu Toggle to "X"
// ===========================
const toggleBtn = document.getElementById('toggleBtn');
const collapseElement = document.getElementById('navbarSupportedContent');
const iconWrapper = document.getElementById('iconWrapper');
const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });

function swapIcon(content) {
    iconWrapper.style.opacity = '0';
    iconWrapper.style.transform = 'scale(0.8)';
    setTimeout(() => {
        iconWrapper.innerHTML = content;
        iconWrapper.style.opacity = '1';
        iconWrapper.style.transform = 'scale(1)';
    }, 200);
}

collapseElement.addEventListener('show.bs.collapse', () => {
    swapIcon('<i class="fa-solid fa-xmark fa-lg" style="color: #717171;margin-left: 7px"></i>');
});

collapseElement.addEventListener('hide.bs.collapse', () => {
    swapIcon('<span class="navbar-toggler-icon"></span>');
});


// ===========================
// Search Logic
// ===========================
const searchIcon = document.querySelector('.search-icon');
const searchForm = document.querySelector('.search-form');
const overlay = document.querySelector('.overlay');
const searchDropdown = document.getElementById("search-dropdown");
const searchBox = document.querySelector(".form-control");

let allProducts = [];

// Show search form
searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchForm.style.display = 'block';
    overlay.classList.add('active');
    searchBox.focus();
});

// Hide search form when clicking overlay
overlay.addEventListener('click', () => {
    searchForm.style.display = 'none';
    overlay.classList.remove('active');
});

// Load products from API
async function loadProducts() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/product");
        const json = await response.json();

        // Debug log
        console.log("API Response:", json);

        allProducts = json.data || [];
        console.log("Loaded products:", allProducts);
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

// Filter by search query
function filterProducts(query) {
    const lowerCaseQuery = query.toLowerCase();
    return allProducts.filter(product =>
        product.name && product.name.toLowerCase().includes(lowerCaseQuery)
    );
}

// Update the dropdown with filtered results
function updateDropdown(filteredProducts) {
    searchDropdown.innerHTML = "";

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
searchBox.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    console.log("User typed:", query);

    if (query.length > 0) {
        const filtered = filterProducts(query);
        console.log("Filtered products:", filtered);
        updateDropdown(filtered);
    } else {
        searchDropdown.style.display = "none";
    }
});

// Hide dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!searchDropdown.contains(event.target) && event.target !== searchBox) {
        searchDropdown.style.display = "none";
    }
});

// Load products on page load
loadProducts();

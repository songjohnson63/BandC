const searchIcon = document.querySelector('.search-icon');
const searchForm = document.querySelector('.search-form');
const overlay = document.querySelector('.overlay');

// Show the search form and blur the background
searchIcon.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    searchForm.style.display = 'block';
    overlay.classList.add('active');
});

// Hide the search form and remove the blur effect
overlay.addEventListener('click', () => {
    searchForm.style.display = 'none';
    overlay.classList.remove('active');
});


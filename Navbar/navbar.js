//js code for dropdown list animation on button click
const dropdownButtons = document.querySelectorAll('.dropdown-click');
dropdownButtons.forEach(button => {
    const dropdownIcon = button.querySelector('.fa-caret-down');
    button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded');
        dropdownIcon.style.transition = 'transform 0.3s ease-in-out';

        if (isExpanded === 'true') {
            dropdownIcon.style.transform = 'rotate(180deg)';
        } else if (isExpanded === 'false') {
            dropdownIcon.style.transform = 'rotate(0deg)';
        }
    });
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'aria-expanded') {
                const newValue = mutation.target.getAttribute('aria-expanded');
                dropdownIcon.style.transition = 'transform 0.3s ease-in-out';

                if (newValue === 'true') {
                    dropdownIcon.style.transform = 'rotate(180deg)';
                } else if (newValue === 'false') {
                    dropdownIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
    observer.observe(button, {
        attributes: true,
        attributeFilter: ['aria-expanded']
    });
});
//end of js code for dropdown list animation on button click

// js code for change button from navbar menu icon to X 
const toggleBtn = document.getElementById('toggleBtn');
const collapseElement = document.getElementById('navbarSupportedContent');
const iconWrapper = document.getElementById('iconWrapper');
const bsCollapse = new bootstrap.Collapse(collapseElement, {
  toggle: false
});
function swapIcon(content) {
    iconWrapper.style.opacity = '0'; // fade out
    iconWrapper.style.transform = 'scale(0.8)'; 
  
    setTimeout(() => {
      iconWrapper.innerHTML = content;
      iconWrapper.style.opacity = '1'; // fade in
      iconWrapper.style.transform = 'scale(1)';
    }, 200); 
  }
  collapseElement.addEventListener('show.bs.collapse', () => {
    swapIcon('<i class="fa-solid fa-xmark fa-lg" style="color: #717171;margin-left: 7px"></i>');
  });
  collapseElement.addEventListener('hide.bs.collapse', () => {
    swapIcon('<span class="navbar-toggler-icon"></span>');
  });
  //end of js code for change button from navbar menu icon to X

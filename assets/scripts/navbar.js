// Code for responsive navbar display

// Caching DOM elements
const responsiveNavbar = document.querySelector('.topnav .navbar');
const navbarToggle = document.querySelector('.topnav .navbar-toggle');

// Toggling the navbar 'responsive' class when clicking on the toggle button
navbarToggle.addEventListener('click', (e) => {
    responsiveNavbar.classList.toggle('responsive');
});
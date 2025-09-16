// js/main.js

// Import the product data and UI functions from our other files.

import { products } from './product.js';
import { displayProducts, showProductDetails, updateCartUI, showToast } from './ui.js';


// Wait for the HTML to be fully loaded before running our script.
document.addEventListener('DOMContentLoaded', () => {

    // --- STATE ---
    // This object holds the current state of our application.
    let cart = [];
    
    // --- ELEMENT SELECTORS ---
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const cartIcon = document.getElementById('cart-icon-container');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout-btn');
    const productModal = document.getElementById('product-modal');


    // --- FILTER & RENDER LOGIC ---
    function handleFilteringAndRendering() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;

        let productsToDisplay = [...products];

        if (category !== 'all') {
            productsToDisplay = productsToDisplay.filter(p => p.category === category);
        }
        if (searchTerm) {
            productsToDisplay = productsToDisplay.filter(p => p.name.toLowerCase().includes(searchTerm));
        }
        if (sortBy === 'price-asc') {
            productsToDisplay.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            productsToDisplay.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating-desc') {
            productsToDisplay.sort((a, b) => b.rating - a.rating);
        }

        // Call the imported displayProducts function from ui.js
        displayProducts(productsToDisplay, productGrid);
    }


    // --- CART LOGIC ---
    function addToCart(product) {
        cart.push(product);
        // Call the imported updateCartUI function from ui.js
        updateCartUI(cart);
    }


    // --- EVENT LISTENERS ---
    searchInput.addEventListener('input', handleFilteringAndRendering);
    categoryFilter.addEventListener('change', handleFilteringAndRendering);
    sortFilter.addEventListener('change', handleFilteringAndRendering);
    
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if(cart.length > 0) {
            cartSidebar.classList.remove('active');
            checkoutModal.classList.add('active');
        } else {
            showToast("Your cart is empty.");
        }
    });

    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    // Special event listener for the "Add to Cart" button inside the modal
    // We use event delegation because the button is created dynamically.
    productModal.addEventListener('click', (event) => {
        if (event.target.id === 'modal-add-to-cart-btn') {
            const product = event.target._product;
            addToCart(product);

            // Call the imported showToast function from ui.js
            showToast(`${product.name} added to cart!`);
            productModal.classList.remove('active');
        }
    });


    // --- INITIALIZATION ---
    // Show the products for the first time when the page loads.
    handleFilteringAndRendering();
});

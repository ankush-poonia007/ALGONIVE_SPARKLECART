// js/ui.js

// --- RENDER PRODUCTS ---
// This function is responsible for showing the products on the main page.
function displayProducts(productsToDisplay, productGrid) {
    // First, clear out any old products
    productGrid.innerHTML = '';

    // Now, create the HTML for each product and add it to the page
    for (let i = 0; i < productsToDisplay.length; i++) {
        const product = productsToDisplay[i];
        
        // Create the product card element directly
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Set its inner HTML content
        productCard.innerHTML = `
            <img src="${Object.values(product.images)[0][0]}" alt="${product.name}">
            <div class="product-card-info">
                <h3 style="font-size: 18px; font-weight: bold;">${product.name}</h3>
                <p style="color: #777;">${product.brand}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <span style="font-size: 20px; font-weight: bold; color: #1e40af;">₹${product.price}</span>
                    <span>⭐ ${product.rating}</span>
                </div>
            </div>
        `;
        
        // Add the click listener directly to the card
        productCard.addEventListener('click', () => {
            showProductDetails(product);
        });

        // Append the finished card to the grid
        productGrid.appendChild(productCard);
    }
}


// --- SHOW PRODUCT DETAILS ---
// This function creates the HTML for the product detail popup (modal).
function showProductDetails(product) {
    const productModal = document.getElementById('product-modal');
    const modalContentBox = document.getElementById('modal-content-box');

    modalContentBox.innerHTML = `
        <div style="padding: 25px;">
            <button id="close-modal-btn" style="position: absolute; top: 10px; right: 15px; font-size: 28px; border: none; background: none; cursor: pointer;">&times;</button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                <div>
                    <img src="${Object.values(product.images)[0][0]}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
                </div>
                <div>
                    <h2 style="font-size: 28px; font-weight: bold;">${product.name}</h2>
                    <p style="color: #777; margin-bottom: 15px;">${product.brand}</p>
                    <p style="font-size: 32px; font-weight: bold; color: #1e40af; margin-bottom: 20px;">₹${product.price}</p>
                    <h3 style="font-weight: 600;">Description:</h3>
                    <p style="margin-bottom: 15px;">${product.description}</p>
                    <h3 style="font-weight: 600;">Specifications:</h3>
                    <p style="margin-bottom: 20px;">${product.specifications}</p>
                    <button class="primary-button" id="modal-add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    productModal.classList.add('active');

    // We must re-select the buttons inside the modal every time it's shown
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    // We need to pass the 'addToCart' and 'showToast' functions from main.js
    // For now, we'll just set up the click listener.
    // In main.js, we will define what happens when this is clicked.
    document.getElementById('modal-add-to-cart-btn')._product = product;
}

function updateCartUI(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartItemCountEl = document.getElementById('cart-item-count');

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align: center; color: #888;">Your cart is empty.</p>`;
    } else {
        for(let i=0; i < cart.length; i++) {
            const product = cart[i];
            subtotal += product.price;
            cartItemsContainer.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
                    <div>
                        <p style="font-weight: 600;">${product.name}</p>
                        <p>₹${product.price}</p>
                    </div>
                </div>
            `;
        }
    }
    cartSubtotalEl.innerText = `₹${subtotal.toFixed(2)}`;
    cartItemCountEl.innerText = cart.length;
}

// --- TOAST NOTIFICATION ---
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.backgroundColor = '#2ecc71';
    toast.style.color = 'white';
    toast.style.padding = '15px';
    toast.style.borderRadius = '8px';
    toast.style.marginBottom = '10px';
    
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}


// Export all the functions we want to use in main.js
export { displayProducts, showProductDetails, updateCartUI, showToast };

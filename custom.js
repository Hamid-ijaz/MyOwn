function getOrCreateCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}

function addToCart(name, price, description, image) {  
    const cart = getOrCreateCart();
    const product = {
        name: name,
        price: price,
        quantity: 1,
        description: description,
        image: image,
        total: price
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCart() {
    const cart = getOrCreateCart();
    let html = '';
    let index = 0;

    cart.forEach(product => {
        html += `
        <tr>
        <td class="product-thumbnail">
            <img src="${product.image}" style="height: auto; width: 300px;" alt="${product.name}"
                class="img-fluid">
        </td>
        <td class="product-name">
            <h2 class="h5 text-black " style="">${product.name}</h2>
        </td>
        <td>${product.price}</td>
        <td>
            <div class="input-group mb-3 d-flex align-items-center quantity-container"
                style="max-width: 120px;">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-black decrease"
                        type="button" onclick="decreaseQuantity(${index}), calculateTotal()">&minus;</button>
                </div>
                <input type="text" class="form-control text-center quantity-amount"
                    value="${product.quantity}" placeholder="" aria-label="Example text with button addon"
                    aria-describedby="button-addon1">
                <div class="input-group-append">
                    <button class="btn btn-outline-black increase"
                        type="button" onclick="increaseQuantity(${index}), calculateTotal()">&plus;</button>
                </div>
            </div>

        </td>
        <td>${product.total}</td>
        <td><button onclick="removeSpecificProduct(${index++}), calculateTotal()" class="btn btn-black btn-sm">X</button></td>
    </tr>
        `;
    });
    document.querySelector('.cart-products').innerHTML = html;
}

function removeProduct() {
    const cart = getOrCreateCart();
    cart.pop();
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

function removeSpecificProduct(index) {
    const cart = getOrCreateCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

function increaseQuantity(index) {
    const cart = getOrCreateCart();
    cart[index].quantity++;
    cart[index].total = cart[index].quantity * cart[index].price;
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

function decreaseQuantity(index) {
    const cart = getOrCreateCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        cart[index].total = cart[index].quantity * cart[index].price;
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
    }
}

function calculateTotal() {
    const cart = getOrCreateCart();
    let total = 0;
    cart.forEach(product => {
        total += product.total;
    });
    document.querySelector('.total-price').innerHTML = total;
}

function clearCart() {
    localStorage.removeItem('cart');
    showCart();
}







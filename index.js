let cart = JSON.parse(localStorage.getItem("cart")) || [];

let price_1 = document.getElementById("pricing_1");
let price_2 = document.getElementById("pricing_2");

function openDrawer() {
  document.getElementById("cartDrawer").classList.add("open");
}

function closeDrawer() {
  document.getElementById("cartDrawer").classList.remove("open");
}

function addToCart() {
  const cartItem = {
    id: 1,
    product_title: "Helio Pet Device",
    price: 249,
    compare_price: 369,
    quantity: 1,
  };

  const isItemExitsInCart = cart.find((i) => i.id === 1);

  if (isItemExitsInCart) {
    if (isItemExitsInCart.quantity < 10) isItemExitsInCart.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  openDrawer();
  renderCart();
}

function updateQuantity(method) {
  if (method === "increase") {
    if (cart[0].quantity < 10) cart[0].quantity += 1;
    else {
      return alert("Maximum 10");
    }
  } else {
    if (cart[0].quantity > 1) {
      cart[0].quantity -= 1;
    } else {
      return alert("Minimum 1");
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function deleteItem() {
  localStorage.removeItem("cart");
  cart = [];

  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  let totalPrice = 249.0;
  let totalComparePrice = 369.0;

  cart.forEach((item) => {
    totalComparePrice += item.compare_price * item.quantity;
    totalPrice += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `   
      <!-- header -->
      <div class="cart_header">
        <h4>Product</h4>
        <h4>Total</h4>
      </div>
      <!-- products -->
      <div class="product_container">
        <!-- image -->
        <div class="product_img">
          <img src="./images/product pic variations.png" alt="product image" />
        </div>
        <!-- content -->
        <div class="product_details">
          <h6>${item.product_title}</h6>
          <h6>
            <del style="color:gray;">$${
              item.compare_price * item.quantity
            }</del> 
            <span style="color:green;">$${item.price * item.quantity}</span>
          </h6>

          <!-- quantity selector -->
          <div class="main_quantity_selector">
            <div class="quantity_selector">
              <div class="quantity-container">
                <button 
                  class="quantity-btn" 
                  onclick="updateQuantity('decrease', ${item.id})"
                >-</button>
                <div class="quantity-display">${item.quantity}</div>
                <button 
                  class="quantity-btn" 
                  onclick="updateQuantity('increase', ${item.id})"
                >+</button>
              </div>
            </div>
            <button 
              class="trash-btn" 
              onclick="deleteItem(${item.id})"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  price_1.innerText = `$${totalComparePrice.toFixed(2)}`;
  price_2.innerText = `$${totalPrice.toFixed(2)}`;
}

renderCart();

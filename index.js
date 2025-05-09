let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

function updateQuantity(mehtod) {
  if (mehtod === "increase") cart[0].quantity += 1;
  else cart[0].quantity -= 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  cart.forEach((item) => {
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
            <img
              src="./images/product pic variations.png"
              alt="product image"
            />
          </div>
          <!-- content -->
          <div class="product_details">
            <h6>${item.product_title}</h6>
            <h6>$${item.price}</h6>
            <!-- quantity selector -->
            <div class="quantity_selector">
              <div style="font-weight: bold; cursor: pointer" onclick={updateQuantity('decrease')}>-</div>
              <div>${item.quantity}</div>
              <div style="font-weight: bold; cursor: pointer" onclick={updateQuantity('increase')}>+</div>
            </div>
          </div>
        </div>`;
    container.appendChild(div);
  });
}

renderCart();

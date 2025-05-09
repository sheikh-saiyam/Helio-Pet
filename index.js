let cart = JSON.parse(localStorage.getItem("cart")) || [];

let price_1 = document.getElementById("pricing_1");
let price_2 = document.getElementById("pricing_2");
let quantity_display = document.getElementById("quantity-display");
let error_container = document.getElementById("error_container");

function openDrawer() {
  document.getElementById("cartDrawer").classList.add("open");
}

function closeDrawer() {
  document.getElementById("cartDrawer").classList.remove("open");
}

function updateHomeQuantity(method) {
  const quantityElement = document.getElementById("quantity-display");
  let quantity = parseInt(quantityElement.innerText);

  if (method === "increase") {
    if (quantity < 10) {
      quantity += 1;
      error_container.innerText = "";
    } else {
      return (error_container.innerText = "You can’t add more than 10 items!");
    }
  } else {
    if (quantity > 1) {
      quantity -= 1;
      error_container.innerText = "";
    } else {
      return (error_container.innerText = "You must add at least 1 item!");
    }
  }

  price_1.innerText = `$ ${369.0 * quantity}`;
  price_2.innerText = `$ ${249.0 * quantity}`;
  quantityElement.innerText = quantity;
}

function addToCart() {
  const quantityElement = document.getElementById("quantity-display");
  let quantity = parseInt(quantityElement.innerText);

  const cartItem = {
    id: 1,
    product_title: "Helio Pet Device",
    price: 249,
    compare_price: 369,
    quantity: quantity ? quantity : 1,
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
    if (cart[0].quantity < 10) {
      cart[0].quantity += 1;
      error_container.innerText = "";
    } else {
      return (error_container.innerText = "You can’t add more than 10 items!");
    }
  } else {
    if (cart[0].quantity > 1) {
      cart[0].quantity -= 1;
      error_container.innerText = "";
    } else {
      return (error_container.innerText = "You must add at least 1 item!");
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

  let totalPrice = 0;
  let totalComparePrice = 0;

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
                  onclick="updateQuantity('decrease')"
                >-</button>
                <div class="quantity-display">${item.quantity}</div>
                <button 
                  class="quantity-btn" 
                  onclick="updateQuantity('increase')"
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
      <!-- Checkout -->
      <div class="parent_checkout_container">
        <div class="checkout_container">
          <div class="total_container">
            <div class="total total-head">Estimated Total:</div>
            <div class="total">$249.00 <sup>USD</sup></div>
          </div>
          <div class="checkout_button">
            <button>Checkout</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  if (cart.length === 0) {
    price_1.innerText = `$ 369.00`;
    price_2.innerText = `$ 249.00`;
  } else {
    price_1.innerText = `$ ${totalComparePrice.toFixed(2)}`;
    price_2.innerText = `$ ${totalPrice.toFixed(2)}`;
  }
}

renderCart();

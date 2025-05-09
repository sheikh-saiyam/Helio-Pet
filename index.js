let cart = JSON.parse(localStorage.getItem("cart")) || [];

let price_1 = document.getElementById("pricing_1");
let price_2 = document.getElementById("pricing_2");
let quantity_display = document.getElementById("quantity-display");
let error_container = document.getElementById("error_container");
const badge = document.getElementById("cartBadge");

function openDrawer() {
  document.getElementById("cartDrawer").classList.add("open");
}

function closeDrawer() {
  document.getElementById("cartDrawer").classList.remove("open");
}

function updateHomeQuantity(method) {
  let quantity = parseInt(quantity_display.innerText);

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

  quantity_display.innerText = quantity;
  price_1.innerText = `$ ${(369.0 * quantity).toFixed(2)}`;
  price_2.innerText = `$ ${(249.0 * quantity).toFixed(2)}`;
}

function addToCart() {
  let quantity = parseInt(quantity_display.innerText);

  const cartItem = {
    id: 1,
    product_title: "Helio Pet Device",
    price: 249,
    compare_price: 369,
    quantity: quantity,
  };

  const isItemExists = cart.find((i) => i.id === cartItem.id);

  if (isItemExists) {
    isItemExists.quantity += quantity;
    if (isItemExists.quantity > 10) isItemExists.quantity = 10;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  openDrawer();
  renderCart();
}

function updateQuantity(id, method) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  if (method === "increase") {
    if (item.quantity < 10) {
      item.quantity += 1;
      error_container.innerText = "";
    } else {
      return (error_container.innerText = "You can’t add more than 10 items!");
    }
  } else {
    if (item.quantity > 1) {
      item.quantity -= 1;
      error_container.innerText = "";
    } else {
      return (error_container.innerText = "You must add at least 1 item!");
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function deleteItem(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  let totalComparePrice = 0;
  let totalPrice = 0;
  let totalQuantity = 0;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty</h3>
        <div class="empty_cart_button">
          <button onclick="addToCart()">Add To Cart</button>
        </div>
      </div>
    `;
    badge.innerText = "0";
    price_1.innerText = `$369.00`;
    price_2.innerText = `$249.00`;
    return;
  }

  cart.forEach((item) => {
    totalComparePrice += item.compare_price * item.quantity;
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart_header">
        <h4>Product</h4>
        <h4>Total</h4>
      </div>

      <div class="product_container">
        <div class="product_img">
          <img src="./images/product pic variations.png" alt="product image" />
        </div>

        <div class="product_details">
          <h6>${item.product_title}</h6>
          <h6>
            <del style="color:gray;">$${(
              item.compare_price * item.quantity
            ).toFixed(2)}</del> 
            <span style="color:green;">$${(item.price * item.quantity).toFixed(
              2
            )}</span>
          </h6>

          <div class="main_quantity_selector">
            <div class="quantity_selector">
              <div class="quantity-container">
                <button class="quantity-btn" onclick="updateQuantity(${
                  item.id
                }, 'decrease')">-</button>
                <div class="quantity-display">${item.quantity}</div>
                <button class="quantity-btn" onclick="updateQuantity(${
                  item.id
                }, 'increase')">+</button>
              </div>
            </div>

            <button class="trash-btn" onclick="deleteItem(${item.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  price_1.innerText = `$ ${totalComparePrice.toFixed(2)}`;
  price_2.innerText = `$ ${totalPrice.toFixed(2)}`;
  badge.innerText = totalQuantity;

  const totalHTML = `
    <div class="parent_checkout_container">
      <div class="checkout_container">
        <div class="total_container">
          <div class="total total-head">Estimated Total:</div>
          <div class="total">$${totalPrice.toFixed(2)} <sup>USD</sup></div>
        </div>
        <div class="checkout_button">
          <button>Checkout</button>
        </div>
      </div>
    </div>
  `;
  container.innerHTML += totalHTML;
}

renderCart();

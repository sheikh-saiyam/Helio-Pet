function openDrawer() {
  document.getElementById("cartDrawer").classList.add("open");
}

function closeDrawer() {
//   document.getElementById("cartDrawer").classList.remove("open");
}

function addToCart() {
  openDrawer();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  //   cart.forEach((item) => {
  const div = document.createElement("div");
  div.className = "cart-item";
  div.innerHTML = `
          <strong>${"item.name"}</strong><br>
          <p>Price: $${"item.sellingPrice * item.quantity"} <span class="line-through">$${"   item.comparePrice * item.quantity"}</span></p>
          <button onclick="changeQty(${"item.id"}, -1)">-</button>
          ${"item.quantity"}
          <button onclick="changeQty(${"item.id"}, 1)">+</button>
          <button onclick="removeFromCart(${"         item.id"})" style="color:red;">🗑️</button>
        `;
  container.appendChild(div);
  //   });
}

renderCart();

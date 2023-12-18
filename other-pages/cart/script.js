document.addEventListener("DOMContentLoaded", function () {
  showCartItems();
  updateCartCount();
});

function showCartItems() {
  const cartContent = localStorage.getItem("shoppingCart");
  const cartItemsData = cartContent ? JSON.parse(cartContent) : {};
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceContainer = document.getElementById("total-price");

  if (cartItemsData.length) {
    cartItemsData.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      const imgSpan = document.createElement("span");
      const itemImg = document.createElement("img");
      itemImg.src = item.img;
      imgSpan.appendChild(itemImg)
      itemElement.appendChild(imgSpan);

      const itemName = document.createElement("span");
      itemName.textContent = item.name + " x" + item.quantity.toString();
      itemElement.appendChild(itemName);

      const itemPrice = document.createElement("span");
      itemPrice.textContent = item.price * item.quantity + " TRY";
      itemElement.appendChild(itemPrice);

      cartItemsContainer.appendChild(itemElement);
    });
  } else {
    const notification = document.createElement("h3");
    notification.innerHTML = "Görünen o ki sepetiniz boş!"
    cartItemsContainer.appendChild(notification);
  }

  const totalPrice = cartItemsData.reduce(
    (total, item) => (total + item.price) * item.quantity,
    0
  );
  totalPriceContainer.textContent = "Toplam Tutar: " + totalPrice + " TRY";
}

function updateCartCount() {
  const cartContent = localStorage.getItem("shoppingCart");
  const cartItems = cartContent ? JSON.parse(cartContent) : {};
  const cartCountElement = document.querySelector(".cart");
  let lengthOfItems = 0;
  for (var i = 0; i < cartItems.length; i++) {
    lengthOfItems += cartItems[i].quantity;
  }
  if (cartCountElement) {
    if (lengthOfItems) {
      cartCountElement.innerHTML = `<a href="#" target="_blank">Alışveriş Sepeti (${lengthOfItems})</a>`;
    } else {
      cartCountElement.innerHTML = `<a href="#" target="_blank">Alışveriş Sepeti</a>`;
    }
  }
}

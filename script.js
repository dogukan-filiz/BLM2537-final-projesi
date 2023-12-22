const products = {
  Bilgisayar: [{ name: "Laptop", price: 21000, image: "img/laptop.png" }],
  Sağlık: [{ name: "Vitaminler", price: 430, image: "img/vitaminler.png" }],
  "Kadın Giyim": [{ name: "Elbise", price: 900, image: "img/elbise.png" }],
  "Erkek Giyim": [{ name: "Gömlek", price: 700, image: "img/gomlek.png" }],
  Bebek: [{ name: "Bebek Bezi", price: 240, image: "img/bebek-bezi.png" }],
  Elektronik: [{ name: "Kamera", price: 16000, image: "img/kamera.png" }],
  Telefonlar: [
    { name: "Akıllı Telefon", price: 54000, image: "img/akilli-telefon.png" },
  ],
  Parfüm: [
    { name: "Erkek Parfümü", price: 4350, image: "img/erkek-parfum.png" },
  ],
  Makyaj: [{ name: "Ruj", price: 350, image: "img/ruj.png" }],
  Saat: [{ name: "Erkek Saati", price: 5600, image: "img/erkek-saat.png" }],
};

let shoppingCart = [];
const apiUrl = "https://api.exchangerate-api.com/v4/latest/TRY";

window.addEventListener("unload", function () {
  localStorage.removeItem("shoppingCart");
});

document.addEventListener("DOMContentLoaded", function () {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("exchangeRates", JSON.stringify(data.rates));
      localStorage.setItem("baseCurrency", JSON.stringify(data.base));
    })
    .catch((error) => {
      console.error("Döviz kuru alınırken bir hata oluştu:", error);
    });

  const productItems = document.querySelectorAll(".product-item");
  if (productItems) {
    productItems.forEach(function (productItem) {
      productItem.addEventListener("mouseenter", function () {
        document.body.style.cursor = "pointer";
      });

      productItem.addEventListener("mouseleave", function () {
        document.body.style.cursor = "default";
      });
    });
  }
  listAllProducts();
  updateCartCount();

  const productContainer = document.getElementById("product-list");

  productContainer.addEventListener("click", function (event) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains("route")) {
      const productName = clickedElement.dataset.product;
      const targetSiteURL =
        "product-sites/" + productName + "/" + productName + ".html";
      window.location.href = targetSiteURL;
    }
  });
});

function listProducts(category) {
  const productList = products[category];
  const productContainer = (document.getElementById("product-list").innerHTML =
    "");
  if (productList) {
    productList.forEach((product) => {
      appendProduct(category, product);
    });
  } else {
    console.log(
      `Ürünler (${category}): Bu kategoriye ait ürün bulunmamaktadır.`
    );
  }
  changeCurrency();
}

function listAllProducts() {
  const productContainer = document.getElementById("product-list");

  productContainer.innerHTML = "";

  for (const category in products) {
    const categoryProducts = products[category];
    if (categoryProducts.length > 0) {
      const firstProduct = categoryProducts[0];
      appendProduct(category, firstProduct);
    }
  }
}

function appendProduct(category, product) {
  const productContainer = document.getElementById("product-list");

  const productItem = document.createElement("div");
  productItem.classList.add("product-item");
  productItem.setAttribute("data-product", product.name);

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.setAttribute("data-product", product.name);
  productImage.classList.add("route");
  productItem.appendChild(productImage);

  const productName = document.createElement("h3");
  productName.textContent = product.name;
  productName.setAttribute("data-product", product.name);
  productName.classList.add("route");
  productItem.appendChild(productName);

  const productPrice = document.createElement("h4");
  productPrice.textContent =
    product.price.toFixed(2) +
    localStorage.getItem("baseCurrency").replace(/"/g, " ");
  productPrice.setAttribute("data-product", product.name);
  productPrice.classList.add("route");
  productItem.appendChild(productPrice);

  const addToCart = document.createElement("button");
  addToCart.textContent = "Sepete Ekle";
  addToCart.addEventListener("click", function () {
    const currencySelector = document.getElementById("currency");
    const selectedCurrency = currencySelector.value;
    cartToAdd({
      name: product.name,
      price: Number(convertCurrency(product.price, selectedCurrency)),
      img: "../../" + product.image,
      currency: selectedCurrency,
    });
    localStorage.setItem("cartUpdated", "true");
  });
  productItem.appendChild(addToCart);

  productContainer.appendChild(productItem);
}
function changeCurrency() {
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  const currencySelector = document.getElementById("currency");
  const selectedCurrency = currencySelector.value;
  if (shoppingCart.length > 0) {
    alert(
      `Sepetinizde ürün bulunmaktadır. Para biriminizi ${selectedCurrency}'ye dönüştüremezsiniz.`
    );
    currencySelector.value = shoppingCart[0].currency;
  } else {
    for (const category in products) {
      const categoryProducts = products[category];
      categoryProducts.forEach((product) => {
        const productPriceElement = document.querySelector(
          `.product-item[data-product="${product.name}"] h4`
        );
        if (productPriceElement) {
          productPriceElement.textContent =
            convertCurrency(product.price, selectedCurrency) +
            " " +
            selectedCurrency;
        }
      });
    }
  }
}

function convertCurrency(price, currency) {
  const exchangeRates = JSON.parse(localStorage.getItem("exchangeRates"));
  const convertedPrice = price * exchangeRates[currency];
  return convertedPrice.toFixed(2);
}

const searchInput = document.querySelector(".middle-section input");

searchInput.addEventListener("input", function () {
  const searchText = this.value.toLowerCase();

  for (const category in products) {
    const categoryProducts = products[category];

    categoryProducts.forEach((product) => {
      const productName = product.name.toLowerCase();
      const productItem = document.querySelector(
        `.product-item[data-product="${product.name}"]`
      );

      if (productName.includes(searchText)) {
        productItem.style.display = "block";
      } else {
        productItem.style.display = "none";
      }
    });
  }
});

function cartToAdd(product, event) {
  var notification = document.getElementById("modal");
  notification.style.display = "block";
  notification.addEventListener("animationend", function () {
    notification.style.display = "none";
  });

  const existingProduct = shoppingCart.find(
    (item) => item.name === product.name
  );
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    shoppingCart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  updateCartCount();
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
      cartCountElement.innerHTML = `<a href="other-pages/cart/cart.html" target="_blank">Alışveriş Sepeti (${lengthOfItems})</a>`;
    } else {
      cartCountElement.innerHTML = `<a href="other-pages/cart/cart.html" target="_blank">Alışveriş Sepeti</a>`;
    }
  }
}

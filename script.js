const products = {
    'Bilgisayar': [
        { name: 'Laptop', price: 21000, image: 'img/laptop.png' },
    ],
    'Sağlık': [
        { name: 'Vitaminler', price: 430, image: 'img/vitaminler.png' },
    ],
    'Kadın Giyim': [
        { name: 'Elbise', price: 900, image: 'img/elbise.png' },
    ],
    'Erkek Giyim': [
        { name: 'Gömlek', price: 700, image: 'img/gomlek.png' },
    ],
    'Bebek': [
        { name: 'Bebek Bezi', price: 240, image: 'img/bebek-bezi.png' },
    ],
    'Elektronik': [
        { name: 'Kamera', price: 160000, image: 'img/kamera.png' },
    ],
    'Telefonlar': [
        { name: 'Akıllı Telefon', price: 54000, image: 'img/akilli-telefon.png' },
    ],
    'Parfüm': [
        { name: 'Erkek Parfümü', price: 4350, image: 'img/erkek-parfum.png' },
    ],
    'Makyaj': [
        { name: 'Ruj', price: 350, image: 'img/ruj.jpeg' },
    ],
    'Saat': [
        { name: 'Erkek Saati', price: 5600, image: 'img/erkek-saat.png' },
    ],
};

document.addEventListener('DOMContentLoaded', function() {
    for (const category in products) {
        const categoryProducts = products[category];
        if (categoryProducts.length > 0) {
            const firstProduct = categoryProducts[0];
            appendProduct(category, firstProduct);
        }
    }
});

function listProducts(category) {
    const productList = products[category];
    const productContainer = document.getElementById("product-list");

    productContainer.innerHTML = '';

    if (productList) {
        productList.forEach(product => {
            appendProduct(category, product);
        });
    } else {
        console.log(`Ürünler (${category}): Bu kategoriye ait ürün bulunmamaktadır.`);
    }
}
function listAllProducts() {
    const productContainer = document.getElementById("product-list");

    productContainer.innerHTML = '';

    for (const category in products) {
        const categoryProducts = products[category];
        if (categoryProducts.length > 0) {
            const firstProduct = categoryProducts[0];
            appendProduct(category, firstProduct);
        }
    }
    changeCurrency()
}
function appendProduct(category, product) {
    const productContainer = document.getElementById("product-list");

    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.setAttribute("data-product", product.name);

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productItem.appendChild(productImage);

    const productName = document.createElement("h3");
    productName.textContent = product.name;
    productItem.appendChild(productName);

    const productPrice = document.createElement("h4");
    productPrice.textContent = product.price.toFixed(2) + " TRY";
    productItem.appendChild(productPrice);

    const addToCart = document.createElement("button");
    addToCart.textContent = "Sepete Ekle";
    addToCart.addEventListener("click", function() {
        // Sepete ekleme işlemleri burada yapılacak. addToCart() fonksiyonu.
        console.log("Sepete Eklendi: " + product.name);
    });
    productItem.appendChild(addToCart);

    productContainer.appendChild(productItem);
}
function changeCurrency() {
    const currencySelector = document.getElementById("currency");
    const selectedCurrency = currencySelector.value;

    for (const category in products) {
        const categoryProducts = products[category];
        categoryProducts.forEach(product => {
            const productPriceElement = document.querySelector(`.product-item[data-product="${product.name}"] h4`);
            if (productPriceElement) {
                productPriceElement.textContent = convertCurrency(product.price, selectedCurrency) + " " + selectedCurrency;
            }
        });
    }
}

function convertCurrency(price, currency) {
    const exchangeRates = {
        'TRY': 1,
        'USD': 0.0345, // 1 USD = 28.98 TRY
    };

    const convertedPrice = price * exchangeRates[currency];
    return convertedPrice.toFixed(2);
}

const searchInput = document.querySelector('.middle-section input');

searchInput.addEventListener('input', function() {
    const searchText = this.value.toLowerCase();

    for (const category in products) {
        const categoryProducts = products[category];

        categoryProducts.forEach(product => {
            const productName = product.name.toLowerCase();
            const productItem = document.querySelector(`.product-item[data-product="${product.name}"]`);

            if (productName.includes(searchText)) {
                productItem.style.display = 'block';
            } else {
                productItem.style.display = 'none';
            }
        });
    }
});

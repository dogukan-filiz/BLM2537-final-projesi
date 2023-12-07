// Basit bir ürün veri yapısı
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

// Sayfa yüklenirken her kategoriden birer ürün listele
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

    // Ürün listesini temizle
    productContainer.innerHTML = '';

    if (productList) {
        // Her ürünü listeye ekle
        productList.forEach(product => {
            appendProduct(category, product);
        });
    } else {
        console.log(`Ürünler (${category}): Bu kategoriye ait ürün bulunmamaktadır.`);
    }
}
function listAllProducts() {
    const productContainer = document.getElementById("product-list");

    // Ürün listesini temizle
    productContainer.innerHTML = '';

    // Tüm kategorilerden birer ürün listele
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

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productItem.appendChild(productImage);

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productName = document.createElement("h3");
    productName.textContent = product.name;
    productInfo.appendChild(productName);

    const productPrice = document.createElement("h4");
    productPrice.textContent = product.price + " ₺";
    productInfo.appendChild(productPrice);

    const addToCart = document.createElement("button");
    addToCart.textContent = "Sepete Ekle";
    addToCart.addEventListener("click", function() {
        // Sepete ekleme işlemleri burada yapılabilir.
        // Örneğin: addToCartFunction(product);
        console.log("Sepete Eklendi: " + product.name);
    });
    productPrice.appendChild(addToCart);

    productItem.appendChild(productInfo);

    productContainer.appendChild(productItem);
}
function changeCurrency() {
    const currencySelector = document.getElementById("currency");
    const selectedCurrency = currencySelector.value;

    console.log("Seçilen Para Birimi: " + selectedCurrency);
}
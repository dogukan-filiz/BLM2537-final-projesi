// Basit bir ürün veri yapısı
const products = {
    'Bilgisayar': [
        { name: 'Laptop', price: 0, image: 'img/laptop.png' },
    ],
    'Sağlık': [
        { name: 'Vitaminler', price: 0, image: 'img/vitaminler.png' },
    ],
    'Kadın Giyim': [
        { name: 'Elbise', price: 0, image: 'img/elbise.png' },
    ],
    'Erkek Giyim': [
        { name: 'Gömlek', price: 0, image: 'img/gomlek.png' },
    ],
    'Bebek': [
        { name: 'Bebek Bezi', price: 0, image: 'img/bebek-bezi.png' },
    ],
    'Elektronik': [
        { name: 'Kamera', price: 0, image: 'img/kamera.png' },
    ],
    'Telefonlar': [
        { name: 'Akıllı Telefon', price: 0, image: 'img/akilli-telefon.png' },
    ],
    'Parfüm': [
        { name: 'Erkek Parfümü', price: 0, image: 'img/erkek-parfum.png' },
    ],
    'Makyaj': [
        { name: 'Ruj', price: 0, image: 'img/ruj.png' },
    ],
    'Saat': [
        { name: 'Erkek Saati', price: 0, image: 'img/erkek-saat.png' },
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

function appendProduct(category, product) {
    const productContainer = document.getElementById("product-list");

    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productItem.appendChild(productImage);

    const productName = document.createElement("div");
    productName.textContent = product.name;
    productItem.appendChild(productName);

    const productPrice = document.createElement("div");
    productPrice.textContent = product.price + " ₺";
    productItem.appendChild(productPrice);

    productContainer.appendChild(productItem);
}

function changeCurrency() {
    const currencySelector = document.getElementById("currency");
    const selectedCurrency = currencySelector.value;

    console.log("Seçilen Para Birimi: " + selectedCurrency);
}
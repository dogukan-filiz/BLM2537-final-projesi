
const productPrice = products["Bilgisayar"][0].price;
var currentPrice = productPrice;

function changeCurrency() {
  const currencySelector = document.getElementById("currency");
  const selectedCurrency = currencySelector.value;

  const productPriceElement = document.getElementById("price");
  const convertedPrice = convertCurrency(currentPrice, selectedCurrency);
  productPriceElement.textContent = convertedPrice + " " + selectedCurrency;
}

function convertCurrency(price, targetCurrency) {
  const exchangeRates = {
    TRY: 1,
    USD: 0.0345, // 1 USD = 28.98 TRY
  };

  const convertedPrice = price * exchangeRates[targetCurrency];
  return convertedPrice.toFixed(2);
}

const orderId = getOrderId();
displayOrderId(orderId);
removeAllCache();

//recupere urlpparams
function getOrderId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}

// affiche le numéro de commande
function displayOrderId(orderId) {
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}

//vide le cach
function removeAllCache() {
  const cache = window.localStorage;
  cache.clear();
}

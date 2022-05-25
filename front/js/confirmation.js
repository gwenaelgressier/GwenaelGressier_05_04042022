//apelle de mes fonction
const orderId = getOrderId();
displayOrderId(orderId);
removeAllCache();

/**
 * recupere urlpparams
 * 
 * @returns string orderId
 */
function getOrderId() 
{
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    return urlParams.get("orderId");
}

/**
 * affiche le numéro de commande
 * 
 * @param string orderId
 * @returns void
 */
function displayOrderId(orderId) 
{
    const orderIdElement = document.getElementById("orderId");
    orderIdElement.textContent = orderId;
}

/**
 * vide le cache
 * 
 * @returns void
 */
function removeAllCache()
{
    const cache = window.localStorage;
    cache.clear();
}

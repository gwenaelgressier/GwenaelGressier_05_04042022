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
    const queryString = window.location.search;//Pour récupérais se qu’il y a âpres le ? dans l'url 
    const urlParams   = new URLSearchParams(queryString);//je récupère les params de l'url 
    return urlParams.get("orderId");//je recupere mon numero de commande
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

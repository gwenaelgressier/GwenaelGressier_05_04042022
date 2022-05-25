//recuperation de mon id
const queryString = window.location.search;
const urlParams   = new URLSearchParams(queryString);
const id          = urlParams.get("id");

//mon fetch avec l'id recuperais de l'url
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((item)     => displayProduct(item));

/**
 * affichage du produit
 *
 * @param object item
 * @returns void
 */
function displayProduct(item) 
{
    let titleTab         = document.getElementsByTagName("title")[0];
    titleTab.textContent = item.name;

    let image          = document.createElement("img");
    image.src          = item.imageUrl;
    image.alt          = item.altTxt;
    let targetForImage = document.querySelector(".item__img");
    targetForImage.appendChild(image);

    let title = document.getElementById("title");
    title.textContent = item.name;

    let price         = document.getElementById("price");
    price.textContent = item.price;

    let description         = document.getElementById("description");
    description.textContent = item.description;

    let selectColors = document.getElementById("colors");
    item.colors.forEach((color) => {
        let option         = document.createElement("option");
        option.value       = color;
        option.textContent = color;
        selectColors.appendChild(option);

        imgUrl      = item.imageUrl;
        altText     = item.altTxt;
        articleName = item.name;
    });
}

//sert a selectioner mon bouton et a lui appliquer un event listener
const buttonAddToCart = document.querySelector("#addToCart");
buttonAddToCart.addEventListener("click", addToCartClick);

/**
 *ajout de mon produit dans le panier
 * 
 * @returns Array cart
 */
function addToCartClick() 
{
    const color    = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if (isOrderValid(color, quantity)) return;

    let cart = [];

    const product = {
        id      : id,
        color   : color,
        quantity: Number(quantity),
        imageUrl: imgUrl,
        altTxt  : altText,
        name    : articleName,
    };

    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id && cart[i].color === product.color) {
                cart[i].quantity += product.quantity;
                return savecart(cart);
            }
        }
    }
    cart.push(product);
    savecart(cart);
}

/**
 * fontion qui sert a verifier le remplissage des champ couleur et quantiter
 *
 * @param string color
 * @param string quantity
 * @returns boolean
 */
function isOrderValid(color, quantity) 
{
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("veuillez sélectionner une couleur et une quantitée");
        return true;
    }
}

/**
 * save mon produit dans le cache
 *
 * @param array cart
 * @returns void
 */
function savecart(cart) 
{
    localStorage.setItem("cart", JSON.stringify(cart));

    let result = confirm("vous allez etre rediriger vers le panier?");

    if (result) {
        redirectToCart();
    }
}

/**
 * redirection vers la page cart
 * 
 * @returns void
 */
function redirectToCart() 
{
    window.location.href = "cart.html";
}

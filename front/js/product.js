//
const queryString = window.location.search; //sert a recup se qui a apres le ? dans l'url
const urlParams = new URLSearchParams(queryString); //recup les param de l'url
const id = urlParams.get("id"); //recupere l'id

//mon fetch avec l'id recuperais de l'url
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => handleData(res));

//gestion des donnee
function handleData(res) {
  const { altTxt, colors, description, imageUrl, name, price } =
    res; /*es6 destructuring sert a eviter de refaire la meme ligne pour chaque objets*/
  itemPrice = price;
  imgUrl = imageUrl;
  altText = altTxt;
  articleName = name;
  makeImage(imageUrl, altTxt); //appelle la fonction makeImage qui a en param imageUrl, altTxt
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

//creation de mon img
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  parent.appendChild(image);
}
//creation de mon h1
function makeTitle(name) {
  const h1 = document.getElementById("title");
  h1.textContent = name;
}
//remplissage de la span avec l'id price
function makePrice(price) {
  const span = document.getElementById("price");
  span.textContent = price;
}
//remplissage de p avec l'id description
function makeDescription(description) {
  const p = document.getElementById("description");
  p.textContent = description;
}

//remplissage du select avec l'id colors
function makeColors(colors) {
  const select = document.getElementById("colors");
  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  });
}

//sert a selectioner mon bouton et  a lui appliquer un event listener
const button = document.querySelector("#addToCart");

button.addEventListener("click", addToCartClick);

//fonction qui selectionne mon champ couleur et quantiter si il est rempli ou vide
function addToCartClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (isOrderInvalid(color, quantity)) return; //stop la fonction si isOrderInvalid est false

  //const itemQuantity = Number(item.quantity);

  let cart = [];
  //cree une constante avec toute les informations importante du produit
  const product = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: itemPrice,
    imageUrl: imgUrl,
    altTxt: altText,
    name: articleName,
  };
  //si j'ai "cart" dans mon cache
  if (localStorage.getItem("cart")) {
    //je lis mon cache
    cart = JSON.parse(localStorage.getItem("cart"));
    //cree une boucle pour verifier si mon produit est deja dans mon cart
    for (let i = 0; i < cart.length; i++) {
      //si mon produit a le meme id et la meme couleur
      if (cart[i].id === product.id && cart[i].color === product.color) {
        cart[i].quantity += product.quantity; //je rajoute la quantité
        return savecart(cart);
      }
    }
  }
  cart.push(product);
  savecart(cart);
}
// ser a save mon produit dans le cash sous le nom de cart
function savecart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  redirectToCart();
}

//fontion qui sert a verifier le remplissage des champ couleur et quantiter
function isOrderInvalid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) {
    //si mais champ ne son pas vide ou null
    alert("veuillez sélectionner une couleur et une quantitée");
    return true;
  }
}
//fonction qui envoi a la page cart
function redirectToCart() {
  window.location.href = "cart.html";
}

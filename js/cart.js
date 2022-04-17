const cart = []; //declare ma const cart vide pour cree une liste total du cart
retrieveItemsFromCache(); //appelle e la fonction de recuperation des donnee
cart.forEach((item) => displayItem(item));

//fonction de recuperation des donne du cache
function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length; //sert a voir le nombre d'objet dans mon storage
  console.log("le nombre d'item ajoutée est", numberOfItems);
  for (let i = 0; i < numberOfItems; i++) {
    //pour chaque items recuparere les information
    const item = localStorage.getItem(localStorage.key(i)); //recupere les ifo du cache
    const itemObject = JSON.parse(item); //remet en objet les info de mon .json
    cart.push(itemObject);
  }
}
console.log(cart);

function displayItem(item) {
  const article = makearticle(item);
  const div = makeImageDiv(item);
  article.appendChild(div);
  displayArticle(article);
  const carditemContent = makeCardItemContent(item);
  article.appendChild(carditemContent);
}

function makeCardItemContent(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content");
  makeDescription(div, item);
  makeSettings(div, item);
  return div;
}

function makeDescription(div, item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  p.textContent = item.color;
  const p2 = document.createElement("p");
  p2.textContent = item.price + " €";
  description.appendChild(h2, p, p2);
  description.appendChild(p);
  description.appendChild(p2);
  div.appendChild(description);
  return div;
}

//cree mon article
function makearticle(item) {
  const article = document.createElement("article");
  displayArticle(article);
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  console.log(article);
  return article;
}

//cree mon image
function makeImageDiv(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altTxt;
  div.appendChild(image);
  return image, div;
}

function displayArticle(article) {
  const focusIdSection = document
    .getElementById("cart__items")
    .appendChild(article);
}

function makeSettings(div, item) {
  const div2 = document.createElement("div");
  div2.classList.add("cart__item__content__settings");
  div.appendChild(div2);

  const div3 = document.createElement("div");
  div3.classList.add("cart__item__content__settings__quantity");
  div2.appendChild(div3);

  const p3 = document.createElement("p");
  p3.textContent = "Qté : ";
  div3.appendChild(p3);

  const inputNumber = document.createElement("input");
  inputNumber.type = "number";
  inputNumber.classList.add("itemQuantity");
  inputNumber.name = "itemQuantity";
  inputNumber.min = 1;
  inputNumber.max = 100;
  inputNumber.value = item.quantity;
  div3.appendChild(inputNumber);

  const div4 = document.createElement("div");
  div4.classList.add("cart__item__content__settings__delete");
  div2.appendChild(div4);

  const p4 = document.createElement("p");
  p4.classList.add("deleteItem");
  p4.textContent = "Supprimer";
  div4.appendChild(p4);

  const Quantity = document.getElementById("totalQuantity");
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  Quantity.textContent = totalQuantity;

  const price = document.getElementById("totalPrice");
  const totalprice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  price.textContent = totalprice;
}

//fonction de suppression
/*
altTxt: "Photo d'un canapé d'angle, vert, trois places"
color: "Green"
id: "055743915a544fde83cfdfc904935ee7"
imageUrl: "http://localhost:3000/images/kanap03.jpeg"
name: "Kanap Calycé"
price: 3199
quantity: 4*/

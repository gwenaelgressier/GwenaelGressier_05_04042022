const cart = []; //declare ma const cart vide pour cree une liste total du cart
retrieveItemsFromCache(); //appelle e la fonction de recuperation des donnee
cart.forEach((item) => displayItem(item));

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e)); // fait passer e pour empecher de rafraichire la page

//fonction de recuperation des donne du cache
function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length; //sert a voir le nombre d'objet dans mon storage
  for (let i = 0; i < numberOfItems; i++) {
    //pour chaque items recuparere les information
    const item = localStorage.getItem(localStorage.key(i)); //recupere les info du cache
    const itemObject = JSON.parse(item); //remet en objet les info de mon .json
    cart.push(...itemObject);
  }
}
//creation de mon article
function displayItem(item) {
  const article = makearticle(item);
  const div = makeImageDiv(item);
  article.appendChild(div);
  displayArticle(article);
  const carditemContent = makeCardItemContent(item);
  article.appendChild(carditemContent);
}

//creation de ma div principal
function makeCardItemContent(item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content");
  makeDescription(div, item);
  makeSettings(div, item);
  return div;
}
//creation de ma balise div avec h2 et p et p
function makeDescription(div, item) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  const h2 = document.createElement("h2");
  h2.textContent = item.name;
  const p = document.createElement("p");
  p.textContent = item.color;
  const p2 = document.createElement("p");
  p2.textContent = item.price + " €";
  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  div.appendChild(description);
  return div;
}

//cree mon article
function makearticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
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
//affiche l'article de tous mes canapés
function displayArticle(article) {
  document.getElementById("cart__items").appendChild(article);
}
//creation de la partie settings
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
  inputNumber.addEventListener("input", () =>
    updatePriceAndQuantity(item.id, inputNumber.value, item)
  );

  div3.appendChild(inputNumber);

  const div4 = document.createElement("div");
  div4.classList.add("cart__item__content__settings__delete");
  div2.appendChild(div4);

  makedeletetosettings(div4, item);
  displayTotalPrice();
  displayTotalQuantity();
}
//ajoute le bouton supprimer a ma div
function makedeletetosettings(div4, item) {
  const p4 = document.createElement("p");
  p4.classList.add("deleteItem");
  p4.textContent = "Supprimer";
  div4.appendChild(p4);
  div4.addEventListener("click", () => deleteItem(item));
}

//sert a modifier la quantiter et le prix
function updatePriceAndQuantity(id, newValue, item) {
  //const itemToUpdate = cart.find((item) => item.id === id); //on va chercher l'item avec l'id
  const itemToUpdate = item;
  itemToUpdate.quantity = Number(newValue); // change la item.quantity par la nouvelle quantiter de l'input
  console.log("itemToUpdate :", itemToUpdate);
  item.quantity = itemToUpdate.quantity; // change la item.quantity par la nouvelle quantiter de l'input
  displayTotalQuantity();
  displayTotalPrice();
  saveNewDataToCache();
  console.log("item:", item);
}
//affiche la quantiter total de canap dans mon cart
function displayTotalQuantity() {
  const Quantity = document.getElementById("totalQuantity");
  const totalQuantity = cart.reduce(
    (total, item) => (total += item.quantity),
    0
  ); //prend toute mes quantite et les additionne a la valeur total qui etait a 0
  console.table(cart);

  Quantity.textContent = totalQuantity;
}
//affiche la somme de tout les prix de mes canaps
function displayTotalPrice() {
  const price = document.getElementById("totalPrice");
  const totalprice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ); //prend toute mes prix et les multiplie a quantite et les additionne a la valeur total qui etait a 0
  price.textContent = totalprice;
}
//sert a save dans le cache les nouvelle valeur quand elle sont modifier ou suprimer
function saveNewDataToCache() {
  localStorage.setItem("cart", JSON.stringify(cart)); //permet d'enregistrer avec l'id et la couleur
}

//fonction de suppression
function deleteItem(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  );

  cart.splice(itemToDelete, 1);
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
  saveNewDataToCache();
  displayTotalQuantity();
  displayTotalPrice();
}
//sert a POST les valeur de mon forme a mon api
function submitForm(e) {
  e.preventDefault(); //empeche de rafraichire la page a chaque fois que je clique sur le bouton
  if (cart.length === 0) {
    alert("Le panier est vide");
    return;
  }

  if (isFormInvalid()) return;

  const body = makeRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "confirmation.html" + "?orderId=" + orderId;
    })
    .catch((err) => console.error(err));
}
//verifie si mon forme et valide avant de l'envoyer a mon api
function isFormInvalid() {
  const firstName = document.querySelector("#firstName").value;
  const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  const lastName = document.querySelector("#lastName").value;
  const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
  const address = document.querySelector("#address").value;
  const addressErrorMsg = document.querySelector("#addressErrorMsg");
  const city = document.querySelector("#city").value;
  const cityErrorMsg = document.querySelector("#cityErrorMsg");
  const email = document.querySelector("#email").value;
  const emailErrorMsg = document.querySelector("#emailErrorMsg");

  const regexform = /^[a-zA-Z ,.'-]+$/;
  const regexAdress = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
  const regexMail = /^[A-Za-z0-9+_.-]+@(.+)$/;

  if (regexform.test(firstName) === false) {
    firstNameErrorMsg.innerHTML = "entrez un prenom valide";
  } else {
    firstNameErrorMsg.innerHTML = "";
  }

  if (regexform.test(lastName) === false) {
    lastNameErrorMsg.innerHTML = "entrez un nom valide";
  } else {
    lastNameErrorMsg.innerHTML = "";
  }

  if (regexAdress.test(address) === false) {
    addressErrorMsg.innerHTML = "entrez une address valide";
  } else {
    addressErrorMsg.innerHTML = "";
  }

  if (regexform.test(city) === false) {
    cityErrorMsg.innerHTML = "entrez une ville valide";
  } else {
    cityErrorMsg.innerHTML = "";
  }

  if (regexMail.test(email) === false) {
    emailErrorMsg.innerHTML = "entrez un mail valide";
  } else {
    emailErrorMsg.innerHTML = "";
  }

  if (
    regexform.test(firstName) === true &&
    regexform.test(lastName) === true &&
    regexAdress.test(address) === true &&
    regexform.test(city) === true &&
    regexMail.test(email) === true
  ) {
    return false;
  } else {
    return true;
  }
}
//recupere les donner de mon forme et les mes en forme pour les passer a l'api
/*return body */
function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromCache(),
  };
  return body;
}
//pour chaque canap dans mon cart recup les info et push l'id dans l'array ids
/*return ids*/
function getIdsFromCache() {
  const ids = [];
  cart.forEach((numberOfProducts) => {
    localStorage.getItem(localStorage.key(numberOfProducts)); //recupere les info du cache
    ids.push(numberOfProducts.id);
  });

  return ids;
}

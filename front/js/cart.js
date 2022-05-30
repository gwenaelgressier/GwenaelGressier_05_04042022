//declare ma const cart vide pour cree une liste total du cart
const cart = [];
//adresse de mon api
const endPoint = "http://localhost:3000/api/products/";
//appelle e la fonction de recuperation des donnee
retrieveItemsFromCache();

//afiche les items de mon cart
cart.forEach((item) => displayItem(item));

//instruction lors du click de mon bouton commander
const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

/**
 * fonction de recuperation des donne du cache
 *
 * @returns void
 */
function retrieveItemsFromCache()
{
    const numberOfItems = localStorage.length;
    for (let i = 0; i < numberOfItems; i++) {
        const item       = localStorage.getItem(localStorage.key(i));
        const itemObject = JSON.parse(item);
        cart.push(...itemObject);
    }
}

/**
 *affichage de mon article
 *
 * @param object item
 * @returns void
 */
function displayItem(item) 
{
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id    = item.id;
    article.dataset.color = item.color;
    document.getElementById("cart__items").appendChild(article);

    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    const image = document.createElement("img");
    image.src   = item.imageUrl;
    image.alt   = item.altTxt;
    article.appendChild(divImg).appendChild(image);

    const divCartItemcontent = document.createElement("div");
    divCartItemcontent.classList.add("cart__item__content");

    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");

    const titleName       = document.createElement("h2");
    titleName.textContent = item.name;

    const paragraphColor       = document.createElement("p");
    paragraphColor.textContent = item.color;

    const api       = `${endPoint}${item.id}`;
    const itemFetch = fetch(api).then((response) => response.json());
    console.log(itemFetch);
    itemFetch.then((i) => {
        const paragraphPrice       = document.createElement("p");
        paragraphPrice.textContent = i.price + " €";
        description.appendChild(paragraphPrice);
    });

    description.appendChild(titleName);
    description.appendChild(paragraphColor);
    divCartItemcontent.appendChild(description);

    const divCartItemcontentSettings = document.createElement("div");
    divCartItemcontentSettings.classList.add("cart__item__content__settings");
    divCartItemcontent.appendChild(divCartItemcontentSettings);
    article.appendChild(divCartItemcontent);

    const divItemContentSettingsQuantity = document.createElement("div");
    divItemContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
    );
    divCartItemcontentSettings.appendChild(divItemContentSettingsQuantity);

    const paragraphQuantity       = document.createElement("p");
    paragraphQuantity.textContent = "Qté : ";
    divItemContentSettingsQuantity.appendChild(paragraphQuantity);

    const inputNumber = document.createElement("input");
    inputNumber.type  = "number";
    inputNumber.classList.add("itemQuantity");
    inputNumber.name  = "itemQuantity";
    inputNumber.min   = 1;
    inputNumber.max   = 100;
    inputNumber.value = item.quantity;
    inputNumber.addEventListener("input", () =>
        updatePriceAndQuantity(inputNumber.value, item, itemFetch)
    );

    divItemContentSettingsQuantity.appendChild(inputNumber);

    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    divCartItemcontentSettings.appendChild(divDelete);

    const paragraphDelete = document.createElement("p");
    paragraphDelete.classList.add("deleteItem");
    paragraphDelete.textContent = "Supprimer";
    divDelete.appendChild(paragraphDelete);
    divDelete.addEventListener("click", () => deleteItem(item, itemFetch));

    displayTotalPrice(itemFetch);
    displayTotalQuantity();
}

/**
 * sert a modifier la quantiter et le prix
 *
 * @param string newValue
 * @param object item
 * @param promise itemFetch
 * @return void
 */
function updatePriceAndQuantity(newValue, item, itemFetch) 
{
    const itemToUpdate    = item;
    itemToUpdate.quantity = Number(newValue);
    item.quantity         = itemToUpdate.quantity;
    displayTotalQuantity();
    displayTotalPrice(itemFetch);
    saveNewDataToCache();
}

/**
 * affiche la quantiter total de canap dans mon cart
 *
 * @return void
 */
function displayTotalQuantity() 
{
    const Quantity      = document.getElementById("totalQuantity");
    const totalQuantity = cart.reduce(
        (total, item) => (total += item.quantity),
        0
    );
    Quantity.textContent = totalQuantity;
}

/**
 * affiche la somme de tout les prix de mes canaps
 *
 * @param promise itemFetch
 * @returns void
 */
function displayTotalPrice(itemFetch) 
{
    itemFetch.then((i) => {
        const price      = document.getElementById("totalPrice");
        const totalprice = cart.reduce(
            (total, item) => total + i.price * item.quantity,
            0
        );
        price.textContent = totalprice;
    });
}

/**
 * save dans le cache les nouvelle valeur quand elle sont modifier ou suprimer
 *
 * @returns void
 */
function saveNewDataToCache() 
{
    localStorage.setItem("cart", JSON.stringify(cart)); //permet d'enregistrer avec l'id et la couleur
}

/**
 * fonction de suppression
 *
 * @param object item
 * @param promise itemFetch
 * @returns void
 */
function deleteItem(item, itemFetch) 
{
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
    displayTotalPrice(itemFetch);
}

/**
 * sert a POST les valeur de mon forme a mon api
 *
 * @param object e
 * @returns void
 */
function submitForm(e) 
{
    e.preventDefault();
    if (cart.length === 0) {
        alert("Le panier est vide");
        return;
    }

    if (!formIsValide()) return;

    const body = makeRequestBody();
    fetch(`${endPoint}order`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId        = data.orderId;
            window.location.href = "confirmation.html" + "?orderId=" + orderId;
        })
        .catch((err) => console.error(err));
}

//declaration de mes regex
const regexform   = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;//accepte tout sauf ce qu'il y a ans ma 2em expression
const regexAdress = /^[#.0-9a-zA-Zëêéèàçïîôö'\s,-]+$/;
const regexMail   = /^[a-zA-Z.0-9]+@+[a-zA-Z]+\.[a-zA-Z]+$/;

//parametres de mes form
const fields = [
    {
        name    : "firstName",
        regex   : regexform,
        errorMsg: "entrez un prenom valide",
    },
    {
        name    : "lastName",
        regex   : regexform,
        errorMsg: "entrez un nom valide",
    },
    {
        name    : "address",
        regex   : regexAdress,
        errorMsg: "entrez une adresse valide",
    },
    {
        name    : "city",
        regex   : regexform,
        errorMsg: "entrez une ville valide",
    },
    {
        name    : "email",
        regex   : regexMail,
        errorMsg: "entrez une email valide",
    },
];

/**
 * verifie si les champs du form sont valide
 *
 * @returns boolean
 */
function formIsValide() 
{
    let error = false;
    fields.forEach((field) => {
        let value = document.querySelector(`#${field.name}`).value;

        document.querySelector(`#${field.name}ErrorMsg`).innerHTML = "";

        if (!field.regex.test(value)) {
            document.querySelector(`#${field.name}ErrorMsg`).innerHTML =
                field.errorMsg;
            error = true;
        }
    });
    return !error;
}

/**
 * recupere les donner de mon forme et les mes en forme pour les passer a l'api
 *
 * @returns object body
 */
function makeRequestBody() 
{
    const form      = document.querySelector(".cart__order__form");
    const firstName = form.elements.firstName.value;
    const lastName  = form.elements.lastName.value;
    const address   = form.elements.address.value;
    const city      = form.elements.city.value;
    const email     = form.elements.email.value;
    const body      = {
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

/**
 * pour chaque canap dans mon cart recup les info et push l'id dans l'array ids
 *
 * @returns array ids
 */
function getIdsFromCache() 
{
    const ids = [];
    cart.forEach((numberOfProducts) => {
        localStorage.getItem(localStorage.key(numberOfProducts));
        ids.push(numberOfProducts.id);
    });

    return ids;
}

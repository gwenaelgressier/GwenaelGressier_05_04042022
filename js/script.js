//accede a l'api
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => addProducts(data));

function addProducts(data) {
  //joue la boucle pour chaque array dans l'api
  data.forEach((kanap) => {
    const { _id, imageUrl, altTxt, name, description } = kanap;
    /*es6 destructuring sert a eviter de refaire la meme ligne pour chaque objets
  const imageUrl = data.imageUrl;
  const altTxt = data.altTxt;
  const _id = data._id;
  const name = data.name;
  const description = data.description;*/

    const anchor = makeanchor(_id); //cree l'element a
    const makearticle = document.createElement("article"); //cree l'element article
    const img = makeimg(imageUrl, altTxt); //cree l'element img
    const h3 = makeh3(name); //cree l'element img
    const p = makep(description); //cree l'element img

    appendChildanchor(anchor, makearticle); //appelle la fonction qui acroche anchor a l'id items
    appendChildtoarticle(makearticle, img, h3, p); //appelle la fonctin qui acroche img, h3, p a l'article
  });
}
//creation de l'element a
function makeanchor(_id) {
  const anchor = document.createElement("a"); //cree l'element a
  anchor.href = "./product.html?id=" + _id; //met le href sur le a
  return anchor;
}

//creation de l'element img
function makeimg(imageUrl, altTxt) {
  const img = document.createElement("img"); //cree l'element img
  img.src = imageUrl; //importe le src du back
  img.alt = altTxt; //importe  le alt du back
  return img;
}

//creation de l'element h3
function makeh3(name) {
  const h3 = document.createElement("h3"); //cree l'element h3
  h3.classList.add("productName"); //ajoute comme nom de class productName
  h3.textContent = name; //importe le textContent de h3
  return h3;
}

//creation de l'element p
function makep(description) {
  const p = document.createElement("p"); //cree l'element p
  p.classList.add("productDescription"); //ajoute comme nom de class productDescription
  p.textContent = description; //importe le textContent de p
  return p;
}

//mise en place de mon anchor et de mon article
function appendChildanchor(anchor, makearticle) {
  const items = document.getElementById("items"); //vise l'id items
  items.appendChild(anchor); //lui donner l'enfant anchor
  anchor.appendChild(makearticle); //acroche l'arcticle au anchor
}

//accroche les img,h3 et p à mon article
function appendChildtoarticle(makearticle, img, h3, p) {
  makearticle.appendChild(img); //acroche l'img au arcticle
  makearticle.appendChild(h3); //acroche l'h3 au arcticle
  makearticle.appendChild(p); //acroche le p au arcticle
}

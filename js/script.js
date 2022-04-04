//accede a l'api
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => addProducts(data[0]));

function addProducts(data) {
  console.log(data._id);
  const anchor = makeanchor(); //cree l'element a
  const makearticle = document.createElement("article"); //cree l'element article
  const img = makeimg(); //cree l'element img
  const h3 = makeh3(); //cree l'element img
  const p = makep(); //cree l'element img

  appendChildanchor(anchor, makearticle); //appelle la fonction qui acroche anchor a l'id items
  appendChildtoarticle(makearticle, img, h3, p); //appelle la fonctin qui acroche img, h3, p a l'article
}
//creation de l'element a
function makeanchor() {
  const anchor = document.createElement("a"); //cree l'element a
  return anchor;
}

//creation de l'element img
function makeimg() {
  const img = document.createElement("img"); //cree l'element img
  return img;
}

//creation de l'element h3
function makeh3() {
  const h3 = document.createElement("h3"); //cree l'element h3
  h3.classList.add("productName"); //ajoute comme nom de class productName
  return h3;
}

//creation de l'element p
function makep() {
  const p = document.createElement("p"); //cree l'element p
  p.classList.add("productDescription"); //ajoute comme nom de class productDescription
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

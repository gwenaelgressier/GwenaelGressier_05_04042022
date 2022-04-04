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

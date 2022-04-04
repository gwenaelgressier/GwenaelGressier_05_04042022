//
const queryString = window.location.search; //sert a recup se qui a apres le ? dans l'url
const urlParams = new URLSearchParams(queryString); //recup les param de l'url
const id = urlParams.get("id"); //recupere l'id

//mon fetch avec l'id recuperais de l'url
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => console.log(res));

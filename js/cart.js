const numberOfItems = localStorage.length;
console.log("le nombre d'item ajoutée est", numberOfItems);

for (let i = 0; i < numberOfItems; i++) {
  const item = localStorage.getItem(localStorage.key(i));
  console.log("objet a la position", i, "est :", item);
}

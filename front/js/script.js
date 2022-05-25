//accede a l'api
const api = "http://localhost:3000/api/products";

fetch(api)
    .then((response)         => response.json())
    .then((items)            => {
        items.forEach((item) => {
            createProduct(item);
        });
    });

/**
 * creation de mes carte de produit
 *
 * @param {*} item
 * @returns void
 */
function createProduct(item) 
{
    let description = document.createElement("p");
    description.classList.add("productDescription");
    description.textContent = item.description;

    let title = document.createElement("h3");
    title.classList.add("productName");
    title.textContent = item.name;

    let image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.altTxt;

    let article = document.createElement("article");
    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(description);

    let link  = document.createElement("a");
    link.href = "./product.html?id=" + item._id;
    link.appendChild(article);

    let target = document.getElementById("items");
    target.appendChild(link);
}

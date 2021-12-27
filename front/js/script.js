
const api = 'http://localhost:3000/api/products';
const productPlacement = document.getElementById('items');
const pPageItemImage = document.getElementsByClassName('item__img');

// make server request
function makeRequest(verb, url, data) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(verb, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200 || request.status === 201) {
          resolve(JSON.parse(request.response));
        } else {
          reject(JSON.parse(request.response));
        }
      }
    };
    if (verb === 'POST') {
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(data));
    } else {
      request.send();
    }
  });
}
// builds product cards based on server information
async function displayProducts() {
  const postPromise = makeRequest('GET', api);
  const postResponse = await postPromise;
  postResponse.forEach(goods => {
    const productContainer = document.createElement('a');
    productContainer.setAttribute('href', "product.html?id=" + goods._id);
    productPlacement.appendChild(productContainer);

    const productArticle = document.createElement('article');
    productContainer.appendChild(productArticle)

    const productImage = document.createElement('img');
    productImage.alt = goods.altTxt;
    productImage.src = goods.imageUrl;
    productArticle.appendChild(productImage);

    const productHeader = document.createElement('h3');
    productHeader.classList.add('productName');
    productHeader.textContent = goods.name;
    productArticle.appendChild(productHeader);

    const productParagraph = document.createElement('p');
    productParagraph.classList.add('productDescription');
    productParagraph.textContent = goods.description;
    productArticle.appendChild(productParagraph);
  })
}

displayProducts()


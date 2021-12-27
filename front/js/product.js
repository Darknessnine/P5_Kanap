// Web API/URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const api = 'http://localhost:3000/api/products';
// Cart
let cart = JSON.parse(localStorage.getItem("productsInCart") || "[]");
// Dom Elements
const productTitle = document.getElementById("title");
const productDescription = document.getElementById("description");
const productPrice = document.getElementById("price");
const productImage = document.getElementById('item__img');
let ProductColors = document.getElementById('colors');
const ProductQuantity = document.getElementById("quantity");
const AddToCartButton = document.getElementById('addToCart');


//Server request
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

//Display a single product
async function displayProduct() {
  const postPromise = makeRequest('GET', api + "/" + id);
  const postResponse = await postPromise;
  const PImage = document.createElement('img');
  PImage.alt = postResponse.altTxt;
  PImage.src = postResponse.imageUrl;
  PImage.id = "imageSRC";
  productImage.appendChild(PImage);
  productTitle.textContent = postResponse.name;
  productDescription.textContent = postResponse.description;;
  productPrice.textContent = postResponse.price;
  postResponse.colors.forEach(color => {
    ProductColors.innerHTML += `<option value="${color}">${color}</option>`;
  })
}


//Add products to localStroage
AddToCartButton.addEventListener('click', () => {
  let colorCheck = document.getElementById("colors");
  if (colorCheck.value == 0) {
    alert("please select a color before submitting!")
  } else {
    if (ProductQuantity.value > 0 && ProductQuantity.value <= 100 && ProductQuantity.value != 0) {
      let productImageUrl = document.getElementById("imageSRC").src;
      let itemQuantity = ProductQuantity.value;
      let color = ProductColors.value;
      const cartProduct = {
        id: id,
        title: productTitle.textContent,
        price: productPrice.textContent,
        color: ProductColors.value,
        discription: productDescription.textContent,
        quantity: itemQuantity,
        image: productImageUrl
      };

      let productCart = JSON.parse(localStorage.getItem("productsInCart"));

      //Check if the product is the same    
      if (productCart) {
        const resultFind = productCart.find(
          (element) => element.id === id && element.color === color);
        if (resultFind) {
          let newProductQuantity = parseInt(cartProduct.quantity) + parseInt(resultFind.quantity);
          resultFind.quantity = newProductQuantity;
          localStorage.setItem("productsInCart", JSON.stringify(productCart));
          console.log(productCart);
        } else {
          productCart.push(cartProduct);
          localStorage.setItem("productsInCart", JSON.stringify(productCart));
          console.log(productCart);
        }
      } else {
        productCart = [];
        productCart.push(cartProduct);
        localStorage.setItem("productsInCart", JSON.stringify(productCart));
        console.log(productCart);
      }
    }
  }
})

displayProduct()














































































































/* const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('id');
const api = 'http://localhost:3000/api/products';
let cart = JSON.parse(localStorage.getItem("productsInCart") || "[]");
// DOM elements
const productTitle = document.getElementById("title");
const productDescription = document.getElementById("description");
const productPrice = document.getElementById("price");
const productImage = document.getElementById('item__img');
const ProductColors = document.getElementById('colors');
const ProductQuantity = document.getElementById("quantity");
const AddToCartButton = document.getElementById('addToCart');
AddToCartButton.addEventListener('click', addToCart)
//AddToCartButton.innerHTML = `<button id="addToCart" onclick="addToCart()">Add to cart</button>`;



const selectElement = document.getElementById("quantity")
selectElement.addEventListener('change', (event) => {
  console.log(event.target.value)
});





//variables 
//AddToCartButton.disabled = true; 
//AddToCartButton.style.backgroundColor = "#DC143C";

//Server request
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

//Display a single product
async function displayProduct() {
  const postPromise = makeRequest('GET', api + "/" + productID);
  const postResponse = await postPromise;
  const PImage = document.createElement('img');
  PImage.alt = postResponse.altTxt;
  PImage.src = postResponse.imageUrl;
  productImage.appendChild(PImage);
  productTitle.textContent = postResponse.name;
  productDescription.textContent = postResponse.description;;
  productPrice.textContent = postResponse.price;
  postResponse.colors.forEach(color => {
    ProductColors.innerHTML += `<option value="${color}">${color}</option>`;
  })
}

AddToCartButton.addEventListener('click', addToCart)

// add to cart
function addToCart(){
  //check if product exists in cart
  let cart = JSON.parse(localStorage.getItem("productsInCart") || "[]")
  if (cart.some((item) => item.id === productID && item.color === item.color)){
    alert('Product already in cart');
    //update Item quantity and push to local storage
    
    } else {
      let products = JSON.parse(localStorage.getItem("productsInCart") || "[]"); 
      const itemQuantity = ProductQuantity.value;
      const cartProduct = {
        id: productID,
        title: productTitle.textContent,
        price: productPrice.textContent,
        color: ProductColors.value,
        quantity: itemQuantity,
        imageUrl: PImage.src
        //add ID tag
      };
      products.push(cartProduct);
      localStorage.setItem("productsInCart", JSON.stringify(products));
      test = JSON.parse(localStorage.getItem("productsInCart") || "[]");
      console.log(test);
  }
}
displayProduct()
//check localStorage
test = JSON.parse(localStorage.getItem("productsInCart") || "[]");
console.log(test);
 */




//Email
//const firstName = document.getElementById('firstName').name.value;
const firstName = document.getElementById('firstName');;
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastName = document.getElementById('lastName');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const address = document.getElementById('address');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const city = document.getElementById('city');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const email = document.getElementById('email');
const emailErrorMsg = document.getElementById('emailErrorMsg');
const submitButton = document.getElementById('order');
// Elements
const itemQuantity = document.getElementById('itemQuantity');
const cartItem = document.getElementById('cart__items');
let totalQuantity = document.getElementById('totalQuantity');
let totalValue = document.getElementById('totalPrice');
// Cart
let cart = JSON.parse(localStorage.getItem("productsInCart") || "[]");
console.log(cart);
// Form Validation RegExp
let characterRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
// form validation check
let isFirstNameValid = false;
let isLastNameValid = false;
let isAddressValid = false;
let isCityValid = false;
let isEmailValid = false;
// api Address
const api = 'http://localhost:3000/api/products/order';

//check forms if filled out correctly
function formValidation() {
  firstName.addEventListener('blur', function checkFirstName() {
    if (characterRegExp.test(firstName.value)) {
      firstNameErrorMsg.innerHTML = '';
      isFirstNameValid = true;
      firstName.style.border = 'medium solid LightGreen';
    } else {
      firstNameErrorMsg.innerHTML = 'please fill in proper first name';
      isFirstNameValid = false;
      firstName.style.border = 'medium solid red';
    }
  })

  lastName.addEventListener('blur', function checkLastName() {
    if (characterRegExp.test(lastName.value)) {
      lastNameErrorMsg.innerHTML = '';
      isLastNameValid = true;
      lastName.style.border = 'medium solid LightGreen';
    } else {
      lastNameErrorMsg.innerHTML = 'please fill in proper last name';
      isLastNameValid = false;
      lastName.style.border = 'medium solid red';
    }
  })

  address.addEventListener('blur', function checkAddress() {
    if (addressRegExp.test(address.value)) {
      addressErrorMsg.innerHTML = '';
      isAddressValid = true;
      address.style.border = 'medium solid LightGreen';
    } else {
      addressErrorMsg.innerHTML = 'please fill in proper address';
      isAddressValid = false;
      address.style.border = 'medium solid red';
    }
  })

  city.addEventListener('blur', function checkCity() {
    if (characterRegExp.test(city.value)) {
      cityErrorMsg.innerHTML = '';
      isCityValid = true;
      city.style.border = 'medium solid LightGreen';
    } else {
      cityErrorMsg.innerHTML = 'please fill in proper city';
      isCityValid = false;
      city.style.border = 'medium solid red';
    }
  })

  email.addEventListener('blur', function checkEmail() {
    if (emailRegExp.test(email.value)) {
      emailErrorMsg.innerHTML = '';
      isEmailValid = true;
      email.style.border = 'medium solid LightGreen';
    } else {
      emailErrorMsg.innerHTML = 'please fill in proper email';
      isEmailValid = false;
      email.style.border = 'medium solid red';
    }
  })
}

// send post request
function SendRequest() {
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    formValidation()
    //verify if all forms are correctly filled out
    if (isFirstNameValid && isLastNameValid && isAddressValid && isCityValid && isEmailValid) {
      let productID = []

      //Gets product id's and builds array
      for (let i = 0; i<cart.length;i++) {
        productID.push(cart[i].id);
      }
      console.log(productID);
      // product post object
      const order = {
        contact : {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: productID,
    } 
    //server request method's
    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
          'Accept': 'application/json', 
          "Content-Type": "application/json" 
      },
  };

  // send and recieve server products/ID
  fetch(api, options)
  .then((response) => response.json())
  .then((data) => {
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);
      document.location.href = "confirmation.html";
  })
  .catch((error) => {
      alert ( "Problem making fetch: " + error.message);
  });  
    } 
  })
}

//display all products from cart
function displayCart() {
  cartItem.innerHTML = "";
  cart.forEach((item) => {
    cartItem.innerHTML += `
    <article class="cart__item" data-id="${item.id}">
    <div class="cart__item__img">
      <img src="${item.image}" alt="Photo of ${item.title} sofa">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>(${item.color}) ${item.title}</h2>
        <p>€${item.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :${item.quantity} </p>
          <input type="number" data-id="${item.id}" class="itemQuantity" name="itemQuantity" min="1" max="100" 
          value="${item.quantity}" (${item.id})'>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${item.id}" >Delete</p>
        </div>
      </div>
    </div>
  </article>`
  })
}

//delate item
function deleteItem() {
  //finds product that matches id and color check
  let deleteButton = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (e) => {
      let idCheck = cart[i].id;
      let colorCheck = cart[i].color;
      cart = cart.filter(element => element.id !== idCheck || element.color !== colorCheck);
      localStorage.setItem("productsInCart", JSON.stringify(cart));
      window.location.reload()
    })
  }
}

// update quantity Input values
function updateQuantity() {
  let quantityInput = document.querySelectorAll(".itemQuantity");

  for (let x = 0; x < quantityInput.length; x++) {
    quantityInput[x].addEventListener("change", (event) => {

      let cartQuantityValue = cart[x].quantity;
      let inputQuantityValue = quantityInput[x].valueAsNumber;

      const ProductFind = cart.find((element) => element.inputQuantityValue !== cartQuantityValue);
      ProductFind.quantity = inputQuantityValue;
      cart[x].quantity = ProductFind.quantity;
      localStorage.setItem("productsInCart", JSON.stringify(cart));
      renderSubtotal();
      window.location.reload()
    })
  }
}

//update item total and price
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  })
  totalQuantity.innerHTML = `${totalItems}`;
  totalValue.innerHTML = `${totalPrice}`;
}

//call all functions

displayCart();
renderSubtotal();
deleteItem();
updateQuantity();
formValidation()
SendRequest()
























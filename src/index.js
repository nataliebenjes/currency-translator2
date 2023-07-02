
import './css/styles.css';
import TranslateService from './translator.js';

// Business Logic

function getTranslation(currency, amount) {
  let promise = TranslateService.getTranslation(currency);
  promise.then(function (response) {
    console.log(response);
    printElements(response, currency, amount);
  }, function (errorMessage) {
    printError(errorMessage);
    //printError function isn't being called
    console.log("see me??")
  }
  );
}


// UI Logic

function printElements(response, currency, amount) {
  if (isNaN(amount)) {
    document.querySelector('#showResponse').innerText = "Please enter a number"
  } else {
    const rate = response[0].conversion_rate;
    const number = rate * amount;
    const formattedNumber = new Intl.NumberFormat('de-DE', { style: 'currency', currency: `${currency}` }).format(number);
    document.querySelector('#showResponse').innerText = `$ ${amount} USD is ${formattedNumber}`;
  }
}


function printError(response) {
  console.log("helooooo???")
  console.log(response.status);
  document.querySelector('#showResponse').innerText = `ERROR!!!`
}
// function printError(response) {
//   console.log(response['error-type']);
//   showErrorMessage('An error occurred: ' + response.status);
// }

// function showErrorMessage(message) {
//   const errorElement = document.getElementById('error-message');
//   if (errorElement) {
//     errorElement.textContent = message;
//   } else {
//     console.error('Error element not found in the DOM.');
//     console.error(message);
//   }
// }

function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.querySelector('#entry').value;
  const amount = parseInt(document.querySelector("#quantity").value);
  getTranslation(currency, amount);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
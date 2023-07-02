
import './css/styles.css';
import TranslateService from './translator.js';

// Business Logic

function getTranslation(currency, amount) {
  TranslateService.getTranslation()
    .then(function (response) {
      if (response.conversion_rates) {
        printElements(response, currency, amount);
      } else {
        printError(response);
      }
    });
}

// UI Logic

function printElements(response, currency, amount) {
  if (isNaN(amount)) {
    document.querySelector('#showResponse').innerText = "Please enter a number";
  } else {
    const rate = response[0].conversion_rate;
    const number = rate * amount;
    const formattedNumber = new Intl.NumberFormat('de-DE', { style: 'currency', currency: `${currency}` }).format(number);
    document.querySelector('#showResponse').innerText = `$ ${amount} USD is ${formattedNumber}`;
  }
}


function printError(error) {
  document.querySelector('#error-message').innerText = `There was an error accessing the currency conversion data`;
  document.querySelector('#error-message').innerText = `${error}: ${error.status} ${error.statusText}: ${error.message}`;
}


function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.querySelector('#entry').value;
  const amount = parseInt(document.querySelector("#quantity").value);
  getTranslation(currency, amount);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
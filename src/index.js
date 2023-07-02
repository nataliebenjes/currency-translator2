
import './css/styles.css';
import TranslateService from './translator.js';

// Business Logic

function getTranslation(currency, amount) {
  let promise = TranslateService.getTranslation(currency);
  promise.then(function (response) {
    console.log(response);
    printElements(response, currency, amount);
  }, function (response) {
    printError(response);
  });
}

// UI Logic

function printElements(response, currency, amount) {
  console.log(response[0].conversion_rate);
  const rate = response[0].conversion_rate;
  const number = rate * amount;
  const formattedNumber = new Intl.NumberFormat('de-DE', { style: 'currency', currency: `${currency}` }).format(number);
  document.querySelector('#showResponse').innerText = `$ ${amount} USD is ${formattedNumber}`;
}

function printError(response) {
  document.querySelector('#showResponse').innerText = `${response.error.message}`
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
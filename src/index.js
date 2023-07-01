
import './css/styles.css';
import TranslateService from './translator.js';

// Business Logic

function getTranslation(currency, amount) {
  console.log(currency);
  let promise = TranslateService.getTranslation(currency);
  console.log()
  promise.then(function (getRate) {
    console.log(getRate);
    printElements(getRate, currency, amount);
  }, function (errorArray) {
    printError(errorArray);
  });
}

// UI Logic

function printElements(getRate, currency, amount) {
  document.querySelector('#showResponse').innerText = `${amount} USD is ${getRate} in ${amount}`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `${error}`
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
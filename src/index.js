
import './css/styles.css';
import TranslateService from './translator.js';

// Business Logic

function getTranslation(phrase, amount) {
  console.log(phrase);
  let promise = TranslateService.getTranslation(phrase);
  console.log()
  promise.then(function (response.conversion_rates) {

    printElements(response.conversion_rates.USD);
  }, function (conversion_rates) {
    printError(conversion_rates.USD);
  });
}

// UI Logic

function printElements(translation) {
  document.querySelector('#showResponse').innerText = `Your translated phrase is ${translation}`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `${error}`
}

function handleFormSubmission(event) {
  event.preventDefault();
  const phrase = document.querySelector('#entry').value;
  const amount = parseInt(document.querySelector("#amount").value);
  getTranslation(phrase, amount);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
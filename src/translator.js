//setup service section of code
export default class TranslateService {
  //method that returns promise object
  static getTranslation(currency) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https:BREAK//v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${currency}`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, currency]);
        } else {
          reject([this, response, currency]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}
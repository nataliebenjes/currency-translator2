//setup service section of code
export default class TranslateService {
  //method that returns promise object
  static getTranslation(currency) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exBREAKchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${currency}`;
      request.addEventListener("loadend", function () {
        console.log(this.responseText);
        console.log(this.status);
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, currency]);
        } else {
          reject([this, response, currency]);
        }
      });
      request.addEventListener("error", function () {
        reject(new Error("Failed to make the request. Please try again later."));
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}
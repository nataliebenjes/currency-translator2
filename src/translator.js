//setup service section of code
export default class TranslateService {
  //method that returns promise object
  static getTranslation(phrase) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${phrase}`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, phrase]);
        } else {
          reject([this, response, phrase]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}
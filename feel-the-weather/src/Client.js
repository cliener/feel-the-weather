const querySrc = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='Taguig') and u='c'&format=json&callback=";


const search = (location, cb) => {
  return fetch(querySrc, {
    accept: "application/json"
  })
  .then(response => response.json());
}

const Client = { search };
export default Client;

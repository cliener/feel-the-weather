const querySrc = location => `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${location}') and u='c'&format=json&callback=`;


const search = (location, cb) => {
  return fetch(querySrc(location), {
    accept: "application/json"
  })
  .then(response => response.json());
}

const Client = { search };
export default Client;

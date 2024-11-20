const request = require('postman-request');

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=080aedae76fc1a3664fa8ebc17786fc4&query=' + encodeURI(lattitude) + ',' + encodeURI(longitude) + '&units=m';
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service !', undefined)
        }  else if (body.error) {
            callback('Unable to find location. Please try another search!', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels_like:  body.current.feelslike
            });
        }
    });
}

module.exports = forecast;
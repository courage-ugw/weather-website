const request = require('postman-request');

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=025b4ef0cb738cf51f670cfcc74e7ce6&query=' + encodeURI(lattitude) + ',' + encodeURI(longitude) + '&units=m';
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
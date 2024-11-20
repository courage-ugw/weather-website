const request = require("postman-request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURI(address) + '&access_token=pk.eyJ1Ijoia2hvcmFnZSIsImEiOiJjbTNlbDgwamwwYzZrMmxxeHRreWdobDc1In0.xiqkUJIiR2TIxrpFZv1xlg';

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error_code) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            try {
                const data = {
                    latitude: body.features[3].properties.coordinates.latitude,
                    longitude:body.features[3].properties.coordinates.longitude,
                    location: body.features[3].properties.full_address
                }
                callback(undefined, data);
            } catch (error) {
                callback('Unable to find location. Try another search!', undefined);
            }
        }
    })
}

module.exports = geocode;
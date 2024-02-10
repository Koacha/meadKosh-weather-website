const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=504aa802c53099c0e47fe2630411d4de&query=${latitude},${longitude}&units=f`;
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Error: ' + body.error.info, undefined);
        } else {
            const data = body.current;
            const forecastData = `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. There is a ${data.precip}% chance of rain.`;
            callback(undefined, forecastData);
            
        }
    });
};

module.exports = forecast;

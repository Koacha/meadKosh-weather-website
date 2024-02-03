const request = require('request');

const geocode = (address, callback) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibGF5ZWtvc2giLCJhIjoiY2xydjdqc29hMGFvYTJwcDgzZWsyMW9sMSJ9.icGt69iq-EoadGiG3IvVXQ&limit=1';

   request({ url, json: true }, (error, { body }) => {
      if (error) {
         callback('Unable to connect to location services!', undefined);
      } else if (body.features.length === 0) {
         callback('Unable to find location. Try another search.', undefined);
      } else {
         const data = {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
         };
         callback(undefined, data);
      }
   });
};

module.exports = geocode
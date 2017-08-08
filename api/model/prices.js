const mongo = require("../modules/mongo");
const rp = require('request-promise');


//?hotels=20000,300400&country=ar&distribution=2&include=cheapest
exports.getAllPrices = (ids) => {
   var options = {
        method: 'GET',
        uri: 'https://api.despegar.com/v3/hotels/prices',
        qs: {
            hotels: ids,
            country: 'ar',
            distribution: 2,
            include : 'cheapest'
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'X-ApiKey': '9b5c64a0f58c44fd999df79202b136a4',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        gzip: true // Automatically parses the JSON string in the response 
    }; 

    return rp(options);
  
};
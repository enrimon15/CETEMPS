//express --> to make rest API
var express = require('express');
var router = express.Router();
require('dotenv').config();

var utilities = require('../utilities/common');

/*********** export router to make it callable from server.js **************/
module.exports = router;


// get mapping
// endpoint configuration
// example: http://localhost:3000/coords/city/torrebruna/ch/api-key=keyApp
// take coords by city and province
/**
 * @swagger
 * /coords/city/{city}/{prov}/api-key={key}:
 *   get:
 *     tags:
 *       - Coordinates
 *     description: Returns coordinates (lat,lon) of given city
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: city
 *         description: City Name
 *         in: path
 *         required: true
 *         type: string
 *       - name: prov
 *         description: City Province
 *         in: path
 *         required: true
 *         type: string
 *       - name: key
 *         description: Api Key
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *          description: OK
 */
router.get('/city/:city/:prov/api-key=:key', function (req, resp) {

    if (!utilities.checkAuth(req.params.key, resp)) return;

    const api_key_openweather = process.env.API_KEY_OPENWEATHER;
    var request = require("request");

    let cty = req.params.city;
    let prv = req.params.prov;
    //string interpolation
    let urlCoord = "";
    prv !== 'NULL' //if province is not available
        ? urlCoord = `https://api.openweathermap.org/data/2.5/weather?q=${cty},it,${prv}&appid=${api_key_openweather}&amp;units=metric&amp;lang=it`
        : urlCoord = `https://api.openweathermap.org/data/2.5/weather?q=${cty},it&appid=${api_key_openweather}&amp;units=metric&amp;lang=it`;


    const options = {
        url: urlCoord,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    };

    request(options, function(err, res, body) {

        let error = {};
        error.status = 'ERROR';
        error.message = 'Unable to get coords by city';

        if (err) { //if error
            console.log(err);
            resp.statusCode = 404;
            resp.send(error);
        } else if (!err && res.statusCode == 200) { //if no error
            let coords = JSON.parse(body);

            //check if coord is not null
            if (coords.coord != null) {
                resp.statusCode = 200;
                resp.send(coords.coord);
            } else {
                resp.statusCode = 404;
                resp.send(error)
            }

        }


    });

});


// get mapping
// endpoint configuration
// example: http://localhost:3000/coords/getCity/42.3505500/13.3995400/api-key=keyApp
// get city by coords
/**
 * @swagger
 * /coords/getCity/{lat}/{lon}/api-key={key}:
 *   get:
 *     tags:
 *       - Coordinates
 *     description: Returns city name by given coordinates (lat,lon)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lat
 *         description: Latitude
 *         in: path
 *         required: true
 *         type: string
 *       - name: lon
 *         description: Longitude
 *         in: path
 *         required: true
 *         type: string
 *       - name: key
 *         description: Api Key
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 */
router.get('/getCity/:lat/:lon/api-key=:key', function (req, resp) {

    if (!utilities.checkAuth(req.params.key, resp)) return;

    const api_key_heremaps = process.env.API_KEY_HEREMAPS;
    var request = require("request");

    let latitude = req.params.lat;
    let longitude = req.params.lon;
    //string interpolation
    let urlCoord = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=it-IT&apiKey=${api_key_heremaps}`;

    const options = {
        url: urlCoord,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    };

    request(options, function(err, res, body) {

        let error = {};
        error.status = 'ERROR';
        error.message = 'Unable to get city by coords';

        if (err) { //if error
            console.log(err);
            resp.statusCode = 404;
            resp.send(error);
        } else if (!err && res.statusCode == 200) { //if no error
            let jsonResponse = JSON.parse(body);

            //check if coord is not null
            if (jsonResponse.items != null && jsonResponse.items.length > 0) {
                let city = jsonResponse.items[0].address.city;
                let result = {};
                result.city = city;
                resp.statusCode = 200;
                resp.send(result);
            } else {
                resp.statusCode = 404;
                resp.send(error)
            }

        }


    });

});

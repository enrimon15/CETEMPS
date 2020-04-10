//express --> to make rest API
var express = require('express');
var router = express.Router();

/*********** export router to make it callable from server.js **************/
module.exports = router;


// get mapping
// endpoint configuration
// example: http://localhost:3000/coords/city/torrebruna/ch
// take coords by city and province
router.get('/city/:city/:prov', function (req, resp) {

    var request = require("request");

    var cty = req.params.city;
    var prv = req.params.prov;
    //string interpolation
    let urlCoord = "";
    prv !== 'NULL' //if province is not available
        ? urlCoord = `https://api.openweathermap.org/data/2.5/weather?q=${cty},it,${prv}&appid=73f45256d96f6980fc804cca915873ea&amp;units=metric&amp;lang=it`
        : urlCoord = `https://api.openweathermap.org/data/2.5/weather?q=${cty},it&appid=73f45256d96f6980fc804cca915873ea&amp;units=metric&amp;lang=it`;


    const options = {
        url: urlCoord,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    };

    request(options, function(err, res, body) {

        var error = {};
        error.status = 'ERROR';
        error.message = 'Unable to get coords';
        error.statusCode = 404;

        if (err) { //if error
            console.log(err);
            resp.send(error);
        } else if (!err && res.statusCode == 200) { //if no error
            let coords = JSON.parse(body);
            console.log(coords.coord);

            //check if coord is not null
            if (coords.coord != null) {
                resp.statusCode = 200;
                resp.send(coords.coord);
            } else {
                resp.send(error)
            }

        }


    });

});


// get mapping
// endpoint configuration
// example: http://localhost:3000/coords/getCity/42.3505500/13.3995400
// take city by coords
router.get('/getCity/:lat/:lon', function (req, resp) {

    var request = require("request");

    var latitude = req.params.lat;
    var longitude = req.params.lon;
    //string interpolation
    var urlCoord = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=it-IT&apiKey=4TJndb4enFZCGebwN0Pnr9-JbF1Qbw0-pHNAXTGOtIw`;

    const options = {
        url: urlCoord,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    };

    request(options, function(err, res, body) {

        var error = {};
        error.status = 'ERROR';
        error.message = 'Unable to get coords';
        error.statusCode = 404;

        if (err) { //if error
            console.log(err);
            resp.send(error);
        } else if (!err && res.statusCode == 200) { //if no error
            let jsonResponse = JSON.parse(body);
            console.log(jsonResponse);

            //check if coord is not null
            if (jsonResponse.items != null && jsonResponse.items.length > 0) {
                let city = jsonResponse.items[0].address.city;
                let result = {};
                resp.statusCode = 200;
                result.city = city;
                resp.send(result);
            } else {
                resp.send(error)
            }

        }


    });

});

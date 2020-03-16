//express --> to make rest API
var express = require('express');
var router = express.Router();

/*********** export router to make it callable from server.js **************/
module.exports = router;


// get mapping
// endpoint configuration
// example: http://localhost:3000/coords/city/torrebruna/ch
router.get('/city/:city/:prov', function (req, resp) {

    var request = require("request");

    var cty = req.params.city;
    var prv = req.params.prov;
    //string interpolation
    var urlCoord = `https://api.openweathermap.org/data/2.5/weather?q=${cty},it,${prv}&appid=73f45256d96f6980fc804cca915873ea&amp;units=metric&amp;lang=it`;

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
        error.code = '404';

        if (err) { //if error
            console.log(err);
            resp.send(error);
        } else if (!err && res.statusCode == 200) { //if no error
            let coords = JSON.parse(body);
            console.log(coords.coord);

            //check if coord is not null
            if (coords.coord != null) {
                resp.send(coords.coord);
            } else {
                resp.send(error)
            }

        }


    });

});

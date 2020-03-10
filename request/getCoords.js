function getCoords(city, prov, callback) {
    var request = require("request");

    //string interpolation
    var urlCoord = `https://api.openweathermap.org/data/2.5/weather?q=${city},it,${prov}&appid=73f45256d96f6980fc804cca915873ea&amp;units=metric&amp;lang=it`;

    const options = {
        url: urlCoord,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    };

    return request(options, function(err, res, body) {

        var error = {};
        error.code = '404';
        error.status = 'ERROR';
        error.message = 'Unable to get coords';

        if (err) { //if error
            callback(error);
        }
        if (!err && res.statusCode == 200) { //if no error
            let coords = JSON.parse(body);
            callback(coords.coord);
        }
    });

}

module.exports = getCoords;

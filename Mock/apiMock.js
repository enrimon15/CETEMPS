//express to make rest API
var express = require('express');
var router = express.Router();

//import getCoords function
var getCoords = require('../request/getCoords');

/*********** export router to make callable from server.js **************/
module.exports = router;


// example: http://localhost:3000/mock/weather/today/city/torrebruna/ch
router.get('/weather/today/:city/:prov/:language/units=:units', function (request, response) {
    //normalize params (cetemps need to read city with fist letter capitalized and province to upper case)
    let param1 = request.params.city;
    let cty = param1.charAt(0).toUpperCase() + param1.substring(1);
    let param2 = request.params.prov;
    let prv = param2.toUpperCase();
    let units = request.params.units;
    let language = request.params.language;

    console.log(cty);
    console.log(prv);

    // url of cetemps
    let URL = "";
    prv !== 'NULL' //if province is not available
        ? URL = `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${cty}&Invia=Invia&psite=${prv}&.cgifields=site`
        : URL = `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${cty}&Invia=Invia&.cgifields=site`;

    console.log(URL);

    let json = {};
    if (language == 'IT') {
        json = {
            "cityHeight": "845m",
            "cityName": "Torrebruna",
            "cityProvince": "(CH)",
            "hours": [
                {
                    "hour": "02:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1018 mbar",
                        "status": "Nuvoloso",
                        "temperature": "4 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "03:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1019 mbar",
                        "status": "Nuvoloso",
                        "temperature": "4 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "04:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1018 mbar",
                        "status": "Nuvoloso",
                        "temperature": "3 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "05:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1018 mbar",
                        "status": "Nuvoloso",
                        "temperature": "3 °C",
                        "wind": "18 km/h"
                    }
                },
                {
                    "hour": "06:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1019 mbar",
                        "status": "Nuvoloso",
                        "temperature": "3 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "07:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1019 mbar",
                        "status": "Nuvoloso",
                        "temperature": "3 °C",
                        "wind": "19 km/h"
                    }
                },
                {
                    "hour": "08:00",
                    "weather": {
                        "humidity": "96 %",
                        "pressure": "1020 mbar",
                        "status": "Nuvoloso",
                        "temperature": "4 °C",
                        "wind": "23 km/h"
                    }
                },
                {
                    "hour": "09:00",
                    "weather": {
                        "humidity": "93 %",
                        "pressure": "1021 mbar",
                        "status": "Nuvoloso",
                        "temperature": "4 °C",
                        "wind": "23 km/h"
                    }
                },
                {
                    "hour": "10:00",
                    "weather": {
                        "humidity": "84 %",
                        "pressure": "1021 mbar",
                        "status": "Nuvoloso",
                        "temperature": "5 °C",
                        "wind": "31 km/h"
                    }
                },
                {
                    "hour": "11:00",
                    "weather": {
                        "humidity": "89 %",
                        "pressure": "1021 mbar",
                        "status": "Nuvoloso",
                        "temperature": "4 °C",
                        "wind": "24 km/h"
                    }
                },
                {
                    "hour": "12:00",
                    "weather": {
                        "humidity": "93 %",
                        "pressure": "1021 mbar",
                        "status": "Nuvoloso",
                        "temperature": "5 °C",
                        "wind": "24 km/h"
                    }
                },
                {
                    "hour": "13:00",
                    "weather": {
                        "humidity": "96 %",
                        "pressure": "1022 mbar",
                        "status": "Pioggia",
                        "temperature": "4 °C",
                        "wind": "20 km/h"
                    }
                },
                {
                    "hour": "14:00",
                    "weather": {
                        "humidity": "87 %",
                        "pressure": "1022 mbar",
                        "status": "Nuvoloso",
                        "temperature": "5 °C",
                        "wind": "18 km/h"
                    }
                },
                {
                    "hour": "15:00",
                    "weather": {
                        "humidity": "88 %",
                        "pressure": "1022 mbar",
                        "status": "Nuvoloso",
                        "temperature": "5 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "16:00",
                    "weather": {
                        "humidity": "87 %",
                        "pressure": "1022 mbar",
                        "status": "Nuvoloso",
                        "temperature": "5 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "17:00",
                    "weather": {
                        "humidity": "92 %",
                        "pressure": "1023 mbar",
                        "status": "Nuvoloso",
                        "temperature": "5 °C",
                        "wind": "9 km/h"
                    }
                },
                {
                    "hour": "18:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1023 mbar",
                        "status": "Nuvoloso",
                        "temperature": "3 °C",
                        "wind": "11 km/h"
                    }
                },
                {
                    "hour": "19:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1024 mbar",
                        "status": "Nuvoloso",
                        "temperature": "2 °C",
                        "wind": "13 km/h"
                    }
                },
                {
                    "hour": "20:00",
                    "weather": {
                        "humidity": "96 %",
                        "pressure": "1024 mbar",
                        "status": "Nuvoloso",
                        "temperature": "2 °C",
                        "wind": "13 km/h"
                    }
                },
                {
                    "hour": "21:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1025 mbar",
                        "status": "Nuvoloso",
                        "temperature": "1 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "22:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1025 mbar",
                        "status": "Nuvoloso",
                        "temperature": "1 °C",
                        "wind": "15 km/h"
                    }
                },
                {
                    "hour": "23:00",
                    "weather": {
                        "humidity": "96 %",
                        "pressure": "1025 mbar",
                        "status": "Nuvoloso",
                        "temperature": "1 °C",
                        "wind": "15 km/h"
                    }
                }
            ]
        };
    }

    else if (language == 'EN') {
        json = {
            "cityHeight": "845m",
            "cityName": "Torrebruna",
            "cityProvince": "(CH)",
            "hours": [
                {
                    "hour": "02:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1018 mbar",
                        "status": "Cloudy",
                        "temperature": "4 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "03:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1019 mbar",
                        "status": "Cloudy",
                        "temperature": "4 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "04:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1018 mbar",
                        "status": "Cloudy",
                        "temperature": "3 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "05:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1018 mbar",
                        "status": "Cloudy",
                        "temperature": "3 °C",
                        "wind": "18 km/h"
                    }
                },
                {
                    "hour": "06:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1019 mbar",
                        "status": "Cloudy",
                        "temperature": "3 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "07:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1019 mbar",
                        "status": "Cloudy",
                        "temperature": "3 °C",
                        "wind": "19 km/h"
                    }
                },
                {
                    "hour": "08:00",
                    "weather": {
                        "humidity": "96 %",
                        "pressure": "1020 mbar",
                        "status": "Cloudy",
                        "temperature": "4 °C",
                        "wind": "23 km/h"
                    }
                },
                {
                    "hour": "09:00",
                    "weather": {
                        "humidity": "93 %",
                        "pressure": "1021 mbar",
                        "status": "Cloudy",
                        "temperature": "4 °C",
                        "wind": "23 km/h"
                    }
                },
                {
                    "hour": "10:00",
                    "weather": {
                        "humidity": "84 %",
                        "pressure": "1021 mbar",
                        "status": "Cloudy",
                        "temperature": "5 °C",
                        "wind": "31 km/h"
                    }
                },
                {
                    "hour": "11:00",
                    "weather": {
                        "humidity": "89 %",
                        "pressure": "1021 mbar",
                        "status": "Cloudy",
                        "temperature": "4 °C",
                        "wind": "24 km/h"
                    }
                },
                {
                    "hour": "12:00",
                    "weather": {
                        "humidity": "93 %",
                        "pressure": "1021 mbar",
                        "status": "Cloudy",
                        "temperature": "5 °C",
                        "wind": "24 km/h"
                    }
                },
                {
                    "hour": "13:00",
                    "weather": {
                        "humidity": "96 %",
                        "pressure": "1022 mbar",
                        "status": "Rain",
                        "temperature": "4 °C",
                        "wind": "20 km/h"
                    }
                },
                {
                    "hour": "14:00",
                    "weather": {
                        "humidity": "87 %",
                        "pressure": "1022 mbar",
                        "status": "Cloudy",
                        "temperature": "5 °C",
                        "wind": "18 km/h"
                    }
                },
                {
                    "hour": "15:00",
                    "weather": {
                        "humidity": "88 %",
                        "pressure": "1022 mbar",
                        "status": "Cloudy",
                        "temperature": "5 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "16:00",
                    "weather": {
                        "humidity": "87 %",
                        "pressure": "1022 mbar",
                        "status": "Cloudy",
                        "temperature": "5 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "17:00",
                    "weather": {
                        "humidity": "92 %",
                        "pressure": "1023 mbar",
                        "status": "Cloudy",
                        "temperature": "5 °C",
                        "wind": "9 km/h"
                    }
                },
                {
                    "hour": "18:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1023 mbar",
                        "status": "Cloudy",
                        "temperature": "3 °C",
                        "wind": "11 km/h"
                    }
                },
                {
                    "hour": "19:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1024 mbar",
                        "status": "Cloudy",
                        "temperature": "2 °C",
                        "wind": "13 km/h"
                    }
                },
                {
                    "hour": "20:00",
                    "weather": {
                        "humidity": "96 %",
                        "pressure": "1024 mbar",
                        "status": "Cloudy",
                        "temperature": "2 °C",
                        "wind": "13 km/h"
                    }
                },
                {
                    "hour": "21:00",
                    "weather": {
                        "humidity": "97 %",
                        "pressure": "1025 mbar",
                        "status": "Cloudy",
                        "temperature": "1 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "22:00",
                    "weather": {
                        "humidity": "98 %",
                        "pressure": "1025 mbar",
                        "status": "Cloudy",
                        "temperature": "1 °C",
                        "wind": "15 km/h"
                    }
                },
                {
                    "hour": "23:00",
                    "weather": {
                        "humidity": "96 %",
                        "pressure": "1025 mbar",
                        "status": "Cloudy",
                        "temperature": "1 °C",
                        "wind": "15 km/h"
                    }
                }
            ]
        };
    }

    if (units == 'imperial') {
        json.cityHeight = '1000ft';
        json.hours.forEach( (hour) => {
            hour.weather.temperature = '40 °F';
            hour.weather.wind = '12 mph';
        });
    }

    response.statusCode = 200;
    setTimeout(function() {
        response.send(json);
    }, 1000);

});



// example: http://localhost:3000/mock/weather/fivedays/city/torrebruna/ch
router.get('/weather/fivedays/:city/:prov/:language/units=:units', function (request, response) {

    let units = request.params.units;
    let language = request.params.language;

    let json = {};

    if (language == 'IT') {
        json = {
            "cityHeight": "845m",
            "cityName": "Torrebruna",
            "cityProvince": "(CH)",
            "days": [
                {
                    "day": "Lunedì 16",
                    "weather": {
                        "humidity": "73 %",
                        "pressure": "1027 mbar",
                        "status": "Cielo Coperto",
                        "temperature": "6 °C",
                        "wind": "11 km/h"
                    }
                },
                {
                    "day": "Martedì 17",
                    "weather": {
                        "humidity": "85 %",
                        "pressure": "1031 mbar",
                        "status": "Nuvoloso",
                        "temperature": "7 °C",
                        "wind": "15 km/h"
                    }
                },
                {
                    "day": "Mercoledì 18",
                    "weather": {
                        "humidity": "76 %",
                        "pressure": "1028 mbar",
                        "status": "Cielo Coperto",
                        "temperature": "8 °C",
                        "wind": "20 km/h"
                    }
                },
                {
                    "day": "Giovedì 19",
                    "weather": {
                        "humidity": "82 %",
                        "pressure": "1025 mbar",
                        "status": "Nuvoloso",
                        "temperature": "9 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "day": "Venerdì 20",
                    "weather": {
                        "humidity": "83 %",
                        "pressure": "1021 mbar",
                        "status": "Nuvoloso",
                        "temperature": "9 °C",
                        "wind": "11 km/h"
                    }
                }
            ]
        };
    }

    else if (language == 'EN') {
        json = {
            "cityHeight": "845m",
            "cityName": "Torrebruna",
            "cityProvince": "(CH)",
            "days": [
                {
                    "day": "Monday 16",
                    "weather": {
                        "humidity": "73 %",
                        "pressure": "1027 mbar",
                        "status": "Partly Cloudy",
                        "temperature": "6 °C",
                        "wind": "11 km/h"
                    }
                },
                {
                    "day": "Tuesday 17",
                    "weather": {
                        "humidity": "85 %",
                        "pressure": "1031 mbar",
                        "status": "Cloudy",
                        "temperature": "7 °C",
                        "wind": "15 km/h"
                    }
                },
                {
                    "day": "Wednesday 18",
                    "weather": {
                        "humidity": "76 %",
                        "pressure": "1028 mbar",
                        "status": "Partly Cloudy",
                        "temperature": "8 °C",
                        "wind": "20 km/h"
                    }
                },
                {
                    "day": "Thursday 19",
                    "weather": {
                        "humidity": "82 %",
                        "pressure": "1025 mbar",
                        "status": "Cloudy",
                        "temperature": "9 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "day": "Friday 20",
                    "weather": {
                        "humidity": "83 %",
                        "pressure": "1021 mbar",
                        "status": "Cloudy",
                        "temperature": "9 °C",
                        "wind": "11 km/h"
                    }
                }
            ]
        };
    }

    if (units == 'imperial') {
        json.cityHeight = '1000ft';
        json.days.forEach( (day) => {
            day.weather.temperature = '40 °F';
            day.weather.wind = '12 mph';
        });
    }

    response.statusCode = 200;
    setTimeout(function() {
        response.send(json);
    }, 1000);


});


// example: http://localhost:3000/mock/coords/city/torrebruna/ch
router.get('/coords/city/:city/:prov', function (request, response) {

    let json = {
        "lat": 42.3505500,
        "lon": 13.3995400
    };

    response.statusCode = 200;
    response.send(json);


});


// example: http://localhost:3000/mock/coords/getCity/42.3505500/13.3995400
router.get('/coords/getCity/:lat/:lon', function (request, response) {

    let json = {
        "city": "L'Aquila"
    };

    response.statusCode = 200;
    response.send(json);


});


// example: http://localhost:3000/mock/coords/getCity/42.3505500/13.3995400
router.get('/weather/current/:city/:prov/:language/units=:units', function (request, response) {

    let units = request.params.units;
    let language = request.params.language;

    let json = {};

    if (units == 'metric') {
        json = {
            "cityHeight": "845m",
            "cityName": "L'Aquila",
            "cityProvince": "(AQ)",
            "weather": {
                "currentHumidity": "73 %",
                "currentPressure": "1027 mbar",
                "currentStatus": "Cielo Coperto",
                "currentTemperature": "6 °C",
                "currentWind": "11 km/h"
            }
        };
    }

    else if (units == 'imperial') {
        json = {
            "cityHeight": "1000ft",
            "cityName": "L'Aquila",
            "cityProvince": "(AQ)",
            "weather": {
                "currentHumidity": "73 %",
                "currentPressure": "1027 mbar",
                "currentStatus": "Cielo Coperto",
                "currentTemperature": "43 °F",
                "currentWind": "11 mph"
            }
        };
    }

    if (language == 'EN') {
        json.weather.currentStatus = 'Partly Cloudy';
    }

    response.statusCode = 200;
    response.send(json);


});

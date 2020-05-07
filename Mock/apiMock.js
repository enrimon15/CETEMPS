//express to make rest API
var express = require('express');
var router = express.Router();
var utilities = require('../utilities/common');

/*********** export router to make callable from server.js **************/
module.exports = router;


// example: http://localhost:3000/mock/weather/today/torrebruna/ch/IT/metric/api-key=keyApp
router.get('/weather/today/:city/:prov/:language/units=:units/api-key=:key', function (request, response) {

    if (!utilities.checkAuth(request.params.key, response)) return;

    //normalize params (cetemps need to read city with fist letter capitalized and province to upper case)
    let param1 = request.params.city;
    let cty = param1.charAt(0).toUpperCase() + param1.substring(1);
    let param2 = request.params.prov;
    let prv = param2.toUpperCase();
    let units = request.params.units;
    let language = request.params.language;


    // url of cetemps
    let URL = "";
    prv !== 'NULL' //if province is not available
        ? URL = `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${cty}&Invia=Invia&psite=${prv}&.cgifields=site`
        : URL = `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${cty}&Invia=Invia&.cgifields=site`;


    let json = {};
    if (language == 'IT') {
        json = {
            "cityHeight": "714m",
            "cityName": "L'Aquila",
            "cityProvince": "(AQ)",
            "hours": [
                {
                    "hour": "00:00",
                    "weather": {
                        "humidity": "78 %",
                        "pressure": "1015 mbar",
                        "status": "Sereno",
                        "temperature": "10 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "01:00",
                    "weather": {
                        "humidity": "78 %",
                        "pressure": "1015 mbar",
                        "status": "Sereno",
                        "temperature": "10 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "02:00",
                    "weather": {
                        "humidity": "78 %",
                        "pressure": "1015 mbar",
                        "status": "Sereno",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "03:00",
                    "weather": {
                        "humidity": "78 %",
                        "pressure": "1015 mbar",
                        "status": "Sereno",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "04:00",
                    "weather": {
                        "humidity": "74 %",
                        "pressure": "1014 mbar",
                        "status": "Sereno",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "05:00",
                    "weather": {
                        "humidity": "72 %",
                        "pressure": "1015 mbar",
                        "status": "Soleggiato",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "06:00",
                    "weather": {
                        "humidity": "69 %",
                        "pressure": "1015 mbar",
                        "status": "Soleggiato",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "07:00",
                    "weather": {
                        "humidity": "65 %",
                        "pressure": "1015 mbar",
                        "status": "Soleggiato",
                        "temperature": "11 °C",
                        "wind": "11 km/h"
                    }
                },
                {
                    "hour": "08:00",
                    "weather": {
                        "humidity": "58 %",
                        "pressure": "1014 mbar",
                        "status": "Soleggiato",
                        "temperature": "14 °C",
                        "wind": "5 km/h"
                    }
                },
                {
                    "hour": "09:00",
                    "weather": {
                        "humidity": "46 %",
                        "pressure": "1014 mbar",
                        "status": "Soleggiato",
                        "temperature": "16 °C",
                        "wind": "8 km/h"
                    }
                },
                {
                    "hour": "10:00",
                    "weather": {
                        "humidity": "44 %",
                        "pressure": "1014 mbar",
                        "status": "Soleggiato",
                        "temperature": "17 °C",
                        "wind": "9 km/h"
                    }
                },
                {
                    "hour": "11:00",
                    "weather": {
                        "humidity": "47 %",
                        "pressure": "1013 mbar",
                        "status": "Soleggiato",
                        "temperature": "18 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "12:00",
                    "weather": {
                        "humidity": "60 %",
                        "pressure": "1014 mbar",
                        "status": "Soleggiato",
                        "temperature": "17 °C",
                        "wind": "19 km/h"
                    }
                },
                {
                    "hour": "13:00",
                    "weather": {
                        "humidity": "68 %",
                        "pressure": "1014 mbar",
                        "status": "Cielo Coperto",
                        "temperature": "17 °C",
                        "wind": "22 km/h"
                    }
                },
                {
                    "hour": "14:00",
                    "weather": {
                        "humidity": "68 %",
                        "pressure": "1014 mbar",
                        "status": "Nuvoloso",
                        "temperature": "17 °C",
                        "wind": "21 km/h"
                    }
                },
                {
                    "hour": "15:00",
                    "weather": {
                        "humidity": "67 %",
                        "pressure": "1014 mbar",
                        "status": "Nuvoloso",
                        "temperature": "19 °C",
                        "wind": "21 km/h"
                    }
                },
                {
                    "hour": "16:00",
                    "weather": {
                        "humidity": "71 %",
                        "pressure": "1015 mbar",
                        "status": "Nuvoloso",
                        "temperature": "16 °C",
                        "wind": "17 km/h"
                    }
                },
                {
                    "hour": "17:00",
                    "weather": {
                        "humidity": "77 %",
                        "pressure": "1014 mbar",
                        "status": "Nuvoloso",
                        "temperature": "15 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "18:00",
                    "weather": {
                        "humidity": "76 %",
                        "pressure": "1015 mbar",
                        "status": "Nuvoloso",
                        "temperature": "14 °C",
                        "wind": "17 km/h"
                    }
                },
                {
                    "hour": "19:00",
                    "weather": {
                        "humidity": "82 %",
                        "pressure": "1016 mbar",
                        "status": "Nuvoloso",
                        "temperature": "12 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "20:00",
                    "weather": {
                        "humidity": "90 %",
                        "pressure": "1017 mbar",
                        "status": "Pioggia",
                        "temperature": "11 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "21:00",
                    "weather": {
                        "humidity": "90 %",
                        "pressure": "1017 mbar",
                        "status": "Nuvoloso",
                        "temperature": "11 °F",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "22:00",
                    "weather": {
                        "humidity": "87 %",
                        "pressure": "1018 mbar",
                        "status": "Nuvoloso",
                        "temperature": "11 °F",
                        "wind": "11 km/h"
                    }
                },
                {
                    "hour": "23:00",
                    "weather": {
                        "humidity": "85 %",
                        "pressure": "1019 mbar",
                        "status": "Nuvoloso",
                        "temperature": "11 °F",
                        "wind": "10 km/h"
                    }
                }
            ]
        };
    }

    else if (language == 'EN') {
        json = {
            "cityHeight": "714m",
            "cityName": "L'Aquila",
            "cityProvince": "(AQ)",
            "hours": [
                {
                    "hour": "00:00",
                    "weather": {
                        "humidity": "78 %",
                        "pressure": "1015 mbar",
                        "status": "Clear",
                        "temperature": "10 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "01:00",
                    "weather": {
                        "humidity": "78 %",
                        "pressure": "1015 mbar",
                        "status": "Clear",
                        "temperature": "10 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "02:00",
                    "weather": {
                        "humidity": "78 %",
                        "pressure": "1015 mbar",
                        "status": "Clear",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "03:00",
                    "weather": {
                        "humidity": "78 %",
                        "pressure": "1015 mbar",
                        "status": "Clear",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "04:00",
                    "weather": {
                        "humidity": "74 %",
                        "pressure": "1014 mbar",
                        "status": "Clear",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "05:00",
                    "weather": {
                        "humidity": "72 %",
                        "pressure": "1015 mbar",
                        "status": "Sunny",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "06:00",
                    "weather": {
                        "humidity": "69 %",
                        "pressure": "1015 mbar",
                        "status": "Sunny",
                        "temperature": "11 °C",
                        "wind": "14 km/h"
                    }
                },
                {
                    "hour": "07:00",
                    "weather": {
                        "humidity": "65 %",
                        "pressure": "1015 mbar",
                        "status": "Sunny",
                        "temperature": "11 °C",
                        "wind": "11 km/h"
                    }
                },
                {
                    "hour": "08:00",
                    "weather": {
                        "humidity": "58 %",
                        "pressure": "1014 mbar",
                        "status": "Sunny",
                        "temperature": "14 °C",
                        "wind": "5 km/h"
                    }
                },
                {
                    "hour": "09:00",
                    "weather": {
                        "humidity": "46 %",
                        "pressure": "1014 mbar",
                        "status": "Sunny",
                        "temperature": "16 °C",
                        "wind": "8 km/h"
                    }
                },
                {
                    "hour": "10:00",
                    "weather": {
                        "humidity": "44 %",
                        "pressure": "1014 mbar",
                        "status": "Sunny",
                        "temperature": "17 °C",
                        "wind": "9 km/h"
                    }
                },
                {
                    "hour": "11:00",
                    "weather": {
                        "humidity": "47 %",
                        "pressure": "1013 mbar",
                        "status": "Sunny",
                        "temperature": "18 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "12:00",
                    "weather": {
                        "humidity": "60 %",
                        "pressure": "1014 mbar",
                        "status": "Sunny",
                        "temperature": "17 °C",
                        "wind": "19 km/h"
                    }
                },
                {
                    "hour": "13:00",
                    "weather": {
                        "humidity": "68 %",
                        "pressure": "1014 mbar",
                        "status": "Partly Cloudy",
                        "temperature": "17 °C",
                        "wind": "22 km/h"
                    }
                },
                {
                    "hour": "14:00",
                    "weather": {
                        "humidity": "68 %",
                        "pressure": "1014 mbar",
                        "status": "Cloudy",
                        "temperature": "17 °C",
                        "wind": "21 km/h"
                    }
                },
                {
                    "hour": "15:00",
                    "weather": {
                        "humidity": "67 %",
                        "pressure": "1014 mbar",
                        "status": "Cloudy",
                        "temperature": "19 °C",
                        "wind": "21 km/h"
                    }
                },
                {
                    "hour": "16:00",
                    "weather": {
                        "humidity": "71 %",
                        "pressure": "1015 mbar",
                        "status": "Cloudy",
                        "temperature": "16 °C",
                        "wind": "17 km/h"
                    }
                },
                {
                    "hour": "17:00",
                    "weather": {
                        "humidity": "77 %",
                        "pressure": "1014 mbar",
                        "status": "Cloudy",
                        "temperature": "15 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "18:00",
                    "weather": {
                        "humidity": "76 %",
                        "pressure": "1015 mbar",
                        "status": "Cloudy",
                        "temperature": "14 °C",
                        "wind": "17 km/h"
                    }
                },
                {
                    "hour": "19:00",
                    "weather": {
                        "humidity": "82 %",
                        "pressure": "1016 mbar",
                        "status": "Cloudy",
                        "temperature": "12 °C",
                        "wind": "16 km/h"
                    }
                },
                {
                    "hour": "20:00",
                    "weather": {
                        "humidity": "90 %",
                        "pressure": "1017 mbar",
                        "status": "Rain",
                        "temperature": "11 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "21:00",
                    "weather": {
                        "humidity": "90 %",
                        "pressure": "1017 mbar",
                        "status": "Cloudy",
                        "temperature": "11 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "hour": "22:00",
                    "weather": {
                        "humidity": "87 %",
                        "pressure": "1018 mbar",
                        "status": "Cloudy",
                        "temperature": "11 °C",
                        "wind": "11 km/h"
                    }
                },
                {
                    "hour": "23:00",
                    "weather": {
                        "humidity": "85 %",
                        "pressure": "1019 mbar",
                        "status": "Cloudy",
                        "temperature": "11 °C",
                        "wind": "10 km/h"
                    }
                }
            ]
        };
    }


    if (units == 'imperial') {
        json.cityHeight = '2342ft';
        json.hours.forEach( (hour) => {
            let tempCelsius = parseInt(hour.weather.temperature.split(' ')[0]);
            let tempFahrenheit = Math.round(((tempCelsius * 9/5) + 32));
            hour.weather.temperature = `${tempFahrenheit} °F`;

            let windMetric = parseInt(hour.weather.wind.split(' ')[0]);
            let windImperial = Math.round(windMetric / 1.609);
            hour.weather.wind = `${windImperial} mph`;
        });
    }

    response.statusCode = 200;
    setTimeout(function() {
        response.send(json);
    }, 1000);

});



// example: http://localhost:3000/mock/weather/fivedays/city/torrebruna/ch/api-key=keyApp
router.get('/weather/fivedays/:city/:prov/:language/units=:units/api-key=:key', function (request, response) {

    if (!utilities.checkAuth(request.params.key, response)) return;


    let units = request.params.units;
    let language = request.params.language;

    let json = {};

    if (language == 'IT') {
        json = {
            "cityHeight": "714m",
            "cityName": "L'Aquila",
            "cityProvince": "(AQ)",
            "days": [
                {
                    "day": "Giovedì 7",
                    "weather": {
                        "humidity": "38 %",
                        "pressure": "1022 mbar",
                        "status": "Soleggiato",
                        "temperature": "16 °C",
                        "wind": "15 km/h"
                    }
                },
                {
                    "day": "Venerdì 8",
                    "weather": {
                        "humidity": "30 %",
                        "pressure": "1021 mbar",
                        "status": "Soleggiato",
                        "temperature": "21 °C",
                        "wind": "15 km/h"
                    }
                },
                {
                    "day": "Sabato 9",
                    "weather": {
                        "humidity": "23 %",
                        "pressure": "1016 mbar",
                        "status": "Nuvoloso",
                        "temperature": "22 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "day": "Domenica 10",
                    "weather": {
                        "humidity": "39 %",
                        "pressure": "1012 mbar",
                        "status": "Cielo Coperto",
                        "temperature": "24 °C",
                        "wind": "18 km/h"
                    }
                },
                {
                    "day": "Lunedì 11",
                    "weather": {
                        "humidity": "40 %",
                        "pressure": "1004 mbar",
                        "status": "Pioggia",
                        "temperature": "22 °C",
                        "wind": "17 km/h"
                    }
                }
            ]
        };
    }

    else if (language == 'EN') {
        json = {
            "cityHeight": "714m",
            "cityName": "L'Aquila",
            "cityProvince": "(AQ)",
            "days": [
                {
                    "day": "Thursday 7",
                    "weather": {
                        "humidity": "38 %",
                        "pressure": "1022 mbar",
                        "status": "Sunny",
                        "temperature": "16 °C",
                        "wind": "15 km/h"
                    }
                },
                {
                    "day": "Friday 8",
                    "weather": {
                        "humidity": "30 %",
                        "pressure": "1021 mbar",
                        "status": "Sunny",
                        "temperature": "21 °C",
                        "wind": "15 km/h"
                    }
                },
                {
                    "day": "Saturday 9",
                    "weather": {
                        "humidity": "23 %",
                        "pressure": "1016 mbar",
                        "status": "Cloudy",
                        "temperature": "22 °C",
                        "wind": "12 km/h"
                    }
                },
                {
                    "day": "Sunday 10",
                    "weather": {
                        "humidity": "39 %",
                        "pressure": "1012 mbar",
                        "status": "Partly Cloudy",
                        "temperature": "24 °C",
                        "wind": "18 km/h"
                    }
                },
                {
                    "day": "Monday 11",
                    "weather": {
                        "humidity": "40 %",
                        "pressure": "1004 mbar",
                        "status": "Rain",
                        "temperature": "22 °C",
                        "wind": "17 km/h"
                    }
                }
            ]
        };
    }

    if (units == 'imperial') {
        json.cityHeight = '2342ft';
        json.days.forEach( (day) => {
            let tempCelsius = parseInt(day.weather.temperature.split(' ')[0]);
            let tempFahrenheit = Math.round(((tempCelsius * 9/5) + 32));
            day.weather.temperature = `${tempFahrenheit} °F`;

            let windMetric = parseInt(day.weather.wind.split(' ')[0]);
            let windImperial = Math.round(windMetric / 1.609);
            day.weather.wind = `${windImperial} mph`;
        });
    }

    response.statusCode = 200;
    setTimeout(function() {
        response.send(json);
    }, 1000);


});


// example: http://localhost:3000/mock/coords/city/torrebruna/ch/api-key=keyApp
router.get('/coords/city/:city/:prov/api-key=:key', function (request, response) {

    if (!utilities.checkAuth(request.params.key, response)) return;

    let json = {
        "lat": 42.3505500,
        "lon": 13.3995400
    };

    response.statusCode = 200;
    response.send(json);


});


// example: http://localhost:3000/mock/coords/getCity/42.3505500/13.3995400/api-key=keyApp
router.get('/coords/getCity/:lat/:lon/api-key=:key', function (request, response) {

    if (!utilities.checkAuth(request.params.key, response)) return;

    let json = {
        "city": "L'Aquila"
    };

    response.statusCode = 200;
    response.send(json);


});


// example: http://localhost:3000/mock/weather/current/L'Aquila/AQ/units=metric/api-key=keyApp
router.get('/weather/current/:city/:prov/:language/units=:units/api-key=:key', function (request, response) {

    if (!utilities.checkAuth(request.params.key, response)) return;

    let units = request.params.units;
    let language = request.params.language;

    let json = {};

    if (language == 'EN') {
        json = {
            "cityHeight": "714m",
            "cityName": "L'Aquila",
            "cityProvince": "(AQ)",
            "weather": {
                "currentHumidity": "82 %",
                "currentPressure": "1016 mbar",
                "currentStatus": "Cloudy",
                "currentTemperature": "12 °C",
                "currentWind": "16 km/h"
            }
        };
    }

    else if (language == 'IT') {
        json = {
            "cityHeight": "714m",
            "cityName": "L'Aquila",
            "cityProvince": "(AQ)",
            "weather": {
                "currentHumidity": "82 %",
                "currentPressure": "1016 mbar",
                "currentStatus": "Nuvoloso",
                "currentTemperature": "12 °C",
                "currentWind": "16 km/h"
            }
        };
    }

    if (units == 'imperial') {
        json.weather.currentTemperature = '54 °F';
        json.weather.currentWind = '10 mph';
        json.cityHeight = '2342ft';
    }

    response.statusCode = 200;
    response.send(json);


});

// example: http://localhost:3000/mock/weather/chart/L'Aquila/AQ/units=metric/api-key=keyApp
router.get('/weather/chart/:city/:prov/:language/units=:units/api-key=:key', function (request, response) {

    if (!utilities.checkAuth(request.params.key, response)) return;

    let units = request.params.units;
    let language = request.params.language;

    let json = {
        "cityName": "L'Aquila",
        "cityProvince": "(AQ)",
        "hours": [
            {
                "day": "07",
                "hour": "15:00",
                "status": "Soleggiato",
                "temperature": "16 °C"
            },
            {
                "day": "07",
                "hour": "16:00",
                "status": "Soleggiato",
                "temperature": "16 °C"
            },
            {
                "day": "07",
                "hour": "17:00",
                "status": "Soleggiato",
                "temperature": "16 °C"
            },
            {
                "day": "07",
                "hour": "18:00",
                "status": "Soleggiato",
                "temperature": "16 °C"
            },
            {
                "day": "07",
                "hour": "19:00",
                "status": "Soleggiato",
                "temperature": "15 °C"
            },
            {
                "day": "07",
                "hour": "20:00",
                "status": "Soleggiato",
                "temperature": "13 °C"
            },
            {
                "day": "07",
                "hour": "21:00",
                "status": "Sereno",
                "temperature": "11 °C"
            },
            {
                "day": "07",
                "hour": "22:00",
                "status": "Sereno",
                "temperature": "10 °C"
            },
            {
                "day": "07",
                "hour": "23:00",
                "status": "Sereno",
                "temperature": "9 °C"
            },
            {
                "day": "08",
                "hour": "00:00",
                "status": "Sereno",
                "temperature": "8 °C"
            },
            {
                "day": "08",
                "hour": "01:00",
                "status": "Sereno",
                "temperature": "7 °C"
            },
            {
                "day": "08",
                "hour": "02:00",
                "status": "Sereno",
                "temperature": "6 °C"
            },
            {
                "day": "08",
                "hour": "03:00",
                "status": "Sereno",
                "temperature": "6 °C"
            },
            {
                "day": "08",
                "hour": "04:00",
                "status": "Sereno",
                "temperature": "5 °C"
            },
            {
                "day": "08",
                "hour": "05:00",
                "status": "Soleggiato",
                "temperature": "5 °C"
            },
            {
                "day": "08",
                "hour": "06:00",
                "status": "Soleggiato",
                "temperature": "5 °C"
            },
            {
                "day": "08",
                "hour": "07:00",
                "status": "Soleggiato",
                "temperature": "6 °C"
            },
            {
                "day": "08",
                "hour": "08:00",
                "status": "Soleggiato",
                "temperature": "11 °C"
            },
            {
                "day": "08",
                "hour": "09:00",
                "status": "Soleggiato",
                "temperature": "14 °C"
            },
            {
                "day": "08",
                "hour": "10:00",
                "status": "Soleggiato",
                "temperature": "16 °C"
            },
            {
                "day": "08",
                "hour": "11:00",
                "status": "Soleggiato",
                "temperature": "18 °C"
            },
            {
                "day": "08",
                "hour": "12:00",
                "status": "Soleggiato",
                "temperature": "19 °C"
            },
            {
                "day": "08",
                "hour": "13:00",
                "status": "Soleggiato",
                "temperature": "20 °C"
            },
            {
                "day": "08",
                "hour": "14:00",
                "status": "Soleggiato",
                "temperature": "21 °C"
            },
            {
                "day": "08",
                "hour": "15:00",
                "status": "Soleggiato",
                "temperature": "21 °C"
            },
            {
                "day": "08",
                "hour": "16:00",
                "status": "Soleggiato",
                "temperature": "21 °C"
            }
        ]
    };


    if (units == 'imperial') {
        json.hours.forEach( (hour) => {
            let tempCelsius = parseInt(hour.temperature.split(' ')[0]);
            let tempFahrenheit = Math.round(((tempCelsius * 9/5) + 32));
            hour.temperature = `${tempFahrenheit} °F`;
        });
    }

    response.statusCode = 200;
    response.send(json);


});

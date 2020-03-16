//express to make rest API
var express = require('express');
var router = express.Router();

//import getCoords function
var getCoords = require('../request/getCoords');

/*********** export router to make callable from server.js **************/
module.exports = router;


// example: http://localhost:3000/mock/weather/today/city/torrebruna/ch
router.get('/weather/today/city/:city/:prov', function (request, response) {

    let json = {
        "cityHeight": "845m",
        "cityName": "Torrebruna",
        "cityProvince": "(CH)",
        "code": "200",
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

    response.send(json);


});



// example: http://localhost:3000/mock/weather/fivedays/city/torrebruna/ch
router.get('/weather/fivedays/city/:city/:prov', function (request, response) {

    let json = {
        "cityHeight": "845m",
        "cityName": "Torrebruna",
        "cityProvince": "(CH)",
        "code": "200",
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

    response.send(json);


});


// example: http://localhost:3000/mock/coords/city/torrebruna/ch
router.get('/coords/city/:city/:prov', function (request, response) {

    let json = {
        "lon": 14.54,
        "lat": 41.87
    };

    response.send(json);


});

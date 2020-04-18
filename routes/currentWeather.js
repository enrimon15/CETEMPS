var utilities = require('../utilities/common');

//express to make rest API
var express = require('express');
var router = express.Router();

/*********** export router to make callable from server.js **************/
module.exports = router;


//get mapping
//endpoint configuration
// example: http://localhost:3000/weather/current/torrebruna/ch/EN/units=imperial/api-key=keyApp
router.get('/:city/:prov/:language/units=:units/api-key=:key', function (request, response) {

    if (!utilities.checkAuth(request.params.key, response)) return;

    let param1 = request.params.city;
    let cty = param1.charAt(0).toUpperCase() + param1.substring(1); //normalize (cetemps need to read city with fist letter upper case)

    let param2 = request.params.prov;
    let prv = param2.toUpperCase();

    let language = request.params.language;
    let units = request.params.units;

    // url of cetemps
    let URL = utilities.buildURL(cty,prv);

    const Nightmare = require('nightmare');
    const nightmare = Nightmare({show: false}); //if show:true i can see the operation of the bot


    nightmare
        .goto(URL) //web site to visit
        .wait('tr') //what have to wait to start execution
        .evaluate(function (lang, units, conditionIT, conditionEN) { //execution --> I take the data I need through the HTML tags and classes

            const days = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];
            const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

            let res = {};
            let weather = {};

            //city name
            let city = document.querySelector('tr > td[align="center"][bgcolor="#0a51a1"][colspan="6"] > font[color="#FFFFFF"] > div[align="left"]');
            //check if city is valid
            if (city != null) {
                let strPlit = city.innerText.split(" ");
                res.cityName = strPlit[0]; //nome
                res.cityProvince = strPlit[1]; //provincia
                if (units == 'metric') { //height(m)
                    res.cityHeight = strPlit[2] + 'm';
                }
                else if (units == 'imperial') { //height(ft)
                    let heightImperial = Math.round(parseInt(strPlit[2]));
                    res.cityHeight = `${heightImperial * 3.281}ft`;
                }
            } else {
                throw 'city is not valid';
            }

            let currentDate = new Date();
            let currentHour = currentDate.getHours();
            let currentMonth = currentDate.getMonth();
            let currentDayOfWeek = currentDate.getDay();
            let currentDay = currentDate.getDate();

            //every row
            document.querySelectorAll('tr[bgcolor="#0a51a1"]').forEach(function (result) {
                //current row (day, hour)
                let row = result.children[0].innerText;
                let splitted = row.split(" ");
                let hourRow = splitted[1]; //ora
                let dayRow = splitted[3]; //giorno
                let dayNumRow = splitted[4]; //giorno numerico
                if (dayNumRow.charAt(0) == '0') {
                    dayNumRow = dayNumRow.substring(1);
                }
                let monthRow = splitted[5]; //mese

                //controlla giorno ed ora corrente
                if ((hourRow == currentHour) && (months[currentMonth] == monthRow) && (days[currentDayOfWeek] == dayRow) && (dayNumRow == currentDay)) {
                    let temp = result.children[1].innerText;
                    let wind = result.children[4].querySelector('b').innerText;
                    if (metric == 'C') {
                        weather.currentTemperature = temp;
                        weather.currentWind = wind;
                    }
                    else if (metric == 'F') {
                        let tempCelsius = parseInt(temp.split('')[0]);
                        let tempFahrenheit = Math.round(((tempCelsius * 9/5) + 32));
                        weather.currentTemperature = `${tempFahrenheit} °F`;

                        let windMetric = parseInt(wind.split(' ')[0]);
                        let windImperial = Math.round(windMetric / 1.609);
                        weather.currentWind = `${windImperial} mph`;
                    }

                    weather.currentPressure = result.children[2].innerText;
                    weather.currentHumidity = result.children[3].innerText;

                    let img = result.children[5].querySelector('img').src;
                    let imgSplit = img.split('icons/');

                    switch(lang) {
                        case 'IT':
                            weather.currentStatus = conditionIT[imgSplit[1]];
                            break;
                        case 'EN':
                            weather.currentStatus = conditionEN[imgSplit[1]];
                            break;
                        default:
                            weather.currentStatus = conditionIT[imgSplit[1]];
                    }

                    return;
                }
            });

            res.weather = weather;
            return res;
        }, language, units, utilities.status_it, utilities.status_en)
        .end() //end of execution
        .then(function (res) { //post execution
            response.statusCode = 200;
            response.send(res);
        })
        .catch(error => { //error handler
            console.error('Search failed:', error);
            response.statusCode = 404;
            response.send(utilities.buildError());
        });


});

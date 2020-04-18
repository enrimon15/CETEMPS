var utilities = require('../utilities/common');

//express --> to make rest API
var express = require('express');
var router = express.Router();

/*********** export router to make it callable from server.js **************/
module.exports = router;


// get mapping
// endpoint configuration
// example: http://localhost:3000/weather/today/torrebruna/ch/IT/units=imperial
router.get('/:city/:prov/:language/units=:units', function (request, response) {

    //normalize params (cetemps need to read city with fist letter capitalized and province to upper case)
    let param1 = request.params.city;
    let cty = param1.charAt(0).toUpperCase() + param1.substring(1);
    let param2 = request.params.prov;
    let prv = param2.toUpperCase();
    let language = request.params.language;
    let units = request.params.units;


    // url of cetemps
    let URL = utilities.buildURL(cty,prv);

    //nightmare declaration (web scraper)
    const Nightmare = require('nightmare');
    const nightmare = Nightmare({show: false}); //if show:true i can see the operation of the bot

    nightmare
        .goto(URL) //web site to visit
        .wait('tr') //what have to wait to start execution
        .evaluate(function(lang, units, conditionIT, conditionEN) { //execution --> I take the data I need through the HTML tags and classes

            let res = {}; //json result
            let daily = []; //array with every hours of day

            //city
            let city = document.querySelector('tr > td[align="center"][bgcolor="#0a51a1"][colspan="6"] > font[color="#FFFFFF"] > div[align="left"]'); //city name
            //check if the city is valid
            if (city != null) {
                let strPlit = city.innerText.split(" ");
                res.cityName = strPlit[0]; //name
                res.cityProvince = strPlit[1]; //prov
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
            let currentDay = currentDate.getDate();

            //every row
            document.querySelectorAll('tr[bgcolor="#0a51a1"]').forEach(function (result) {
                let hours = {};
                let weather = {};

                //current row (day, hour)
                let row = result.children[0].innerText;
                let splitted = row.split(" ");
                let dayRow = splitted[4]; //giorno numerico
                let hourRow = splitted[1]; //ora
                if (dayRow.charAt(0) == '0') {
                    dayRow = dayRow.substring(1);
                }

                //check for current day
                if ((dayRow == currentDay)) {
                    //building json
                    hours.hour = `${hourRow}:00`;

                    let temp = result.children[1].innerText;
                    let wind = result.children[4].querySelector('b').innerText;
                    if (units == 'metric') {
                        weather.temperature = temp;
                        weather.wind = wind;
                    }
                    else if (units == 'imperial') {
                        let tempCelsius = parseInt(temp.split('')[0]);
                        let tempFahrenheit = Math.round(((tempCelsius * 9/5) + 32));
                        weather.temperature = `${tempFahrenheit} °F`;

                        let windMetric = parseInt(wind.split(' ')[0]);
                        let windImperial = Math.round(windMetric / 1.609);
                        weather.wind = `${windImperial} mph`;
                    }

                    weather.pressure = result.children[2].innerText;
                    weather.humidity = result.children[3].innerText;

                    //convert gif of cetemps in string status
                    let img = result.children[5].querySelector('img').src;
                    let imgSplit = img.split('icons/');

                    switch(lang) {
                        case 'IT':
                            weather.status = conditionIT[imgSplit[1]]; //status_it.get(imgSplit[1]);
                            break;
                        case 'EN':
                            weather.status = conditionEN[imgSplit[1]]; //status_en.get(imgSplit[1]);
                            break;
                        default:
                            weather.status = conditionIT[imgSplit[1]]; //status_it.get(imgSplit[1]);
                    }

                    hours.weather = weather;

                    daily.push(hours);
                } else {
                    return;
                }
            });

            res.hours = daily;
            return res;
        }, language, units, utilities.status_it, utilities.status_en ) //input params
        .end() //end of execution
        .then(function (res) { //post execution
            console.log(res);
            response.statusCode = 200;
            response.send(res);
        })
        .catch(error => { //error handler
            console.error('Search failed:', error);
            response.statusCode = 404;
            response.send(utilities.buildError());
        });


});

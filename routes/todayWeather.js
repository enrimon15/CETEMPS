var utilities = require('../utilities/common');

//express --> to make rest API
var express = require('express');
var router = express.Router();

/*********** export router to make it callable from server.js **************/
module.exports = router;


// get mapping
// endpoint configuration
// example: http://localhost:3000/weather/today/torrebruna/ch/IT/units=imperial/api-key=keyApp
/**
 * @swagger
 * /weather/today/{city}/{prov}/{language}/units={units}/api-key={key}:
 *   get:
 *     tags:
 *       - Today Weather
 *     description: Returns Today Weather (Hourly)
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
 *       - name: language
 *         description: IT / EN
 *         in: path
 *         required: true
 *         type: string
 *       - name: units
 *         description: metric / imperial
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
router.get('/:city/:prov/:language/units=:units/api-key=:key', function (request, response) {
    if (!utilities.checkAuth(request.params.key, response)) return;
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
            console.log('city: ' + city);
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
                        let tempCelsius = parseInt(temp.split(' ')[0]);
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
            response.statusCode = 200;
            response.send(res);
        })
        .catch(error => { //error handler
            console.error('Search failed:', error);
            response.statusCode = 404;
            response.send(utilities.buildError());
        });


});







// example: http://localhost:3000/weather/today/chart/torrebruna/ch/IT/units=imperial/api-key=keyApp
/**
 * @swagger
 * /weather/today/chart/{city}/{prov}/{language}/units={units}/api-key={key}:
 *   get:
 *     tags:
 *       - Today Weather
 *     description: Returns Today Weather (Hourly) for charts
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
 *       - name: language
 *         description: IT / EN
 *         in: path
 *         required: true
 *         type: string
 *       - name: units
 *         description: metric / imperial
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
router.get('/chart/:city/:prov/:language/units=:units/api-key=:key', function (request, response) {

    if (!utilities.checkAuth(request.params.key, response)) return;

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
            if (city == null) {
                throw 'city is not valid';
            } else {
                let strPlit = city.innerText.split(" ");
                res.cityName = strPlit[0]; //name
                res.cityProvince = strPlit[1]; //prov
            }

            let currentDate = new Date();
            let currentDay = currentDate.getDate();
            let currentHour = currentDate.getHours();

            //every row
            document.querySelectorAll('tr[bgcolor="#0a51a1"]').forEach(function (result) {
                let hours = {};

                //current row (day, hour)
                let row = result.children[0].innerText;
                let splitted = row.split(" ");
                let dayRow = splitted[4]; //giorno numerico
                let hourRow = splitted[1]; //ora
                if (dayRow.charAt(0) == '0') {
                    dayRow = dayRow.substring(1);
                }
                let hourData = parseInt(splitted[1]);

                //check for current day
                if ((dayRow == currentDay && currentHour <= hourData) || (dayRow == currentDay + 1 && currentHour >= (hourData-1) )) {
                    //building json
                    hours.hour = `${hourRow}:00`;
                    hours.day = splitted[4];

                    let temp = result.children[1].innerText;
                    if (units == 'metric') {
                        hours.temperature = temp;
                    }
                    else if (units == 'imperial') {
                        let tempCelsius = parseInt(temp.split(' ')[0]);
                        let tempFahrenheit = Math.round(((tempCelsius * 9/5) + 32));
                        hours.temperature = `${tempFahrenheit} °F`;
                    }

                    //convert gif of cetemps in string status
                    let img = result.children[5].querySelector('img').src;
                    let imgSplit = img.split('icons/');

                    switch(lang) {
                        case 'IT':
                            hours.status = conditionIT[imgSplit[1]]; //status_it.get(imgSplit[1]);
                            break;
                        case 'EN':
                            hours.status = conditionEN[imgSplit[1]]; //status_en.get(imgSplit[1]);
                            break;
                        default:
                            hours.status = conditionIT[imgSplit[1]]; //status_it.get(imgSplit[1]);
                    }

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
            response.statusCode = 200;
            response.send(res);
        })
        .catch(error => { //error handler
            console.error('Search failed:', error);
            response.statusCode = 404;
            response.send(utilities.buildError());
        });


});


router.get('/test', function (request, response) {

    console.log('enter');

    //nightmare declaration (web scraper)
    const Nightmare = require('nightmare');
    const nightmare = Nightmare({show: false}); //if show:true i can see the operation of the bot

    console.log('before nightmare');

    nightmare
        .goto('https://www.linode.com/docs')
        .insert('.ais-SearchBox-input', 'ubuntu')
        .click('.ais-SearchBox-submit')
        .wait('.ais-Hits-list')
        .evaluate(function() {
            console.log('enter nightmare');
            let searchResults = [];

            const results =  document.querySelectorAll('a.c-search__result__link');
            results.forEach(function(result) {
                let row = {
                    'title':result.innerText,
                    'url':result.href
                }
                searchResults.push(row);
            });
            console.log('finish');
            return searchResults;
        })
        .end()
        .then(function(result) {
            console.log('finish nightmare');
            response.statusCode = 200;
            response.send(result);
        })
        .catch(function(e)  {
            console.error('Search failed:', e);
            response.statusCode = 404;
            response.send(utilities.buildError());
        });


});

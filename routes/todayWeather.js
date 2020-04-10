//express --> to make rest API
var express = require('express');
var router = express.Router();

/*********** export router to make it callable from server.js **************/
module.exports = router;


// get mapping
// endpoint configuration
// example: http://localhost:3000/weather/today/city/torrebruna/ch
router.get('/city/:city/:prov', function (request, response) {

    //normalize params (cetemps need to read city with fist letter capitalized and province to upper case)
    let param1 = request.params.city;
    let cty = param1.charAt(0).toUpperCase() + param1.substring(1);
    let param2 = request.params.prov;
    let prv = param2.toUpperCase();


    // url of cetemps
    let URL = "";
    prv !== 'NULL' //if province is not available
        ? URL = `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${cty}&Invia=Invia&psite=${prv}&.cgifields=site`
        : URL = `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${cty}&Invia=Invia&.cgifields=site`;

    //nightmare declaration (web scraper)
    const Nightmare = require('nightmare');
    const nightmare = Nightmare({show: false}); //if show:true i can see the operation of the bot


    nightmare
        .goto(URL) //web site to visit
        .wait('tr') //what have to wait to start execution
        .evaluate(function () { //execution --> I take the data I need through the HTML tags and classes

            //mapping of weather condition with the gifs in the cetemps website
            const status = new Map([['clear.gif', 'Sereno'], ['sunny.gif', 'Soleggiato'], ['cover.gif', 'Cielo Coperto'], ['ncover.gif', 'Cielo Coperto'], ['cloud.gif', 'Nuvoloso'], ['rain.gif', 'Pioggia'], ['snow.gif', 'Neve']]);

            var res = {}; //json result
            var daily = []; //array with every hours of day

            //city
            var city = document.querySelector('tr > td[align="center"][bgcolor="#0a51a1"][colspan="6"] > font[color="#FFFFFF"] > div[align="left"]'); //city name
            //check if the city is valid
            if (city != null) {
                var strPlit = city.innerText.split(" ");
                res.cityName = strPlit[0]; //name
                res.cityProvince = strPlit[1]; //prov
                res.cityHeight = strPlit[2] + 'm'; //height(m)
            } else {
                throw 'city is not valid';
            }

            var currentDate = new Date();
            var currentDay = currentDate.getDate();

            //every row
            document.querySelectorAll('tr[bgcolor="#0a51a1"]').forEach(function (result) {
                var hours = {};
                var weather = {};

                //every day of row
                var dd = result.children[0].innerText;

                var splitted = dd.split(" ");
                var dayNumIndex = splitted[4]; //numeric day
                var hourIndex = splitted[1]; //hour
                if (dayNumIndex.charAt(0) == '0') { //normalizing numeric day
                    dayNumIndex = dayNumIndex.substring(1);
                }

                //check for current day
                if ((dayNumIndex == currentDay)) {
                    //building json
                    hours.hour = `${hourIndex}:00`;
                    weather.temperature = result.children[1].innerText;
                    weather.pressure = result.children[2].innerText;
                    weather.humidity = result.children[3].innerText;
                    weather.wind = result.children[4].querySelector('b').innerText;
                    //convert gif of cetemps in string status
                    let img = result.children[5].querySelector('img').src;
                    let imgSplit = img.split('icons/');
                    weather.status = status.get(imgSplit[1]);

                    hours.weather = weather;

                    daily.push(hours);
                } else {
                    return;
                }
            });

            res.hours = daily;
            return res;
        })
        .end() //end of execution
        .then(function (res) { //post execution
            console.log(res);
            response.statusCode = 200;
            response.send(res);
        })
        .catch(error => { //error handler
            var err = {};
            err.statusCode = 404;
            err.status = 'ERROR';
            err.message = 'Execution Error';
            console.log('err', err);
            console.error('Search failed:', error);
            response.send(err);
        });


});

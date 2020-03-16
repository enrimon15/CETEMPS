//express to make rest API
var express = require('express');
var router = express.Router();

//import getCoords function
var getCoords = require('../request/getCoords');

/*********** export router to make callable from server.js **************/
module.exports = router;


//get mapping
//endpoint configuration
// example: http://localhost:3000/weather/current/city/torrebruna/ch
router.get('/city/:city/:prov', function (request, response) {

    let param1 = request.params.city;
    let cty = param1.charAt(0).toUpperCase() + param1.substring(1); //normalize (cetemps need to read city with fist letter upper case)

    let param2 = request.params.prov;
    let prv = param2.toUpperCase();

    const URL = `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${cty}&Invia=Invia&psite=${prv}&.cgifields=site`;

    const Nightmare = require('nightmare');
    const nightmare = Nightmare({show: false}); //if show:true i can see the operation of the bot


    nightmare
        .goto(URL) //web site to visit
        .wait('tr') //what have to wait to start execution
        .evaluate(function () { //execution --> I take the data I need through the HTML tags and classes


            const days = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];
            const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            const status = new Map([['clear.gif', 'Sereno'], ['sunny.gif', 'Soleggiato'], ['cover.gif', 'Cielo Coperto'], ['ncover.gif', 'Cielo Coperto'], ['cloud.gif', 'Nuvoloso'], ['rain.gif', 'Pioggia'], ['snow.gif', 'Neve']]);



            var res = {};
            var weather = {};

            //città
            var city = document.querySelector('tr > td[align="center"][bgcolor="#0a51a1"][colspan="6"] > font[color="#FFFFFF"] > div[align="left"]'); //city name
            //controlla se la città è valida
            if (city != null) {
                var strPlit = city.innerText.split(" ");
                res.cityName = strPlit[0]; //nome
                res.cityProvince = strPlit[1]; //provincia
                res.cityHeight = strPlit[2] + 'm'; //altezza(m)
                res.code = '200';
            } else {
                throw 'city is not valid';
            }

            var currentDate = new Date();
            var currentHour = currentDate.getHours();
            var currentMonth = currentDate.getMonth();
            var currentDayOfWeek = currentDate.getDay();
            var currentDay = currentDate.getDate();

            //ogni riga
            document.querySelectorAll('tr[bgcolor="#0a51a1"]').forEach(function (result) {
                //ogni giorno della riga
                var dd = result.children[0].innerText;
                console.log(dd);

                var splitted = dd.split(" ");
                var hourIndex = splitted[1]; //ora
                var dayIndex = splitted[3]; //giorno
                var dayNumIndex = splitted[4]; //giorno numerico
                if (dayNumIndex.charAt(0) == '0') {
                    dayNumIndex = dayNumIndex.substring(1);
                }
                var monthIndex = splitted[5]; //mese

                //controlla giorno ed ora corrente
                if ((hourIndex == currentHour) && (months[currentMonth] == monthIndex) && (days[currentDayOfWeek] == dayIndex) && (dayNumIndex == currentDay)) {
                    weather.currentTemperature = result.children[1].innerText;
                    weather.currentPressure = result.children[2].innerText;
                    weather.currentHumidity = result.children[3].innerText;
                    weather.currentWind = result.children[4].querySelector('b').innerText;

                    let img = result.children[5].querySelector('img').src;
                    let imgSplit = img.split('icons/');

                    weather.currentStatus = status.get(imgSplit[1]);

                    return;
                }
            });

            res.weather = weather;
            return res;
        })
        .end() //end of execution
        .then(function (res) { //post execution

            getCoords('Torrebruna', 'ch', function(results) {
                res.coords = results;
                console.log(res);
                response.send(res);
            });

        })
        .catch(error => { //error handler
            var err = {};
            err.code = '404';
            err.status = 'ERROR';
            err.message = 'Execution Error';
            console.log('err', err);
            console.error('Search failed:', error);
            response.send(err);
        });


});

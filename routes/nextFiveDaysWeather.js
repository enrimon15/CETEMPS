//express --> to make rest API
var express = require('express');
var router = express.Router();

/*********** export router to make it callable from server.js **************/
module.exports = router;


// get mapping
// endpoint configuration
// example: http://localhost:3000/weather/fivedays/city/torrebruna/ch
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
        .evaluate( async function () { //execution --> I take the data I need through the HTML tags and classes

            var res = {};
            var days = [];

            //città
            var city = document.querySelector('tr > td[align="center"][bgcolor="#0a51a1"][colspan="6"] > font[color="#FFFFFF"] > div[align="left"]'); //city name
            //controlla se la città è valida
            if (city != null) {
                var strPlit = city.innerText.split(" ");
                res.cityName = strPlit[0]; //name
                res.cityProvince = strPlit[1]; //prov
                res.cityHeight = strPlit[2] + 'm'; //height(m)
            } else {
                throw 'city is not valid';
            }

            let currentDate = new Date();
            let currentDay = currentDate.getDate();


            async function getDays(dayOfWeek, dayNum, result) {
                const dayOfW = new Map([['Domenica', 'Domenica'], ['Lunedi', 'Lunedì'], ['Martedi', 'Martedì'], ['Mercoledi', 'Mercoledì'], ['Giovedi', 'Giovedì'], ['Venerdi', 'Venerdì'], ['Sabato', 'Sabato']]);
                const status = new Map([['clear.gif', 'Sereno'], ['sunny.gif', 'Soleggiato'], ['cover.gif', 'Cielo Coperto'], ['ncover.gif', 'Cielo Coperto'], ['cloud.gif', 'Nuvoloso'], ['rain.gif', 'Pioggia'], ['snow.gif', 'Neve']]);

                let day = {};
                let weather = {};

                day.day = `${dayOfW.get(dayOfWeek)} ${dayNum}`;

                weather.temperature = result.children[1].innerText;
                weather.pressure = result.children[2].innerText;
                weather.humidity = result.children[3].innerText;
                weather.wind = result.children[4].querySelector('b').innerText;

                let img = result.children[5].querySelector('img').src;
                let imgSplit = img.split('icons/');
                weather.status = status.get(imgSplit[1]);

                day.weather = weather;

                return day;
            }


            //ogni riga
            document.querySelectorAll('tr[bgcolor="#0a51a1"]').forEach(function (result) {

                var day = {};
                var weather = {};

                //ogni giorno della riga
                var dd = result.children[0].innerText;

                var splitted = dd.split(" ");
                var dayNumIndex = splitted[4]; //giorno numerico
                var hourIndex = splitted[1]; //ora
                var dayWeekIndex = splitted[3]; //giorno settimana
                if (dayNumIndex.charAt(0) == '0') {
                    dayNumIndex = dayNumIndex.substring(1);
                }

                //controlla prossimi 5 giorni
                if ((dayNumIndex == (currentDay + 1)) && (hourIndex == 14)) {
                    getDays(dayWeekIndex, dayNumIndex, result).then(
                        val => days.push(val)
                    );
                }

                else if ((dayNumIndex == (currentDay + 2)) && (hourIndex == 14)) {
                    getDays(dayWeekIndex, dayNumIndex, result).then(
                        val => days.push(val)
                    );
                }

                else if ((dayNumIndex == (currentDay + 3)) && (hourIndex == 14)) {
                    getDays(dayWeekIndex, dayNumIndex, result).then(
                        val => days.push(val)
                    );
                }

                else if ((dayNumIndex == (currentDay + 4)) && (hourIndex == 14)) {
                    getDays(dayWeekIndex, dayNumIndex, result).then(
                        val => days.push(val)
                    );
                }

                else if ((dayNumIndex == (currentDay + 5)) && (hourIndex == 14)) {
                    getDays(dayWeekIndex, dayNumIndex, result).then(
                        val => days.push(val)
                    );
                }

                else if (dayNumIndex > (currentDay + 5)) {
                    return;
                }
            });

            res.days = days;
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

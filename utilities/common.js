//build url of cetemps, if province is 'NULL' it isn't passed as param
let buildURL = function(city, province) {
    return province !== 'NULL' //if province is not available
        ? `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${city}&Invia=Invia&psite=${province}&.cgifields=site`
        : `http://meteorema.aquila.infn.it/cgi-bin/meteo/comuni/cetemps.html/response?site=${city}&Invia=Invia&.cgifields=site`;
};

//build error response
let buildError = function() {
    var err = {};
    err.status = 'ERROR';
    err.message = 'Execution Error';
    return err;
};

//mapping weather condition with the gifs in the cetemps website (IT)
let status_it = {
    'clear.gif': 'Sereno',
    'sunny.gif': 'Soleggiato',
    'cover.gif': 'Cielo Coperto',
    'ncover.gif': 'Cielo Coperto',
    'cloud.gif': 'Nuvoloso',
    'rain.gif': 'Pioggia',
    'snow.gif': 'Neve'
};

//mapping weather condition with the gifs in the cetemps website (EN)
let status_en = {
    'clear.gif': 'Clear',
    'sunny.gif': 'Sunny',
    'cover.gif': 'Partly Cloudy',
    'ncover.gif': 'Partly Cloudy',
    'cloud.gif': 'Cloudy',
    'rain.gif': 'Rain',
    'snow.gif': 'Snow'
};

//mapping days of week with the days given from cetemps website (IT)
let dayOfW_it = {
    'Domenica': 'Domenica',
    'Lunedi': 'Lunedì',
    'Martedi': 'Martedì',
    'Mercoledi': 'Mercoledì',
    'Giovedi': 'Giovedì',
    'Venerdi': 'Venerdì',
    'Sabato': 'Sabato'
};

//mapping days of week with the days given from cetemps website (EN)
let dayOfW_en = {
    'Domenica': 'Sunday',
    'Lunedi': 'Monday',
    'Martedi': 'Tuesday',
    'Mercoledi': 'Wednesday',
    'Giovedi': 'Thursday',
    'Venerdi': 'Friday',
    'Sabato': 'Saturday'
};


module.exports.buildError = buildError;
module.exports.buildURL = buildURL;
module.exports.status_it = status_it;
module.exports.status_en = status_en;
module.exports.dayOfW_it = dayOfW_it;
module.exports.dayOfW_en = dayOfW_en;



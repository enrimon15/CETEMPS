//npm install express --save

//express to make rest API
var express = require('express');
var app = express();

//creating the route for current weather file
var currentWeather = require('./routes/currentWeather');
app.use('/weather/current', currentWeather);

//creating the route for today weather file
var todayWeather = require('./routes/todayWeather');
app.use('/weather/today', todayWeather);

//creating the route for next five days weather file
var nextFiveWeather = require('./routes/nextFiveDaysWeather');
app.use('/weather/fivedays', nextFiveWeather);

//creating the route for city coords file
var cityCoords = require('./routes/cityCoords');
app.use('/coords', cityCoords);



//creating the route for mock api
var mock = require('./Mock/apiMock');
app.use('/mock', mock);

//server configuration
var server = app.listen(3000, function () {
    //var host = server.address().address;
    var port = server.address().port;
    console.log("Tracking app listening at http://localhost/%s", port);
});

//npm install express --save

//express to make rest API
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "CETEMPS Weather API",
            description: "REST API from http://cetemps.aquila.infn.it",
        }
    },
    apis: ['./routes/*.js', './Mock/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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


require('dotenv').config();

const port = process.env.PORT || 3000;


// serve files from the public directory
app.use(express.static('public'));

app.get('/', function(req, res, next) {
    //res.status(200).send("CETEMPS APP Server works!")
    res.status(200).send(__dirname + '/index.html');
});

//server configuration
var server = app.listen(port, function () {
    let port = server.address().port;
    console.log("Tracking app listening at PORT: %s", port);
});

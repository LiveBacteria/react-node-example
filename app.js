const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require("dotEnv");

const request = require("request");
const apiKey = "bf78abe9c9168e7c660219b8083bdbe4";

const path = require("path");
const viewsFolder = path.join(__dirname, "src", "views");

app.set("views", viewsFolder);
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
});

app.get('/public/css/style.css', (req, res) => {
    //console.log(path);
   res.sendFile(path.join(__dirname, "/public/css/", "style.css"));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

app.get("/next", (req, res) => {
    res.send("<a href='/'>Hey you!</a>");
});

app.post('/getWeather', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
})

app.get('/getWeather', (req, res) => {
   res.redirect('/');
});
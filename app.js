const express = require('express');
const https = require('https');
const bodyParser = require("body-parser")

const app = express();

// This line is for the prasing through the body of the post request 
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/',function(req,res)
{
    const query = req.body.cityName;
    const apikey = "476b240e0c71b3cf571983820ddf3886";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units+"";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>The temperature in "+ query +" is "+ temp + (" Degree celcius</h1>"));
            res.write("<h1>Weather discription : "+ weatherDiscription + " </h1>");
            res.write("<img src="+imageURL+" >");
            res.send();
        });
    });

})


app.listen(3000, function () {
    console.log('Server has started');
});


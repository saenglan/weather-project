const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {

  //url is too long so make a const.
  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=2d2dadb9aad8c64624242861cb3f681e&units=imperial"
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<p>The weather is currently " + desc + "</p>");
      res.write("<h1>The temperature in London is " + temp + " degrees F.</h1>");
      res.write("<img src = " + imageURL + ">");
      res.send();
      console.log(temp);
      console.log(desc);
    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded());

const port = 3000;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const query = req.body.cityName; //get city name from html
  const apiKey = "30022a6d449be09e3db2fb20c40d343c";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
  
  https.get(url, (response) => {    //https method to use API
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data); //parse JSON
      const temp = weatherData.main.temp;
      const weatherDesp = weatherData.weather[0].description;
      const timezone = weatherData.timezone;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>The Temperature in " +req.body.cityName+ " is: " + temp + " degree celcius </h1>"
      );
      res.write("<h2> The Weather Description is: " + weatherDesp + "</h2>");
      res.write("<h2> The Timezone is: " + timezone + "</h2>");
      res.write("<img src=" + imageUrl + ">");

      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

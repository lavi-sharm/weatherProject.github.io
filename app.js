const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){

   res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req, res){

    const apiKey = "c4e5fc79fea125adae010687be7ab84f";
    const query = req.body.cityName;
    const unit = "metric";

   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
   https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      

    const weatherData = JSON.parse(data);

    const temp1 = weatherData.main.temp;
    const temp2 = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
    console.log(temp1);
    console.log(temp2);

 
    res.write("<h1>the temperature of "+query+" is "+temp1+" degree celsius...</h1>");
    res.write("<h3>and the currently weather is "+temp2+"</h3>");
    res.write("<img src="+imageURL+">");     

    res.send();
    });
  });
});



app.listen(3000, function(){
    console.log("server is running on port 3000..");   
});




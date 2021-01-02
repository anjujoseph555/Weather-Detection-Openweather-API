const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const city=req.body.cityname;
  const url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=cff0819be4decd6049138009e8e54477&units=metric';
  https.get(url,function(response){
  response.on("data",function(data){
    const weatherdata=JSON.parse(data);
    const temp=weatherdata.main.temp;
    const weatherdescription=weatherdata.weather[0].description;
    const icon=weatherdata.weather[0].icon;
    const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<p>The weather is currently "+weatherdescription+"</p>");
    res.write("<h1>The weather in "+city+" is "+temp+" degree celcius </h1>");
    res.write("<img src="+imageURL+">");
    res.send();
  });
  });

});

app.listen(3000,function(){
console.log("server set up and running on port 3000");
});

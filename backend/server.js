var express = require("express"); //webserver wrapper
var app = express();
var mongoose = require("mongoose"); //manage mongodb

var morgan = require("morgan");
var bodyParser = require("body-parser"); //parse the body of requests

var configDB = require("./config/database.js");

mongoose.connect(configDB.url, {useMongoClient: true}); //connect to database using module exports

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/", express.static(__dirname+"/dist"));
//set up express
app.use(morgan("dev")); //log requests to the console
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// routes ======================================================================
require('./app/routes/noteRoutes.js')(app); // load our routes and pass in our app
//require('./app/routes/reminderRoutes.js')(app); // load our routes and pass in our app


var port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port " + port);

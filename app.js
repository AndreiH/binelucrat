var Express = require('express');
var Mongoose = require('mongoose');
var path = require('path');
var bodyParser = require("body-parser");
var port = 3000;

Mongoose.connect('mongodb://localhost/users');

var app = Express();

app.use(Express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var models = ["Email", "User"];

// initialize models
models.forEach(function(model) {
  require("./models/" + model + "Model")(Mongoose);
  require("./routes/" + model + "Router")(app, Mongoose);
});
require("./routes/LoginRouter")(app, Mongoose);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs'); 

// var User = Mongoose.models.User;
// var UserManager = require("./managers/UserManager")(Mongoose);

// app.get('/editedUsers', function(req, res) {
//  User.find(function(error, result) {
//     for (var i = 0; i < result.length; i++) {
//       result[i].username = UserManager.myFancyFunction(result[i].username);
//     }
//     res.status(200).json(result);
//   });
// });

app.listen(port);
console.log('Listening on port', port);
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');

// var angular = require('angular');

mongoose.connect('mongodb://localhost/users');
// mongoose.connect('mongodb://aurel:logica00@linus.mongohq.com:10079/app30642759/users');

var app = express(); 

app.use(passport.initialize());
app.use(passport.session());

var config = require('./config')();


var Schema = mongoose.Schema;
var User = new Schema({
      username: String,
      password: String
    }, {
      collection: 'users'
    });
var users = mongoose.model('userInfo', User);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs'); 

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);


// passport login
app.get('/login', function(req, res) {
  res.render('login'); 
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);
 
app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
app.get('/loginSuccess', function(req, res, next) {
   res.render('index', { username: global.username, title: 'binelucrat' });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    
    global.username = username;

    users.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }
 
      if (!user) {
        return done(null, false);
      }
 
      if (user.password != password) {
        return done(null, false);
      }
 
      return done(null, user);
    });
  });
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

    // mongoose.connect();
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//angular
// http://www.mircozeiss.com/shake-that-login-form-with-angularjs/

// angular.module('app', ['ngAnimate'])

// .controller('FormCtrl', ['$scope', function($scope) {
//   // hide error messages until 'submit' event
//   $scope.submitted = false;
//   // hide success message
//   $scope.showMessage = false;
//   // method called from shakeThat directive
//   $scope.submit = function() {
//     // show success message
//     $scope.showMessage = true;
//   };
// }])

// .directive('shakeThat', ['$animate', function($animate) {

//   return {
//     require: '^form',
//     scope: {
//       submit: '&',
//       submitted: '='
//     },
//     link: function(scope, element, attrs, form) {
//       // listen on submit event
//       element.on('submit', function() {
//         // tell angular to update scope
//         scope.$apply(function() {
//           // everything ok -> call submit fn from controller
//           if (form.$valid) return scope.submit();
//           // show error messages on submit
//           scope.submitted = true;
//           // shake that form
//           $animate.addClass(element, 'shake', function() {
//             $animate.removeClass(element, 'shake');
//           });
//         });
//       });
//     }
//   };

// }]);



module.exports = app;




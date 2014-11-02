var LoginRouter = function(app, Mongoose) {
	var User = Mongoose.models.User;
	var users = User.find(function(error, result) {});

	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	app.use(passport.initialize());
	app.use(passport.session());

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
};

module.exports = LoginRouter;
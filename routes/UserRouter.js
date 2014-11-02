var UserRouter = function(app, Mongoose) {
	var User = Mongoose.models.User;

	app.get('/users', function(req, res) {
		User.find(function(error, result) {
			res.status(200).json(result);
		});
	});

	app.get('/user:id', function(req, res) {
		User.findOne({_id: req.params.id}, function(error, result) {
			res.status(200).json(result);
		});
	});

	// app.post('/login', function(req, res) {
	//   console.log(req.body.username, req.body.password);

	// });
};

module.exports = UserRouter;
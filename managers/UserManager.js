var UserManager = function(Mongoose) {
	var User = Mongoose.models.User;

	this.myFancyFunction = function(username) {
		return username + "..............";
	};

	return this;
};

//aici sa fac fac o funtie care sa imi adauge mmmm la username



module.exports = UserManager;
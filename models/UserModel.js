var UserModel = function(Mongoose) {
	var schema = Mongoose.Schema({
		username: String,
		password: String
	});

	var User = Mongoose.model('User', schema);

	return User;
};

module.exports = UserModel;
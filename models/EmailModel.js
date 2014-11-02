var EmailModel = function(Mongoose) {
	var schema = Mongoose.Schema({
		title: String,
		message: String,
		sender: String,
		receiver: String
	});

	var Email = Mongoose.model('Email', schema);

	return Email;
};

module.exports = EmailModel;
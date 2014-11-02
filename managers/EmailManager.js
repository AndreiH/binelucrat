var EmailManager = function(Mongoose) {
	var Email = Mongoose.models.Email;

	this.createEmail = function(title, message, sender, receiver, callback) {
		var email = new Email({
			title: title,
			message: message,
			sender: sender,
			receiver: receiver
		});

		email.save(callback);
	};

	this.getAll = function(callback) {
		Email.find(callback);
	};

	return this;
};

module.exports = EmailManager;
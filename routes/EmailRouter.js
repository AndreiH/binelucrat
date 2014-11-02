var EmailRouter = function(app, Mongoose) {
	var EmailManager = require('../managers/EmailManager')(Mongoose);

	app.get('/email/create', function(req, res) {
		EmailManager.createEmail('Title', 'Message', 'Aurel', 'Nico', function(error, result) {
			res.status(200).json(result);
		});
	});

	app.get('/emails', function(req, res) {
		EmailManager.getAll(function(error, result) {
			res.status(200).json(result);
		});
	});
};

module.exports = EmailRouter;
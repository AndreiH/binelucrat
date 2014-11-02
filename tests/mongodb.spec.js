// var MongoClient = require('mongoose').MongoClient;
// MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db) {
//     if(err) {
//         console.log('Sorry, there is no mongo db server running.');
//     } else {
//         var attachDB = function(req, res, next) {
//             req.db = db;
//             next();
//         };
//         http.createServer(app).listen(config.port, function(){
//             console.log('Express server listening on port ' + config.port);
//         });
//     }
// });
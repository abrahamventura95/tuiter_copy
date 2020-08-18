var user_queries = require('../DB/Connections/user');

exports.findRegisteredUsername = function(email, callback){
	user_queries.existsUsername(email,function(err,data){
		callback(data[0].value);
	});
}

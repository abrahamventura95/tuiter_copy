var DBHelper = require('../helper');

exports.create = function(obj, callback) {
	if(obj.ref == undefined || obj.type == undefined){
		var sqlQuery = "INSERT INTO tuit (idUser, message)		\
							VALUES ('" + obj.idUser		+ "',	\
									'" + obj.message 	+ "')";
		DBHelper.doQuery(sqlQuery, function(err, data) {
			callback(err, data);
		});
	}else{
		var sqlQuery = "INSERT INTO tuit (idUser, message, ref, type)	\
							VALUES ('" + obj.idUser		+ "',			\
									'" + obj.message	+ "',			\
									'" + obj.ref		+ "',			\
									'" + obj.type 		+ "')";
		DBHelper.doQuery(sqlQuery, function(err, data) {
			callback(err, data);
		});
	}
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM `tuit`   		\
					WHERE `id`='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

exports.timeline = function (id, callback){
	var sqlQuery = "SELECT tuit.id, tuit.message, tuit.ref, tuit.type, 	\
						   user.username, user.email					\
					FROM user, tuit, follower							\
					WHERE user.id = tuit.idUser 	AND					\
						  user.id = follower.idRef	AND					\
						  follower.idUser ='" + id +"'					\
					ORDER BY tuit.created_at DESC";	
	DBHelper.doQuery(sqlQuery, function(err, data){
		console.log(err);
		callback(err, data);
	});				
}

exports.timelineLike = function (id, callback){
	var sqlQuery = "SELECT tuit.id, tuit.message, tuit.ref, tuit.type, 	\
						   user.username, user.email, 					\
						   COUNT(`like`.id) as likes					\
					FROM user, tuit, follower, `like` 					\
					WHERE user.id = tuit.idUser 	AND					\
						  user.id = follower.idRef	AND					\
						  tuit.id = `like`.idTuit	AND					\
						  follower.idUser ='" + id +"'					\
					GROUP BY tuit.id, tuit.message, tuit.ref, 			\
							 tuit.type, user.username, user.email	  	\
					ORDER BY likes ,tuit.created_at DESC";	
	DBHelper.doQuery(sqlQuery, function(err, data){
		console.log(err);
		callback(err, data);
	});				
}
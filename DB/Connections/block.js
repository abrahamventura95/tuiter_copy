var DBHelper = require('../helper');

exports.create = function(obj, callback) {
	var sqlQuery = "INSERT INTO `block` (iduser, idref)		\
						VALUES ('" + obj.idUser		+ "',	\
								'" + obj.idMe 		+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.delete = function (obj, callback){
	var sqlQuery = "DELETE FROM `block`   					\
					WHERE `id`='" + obj.id + "' AND			\
						  `idref`='" + obj.idMe + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

exports.get = function (id, callback){
	var sqlQuery = "SELECT block.id, user.username, user.email		\
					FROM user, block								\
					WHERE user.id = block.idUser 	AND				\
						  block.idRef ='" + id +"'					\
					ORDER BY block.created_at DESC";	
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});				
}
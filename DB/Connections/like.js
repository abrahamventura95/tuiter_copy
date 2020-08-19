var DBHelper = require('../helper');

exports.create = function(obj, callback) {
	var sqlQuery = "INSERT INTO `like` (iduser, idtuit)		\
						VALUES ('" + obj.idUser		+ "',	\
								'" + obj.idTuit 	+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.delete = function (obj, callback){
	var sqlQuery = "DELETE FROM `like`   					\
					WHERE `id`='" + obj.id + "' AND			\
						  `idUser`='" + obj.idUser + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

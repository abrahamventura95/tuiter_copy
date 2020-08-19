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

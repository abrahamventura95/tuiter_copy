var DBHelper = require('../helper');

exports.create = function(obj, callback) {
	var status = (obj.block == "TRUE");
	var sqlQuery = "INSERT INTO `follower` (iduser, idref, status)		\
						VALUES ('" + obj.idUser		+ "',				\
								'" + obj.idMe 		+ "',				\
								 " + status			+ ")";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.delete = function (obj, callback){
	var sqlQuery = "DELETE FROM `follower`   				\
					WHERE `id` 	  ='" + obj.id   + "' AND	\
						  `idref` ='" + obj.idMe + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

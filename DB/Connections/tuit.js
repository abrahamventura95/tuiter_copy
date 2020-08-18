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

require('dotenv').config();
var jwt 		= require('jsonwebtoken');
var DBHelper 	= require('../helper');
var bcrypt 		= require('bcrypt');


exports.login = function (obj, callback) {
	var sqlQuery = "SELECT id, email, password, username, 		\
						   privacity							\
					FROM user									\
					WHERE `user`.`email` = '" + obj.email + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		if(data.length == 0){
			message = {
	          "code": process.env.BAD_REQUEST,
	          "msg":  "Unregistered email"
	        };
		}else{
	        var x = obj.password;
	        var y = data[0].password;
			if (!bcrypt.compareSync(x, y)) {
				message ={
					"code": process.env.BAD_REQUEST,
					"msg": 	"Wrong password"
				};
			}else{
				let payload = {
						sub: 	data[0].id,
						email: 	data[0].email
					};
				let token = jwt.sign(payload, process.env.secretOrKey);
				message = { 
		    		"code": 		process.env.OK,
		      		"msg": 			"login sucessfull",
		      		"token": 		token,
		      		"username": 	data[0].username,
		      		"email": 		data[0].email,
		      		"privacity": 	data[0].privacity
		    	};	
			}
		}
	  callback(err, message);
	});
};

exports.getUsers = function(callback) {
	var sqlQuery = "SELECT id, email, username,	privacity		\
					FROM user									\
					Order by email";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.get = function(id, callback) {
	var sqlQuery = "SELECT email, username, privacity	\
					FROM user							\
					WHERE id = '" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.existsUsername = function(username, callback) {
	var sqlQuery = "SELECT COUNT(username) as value			\
					FROM user								\
					WHERE username = '" + username + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
  	var sqlQuery = "INSERT INTO user (username, email, password)		\
							VALUES ('" + obj.username		+ "',		\
									'" + obj.email			+ "',		\
									'" + obj.password 		+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};


exports.edit = function(obj, callback) {
	var bool = (obj.privacity == "TRUE");

	if(obj.password == null){
		var sqlQuery = 
				"UPDATE `user` SET  								\
				 	    `user`.`privacity` 	=" + bool		+ "		\
				WHERE `user`.`id`			='" + obj.id 	+ "'";
		DBHelper.doQuery(sqlQuery, function(err, data) {
			callback(err,data);
		});
	}else{
	  	var sqlQuery = 
	  			"UPDATE `user` SET  									\
				 	    `user`.`privacity` 	="  + bool			+ ",	\
					    `user`.`password` 	='" + obj.password	+ "'	\
				WHERE `user`.`id`			='" + obj.id 		+ "'";
		DBHelper.doQuery(sqlQuery, function(err, data) {
			callback(err, data);
		});
	}
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM `user`   		\
					WHERE `id`='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};

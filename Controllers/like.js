var validator	= require('validator');
var functions	= require('./functions');
var queries		= require('../DB/Connections/like');

exports.create = function(req, res) {
	var like = {
		idUser: 	req.user.sub,
		idTuit: 	req.body.idTuit
	};				
	queries.create(like, function(err, data){
		res.json(data);
	});
};

exports.delete = function(req, res){
	var like = {
		idUser: 	req.user.sub,
		id: req.param('id')
	}
	queries.delete(like, function(err, data){
		res.json(data);
	});
}

exports.get = function(req, res){
	queries.get(req.param('id'), function(err, data){
		res.json(data);
	});
}
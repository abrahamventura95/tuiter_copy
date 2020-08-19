var validator	= require('validator');
var functions	= require('./functions');
var queries		= require('../DB/Connections/follow');

exports.create = function(req, res) {
	var block = {
		idMe: 		req.user.sub,
		idUser: 	req.body.idUser,
		status: 	req.body.status
	};				
	queries.create(block, function(err, data){
		res.json(data);
	});
};

exports.delete = function(req, res){
	var block = {
		idMe: 	req.user.sub,
		id: 	req.param('id')
	}
	queries.delete(block, function(err, data){
		res.json(data);
	});
}

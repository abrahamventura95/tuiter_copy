var validator	= require('validator');
var functions	= require('./functions');
var queries		= require('../DB/Connections/tuit');

function validate(body, callback) {
	//Empty validation
	if(validator.isEmpty(body.message)){
		callback('Message is required');	
	}else{
		if(body.type != undefined){
			if(!validator.isIn(body.type, ['rt',
										  'quote',
										  'reply'])){
					callback('Type out of range');
			}else{
				callback('pass');
			}
		}else{
			callback('pass');
		}
	}
};

exports.create = function(req, res) {
	validate(req.body, function(value){
		try{
			if (value == 'pass') {
				var tuit = {
					idUser: 	req.user.sub,
					message: 	req.body.message,
				    ref:  		req.body.ref,
					type:  		req.body.type
				};				
				queries.create(tuit, function(err, data){
					res.json(data);
				});
			}
			else 
				throw Error(value);
		}catch(err){
			obj = {
				error: 	process.env.BAD_REQUEST,
				msg: 	err.message
			};
			res.json(obj);
		}
	});
};

exports.delete = function(req, res){
	queries.delete(req.param('id'), function(err, data){
		res.json(data);
	});
}

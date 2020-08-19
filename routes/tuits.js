var auth 		= require('../Middleware/auth');
var like 	   	= require('../Controllers/like');
var controller 	= require('../Controllers/tuit');

module.exports = function(app) {	
	app.route('/tuit')
	  	.post(auth.check, controller.create)
		.delete(auth.check, controller.delete);
	app.route('/tuit/like')
		.post(auth.check, like.create)
		.delete(auth.check, like.delete);
};

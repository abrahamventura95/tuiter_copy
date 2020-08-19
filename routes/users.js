var auth 		= require('../Middleware/auth');
var controller 	= require('../Controllers/user');
var block 		= require('../Controllers/block');
var follow 		= require('../Controllers/follow');

module.exports = function(app) {	
	app.route('/user')
	  	.get(auth.check, controller.get)
		.put(auth.check, controller.edit)
		.delete(auth.check, controller.delete);
	app.route('/user/block')
		.get(auth.check, block.get)
		.post(auth.check, block.create)
		.delete(auth.check, block.delete);
	app.route('/user/follow')
		.post(auth.check, auth.block, follow.create)
		.delete(auth.check, auth.block, follow.delete);	
	app.route('/users')
	  	.get(controller.getUsers);	  	
	app.route('/register')
	  	.post(controller.create);
	app.route('/login')
	  	.post(controller.login); 
	app.route('/perfil')
		.get(auth.check, auth.block, controller.perfil);
};

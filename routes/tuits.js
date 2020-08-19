var auth 		= require('../Middleware/auth');
var like 	   	= require('../Controllers/like');
var controller 	= require('../Controllers/tuit');

module.exports = function(app) {	
	app.route('/tuit')
	  	.post(auth.check, controller.create)
		.delete(auth.check, controller.delete);
	app.route('/tuit/rt')
		.get(auth.check, auth.block, controller.getRT);
	app.route('/timeline/time')
		.get(auth.check, controller.timeline);
	app.route('/timeline/likes')
		.get(auth.check, controller.timelineLike);	
	app.route('/tuit/like')
		.get(auth.check, auth.block, like.get)
		.post(auth.check, like.create)
		.delete(auth.check, like.delete);
};

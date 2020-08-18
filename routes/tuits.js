var controller = require('../Controllers/tuit');
var auth = require('../Middleware/auth');

module.exports = function(app) {	
	app.route('/tuit')
	  	.post(auth.check, controller.create)
		.delete(auth.check, controller.delete);
};

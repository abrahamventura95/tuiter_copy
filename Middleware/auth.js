const jwt 		= require('jsonwebtoken');
var DBHelper 	= require('../DB/helper');

exports.check = function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) 
    	return res.sendStatus(process.env.UNAUTHORIZED);
    
    jwt.verify(token, process.env.secretOrKey, (err, user) =>{
        if (err) return res.sendStatus(process.env.FORBIDDEN);
        req.user = user;
        next();
    });
}

exports.block = function(req, res, next){
	var sqlQuery = "SELECT COUNT(*)	as val						\
					FROM block 									\
					WHERE idUser='" + req.body.idUser + "' AND	\
						  idRef ='" + req.user.sub + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		if(data[0].val == 1) return res.sendStatus(process.env.UNAUTHORIZED);
		next();
	});					    

}
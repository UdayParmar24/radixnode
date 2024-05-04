const jwt = require('jsonwebtoken');

module.exports = ((req,res,next)=>{
    
    // Get token from header
    var token = req.headers.authorization.split(' ')[1];
    if(token !=''){
        const verify = jwt.verify(token,'UdayParMarSecrateKey');
        if(verify){
            next();
        }else{
            return res.status(404).send({ msg: "Invalid Token"});
        }
    }else{
        return res.status(401).json({error: 'No token provided'});
    }
})
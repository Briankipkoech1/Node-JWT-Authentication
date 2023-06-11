const jwt=require('jsonwebtoken')

module.exports=function (req, res, next){
    const token=req.header('auth-token')
    if(!token) return res.status(401).json({error : 'access denied'})

    try{
        const verified=jwt.verify(token, process.env.TOKEN_SECRET)
        req.user=verified;
        next();
    }
    catch(err){
        res.status(400).json({error: 'invalid token'})
    }
}

//we can add this as a middleware to protect routes
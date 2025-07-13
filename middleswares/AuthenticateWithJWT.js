const jwt = require("jsonwebtoken");

function AuthenticateWithJwt(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            "message": "Authorization header missing"})
        }

        const token = authHeader.split(' ')[1];

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            next();

        }catch (e) {
            return res.status(403).json({
                "message": "Invalid or expired Token"
            })
        }
    }

    module.exports = AuthenticateWithJwt;
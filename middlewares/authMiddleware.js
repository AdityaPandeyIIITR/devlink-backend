const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req,res,next) => {
    const authHeader = req.headers.authorization;

    //Token format : <Bearer token>
    if (!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message : "No token provided"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user = { _id: decoded.userId };
        next();
    } catch(err){
        return res.status(401).json({ message: "Invalid token" });
    }
};
module.exports = authenticateUser;
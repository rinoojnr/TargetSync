const jwt = require('jsonwebtoken');

const userModel = require('../Models/user');

const authentication = async(req,res,next) =>{
    try{
        const token = req.header("Authentication");
        const decoded = jwt.verify(token,"strongpassword");
        const userData = await userModel.findById(decoded.userId);
        req.user = userData;
        next();
    }catch(err){
        res.status(400).json({success: false,status: "Authentication failed", message: err.message})
    }
}

module.exports = {
    authentication
}
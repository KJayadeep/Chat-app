import jwt from "jsonwebtoken";
import User from "../models/user.js";

//middleware to for authentication

export const authMiddleware = async (req, res, next) => {
    
    try{
        const token = req.headers.token;
        if(!token){
            return res.json({success: false, message: "No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        req.user = user;
        next();

    }
    catch (error) {
        res.json({success: false, message: "Authentication failed", error: error.message});
    }
}
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploader } from "../lib/cloudinary.js";

//sign up function

export const signUp = async (req, res) => {
    const { name, email, password, bio } = req.body;
    try {
        if(!name || !email || !password || !bio){
            return res.json({success: false, message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success: false, message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            bio
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.json({success: true,userData: newUser, token, message: "User created successfully"});

    }
    catch (error) {
        res.json({success: false, message: "Error creating user", error: error.message});
    }
}

//login function
export const login = async (req, res) =>{
    try{
        const {email, passwotd} = req.body;
        if(!email || !passwotd){
            return res.json({success: false, message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({success: false, message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(passwotd, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({success: true, userData: user, token, message: "User logged in successfully"});
    }
    catch (error) {
        res.json({success: false, message: "Error logging in user", error: error.message});
    }
}

//user authentication function
export const checkAuth = async (req, res) => {
    res.json({success: true, user: req.user, message: "User authenticated successfully"});
}

//update user profile function
export const updateProfile = async (req, res) => {
    try{
        const {name, bio, profilepic} = req.body;
        let updatedUser;

        if(!profilepic){
            updatedUser = await User.findByIdAndUpdate(req.user._id, {name, bio}, {new: true});
        }else{
                const upload = await uploader.upload(profilepic);
                updatedUser = await User.findByIdAndUpdate(req.user._id, {name, bio, profilepic: upload.secure_url}, {new: true});
        }
        res.json({success: true, user: updatedUser, message: "User profile updated successfully"});
    }
    catch (error) {
        res.json({success: false, message: "Error updating user profile", error: error.message});
    }
}

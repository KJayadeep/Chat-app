import User from "../models/user.js";
import Message from "../models/message.js";
import { uploader } from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

//get all users except the logged in user

export const getUsersForSidebar = async (req, res) => {
    try{
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        const unseenMessages = {};
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false});
            if(messages.length > 0){
                unseenMessages[user._id] = messages.length;
            }
        });
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages});
    }
    catch (error) {
        res.json({success: false, message: "Error fetching users", error: error.message});
    }
}
export const getUsersForSisebar = getUsersForSidebar;

//get all messages between two users

export const getMessages = async (req, res) => {
    try{
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId}
            ]
        });
        await Message.updateMany({senderId: selectedUserId, receiverId: myId, seen: false}, {seen: true});
        res.json({success: true, messages});
    }
    catch (error) {
        res.json({success: false, message: "Error fetching messages", error: error.message});           
    }
}

//mark messages as seen

export const markMessagesAsSeen = async (req, res) => {
    try{
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen: true});
        res.json({success: true, message: "Message marked as seen"});
    }
    catch (error) {
        res.json({success: false, message: "Error marking message as seen", error: error.message});
    }
}

//send message to selected user

export const sendMessage = async (req, res) => {
    try{
        const { text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        let imageUrl = null;
        if(image){
            const upload = await uploader.upload(image);
            imageUrl = upload.secure_url;
        }
        const newMessage = await Message.create({senderId, receiverId, text, image: imageUrl});

        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.json({success: true, message: newMessage});
    }
    catch (error) {
        res.json({success: false, message: "Error sending message", error: error.message});
    }
}


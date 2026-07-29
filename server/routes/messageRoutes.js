import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getUsersForSidebar } from "../controllers/messageController.js";
import { getMessages } from "../controllers/messageController.js";
import { markMessagesAsSeen } from "../controllers/messageController.js";
import { sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", authMiddleware, getUsersForSidebar);
messageRouter.get("/:id", authMiddleware, getMessages);
messageRouter.put("/mark/:id", authMiddleware, markMessagesAsSeen);
messageRouter.post("/send/:id", authMiddleware, sendMessage);

export default messageRouter;
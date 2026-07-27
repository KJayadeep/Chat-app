import express from "express";
import { signUp } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { checkAuth } from "../controllers/userController.js";
import { updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.get("/check-auth", authMiddleware, checkAuth);
userRoutes.put("/update-profile",authMiddleware, updateProfile);

export default userRoutes;
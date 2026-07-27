import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create an instance of the Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app); 

//initalize socket.io
export const io = new Server(server, {
  cors:{origin  : "*"}
});
//store online users
export const userSocketMap = {}; //userId: socketId

//socket.io connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`User connected: ${userId}`);
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
    if (userId) {
      delete userSocketMap[userId];
    } 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
});
});

app.use(express.json({limit: "5mb"}));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.json({ status: "Server is running" });
});

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

//connect to the database
await connectDB();

const PORT = process.env.PORT || 8000;
// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










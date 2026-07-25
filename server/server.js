import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

// Create an instance of the Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app); 

app.use(express.json({limit: "5mb"}));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.json({ status: "Server is running" });
});

//connect to the database
await connectDB();

const PORT = process.env.PORT || 8000;
// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










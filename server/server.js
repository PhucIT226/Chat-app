import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { Server } from "socket.io";

// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store online users
export const useSocketMap = {};

// Socket.io connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected");

  if (userId) {
    useSocketMap[userId] = socket.id;

    // Emit online users to all clients
    io.emit("GetonlineUsers", Object.keys(useSocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected", userId);
      delete useSocketMap[userId];
      io.emit("GetonlineUsers", Object.keys(useSocketMap));
    });
  }
});

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRoute);

// Connect to MongoDb
await connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server is running on port", PORT));
}

// export server for vercel
export default server;

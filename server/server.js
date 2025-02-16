import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Auth router
app.use("/", authRouter);


connectDB()
  .then(() => {
    app.listen(process.env.VITE_PORT || 3000, () => {
      console.log(`App running on ${process.env.VITE_PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection FAILED: ", err);
  });

// const WebSocket = require("ws");

// // WebSocket Server for Real-Time Updates
// const wss = new WebSocket.Server({ port: 8081 });

// wss.on("connection", (ws) => {
//   console.log("Client connected to WebSocket");

//   const changeStream = Todo.watch();
//   changeStream.on("change", (change) => {
//     console.log("Change detected:", change);
//     ws.send(JSON.stringify(change));
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected");
//     changeStream.close();
//   });
// });

// // Start Server
// app.listen(5000, () => console.log("Server running on port 5000"));

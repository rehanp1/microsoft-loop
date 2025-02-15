const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const WebSocket = require("ws");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection

mongoose.connect(process.env.VITE_MONGO_URI);

// Mongoose Model
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    task: String,
    completed: Boolean,
  })
);

// REST API Endpoints
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// WebSocket Server for Real-Time Updates
const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");

  const changeStream = Todo.watch();
  changeStream.on("change", (change) => {
    console.log("Change detected:", change);
    ws.send(JSON.stringify(change));
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    changeStream.close();
  });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));

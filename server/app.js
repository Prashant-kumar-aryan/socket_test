import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected (personal socket id):", socket.id);

  socket.on("message", (data) => {
    console.log(`Info: ${data.message}`);
    if (data.room === "") {
      io.emit(
        "receive-message",
        `Message From : ${socket.id} Received Message : ${data.message}`
      );
    } else {
      io.to(data.room).emit(
        "receive-message",
        `Message From : ${socket.id} Received Message : ${data.message}`
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

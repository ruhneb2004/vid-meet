import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room";

const app = express();
const server = http.createServer(app);
const port = 8080;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors);

io.on("connection", (socket) => {
  console.log("A user connected");

  roomHandler(socket);

  socket.on("disconnect", () => {
    console.log("The user is disconnected!");
  });
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});

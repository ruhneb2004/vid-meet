import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

export const roomHandler = (socket: Socket) => {
  const joinRoom = ({ roomId }: { roomId: string }) => {
    socket.join(roomId);
    console.log(`The user joined the room: ${roomId}`);
  };

  const createRoom = () => {
    console.log("The user created the room: ");
    const roomId = uuidV4();
    socket.emit("room-created", { roomId });
  };

  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
};

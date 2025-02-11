import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface RoomInter {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  const joinRoom = ({ roomId, peerId }: RoomInter) => {
    if (rooms[roomId]) {
      rooms[roomId].push(peerId);
      console.log(rooms[roomId]);

      socket.join(roomId);
      console.log(`The user ${peerId} joined the room: ${roomId}`);

      socket.to(roomId).emit("user-joined", { peerId });

      socket.emit("get-users", { roomId, participants: rooms[roomId] });

      socket.on("disconnect", () => {
        console.log("user left the room ", peerId);
        leaveRoom({ roomId, peerId });
        socket.to(roomId).emit("user-disconnected", peerId);
      });
    }
  };

  const leaveRoom = ({ roomId, peerId }: RoomInter) => {
    rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
  };

  const createRoom = () => {
    console.log("The user created the room: ");
    const roomId = uuidV4();
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });
  };

  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
};

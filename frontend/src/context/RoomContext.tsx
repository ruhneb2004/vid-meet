import SocketIOClient, { Socket } from "socket.io-client";
import { createContext, useEffect } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const WS = "http://localhost:8080";

export const RoomContext = createContext<Socket | null>(null);
const ws = SocketIOClient(WS);

export const RoomProvider: React.FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log(`You have joined the room ${roomId}`);
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    ws.on("room-created", enterRoom);
  }, []);

  return <RoomContext.Provider value={ws}>{children}</RoomContext.Provider>;
};

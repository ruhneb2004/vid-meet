import SocketIOClient, { Socket } from "socket.io-client";
import { createContext, useEffect, useState, useReducer } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Peer from "peerjs";
import { peerReducer, PeerState } from "./peerReducer";
import { addPeer } from "./peerActions";

const WS = "http://localhost:8080";

export const RoomContext = createContext<{
  ws: Socket;
  user: Peer | null;
  stream: MediaStream | undefined;
  peers: PeerState;
} | null>(null);
const ws = SocketIOClient(WS);

export const RoomProvider: React.FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Peer | null>(null);

  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log(`You have joined the room ${roomId}`);
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({
    roomId,
    participants,
  }: {
    roomId: string;
    participants: string[];
  }) => {
    console.log({ roomId });
    console.log({ participants });
    console.log("You have joined the room");
  };

  useEffect(() => {
    const userId = uuidV4();

    const peer = new Peer(userId);

    const setUpStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
        console.log("stream has been setup");
      } catch (error) {
        console.log(error);
      }
    };

    setUpStream();

    console.log(peer);
    setUser(peer);
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("user-disconnected", removePeer);
  }, []);

  const removePeer = (peerId: string) => {
    dispatch({ type: "REMOVE_PEER", payload: { peerId } });
  };

  useEffect(() => {
    if (!user || !stream) return;

    console.log("stream and user are ready");

    ws.on("user-joined", ({ peerId }) => {
      setTimeout(() => {
        console.log("Calling peer:", peerId);

        const call = user.call(peerId, stream);
        console.log("Call object:", call);

        call.on("stream", (peerStream) => {
          dispatch(addPeer(peerId, peerStream));
          console.log("Received peer's stream!");
        });

        call.on("error", () => {
          console.log("error");
        });
      }, 1000);
    });

    user.on("call", (call) => {
      console.log("Incoming call from:", call.peer);
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeer(call.peer, peerStream));
        console.log("Stream received from:", call.peer);
      });
    });
  }, [user, stream]);

  console.log({ peers });

  return (
    <RoomContext.Provider value={{ ws, user, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import VideoComp from "../components/videoComp";
import { PeerState } from "../context/peerReducer";

const RoomPage = () => {
  const { id } = useParams();
  const { ws, user, stream, peers } = useContext(RoomContext);

  useEffect(() => {
    if (user) {
      ws.emit("join-room", { roomId: id, peerId: user?._id });
    }
  }, [id, user, ws]);

  return (
    <div className="w-screen h-screen  items-center justify-center grid grid-cols-5 grid-rows-3 gap-4 py-5 px-3">
      <VideoComp stream={stream} />

      {Object.values(peers as PeerState).map((peer, key) => (
        <VideoComp stream={peer.stream} key={key} />
      ))}
    </div>
  );
};

export default RoomPage;

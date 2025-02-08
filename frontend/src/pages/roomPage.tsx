import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";

const RoomPage = () => {
  const { id } = useParams();
  const ws = useContext(RoomContext);

  useEffect(() => {
    if (ws) {
      ws.emit("join-room", { roomId: id });
    }
  }, [id]);

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      This is a simple room with id {id}
    </div>
  );
};

export default RoomPage;

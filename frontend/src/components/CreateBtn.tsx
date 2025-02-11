import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const CreateBtn: React.FC = () => {
  const { ws } = useContext(RoomContext);

  const createRoom = () => {
    ws.emit("create-room");
    console.log(ws);
  };

  return (
    <button
      onClick={createRoom}
      className={`bg-slate-400 py-1 px-6 rounded-lg hover:bg-slate-300 transition-all`}
    >
      Create a new room!
    </button>
  );
};

export default CreateBtn;

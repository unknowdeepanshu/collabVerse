import { IconLink ,IconCheck ,IconTrash } from '@tabler/icons-react';
import { useState,useContext } from 'react';
import RoomContext from '../../../../context/roomContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function RoomRow(props) {
  const { setRoomid } = useContext(RoomContext);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const { room, index ,trigger,setTrigger} = props;

  
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";
  
  async function handleJoin(e) {
    const roomId = e.currentTarget.dataset.value;
    setRoomid(roomId);
    console.log(`Joining room with ID: ${roomId}`);
    navigate(`/dashboard/playground`);
  }
  function copyToClipboard(e) {
    const roomId = e.currentTarget.dataset.value;
    navigator.clipboard.writeText(roomId)
    setShow(!show);
    setTimeout(()=>{setShow(true)}, 2000);
  }
  async function handleDelete(e) {
    const roomID = e.currentTarget.dataset.value;
    console.log("trigger value in roomrow before delete:", trigger);
    setTrigger(true);
    const userId = localStorage.getItem("myUserId");
    const response = await axios.post(`${API_BASE_URL}/Deleterooms`, { roomID: roomID, userId: userId });
    if(!response.status===201){
      setTrigger(false);
    }
    console.log(`Deleting room with ID: ${roomID}`);
  }
  return (
    <div className="grid grid-cols-6 gap-4 px-4 py-3 items-center border-b hover:bg-gray-50 transition">
      <div>{index + 1}</div>

      <div className="font-medium">{room.name}</div>

      <div>
        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
          {room.role? 'Owner' : 'Member'}
        </span>
      </div>

      <div>{room.number}</div>

      <div>
        <button data-value={room.roomID} onClick={handleJoin} className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600" >
          Join
        </button>
      </div>

      <div>
        <button data-value={room.roomID} onClick={copyToClipboard} className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300">
          <IconLink stroke={1} style={show ?{}:{display: 'none'}}/>
          <IconCheck stroke={2} style={show ? {display: 'none'} : {}}/>
        </button>
        <button data-value={room.roomID} onClick={handleDelete} className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300" >
          <IconTrash/>
        </button>
      </div>
    </div>
  );
}

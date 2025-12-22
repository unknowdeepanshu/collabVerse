import RoomHeader from "./RoomHeader";
import RoomRow from "./RoomRow";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function RoomList(props) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

  const { function: trigger, sefunction: setTrigger } = props;

  const fetchUserRooms = useCallback(async () => {
    const userId = localStorage.getItem("myUserId");
    if (!userId) return;

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/rooms/my-rooms`, { 
        params: { userId: userId } 
      });
      
      const roomData = response.data.rooms || [];
      setRooms(roomData);
      
      if (setTrigger) setTrigger(false);
      
      console.log("Rooms updated for user:", userId);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [setTrigger]);

  useEffect(() => {
    fetchUserRooms();
  }, [fetchUserRooms]);

  useEffect(() => {
    if (trigger === true) {
      const timer = setTimeout(() => {
        fetchUserRooms();
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [trigger, fetchUserRooms]);

  return (
    <div className="bg-white rounded-lg shadow min-h-[200px]">
      <RoomHeader />
      
      {loading && <p className="text-center p-4">Updating list...</p>}
      
      {!loading && rooms.length === 0 && (
        <p className="text-center p-4 text-gray-500">No rooms found in your dashboard.</p>
      )}

      {rooms.map((room, index) => (
        <RoomRow 
          key={room._id || room.roomID || index} 
          index={index} 
          room={room} 
          setTrigger={setTrigger}
          trigger={trigger}
        />
      ))}
    </div>
  );
}

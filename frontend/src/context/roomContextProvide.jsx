import React, { useState } from "react";
import RoomContext from "./roomContext";

const RoomContextProvider = ({ children }) => {
    const [rooms, setRooms] = useState(null);
    const [roomid, setRoomid] = useState("");
    return(
        <RoomContext.Provider value={{ rooms, setRooms, roomid, setRoomid }}>
            {children}
        </RoomContext.Provider>
    );
};

export default RoomContextProvider;
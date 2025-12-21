
import React, { createContext, useContext, useState, useRef } from 'react';
import { client } from './colyseusClient';

export const RoomContext = createContext({});

export function RoomProvider1({ children }) {
    const [joinError, setJoinError] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    
    const roomRef = useRef(null);
    const hasActiveJoinRequest = useRef(false);

    const join = async (roomid) => {
        if (hasActiveJoinRequest.current || roomRef.current) return;
        hasActiveJoinRequest.current = true;

        try {
            const joinedRoom = await client.joinById(roomid);
            roomRef.current = joinedRoom;
            
            
            joinedRoom.onLeave(() => {
                setIsConnected(false);
                roomRef.current = null;
            });
            
            setIsConnected(true);
            console.log("Joined room successfully:", joinedRoom.sessionId);
        } catch (e) {
            console.error("Join error:", e);
            setJoinError(true);
        } finally {
            hasActiveJoinRequest.current = false;
        }
    };

    return (
        <RoomContext.Provider value={{ 
            isConnected, 
            room: roomRef.current, 
            join, 
            joinError 
        }}>
            {children}
        </RoomContext.Provider>
    );
}

export const useRoom1 = () => useContext(RoomContext);

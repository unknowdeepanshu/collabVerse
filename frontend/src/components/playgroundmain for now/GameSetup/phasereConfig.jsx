
import { useRoom1 } from './RoomContext';
import { useEffect, useRef, useContext } from 'react';
import phaser from 'phaser';
import MapScene from './Scenes/map';
import RoomContext from '../../../context/roomContext';

export function GameComponent() {
  const { join, room, isConnected } = useRoom1();
  const phaserGameRef = useRef(null);
  const { roomid, setRoomid } = useContext(RoomContext);

  useEffect(() => {
    // 1. On mount, check if roomid exists in Context or LocalStorage
    const savedRoomId = localStorage.getItem("activeRoomId");
    const targetRoomId = roomid || savedRoomId;

    if (targetRoomId) {
      // 2. If we found it in LocalStorage but not Context, update Context
      if (!roomid && savedRoomId) {
        setRoomid(savedRoomId);
      }
      
      // 3. Save to localStorage to survive the next reload
      localStorage.setItem("activeRoomId", targetRoomId);
      
      // 4. Connect to the room
      join(targetRoomId);
    }
  }, []);

  useEffect(() => {
    if (isConnected && room && !phaserGameRef.current) {
      const config = {
        type: phaser.AUTO,
        parent: 'phaser-container',
        width: 1208,
        height: 789,
        backgroundColor: '#b6d53c',
        physics: { default: "arcade", arcade: { gravity: { y: 0 } } },
        disableVisibilityChange: true, 
        fps: { target: 60, forceSetTimeOut: true }, 
        
        scene: [new MapScene(room)] 
      };
      phaserGameRef.current = new phaser.Game(config);
    }

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true); 
        phaserGameRef.current = null;
      }
    };
  }, [isConnected, room]);

  return <div id="phaser-container" />;
}

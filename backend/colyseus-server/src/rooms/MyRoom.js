import { Room } from "@colyseus/core";
import { Schema, MapSchema, defineTypes } from "@colyseus/schema";

// 1. Define the Block structure
export class Block extends Schema {}
defineTypes(Block, {
    playerId: "string",
    x: "number",
    y: "number"
});

// 2. Define the Room State
export class MyRoomState extends Schema {
    constructor() {
        super();
        this.allplayer = new MapSchema();
    }
}
defineTypes(MyRoomState, {
    allplayer: { map: Block }
});

// 3. Define the Room Logic
export class MyRoom extends Room {
  maxClients = 4;
  state = new MyRoomState();
  onCreate (options) {
    this.autoDispose = false; 

    this.onMessage("move", (client, input) => {
        // Correctly get the specific player using the sender's sessionId
        const player = this.state.allplayer.get(client.sessionId);
        
        if (player) {
            const speed = 5;
            if (input.left) player.x -= speed;
            if (input.right) player.x += speed;
            if (input.up) player.y -= speed;
            if (input.down) player.y += speed;
        }
    });
  }

  onJoin (client, options) {
    console.log(client.sessionId, "joined!");
    
    const player = new Block();
    player.playerId = client.sessionId;
    player.x = 400; 
    player.y = 300; 
    
    // Store in the MapSchema using .set() (Standard for version 0.15+)
    this.state.allplayer.set(client.sessionId, player);
  }

  async onLeave (client, consented) {
    // Removes the player from the state so everyone else sees them disappear
    this.state.allplayer.delete(client.sessionId);
    
    console.log(`Player ${client.sessionId} left. Remaining players: ${this.clients.length}`);
    
   
  }

  onDispose() {
    console.log("Room specifically deleted via API call.");
  }
}

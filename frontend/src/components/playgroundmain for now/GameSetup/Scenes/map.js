
import Phaser from "phaser";
import { getStateCallbacks } from "colyseus.js";
export default class MapScene extends Phaser.Scene {
    constructor(room) {
        super({ key: "MapScene" });
        this.room = room; 
        this.playerEntities = {}; 
    }

    preload() {
      let urlimgae = ["/assets/ships/ship_0006.png","/assets/ships/ship_0000.png"];
      let num = Math.floor(Math.random() * urlimgae.length);
        console.log("Phaser preload() started. Room SessionID:", this.room.sessionId); 
        
        this.load.image("player", urlimgae[num]);
        this.cursors = this.input.keyboard.createCursorKeys();
        console.log("Preloading assets...");
    }

create() {
    console.log("Phaser create() started. Room SessionID:", this.room.sessionId);
        console.log("Creating player entities...", this.room);
       const $ = getStateCallbacks(this.room);

    $(this.room.state).allplayer.onAdd((player, sessionId) => {
         
        console.log("SUCCESS: New player detected in Phaser:", sessionId);

        const entity = this.physics.add.image(player.x, player.y, "player");
        entity.setScale(1.3)
        this.playerEntities[sessionId] = entity;

        // Use $(player) to listen for individual field changes
        $(player).onChange(() => {
            entity.x = player.x;
            entity.y = player.y;
        });

        if (sessionId === this.room.sessionId) {
            
        // this.cameras.main.startFollow(this.ship, true, 0.2, 0.2);
        // this.cameras.main.setZoom(1);
            // this.cameras.main.startFollow(entity);
            
        this.cameras.main.setBounds(0, 0, 800, 600);
        }
    });

    $(this.room.state).allplayer.onRemove((player, sessionId) => {
        if (this.playerEntities[sessionId]) {
            this.playerEntities[sessionId].destroy();
            delete this.playerEntities[sessionId];
        }
    });
}


    update() {
        this.handleInput();
    }

    handleInput() {
        if (!this.room || !this.cursors) return;

        // Authoritative: Send inputs to server, don't move locally
        const inputPayload = {
            left: this.cursors.left.isDown,
            right: this.cursors.right.isDown,
            up: this.cursors.up.isDown,
            down: this.cursors.down.isDown,
        };

        // Server handles logic and updates state back to us
        this.room.send("move", inputPayload);
    }
}



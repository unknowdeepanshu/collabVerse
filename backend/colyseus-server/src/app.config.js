import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import cors from "cors";
import express from "express";  
import { matchMaker } from "colyseus";  
import 'dotenv/config';

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom.js";

export default config({

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom);
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         * Read more: https://expressjs.com/en/starter/basic-routing.html
         */
        
        app.get("/hello_world", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });
        app.use(express.json());

         const allowedOrigins = [
            process.env.FRONTEND_URL, 
            process.env.MOTIA_API_URL  // Fallback for Motia local dev
        ];

        // --- UPDATED CORS CONFIGURATION ---
        app.use(cors({
            origin: function (origin, callback) {
                // Allow requests with no origin (like mobile apps or curl) 
                // or if the origin is in our allowed list
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));
        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground());
        }

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/colyseus/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/monitor", monitor());

        app.post("/DELETE", async(req,res)=>{
            const { roomID } = req.body;
    
    // Attempt to get the local room instance directly
    const roomInstance = matchMaker.getLocalRoomById(roomID);

    if (roomInstance) {
        roomInstance.disconnect(); // Standard built-in shutdown
        return res.json({ success: true, message: "Local room found and disconnected" });
    } else {
        // Fallback: Use MatchMaker to query across all processes (requires Redis/Presence)
        try {
            await matchMaker.remoteRoomCall(roomID, "disconnect");
            res.json({ success: true, message: "Remote room call sent" });
        } catch (e) {
            res.status(404).json({ error: "Room not found locally or remotely" });
        }
    }
        });
    },

    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }

});

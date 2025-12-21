import client from "../colyseusClient.js";
import { connectMongo } from "../../database/db/mongoConnextor.js";
import { Room } from "../../database/models/room.Model.js";
import { User } from "../../database/models/user.Model.js"; // Import User model
import { z } from "zod";

export const config = {
    name: 'create-Room-API',
    type: 'api',
    path: '/api/Createrooms',
    method: 'POST',
    bodySchema: z.object({
        roomName: z.string().min(1),
        userId: z.string().min(1), // Required to link the room to the user
    }),
    emits: [],
    flows: ['connected to colyseus server'],
};

export const handler = async (req, { logger }) => {
    const { roomName, userId } = req.body;

    try {
        await connectMongo(logger);

        // 1. Create the room in Colyseus
        const colyseusRoom = await client.create("my_room");
        
        // 2. Create the room document in MongoDB
        const newRoom = await Room.create({
            name: roomName,
            roomID: colyseusRoom.roomId,
            role: true, // true means Owner
            number: 4,
        });

        // 3. Link this room to the specific user's room list
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { rooms: newRoom._id } }, // Push the Mongoose _id
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("User not found; room created but not linked.");
        }

        logger.info(`Room ${newRoom.roomID} created and linked to user ${userId}`);

        return { 
            status: 201, 
            body: { 
                status: 'created', 
                roomId: newRoom.roomID,
                mongoId: newRoom._id 
            } 
        };

    } catch (error) {
        logger.error("Error creating room:", error.message);
        return { 
            status: 500, 
            body: { error: `Error: ${error.message}` } 
        };
    }
};

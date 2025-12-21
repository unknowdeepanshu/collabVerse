import { z } from "zod";
import axios from "axios";
import { connectMongo } from "../../database/db/mongoConnextor";
import { Room } from "../../database/models/room.Model.js";
import { User } from "../../database/models/user.Model.js"; // Import User model

export const config = {
    name: 'delete-Room-API',
    type: 'api',
    path: '/api/Deleterooms',
    method: 'POST',
    bodySchema: z.object({
        roomID: z.string().min(1),
        userId: z.string().min(1), // Added: Need userId to know which user's array to clean
    }),
    emits: [],  
};

export const handler = async (req, { logger }) => {
    const { roomID, userId } = req.body;

    try {
        await connectMongo(logger);

        // 1. Tell Colyseus Server to shut down the room instance
        const response = await axios.post(process.env.colyseus_api_key + "/DELETE", { roomID });

        // 2. Find the room in DB to get its Mongo _id
        const roomDoc = await Room.findOne({ roomID: roomID });

        if (roomDoc) {
            // 3. REMOVE the room ID from the User's array ($pull)
            await User.findByIdAndUpdate(userId, {
                $pull: { rooms: roomDoc._id }
            });

            // 4. Delete the Room document itself
            await Room.findByIdAndDelete(roomDoc._id);
            
            logger.info(`Room ${roomID} deleted and removed from user ${userId}`);
        }

        return { status: 200, body: { status: 'deleted', roomID } };

    } catch (error) {
        logger.error("Error deleting room:", error.message);
        return { status: 500, body: { status: `Error: ${error.message}` } };
    }
};

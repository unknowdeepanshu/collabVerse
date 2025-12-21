import {z} from "zod";
import { connectMongo } from "../database/db/mongoConnextor.js";
import { Room } from "../database/models/room.Model.js";
import { User } from "../database/models/user.Model.js";

export const config ={
    name:'getRoomid-API',
    type:'api',
    method:'POST',
    path:'/api/joinroom',
    bodySchema:z.object({
        roomID: z.string().min(1),
        userId:z.string().min(1),
    }),
    emits:[],
    flows: ['connected to colyseus server'],
}
export const handler = async (req, { Logger }) => {
    try {
        const { roomID, userId } = req.body;
        console.log("Join Room API called with:", roomID, userId);
        // 1. Ensure DB connection
        await connectMongo();

        // 2. Find the room by its roomID string
        // We need the room's MongoDB _id to add it to the User model
        const targetRoom = await Room.findOne({ roomID: roomID });

        if (!targetRoom) {
            return { status: 404, body: { status: 'error', message: 'Room not found' } };
        }

        // 3. Add the room to the user's rooms array
        // Use $addToSet to prevent the same user from "joining" twice (avoids duplicates)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { rooms: targetRoom._id } },
            { new: true }
        );

        if (!updatedUser) {
            return { status: 404, body: { status: 'error', message: 'User not found' } };
        }

        // 4. Return success response
        // In the API response, we explicitly set role to false as requested
        return {
            status: 200,
            body: {
                status: 'success',
                message: 'Successfully joined room',
                roomDetails: {
                    _id: targetRoom._id,
                    roomID: targetRoom.roomID,
                    name: targetRoom.name,
                    number: targetRoom.number,
                    role: false // Overriding model data in API response
                }
            }
        };

    } catch (error) {
        console.error("Join Room Error:", error);
        return { status: 500, body: { status: 'error', message: 'Internal Server Error' } };
    }
}

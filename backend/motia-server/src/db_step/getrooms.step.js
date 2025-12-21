import { connectMongo } from '../database/db/mongoConnextor.js';
import { User } from '../database/models/user.Model.js'; // You must import User
import { Room } from '../database/models/room.Model.js';
export const config = {
    name: 'getUserRooms',
    type: 'api',
    path: '/api/rooms/my-rooms',
    method: 'GET',
    description: 'Get rooms belonging to a specific user dashboard',
    emits: [],
    flows: ['connect to mongoDB'],
};

export const handler = async (req, { logger }) => {
    // const { userId } = req.body;
    const { userId } = req.queryParams; 
    console.log("Fetching rooms for userId:", userId);

    try {
        await connectMongo(logger);

        // 1. Find the user by ID
        // 2. .populate('rooms') converts the IDs in the array into full Room objects
        const userData = await User.findById(userId)
            .populate('rooms') 
            .lean();

        if (!userData) {
            return { status: 404, body: { error: 'User not found' } };
        }

        // Return only the rooms belonging to this specific user
        return { 
            status: 200, 
            body: { 
                username: userData.username,
                rooms: userData.rooms // This is now an array of full Room objects
            } 
        };  

    } catch (err) {
        logger.error('Dashboard Fetch Error:', err.message);
        return { status: 500, body: { error: 'Internal Server Error' } };
    }
};

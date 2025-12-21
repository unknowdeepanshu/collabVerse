import { connectMongo } from '../database/db/mongoConnextor.js';
import { User } from '../database/models/user.Model.js'; // Ensure this points to your User model
import { z } from 'zod';

export const config = {
  name: 'UserRegistrationAPI',
  type: 'api',
  path: '/api/user/register',
  method: 'POST',
  bodySchema: z.object({
    username: z.string().min(1),
  }),
  emits: [],
  flows: ['connect to mongoDB'],
};

export const handler = async (req, { logger }) => {
  const { username } = req.body;

  try {
    // 1. Connect to MongoDB
    await connectMongo(logger);

    // 2. Check if the user already exists (using your schema's 'username' field)
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      logger.info(`User already exists: ${username}`);
      return { 
        status: 200, 
        body: { 
          status: 'exists', 
          _id: String(existingUser._id),
          username: existingUser.username 
        } 
      };
    }

    // 3. Create new user if not found
    const newUser = await User.create({
      username: username,
      rooms: [] // Initialize with empty rooms list
    });

    const totalUsers = await User.estimatedDocumentCount();
    logger.info(`New user created. Total users: ${totalUsers}`);

    return { 
      status: 201, 
      body: { 
        status: 'created', 
        _id: String(newUser._id), 
        username: newUser.username 
      }
    };

  } catch (error) {
    logger.error('Error in User API:', error.message);
    return { 
      status: 500, 
      body: { error: 'Internal Server Error' } 
    };
  }
};

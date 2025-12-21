import { config } from '@motiadev/core'
import endpointPlugin from '@motiadev/plugin-endpoint/plugin'
import logsPlugin from '@motiadev/plugin-logs/plugin'
import observabilityPlugin from '@motiadev/plugin-observability/plugin'
import statesPlugin from '@motiadev/plugin-states/plugin'
import bullmqPlugin from '@motiadev/plugin-bullmq/plugin'
import { z } from 'zod' // Added for Schema validation
import type { StreamAuthRequest } from '@motiadev/core'
// Db connection setup
import { connectMongo } from './src/database/db/mongoConnextor'

// Connect to MongoDB on startup
void (async () => {
  const logger = {
    info: (...args: unknown[]) => console.info('[mongo:start]', ...args),
    error: (...args: unknown[]) => console.error('[mongo:start]', ...args),
  }
  try {
    await connectMongo(logger)
  } catch (err) {
    logger.error('Failed to connect to MongoDB on startup:', (err as any)?.message || err)
  }
})()



const streamAuthContextSchema = z.object({
  userId: z.string(),
  allowedRooms: z.array(z.string()), // Rooms this user can join
});

export default config({
  redis: {
    useMemoryServer: false,
    host: '127.0.0.1',
    port: 6379,
  },

  // --- ADD STREAM AUTH HERE ---
  streamAuth: {
    // Generates internal types for your stream files
    contextSchema: z.toJSONSchema(streamAuthContextSchema),
    
    authenticate: async (request) => {
      // Extract token from Sec-WebSocket-Protocol or URL search params
      const url = new URL(request.url || '', process.env.FRONTEND_URL || 'http://localhost');
      const token = url.searchParams.get('authToken');

      if (!token) return null; // Anonymous client

      // Replace this with your actual database or session lookup
      // Example: const session = await UserSession.findOne({ token });
      if (token === "valid-secret-token") {
        return { 
          userId: "user_123", 
          allowedRooms: ["room_A", "room_B","global"] 
        };
      }

      throw new Error("Invalid authentication token");
    },
  },
  plugins: [observabilityPlugin, statesPlugin, endpointPlugin, logsPlugin, bullmqPlugin],
})

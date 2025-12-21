import { z } from 'zod' 

export const config = {
  name: 'chatMessage',
  schema: z.object({
    message: z.string().min(1),
    sender: z.string().min(1),
    timestamp: z.string().min(1),
  }),
  baseConfig: {
    storageType: 'default'
  },
  canAccess: ({ groupId }, authContext) => {
    // Allow all users to access chat rooms for now
    return true;
  }
}
 
import {z} from 'zod'
export const config = {
    name: 'chatMessage',
    type:'api',
    method:'POST',
    path:'/api/chat',
    description:'Chat message schema',
    bodySchema: z.object({
        message: z.string().min(1),
        sender: z.string().min(1),
        timestamp: z.string().min(1),
    }),
    emits:[],
};
export const handler = async (req, ctx) => {
    const { message, sender, timestamp } = req.body;
    const { logger, streams } = ctx;

    const roomId = req.body.roomId || 'global'; 
    const messageId = `${Date.now()}-${sender}`;

    try {
        const messageObj = {
            message,
            sender,
            timestamp,
        };
        await streams.chatMessage.set(roomId, messageId, messageObj);

        logger.info(`Message sent to ${roomId} by ${sender}`);
        return { status: 200, body: { status: 'message received', messageId } };
    } catch (error) {
        logger.error('Error processing chat message:', error.message);
        return { status: 500, body: { status: 'Internal server error' } };
    }
}
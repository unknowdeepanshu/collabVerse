import { z } from 'zod'

export const config = {
    name: 'clearChatRoom',
    type: 'api',
    method: 'DELETE',
    path: '/api/chat/room/:roomId',
    description: 'Clear all messages from a chat room',
    emits: [],
};

export const handler = async (req, ctx) => {
    const { roomId } = req.pathParams;
    const { logger, streams } = ctx;

    try {
        // Get all messages in the room
        const messages = await streams.chatMessage.getGroup(roomId);
        
        // Delete each message
        for (const msg of messages) {
            await streams.chatMessage.delete(roomId, msg.id);
        }

        logger.info(`Cleared ${messages.length} messages from room ${roomId}`);
        return { 
            status: 200, 
            body: { 
                status: 'room cleared', 
                roomId, 
                deletedCount: messages.length 
            } 
        };
    } catch (error) {
        logger.error('Error clearing chat room:', error.message);
        return { status: 500, body: { status: 'Internal server error' } };
    }
}

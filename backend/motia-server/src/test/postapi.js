import { z } from 'zod';
export const config = {
  name: 'RoomsAPI',
  type: 'api',
  path: '/api/test',
  method: 'POST',
  bodySchema:z.object({
    name: z.string().min(1),
    number: z.string().min(1)
  }),
  emits: [ ], 
};
export const handler = async (req, { logger }) => {
    const { name, number } = req.body;

  return { status: 201, body: { status: 'created', _id: 'roomId123', name, number } };
};
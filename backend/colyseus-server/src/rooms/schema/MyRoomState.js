import { schema ,MapSchema} from "@colyseus/schema";

// export const MyRoomState = schema({
//   mySynchronizedProperty: "string"
// })

export const Block = schema({
    playerId: "string",
    x: 'number',
    y: 'number'
});
 
export const MyRoomState = schema({
    allplayer: { map: Block, default: new Map() }
});
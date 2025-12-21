import { Client } from "colyseus.js";
const client = new Client(process.env.colyseus_api_key);
export default client;
import { client } from './colyseusClient';
import { AuthProvider1 } from './AuthContext';
import { RoomProvider1 } from './RoomContext';
import Playground from '../playground.jsx';

function Play() {
  return (
    <AuthProvider1 colyseusSDK={client}>
      <RoomProvider1>
        <Playground />
      </RoomProvider1>
    </AuthProvider1>
  );
}
export default Play;
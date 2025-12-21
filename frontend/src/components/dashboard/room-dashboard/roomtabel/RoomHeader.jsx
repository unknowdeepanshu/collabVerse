export default function RoomHeader() {
  return (
    <div className="grid grid-cols-6 gap-4 px-4 py-3 text-sm font-semibold text-gray-500 border-b">
      <div>No.</div>
      <div>Room Name</div>
      <div>Role</div>
      <div>Players</div>
      <div>Join</div>
      <div>Share</div>
    </div>
  );
}

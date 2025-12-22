import { useState } from "react";
import axios from "axios";
import Message from "./meesage";
export default function ChatMessage({ roomId = "global", username = "Player" }) {
    // 1. Hook into Motia Stream (Real-time updates)
    
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

    const [chatinput, setchatInput] = useState("");
    const [aiinput, setaiInput] = useState("");
    const [chatRoom, setChatRoom] = useState(true);

    // 2. Function to send message to your API Step
    async function chatSubmit(e) {
        e.preventDefault();
        if (!chatinput.trim()) return;

        try {
            username = localStorage.getItem("myUsername") || "Player";
            await axios.post(`${API_BASE_URL}/chat`, {
                roomId: roomId,
                message: chatinput,
                sender: username,
                timestamp: new Date().toLocaleTimeString()
            });
            setchatInput(""); 
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    }
    async function handleClearChat() {
        try {
            await axios.delete(`${API_BASE_URL}/chat/Clear/` )
            console.log("Chat cleared successfully");
        } catch (err) {
            console.error("Failed to clear chat:", err);
        }}

    return (
        <div>
            <div className="bg-white p-8 rounded-lg flex flex-col justify-center ">
                <div className="flex justify-center mb-1 gap-6">
                    <button onClick={() => setChatRoom(true)} className="px-4 py-2 rounded-xl border border-neutral-600 bg-white hover:bg-gray-100">
                        <span className="font-bold text-2xl mb-6">Chat Room</span>
                    </button>
                    <button onClick={() => setChatRoom(false)} className="px-4 py-2 rounded-xl border border-neutral-600 bg-white hover:bg-gray-100">
                        <span className="font-bold text-2xl mb-6">Ai agent Room</span>
                    </button>
                </div>

                {/* Chat Room UI */}
                <div className="bg-white p-8 rounded-lg w-[500px]" style={chatRoom ? {} : { display: "none" }}>
                    <h1 className="text-4xl mb-6 text-center font-bold">Chat Room</h1>
                    <div className="bg-gray-200 p-4 rounded-lg mb-6 h-64 overflow-y-auto" style={{ height: '37rem' }}>
                        <h2 className="text-2xl mb-4">Messages</h2>

                        
                        <Message roomId={roomId} username={username} chat={chatinput}/>
                    </div>

                    <form onSubmit={chatSubmit} className="flex gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Type message..."
                            value={chatinput}
                            onChange={e => setchatInput(e.target.value)}
                            className="flex-1 border-2 border-gray-700 focus:border-pink-600 p-2 rounded"
                        />
                        <button className="px-4 py-2 rounded-xl border border-neutral-600 bg-white hover:bg-gray-100">
                            Send
                        </button>
                    </form>
                </div>
                <button onClick={handleClearChat} className="px-4 py-2 rounded-xl border border-neutral-600 bg-white hover:bg-gray-100">
                    clear chat
                </button>

                {/* AI Agent Room (Placeholder for now) */}
                <div className="bg-white p-8 rounded-lg w-[500px]" style={chatRoom ? { display: "none" } : {}}>
                    <h1 className="text-4xl mb-6 text-center font-bold">Ai agent Room</h1>
                    <div className="bg-gray-200 p-4 rounded-lg mb-6 h-64 overflow-y-auto" style={{ height: '37rem' }}>
                        <p className="text-gray-500">AI Logic coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

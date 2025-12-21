import axios from "axios";
import { useState, useEffect } from "react";

export default function Avatar() {
  const [username, setUsername] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  // 1. Check localStorage once when the component mounts
  useEffect(() => {
    const savedName = localStorage.getItem("myUsername");
    if (savedName) {
      setUsername(savedName);
      setIsRegistered(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const inputName = e.target[0].value;
    
    if (!inputName.trim()) return;

    try {
      const response = await axios.post("/api/user/register", {
        username: inputName,
      });

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("myUserId", response.data._id);
        localStorage.setItem("myUsername", response.data.username);
        
        setUsername(response.data.username);
        setIsRegistered(true);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  if (isRegistered) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-black bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {username.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold">{username}</h1>
          
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black bg-gray-100">
      <div className="flex flex-col gap-2 justify-between items-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Enter your name</h1>
        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Username..."
            required
            className="flex-1 border-2 border-gray-700 focus:border-pink-600 p-2 rounded"
          />
          <button 
            type="submit"
            className="px-4 py-2 rounded-xl border border-neutral-600 bg-white hover:bg-gray-100 font-bold"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}

import Modalpop from "../../../../popModel/popModel"
import{ useState ,useContext} from "react"
import RoomContext from "../../../../../context/roomContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinRoom(props){
    
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setRoomid } = useContext(RoomContext);
    console.log("Joinroom props:", props);
    const{setTrigger, trigger} = props;
    const navigate = useNavigate();
    async function formsubmit(e){
        e.preventDefault();
        const roomId=e.target[0].value;
        const userId = localStorage.getItem("myUserId");
        const response = await axios.post(`${API_BASE_URL}/joinroom`, { roomID: roomId, userId: userId });
        console.log("Join room response:", response.data);
        if (response.status === 200) {
            setRoomid(roomId);
            navigate(`/dashboard/playground`);
            console.log("form submitted",e);
        }
    }
    return(
    <>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
            JoinRoom
        </button>
        <Modalpop isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} iscross={false}>
            <div className="flex flex-col items-center justify-center ">
                <div>
                    <h1 className="text-4xl text-center mb-10 font-bold font-sans">Join Room</h1>
                    <div className="flex flex-col gap-6 items-center justify-center bg-white p-8 rounded-lg">
                    <form onSubmit={formsubmit}  className="flex flex-col gap-6 items-center justify-center">
                        <span className="text-lg font-semibold">Enter the Room Id:</span>
                        <input type="text"    placeholder="Room Id" className="border-2 border-gray-700 focus:border-pink-600 p-2"/>
                        <button onClick={() => {setTrigger(true)}} className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
                        Join Room
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </Modalpop>
    </>
    )
}
import Modalpop from "../../../../popModel/popModel"
import Loaderpop from "../../../../popModel/LoaderModel";
import{ useState,useContext} from "react"
import axios from "axios";
import RoomContext from "../../../../../context/roomContext";

export default function Createroom(props){
    console.log("createroom props:", props);
    const {setTrigger,trigger}=props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {setRooms}=useContext(RoomContext);
    async function formsubmit(e){
        e.preventDefault();
        console.log("form submitted",e);
        const name=e.target[0].value;
        console.log("name:",name);
        const id=localStorage.getItem("myUserId");
        let payload={
            roomName:name,
            userId:id,
        }
        try{
            const response=await axios.post('/api/Createrooms',payload);
            console.log("response from server:",response.data);
            const table=response.data.table;
            setRooms(table);
        }catch(err){
            console.log("error in creating room:",err);
        }
        setIsModalOpen(false);
}
    return(
    <>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
            CreateRoom
        </button>
        <Modalpop isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} iscross={false}>
        <div className="flex flex-col items-center justify-center ">
            <div>
                <h1 className="text-4xl mb-10 text-center font-bold font-sans">Create Room</h1>
                <div className="flex flex-col gap-6 items-center justify-center bg-white p-8 rounded-lg">
                <form onSubmit={formsubmit} className="flex flex-col gap-6 items-center justify-center">
                    <span className="text-lg font-semibold">Enter the Name of Room:</span>
                    <input type="text"    placeholder="Name in Game" className="border-2 border-gray-700 focus:border-pink-600 p-2"/>
                    <button onClick={() => {setTrigger(true)}} className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
                    Create Room
                    </button>
                </form>
                </div>
            </div>
        </div>
        </Modalpop>
        {/* <Loaderpop isOpen={trigger} onClose={() => setTrigger(false)} /> */}
    </>
    )
}

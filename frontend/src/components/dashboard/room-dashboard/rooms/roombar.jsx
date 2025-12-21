import Createroom from "./roombutton/createroom";
import JoinRoom from "./roombutton/joinroom";
export default function Roombar(pros) {
    console.log("roombar props:", pros);
    const {function:trigger , sefunction:setTrigger} = pros;
    return(
        <div className="bg-regal-white flex justify-between items-center rounded-2xl p-8">
                <h1 className="text-3xl">Rooms</h1>
            <div className="flex gap-4">
                <Createroom setTrigger={setTrigger} trigger={trigger} />
                <JoinRoom setTrigger={setTrigger} trigger={trigger} />
            </div>
        </div>
    )

}
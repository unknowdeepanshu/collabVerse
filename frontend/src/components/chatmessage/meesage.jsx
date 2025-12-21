import { useStreamGroup } from "@motiadev/stream-client-react";
import { useEffect } from "react";

export default function Message({ roomId = "global", username = "Player" ,chat}) {
    // 1. Hook into Motia Stream (Real-time updates)
    const { data: liveMessages } = useStreamGroup({
        streamName: "chatMessage",
        groupId: roomId
    });
    useEffect(() => {
        console.log("New chat input:", chat);
    console.log("this live ", liveMessages)
    }, [chat]);
    return(
        <>
        {liveMessages.length === 0 && (
                            <p className="text-gray-500">No messages yet</p>
                        )}

                        {/* 3. Render the live stream data */}
                        {liveMessages.map(msg => (
                            <div key={msg.id} className="mb-2">
                                <span className="font-bold">[{msg.timestamp}] {msg.sender}: </span>
                                <span>{msg.message}</span>
                            </div>
                        ))}
        </>
    );
}
import Roombar from "./rooms/roombar";
import RoomList from "./roomtabel/RoomList";
import { useState, useEffect } from "react";
import Loaderpop from "../../popModel/LoaderModel";

export default function DashboardRoom() {
  const [trigger, setTrigger] = useState(false);
  const [hasName, setHasName] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem("myUsername");
    
    if (savedName && savedName.trim() !== "") {
      setHasName(true);
    } else {
      setHasName(false);
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  if (!hasName) {
    return (
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex flex-1 gap-2">
            <div className="h-full w-full p-4 rounded-lg bg-gray-100 dark:bg-neutral-800 flex flex-col items-center justify-center">
              <h1 className="text-xl font-bold text-red-500">Access Denied</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Please go to **Settings** and set your username to access this panel. 
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                after fill name click join and wait for 5 seconds setting username refresh the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <Roombar function={trigger} sefunction={setTrigger} />
          <div className="flex flex-1 gap-2">
            <div className="h-full w-full p-4 rounded-lg bg-gray-100 dark:bg-neutral-800">
              <RoomList function={trigger} sefunction={setTrigger} />
            </div>
          </div>
        </div>
      </div>
      <Loaderpop isOpen={trigger} onClose={() => setTrigger(false)} />
    </>
  );
}

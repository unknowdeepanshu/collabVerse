import { useState, useEffect } from "react";
import { Sidebar, SidebarBody ,SidebarLink} from "@/components/ui/sidebar";
import {IconSettings,IconBrandTabler} from "@tabler/icons-react";

import { motion } from "motion/react";

export default function Show() {
    
      let [room, setRoom] = useState(true);
    const links = [
    {
      label: "Dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },];
    
      const [open, setOpen] = useState(false);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Lock size when it reaches 2037 x 966
      if (newWidth >= 2037 && newHeight >= 966) {
        setSize({
          width: 2037,
          height: 966,
        });
        setIsLocked(true);
      } else {
        setSize({
          width: newWidth,
          height: newHeight,
        });
        setIsLocked(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);
    return (
<>
{size.width < 1810 || size.height < 858 ? (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-xl">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">need big size like 1810 x 858</p>
    </div>
  </div>
) : null}
<div  
      className={`flex `}>
    <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              <SidebarLink
                className={!room ? true : "bg-regal-whitedark"}
                onClick={() => setRoom(true)}
                link={links[0]}
              />
              <SidebarLink
                className={room ? false : "bg-regal-whitedark"}
                onClick={() => setRoom(false)}
                link={links[1]}
              />
            </div>
          </div>
          <div>
          </div>
        </SidebarBody>
</Sidebar>


<div 
  style={isLocked ? { width: "1810px", height: "858px", overflow: "auto" } : {}}
  className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 h-screen"
>
 <div className="flex flex-1 min-h-0">
    <div className="
        flex flex-1 flex-col
        gap-2
        rounded-tl-2xl
        border border-neutral-200
        bg-white
        p-2 md:p-6 lg:p-8
        dark:border-neutral-700
        dark:bg-neutral-900
        min-h-0
        min-w-0
      ">
        <div className="flex flex-1 min-h-0 min-w-0">
            <div className="
            flex-1
            rounded-lg
            bg-gray-100
            dark:bg-neutral-800
            animate-pulse
            min-h-0
            min-w-0
          ">
            </div>

        </div>
      </div>
 </div>
</div>

<Sidebar 
open={open} setOpen={setOpen} animate={false}>
    <SidebarBody className="justify-between gap-10">
          
    </SidebarBody>
</Sidebar>

</div>
</>
 );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        collabVerse
      </motion.span>
    </a>
  );
};
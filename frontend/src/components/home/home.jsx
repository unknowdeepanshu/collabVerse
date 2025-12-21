import React from "react";
import { Link } from "react-router-dom";
import { SignInButton } from '@clerk/clerk-react'

export default function Home() {

    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16 flex items-center">
                    <div className="flex-1 px-6 sm:px-16 z-10">
                        <h2 className="text-4xl font-bold sm:text-5xl mb-6">
                            Welcome to collabVerse
                        </h2>
                        <p> Collaborate and play games in a shared virtual space. </p>
                        <p>(but still in testing phase)</p>
                        {/* <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/login" */}
                        {/* > */}
                           <SignInButton className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75">
        
                            &nbsp; Let's Play &nbsp; 
                            
                            </SignInButton>
                        {/* </Link> */}
                    </div>
                    

                <div className="flex-1" >

                    <img 
                        src="/logo/home.png"
                        className="h-96 max-w-fit"
                        alt="Logo"
                    />
                </div>
            </aside>

        </div>
    );
}

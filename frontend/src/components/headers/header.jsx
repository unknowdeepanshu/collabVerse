import React from "react";
import { Link ,NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'

export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo/logo.png"
                            className="h-24 w-32"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <SignedOut>
                            <SignInButton className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"/>
                        </SignedOut>
                        <SignedIn  >
                            
                            <UserButton />
                        </SignedIn>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                    to="/about"
                                >
                                 About
                                </NavLink>
                            </li>
                            <SignedIn  >
                                <li>
                                    <NavLink
                                        className={({isActive}) =>
                                            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"  } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                        to="/dashboard"
                                    >
                                    Dashboard
                                    </NavLink>
                                </li>
                            </SignedIn>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}


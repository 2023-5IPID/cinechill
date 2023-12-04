import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';
import DarkModeLayout from '../components/DarkmodeLayout';

export default function DefaultLayout() {
    const { user, setUser, isDarkMode } = useAuth();

    // if user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // if user is admin, redirect to admin page
    if (user.is_admin == 1){
        return <Navigate to="/admin" />;
    }

    // logout user
    const handleLogout = async () => {
        try {
            const resp = await axios.post('/logout');
            if (resp.status === 204) {
                localStorage.removeItem('user');
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <nav className="bg-gray border-gray-200 px-2 sm:px-4 py-2.5 bg-[#F3C677] dark:bg-black">
                <div className="container flex flex-wrap items-center justify-between mx-auto">


                    <DarkModeLayout /> { }


                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-[gray-500] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 md:bg-white bg-gray-800 md:dark:bg-black md:bg-[#F3C677] border-gray-700">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'block py-2 pl-3 pr-4 text-black  dark:text-white bg-[#780000] rounded md:bg-transparent md:text-black md:p-0 text-white'
                                            : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 text-[#003049] dark:text-[#780000] md:hover:text- md:dark:hover:text-white'
                                    }>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'block py-2 pl-3 pr-4 text-black  dark:text-white bg-[#780000] rounded md:bg-transparent md:text-black md:p-0 text-black'
                                            : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 text-[#003049] dark:text-[#780000] md:hover:text-black md:dark:hover:text-white'
                                    }>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'block py-2 pl-3 pr-4 text-black  dark:text-white bg-[#780000] rounded md:bg-transparent md:text-black md:p-0 text-white'
                                            : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 text-[#003049] dark:text-[#780000] md:hover:text-black md:dark:hover:text-white'
                                    }>
                                    A propos
                                </NavLink>
                            </li>


                            <li>
                                <a
                                    onClick={handleLogout}
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 text-[#003049] dark:text-[#780000] md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:dark:hover:text-white">
                                    Déconnexion
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="mx-auto container flex justify-center items-center mt-10 ">
                <Outlet />
            </main>

        </>
    );
}
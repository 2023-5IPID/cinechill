import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';
import DarkModeLayout from '../components/DarkmodeLayout';

export default function AdminLayout() {
    const { user, setUser, isDarkMode } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    // is user admin
    if (user.is_admin != 1){
        window.location.href = '/profile';
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
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 md:bg-white bg-gray-800 md:dark:bg-black md:bg-[#F3C677] border-gray-700">
                            <li>
                                <a
                                    onClick={handleLogout}
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 text-[#003049] dark:text-[#780000] md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:dark:hover:text-white">
                                    Se deconnecter
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
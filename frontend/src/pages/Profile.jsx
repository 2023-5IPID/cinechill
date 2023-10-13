import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
    const { user } = useAuth();
    return (
        <>

            <div className="text-6xl font-bold text-slate-600">Votre Profil</div>
            <hr className="bg-slate-400 h-1 w-full my-4" />
            <div className="block p-10 bg-white dark:bg-gray-700 border border-gray-800 dark:border-gray-700 shadow-xl rounded-lg shadowdark:border-gray-700">
                <h5 className="my-2 text-2xl font-bold tracking-tight dark:text-white">
                    Name: {user.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-200">Email: {user.email}</p>
                <p className="font-normal text-gray-700 dark:text-gray-200">
                    Created At: {user.created_at}
                </p>

            </div>
            <div className="h-screen  container flex justify-center flex-col">
            </div>

        </>
    );
}
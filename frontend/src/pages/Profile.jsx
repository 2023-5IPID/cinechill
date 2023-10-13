import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
    const { user } = useAuth();
    return (
        <>
            <div className="dark:bg-gray-900 dark:text-white">
                <div className="text-6xl font-bold text-slate-600">User Profile</div>
                <hr className="bg-slate-400 h-1 w-full my-4" />
                <div className="block p-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg shadowdark:border-gray-700">
                    <h5 className="my-2 text-2xl font-bold tracking-tight dark:text-white">
                        Name: {user.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Email: {user.email}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Created At: {user.created_at}
                    </p>
                </div>
            </div>

        </>
    );
}
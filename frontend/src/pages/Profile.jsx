import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
    const { user } = useAuth();


    const purchaseHistory = [
        { id: 1, date: new Date().toISOString(), film: 'Film 1', price: 10, numberOfSeats: 2 },
        { id: 2, date: new Date().toISOString(), film: 'Film 2', price: 12, numberOfSeats: 1 },
        { id: 3, date: new Date().toISOString(), film: 'Film 3', price: 8, numberOfSeats: 3 },
    ];

    return (
        <div className="mx-auto max-w-screen-md mt-10 p-8  border dark:border-gray-700 shadow-xl rounded-lg">
            <h1 className="text-4xl font-bold text-slate-600 dark:text-white mb-4">Votre Profil</h1>
            <hr className="border-t border-slate-400 dark:border-gray-600 mb-4" />
            <div>
                <h5 className="text-xl font-bold tracking-tight dark:text-white mb-2">
                    Nom : {user.name}
                </h5>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Email : {user.email}</p>
                <p className="text-gray-700 dark:text-gray-300">
                    Créé le : {new Date(user.created_at).toLocaleDateString()}
                </p>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold dark:text-white mb-4">Historique d'achat de billets de cinéma</h2>
                <table className="min-w-full border dark:border-gray-700">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="border dark:border-gray-700 py-2 px-4">Date de la séance</th>
                            <th className="border dark:border-gray-700 py-2 px-4">Film</th>
                            <th className="border dark:border-gray-700 py-2 px-4">Prix</th>
                            <th className="border dark:border-gray-700 py-2 px-4">Nombre de places</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseHistory.map((purchase) => (
                            <tr key={purchase.id}>
                                <td className="border dark:border-gray-700 py-2 px-4">
                                    {new Date(purchase.date).toLocaleDateString()}
                                </td>
                                <td className="border dark:border-gray-700 py-2 px-4">{purchase.film}</td>
                                <td className="border dark:border-gray-700 py-2 px-4">{purchase.price}</td>
                                <td className="border dark:border-gray-700 py-2 px-4">{purchase.numberOfSeats}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




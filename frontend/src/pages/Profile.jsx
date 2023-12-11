import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import axios from '../axios';

export default function Profile() {
    const { user } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    function ErrorDisplay({ error, onClose }) {
        return (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                <p>{error}</p>
            </div>
        );
      }

    useEffect(() => {
        axios.get(`/reservation/where/${user.id}`).then((response) => {
            setReservations(response.data.reservation);
            setLoading(false);
        }).catch((error) => {
            setError('probléme lors du chargement des reservation');
            setLoading(false);
        });
      }, []);

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
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : reservations.length === 0 ? (
                    <ErrorDisplay error="Aucune reservation effectuée" />
                ) : (
                    <table className="min-w-full border dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="border dark:border-gray-700 py-2 px-4">Date de la séance</th>
                                <th className="border dark:border-gray-700 py-2 px-4">Film</th>
                                <th className="border dark:border-gray-700 py-2 px-4">places</th>
                                <th className="border dark:border-gray-700 py-2 px-4">Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td className="border dark:border-gray-700 py-2 px-4">{reservation.film_salle.horraire}</td>
                                    <td className="border dark:border-gray-700 py-2 px-4">{reservation.film_salle.film.titre}</td>
                                    <td className="border dark:border-gray-700 py-2 px-4">{reservation.nb_places}</td>
                                    <td className="border dark:border-gray-700 py-2 px-4">{(reservation.nb_places * 8.5)} €</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};




import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
    const { setUser, csrfToken } = useAuth();
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    // login user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        const body = {
            email: email.value,
            password: password.value,
        };
        await csrfToken();
        try {
            const resp = await axios.post('/login', body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                navigate('/profile');
            }
        } catch (error) {
            if (error.response.status === 401) {
                setError(error.response.data.message);
            }
        }
    };

    return (




        <section className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url('../src/assets/b-gauth.png')` }}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <section className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <img
                            className=" h-20 mr-1 mb-10"
                            src="../src/assets/LogoRed.png"
                            alt="logo"
                        />


                        <div className="w-full bg-white rounded-lg shadow-xl border md:mt-0 sm:max-w-md xl:p-0 bg-black border-black">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  bg-black border-black">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                                    Connectez-vous à votre compte
                                </h1>

                                {error && (
                                    <div
                                        className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 bg-gray-800 text-red-400 border-red-800"
                                        role="alert">
                                        <svg
                                            aria-hidden="true"
                                            className="flex-shrink-0 inline w-5 h-5 mr-3"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>{error}</div>
                                    </div>
                                )}

                                <form
                                    className="space-y-4 md:space-y-6"
                                    action="#"
                                    method="post"
                                    onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 text-white">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="name@ifosup.wavre.be"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 text-white">
                                            Mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                        Se connecter
                                    </button>

                                    <p className="text-sm font-light text-gray-500 text-gray-400">
                                        Vous n'avez pas encore de compte?{' '}
                                        <Link
                                            to="/register"
                                            className="font-medium text-primary-600 hover:underline text-primary-500">
                                            S'inscrire
                                        </Link>
                                    </p>
                                    <p className="text-sm font-light text-gray-500 text-gray-400">
                                        il faudra un bouton admin {' '}
                                        <Link
                                            to="/film"
                                            className="font-medium text-primary-600 hover:underline text-primary-500">
                                            voir les films
                                        </Link>
                                    </p>
                                </form>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>




    );
}
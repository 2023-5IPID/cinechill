import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
    const { setUser } = useAuth();
    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    // register user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = e.target.elements;
        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: cpassword.value,
        };
        try {
            const resp = await axios.post('/register', body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/profile" />;
            }
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
                if (error.response.data.errors.name) {
                    setNameError(error.response.data.errors.name[0]);
                } else {
                    setNameError('');
                }
                if (error.response.data.errors.email) {
                    setEmailError(error.response.data.errors.email[0]);
                } else {
                    setEmailError('');
                }
                if (error.response.data.errors.password) {
                    setPasswordError(error.response.data.errors.password[0]);
                } else {
                    setPasswordError('');
                }
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
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                                    Créer un compte
                                </h1>
                                <form
                                    className="space-y-4 md:space-y-6"
                                    action="#"
                                    method="post"
                                    onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 text-white">
                                            Nom et prénom
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Jhone Doe"
                                            required
                                        />
                                        {nameError && (
                                            <p className="text-sm text-red-600">{nameError}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 text-white">
                                            Votre email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                        {emailError && (
                                            <p className="text-sm text-red-600">{emailError}</p>
                                        )}
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
                                        {passwordError && (
                                            <p className="text-sm text-red-600">{passwordError}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="cpassword"
                                            className="block mb-2 text-sm font-medium text-gray-900 text-white">
                                            Confirmer mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="cpassword"
                                            id="cpassword"
                                            placeholder="••••••••"
                                            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                        Créer un compte
                                    </button>
                                    <p className="text-sm font-light text-gray-500 text-gray-400">
                                        Vous avez déjà un compte?{' '}
                                        <Link
                                            to="/"
                                            className="font-medium text-primary-600 hover:underline text-primary-500">
                                            Connectez-vous ici
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
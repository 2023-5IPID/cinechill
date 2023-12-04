import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
import Film from './pages/Film';
import UpdateFilm from './pages/UpdateFilm';
import PresentationFilm from './pages/PresentationFilm';
import Admin from './pages/Admin';
import AdminLayout from './components/AdminLayout';
import AuthLayout from './components/AuthLayout';



const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/film',
                element: <Film />,
            },
            {
                path: '/update/:id',
                element: <UpdateFilm />,
            },
            {
                path: '/presentationFilm/:id',
                element: <PresentationFilm />,
            },
            
        ],
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/Admin',
                element: <Admin />,
            },
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ],
    },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import GuestLayout from './components/GuestLayout';
import ForgotPassword from './pages/ForgotPassword';

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/forget-password',
                element: <ForgotPassword />,
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
]);

export default router;
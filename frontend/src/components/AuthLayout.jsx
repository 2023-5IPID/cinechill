import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';
import DarkModeLayout from '../components/DarkmodeLayout';

export default function AdminLayout() {
    const { user, setUser, isDarkMode } = useAuth();

    return (
        <>
            <Outlet />
        </>
    );
}
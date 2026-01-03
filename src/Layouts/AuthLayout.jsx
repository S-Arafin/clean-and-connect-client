import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';

const AuthLayout = () => {
    return (
        <div className="bg-base-200 min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex justify-center items-center py-10 px-4">
                <Outlet />
            </div>
            <ToastContainer className="text-primary" position="top-center" />
        </div>
    );
};

export default AuthLayout;
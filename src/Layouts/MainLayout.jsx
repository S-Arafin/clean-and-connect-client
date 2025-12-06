import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';


const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <div className="flex-grow min-h-[calc(100vh-300px)]">
                <Outlet />
            </div>
            <Footer />
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default MainLayout;
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const RootLayout = () => {
    return (
        <div className="min-h-screen ">
            <Navbar />
            <main>
                <Outlet></Outlet>
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
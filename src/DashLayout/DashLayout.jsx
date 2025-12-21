import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Components/DashboardComponents/Aside/Aside.jsx'

const DashLayout = () => {
    return (
        <div className='flex bg-slate-50 min-h-screen'>
            <Aside />
            <main className='flex-1 p-8 overflow-y-auto'>
                <Outlet />
            </main>
        </div>
    );
};

export default DashLayout;
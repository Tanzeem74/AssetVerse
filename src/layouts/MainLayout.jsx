import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <header><Navbar></Navbar></header>
            <div className='container mx-auto'>
                <Outlet></Outlet>
            </div>
            <footer><Footer></Footer></footer>
        </div>
    );
};

export default MainLayout;
import React from 'react';
import Navbar from '../components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer';

const AuthLayout = () => {
    return (
        <div>
            <header><Navbar></Navbar></header>
            <div>
                <Outlet></Outlet>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;
import React from 'react';
import Navbar from '../components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer';
import authImg from '../assets/images.jpg';

const AuthLayout = () => {
    return (
        <div>
            <header><Navbar></Navbar></header>
            <div className='container mx-auto flex gap-5 my-8 items-center'>
                <Outlet></Outlet>
                <img src={authImg} alt="" />
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;
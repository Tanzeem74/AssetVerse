import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; 
import { Link } from 'react-router';

const Hero = () => {
    return (
        <div className="carousel w-full min-h-[85vh]">
            <div id="slide1" className="carousel-item relative w-full flex items-center justify-center bg-linear-to-r from-blue-50 to-indigo-100">
                <div className="text-center max-w-4xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Efficient Asset Management <br /> <span className="text-primary">for HR Managers</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                            Track company assets, manage team limits, and streamline your workflow with AssetVerse.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/auth/signup-hr" className="btn btn-primary btn-lg px-8 shadow-lg">
                                Join as HR Manager
                            </Link>
                            <Link to="/auth/login" className="btn btn-outline btn-primary btn-lg px-8">
                                Login
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle btn-ghost">❮</a> 
                    <a href="#slide2" className="btn btn-circle btn-ghost">❯</a>
                </div>
            </div> 
            <div id="slide2" className="carousel-item relative w-full flex items-center justify-center bg-linear-to-r from-indigo-50 to-purple-100">
                <div className="text-center max-w-4xl px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Track Your Assigned <br /> <span className="text-secondary">Work Equipment</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                            Easily request assets from your HR and keep track of your assigned devices in one place.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/auth/signup-user" className="btn btn-secondary btn-lg px-8 shadow-lg">
                                Join as Employee
                            </Link>
                            <Link to="/auth/login" className="btn btn-outline btn-secondary btn-lg px-8">
                                Login
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle btn-ghost">❮</a> 
                    <a href="#slide1" className="btn btn-circle btn-ghost">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Hero;
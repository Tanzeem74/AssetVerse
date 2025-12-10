import React from 'react';
import { motion } from "framer-motion"; 
import { Link } from 'react-router';

const Hero = () => {
    return (
        <div>
            <section className="min-h-[80vh] bg-base-200 flex items-center justify-center">
                <motion.div
                    className="text-center max-w-3xl px-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-5xl font-bold mb-4">AssetVerse</h1>

                    <p className="text-gray-600 text-lg">
                        Smart Asset & Employee Management Platform for Modern Organizations.
                    </p>

                    <motion.div
                        className="flex justify-center gap-4 mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link to="/auth/login" className="btn btn-primary">Login</Link>
                        <Link to="/auth/signup-user" className="btn btn-outline btn-primary">Register</Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default Hero;
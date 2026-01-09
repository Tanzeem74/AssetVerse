import React from 'react';
import { Github, X, Mail } from "lucide-react";
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-gray-600 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Company Info */}
                <div className="space-y-3">
                    <h2 className="font-bold text-2xl text-[#4F46E5]">AssetVerse</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        AssetVerse is a comprehensive digital platform that helps companies efficiently manage
                        their physical assets (laptops, keyboards, chairs, etc.) and track which employee has
                        which equipment. It solves the common problem of companies losing track of valuable
                        assets and streamlines the entire asset management process.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Quick Links</h3>
                    <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                        <li><Link to='/' className="hover:text-blue-500">Home</Link></li>
                        <li><Link  className="hover:text-blue-500">Join as Employee</Link></li>
                        <li><Link  className="hover:text-blue-500">Join as HR</Link></li>
                        <li><Link  className="hover:text-blue-500">Contact</Link></li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Connect & Legal</h3>
                    <div className="flex items-center space-x-4">
                        <a href='https://www.facebook.com/' target='_blank'><FaFacebook></FaFacebook></a>
                        <a href='https://www.linkedin.com/' target='_blank'><FaLinkedin></FaLinkedin></a>
                        <a href='https://x.com/' target='_blank'><FaX></FaX></a>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3 text-gray-500 dark:text-gray-400 text-xs">
                        <a href="/terms" className="hover:underline">Terms & Conditions</a>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="/contact" className="hover:underline">Contact</a>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                © 2025 AssetVerse. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
import React, { useState } from 'react';
import { ChevronDown } from "lucide-react";
import { Link } from 'react-router';
import logoImg from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    console.log(role);
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <nav className="bg-white shadow-md">
            <div className="navbar max-w-7xl mx-auto px-4 py-3">
                <div className="navbar-start">
                    <Link to="/" className="text-2xl font-bold text-blue-500"><img className='w-16 h-13 rounded-2xl' src={logoImg} alt="" /></Link>
                </div>
                <div className="navbar-center">
                    <Link to='/' className='font-bold text-2xl text-[#4F46E5]'>AssetVerse</Link>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2"
                                >
                                    <img
                                        src={user?.photoURL}
                                        alt=""
                                        className="w-8 h-8 rounded-full border"
                                    />
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {role === 'hr' && isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                        <Link
                                            to="/dashboard/profile"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>

                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            to="/my-model"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700eam dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Asset List
                                        </Link>

                                        <Link
                                            to="/purchases"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Add Asset
                                        </Link>
                                        <Link
                                            to="/purchases"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            All Requests
                                        </Link>
                                        <Link
                                            to="/purchases"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Employee List
                                        </Link>

                                        <button
                                            onClick={handleLogOut}
                                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                                {role === 'employee' && isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                        <Link
                                            to="/dashboard/profile"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>

                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            to="/my-model"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700eam dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            My Assets
                                        </Link>

                                        <Link
                                            to="/purchases"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            My Team
                                        </Link>
                                        <Link
                                            to="/purchases"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Request Asset
                                        </Link>

                                        <button
                                            onClick={handleLogOut}
                                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                                
                            </div>
                        ) : (
                            <div className='flex gap-2'>
                                <Link
                                    to="/auth/login"
                                    className=" hover:bg-blue-400 text-black px-4 py-2 rounded-lg font-medium shadow-md"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/auth/signup-user"
                                    className=" hover:bg-blue-400 text-black px-4 py-2 rounded-lg font-medium shadow-md"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
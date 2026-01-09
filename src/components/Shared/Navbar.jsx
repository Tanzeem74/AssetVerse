import React, { useEffect, useState } from 'react';
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { Link, NavLink } from 'react-router';
import logoImg from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    console.log(role);
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }
    const publicLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500 text-base-content "}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500 text-base-content"}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "hover:text-blue-500 text-base-content"}>Contact</NavLink></li>
        </>
    );
    const authenticatedLinks = (
        <>
            <li><NavLink to="/" className="hover:text-blue-500 text-base-content">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-blue-500 text-base-content">About Us</NavLink></li>
            {role === 'hr' ? (
                <>
                    <li><NavLink to="/dashboard/add-assets" className="hover:text-blue-500 text-base-content">Add Asset</NavLink></li>
                    <li><NavLink to="/dashboard/all-requests" className="hover:text-blue-500 text-base-content ">Requests</NavLink></li>
                </>
            ) : (
                <>
                    <li><NavLink to="/dashboard/my-assets" className="hover:text-blue-500 text-base-content">My Assets</NavLink></li>
                    <li><NavLink to="/dashboard/request-asset" className="hover:text-blue-500 text-base-content">Request Asset</NavLink></li>
                </>
            )}
            <li><NavLink to="/dashboard" className="hover:text-blue-500 text-base-content">Dashboard</NavLink></li>
        </>
    );
    return (
        <nav className="bg-base-100 shadow-md">
            <div className="navbar max-w-7xl mx-auto px-4 py-3">
                <div className="navbar-start space-x-2">
                    <Link to="/" className="text-2xl font-bold text-blue-500"><img className='w-16 h-13 rounded-2xl' src={logoImg} alt="" /></Link>
                    <Link to='/' className='font-bold text-2xl text-[#4F46E5]'>AssetVerse</Link>
                </div>
                <div className="navbar-center">
                    <ul className="flex space-x-6 font-medium dark:text-gray-200">
                        {user ? authenticatedLinks : publicLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center space-x-4">
                        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
                            <input type="checkbox" onChange={(e) => handleTheme(e.target.checked)} checked={theme === "dark"} />
                            <Sun className="swap-on w-5 h-5 text-yellow-500" />
                            <Moon className="swap-off w-5 h-5 text-slate-700" />
                        </label>

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
                                            to="/dashboard/assets-list"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700eam dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Asset List
                                        </Link>

                                        <Link
                                            to="/dashboard/add-assets"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Add Asset
                                        </Link>
                                        <Link
                                            to="/dashboard/all-requests"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            All Requests
                                        </Link>
                                        <Link
                                            to="/dashboard/my-employees"
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
                                            to="/dashboard/my-assets"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700eam dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            My Assets
                                        </Link>

                                        <Link
                                            to="/dashboard/my-team"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            My Team
                                        </Link>
                                        <Link
                                            to="/dashboard/request-asset"
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
                                    className=" hover:bg-blue-400 text-base-content px-4 py-2 rounded-lg font-medium shadow-md"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/auth/signup-user"
                                    className=" hover:bg-blue-400 text-base-content px-4 py-2 rounded-lg font-medium shadow-md"
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
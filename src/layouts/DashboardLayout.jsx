import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
    const { role } = useRole();
    const { user, logOut } = useAuth();

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* MAIN CONTENT */}
            <div className="drawer-content flex flex-col">

                {/* TOP NAVBAR */}
                <nav className="navbar bg-base-300 px-4 shadow-sm">
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                        {/* Hamburger Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                            className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    <h2 className="text-xl font-semibold">Dashboard</h2>

                    <div className="ml-auto flex items-center gap-3">
                        <img src={user?.photoURL} className="w-10 h-10 rounded-full border" />
                    </div>
                </nav>

                {/* PAGE CONTENT */}
                <div className="p-4">
                    <Outlet></Outlet>
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="w-64 bg-base-200 min-h-full p-4 flex flex-col">
                    <div className="text-center mb-6">
                        <img
                            src={user?.photoURL}
                            className="w-20 h-20 rounded-full mx-auto border"
                        />
                        <h3 className="font-bold mt-2">{user?.displayName}</h3>
                        <p className="text-sm text-gray-500 uppercase">{role}</p>
                    </div>
                    <ul className="menu grow">

                        <li><NavLink to="/" end>Home</NavLink></li>

                        {/* EMPLOYEE MENU */}
                        {role === "employee" && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/my-assets">My Assets</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/request-asset">Request Asset</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-team">My Team</NavLink>
                                </li>
                            </>
                        )}

                        {/* HR MENU */}
                        {role === "hr" && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-assets">Add Asset</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-employees">My Employees</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/assets-list">Manage Assets</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/all-requests">Asset Requests</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-employee">Add Employee</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history">Payment History</NavLink>
                                </li>
                            </>
                        )}

                        {/* LOGOUT BUTTON */}
                        <li className="mt-auto">
                            <button
                                className="btn btn-error w-full text-white"
                                onClick={logOut}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
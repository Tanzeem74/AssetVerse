import React from 'react';
import { Users, Package, ShieldCheck, TrendingUp } from 'lucide-react';

const Stats = () => {
    const statsData = [
        {
            id: 1,
            label: "Total Users",
            value: "2,500+",
            icon: <Users className="w-8 h-8 text-blue-500" />,
            description: "Active employees and HRs"
        },
        {
            id: 2,
            label: "Assets Managed",
            value: "1,200+",
            icon: <Package className="w-8 h-8 text-indigo-500" />,
            description: "Computers, Chairs, and more"
        },
        {
            id: 3,
            label: "Requests Processed",
            value: "98%",
            icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
            description: "Fastest approval rate"
        },
        {
            id: 4,
            label: "Trusted Companies",
            value: "150+",
            icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
            description: "Professional organizations"
        }
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        We help businesses manage their assets efficiently with real-time tracking and automated workflows.
                    </p>
                </div>

                {/* Stats Grid - Desktop: 4 cards per row (Requirement 3) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat) => (
                        <div 
                            key={stat.id} 
                            className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center group"
                        >
                            <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
                                {stat.label}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
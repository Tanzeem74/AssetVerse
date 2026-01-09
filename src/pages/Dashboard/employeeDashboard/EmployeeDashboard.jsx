import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect } from 'react';

const EmployeeDashboard = () => {
    useEffect(() => {
        document.title = "Dashboard - Employee";
    }, []);

    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['employee-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/employee-stats');
            return res.data;
        }
    });

    if (isLoading) return (
        <div className="p-10 text-center min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-6 space-y-12 max-w-7xl mx-auto min-h-screen text-base-content transition-colors duration-300">
            
            {/* 1. Affiliation Banner */}
            {stats?.affiliation ? (
                <div className="relative overflow-hidden bg-linear-to-r from-primary to-indigo-700 p-8 md:p-12 rounded-4xl text-white shadow-2xl group">
                    {/* Decorative Background Element */}
                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        {stats.affiliation.companyLogo && (
                            <img 
                                src={stats.affiliation.companyLogo} 
                                alt="Company Logo" 
                                className="w-24 h-24 rounded-2xl border-4 border-white/20 shadow-xl bg-white/10 backdrop-blur-sm object-contain p-2" 
                            />
                        )}
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-black tracking-tight italic">
                                {stats.affiliation.companyName}
                            </h2>
                            <div className="badge badge-secondary mt-3 px-4 py-3 font-bold border-none shadow-lg">
                                Officially Affiliated Employee
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning border-none shadow-xl bg-warning/20 text-warning-content p-6 rounded-2xl flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-8 w-8" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span className="text-lg font-medium">You are not yet affiliated with any company. Please wait for HR approval.</span>
                </div>
            )}

            {/* 2. Pending Requests Grid */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-warning rounded-full"></div>
                    <h3 className="text-2xl font-black tracking-tight">My Pending Requests</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats?.pendingRequests?.map(req => (
                        <div key={req._id} className="card bg-base-100 shadow-xl border border-base-300 hover:border-warning/50 transition-all duration-300 overflow-hidden group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-bold text-xl group-hover:text-warning transition-colors">{req.assetName}</h4>
                                    <div className="badge badge-warning badge-sm animate-pulse">Pending</div>
                                </div>
                                <div className="flex items-center gap-2 text-sm opacity-60">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    Requested: {new Date(req.requestDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                    {stats?.pendingRequests?.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300 opacity-50">
                            <p className="text-xl italic font-medium">No pending requests at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 3. Monthly Activity Table */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-primary rounded-full"></div>
                    <h3 className="text-2xl font-black tracking-tight">Requests Made This Month</h3>
                </div>
                
                <div className="overflow-hidden bg-base-100 rounded-4xl shadow-2xl border border-base-300 transition-all">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200/50 text-base-content/70">
                                <tr>
                                    <th className="py-5 pl-8 uppercase tracking-widest text-[11px] font-bold">Asset Name</th>
                                    <th className="uppercase tracking-widest text-[11px] font-bold">Request Date</th>
                                    <th className="uppercase tracking-widest text-[11px] font-bold">Current Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {stats?.monthlyRequests?.length > 0 ? (
                                    stats.monthlyRequests.map(req => (
                                        <tr key={req._id} className="hover:bg-base-200/30 transition-colors group">
                                            <td className="pl-8 py-5">
                                                <span className="font-bold text-base group-hover:text-primary transition-colors">{req.assetName}</span>
                                            </td>
                                            <td className="opacity-70 font-medium">
                                                {new Date(req.requestDate).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <span className={`badge font-bold px-4 py-3 capitalize ${
                                                    req.requestStatus === 'approved' ? 'badge-success text-white' : 
                                                    req.requestStatus === 'rejected' ? 'badge-error text-white' : 
                                                    'badge-ghost'
                                                }`}>
                                                    {req.requestStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-10 opacity-50">
                                            No activity recorded for this month.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EmployeeDashboard;
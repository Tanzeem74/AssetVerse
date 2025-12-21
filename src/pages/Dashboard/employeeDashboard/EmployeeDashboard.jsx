import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const EmployeeDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['employee-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/employee-stats');
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-6 space-y-10">
            {stats?.affiliation ? (
                <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-8 rounded-2xl text-white shadow-xl">
                    <div className="flex items-center gap-6">
                        {/* <img src={stats.affiliation.companyLogo} alt="Logo" className="w-20 h-20 rounded-full border-4 border-white/30" /> */}
                        <div>
                            <h2 className="text-3xl font-bold italic">{stats.affiliation.companyName}</h2>
                            <p className="text-blue-100 mt-1">Officially Affiliated Employee</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning shadow-lg">
                    <span>You are not yet affiliated with any company. Please wait for HR approval.</span>
                </div>
            )}
            <section>
                <h3 className="text-2xl font-bold mb-4">My Pending Requests</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats?.pendingRequests?.map(req => (
                        <div key={req._id} className="card bg-base-100 shadow-md border p-4">
                            <h4 className="font-bold text-lg">{req.assetName}</h4>
                            <p className="text-sm text-gray-500">Requested on: {new Date(req.requestDate).toLocaleDateString()}</p>
                            <div className="badge badge-warning mt-2">Pending</div>
                        </div>
                    ))}
                    {stats?.pendingRequests?.length === 0 && <p className="text-gray-400">No pending requests.</p>}
                </div>
            </section>
            <section>
                <h3 className="text-2xl font-bold mb-4">Requests Made This Month</h3>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>Asset</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.monthlyRequests?.map(req => (
                                <tr key={req._id}>
                                    <td>{req.assetName}</td>
                                    <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                    <td><span className="badge badge-ghost capitalize">{req.requestStatus}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default EmployeeDashboard;
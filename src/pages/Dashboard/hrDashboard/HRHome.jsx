import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const HRHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['hr-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/hr-stats');
            return res.data;
        }
    });

    const COLORS = ['#0088FE', '#00C49F'];

    if (isLoading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-3xl font-bold">HR Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="stat bg-white shadow-md border rounded-xl">
                    <div className="stat-title">Total Requests</div>
                    <div className="stat-value text-primary">{stats?.totalRequests || 0}</div>
                </div>
                <div className="stat bg-white shadow-md border rounded-xl">
                    <div className="stat-title">Pending Requests</div>
                    <div className="stat-value text-warning">{stats?.pendingRequests?.length || 0}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <h3 className="text-xl font-semibold mb-4">Asset Type Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats?.pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {stats?.pieData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Pending Requests Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <h3 className="text-xl font-semibold mb-4">Recent Pending Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th>Asset</th>
                                    <th>Employee</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.pendingRequests?.map(req => (
                                    <tr key={req._id}>
                                        <td>{req.assetName}</td>
                                        <td>{req.requesterEmail}</td>
                                        <td><span className="badge badge-warning text-white">Pending</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {stats?.pendingRequests?.length === 0 && <p className="text-center py-4">No pending requests!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRHome;
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
        <div className="p-6 space-y-8 text-base-content">
            <h2 className="text-3xl font-bold">HR Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="stat bg-base-100 shadow-md border border-base-300 rounded-xl">
                    <div className="stat-title text-base-content/70">Total Requests</div>
                    <div className="stat-value text-primary">{stats?.totalRequests || 0}</div>
                </div>
                <div className="stat bg-base-100 shadow-md border border-base-300 rounded-xl">
                    <div className="stat-title text-base-content/70">Pending Requests</div>
                    <div className="stat-value text-warning">{stats?.pendingRequests?.length || 0}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300">
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
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--fallback-b1,oklch(var(--b1)))', color: 'var(--fallback-bc,oklch(var(--bc)))', border: '1px solid var(--fallback-b3,oklch(var(--b3)))' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                
                <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300">
                    <h3 className="text-xl font-semibold mb-4">Recent Pending Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="text-base-content">
                                    <th>Asset</th>
                                    <th>Employee</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-base-content/80">
                                {stats?.pendingRequests?.map(req => (
                                    <tr key={req._id} className="border-base-300">
                                        <td>{req.assetName}</td>
                                        <td>{req.requesterEmail}</td>
                                        <td><span className="badge badge-warning text-white font-medium">Pending</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {stats?.pendingRequests?.length === 0 && <p className="text-center py-4 text-base-content/60">No pending requests!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRHome;
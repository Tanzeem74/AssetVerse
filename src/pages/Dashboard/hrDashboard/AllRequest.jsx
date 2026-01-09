import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../ExtraPage/Loading';

const AllRequest = () => {
    useEffect(() => {
            document.title = "All Request - page";
        }, []);
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const { data: requests = [], refetch, isLoading } = useQuery({
        queryKey: ['all-requests', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-requests?search=${search}`);
            return res.data;
        }
    });
    const handleApprove = async (id) => {
        try {
            const res = await axiosSecure.patch(`/requests/approve/${id}`);
            if (res.data.success) {
                toast.success("Request Approved Successfully!");
                refetch();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Approval Failed");
        }
    };
    const handleReject = async (id) => {
        try {
            await axiosSecure.patch(`/requests/reject/${id}`);
            toast.success("Request Rejected");
            refetch();
        } catch (err) {
            toast.error("Failed to reject",err);
        }
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className="p-6 text-base-content min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-primary">All Asset Requests</h2>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by Employee Name or Email..."
                    className="input input-bordered w-full max-w-md bg-base-100 focus:outline-primary"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg border border-base-300">
                <table className="table w-full">
                    {/* Header with theme-aware background */}
                    <thead className="bg-base-200 text-base-content">
                        <tr>
                            <th className="py-4">Employee</th>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 opacity-60">
                                    No asset requests found.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id} className="hover:bg-base-200/50 border-b border-base-200">
                                    <td>
                                        <div className="font-bold text-base-content">{req.requesterName}</div>
                                        <div className="text-xs opacity-60">{req.requesterEmail}</div>
                                    </td>
                                    <td className="font-medium">{req.assetName}</td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">{req.assetType}</span>
                                    </td>
                                    <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge font-semibold ${
                                            req.requestStatus === 'pending' ? 'badge-warning' :
                                            req.requestStatus === 'approved' ? 'badge-success' : 'badge-error'
                                        } text-white`}>
                                            {req.requestStatus}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            {req.requestStatus === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(req._id)}
                                                        className="btn btn-xs btn-success text-white px-3"
                                                    > Approve </button>
                                                    <button
                                                        onClick={() => handleReject(req._id)}
                                                        className="btn btn-xs btn-error text-white px-3"
                                                    > Reject </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequest;
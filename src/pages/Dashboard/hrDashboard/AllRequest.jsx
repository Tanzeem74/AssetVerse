import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../ExtraPage/Loading';

const AllRequest = () => {
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
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">All Asset Requests</h2>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by Employee Name or Email..."
                    className="input input-bordered w-full max-w-md"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Employee</th>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td>
                                    <div className="font-bold">{req.requesterName}</div>
                                    <div className="text-sm opacity-50">{req.requesterEmail}</div>
                                </td>
                                <td>{req.assetName}</td>
                                <td>{req.assetType}</td>
                                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                <td>
                                    <span className={`badge ${req.requestStatus === 'pending' ? 'badge-warning' :
                                            req.requestStatus === 'approved' ? 'badge-success' : 'badge-error'
                                        }`}>
                                        {req.requestStatus}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {req.requestStatus === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(req._id)}
                                                className="btn btn-xs btn-success text-white"
                                            > Approve </button>
                                            <button
                                                onClick={() => handleReject(req._id)}
                                                className="btn btn-xs btn-error text-white"
                                            > Reject </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequest;
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const MyAssets = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const { data: myRequests = [], refetch, isLoading } = useQuery({
        queryKey: ['my-requests', search, filterStatus],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-requests?search=${search}&status=${filterStatus}`);
            return res.data;
        }
    });

    const handleCancel = async (id) => {
        if (window.confirm("Are you sure you want to cancel this request?")) {
            try {
                await axiosSecure.delete(`/requests/cancel/${id}`);
                toast.success("Request cancelled successfully");
                refetch();
            } catch (err) {
                toast.error("Failed to cancel request", err);
            }
        }
    };

    const handleReturn = async (id) => {
        try {
            await axiosSecure.patch(`/requests/return/${id}`);
            toast.success("Asset returned successfully!");
            refetch();
        } catch (err) {
            toast.error("Failed to return asset", err);
        }
    };

    const handlePrint = (request) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head><title>Asset Report - ${request.assetName}</title></head>
                <body style="padding: 50px; font-family: 'Segoe UI', sans-serif; line-height: 1.6;">
                    <div style="border: 2px solid #333; padding: 30px; border-radius: 10px;">
                        <h1 style="color: #2c3e50; text-align: center;">Asset Request Report</h1>
                        <hr style="border: 1px solid #eee; margin-bottom: 30px;"/>
                        <p><strong>Asset Name:</strong> ${request.assetName}</p>
                        <p><strong>Asset Type:</strong> ${request.assetType}</p>
                        <p><strong>Request Date:</strong> ${new Date(request.requestDate).toLocaleDateString()}</p>
                        <p><strong>Approval Date:</strong> ${request.approvalDate ? new Date(request.approvalDate).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Current Status:</strong> <span style="text-transform: capitalize;">${request.requestStatus}</span></p>
                        <p><strong>Requested By:</strong> ${request.requesterName}</p>
                        <p style="margin-top: 50px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 12px; color: #7f8c8d;">
                            Generated on: ${new Date().toLocaleString()} | AssetVerse Management System
                        </p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">My Requested Assets</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by asset name..."
                    className="input input-bordered w-full max-w-md"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="returned">Returned</option>
                </select>
            </div>
            {myRequests.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-xl text-gray-500 font-medium">No asset requests found matching your criteria.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700">
                                <th>Asset Name</th>
                                <th>Type</th>
                                <th>Request Date</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myRequests.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-50">
                                    <td className="font-semibold text-gray-800">{req.assetName}</td>
                                    <td>
                                        <span className={`badge badge-ghost ${req.assetType === 'Returnable' ? 'text-blue-600' : 'text-orange-600'}`}>
                                            {req.assetType}
                                        </span>
                                    </td>
                                    <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge capitalize p-3 ${req.requestStatus === 'approved' ? 'badge-success text-white' :
                                            req.requestStatus === 'pending' ? 'badge-warning text-white' :
                                                req.requestStatus === 'returned' ? 'badge-info text-white' : 'badge-error text-white'
                                            }`}>
                                            {req.requestStatus}
                                        </span>
                                    </td>
                                    <td className="flex justify-center gap-2">
                                        {req.requestStatus === 'pending' && (
                                            <button onClick={() => handleCancel(req._id)} className="btn btn-sm btn-error text-white">Cancel</button>
                                        )}
                                        {req.requestStatus === 'approved' && (
                                            <>
                                                <button onClick={() => handlePrint(req)} className="btn btn-sm btn-neutral">Print PDF</button>
                                                {req.assetType === 'Returnable' && (
                                                    <button
                                                        onClick={() => handleReturn(req._id)}
                                                        className="btn btn-sm btn-outline btn-primary"
                                                    >Return</button>
                                                )}
                                            </>
                                        )}
                                        {(req.requestStatus === 'returned' || req.requestStatus === 'rejected') && (
                                            <span className="text-xs text-gray-400 italic">No actions available</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAssets;
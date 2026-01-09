import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const MyAssets = () => {
    useEffect(() => {
        document.title = "My Assets - Page";
    }, []);

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
                toast.error("Failed to cancel request",err);
            }
        }
    };

    const handleReturn = async (id) => {
        try {
            await axiosSecure.patch(`/requests/return/${id}`);
            toast.success("Asset returned successfully!");
            refetch();
        } catch (err) {
            toast.error("Failed to return asset",err);
        }
    };

    const handlePrint = (request) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Asset Report - ${request.assetName}</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; padding: 40px; color: #333; }
                        .container { border: 2px solid #e2e8f0; padding: 40px; border-radius: 20px; max-width: 800px; margin: auto; }
                        .header { text-align: center; border-bottom: 2px solid #f1f5f9; margin-bottom: 30px; padding-bottom: 20px; }
                        .info-row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px lazy #f8fafc; padding-bottom: 5px; }
                        .label { font-weight: bold; color: #64748b; }
                        .status { text-transform: uppercase; font-weight: 800; color: #10b981; }
                        .footer { margin-top: 50px; font-size: 11px; color: #94a3b8; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin:0; color: #1e293b;">AssetVerse Request Report</h1>
                            <p style="color: #64748b;">Official Document for Asset Allocation</p>
                        </div>
                        <div class="info-row"><span class="label">Asset Name:</span> <span>${request.assetName}</span></div>
                        <div class="info-row"><span class="label">Asset Type:</span> <span>${request.assetType}</span></div>
                        <div class="info-row"><span class="label">Request Date:</span> <span>${new Date(request.requestDate).toLocaleDateString()}</span></div>
                        <div class="info-row"><span class="label">Approval Date:</span> <span>${request.approvalDate ? new Date(request.approvalDate).toLocaleDateString() : 'Pending'}</span></div>
                        <div class="info-row"><span class="label">Status:</span> <span class="status">${request.requestStatus}</span></div>
                        <div class="info-row"><span class="label">Employee:</span> <span>${request.requesterName}</span></div>
                        <div class="footer">
                            Generated on: ${new Date().toLocaleString()} | Digital Signature Verified
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen text-base-content">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-primary mb-2">My Requested Assets</h2>
                <p className="opacity-60">Manage your asset requests, returns, and print reports.</p>
            </header>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-base-100 p-4 rounded-2xl border border-base-300 shadow-sm">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by asset name..."
                        className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-all"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                
                <select
                    className="select select-bordered w-full max-w-xs bg-base-200/50"
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="returned">Returned</option>
                </select>
            </div>

            {myRequests.length === 0 ? (
                <div className="text-center py-20 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
                    <div className="text-6xl mb-4 opacity-20">📦</div>
                    <p className="text-xl opacity-50 font-medium">No asset requests found matching your criteria.</p>
                </div>
            ) : (
                <div className="overflow-hidden bg-base-100 rounded-2xl shadow-xl border border-base-300">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200/60 text-base-content/70">
                                <tr>
                                    <th className="py-5 pl-8 uppercase tracking-widest text-[11px] font-black">Asset Name</th>
                                    <th className="uppercase tracking-widest text-[11px] font-black">Type</th>
                                    <th className="uppercase tracking-widest text-[11px] font-black">Request Date</th>
                                    <th className="uppercase tracking-widest text-[11px] font-black">Status</th>
                                    <th className="text-center uppercase tracking-widest text-[11px] font-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {myRequests.map((req) => (
                                    <tr key={req._id} className="hover:bg-base-200/30 transition-colors group">
                                        <td className="pl-8 py-4">
                                            <span className="font-bold group-hover:text-primary transition-colors">{req.assetName}</span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm font-bold ${req.assetType === 'Returnable' ? 'badge-info bg-info/10 text-info border-info/20' : 'badge-warning bg-warning/10 text-warning border-warning/20'}`}>
                                                {req.assetType}
                                            </span>
                                        </td>
                                        <td className="opacity-70 font-medium">{new Date(req.requestDate).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge badge-md font-bold px-4 py-3 capitalize ${
                                                req.requestStatus === 'approved' ? 'badge-success text-white' :
                                                req.requestStatus === 'pending' ? 'badge-warning text-white' :
                                                req.requestStatus === 'returned' ? 'badge-info text-white' : 'badge-error text-white'
                                            }`}>
                                                {req.requestStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                {req.requestStatus === 'pending' && (
                                                    <button onClick={() => handleCancel(req._id)} className="btn btn-xs md:btn-sm btn-error btn-outline hover:text-white!">Cancel</button>
                                                )}
                                                {req.requestStatus === 'approved' && (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handlePrint(req)} className="btn btn-xs md:btn-sm btn-neutral shadow-md">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                                            Print PDF
                                                        </button>
                                                        {req.assetType === 'Returnable' && (
                                                            <button
                                                                onClick={() => handleReturn(req._id)}
                                                                className="btn btn-xs md:btn-sm btn-primary"
                                                            >Return</button>
                                                        )}
                                                    </div>
                                                )}
                                                {(req.requestStatus === 'returned' || req.requestStatus === 'rejected') && (
                                                    <span className="text-xs opacity-40 italic">Completed</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAssets;
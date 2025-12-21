import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const RequestAsset = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [note, setNote] = useState('');
    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ['available-assets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/available-assets');
            return res.data;
        }
    });

    const handleRequestSubmit = async () => {
        if (!selectedAsset) return;
        const requestData = {
            assetId: selectedAsset._id,
            assetName: selectedAsset.productName,
            assetType: selectedAsset.productType,
            hrEmail: selectedAsset.hrEmail,
            companyName: selectedAsset.companyName,
            requesterName: user?.displayName || "Employee",
            note: note
        };
        try {
            const res = await axiosSecure.post('/asset-requests', requestData);

            if (res.data.insertedId) {
                toast.success("Request sent to HR successfully!");
                setSelectedAsset(null);
                setNote('');
                refetch();
            }
        } catch (err) {
            console.error("Request Error:", err);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    if (isLoading) return <div className="text-center py-10 font-bold">Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Request an Asset</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map(asset => (
                    <div key={asset._id} className="card bg-white shadow-xl border border-gray-200">
                        <figure className="px-4 pt-4 text-center">
                            <img
                                src={asset.productImage || "https://via.placeholder.com/150"}
                                alt={asset.productName}
                                className="rounded-xl h-40 w-40 object-cover mx-auto"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-gray-800">{asset.productName}</h2>
                            <div className="flex justify-between text-sm">
                                <span className="badge badge-outline">{asset.productType}</span>
                                <span className="font-bold text-blue-600">Stock: {asset.availableQuantity}</span>
                            </div>
                            <div className="card-actions mt-4">
                                <button
                                    onClick={() => setSelectedAsset(asset)}
                                    className="btn btn-primary btn-block"
                                > Request </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedAsset && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Request for {selectedAsset.productName}</h3>
                        <p className="text-sm text-gray-500 mt-1">HR will review your request.</p>

                        <textarea
                            className="textarea textarea-bordered w-full mt-4"
                            placeholder="Add a note (optional)..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                        <div className="modal-action">
                            <button
                                onClick={handleRequestSubmit}
                                className="btn btn-success text-white"
                            > Confirm Request </button>
                            <button
                                onClick={() => { setSelectedAsset(null); setNote(''); }}
                                className="btn"
                            > Close </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestAsset;
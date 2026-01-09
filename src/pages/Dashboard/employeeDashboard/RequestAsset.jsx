import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const RequestAsset = () => {
    useEffect(() => {
        document.title = "Request Asset - Page";
    }, []);

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

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen text-base-content transition-colors duration-300">
            <header className="mb-10">
                <h2 className="text-4xl font-black text-primary mb-2">Request an Asset</h2>
                <p className="opacity-70 font-medium">Browse available items and request what you need for your workspace.</p>
            </header>

            {assets.length === 0 ? (
                <div className="text-center py-20 bg-base-200/50 rounded-[2.5rem] border-2 border-dashed border-base-300">
                    <p className="text-xl opacity-50">No assets currently available for request.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {assets.map(asset => (
                        <div key={asset._id} className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 group">
                            <figure className="px-6 pt-6">
                                <div className="relative overflow-hidden rounded-2xl bg-base-200 p-4">
                                    <img
                                        src={asset.productImage || "https://via.placeholder.com/150"}
                                        alt={asset.productName}
                                        className="h-44 w-44 object-contain mx-auto group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </figure>
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h2 className="card-title text-xl font-bold leading-tight">{asset.productName}</h2>
                                    <span className={`badge badge-sm font-bold ${asset.productType === 'Returnable' ? 'badge-info' : 'badge-neutral'}`}>
                                        {asset.productType}
                                    </span>
                                </div>
                                
                                <div className="mt-4 flex items-center justify-between bg-base-200/50 p-3 rounded-xl">
                                    <span className="text-sm opacity-70 font-medium">Available Stock</span>
                                    <span className="font-black text-primary text-lg">{asset.availableQuantity}</span>
                                </div>

                                <div className="card-actions mt-4">
                                    <button
                                        disabled={asset.availableQuantity === 0}
                                        onClick={() => setSelectedAsset(asset)}
                                        className="btn btn-primary btn-block rounded-xl font-bold shadow-lg shadow-primary/20"
                                    > 
                                        Request Item 
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Note */}
            {selectedAsset && (
                <div className="modal modal-open backdrop-blur-sm">
                    <div className="modal-box bg-base-100 border border-base-300 shadow-2xl rounded-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                                !
                            </div>
                            <div>
                                <h3 className="font-black text-2xl">Confirm Request</h3>
                                <p className="text-sm opacity-60">Requesting: {selectedAsset.productName}</p>
                            </div>
                        </div>

                        <label className="label">
                            <span className="label-text font-bold">Additional Note (Optional)</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full h-32 rounded-2xl bg-base-200 focus:bg-base-100 focus:border-primary transition-all text-base"
                            placeholder="Why do you need this asset? (e.g., Replacement for broken laptop)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>

                        <div className="modal-action gap-3">
                            <button
                                onClick={() => { setSelectedAsset(null); setNote(''); }}
                                className="btn btn-ghost rounded-xl font-bold"
                            > Cancel </button>
                            <button
                                onClick={handleRequestSubmit}
                                className="btn btn-success text-white px-8 rounded-xl font-bold shadow-lg shadow-success/20"
                            > Confirm Request </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestAsset;
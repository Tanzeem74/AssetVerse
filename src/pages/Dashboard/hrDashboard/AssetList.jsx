import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../ExtraPage/Loading';

const AssetList = () => {
    useEffect(() => {
            document.title = "AssetList - page";
        }, []);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [assetType, setAssetType] = useState('');
    const [sort, setSort] = useState('dateAdded-desc');
    const [editingAsset, setEditingAsset] = useState(null);
    const limit = 10;
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['assets', page, limit, search, assetType, sort],
        queryFn: async () => {
            const [sortBy, order] = sort.split('-');
            const res = await axiosSecure.get('/assets', {
                params: {
                    page, limit, search,
                    type: assetType,
                    sort: sortBy, order,
                }
            });
            return res.data;
        }
    });
    const { mutate: deleteAsset } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/assets/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['assets']);
            Swal.fire('Deleted!', 'Asset has been removed.', 'success');
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Delete failed");
        }
    });
    const { mutate: updateAsset } = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.patch(`/assets/${updatedData.id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['assets']);
            toast.success('Asset updated successfully!');
            setEditingAsset(null);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Update failed");
        }
    });
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAsset(id);
            }
        });
    };
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            id: editingAsset._id,
            productName: form.productName.value,
            productType: form.productType.value,
            productQuantity: parseInt(form.productQuantity.value)
        };
        updateAsset(updatedData);
    };

    const assets = data?.assets || [];
    const totalPages = data?.totalPages || 1;

    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = e.target.search.value;
        setSearch(searchTerm);
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };

    const handleTypeChange = (e) => {
        setAssetType(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        console.error("Error loading assets:", error);
        toast.error(error.response?.data?.message || "Failed to load assets from server.");
        return <div className="text-center py-10 text-red-600">Error: Failed to load assets.</div>;
    }

    return (
        <div className="p-6 text-base-content min-h-screen bg-base-200/30">
            <h2 className="text-3xl font-bold text-primary mb-6 border-b border-base-300 pb-3">
                Company Assets Inventory
            </h2>
            
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <form onSubmit={handleSearch} className="flex grow max-w-sm">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by Product Name..."
                        className="input input-bordered rounded-r-none w-full focus:outline-primary bg-base-100"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary rounded-l-none">
                        Search
                    </button>
                </form>

                <div className="flex flex-wrap gap-4">
                    <select
                        onChange={handleTypeChange}
                        value={assetType}
                        className="select select-bordered bg-base-100">
                        <option value="">All Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                    <select
                        onChange={handleSortChange}
                        value={sort}
                        className="select select-bordered bg-base-100">
                        <option value="dateAdded-desc">Date Added (Latest)</option>
                        <option value="dateAdded-asc">Date Added (Oldest)</option>
                        <option value="productQuantity-desc">Quantity (High to Low)</option>
                        <option value="productQuantity-asc">Quantity (Low to High)</option>
                    </select>
                </div>
            </div>

            <div className="bg-base-100 shadow-xl rounded-lg overflow-x-auto border border-base-300">
                {assets.length === 0 ? (
                    <p className="p-6 text-center opacity-60">No assets found matching the criteria.</p>
                ) : (
                    <table className="table w-full">
                        <thead className="bg-base-200 text-base-content">
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-base-100">
                            {assets.map((asset) => (
                                <tr key={asset._id} className="hover:bg-base-200/50 border-b border-base-200">
                                    <td>
                                        {asset.productImage ? (
                                            <img
                                                src={asset.productImage}
                                                alt={asset.productName}
                                                className="h-12 w-12 rounded-lg object-cover border border-base-300"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 bg-base-300 rounded-lg flex items-center justify-center text-[10px] opacity-50">
                                                No Img
                                            </div>
                                        )}
                                    </td>
                                    <td className="font-semibold">{asset.productName}</td>
                                    <td>
                                        <span className={`badge ${asset.productType === 'Returnable' ? 'badge-success' : 'badge-warning'} badge-sm font-medium`}>
                                            {asset.productType}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span>Total: {asset.productQuantity}</span>
                                            <span className="text-xs opacity-60">Available: {asset.availableQuantity}</span>
                                        </div>
                                    </td>
                                    <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button onClick={() => setEditingAsset(asset)} className="btn btn-ghost btn-xs text-info hover:bg-info/10">Edit</button>
                                            <button onClick={() => handleDelete(asset._id)} className="btn btn-ghost btn-xs text-error hover:bg-error/10">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="btn btn-outline btn-sm">Previous</button>
                    <div className="join">
                        <span className="join-item btn btn-sm btn-active pointer-events-none">
                            Page {page} of {totalPages}
                        </span>
                    </div>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="btn btn-outline btn-sm">
                        Next
                    </button>
                </div>
            )}

            {editingAsset && (
                <div className="fixed inset-0 bg-neutral-focus/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-base-100 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-base-300">
                        <h3 className="text-2xl font-bold text-primary mb-6">Update Asset</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Product Name</span></label>
                                <input name="productName" defaultValue={editingAsset.productName} className="input input-bordered w-full bg-base-200" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Product Type</span></label>
                                <select name="productType" defaultValue={editingAsset.productType} className="select select-bordered w-full bg-base-200">
                                    <option value="Returnable">Returnable</option>
                                    <option value="Non-returnable">Non-returnable</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Quantity</span></label>
                                <input name="productQuantity" type="number" defaultValue={editingAsset.productQuantity} className="input input-bordered w-full bg-base-200" required />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setEditingAsset(null)} className="btn btn-ghost">Cancel</button>
                                <button type="submit" className="btn btn-primary px-8">Update Asset</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetList;
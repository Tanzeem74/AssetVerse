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
        <div className="p-6">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-3">
                Company Assets Inventory
            </h2>
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <form onSubmit={handleSearch} className="flex grow max-w-sm">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by Product Name..."
                        className="px-4 py-2 border border-gray-300 rounded-l-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition">
                        Search
                    </button>
                </form>

                <div className="flex gap-4">
                    <select
                        onChange={handleTypeChange}
                        value={assetType}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">All Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                    <select
                        onChange={handleSortChange}
                        value={sort}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="dateAdded-desc">Date Added (Latest)</option>
                        <option value="dateAdded-asc">Date Added (Oldest)</option>
                        <option value="productQuantity-desc">Quantity (High to Low)</option>
                        <option value="productQuantity-asc">Quantity (Low to High)</option>
                    </select>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                {assets.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">No assets found matching the criteria.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {assets.map((asset) => (
                                <tr key={asset._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {asset.productImage ? (
                                            <img
                                                src={asset.productImage}
                                                alt={asset.productName}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                                                No Img
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.productName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${asset.productType === 'Returnable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {asset.productType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.productQuantity} (Available: {asset.availableQuantity})</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(asset.dateAdded).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => setEditingAsset(asset)} className="text-indigo-600 hover:text-indigo-900 mr-3 transition">Edit
                                        </button>
                                        <button onClick={() => handleDelete(asset._id)} className="text-red-600 hover:text-red-900 transition">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition">Previous</button>
                    <span className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition">
                        Next
                    </button>
                </div>
            )}
            {editingAsset && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-indigo-700 mb-4">Update Asset</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input name="productName" defaultValue={editingAsset.productName} className="w-full border rounded p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Type</label>
                                <select name="productType" defaultValue={editingAsset.productType} className="w-full border rounded p-2">
                                    <option value="Returnable">Returnable</option>
                                    <option value="Non-returnable">Non-returnable</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Quantity</label>
                                <input name="productQuantity" type="number" defaultValue={editingAsset.productQuantity} className="w-full border rounded p-2" required />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setEditingAsset(null)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetList;
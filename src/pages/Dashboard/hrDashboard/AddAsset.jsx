import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
const assetTypes = ['Returnable', 'Non-returnable'];

const AddAsset = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { mutate, isPending: isMutating } = useMutation({
        mutationFn: async (assetData) => {
            const res = await axiosSecure.post('/assets', assetData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Asset added successfully!');
            reset();
            queryClient.invalidateQueries({ queryKey: ['assets'] });
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to add asset to inventory.');
        },
    });

    const onSubmit = async (data) => {
        const imageFile = data.productImage[0];
        if (!imageFile) {
            toast.error('Please select an image file to upload.');
            return;
        }
        let imageUrl = '';
        try {
            toast.loading('Uploading image...', { id: 'uploading' });

            const formData = new FormData();
            formData.append('image', imageFile);
            const imgbbResponse = await axios.post(image_API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.dismiss('uploading');

            if (imgbbResponse.data.success) {
                imageUrl = imgbbResponse.data.data.url;
                toast.success('Image uploaded successfully!');
            } else {
                toast.error('Image upload failed: ' + (imgbbResponse.data.error?.message || 'Unknown error.'));
                return;
            }

        } catch (error) {
            toast.dismiss('uploading');
            console.error("Image Upload Error:", error);
            toast.error('Image upload failed. Check your network or VITE_image_host_key.');
            return;
        }
        const finalAssetData = {
            productName: data.productName,
            productImage: imageUrl,
            productType: data.productType,
            productQuantity: parseInt(data.productQuantity, 10),
        };
        mutate(finalAssetData);
    };

    const isUploading = isMutating;
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8 border-b pb-3">
                Add New Company Asset
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        {...register("productName", { required: "Product Name is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        placeholder="e.g., Lenovo ThinkPad X1 Carbon"
                    />
                    {errors.productName && <p className="mt-1 text-sm text-red-600">{errors.productName.message}</p>}
                </div>

                {/* Product Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image (Upload File)</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("productImage", {
                            required: "Asset Image is required",
                            validate: {
                                fileExists: value => value && value.length > 0 || "Please select an image file."
                            }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {errors.productImage && <p className="mt-1 text-sm text-red-600">{errors.productImage.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Type (Dropdown) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                        <select
                            {...register("productType", { required: "Product Type is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-white transition duration-150"
                        >
                            <option value="">Select Asset Type</option>
                            {assetTypes.map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.productType && <p className="mt-1 text-sm text-red-600">{errors.productType.message}</p>}
                    </div>

                    {/* Product Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Quantity</label>
                        <input
                            type="number"
                            {...register("productQuantity", {
                                required: "Quantity is required",
                                min: { value: 1, message: "Quantity must be at least 1" }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="e.g., 10"
                            min="1"
                        />
                        {errors.productQuantity && <p className="mt-1 text-sm text-red-600">{errors.productQuantity.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition duration-150"
                >
                    {isUploading ? 'Processing...' : 'Add Asset to Inventory'}
                </button>
            </form>
        </div>
    );
};

export default AddAsset;
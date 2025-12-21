import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../ExtraPage/Loading";
import useRole from "../../hooks/useRole";

const Profile = () => {
    useEffect(() => {
            document.title = "Profile - page";
        }, []);
    const { user, updateUser } = useAuth();
    const {role,roleLoading}=useRole()
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [uploading, setUploading] = useState(false);

    const { data: userData, isLoading } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    const mutation = useMutation({
        mutationFn: (updatedInfo) => axiosSecure.patch(`/users/${user?.email}`, updatedInfo),
        onSuccess: () => {
            queryClient.invalidateQueries(["user-profile"]);
            toast.success("Profile Updated Successfully!");
        }
    });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUploading(true);
        const form = e.target;
        const name = form.name.value;
        const imageFile = form.photo.files[0];

        let photoURL = userData?.photoURL;

        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
                const res = await axios.post(image_API_URL, formData);
                photoURL = res.data.data.url;
            }
            await updateUser({ displayName: name, photoURL });
            await mutation.mutateAsync({ name, photoURL });
            form.reset();
        } catch (err) {
            toast.error("Update failed!",err);
        } finally {
            setUploading(false);
        }
    };

    if (isLoading || roleLoading) return <Loading></Loading>

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
                <div className="h-32 bg-linear-to-r from-indigo-500 to-purple-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 flex flex-col md:flex-row items-end gap-6 mb-8">
                        <img
                            src={user?.photoURL || "https://via.placeholder.com/150"}
                            className="w-40 h-40 rounded-2xl border-4 border-white shadow-xl object-cover bg-white"
                            alt="Profile"
                        />
                        <div className="flex-1 pb-2 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-800">{userData?.name}</h2>
                            <p className="text-indigo-600 font-medium">{userData?.email}</p>
                            <span className="mt-2 inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                {role}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-4">
                            <h3 className="text-lg font-bold text-gray-700 border-b pb-2">Information</h3>
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Role</p>
                                    <p className="text-gray-700 font-semibold">{userData?.role}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Date of Birth</p>
                                    <p className="text-gray-700 font-semibold">{userData?.dateOfBirth || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Account Created</p>
                                    <p className="text-gray-700 font-semibold">
                                        {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">Update Profile</h3>
                            <form onSubmit={handleUpdateProfile} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label font-semibold text-sm">Full Name</label>
                                        <input
                                            name="name"
                                            defaultValue={userData?.name}
                                            className="input input-bordered focus:ring-2 focus:ring-indigo-400 outline-none"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label font-semibold text-sm">Profile Photo</label>
                                        <input
                                            type="file"
                                            name="photo"
                                            className="file-input file-input-bordered w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        disabled={uploading}
                                        className="btn btn-primary bg-indigo-600 border-none text-white px-10 rounded-xl">
                                        {uploading ? "Updating..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../ExtraPage/Loading";
import useRole from "../../hooks/useRole";
import { FaUserEdit, FaCamera, FaIdBadge, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const Profile = () => {
    useEffect(() => {
        document.title = "Profile - AssetVerse";
    }, []);

    const { user, updateUser } = useAuth();
    const { role, roleLoading } = useRole();
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
            toast.error("Update failed!");
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    if (isLoading || roleLoading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto my-12 px-4 animate-fadeIn">
            <div className="bg-base-100 shadow-2xl rounded-[2.5rem] overflow-hidden border border-base-300 transition-all duration-300">
                
                {/* Banner Section */}
                <div className="h-48 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>

                <div className="px-6 md:px-12 pb-10">
                    {/* Header: Avatar and Name */}
                    <div className="relative -mt-20 flex flex-col md:flex-row items-center md:items-end gap-6 mb-12">
                        <div className="relative group">
                            <img
                                src={userData?.photoURL || "https://via.placeholder.com/150"}
                                className="w-44 h-44 rounded-3xl border-8 border-base-100 shadow-2xl object-cover bg-base-200 transition-transform duration-500 group-hover:scale-105"
                                alt="Profile"
                            />
                            <div className="absolute bottom-4 right-4 p-2 bg-primary text-white rounded-xl shadow-lg cursor-pointer">
                                <FaCamera className="text-sm" />
                            </div>
                        </div>
                        
                        <div className="flex-1 pb-4 text-center md:text-left space-y-2">
                            <h2 className="text-4xl font-black tracking-tight">{userData?.name}</h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                                <span className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest border border-primary/20">
                                    <FaIdBadge /> {role}
                                </span>
                                <span className="flex items-center gap-2 text-sm opacity-60 font-medium">
                                    <FaEnvelope className="text-primary" /> {userData?.email}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Sidebar: Details */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-8 bg-base-200/50 rounded-4xl border border-base-300 space-y-6">
                                <h3 className="text-xl font-black flex items-center gap-3">
                                    Personal Details
                                </h3>
                                
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-base-100 rounded-2xl shadow-sm text-primary">
                                            <FaIdBadge />
                                        </div>
                                        <div>
                                            <p className="text-[10px] opacity-50 uppercase font-black tracking-tighter">System ID</p>
                                            <p className="font-bold text-sm truncate max-w-[150px]">{userData?._id}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-base-100 rounded-2xl shadow-sm text-secondary">
                                            <FaCalendarAlt />
                                        </div>
                                        <div>
                                            <p className="text-[10px] opacity-50 uppercase font-black tracking-tighter">Joined Date</p>
                                            <p className="font-bold text-sm">
                                                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content: Update Form */}
                        <div className="lg:col-span-8 bg-base-100 p-2 md:p-6">
                            <div className="flex items-center justify-between mb-8 border-b border-base-300 pb-4">
                                <h3 className="text-2xl font-black flex items-center gap-3">
                                    <FaUserEdit className="text-primary" /> Edit Profile
                                </h3>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control group">
                                        <label className="label">
                                            <span className="label-text font-black text-xs uppercase opacity-60">Display Name</span>
                                        </label>
                                        <input
                                            name="name"
                                            defaultValue={userData?.name}
                                            className="input input-bordered rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium border-base-300"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-black text-xs uppercase opacity-60">Profile Image</span>
                                        </label>
                                        <input
                                            type="file"
                                            name="photo"
                                            className="file-input file-input-bordered file-input-primary w-full rounded-2xl border-base-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                    <p className="text-xs opacity-60 font-medium max-w-xs">
                                        Note: Your email address is linked to your HR affiliation and cannot be changed manually.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="btn btn-primary px-8 rounded-2xl font-black shadow-lg shadow-primary/20"
                                    >
                                        {uploading ? (
                                            <>
                                                <span className="loading loading-spinner loading-xs"></span>
                                                Updating
                                            </>
                                        ) : "Save Changes"}
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
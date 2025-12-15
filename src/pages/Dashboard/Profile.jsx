import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Profile = () => {
    const { user } = useAuth();
    const { role } = useRole();

    return (
        <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-lg">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
                <img
                    src={user?.photoURL}
                    className="w-32 h-32 rounded-full border shadow"
                    alt="profile"
                />
                <h2 className="text-3xl font-bold mt-3">{user?.displayName}</h2>
                <p className="text-gray-600">{user?.email}</p>

                <span className="mt-2 px-3 py-1 bg-primary text-white rounded-full text-sm uppercase">
                    {role} Profile
                </span>
            </div>

            <hr className="my-6" />

            <div>
                <h3 className="text-xl font-semibold mb-3">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="p-3 border rounded">
                        <p className="text-gray-500">Full Name</p>
                        <p className="font-semibold">{user?.displayName}</p>
                    </div>

                    <div className="p-3 border rounded">
                        <p className="text-gray-500">Email</p>
                        <p className="font-semibold">{user?.email}</p>
                    </div>

                </div>
            </div>

            <hr className="my-6" />

          
            {role === "employee" && (
                <div>
                    <h3 className="text-xl font-semibold mb-3">Employee Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div class="p-3 border rounded">
                            <p class="text-gray-500">Position</p>
                            <p class="font-semibold">Employee</p>
                        </div>

                        <div class="p-3 border rounded">
                            <p class="text-gray-500">Assigned Assets</p>
                            <p class="font-semibold">5 (example)</p>
                        </div>

                        <div class="p-3 border rounded">
                            <p class="text-gray-500">Joining Date</p>
                            <p class="font-semibold">N/A</p>
                        </div>

                    </div>
                </div>
            )}

            {role === "hr" && (
                <div>
                    <h3 className="text-xl font-semibold mb-3">HR Manager Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div class="p-3 border rounded">
                            <p class="text-gray-500">Role</p>
                            <p class="font-semibold">HR Manager</p>
                        </div>

                        <div class="p-3 border rounded">
                            <p class="text-gray-500">Company Name</p>
                            <p class="font-semibold">Your Company</p>
                        </div>

                        <div class="p-3 border rounded">
                            <p class="text-gray-500">Registered Employees</p>
                            <p class="font-semibold">20 (example)</p>
                        </div>

                    </div>
                </div>
            )}

            <div className="text-center mt-8">
                <button className="btn btn-primary px-8">Edit Profile</button>
            </div>

        </div>
    );
};

export default Profile;

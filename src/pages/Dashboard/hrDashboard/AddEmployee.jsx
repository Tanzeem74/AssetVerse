import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AddEmployee = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // 🔥 HR Package Status (Always Fresh)
    const {
        data: hrStatus = { currentEmployees: 0, packageLimit: 5 },
        isLoading: statusLoading,
        refetch: refetchStatus
    } = useQuery({
        queryKey: ["hr-package-status"],
        queryFn: async () => {
            const res = await axiosSecure.get("/hr-package-status");
            return res.data;
        },
        staleTime: 0,
        gcTime: 0
    });

    // 🔥 Available Employees
    const {
        data: availableEmployees = [],
        isLoading: empLoading,
        refetch: refetchEmployees
    } = useQuery({
        queryKey: ["available-employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/available-employees");
            return res.data;
        }
    });

    // ✅ Page load holei force refresh
    useEffect(() => {
        refetchStatus();
        refetchEmployees();
    }, []);

    const handleAddToTeam = async (employee) => {
        if (hrStatus.currentEmployees >= hrStatus.packageLimit) {
            Swal.fire({
                icon: "warning",
                title: "Limit Full!",
                text: "Your package limit is full. Please upgrade.",
                showCancelButton: true,
                confirmButtonText: "Upgrade Now",
            }).then((res) => {
                if (res.isConfirmed) {
                    navigate("/dashboard/upgrade");
                }
            });
            return;
        }

        try {
            const res = await axiosSecure.post("/add-to-team", {
                employeeEmail: employee.email,
                employeeName: employee.name,
            });

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Added!",
                    text: `${employee.name} added to your team`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                // 🔥 refresh both
                refetchStatus();
                refetchEmployees();
            }
        } catch (err) {
            Swal.fire(
                "Error",
                err.response?.data?.message || "Something went wrong",
                "error"
            );
        }
    };

    if (statusLoading || empLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const isLimitFull =
        hrStatus.currentEmployees >= hrStatus.packageLimit;

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
            {/* HEADER */}
            <div
                className={`flex flex-col md:flex-row justify-between items-center p-8 rounded-3xl mb-10 shadow border ${isLimitFull
                        ? "bg-red-50 border-red-200"
                        : "bg-white border-gray-100"
                    }`}
            >
                <div>
                    <h2 className="text-3xl font-extrabold">
                        Add New Employees
                    </h2>
                    <p
                        className={`mt-2 font-medium ${isLimitFull
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                    >
                        {isLimitFull
                            ? "Team limit full. Upgrade required."
                            : "Add employees to your organization"}
                    </p>
                </div>

                <div className="text-center mt-6 md:mt-0">
                    <p className="text-sm text-gray-400 uppercase">
                        Team Capacity
                    </p>
                    <p
                        className={`text-4xl font-black ${isLimitFull
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                    >
                        {hrStatus.currentEmployees} /{" "}
                        {hrStatus.packageLimit}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/dashboard/upgrade")
                        }
                        className={`btn mt-4 rounded-xl ${isLimitFull
                                ? "btn-error text-white animate-pulse"
                                : "btn-outline btn-primary"
                            }`}
                    >
                        Upgrade Package
                    </button>
                </div>
            </div>

            {/* EMPLOYEE TABLE */}
            <div className="bg-white rounded-3xl shadow border">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {availableEmployees.length > 0 ? (
                                availableEmployees.map((emp) => (
                                    <tr key={emp._id}>
                                        <td className="font-semibold">
                                            {emp.name}
                                        </td>
                                        <td className="text-gray-500">
                                            {emp.email}
                                        </td>
                                        <td className="text-right">
                                            <button
                                                onClick={() =>
                                                    handleAddToTeam(
                                                        emp
                                                    )
                                                }
                                                disabled={
                                                    isLimitFull
                                                }
                                                className={`btn btn-sm rounded-xl ${isLimitFull
                                                        ? "btn-disabled"
                                                        : "btn-primary"
                                                    }`}
                                            >
                                                {isLimitFull
                                                    ? "Limit Full"
                                                    : "Add"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-10 text-gray-400"
                                    >
                                        No available employees
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;

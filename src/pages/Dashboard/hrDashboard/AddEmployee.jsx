import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Loading from "../../ExtraPage/Loading";

const AddEmployee = () => {
    useEffect(() => {
        document.title = "Add Employee - page";
    }, []);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
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
    useEffect(() => {
        refetchStatus();
        refetchEmployees();
    }, [refetchEmployees, refetchStatus]);

    const handleAddToTeam = async (employee) => {
        if (hrStatus.currentEmployees >= hrStatus.packageLimit) {
            Swal.fire({
                icon: "warning",
                title: "Limit Full!",
                text: "Your package limit is full. Please upgrade.",
                showCancelButton: true,
                confirmButtonText: "Upgrade Now",
                confirmButtonColor: '#4f46e5',
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
            <Loading></Loading>
        );
    }
    const isLimitFull = hrStatus.currentEmployees >= hrStatus.packageLimit;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen text-base-content">
            {/* Header / Limit Status Card */}
            <div className={`flex flex-col md:flex-row justify-between items-center p-8 rounded-3xl mb-10 shadow-lg border transition-all duration-300 ${isLimitFull
                    ? "bg-error/10 border-error/30"
                    : "bg-base-100 border-base-300"
                }`}>
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-extrabold text-primary">
                        Add New Employees
                    </h2>
                    <p className={`mt-2 font-medium ${isLimitFull ? "text-error" : "opacity-70"}`}>
                        {isLimitFull
                            ? "Team limit full. Upgrade required."
                            : "Add employees to your organization"}
                    </p>
                </div>

                <div className="text-center mt-6 md:mt-0 bg-base-200/50 p-6 rounded-2xl border border-base-300 min-w-[200px]">
                    <p className="text-xs opacity-50 uppercase tracking-widest mb-1 font-bold">
                        Team Capacity
                    </p>
                    <p className={`text-4xl font-black ${isLimitFull ? "text-error" : "text-primary"}`}>
                        {hrStatus.currentEmployees} <span className="text-base font-normal opacity-50">/</span> {hrStatus.packageLimit}
                    </p>
                    <button
                        onClick={() => navigate("/dashboard/upgrade")}
                        className={`btn btn-sm mt-4 rounded-lg px-6 ${isLimitFull
                                ? "btn-error text-white animate-pulse"
                                : "btn-primary btn-outline"
                            }`}>
                        Upgrade Package
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-base-200">
                            <tr className="text-base-content opacity-70">
                                <th className="py-5 pl-8">Employee Name</th>
                                <th>Email Address</th>
                                <th className="text-right pr-8">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {availableEmployees.length > 0 ? (
                                availableEmployees.map((emp) => (
                                    <tr key={emp._id} className="hover:bg-base-200/50 border-b border-base-200 transition-colors">
                                        <td className="pl-8">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                        <span>{emp.name?.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <span className="font-bold">{emp.name}</span>
                                            </div>
                                        </td>
                                        <td className="opacity-70 font-medium">
                                            {emp.email}
                                        </td>
                                        <td className="text-right pr-8">
                                            <button
                                                onClick={() => handleAddToTeam(emp)}
                                                disabled={isLimitFull}
                                                className={`btn btn-sm rounded-lg px-5 ${isLimitFull
                                                        ? "btn-disabled opacity-50"
                                                        : "btn-primary"
                                                    }`}
                                            >
                                                {isLimitFull ? "Full" : "Add to Team"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-20 opacity-50 italic">
                                        No available employees found to add.
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
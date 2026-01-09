import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Loading from '../../ExtraPage/Loading';
import { useEffect } from 'react';

const MyEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
            document.title = "My Employee - page";
        }, []);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['my-employees'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-employees');
            return res.data;
        }
    });

    const handleRemove = async (email) => {
        if (window.confirm("Are you sure you want to remove this employee?")) {
            try {
                await axiosSecure.patch(`/remove-employee/${email}`);
                toast.success("Employee removed successfully");
                refetch();
            } catch (err) {
                toast.error("Failed to remove employee", err);
            }
        }
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className="p-6 text-base-content">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-primary">My Team</h2>
                <div className="stats shadow bg-base-200 border border-base-300">
                    <div className="stat">
                        <div className="stat-title text-base-content opacity-70">Total Employees</div>
                        <div className="stat-value text-2xl text-secondary">
                            {data?.currentEmployees} / {data?.packageLimit}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.employees.map(emp => (
                    <div key={emp._id} className="card bg-base-100 shadow-xl border border-base-300">
                        <div className="card-body items-center text-center">
                            {/* Employee Initial Avatar for better look */}
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-16">
                                    <span className="text-xl">{emp.employeeName?.charAt(0)}</span>
                                </div>
                            </div>
                            <h2 className="card-title mt-4 text-base-content">{emp.employeeName}</h2>
                            <p className="text-base-content opacity-60">{emp.employeeEmail}</p>
                            <div className="card-actions mt-4 w-full">
                                <button
                                    onClick={() => handleRemove(emp.employeeEmail)}
                                    className="btn btn-error btn-outline btn-block hover:text-white"
                                > Remove from Team </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {data?.employees?.length === 0 && (
                <div className="text-center mt-10">
                    <p className="text-xl opacity-50">No employees found in your team.</p>
                </div>
            )}
        </div>
    );
};

export default MyEmployeeList;
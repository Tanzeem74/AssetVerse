import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Loading from '../../ExtraPage/Loading';

const MyEmployeeList = () => {
    const axiosSecure = useAxiosSecure();

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
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-indigo-700">My Team</h2>
                <div className="stats shadow bg-indigo-100 p-2">
                    <div className="stat">
                        <div className="stat-title text-indigo-900">Total Employees</div>
                        <div className="stat-value text-2xl">
                            {data?.currentEmployees} / {data?.packageLimit}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.employees.map(emp => (
                    <div key={emp._id} className="card bg-white shadow-xl border border-gray-100">
                        <div className="card-body items-center text-center">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-indigo-300 ring-offset-2">
                                    <img src={emp.employeeImage || "https://via.placeholder.com/150"} alt={emp.employeeName} />
                                </div>
                            </div>
                            <h2 className="card-title mt-4">{emp.employeeName}</h2>
                            <p className="text-gray-500">{emp.employeeEmail}</p>
                            <div className="card-actions mt-4 w-full">
                                <button
                                    onClick={() => handleRemove(emp.employeeEmail)}
                                    className="btn btn-error btn-outline btn-block"
                                > Remove from Team </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEmployeeList;
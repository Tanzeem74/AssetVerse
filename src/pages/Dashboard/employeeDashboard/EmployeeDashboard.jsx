import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EmployeeDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {} } = useQuery({
    queryKey: ["employee-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee/stats");
      return res.data;
    },
  });

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Employee Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Pending Requests</div>
          <div className="stat-value text-warning">{data.pending || 0}</div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Approved</div>
          <div className="stat-value text-success">{data.approved || 0}</div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Assigned Assets</div>
          <div className="stat-value text-primary">{data.assigned || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

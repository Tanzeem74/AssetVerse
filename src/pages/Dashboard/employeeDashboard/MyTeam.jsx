import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTeam = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: team = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['my-team'],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-team');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center mt-20 text-red-500 font-semibold">
                {error?.message || "Failed to load team members"}
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-10">
                <h2 className="text-4xl font-black text-gray-800">
                    My Team Members
                </h2>
                <p className="text-gray-500 mt-2 font-medium">
                    Meet the colleagues working alongside you
                </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.length > 0 ? (
                    team.map((member) => (
                        <div
                            key={member._id}
                            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center"
                        >
                            {/* Info */}
                            <h3 className="text-xl font-bold text-gray-800">
                                {member.name}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                {member.email}
                            </p>

                            {/* Role Badge */}
                            <div
                                className={`badge badge-lg px-6 py-3 border-none font-bold ${member.role === 'hr'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}
                            >
                                {member.role === 'hr'
                                    ? 'Team Leader / HR'
                                    : 'Team Member'}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <div className="text-6xl mb-4">🤝</div>
                        <p className="text-gray-400 text-xl font-medium">
                            You are not part of any team yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTeam;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";

const MyTeam = () => {
    useEffect(() => {
        document.title = "My Team - Page";
    }, []);

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
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <p className="font-bold text-lg">{error?.message || "Failed to load team members"}</p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen text-base-content transition-colors duration-300">
            {/* Header Section */}
            <header className="mb-12">
                <h2 className="text-4xl font-black text-primary">
                    My Team Members
                </h2>
                <p className="opacity-60 mt-2 font-medium">
                    Collaborate and meet the professionals working alongside you.
                </p>
            </header>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {team.length > 0 ? (
                    team.map((member) => (
                        <div
                            key={member._id}
                            className="bg-base-100 rounded-4xl p-8 border border-base-300 shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 text-center relative overflow-hidden group">
                            
                            {/* Decorative Background Element */}
                            <div className={`absolute top-0 left-0 w-full h-2 ${member.role === 'hr' ? 'bg-secondary' : 'bg-primary'} opacity-50`}></div>

                            {/* Avatar Section */}
                            <div className="avatar mb-6">
                                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-200">
                                    <img 
                                        src={member.image || `https://ui-avatars.com/api/?name=${member.name}&background=random`} 
                                        alt={member.name} 
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-sm opacity-50 font-medium mb-6">
                                {member.email}
                            </p>

                            <div
                                className={`badge badge-lg py-4 px-6 border-none font-black text-[11px] uppercase tracking-widest ${
                                    member.role === 'hr'
                                        ? 'bg-secondary/10 text-secondary'
                                        : 'bg-primary/10 text-primary'
                                }`}
                            >
                                {member.role === 'hr' ? 'Team Leader / HR' : 'Team Member'}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
                        <div className="text-7xl mb-6 grayscale opacity-50">🤝</div>
                        <p className="text-xl opacity-50 font-black">
                            No team members found
                        </p>
                        <p className="opacity-40 text-sm mt-1">You are not part of any team yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTeam;
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Upgrade = () => {
    const axiosSecure = useAxiosSecure();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Upgrade - page";
    }, []);

    useEffect(() => {
        axiosSecure.get('/packages')
            .then(res => {
                setPackages(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch packages", err);
                setLoading(false);
            });
    }, [axiosSecure]);

    const handleUpgrade = async (pkg) => {
        try {
            const slotCount = parseInt(pkg.employeeLimit);

            if (!slotCount || isNaN(slotCount)) {
                return alert("Error: Employee limit not found in package!");
            }

            const res = await axiosSecure.post('/payment-checkout-session', {
                price: pkg.price,
                members: slotCount 
            });

            if (res.data.url) {
                // eslint-disable-next-line react-hooks/immutability
                window.location.href = res.data.url;
            }
        } catch (err) {
            console.error("Payment error:", err);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-screen text-base-content">
            <header className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-primary">
                    Premium Membership Plans
                </h2>
                <p className="text-lg opacity-70 max-w-2xl mx-auto">
                    Choose the perfect plan to expand your team and manage more assets efficiently.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <div 
                        key={pkg._id} 
                        className="bg-base-100 border border-base-300 p-8 rounded-[2.5rem] shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group"
                    >
                        <div>
                            <div className="badge badge-primary badge-outline font-bold mb-6">
                                {pkg.name || "Standard Plan"}
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-2">
                                {pkg.members || pkg.member || pkg.employeeLimit} Member Slots
                            </h3>
                            
                            <div className="flex items-baseline gap-1 my-6">
                                <span className="text-5xl font-black text-primary">${pkg.price}</span>
                                <span className="text-sm opacity-50 font-medium">/one time</span>
                            </div>

                            <div className="divider opacity-50"></div>

                            <ul className="text-left space-y-4 mb-10 opacity-80">
                                <li className="flex items-center gap-3 font-medium">
                                    <span className="text-success text-xl">✓</span> High-speed Asset Tracking
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <span className="text-success text-xl">✓</span> Full Dashboard Access
                                </li>
                                <li className="flex items-center gap-3 font-medium">
                                    <span className="text-success text-xl">✓</span> Priority Support
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => handleUpgrade(pkg)}
                            className="btn btn-primary btn-block rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 group-hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Get Started Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Upgrade;
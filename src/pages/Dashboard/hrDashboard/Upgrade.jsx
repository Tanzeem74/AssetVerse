import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Upgrade = () => {
    const axiosSecure = useAxiosSecure();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Backend theke packages load kora
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
            // Apnar DB field-er naam 'employeeLimit', tai oitai nite hobe
            const slotCount = parseInt(pkg.employeeLimit);

            if (!slotCount || isNaN(slotCount)) {
                return alert("Error: Employee limit not found in package!");
            }

            console.log("Sending slotCount:", slotCount); // Eikhane ekhon 20 dekhabe

            const res = await axiosSecure.post('/payment-checkout-session', {
                price: pkg.price,
                members: slotCount // Backend metadata-te pathanor jonno
            });

            if (res.data.url) {
                // eslint-disable-next-line react-hooks/immutability
                window.location.href = res.data.url;
            }
        } catch (err) {
            console.error("Payment error:", err);
        }
    };

    if (loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-10 max-w-6xl mx-auto min-h-screen">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
                Premium Membership Plans
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <div key={pkg._id} className="bg-white border-2 border-blue-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between">
                        <div>
                            <div className="badge badge-primary mb-4">{pkg.name || "Team Plan"}</div>
                            <h3 className="text-2xl font-bold text-gray-700">
                                {pkg.members || pkg.member} Member Slots
                            </h3>
                            <p className="text-5xl font-black my-6 text-blue-600">${pkg.price}</p>
                            <ul className="text-left space-y-3 mb-8 text-gray-600">
                                <li className="flex items-center">✅ High-speed Asset Tracking</li>
                                <li className="flex items-center">✅ Full Dashboard Access</li>
                                <li className="flex items-center">✅ Priority Support</li>
                            </ul>
                        </div>

                        <button
                            onClick={() => handleUpgrade(pkg)}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all duration-300"
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Upgrade;
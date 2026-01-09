import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
            document.title = "Payment History - page";
        }, []);

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment-history');
            return res.data;
        }
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen text-base-content">
            {/* Header Section */}
            <div className="mb-10">
                <h2 className="text-4xl font-black text-primary">Payment History</h2>
                <p className="opacity-70 mt-2 font-medium">View all your subscription and slot upgrade transactions.</p>
            </div>

            {/* Table Container */}
            <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden transition-all">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-base-200/60 text-base-content/70">
                            <tr>
                                <th className="py-6 px-8 font-bold text-[11px] uppercase tracking-widest">Transaction ID</th>
                                <th className="font-bold text-[11px] uppercase tracking-widest">Slots Added</th>
                                <th className="font-bold text-[11px] uppercase tracking-widest">Amount Paid</th>
                                <th className="font-bold text-[11px] uppercase tracking-widest text-right px-8">Date & Time</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-base-200">
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-base-200/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <span className="font-mono text-sm text-info font-semibold bg-info/10 px-3 py-1.5 rounded-lg border border-info/20">
                                                {payment.transactionId}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="badge badge-outline border-primary/30 text-primary font-bold px-4 py-3">
                                                +{payment.addedSlots} Slots
                                            </div>
                                        </td>
                                        <td className="font-black text-base-content text-lg">
                                            ${payment.amount}
                                        </td>
                                        <td className="text-right px-8 opacity-70 font-medium text-sm">
                                            {formatDate(payment.date)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-32">
                                        <div className="flex flex-col items-center opacity-40">
                                            <div className="text-6xl mb-4">💳</div>
                                            <p className="text-xl font-medium">No payment history found.</p>
                                        </div>
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

export default PaymentHistory;
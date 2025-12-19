import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment-history');
            return res.data;
        }
    });

    // Date format korar function (Standard JS)
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
            <div className="mb-10">
                <h2 className="text-4xl font-black text-gray-800">Payment History</h2>
                <p className="text-gray-500 mt-2 font-medium">View all your subscription and slot upgrade transactions.</p>
            </div>

            <div className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-gray-50/50 text-gray-400">
                            <tr>
                                <th className="py-6 px-8 font-bold text-[11px] uppercase tracking-widest">Transaction ID</th>
                                <th className="font-bold text-[11px] uppercase tracking-widest">Slots Added</th>
                                <th className="font-bold text-[11px] uppercase tracking-widest">Amount Paid</th>
                                <th className="font-bold text-[11px] uppercase tracking-widest text-right px-8">Date & Time</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-50">
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-blue-50/10 transition-colors">
                                        <td className="px-8 py-5">
                                            <span className="font-mono text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                                                {payment.transactionId}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="badge badge-outline border-blue-200 text-blue-700 font-bold px-4 py-3">
                                                +{payment.addedSlots} Slots
                                            </div>
                                        </td>
                                        <td className="font-black text-gray-700 text-lg">
                                            ${payment.amount}
                                        </td>
                                        <td className="text-right px-8 text-gray-500 font-medium text-sm">
                                            {formatDate(payment.date)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-32">
                                        <div className="flex flex-col items-center">
                                            <div className="text-6xl mb-4">💳</div>
                                            <p className="text-gray-400 text-lg font-medium">No payment history found.</p>
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
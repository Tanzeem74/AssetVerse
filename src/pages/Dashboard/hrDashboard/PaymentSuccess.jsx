import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Confetti from "react-confetti";


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [status, setStatus] = useState("verifying");

    const hasCalledAPI = useRef(false);

    useEffect(() => {
        if (!sessionId || hasCalledAPI.current) return;

        const verifyPayment = async () => {
            try {
                hasCalledAPI.current = true;
                setStatus("verifying");

                const res = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);

                if (res.data.success) {
                    setStatus("success");
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: `Limit upgraded! Total slots added: ${res.data.newLimit}`,
                        confirmButtonText: 'Go to Dashboard',
                    }).then(() => {
                        window.location.href = '/dashboard/add-employee';
                    });
                } else {
                    setStatus("error");
                }
            } catch (err) {
                console.error("Verification error:", err);
                setStatus("error");
                Swal.fire('Error', 'Payment verification failed or already processed!', 'error');
            }
        };

        verifyPayment();
    }, [sessionId, axiosSecure]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5 font-sans">
            {status === "success" && <Confetti gravity={0.1} numberOfPieces={200} />}

            <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border-t-8 border-green-500">
                {status === "verifying" && (
                    <div className="py-10">
                        <span className="loading loading-spinner loading-lg text-blue-600 mb-6"></span>
                        <h2 className="text-2xl font-bold text-gray-800">Verifying Transaction...</h2>
                        <p className="text-gray-500 mt-2">Connecting to payment gateway, hold on.</p>
                    </div>
                )}

                {status === "success" && (
                    <>
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">✓</div>
                        <h2 className="text-3xl font-extrabold text-gray-800">Payment Verified!</h2>
                        <p className="text-gray-500 mt-2 font-medium">Your employee slots have been updated.</p>

                        <div className="mt-8 space-y-3">
                            <button
                                onClick={() => window.location.href = '/dashboard/add-employee'}
                                className="btn btn-primary w-full rounded-2xl shadow-lg border-none hover:scale-105 transition-transform"
                            >
                                Start Adding Employees
                            </button>
                        </div>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">!</div>
                        <h2 className="text-2xl font-bold text-gray-800">Verification Issue</h2>
                        <p className="text-red-500 mt-2">The session might have expired or was already verified.</p>
                        <button
                            onClick={() => navigate('/dashboard/upgrade')}
                            className="mt-8 btn btn-outline btn-error w-full rounded-2xl"
                        >
                            Return to Upgrade Page
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
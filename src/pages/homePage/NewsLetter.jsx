import React, { useState } from 'react';
import toast from 'react-hot-toast';

const NewsLetter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please provide a valid email!");
            return;
        }
        
        // এখানে আপনার API কল করতে পারেন
        console.log("Subscribed:", email);
        toast.success("Welcome to the community! Check your inbox.");
        setEmail('');
    };

    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto relative overflow-hidden bg-linear-to-br from-primary to-indigo-800 rounded-[3rem] shadow-2xl p-8 md:p-16 lg:p-20 group">
                
                {/* Decorative Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute bottom-[-20%] left-[-5%] w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Text Content */}
                    <div className="text-white space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/30">
                            Updates & Insights
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight">
                            Stay Ahead in <br /> 
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-indigo-100">
                                Asset Management
                            </span>
                        </h2>
                        <p className="text-blue-100 text-lg opacity-90 max-w-md leading-relaxed">
                            Subscribe to get the latest feature updates, management tips, and exclusive corporate offers directly to your inbox.
                        </p>
                    </div>

                    {/* Subscription Form */}
                    <div className="bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl">
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="relative">
                                <label className="label">
                                    <span className="label-text text-white font-bold mb-1">Business Email Address</span>
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="name@company.com" 
                                    className="input input-bordered w-full h-14 rounded-2xl bg-white/90 text-gray-800 focus:ring-4 focus:ring-white/30 transition-all border-none text-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                className="btn btn-block h-14 rounded-2xl bg-white text-primary border-none hover:bg-blue-50 text-lg font-black shadow-xl shadow-black/10 transition-transform active:scale-95"
                            >
                                Subscribe Now
                            </button>
                            
                            <p className="text-[11px] text-center text-blue-200 opacity-70 mt-4">
                                By subscribing, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>. No spam, we promise!
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="max-w-4xl mx-auto mt-12 flex flex-wrap justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 font-bold"><span className="text-2xl">🛡️</span> Data Secured</div>
                <div className="flex items-center gap-2 font-bold"><span className="text-2xl">📧</span> Weekly Insights</div>
                <div className="flex items-center gap-2 font-bold"><span className="text-2xl">🚀</span> Fast Updates</div>
            </div>
        </section>
    );
};

export default NewsLetter;
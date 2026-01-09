import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
    useEffect(() => {
        document.title = "Contact Us - AssetVerse";
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // এখানে আপনার কন্টাক্ট লজিক যোগ করতে পারেন
        toast.success("Message sent! We'll get back to you soon.");
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                
                {/* Back to Home Button */}
                <div className="mb-8">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Side: Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Get in Touch</h2>
                            <h1 className="text-4xl md:text-6xl font-black text-base-content leading-tight">
                                Let's Talk About <br /> Your <span className="text-primary">Assets.</span>
                            </h1>
                            <p className="mt-6 text-lg opacity-60 leading-relaxed max-w-md">
                                Have questions about our pricing or features? Our team is here to help you optimize your company resources.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-6 bg-base-200/50 rounded-3xl border border-base-300 hover:border-primary/30 transition-all">
                                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-2xl text-primary text-xl">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="text-xs font-black opacity-40 uppercase tracking-widest">Email Us</p>
                                    <p className="font-bold text-lg">support@assetverse.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 bg-base-200/50 rounded-3xl border border-base-300 hover:border-primary/30 transition-all">
                                <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-2xl text-secondary text-xl">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <p className="text-xs font-black opacity-40 uppercase tracking-widest">Call Us</p>
                                    <p className="font-bold text-lg">+880 1234 567 890</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-6 bg-base-200/50 rounded-3xl border border-base-300 hover:border-primary/30 transition-all">
                                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-2xl text-accent text-xl">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-xs font-black opacity-40 uppercase tracking-widest">Visit Us</p>
                                    <p className="font-bold text-lg">Gulshan-2, Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="relative">
                        {/* Decorative Background Glow */}
                        <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10 rounded-full"></div>
                        
                        <div className="bg-base-100 border border-base-300 shadow-2xl rounded-[3rem] p-8 md:p-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label text-xs font-black opacity-50 uppercase">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="input input-bordered rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-xs font-black opacity-50 uppercase">Email Address</label>
                                        <input type="email" placeholder="john@company.com" className="input input-bordered rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium" required />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label text-xs font-black opacity-50 uppercase">Subject</label>
                                    <select className="select select-bordered rounded-2xl font-medium focus:ring-4 focus:ring-primary/10">
                                        <option disabled selected>How can we help?</option>
                                        <option>Technical Support</option>
                                        <option>Sales Inquiry</option>
                                        <option>Billing Issues</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label text-xs font-black opacity-50 uppercase">Message</label>
                                    <textarea className="textarea textarea-bordered h-32 rounded-2xl font-medium focus:ring-4 focus:ring-primary/10" placeholder="Tell us more about your needs..." required></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center gap-3">
                                    Send Message <FaPaperPlane className="text-sm" />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
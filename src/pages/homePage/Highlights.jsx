import React from 'react';
import { 
  HiOutlineLightningBolt, 
  HiOutlineShieldCheck, 
  HiOutlineChartBar, 
  HiOutlineCube 
} from 'react-icons/hi';

const Highlights = () => {
    const features = [
      {
        id: 1,
        title: "Ultra-Fast Requests",
        desc: "Request any asset in under 30 seconds. No paperwork, no emails, just one click.",
        icon: <HiOutlineLightningBolt />,
        gradient: "from-amber-400 to-orange-600",
        shadow: "shadow-orange-500/20"
      },
      {
        id: 2,
        title: "Enterprise Security",
        desc: "Bank-grade encryption for all your company data and employee information.",
        icon: <HiOutlineShieldCheck />,
        gradient: "from-blue-400 to-indigo-600",
        shadow: "shadow-blue-500/20"
      },
      {
        id: 3,
        title: "Live Analytics",
        desc: "Visual dashboards for HR to track asset health and return cycles in real-time.",
        icon: <HiOutlineChartBar />,
        gradient: "from-emerald-400 to-teal-600",
        shadow: "shadow-emerald-500/20"
      },
      {
        id: 4,
        title: "Stock Management",
        desc: "Smart inventory alerts when your assets are running low. Stay ahead of needs.",
        icon: <HiOutlineCube />,
        gradient: "from-rose-400 to-pink-600",
        shadow: "shadow-rose-500/20"
      }
    ];

    return (
        <section className="py-24 bg-base-100 overflow-hidden relative">
            {/* Background Abstract Shapes */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl text-left">
                        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                            Core Capabilities
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black mt-6 leading-tight">
                            The Future of <br /> 
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                                Resource Tracking
                            </span>
                        </h2>
                    </div>
                    <p className="max-w-sm opacity-60 text-lg lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-primary px-4">
                        Everything you need to scale your team's hardware management efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f) => (
                        <div 
                            key={f.id}
                            className={`group relative p-8 bg-base-200/50 backdrop-blur-md rounded-[2.5rem] border border-base-300 hover:border-primary/40 transition-all duration-500 hover:-translate-y-3 ${f.shadow}`}
                        >
                            {/* Icon Container with Gradient */}
                            <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${f.gradient} flex items-center justify-center text-3xl text-white mb-8 shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                                {f.icon}
                            </div>

                            <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                                {f.title}
                            </h3>
                            
                            <p className="opacity-60 leading-relaxed font-medium">
                                {f.desc}
                            </p>

                            {/* Floating Decorative Number */}
                            <span className="absolute top-8 right-8 text-6xl font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                0{f.id}
                            </span>

                            {/* Bottom Glow */}
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r ${f.gradient} opacity-0 group-hover:opacity-100 blur-sm transition-opacity`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights;
import React from 'react';

const AboutUs = () => {
    return (
        <div className="py-16 bg-base-100 text-base-content overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* 1. Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Who We Are</h2>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Empowering Teams with <br className="hidden md:block" /> Smart Asset Management</h1>
                    <p className="max-w-2xl mx-auto opacity-70 text-lg leading-relaxed">
                        At <span className="text-primary font-bold">AssetVerse</span>, we believe that efficiency starts with clarity. We help companies track, manage, and optimize their assets so they can focus on what they do best.
                    </p>
                </div>

                {/* 2. Visual & Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                            alt="Team working together" 
                            className="relative rounded-4xl shadow-2xl object-cover h-[400px] w-full"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-base-100 p-6 rounded-2xl shadow-xl border border-base-300 hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-black text-primary">500+</div>
                                <div className="text-sm font-bold opacity-70 uppercase tracking-tighter leading-tight">Companies <br /> Trusted Us</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-3xl font-bold">Why We Built AssetVerse?</h3>
                        <p className="opacity-70 leading-relaxed">
                            Managing physical assets in a growing company is often chaotic. From tracking laptop assignments to handling returnable equipment, Excel sheets aren't enough. We built this platform to bridge the gap between HR and inventory management.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                { title: "Seamless Integration", desc: "Easily sync with your employee database." },
                                { title: "Real-time Tracking", desc: "Monitor your inventory status in one single dashboard." },
                                { title: "Automated Reports", desc: "Generate professional asset reports with one click." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-base-200 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{item.title}</h4>
                                        <p className="text-sm opacity-60">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Core Values Section */}
                <div className="bg-primary/5 rounded-[3rem] p-12 border border-primary/10">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold">Our Core Values</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "🛡️", title: "Transparency", desc: "Everything in AssetVerse is logged and transparent for both employees and HR." },
                            { icon: "⚡", title: "Efficiency", desc: "Reduce administrative time by 40% with our automated request workflow." },
                            { icon: "🌱", title: "Scalability", desc: "Whether you are a startup or a giant, our system grows with your team size." }
                        ].map((value, idx) => (
                            <div key={idx} className="bg-base-100 p-8 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all border border-base-200">
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                                <p className="text-sm opacity-60 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
import React, { useEffect } from 'react';

const TermsAndConditions = () => {
    useEffect(() => {
        document.title = "Terms & Conditions - AssetVerse";
    }, []);

    return (
        <div className="bg-base-100 min-h-screen py-16 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4">
                        Terms & <span className="text-primary">Conditions</span>
                    </h1>
                    <p className="opacity-60 font-medium">Last Updated: January 2026</p>
                    <div className="divider w-24 mx-auto before:bg-primary after:bg-primary"></div>
                </header>

                {/* Introduction */}
                <section className="bg-base-200/50 p-8 rounded-4xl mb-10 border border-base-300">
                    <h2 className="text-xl font-bold mb-4">Welcome to AssetVerse!</h2>
                    <p className="leading-relaxed opacity-70">
                        These terms and conditions outline the rules and regulations for the use of <strong>AssetVerse Management System</strong>. 
                        By accessing this website, we assume you accept these terms and conditions. Do not continue to use AssetVerse if you do not agree to take all of the terms and conditions stated on this page.
                    </p>
                </section>

                {/* Terms Sections using Collapse */}
                <div className="space-y-4">
                    
                    {/* 1. Account Usage */}
                    <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-2xl">
                        <input type="radio" name="terms-accordion" defaultChecked /> 
                        <div className="collapse-title text-lg font-bold">
                            1. User Account & Security
                        </div>
                        <div className="collapse-content opacity-70 text-sm leading-relaxed">
                            <ul className="list-disc ml-5 space-y-2">
                                <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
                                <li>The company (HR) reserves the right to terminate accounts that violate company policy.</li>
                                <li>Employees must use their official corporate email for registration and affiliation.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. Asset Responsibility */}
                    <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-2xl">
                        <input type="radio" name="terms-accordion" /> 
                        <div className="collapse-title text-lg font-bold">
                            2. Asset Allocation & Responsibility
                        </div>
                        <div className="collapse-content opacity-70 text-sm leading-relaxed">
                            <p>Assets provided through this platform are property of the respective company. Employees are expected to:</p>
                            <ul className="list-disc ml-5 mt-2 space-y-2">
                                <li>Use the assigned assets for professional purposes only.</li>
                                <li>Report any physical damage or software issues to the HR/Admin immediately.</li>
                                <li>Return "Returnable" items in good condition upon resignation or project completion.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. Subscription & Payments */}
                    <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-2xl">
                        <input type="radio" name="terms-accordion" /> 
                        <div className="collapse-title text-lg font-bold">
                            3. Subscriptions & Payments (For HR/Admin)
                        </div>
                        <div className="collapse-content opacity-70 text-sm leading-relaxed">
                            <p>
                                HR Managers can upgrade their employee limit by purchasing packages. All payments are processed securely.
                                Subscription fees are non-refundable once the employee limit has been increased.
                            </p>
                        </div>
                    </div>

                    {/* 4. Data Privacy */}
                    <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-2xl">
                        <input type="radio" name="terms-accordion" /> 
                        <div className="collapse-title text-lg font-bold">
                            4. Data Privacy & Logs
                        </div>
                        <div className="collapse-content opacity-70 text-sm leading-relaxed">
                            <p>
                                We collect and store data related to asset requests, returns, and employee profiles. 
                                We do not sell your personal data to third parties. For more details, please visit our Privacy Policy page.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Contact Footer */}
                <footer className="mt-16 text-center border-t border-base-300 pt-10">
                    <p className="opacity-60 mb-4">Have questions about our Terms?</p>
                    <button className="btn btn-primary btn-outline px-10 rounded-xl">
                        Contact Support
                    </button>
                    <p className="mt-8 text-xs opacity-40">
                        &copy; 2026 AssetVerse Inc. All rights reserved.
                    </p>
                </footer>

            </div>
        </div>
    );
};

export default TermsAndConditions;
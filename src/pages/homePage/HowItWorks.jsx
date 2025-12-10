import React from "react";

const HowItWorks = () => {
  const steps = [
    { title: "Create Account", desc: "Sign up as HR manager or employee in seconds." },
    { title: "Add & Request Assets", desc: "HR adds inventory; employees submit requests." },
    { title: "Manage & Report", desc: "Approve, assign, return and generate reports." }
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, idx) => (
          <div key={idx} className="text-center p-6 bg-base-100 rounded-lg shadow">
            <div className="text-2xl font-bold mb-3">{idx + 1}</div>
            <h4 className="font-semibold">{s.title}</h4>
            <p className="text-gray-600 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

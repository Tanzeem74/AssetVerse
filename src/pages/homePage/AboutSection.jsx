import React from "react";
import { FaClipboardCheck, FaBolt, FaUsers } from "react-icons/fa";

const AboutSection = () => {
  const items = [
    { Icon: FaClipboardCheck, title: "Accurate Tracking", desc: "Never lose track of your assets — centralized inventory & history." },
    { Icon: FaUsers, title: "Employee Centric", desc: "Assign assets, manage teams and monitor usage across companies." },
    { Icon: FaBolt, title: "Fast Onboarding", desc: "Quick setup with Firebase Auth and role-based flows." },
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Why AssetVerse</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="card p-6 bg-base-100 shadow">
            <it.Icon className="text-primary text-4xl mb-3" />
            <h3 className="text-xl font-semibold">{it.title}</h3>
            <p className="text-gray-600 mt-2">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;

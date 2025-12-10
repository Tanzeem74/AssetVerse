import React from "react";
import { FaChartBar, FaExchangeAlt, FaBell, FaFileInvoice } from "react-icons/fa";

const Features = () => {
  const list = [
    { Icon: FaChartBar, title: "Analytics & Reports", desc: "Visualize asset metrics with charts and exportable reports." },
    { Icon: FaExchangeAlt, title: "Request Workflow", desc: "Employees request, HR approves — clear audit trail." },
    { Icon: FaBell, title: "Notifications", desc: "Get alerts for low stock, pending approvals & returns." },
    { Icon: FaFileInvoice, title: "PDF Reports", desc: "Generate printable asset reports with company branding." }
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Key Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {list.map((f, i) => (
          <div key={i} className="card p-6 bg-base-100 shadow text-center">
            <f.Icon className="text-3xl text-primary mb-3 mx-auto" />
            <h4 className="font-semibold">{f.title}</h4>
            <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

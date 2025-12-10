import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

/**
 * props:
 *  - packages: array of {name, employeeLimit, price, features}
 * If packages not provided, uses default list.
 */
const defaultPackages = [
  { name: "Basic", employeeLimit: 5, price: 5, features: ["Asset Tracking", "Employee Management", "Basic Support"] },
  { name: "Standard", employeeLimit: 10, price: 8, features: ["All Basic features", "Advanced Analytics", "Priority Support"] },
  { name: "Premium", employeeLimit: 20, price: 15, features: ["All Standard features", "Custom Branding", "24/7 Support"] },
];

const Package = ({ packages = defaultPackages }) => {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Pricing & Packages</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-lg shadow border"
              whileHover={{ y: -6 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold">{pkg.name}</h3>
                <p className="text-sm text-gray-500">Up to {pkg.employeeLimit} employees</p>
              </div>

              <div className="text-center mb-4">
                <span className="text-4xl font-bold">${pkg.price}</span>
                <span className="text-sm text-gray-500">/mo</span>
              </div>

              <ul className="mb-4 space-y-2">
                {pkg.features.map((f, i) => (
                  <li className="flex items-center gap-2 text-gray-700" key={i}>
                    <FaCheck className="text-primary" /> {f}
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary w-full">Choose Plan</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Package;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCheck } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../ExtraPage/Loading";

const Package = () => {
  const axiosSecure = useAxiosSecure();
  
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-20 bg-base-200 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-base-content mb-4">
            Flexible <span className="text-primary">Pricing</span> Plans
          </h2>
          <p className="text-lg opacity-60">
            Scale your team without worrying about management overhead. Choose the plan that fits your company size.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, idx) => {
            // ধরি ২য় প্যাকেজটি সবচেয়ে জনপ্রিয় (বা কন্ডিশনাল লজিক দিতে পারেন)
            const isPopular = idx === 1;

            return (
              <div
                key={idx}
                className={`relative p-8 rounded-[2.5rem] transition-all duration-500 group ${
                  isPopular 
                    ? "bg-base-100 border-2 border-primary shadow-2xl scale-105 z-10" 
                    : "bg-base-100 border border-base-300 hover:border-primary/50 shadow-lg"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-content text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {pkg.name}
                  </h3>
                  <div className="inline-block px-4 py-1 bg-base-200 rounded-lg text-sm font-medium opacity-70">
                    Up to {pkg.employeeLimit} Employees
                  </div>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-5xl font-black text-base-content">${pkg.price}</span>
                    <span className="text-lg opacity-50 font-medium">/mo</span>
                  </div>
                </div>

                <div className="divider opacity-50"></div>

                <ul className="mb-10 space-y-4">
                  {pkg.features.map((feature, i) => (
                    <li className="flex items-start gap-3 text-sm font-medium" key={i}>
                      <div className="mt-1 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                        <FaCheck className="text-[10px] text-success" />
                      </div>
                      <span className="opacity-80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`btn btn-block rounded-2xl font-black transition-all ${
                    isPopular 
                      ? "btn-primary shadow-lg shadow-primary/30" 
                      : "btn-outline btn-primary border-2"
                  }`}
                >
                  Choose {pkg.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <p className="text-center mt-12 opacity-50 text-sm italic">
          Need a custom plan for 100+ employees? <span className="underline cursor-pointer hover:text-primary">Contact our sales team.</span>
        </p>
      </div>
    </section>
  );
};

export default Package;
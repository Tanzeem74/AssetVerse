import React from "react";

const Faq = () => {
  const items = [
    { q: "What is AssetVerse?", a: "A modern asset & employee management software for HR teams." },
    { q: "Can employees request assets?", a: "Yes — requests are approved by HR and tracked in the system." },
    { q: "Is my data secure?", a: "Yes — Firebase Authentication secures access and backend verification protects routes." },
  ];

  return (
    // bg-base-200 DaisyUI এর থিম অনুযায়ী অটো ডার্ক/লাইট হবে
    <section className="py-16 bg-base-200 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-base-content">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {items.map((it, i) => (
            /* bg-white সরিয়ে bg-base-100 ব্যবহার করুন যা ডার্ক মোডে অটো কালো/ডার্ক হবে */
            <div className="collapse collapse-arrow bg-base-100 shadow-md border border-base-300" key={i}>
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium text-base-content">
                {it.q}
              </div>
              <div className="collapse-content text-base-content/80">
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
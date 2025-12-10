import React from "react";

const Faq = () => {
  const items = [
    { q: "What is AssetVerse?", a: "A modern asset & employee management software for HR teams." },
    { q: "Can employees request assets?", a: "Yes — requests are approved by HR and tracked in the system." },
    { q: "Is my data secure?", a: "Yes — Firebase Authentication secures access and backend verification protects routes." },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {items.map((it, i) => (
            <div className="collapse collapse-arrow bg-white shadow" key={i}>
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">{it.q}</div>
              <div className="collapse-content"><p>{it.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;

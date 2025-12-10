import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonial = () => {
  const items = [
    { quote: "Streamlined our asset workflow dramatically.", company: "PixelWave Ltd." },
    { quote: "Great for HR & employees. Easy to use.", company: "TechNova Corp." },
    { quote: "Support is fast and helpful.", company: "CloudEdge Systems" },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by teams worldwide</h2>
        <p className="text-gray-600 mb-8">100+ companies trust AssetVerse for asset security and transparency.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="card p-6 bg-white shadow">
              <div className="flex items-center justify-center mb-3">
                <FaStar className="text-yellow-400 mr-2" />
                <FaStar className="text-yellow-400 mr-2" />
                <FaStar className="text-yellow-400 mr-2" />
              </div>

              <p className="text-gray-700">{t.quote}</p>
              <p className="text-sm text-gray-500 mt-3">— {t.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

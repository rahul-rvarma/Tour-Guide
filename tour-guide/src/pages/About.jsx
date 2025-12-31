import React from "react";

export default function About() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#052E16] via-[#064E3B] to-[#022C22] px-4 pt-32 pb-24 text-white overflow-hidden">

      {/* glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/25 blur-3xl rounded-full animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=900"
            alt="Kerala"
            className="w-full h-full object-cover"
          />
        </div>

        {/* content */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">
            About <span className="text-green-400">Keralam</span>
          </h1>

          <p className="mt-6 text-white/70">
            Keralam was built with one belief — Kerala cannot be experienced
            through rushed packages. It must be felt slowly, respectfully, and
            authentically.
          </p>

          <p className="mt-4 text-white/70">
            Our journeys are designed by locals who understand seasons, culture,
            food, and hidden places that never make it into brochures.
          </p>

          <p className="mt-4 text-white/70">
            No middlemen. No scripted tours. Just real Kerala.
          </p>

          <button className="mt-8 bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-lg transition">
            Explore Destinations
          </button>
        </div>
      </div>
    </section>
  );
}

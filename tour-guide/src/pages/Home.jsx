import React from "react";

const Home = () => {
  return (
    <>
      {/* Global font (keep for now, later move to index.css) */}
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
          * {
            font-family: "Poppins", sans-serif;
          }
        `}
      </style>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0F172A] via-[#0B3C49] to-[#0A2A2F] text-white px-4 overflow-hidden">

        {/* subtle animated glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>

        {/* trust badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur mt-24">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="text-xs text-white/70">
            Trusted by 10,000+ travellers worldwide
          </p>
        </div>

        {/* headline */}
        <h1 className="text-center mt-10 max-w-4xl text-4xl md:text-6xl font-semibold leading-tight">
          Experience Kerala <br className="hidden md:block" />
          <span className="text-emerald-400">The Authentic Way</span>
        </h1>

        {/* sub text */}
        <p className="text-center mt-6 max-w-2xl text-sm md:text-base text-white/70">
          Handcrafted journeys across God’s Own Country — backwaters, hill
          stations, beaches, culture, food, and people. No packages. Just real
          Kerala.
        </p>

        {/* CTA */}
        <div className="flex gap-4 mt-10">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-7 py-3 rounded-lg text-sm font-medium transition shadow-lg shadow-emerald-500/30">
            Plan My Trip
          </button>
          <button className="border border-white/30 hover:bg-white/10 px-7 py-3 rounded-lg text-sm font-medium transition">
            Explore Destinations
          </button>
        </div>

        {/* divider */}
        <div className="w-full max-w-5xl h-px mt-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* WHY KERALAM */}
      <section className="bg-[#F5F7FA] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Why Travel with Keralam?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Because Kerala isn’t a checklist. It’s an experience that deserves
            patience, local knowledge, and respect.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
            <div className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800">
                Local Expertise
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Born and raised guides who know hidden routes, real stories, and
                seasonal secrets.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800">
                Custom Itineraries
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                No copy-paste plans. Every journey is built around your pace,
                interests, and comfort.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800">
                Responsible Tourism
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                We support local communities, eco stays, and ethical travel
                practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">15+</h3>
            <p className="text-sm text-gray-500 mt-1">Years of Experience</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">12k+</h3>
            <p className="text-sm text-gray-500 mt-1">Happy Travellers</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">300+</h3>
            <p className="text-sm text-gray-500 mt-1">Curated Routes</p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">5★</h3>
            <p className="text-sm text-gray-500 mt-1">Average Reviews</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-cyan-600 py-20 text-center px-4 text-white">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Ready to Discover Kerala?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-white/80 text-sm md:text-base">
          Let us design a journey that feels personal, unhurried, and deeply
          memorable.
        </p>
        <button className="mt-8 bg-black/90 hover:bg-black px-8 py-3 rounded-lg text-sm font-medium transition">
          Start Planning
        </button>
      </section>
    </>
  );
};

export default Home;

import React from "react";

export default function Contact() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#052E16] via-[#064E3B] to-[#022C22] px-4 pt-32 pb-24 text-white overflow-hidden">

      {/* glow */}
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-green-500/25 blur-3xl rounded-full animate-pulse"></div>

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        {/* left */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Let’s Plan Your <span className="text-green-400">Journey</span>
          </h1>
          <p className="mt-6 text-white/70 max-w-md">
            Tell us what kind of experience you’re looking for — we’ll design it
            personally.
          </p>
        </div>

        {/* form */}
        <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-8">
          <form className="space-y-6">
            <input
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none"
            />
            <textarea
              rows="4"
              placeholder="Tell us about your trip..."
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none resize-none"
            />

            <button className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

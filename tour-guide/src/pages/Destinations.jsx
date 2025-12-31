import React, { useState, useEffect } from "react";
import { destinationsAPI } from "../services/api";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationsAPI.getAll();
        setDestinations(data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#052E16] via-[#064E3B] to-[#022C22] px-4 pt-24 md:pt-28 pb-24 text-white">

      {/* animated glow */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-green-500/25 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-40 w-[420px] h-[420px] bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Explore Amazing Destinations
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto text-sm md:text-base">
          Discover handpicked destinations crafted by our travel experts.
          Each destination offers unique experiences and unforgettable memories.
        </p>

        {/* Loading State */}
        {loading && (
          <div className="mt-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <p className="mt-4 text-white/70">Loading destinations...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-16 text-center">
            <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && destinations.length === 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white/10 border border-white/15 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-white/70">No destinations available yet.</p>
              <p className="text-sm text-white/50 mt-2">Check back soon for amazing travel destinations!</p>
            </div>
          </div>
        )}

        {/* Destinations Grid */}
        {!loading && !error && destinations.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {destinations.map((destination, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl overflow-hidden hover:-translate-y-1 transition"
              >
                {/* Destination Image */}
                {destination.image_filename && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`http://127.0.0.1:8000/uploads/${destination.image_filename}`} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden h-48 bg-gradient-to-br from-green-600/20 to-emerald-600/20 items-center justify-center">
                      <span className="text-white/50">📍</span>
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-medium">{destination.name}</h2>
                    {destination.rating && (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span>⭐</span>
                        <span className="text-sm">{destination.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {destination.location && (
                    <p className="text-sm text-green-400 mb-2">📍 {destination.location}</p>
                  )}
                  
                  <p className="text-sm text-white/70 mb-6 line-clamp-3">{destination.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">₹{destination.price?.toLocaleString()}</span>
                    <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-md text-sm transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;
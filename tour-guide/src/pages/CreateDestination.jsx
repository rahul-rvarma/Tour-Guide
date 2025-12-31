import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { destinationsAPI } from "../services/api";

export default function CreateDestination() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    location: "",
    rating: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Redirect non-admin users
  if (!user?.is_admin) {
    return (
      <section className="relative min-h-screen bg-gradient-to-b from-[#052E16] via-[#064E3B] to-[#022C22] px-4 pt-32 pb-24 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-400">Access Denied</h1>
          <p className="mt-4 text-white/70">You don't have permission to access this page.</p>
        </div>
      </section>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Create destination data with file
      const destinationData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        rating: parseFloat(formData.rating),
        image: formData.image
      };

      await destinationsAPI.create(destinationData);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        image: null,
        price: "",
        location: "",
        rating: ""
      });
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      setMessage({ type: "success", text: "Destination created successfully!" });
    } catch (error) {
      console.error("Error creating destination:", error);
      const errorMessage = error.response?.data?.detail || "Error creating destination. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#052E16] via-[#064E3B] to-[#022C22] px-4 pt-32 pb-24 text-white overflow-hidden">

      {/* glow */}
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-green-500/25 blur-3xl rounded-full animate-pulse"></div>

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        {/* left */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Create New <span className="text-green-400">Destination</span>
          </h1>
          <p className="mt-6 text-white/70 max-w-md">
            Add a new destination to our travel catalog. Fill in all the details to help travelers discover amazing places.
          </p>
        </div>

        {/* form */}
        <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-8">
          {/* Message display */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === "success" 
                ? "bg-green-500/20 border border-green-500/40 text-green-300" 
                : "bg-red-500/20 border border-red-500/40 text-red-300"
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Destination Name"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none"
              required
            />
            
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none"
              required
            />
            
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Description..."
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none resize-none"
              required
            />
            
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-500 file:text-black file:cursor-pointer hover:file:bg-green-600 file:transition outline-none"
            />
            
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              min="0"
              step="0.01"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none"
              required
            />
            
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              step="0.1"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none"
              required
            />

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Destination"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
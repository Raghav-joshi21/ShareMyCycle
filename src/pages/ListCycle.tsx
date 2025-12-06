// pages/ListCycle.tsx
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { Cycle } from "../types";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ListCycle() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(2);
  const [locationName, setLocationName] = useState("RTU campus");
  const [type, setType] = useState<"city" | "mtb" | "road">("city");
  const [gear, setGear] = useState(false);
  const [condition, setCondition] = useState<"excellent" | "good" | "fair">("good");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [image, setImage] = useState<string | null>(null);

  // Load listings from localStorage on mount
  useEffect(() => {
    const savedListings = localStorage.getItem("myListings");
    if (savedListings) {
      try {
        const parsed = JSON.parse(savedListings);
        setCycles(parsed);
      } catch (e) {
        console.error("Error loading listings:", e);
      }
    }
  }, []);

  // Save cycles to localStorage whenever they change
  const saveCyclesToStorage = (newCycles: Cycle[]) => {
    localStorage.setItem("myListings", JSON.stringify(newCycles));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessageType("error");
      setMessage("Please enter a cycle name");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const newCycle: Cycle = {
      id: `c${Date.now()}`, // Unique ID based on timestamp
      name,
      type,
      gear,
      pricePerHour: price,
      locationName,
      lat: 56.9496 + (Math.random() - 0.5) * 0.02,
      lng: 24.1052 + (Math.random() - 0.5) * 0.02,
      isAvailableNow: true,
      rating: 5,
      description: description || "Beautiful bike available for sharing",
      condition,
      image: image || getDefaultBikeImage(type),
    };

    const updatedCycles = [...cycles, newCycle];
    setCycles(updatedCycles);
    saveCyclesToStorage(updatedCycles);

    setMessageType("success");
    setMessage(`✓ "${name}" listed successfully! It's now available for others to see.`);

    // Reset form
    setName("");
    setDescription("");
    setPrice(2);
    setLocationName("RTU campus");
    setType("city");
    setGear(false);
    setCondition("good");
    setImage(null);

    setTimeout(() => setMessage(""), 4000);
  };

  const handleDeleteCycle = (id: string) => {
    const updatedCycles = cycles.filter((c) => c.id !== id);
    setCycles(updatedCycles);
    saveCyclesToStorage(updatedCycles);
    setMessageType("success");
    setMessage("✓ Listing removed");
    setTimeout(() => setMessage(""), 3000);
  };

  const getDefaultBikeImage = (type: string) => {
    const bikeEmojis: { [key: string]: string } = {
      city: "🚲",
      mtb: "🏔️",
      road: "🏃",
    };
    return bikeEmojis[type] || "🚲";
  };

  const getConditionColor = (cond: string) => {
    switch (cond) {
      case "excellent":
        return "from-green-400 to-green-600";
      case "good":
        return "from-blue-400 to-blue-600";
      case "fair":
        return "from-yellow-400 to-yellow-600";
      default:
        return "from-slate-400 to-slate-600";
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-[#FCF6D9] text-slate-900 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* SUCCESS/ERROR BANNER */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 mt-4"
            >
              <motion.div
                className={`rounded-2xl px-6 py-4 shadow-lg flex items-center justify-between gap-3 border-l-4 ${
                  messageType === "success"
                    ? "border-[#93BC25] bg-[#93BC25]/10 text-[#5a7d15]"
                    : "border-red-500 bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{messageType === "success" ? "✅" : "❌"}</span>
                  <p className="font-semibold">{message}</p>
                </div>
                <button
                  className="text-xl hover:opacity-60 transition-opacity"
                  onClick={() => setMessage("")}
                  type="button"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Share Your Bicycle</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            List your bike and earn money while helping others get around. All listings are saved securely on your device with localStorage.
          </p>
        </motion.div>

        {/* FORM + LISTINGS GRID */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-[1fr_1.3fr]"
        >
          {/* FORM CARD - Modern Design */}
          <motion.div
            variants={fadeUp}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border border-[#DDBA7D]/30">
              {/* Form Header Background */}
              <div className="h-24 bg-gradient-to-r from-[#DDBA7D] to-[#D4A870]" />

              <motion.form
                onSubmit={handleSubmit}
                className="px-8 py-8 space-y-6 -mt-12 relative z-10"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Add New Listing</h2>
                  <p className="text-sm text-slate-600">
                    Share your bicycle with the community
                  </p>
                </div>

                {/* Cycle Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Bicycle Name *
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#DDBA7D]/40 px-4 py-3 text-sm bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DDBA7D] focus:border-transparent transition-all"
                    placeholder="e.g. Mountain Bike Pro"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-[#DDBA7D]/40 px-4 py-3 text-sm bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DDBA7D] focus:border-transparent transition-all resize-none"
                    placeholder="Describe your bike (brand, color, special features...)"
                    rows={3}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    📸 Upload Photo
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-[#DDBA7D]/40 rounded-xl cursor-pointer hover:border-[#DDBA7D] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="text-sm text-slate-600">
                      {image ? "✓ Photo uploaded" : "Click to upload or drag photo"}
                    </span>
                  </label>
                  {image && (
                    <img src={image} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                  )}
                </div>

                {/* Type & Condition Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-900">
                      Bike Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) =>
                        setType(e.target.value as "city" | "mtb" | "road")
                      }
                      className="w-full rounded-xl border border-[#DDBA7D]/40 px-4 py-3 text-sm bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DDBA7D] focus:border-transparent transition-all"
                    >
                      <option value="city">🚲 City Bike</option>
                      <option value="mtb">⛰️ Mountain Bike</option>
                      <option value="road">🏃 Road Bike</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-900">
                      Condition
                    </label>
                    <select
                      value={condition}
                      onChange={(e) =>
                        setCondition(e.target.value as "excellent" | "good" | "fair")
                      }
                      className="w-full rounded-xl border border-[#DDBA7D]/40 px-4 py-3 text-sm bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DDBA7D] focus:border-transparent transition-all"
                    >
                      <option value="excellent">⭐⭐⭐ Excellent</option>
                      <option value="good">⭐⭐ Good</option>
                      <option value="fair">⭐ Fair</option>
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-3 bg-gradient-to-br from-[#DDBA7D]/10 to-[#93BC25]/10 rounded-xl p-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      💰 Price per Hour
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#DDBA7D]">€</span>
                      <input
                        type="number"
                        min={0.5}
                        step={0.5}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="flex-1 rounded-lg border border-[#DDBA7D]/40 px-4 py-2 text-lg font-semibold bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DDBA7D] focus:border-transparent transition-all"
                      />
                      <span className="text-slate-600 font-medium">/hr</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={10}
                    step={0.5}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none accent-[#DDBA7D]"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    📍 Location
                  </label>
                  <input
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full rounded-xl border border-[#DDBA7D]/40 px-4 py-3 text-sm bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DDBA7D] focus:border-transparent transition-all"
                    placeholder="e.g. RTU Main Campus"
                  />
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors border border-[#DDBA7D]/30">
                    <input
                      type="checkbox"
                      checked={gear}
                      onChange={(e) => setGear(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-[#DDBA7D] accent-[#DDBA7D] cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-900">⚙️ Has Gears</span>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-gradient-to-r from-[#DDBA7D] via-[#D9B17A] to-[#D4A870] px-6 py-4 text-base font-bold text-slate-900 shadow-lg hover:shadow-xl transition-all"
                >
                  🚀 List My Bicycle
                </motion.button>

                <p className="text-xs text-slate-500 text-center">
                  💾 Saved securely in your browser (localStorage)
                </p>
              </motion.form>
            </div>
          </motion.div>

          {/* LISTINGS DISPLAY */}
          <motion.div variants={stagger} className="space-y-4">
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-900">My Listings</h2>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#DDBA7D] text-slate-900 font-bold text-sm shadow-md">
                  {cycles.length}
                </span>
              </div>
              <p className="text-sm text-slate-600">
                {cycles.length === 0
                  ? "No listings yet. Add your first bicycle above!"
                  : `You have ${cycles.length} bicycle${cycles.length === 1 ? "" : "s"} available for sharing`}
              </p>
            </motion.div>

            {cycles.length === 0 ? (
              <motion.div
                variants={fadeUp}
                className="rounded-3xl border-2 border-dashed border-[#DDBA7D]/40 p-12 text-center bg-gradient-to-br from-[#FCF6D9] to-[#DDBA7D]/10"
              >
                <p className="text-5xl mb-3">🚲</p>
                <p className="text-slate-600 font-medium text-lg">
                  Start by listing your first bicycle
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Your listings will appear here and be saved automatically
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={stagger}
                className="grid sm:grid-cols-1 gap-4 max-h-[800px] overflow-y-auto pr-2"
              >
                {cycles.map((cycle) => (
                  <motion.div
                    key={cycle.id}
                    variants={fadeUp}
                    className="rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-[#DDBA7D]/30 overflow-hidden group"
                  >
                    <div className="relative">
                      {/* Image Section */}
                      <div className={`h-32 bg-gradient-to-br ${getConditionColor(cycle.condition || "good")} flex items-center justify-center text-5xl`}>
                        {typeof cycle.image === "string" && cycle.image.startsWith("data:") ? (
                          <img src={cycle.image} alt={cycle.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{cycle.image}</span>
                        )}
                      </div>

                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteCycle(cycle.id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Delete listing"
                      >
                        ✕
                      </motion.button>
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-lg">{cycle.name}</p>
                          <p className="text-xs text-slate-500 mt-1">📍 {cycle.locationName}</p>
                        </div>
                      </div>

                      {/* Description */}
                      {cycle.description && (
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {cycle.description}
                        </p>
                      )}

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-gradient-to-br from-[#DDBA7D]/20 to-[#93BC25]/20 rounded-lg p-3">
                          <p className="text-xs text-slate-600 font-medium">Price</p>
                          <p className="text-lg font-bold text-slate-900">
                            €{cycle.pricePerHour.toFixed(2)}/hr
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#DDBA7D]/20 to-[#93BC25]/20 rounded-lg p-3">
                          <p className="text-xs text-slate-600 font-medium">Type</p>
                          <p className="text-lg font-bold text-slate-900 capitalize">
                            {cycle.type}
                          </p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        {cycle.gear && (
                          <span className="bg-[#93BC25]/30 text-slate-900 px-2.5 py-1 rounded-full font-medium">
                            ⚙️ Gears
                          </span>
                        )}
                        {cycle.condition && (
                          <span className="bg-[#DDBA7D]/30 text-slate-900 px-2.5 py-1 rounded-full font-medium">
                            ⭐ {cycle.condition}
                          </span>
                        )}
                        <span className="bg-[#93BC25]/30 text-slate-900 px-2.5 py-1 rounded-full font-medium">
                          ✓ Available
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

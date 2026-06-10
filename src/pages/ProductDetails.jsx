import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Star, Heart, ShoppingBag, Plus, Minus, Coffee, ChevronRight } from "lucide-react";

export default function ProductDetails() {
  const {
    activeProductId,
    products,
    addToCart,
    toggleFavorite,
    favorites,
    navigateTo
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [grind, setGrind] = useState("Whole Bean");
  const [activeTab, setActiveTab] = useState("profile"); // profile, brewing, reviews

  const product = products.find((p) => p.id === activeProductId);

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-6">
        <h3 className="text-2xl font-serif text-brand-cream font-bold">Product Not Found</h3>
        <p className="text-brand-latte/70 text-sm">
          The product you are trying to view does not exist or has been discontinued.
        </p>
        <button
          onClick={() => navigateTo("shop")}
          className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-sm font-semibold uppercase tracking-wider py-3 px-6 rounded-full transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFav = favorites.includes(product.id);

  const handleAddToCart = () => {
    const customGrind = product.category === "coffee" ? grind : null;
    addToCart(product, quantity, customGrind);
    alert(`${quantity}x ${product.name} added to cart!`);
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };

  // Barista Brew Guide Data
  const brewGuides = {
    "ethiopia-yirgacheffe": [
      { method: "Hario V60", ratio: "15g Coffee : 240g Water (1:16)", temp: "93°C / 200°F", steps: "Medium-fine grind. Bloom with 45g water for 45s. Pour in concentric circles up to 150g, then final pour to 240g. Target drawdown: 2:45." },
      { method: "Chemex", ratio: "30g Coffee : 480g Water (1:16)", temp: "94°C / 201°F", steps: "Medium grind. Bloom with 80g water. Gentle pours down the center to avoid filter channels. Drawdown: 4:00." }
    ],
    "colombia-supremo": [
      { method: "Kalita Wave", ratio: "16g Coffee : 256g Water (1:16)", temp: "94°C / 201°F", steps: "Medium grind. Bloom with 50g water for 35s. Pour in 3 pulses of 70g every 30s. Clean, sweet finish." },
      { method: "Espresso", ratio: "18g Coffee In : 38g Liquid Out", temp: "93°C / 200°F", steps: "Fine grind. 7s pre-infusion, followed by 28s extraction at 9 bars of pressure. Rich velvet crema." }
    ],
    "sumatra-mandheling": [
      { method: "French Press", ratio: "30g Coffee : 450g Water (1:15)", temp: "95°C / 203°F", steps: "Coarse grind. Steep for 4 minutes, stir crust gently, plunge slow. Enhances heavy body and cedar earth notes." },
      { method: "AeroPress", ratio: "15g Coffee : 220g Water (1:14.6)", temp: "92°C / 198°F", steps: "Medium-coarse grind. Stir for 10s, steep for 1:30, press slowly over 30s. Thick body, low acidity." }
    ],
    "obscura-blend": [
      { method: "Double Espresso", ratio: "18.5g Coffee In : 37g Liquid Out", temp: "93.5°C / 200°F", steps: "Extremely fine grind. Extract for 28-30s. Expect heavy molasses body, cherry cordial notes, and thick crema." },
      { method: "Moka Pot", ratio: "Fill basket (approx. 18g) : Water to valve", temp: "Boiling water in base", steps: "Medium-fine grind. Heat on low. Remove from flame as soon as coffee starts to bubble out to avoid bitterness." }
    ],
    "geisha-reserve": [
      { method: "Origami Dripper (V60 Filter)", ratio: "12g Coffee : 180g Water (1:15)", temp: "91°C / 195°F", steps: "Medium-fine grind. Delicate pouring. Four fast pulses of 45g. Highlights rare floral jasmine aromatics." },
      { method: "Siphon / Vacuum Pot", ratio: "20g Coffee : 300g Water (1:15)", temp: "92°C / 198°F", steps: "Medium grind. Stir twice during rise. Brew for 1:15. Produces an incredibly clean, tea-like tea body." }
    ]
  };

  const currentBrewGuide = brewGuides[product.id] || [
    { method: "General Brew Guide", ratio: "1:16 Brew Ratio", temp: "93°C / 200°F", steps: "Use clean filtered water. Grind fresh right before brewing. Enjoy within 30 minutes of extraction." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in-up">

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-brand-latte/60">
        <button onClick={() => navigateTo("home")} className="hover:text-brand-gold">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => navigateTo("shop")} className="hover:text-brand-gold">Shop</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-cream truncate">{product.name}</span>
      </div>

      {/* Main product overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Col: Image (6 Columns) */}
        <div className="lg:col-span-6 relative aspect-square rounded-3xl overflow-hidden bg-brand-medium border border-neutral-900 shadow-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.category === "coffee" && (
            <span className="absolute bottom-5 left-5 bg-brand-espresso/90 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded border border-brand-gold/20">
              {product.roast} Roast
            </span>
          )}
        </div>

        {/* Right Col: Details (6 Columns) */}
        <div className="lg:col-span-6 space-y-6">

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold font-mono">
              {product.category === "coffee" ? `${product.type} • Origin Sourced` : `${product.brand} • Brewing Precision`}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream leading-tight">
              {product.name}
            </h2>

            {/* Reviews / ratings */}
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-neutral-700"}`}
                  />
                ))}
                <span className="ml-1.5 font-bold text-brand-cream">{product.rating}</span>
              </div>
              <span className="text-neutral-600">•</span>
              <span className="text-brand-latte/70">{product.reviewsCount} customer reviews</span>
            </div>
          </div>

          <div className="text-2xl font-serif font-bold text-brand-gold">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-sm text-brand-latte/80 leading-relaxed">
            {product.description}
          </p>

          {/* Coffee specs: Process, Altitude, Notes */}
          {product.category === "coffee" && (
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-brand-medium/45 border border-neutral-900 text-xs">
              <div>
                <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Origin Region</span>
                <span className="font-semibold text-brand-cream">{product.origin}</span>
              </div>
              <div>
                <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Process Method</span>
                <span className="font-semibold text-brand-cream">{product.process}</span>
              </div>
              <div className="mt-2">
                <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Farming Altitude</span>
                <span className="font-semibold text-brand-cream">{product.altitude}</span>
              </div>
              <div className="mt-2">
                <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Roast Profile</span>
                <span className="font-semibold text-brand-gold">{product.roast} Roast</span>
              </div>
            </div>
          )}

          {/* Configuration Inputs */}
          <div className="space-y-4 pt-4 border-t border-neutral-900/60">
            {product.category === "coffee" && (
              <div>
                <label className="block text-brand-cream/80 text-xs font-semibold uppercase tracking-wider mb-2">
                  Grind Preference
                </label>
                <select
                  value={grind}
                  onChange={(e) => setGrind(e.target.value)}
                  className="w-full bg-brand-medium border border-neutral-850 rounded-xl py-3 px-4 text-xs font-semibold uppercase tracking-wider text-brand-cream outline-none cursor-pointer"
                >
                  <option value="Whole Bean">Whole Bean (Recommended)</option>
                  <option value="Espresso">Espresso (Super Fine)</option>
                  <option value="Drip">Drip / Pour-Over (Standard)</option>
                  <option value="French Press">French Press (Coarse)</option>
                </select>
              </div>
            )}

            <div className="flex items-center space-x-4 pt-2">

              {/* Qty Selector */}
              <div className="flex items-center bg-brand-medium border border-neutral-850 rounded-xl py-2.5 px-3">
                <button
                  onClick={handleDecreaseQty}
                  className="text-neutral-400 hover:text-brand-cream p-1"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold text-brand-cream min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncreaseQty}
                  className="text-neutral-400 hover:text-brand-cream p-1"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-brand-darkgold to-brand-gold text-brand-espresso font-semibold uppercase tracking-widest text-xs py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
              </button>

              {/* Favorites heart */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-center transition-colors ${isFav
                    ? "bg-red-950/20 border-red-900/40 text-red-500 hover:bg-red-950/40"
                    : "bg-brand-medium border-neutral-850 text-neutral-400 hover:text-brand-cream hover:border-neutral-800"
                  }`}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-5 h-5 ${isFav ? "fill-red-500" : ""}`} />
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Tabs section: Profile, Brew Guide, Reviews */}
      <div className="space-y-6 pt-10 border-t border-neutral-900/60">

        {/* Tab Headers */}
        <div className="flex border-b border-neutral-900 overflow-x-auto">
          {[
            { id: "profile", label: "Flavor Profile & Specs" },
            { id: "brewing", label: "Barista Brewing Recipe" },
            { id: "reviews", label: `Reviews (${product.reviewsCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 text-sm font-semibold tracking-wide border-b-2 shrink-0 transition-all ${activeTab === tab.id
                  ? "border-brand-gold text-brand-gold"
                  : "border-transparent text-brand-latte/60 hover:text-brand-cream"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="min-h-[200px] text-sm leading-relaxed text-brand-latte/80">

          {/* TAB 1: Profile & Specs */}
          {activeTab === "profile" && (
            <div className="space-y-6 max-w-3xl">
              <h4 className="text-base font-serif font-bold text-brand-cream">Bean Characteristics & Organics</h4>
              <p>
                {product.category === "coffee"
                  ? "Sourced during prime harvest seasons, our beans undergo detailed fermentation routines at the farm level before shipping. The roasting parameters are adjusted dynamically per batch to maintain low defect levels and peak flavor notes."
                  : "Engineered specifically for specialty coffee lovers. Manufactured using commercial-grade steel components and clean, temperature-safe borosilicate glass profiles."
                }
              </p>

              {product.category === "coffee" && product.notes && (
                <div className="space-y-3">
                  <span className="text-xs text-neutral-500 uppercase tracking-widest block font-bold">Terroir Tasting Notes</span>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="bg-brand-medium border border-neutral-900 text-brand-cream/90 px-3.5 py-1.5 rounded-full font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Brewing Guide */}
          {activeTab === "brewing" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/25 rounded-lg p-3 max-w-xl text-xs text-brand-gold font-medium">
                <Coffee className="w-4.5 h-4.5 text-brand-gold shrink-0" />
                <span>Brewing ratios are recommendations. Adjust grind size slightly if drawdown is too fast or slow.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentBrewGuide.map((guide, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-brand-medium/40 border border-neutral-900 rounded-2xl space-y-3"
                  >
                    <h5 className="font-serif font-bold text-brand-cream text-base">{guide.method}</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-neutral-500 block uppercase">Brew Ratio</span>
                        <span className="text-brand-gold font-semibold">{guide.ratio}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Water Temp</span>
                        <span className="text-brand-gold font-semibold">{guide.temp}</span>
                      </div>
                    </div>
                    <p className="text-xs text-brand-latte/80 leading-normal pt-2 border-t border-neutral-900/60">
                      {guide.steps}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Customer Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-6 max-w-3xl">
              <h4 className="text-base font-serif font-bold text-brand-cream">SCA Member Reviews</h4>

              <div className="space-y-5">
                {[
                  { name: "Audrey K.", date: "May 24, 2026", rating: 5, text: "Absolutely stunning clean acidity. Best V60 extraction I've had in months. Highly recommend brewing with slightly lower temperatures." },
                  { name: "Marcus L.", date: "April 18, 2026", rating: 5, text: "Excellent customer service and prompt delivery. Coffee arrived exactly 3 days after roasting date. Clean packaging." },
                  { name: "Elena R.", date: "March 02, 2026", rating: 4, text: "Rich mouthfeel. Found it slightly sweet for espresso, but excellent as filter coffee." }
                ].map((rev, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-medium/20 border border-neutral-900/60 p-4.5 rounded-xl space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-brand-cream">{rev.name}</span>
                      <span className="text-neutral-500 font-mono">{rev.date}</span>
                    </div>
                    <div className="flex text-brand-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-brand-gold text-brand-gold" : "text-neutral-700"}`}
                        />
                      ))}
                    </div>
                    <p className="text-brand-latte/80 leading-normal pt-1">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

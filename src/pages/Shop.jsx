import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Search, SlidersHorizontal, Calendar, Award, Sparkles,
  Clock, Flame, ShieldCheck, Scale, Coffee, Star, Globe
} from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { products, navigateTo, addToCart, toggleFavorite, favorites } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedRoast, setSelectedRoast] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const origins = ["Ethiopia", "Colombia", "Sumatra", "Panama"];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prod.description && prod.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (prod.notes && prod.notes.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (prod.origin && prod.origin.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = category === "all" || prod.category === category;

    const matchesRoast =
      selectedRoast === "all" ||
      (prod.category === "coffee" && prod.roast === selectedRoast);

    const matchesOrigin =
      selectedOrigin === "all" ||
      (prod.category === "coffee" && prod.origin.toLowerCase().includes(selectedOrigin.toLowerCase()));

    return matchesSearch && matchesCategory && matchesRoast && matchesOrigin;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const handleQuickAdd = (product) => {
    const grind = product.category === "coffee" ? "Whole Bean" : null;
    addToCart(product, 1, grind);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setSelectedRoast("all");
    setSelectedOrigin("all");
    setSortBy("default");
  };

  // Mini quiz filter triggers
  const applyQuizFilter = (roastType, originName = "all") => {
    setCategory("coffee");
    setSelectedRoast(roastType);
    setSelectedOrigin(originName);
  };

  return (
    <div className="animate-fade-in-up">

      {/* ── SHOP HERO SECTION ── */}
      <section className="relative py-24 sm:py-32 bg-zinc-950 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-espresso to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/15 border border-brand-gold/20 px-4 py-1.5 rounded-full">
            Specialty Sourcing &amp; Gear
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif leading-tight">
            The Coffee &amp; <span className="text-brand-gold">Barista</span> Shop
          </h1>
          <p className="text-brand-latte/80 text-sm sm:text-lg max-w-xl leading-relaxed">
            Explore our curated catalog of seasonal roasted single-origin micro-lots, award-winning signature blends, and precision brewing tools.
          </p>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => {
                setCategory("coffee");
                const el = document.getElementById("shop-filter-bar");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Browse Beans
            </button>
            <button
              onClick={() => {
                setCategory("equipment");
                const el = document.getElementById("shop-filter-bar");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all active:scale-95"
            >
              Brewing Tools
            </button>
          </div>
        </div>
    </div>
      </section >

    {/* Main Container */ }
    < div >

  {
        </div>
      </section >/* ── SECTION 1: ROASTING SCHEDULE HEADER & LIVE CALENDAR ── */}
<section className="bg-brand-lightdark py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
    <div id="shop-filter-bar" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-neutral-900 pb-10">
      <div className="lg:col-span-7 space-y-3">
        <div className="flex items-center gap-2 text-brand-gold">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-bold">Seattle Small-Batch Roastery</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-brand-cream">Roaster Fresh Catalog</h2>
        <p className="text-brand-latte/70 text-sm max-w-xl leading-relaxed">
          Every single-origin batch is roasted to order on Monday mornings and shipped fresh on Tuesdays.
        </p>
      </div>

      {/* Live Roasting Schedule Card */}
      <div className="lg:col-span-5 bg-brand-medium/55 border border-brand-gold/20 p-5 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-brand-gold" />
            <span className="text-sm font-bold text-brand-cream">This Week's Roasting Run</span>
          </div>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between border-b border-neutral-850 pb-2">
            <span className="text-neutral-400">Next Roast Batch:</span>
            <span className="font-bold text-brand-cream">Monday (In 14 hours)</span>
          </div>
          <div className="flex justify-between border-b border-neutral-850 pb-2">
            <span className="text-neutral-400">Shipped Date:</span>
            <span className="font-bold text-brand-cream">Wednesday (Roast Fresh)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Order cutoff:</span>
            <span className="font-bold text-brand-gold">Order in next 3 hours</span>
          </div>
        </div>
      </div>
    </div>

    {
          </div>/* ── SECTION 2: INTERACTIVE MATCH FINDER (MINI WIZARD) ── */}
  <div className="bg-brand-medium/40 border border-neutral-850 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
    <div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/15 px-2.5 py-1 rounded">
        Interactive Help
      </span>
      <h3 className="text-xl font-serif font-bold text-brand-cream mt-2.5">Need Help Deciding? Quick Match:</h3>
      <p className="text-xs text-brand-latte/75 mt-0.5">Click a preference below to instantly filter our roasting catalog to match your mood.</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { label: "Light & Floral (East Africa)", roast: "Light", origin: "Ethiopia" },
        { label: "Sweet & Balanced (South America)", roast: "Medium", origin: "Colombia" },
        { label: "Rich & Earthy (Sumatra)", roast: "Dark", origin: "Sumatra" },
        { label: "Limited Reserve (Panama Geisha)", roast: "Light", origin: "Panama" }
      ].map((quiz, idx) => (
        <button
          key={idx}
          onClick={() => applyQuizFilter(quiz.roast, quiz.origin)}
          className="text-left p-3.5 bg-brand-espresso/50 border border-neutral-850 hover:border-brand-gold/45 rounded-2xl transition-all duration-300 group"
        >
          <p className="text-xs font-bold text-brand-cream group-hover:text-brand-gold transition-colors">{quiz.label}</p>
          <p className="text-[10px] text-neutral-500 mt-1 uppercase font-mono">{quiz.roast} Roast</p>
        </button>
      ))}
    </div>
  </div>

  {/* Filter and Search Bar */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-brand-medium/40 border border-neutral-900 rounded-2xl p-5 shadow-lg">
    {/* Search Input */}
    <div className="lg:col-span-4 relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
      <input
        type="text"
        placeholder="Search beans, origins, equipment..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-brand-espresso border border-neutral-800 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-cream placeholder-neutral-500 outline-none transition-all"
      />
    </div>

    {/* Category Filter Tabs */}
    <div className="lg:col-span-4 flex bg-brand-espresso border border-neutral-800 rounded-xl p-1">
      {["all", "coffee", "equipment"].map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setCategory(cat);
            if (cat === "equipment") { setSelectedRoast("all"); setSelectedOrigin("all"); }
          }}
          className={`flex-1 text-center py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors capitalize ${category === cat
            ? "bg-brand-gold text-brand-espresso"
            : "text-brand-latte/70 hover:text-brand-cream"
            }`}
        >
          {cat === "all" ? "Show All" : cat === "coffee" ? "Beans" : "Brewing Tools"}
        </button>
      ))}
    </div>

    {/* Sort Dropdown */}
    <div className="lg:col-span-4 relative">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full bg-brand-espresso border border-neutral-800 focus:border-brand-gold rounded-xl py-3 px-4 text-xs font-semibold uppercase tracking-wider text-brand-cream outline-none cursor-pointer appearance-none"
      >
        <option value="default">Default Sort</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rating</option>
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l border-neutral-800 pl-2">
        <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
      </div>
    </div>
  </div>

  {/* Coffee-Specific Sub-Filters */}
  {category !== "equipment" && (
    <div className="flex flex-wrap items-center gap-4 bg-brand-medium/15 border border-neutral-900/40 rounded-xl p-4 text-xs">
      <span className="text-brand-gold font-bold uppercase tracking-widest shrink-0 mr-2">Filter Beans:</span>

      <div className="flex items-center space-x-2">
        <span className="text-neutral-400">Roast:</span>
        <select
          value={selectedRoast}
          onChange={(e) => setSelectedRoast(e.target.value)}
          className="bg-brand-espresso border border-neutral-800 rounded-lg px-3 py-1.5 text-brand-cream outline-none"
        >
          <option value="all">All Roasts</option>
          <option value="Light">Light Roast</option>
          <option value="Medium">Medium Roast</option>
          <option value="Medium-Dark">Medium-Dark</option>
          <option value="Dark">Dark Roast</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-neutral-400">Origin:</span>
        <select
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
          className="bg-brand-espresso border border-neutral-800 rounded-lg px-3 py-1.5 text-brand-cream outline-none"
        >
          <option value="all">All Origins</option>
          {origins.map(orig => (
            <option key={orig} value={orig}>{orig}</option>
          ))}
        </select>
      </div>

      {(selectedRoast !== "all" || selectedOrigin !== "all" || searchTerm !== "") && (
        <button
          onClick={clearFilters}
          className="text-brand-gold hover:text-brand-cream underline ml-auto py-1 font-semibold transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  )}

  {/* Product Grid */}
</div>
      </section >

  {/* ── SECTION 2: PRODUCT CATALOG ── */ }

  < section className = "bg-[#0b0908] py-24" >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-brand-medium/20 rounded-3xl border border-neutral-900">
          <p className="text-brand-latte/80 font-medium text-lg">No products found matching filters</p>
          <p className="text-neutral-500 text-sm mt-1">Try resetting your search query or sorting settings.</p>
          <button
            onClick={clearFilters}
            className="mt-6 bg-brand-gold/10 border border-brand-gold/30 hover:bg-brand-gold/20 text-brand-gold px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              isFavorite={favorites.includes(prod.id)}
              onToggleFavorite={toggleFavorite}
              onAddToCart={handleQuickAdd}
              onClick={() => navigateTo("product-details", prod.id)}
            />
          ))}
        </div>
      )}

      {
        </div>
      </section >/* ── SECTION 3: TRACEABILITY & ORIGIN HIGHLIGHTS ── */}
<section className="bg-brand-lightdark py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
    <div className="bg-brand-medium/30 border border-neutral-850 p-8 rounded-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Globe className="w-6 h-6 text-brand-gold" />
        <h3 className="text-xl font-serif font-bold text-brand-cream">100% Traceability &amp; Direct Trade Values</h3>
      </div>
      <p className="text-xs text-brand-latte/80 leading-relaxed max-w-3xl">
        At Obscura, we are committed to complete transparency. Every single bag of coffee we sell can be traced back to its specific washing station, farming cooperative, or estate lot. We purchase green coffee directly from growers and mills, bypassing intermediary brokers, and paying 2-3x Fair Trade minimum prices.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        {[
          { label: "Fair Price Paid", value: "240% Fairtrade Min" },
          { label: "SCA Certified Score", value: "86+ Points Guaranteed" },
          { label: "Farming Co-ops", value: "Direct Relationship" },
          { label: "Roasting Style", value: "Micro-batch Profiles" }
        ].map((metric, idx) => (
          <div key={idx} className="bg-brand-espresso/60 border border-neutral-850 p-4 rounded-2xl text-center space-y-1">
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">{metric.label}</p>
            <p className="text-xs font-bold text-brand-cream">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── SECTION 4: COFFEE SUBSCRIPTION PERKS CALLOUT ── */}
    <div className="bg-gradient-to-br from-brand-medium to-brand-espresso border border-brand-gold/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-brand-gold">
          <Coffee className="w-4 h-4" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Obscura Club Subscription</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-brand-cream">Subscribe and Save 15%</h3>
        <p className="text-xs text-brand-latte/75 max-w-xl">
          Join the Obscura Coffee Club to unlock recurring automatic fresh shipments directly from our roasting run. Skip or cancel anytime.
        </p>
      </div>
      <button
        onClick={() => navigateTo("coffee-club")}
        className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso font-bold uppercase tracking-wider text-xs py-3.5 px-8 rounded-full shadow-lg transition-all shrink-0"
      >
        Join Subscription Club
      </button>
    </div>

    {
        </div>
</section>/* ── SECTION 5: TRUST GUARANTEES ROW ── */}
<section className="bg-[#0b0908] py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {[
        {
          icon: <Clock className="w-6 h-6 text-brand-gold mx-auto" />,
          title: "Roasted Fresh to Order",
          desc: "We package and ship within 48 hours of roasting to guarantee your beans arrive with optimal aromatics."
        },
        {
          icon: <ShieldCheck className="w-6 h-6 text-brand-gold mx-auto" />,
          title: "Equipment Guarantee",
          desc: "All our selected brewing gear comes with an official manufacturer warranty and free lifetime support."
        },
        {
          icon: <Scale className="w-6 h-6 text-brand-gold mx-auto" />,
          title: "Free Shipping on Gear",
          desc: "Enjoy free shipping on all orders over $75 and direct carbon offsets on every dispatch."
        }
      ].map((guarantee, idx) => (
        <div key={idx} className="bg-brand-medium/20 border border-neutral-850 p-6 rounded-3xl space-y-3">
          {guarantee.icon}
          <h4 className="text-sm font-bold text-brand-cream">{guarantee.title}</h4>
          <p className="text-xs text-brand-latte/70 leading-relaxed">{guarantee.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
    </div >
  );
}
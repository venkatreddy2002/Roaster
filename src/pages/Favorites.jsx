import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Heart, ShoppingCart, Star, ShieldAlert, Coffee, User, ShoppingBag, LogOut, Settings, Menu, X, Sun, Moon } from "lucide-react";

export default function Favorites({ onOpenAuth }) {
  const {
    user, favorites, products, navigateTo, addToCart, toggleFavorite, orders, logout, dark, setDark, rtl, setRtl,
    dashboardDrawerOpen, setDashboardDrawerOpen
  } = useApp();

  // ── Demo user fallback (so favorites page always works) ────────
  const demoUser = {
    displayName: "Coffee Enthusiast",
    email: "demo@obscura.coffee",
    uid: "demo",
  };
  const activeUser = user || demoUser;

  const demoFavorites = ["panama-geisha", "fellow-ode-grinder"];
  const activeFavorites = user ? favorites : demoFavorites;

  const demoOrders = [
    { id: "ORD-2024-001", total: 48.50 },
    { id: "ORD-2024-002", total: 32.50 },
    { id: "ORD-2024-003", total: 61.00 },
    { id: "ORD-2024-004", total: 29.00 },
    { id: "ORD-2024-005", total: 135.00 },
  ];
  const activeOrders = user ? orders : demoOrders;

  // Get matching product objects
  const favoriteProducts = products.filter((p) => activeFavorites.includes(p.id));

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    const grind = product.category === "coffee" ? "Whole Bean" : null;
    addToCart(product, 1, grind);
    alert(`${product.name} added to cart!`);
  };

  const handleRemoveFavorite = (e, productId) => {
    e.stopPropagation();
    toggleFavorite(productId);
  };

  // Loyalty calculations for sidebar
  const totalSpent   = activeOrders.reduce((s, o) => s + o.total, 0);
  const loyaltyPts   = 150 + Math.floor(totalSpent * 10);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        
        {/* ── Dashboard Sidebar (Desktop) ── */}
        <div className="hidden md:flex w-60 shrink-0 flex-col md:sticky md:top-4 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-y-auto scrollbar-none border border-zinc-800 rounded-2xl overflow-hidden bg-brand-espresso/40">
          {/* Profile summary */}
          <div className="bg-brand-espresso/70 p-5 text-center flex flex-col items-center border-b border-zinc-800">
            <div className="w-14 h-14 bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xl font-bold font-serif mb-3 rounded-full">
              {activeUser.displayName ? activeUser.displayName.charAt(0).toUpperCase() : "U"}
            </div>
            <h4 className="text-white font-serif font-bold text-base leading-snug">{activeUser.displayName}</h4>
            <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold mt-1">Obscura Member</span>
            <div className="flex justify-around w-full text-xs mt-4">
              <div className="text-center">
                <span className="block text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Points</span>
                <span className="font-bold text-white font-mono">{loyaltyPts}</span>
              </div>
              <div className="text-center">
                <span className="block text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Orders</span>
                <span className="font-bold text-white font-mono">{activeOrders.length}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col w-full bg-brand-espresso/40 p-2 space-y-1">
            {[
              { label: "Overview",        page: "dashboard",   icon: <User        className="w-4 h-4" /> },
              { label: "Order History",   page: "orders",      icon: <ShoppingBag className="w-4 h-4" /> },
              { label: "Saved Favorites", page: "favorites",   icon: <Heart       className="w-4 h-4" /> },
              { label: "Coffee Club",     page: "coffee-club", icon: <Coffee      className="w-4 h-4" /> },
            ].map((item) => {
              const isActive = item.page === "favorites";
              return (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all w-full text-left whitespace-nowrap rounded-xl ${
                    isActive
                      ? "bg-brand-gold text-brand-espresso"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="h-px bg-zinc-800/50 my-1" />

            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap w-full text-left rounded-xl"
            >
              <LogOut className="w-4 h-4 -rotate-180" />
              <span>Back to Store</span>
            </button>

            <button
              onClick={() => alert("Account settings are currently synced with membership credentials. Manage subscriptions on the Active Subscription card.")}
              className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap w-full text-left rounded-xl"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all whitespace-nowrap w-full text-left rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {dashboardDrawerOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setDashboardDrawerOpen(false)}
            />
            
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-brand-espresso border-r border-zinc-800 animate-slide-in-left p-6">
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                {/* Close Button */}
                <button
                  onClick={() => setDashboardDrawerOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-neutral-450 hover:text-white border border-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 flex flex-col overflow-y-auto scrollbar-none pt-8">
                {/* Profile summary */}
                <div className="p-4 text-center flex flex-col items-center border-b border-zinc-800/60">
                  <div className="w-14 h-14 bg-brand-gold/15 text-brand-gold flex items-center justify-center text-xl font-bold font-serif mb-3 rounded-full">
                    {activeUser.displayName ? activeUser.displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <h4 className="text-white font-serif font-bold text-base leading-snug">{activeUser.displayName}</h4>
                  <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold mt-1">Obscura Member</span>
                  <div className="flex justify-around w-full text-xs mt-4">
                    <div className="text-center">
                      <span className="block text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Points</span>
                      <span className="font-bold text-white font-mono">{loyaltyPts}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Orders</span>
                      <span className="font-bold text-white font-mono">{activeOrders.length}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col w-full mt-4">
                  {[
                    { label: "Overview",        page: "dashboard",   icon: <User        className="w-4 h-4" /> },
                    { label: "Order History",   page: "orders",      icon: <ShoppingBag className="w-4 h-4" /> },
                    { label: "Saved Favorites", page: "favorites",   icon: <Heart       className="w-4 h-4" /> },
                    { label: "Coffee Club",     page: "coffee-club", icon: <Coffee      className="w-4 h-4" /> },
                  ].map((item) => {
                    const isActive = item.page === "favorites";
                    return (
                      <button
                        key={item.page}
                        onClick={() => {
                          navigateTo(item.page);
                          setDashboardDrawerOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors w-full text-left rounded-xl mt-1 ${
                          isActive
                            ? "bg-brand-gold text-brand-espresso"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Actions and Toggles stacked directly below */}
                <div className="mt-6 border-t border-zinc-800 pt-6 space-y-4">
                  <button
                    onClick={() => { setDashboardDrawerOpen(false); navigateTo("home"); }}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-colors rounded-xl w-full text-left"
                  >
                    <LogOut className="w-4 h-4 -rotate-180" />
                    <span>Back to Store</span>
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-500/80 hover:text-red-400 hover:bg-red-500/5 transition-colors rounded-xl w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRtl(!rtl)}
                      className="flex-grow flex items-center justify-center py-2 h-9 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/25 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      {rtl ? "LTR" : "RTL"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDark(!dark)}
                      className="flex-grow flex items-center justify-center py-2 h-9 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
                    >
                      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Favorites Content ── */}
        <div className="flex-grow w-full space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Collection</span>
            <h2 className="text-3xl font-serif font-bold text-brand-cream flex items-center mt-1">
              <Heart className="w-6.5 h-6.5 mr-2.5 text-red-500 fill-red-500 stroke-0 animate-pulse" /> Saved Favorites
            </h2>
            <p className="text-brand-latte/70 text-sm">
              Keep track of your favorite whole-bean origins, roasting schedules, and micro-lot releases.
            </p>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-medium/20 border border-zinc-800 rounded-2xl">
              <Heart className="w-14 h-14 text-neutral-600 mx-auto mb-3 stroke-1" />
              <p className="text-brand-latte/80 font-medium">Your favorites shelf is empty</p>
              <p className="text-neutral-500 text-sm mt-1">
                Tap the heart icon on any coffee beans or brewing tools in the shop to add them to your shelf.
              </p>
              <button
                onClick={() => navigateTo("shop")}
                className="mt-6 bg-brand-gold/10 border border-brand-gold/30 hover:bg-brand-gold/20 text-brand-gold px-6 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors"
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => navigateTo("product-details", prod.id)}
                  className="group cursor-pointer border border-zinc-800 bg-brand-medium/40 p-4 flex flex-col justify-between hover:border-brand-gold/30 transition-all duration-300 relative rounded-2xl"
                >
                  {/* Remove heart button */}
                  <button
                    onClick={(e) => handleRemoveFavorite(e, prod.id)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-espresso/80 backdrop-blur-sm flex items-center justify-center border border-zinc-800 text-red-500 hover:text-neutral-400 transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <Heart className="w-4.5 h-4.5 fill-red-500" />
                  </button>

                  <div>
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-brand-espresso mb-4 rounded-xl">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-xl"
                      />
                      {prod.category === "coffee" && (
                        <span className="absolute bottom-3 left-3 bg-brand-espresso/90 text-[10px] text-brand-gold font-bold uppercase tracking-wider px-2 py-0.5 border border-brand-gold/15 rounded-full">
                          {prod.roast} Roast
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-brand-gold">
                        <Star className="w-3.5 h-3.5 fill-brand-gold stroke-1" />
                        <span className="ml-1 font-bold">{prod.rating.toFixed(1)}</span>
                      </div>
                      <h3 className="text-base font-bold text-brand-cream truncate group-hover:text-brand-gold transition-colors">
                        {prod.name}
                      </h3>
                    </div>

                    {prod.category === "coffee" && prod.notes && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {prod.notes.map((note) => (
                          <span
                            key={note}
                            className="bg-brand-espresso/60 text-[9px] text-brand-cream/80 px-2.5 py-0.5 rounded-full"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Cart CTA */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-800">
                    <span className="text-base font-serif font-bold text-brand-cream">
                      ${prod.price.toFixed(2)}
                    </span>
                    
                    <button
                      onClick={(e) => handleQuickAdd(e, prod)}
                      className="bg-brand-gold/10 border border-brand-gold/25 hover:bg-brand-gold hover:text-brand-espresso hover:border-transparent text-brand-gold text-xs font-semibold uppercase tracking-wider py-2 px-3.5 rounded-xl transition-all flex items-center"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Reorder
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* ── SECTION 1: RECOMMENDATIONS ── */}
          <div className="bg-brand-medium/20 border border-zinc-800 p-6 rounded-2xl space-y-4 mt-8">
            <div>
              <h3 className="text-lg font-serif font-bold text-white">Curated Recommendations</h3>
              <p className="text-zinc-400 text-xs">Based on your saved profiles, our roastmaster suggests trying these micro-lots.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Guatemala Huehuetenango", notes: "Stonefruit, Red Apple, Milk Chocolate", price: "$23.00", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200" },
                { name: "Kenya AA Nyeri", notes: "Blackberry, Grapefruit, Brown Sugar", price: "$26.50", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=200" }
              ].map((rec, i) => (
                <div key={i} className="flex gap-4 items-center bg-brand-medium/40 border border-zinc-850 p-4 rounded-xl">
                  <img src={rec.image} alt={rec.name} className="w-14 h-14 object-cover border border-zinc-800 rounded-lg shrink-0" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-brand-cream truncate uppercase font-mono">{rec.name}</h4>
                    <p className="text-[10px] text-zinc-500 truncate">{rec.notes}</p>
                    <span className="block text-xs font-bold text-brand-gold">{rec.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 2: ROASTING CALENDAR FOR FAVORITES ── */}
          <div className="bg-brand-medium/20 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-white">Roast Facility Schedule</h3>
            <p className="text-zinc-400 text-xs">Freshness is everything. Track when your favorite profiles are next scheduled for the drum.</p>
            <div className="space-y-3">
              {[
                { name: "Panama Geisha Reserve", schedule: "Every Tuesday, 08:00 AM", status: "In Queue" },
                { name: "Ethiopia Yirgacheffe G1", schedule: "Every Thursday, 10:30 AM", status: "Confirmed" },
                { name: "Colombia Huila Supremo", schedule: "Bi-weekly Wednesdays", status: "Resting" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-zinc-850/50 last:border-0 last:pb-0">
                  <div>
                    <span className="block font-bold text-brand-cream uppercase font-mono">{item.name}</span>
                    <span className="block text-[10px] text-zinc-500 mt-0.5">{item.schedule}</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold border border-brand-gold/20 px-2 py-0.5 rounded-full bg-brand-gold/5">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 3: BREW JOURNAL AND RATIO GUIDE ── */}
          <div className="bg-brand-medium/20 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-white">Extraction Guide for Favorites</h3>
            <p className="text-zinc-400 text-xs">Unlock the complete sensory spectrum of your saved beans at home.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { method: "Pour-over", temp: "93°C", grind: "Medium-Coarse", ratio: "1:16" },
                { method: "Espresso", temp: "91°C", grind: "Fine", ratio: "1:2" },
                { method: "French Press", temp: "95°C", grind: "Coarse", ratio: "1:15" }
              ].map((guide, idx) => (
                <div key={idx} className="bg-brand-medium/40 border border-zinc-850 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">{guide.method}</h4>
                  <div className="text-[11px] text-zinc-400 space-y-0.5">
                    <p>Temp: <span className="text-brand-cream font-mono">{guide.temp}</span></p>
                    <p>Grind: <span className="text-brand-cream">{guide.grind}</span></p>
                    <p>Ratio: <span className="text-brand-cream font-mono">{guide.ratio}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


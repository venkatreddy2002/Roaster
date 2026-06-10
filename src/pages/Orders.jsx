import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { ShoppingBag, ArrowRight, ShieldAlert, CheckCircle, Package, Truck, Clock, User, Heart, Coffee, LogOut, Settings, Menu, X, Sun, Moon } from "lucide-react";

export default function Orders({ onOpenAuth }) {
  const {
    user, orders, navigateTo, logout, dark, setDark, rtl, setRtl,
    dashboardDrawerOpen, setDashboardDrawerOpen
  } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // ── Demo user fallback (so orders history always works) ────────
  const demoUser = {
    displayName: "Coffee Enthusiast",
    email: "demo@obscura.coffee",
    uid: "demo",
  };
  const activeUser = user || demoUser;

  const demoOrders = [
    {
      id: "ORD-2024-001",
      createdAt: "2026-06-01T10:00:00Z",
      status: "Delivered",
      total: 48.50,
      subtotal: 43.50,
      address: "123 Espresso Lane, Cappuccino CA 90210",
      paymentMethod: "Credit Card",
      items: [
        { name: "Ethiopia Yirgacheffe G1", quantity: 1, price: 24.50, grind: "Whole Bean", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200" },
        { name: "Colombia Huila Supremo", quantity: 1, price: 24.00, grind: "French Press", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=200" }
      ]
    },
    {
      id: "ORD-2024-002",
      createdAt: "2026-05-15T14:30:00Z",
      status: "Delivered",
      total: 32.50,
      subtotal: 27.50,
      address: "123 Espresso Lane, Cappuccino CA 90210",
      paymentMethod: "Apple Pay",
      items: [
        { name: "Panama Geisha Reserve", quantity: 1, price: 32.50, grind: "Drip", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=200" }
      ]
    },
    {
      id: "ORD-2024-003",
      createdAt: "2026-04-10T09:15:00Z",
      status: "Delivered",
      total: 61.00,
      subtotal: 56.00,
      address: "123 Espresso Lane, Cappuccino CA 90210",
      paymentMethod: "Credit Card",
      items: [
        { name: "Colombia Pink Bourbon Honey", quantity: 1, price: 26.00, grind: "Whole Bean", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200" },
        { name: "Sumatran Mandheling Organic", quantity: 1, price: 30.00, grind: "Coarse", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=200" }
      ]
    },
    {
      id: "ORD-2024-004",
      createdAt: "2026-03-20T11:20:00Z",
      status: "Delivered",
      total: 29.00,
      subtotal: 24.00,
      address: "123 Espresso Lane, Cappuccino CA 90210",
      paymentMethod: "Credit Card",
      items: [
        { name: "Ethiopia Yirgacheffe G1", quantity: 1, price: 24.00, grind: "Espresso", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200" }
      ]
    },
    {
      id: "ORD-2024-005",
      createdAt: "2026-02-05T16:45:00Z",
      status: "Delivered",
      total: 135.00,
      subtotal: 130.00,
      address: "123 Espresso Lane, Cappuccino CA 90210",
      paymentMethod: "PayPal",
      items: [
        { name: "Panama Geisha Reserve", quantity: 4, price: 32.50, grind: "Whole Bean", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=200" }
      ]
    }
  ];
  const activeOrders = user ? orders : demoOrders;

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Helper icons for status
  const getStatusIcon = (status) => {
    if (status === "Ordered") return <Clock className="w-4 h-4 text-brand-gold" />;
    if (status === "Roasting") return <Package className="w-4 h-4 text-brand-gold" />;
    if (status === "Shipped") return <Truck className="w-4 h-4 text-emerald-400" />;
    return <CheckCircle className="w-4 h-4 text-emerald-400" />;
  };

  const getStatusClass = (status) => {
    if (status === "Ordered" || status === "Roasting") {
      return "bg-brand-gold/10 border-brand-gold/20 text-brand-gold";
    }
    return "bg-emerald-950/30 border-emerald-800/40 text-emerald-400";
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
              const isActive = item.page === "orders";
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
                    const isActive = item.page === "orders";
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

        {/* ── Main Orders Content ── */}
        <div className="flex-grow w-full space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">History</span>
            <h2 className="text-3xl font-serif font-bold text-brand-cream flex items-center mt-1">
              <ShoppingBag className="w-6.5 h-6.5 mr-2.5 text-brand-gold" /> Order History
            </h2>
            <p className="text-brand-latte/70 text-sm">
              Review details of your premium purchases, subscription shipments, and custom blends.
            </p>
          </div>

          {activeOrders.length === 0 ? (
            <div className="text-center py-20 bg-brand-medium/20 border border-zinc-800 rounded-2xl">
              <ShoppingBag className="w-14 h-14 text-neutral-600 mx-auto mb-3 stroke-1" />
              <p className="text-brand-latte/80 font-medium">No order history available</p>
              <p className="text-neutral-500 text-sm mt-1">
                You haven't ordered anything yet. Visit our catalog to make your first purchase.
              </p>
              <button
                onClick={() => navigateTo("shop")}
                className="mt-6 bg-brand-gold/10 border border-brand-gold/30 hover:bg-brand-gold/20 text-brand-gold px-6 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors"
              >
                Explore the Shop
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => {
                const isExpanded = expandedOrderId === order.id;

                return (
                  <div 
                    key={order.id}
                    className="border border-zinc-800 bg-brand-medium/40 overflow-hidden shadow-lg rounded-2xl"
                  >
                    {/* Order Summary Line */}
                    <div 
                      onClick={() => toggleExpand(order.id)}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/10 transition-colors select-none"
                    >
                      <div className="space-y-1">
                        <span className="text-xs text-neutral-500 font-bold uppercase font-mono">{order.id}</span>
                        <h3 className="text-sm font-bold text-brand-cream">
                          Ordered: {new Date(order.createdAt).toLocaleDateString(undefined, { 
                            month: 'short', day: 'numeric', year: 'numeric' 
                          })}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm">
                        <div className="text-left sm:text-right">
                          <span className="text-neutral-500 text-xs block">Total Amount</span>
                          <span className="font-bold text-brand-cream font-mono">${order.total.toFixed(2)}</span>
                        </div>

                        <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider ${getStatusClass(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{order.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="p-6 border-t border-neutral-900 bg-brand-espresso/40 space-y-6">
                        {/* Items List */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Items Ordered</h4>
                          <div className="divide-y divide-neutral-900">
                            {order.items.map((item, idx) => (
                              <div 
                                key={idx}
                                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                              >
                                <div className="flex items-center space-x-3.5">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-12 h-12 object-cover border border-zinc-800 rounded-xl"
                                  />
                                  <div>
                                    <h5 className="text-sm font-bold text-brand-cream">{item.name}</h5>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                      Qty: {item.quantity} • Grind: {item.grind || "N/A"}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-sm font-semibold text-brand-cream font-mono">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Logistics Tracker Stepper */}
                        <div className="space-y-3 pt-4 border-t border-neutral-900/60">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Delivery Tracker</h4>
                          
                          {/* Timeline */}
                          <div className="pt-2 flex items-center justify-center max-w-lg mx-auto">
                            {["Ordered", "Roasting", "Shipped", "Delivered"].map((step, idx, arr) => {
                              const steps = ["Ordered", "Roasting", "Shipped", "Delivered"];
                              const currentIndex = steps.indexOf(order.status);
                              const isCompleted = idx <= currentIndex;
                              const isLast = idx === arr.length - 1;

                              return (
                                <React.Fragment key={step}>
                                  <div className="flex flex-col items-center relative">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                                      isCompleted 
                                        ? "bg-brand-gold border-brand-gold text-brand-espresso"
                                        : "bg-brand-espresso border-neutral-800 text-neutral-500"
                                    }`}>
                                      {idx + 1}
                                    </div>
                                    <span className="absolute top-7 text-[9px] text-neutral-400 font-medium tracking-wide text-center w-14 truncate">
                                      {step}
                                    </span>
                                  </div>
                                  {!isLast && (
                                    <div className={`flex-1 h-[2px] ${
                                      idx < currentIndex ? "bg-brand-gold" : "bg-neutral-800"
                                    }`} />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                          <div className="h-6" /> {/* timeline labels spacer */}
                        </div>

                        {/* Delivery & Billing Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-900/60 text-sm">
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Shipping Destination</h4>
                            <p className="text-brand-cream leading-relaxed">{order.address}</p>
                          </div>

                          <div className="space-y-1.5 sm:text-right">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Payment Summary</h4>
                            <p className="text-brand-cream">
                              Payment via <span className="font-semibold">{order.paymentMethod}</span>
                            </p>
                            <p className="text-xs text-neutral-500 mt-1">
                              Subtotal: ${order.subtotal.toFixed(2)} • Shipping: $5.00
                            </p>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── SECTION 1: QUICK REORDER ESSENTIALS ── */}
          <div className="bg-brand-medium/20 border border-zinc-800 p-6 rounded-2xl space-y-4 mt-8">
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-white">Subscribe & Save 15%</h3>
              <p className="text-zinc-400 text-xs">Never run out of freshly roasted single-origins. Join our active Coffee Club.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-medium/40 border border-zinc-850 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center font-bold font-serif text-sm">C</div>
                <div>
                  <h4 className="text-xs font-bold text-brand-cream uppercase font-mono">Obscura Coffee Club</h4>
                  <p className="text-[10px] text-zinc-500">Free delivery • Cancel anytime • Customized profiles</p>
                </div>
              </div>
              <button 
                onClick={() => navigateTo("coffee-club")}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
              >
                Join Coffee Club
              </button>
            </div>
          </div>

          {/* ── SECTION 2: SHIPPING & LOGISTICS ACCORDION ── */}
          <div className="bg-brand-medium/20 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-white">Logistics & Roasting Schedule</h3>
            <div className="space-y-3">
              {[
                { q: "When is my coffee roasted?", a: "We roast every Tuesday and Thursday morning. Orders received before midnight are roasted in the next immediate batch to ensure maximum freshness." },
                { q: "How long is shipping?", a: "We ship nationwide via DHL/FedEx Express. Delivery typically takes 2-3 business days. You will receive tracking logs as soon as the package is collected." },
                { q: "Are packaging bags recyclable?", a: "Yes, our bags are made of 100% compostable Kraft paper with plant-based high-barrier lining. Simply remove the tin-tie before composting." }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-zinc-850/50 pb-3 last:border-0 last:pb-0">
                  <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-1">{faq.q}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 3: REFERRAL & REWARDS PROGRESS ── */}
          <div className="bg-brand-medium/20 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-white">Invite Friends, Get Free Coffee</h3>
                <p className="text-zinc-400 text-xs">Share the obsession. Get 250g premium Panama Geisha for every successful referral.</p>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-850 px-3.5 py-2 rounded-xl">
                <span className="text-xs font-mono text-zinc-400 select-all">obscura.coffee/ref?user=enthusiast</span>
                <button 
                  onClick={() => { navigator.clipboard.writeText("obscura.coffee/ref?user=enthusiast"); alert("Referral link copied!"); }}
                  className="text-[10px] uppercase font-bold text-brand-gold hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

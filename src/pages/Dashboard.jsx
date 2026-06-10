import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Pause, Play, User, ShoppingBag, Heart, LogOut, Coffee, Settings, Menu, X, Sun, Moon } from "lucide-react";

export default function Dashboard({ onOpenAuth }) {
  const {
    user, subscription, orders, favorites,
    products, updateSubscriptionStatus, navigateTo, logout, page,
    dark, setDark, rtl, setRtl,
    dashboardDrawerOpen, setDashboardDrawerOpen
  } = useApp();

  const [busy, setBusy] = useState(false);

  // ── Demo user fallback (so dashboard always works) ────────
  const demoUser = {
    displayName: "Coffee Enthusiast",
    email: "demo@obscura.coffee",
    uid: "demo",
  };
  const activeUser = user || demoUser;

  const demoOrders = [
    { id: "ORD-2024-001", date: "2026-06-01", status: "Delivered", total: 48.50, items: [{ name: "Ethiopia Yirgacheffe G1", qty: 1, price: 24.50 }, { name: "Colombia Huila Supremo", qty: 1, price: 24.00 }] },
    { id: "ORD-2024-002", date: "2026-05-15", status: "Delivered", total: 32.50, items: [{ name: "Panama Geisha Reserve", qty: 1, price: 32.50 }] },
    { id: "ORD-2024-003", date: "2026-04-10", status: "Delivered", total: 61.00, items: [{ name: "Colombia Pink Bourbon Honey", qty: 1, price: 26.00 }, { name: "Sumatran Mandheling Organic", qty: 1, price: 30.00 }] },
    { id: "ORD-2024-004", date: "2026-03-20", status: "Delivered", total: 29.00, items: [{ name: "Ethiopia Yirgacheffe G1", qty: 1, price: 24.00 }] },
    { id: "ORD-2024-005", date: "2026-02-05", status: "Delivered", total: 135.00, items: [{ name: "Panama Geisha Reserve", qty: 4, price: 32.50 }] },
  ];
  const demoFavorites = ["ethiopia-yirgacheffe", "geisha-reserve"];
  const demoSubscription = {
    roastType: "Light",
    bagSize: "250g",
    frequency: "Monthly",
    grind: "Whole Bean",
    status: "Active",
    nextDeliveryDate: new Date(Date.now() + 12 * 86400000).toISOString(),
  };

  const activeOrders = user ? orders : demoOrders;
  const activeFavorites = user ? favorites : demoFavorites;
  const activeSub = user ? subscription : demoSubscription;

  const subActive = activeSub && activeSub.status !== "Cancelled";

  const toggleSub = async () => {
    if (!subActive) return;
    setBusy(true);
    if (user) {
      await updateSubscriptionStatus(
        activeSub.status === "Active" ? "Paused" : "Active"
      );
    }
    setBusy(false);
  };

  // ── Derived stats ─────────────────────────────────────────
  const totalSpent   = activeOrders.reduce((s, o) => s + o.total, 0);
  const loyaltyPts   = 150 + Math.floor(totalSpent * 10);
  const progress     = Math.min(100, ((loyaltyPts % 1000) / 1000) * 100);
  const ptsLeft      = Math.max(0, 1000 - (loyaltyPts % 1000));

  const latestOrder  = activeOrders[0] ?? null;

  const topFav = activeFavorites
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)[0] ?? null;

  // ── Shared card chrome ────────────────────────────────────
  const Card = ({ children, className = "" }) => (
    <div className={`bg-brand-medium/40 border border-zinc-800 p-6 flex flex-col gap-3 rounded-2xl ${className}`}>
      {children}
    </div>
  );

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
              const isActive = page === item.page;
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
                    const isActive = page === item.page;
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

        {/* ── Main Dashboard Overview Content ── */}
        <div className="flex-grow w-full space-y-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Overview</span>
            <h2 className="text-3xl font-serif font-bold text-white mt-1">Dashboard</h2>
            <p className="text-zinc-500 text-sm mt-0.5">Welcome back to Obscura Coffee Roasters.</p>
          </div>

          {/* Primary 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 — Active Subscription */}
            <Card>
              <h3 className="text-white font-semibold">Active Subscription</h3>

              {subActive ? (
                <>
                  <p className="text-brand-gold font-bold text-lg leading-snug">
                    {activeSub.roastType} Roast · {activeSub.bagSize}
                  </p>
                  <p className="text-zinc-400 text-sm">{activeSub.frequency} · {activeSub.grind}</p>
                  <p className="text-zinc-500 text-xs mt-1">
                    Next ship:{" "}
                    <span className="text-brand-gold font-mono">
                      {new Date(activeSub.nextDeliveryDate).toLocaleDateString(undefined, {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </span>
                  </p>

                  {/* Status badge */}
                  <span className={`self-start text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border mt-1 ${
                    activeSub.status === "Active"
                      ? "bg-emerald-950/50 border-emerald-800/40 text-emerald-400"
                      : "bg-brand-gold/15 border-brand-gold/20 text-brand-gold"
                  }`}>
                    {activeSub.status}
                  </span>

                  {/* Pause / Resume */}
                  <button
                    onClick={toggleSub}
                    disabled={busy}
                    className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-800 border border-neutral-700 hover:border-neutral-600 px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 self-start"
                  >
                    {activeSub.status === "Active"
                      ? <><Pause className="w-3.5 h-3.5 text-brand-gold" /> Pause Shipments</>
                      : <><Play  className="w-3.5 h-3.5 text-emerald-400" /> Resume Shipments</>
                    }
                  </button>
                </>
              ) : (
                <>
                  <p className="text-zinc-400 text-sm">No active plan.</p>
                  <button
                    onClick={() => navigateTo("coffee-club")}
                    className="self-start mt-6 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Build a Plan
                  </button>
                </>
              )}
            </Card>

            {/* Card 2 — Orders */}
            <Card>
              <h3 className="text-white font-semibold">Orders</h3>
              <p className="text-brand-gold font-bold text-lg">
                {activeOrders.length} Completed
              </p>

              {activeOrders.length > 0 && (
                <div className="space-y-2">
                  <p className="text-zinc-400 text-sm">
                    Last order · ${latestOrder.total.toFixed(2)}
                  </p>

                  {/* Per-order bubbles — one filled circle per order */}
                  <div className="flex items-center gap-1 pt-1 flex-wrap">
                    {activeOrders.slice(0, 8).map((_, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full border bg-brand-gold border-brand-gold text-brand-espresso text-[9px] flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        {i < Math.min(activeOrders.length, 8) - 1 && (
                          <div className="h-0.5 w-4 bg-brand-gold" />
                        )}
                      </div>
                    ))}
                    {activeOrders.length > 8 && (
                      <span className="text-xs text-zinc-500 ml-1">+{activeOrders.length - 8} more</span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">All Delivered</p>
                </div>
              )}

              <button
                onClick={() => navigateTo("orders")}
                className="self-start mt-auto text-xs text-brand-gold hover:text-brand-gold/90 underline font-medium"
              >
                View all orders →
              </button>
            </Card>

            {/* Card 3 — Favourite Blend */}
            <Card>
              <h3 className="text-white font-semibold">Favourite Blend</h3>

              {topFav ? (
                <>
                  <div className="flex items-center gap-3">
                    <img
                      src={topFav.image}
                      alt={topFav.name}
                      className="w-12 h-12 rounded-xl object-cover border border-neutral-800"
                    />
                    <div>
                      <p className="text-brand-gold font-bold leading-snug">{topFav.name}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">
                        {topFav.roast ? `${topFav.roast} Roast` : topFav.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-xs mt-1">${topFav.price.toFixed(2)} per bag</p>
                  <button
                    onClick={() => navigateTo("favorites")}
                    className="self-start mt-auto text-xs text-brand-gold hover:text-brand-gold/90 underline font-medium"
                  >
                    View all favourites →
                  </button>
                </>
              ) : (
                <>
                  <p className="text-zinc-400 text-sm">No saved blends yet.</p>
                  <button
                    onClick={() => navigateTo("shop")}
                    className="self-start mt-6 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Browse Beans
                  </button>
                </>
              )}
            </Card>

          </div>

          {/* Loyalty & Quick Actions Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Loyalty Points */}
            <div className="bg-brand-medium/40 border border-zinc-800 p-6 flex flex-col gap-4 rounded-2xl">
              <div className="flex items-baseline justify-between">
                <h3 className="text-white font-semibold">Loyalty Points</h3>
                <span className="text-2xl font-bold text-brand-gold font-mono">{loyaltyPts.toLocaleString()}</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2">
                <div
                  className="bg-brand-gold h-2 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-zinc-400 text-xs">
                Earn <span className="text-brand-gold font-bold font-mono">{ptsLeft}</span> more points for a free 250g Panama Geisha bag.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-brand-medium/40 border border-zinc-800 p-6 flex flex-col gap-3 rounded-2xl">
              <h3 className="text-white font-semibold mb-1">Quick Actions</h3>
              {[
                { label: "Manage Subscription", target: "coffee-club" },
                { label: "Order History",        target: "orders" },
                { label: "Saved Favourites",     target: "favorites" },
                { label: "Beans Origin Story",   target: "about-beans" },
              ].map(({ label, target }) => (
                <button
                  key={target}
                  onClick={() => navigateTo(target)}
                  className="text-left text-sm text-zinc-300 hover:text-brand-gold hover:translate-x-1 transition-all font-semibold"
                >
                  {label} →
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

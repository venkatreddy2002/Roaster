import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Coffee, TrendingUp, Users, Calendar, ShoppingBag, Settings, Plus, RotateCw, CheckCircle2, ChevronRight, AlertTriangle, User, LogOut, Activity, Search, Save, Menu, X, Sun, Moon } from "lucide-react";

export default function AdminDashboard() {
  const { navigateTo, logout, dark, setDark, rtl, setRtl, dashboardDrawerOpen, setDashboardDrawerOpen } = useApp();
  const [activeTab, setActiveTab] = useState("roasts");
  const [scheduledRoasts, setScheduledRoasts] = useState([
    { id: 1, origin: "Panama Geisha (Boquete Valley)", batch: "15kg", temp: "204°C", status: "Roasting", time: "11:45 AM", profile: "Light Floral Curve v4" },
    { id: 2, origin: "Ethiopia Yirgacheffe", batch: "30kg", temp: "198°C", status: "Pre-heating", time: "12:15 PM", profile: "Citrus Express Curve v2" },
    { id: 3, origin: "Colombia Pink Bourbon", batch: "15kg", temp: "212°C", status: "Completed", time: "10:30 AM", profile: "Medium Anaerobic Curve v9" },
    { id: 4, origin: "Sumatran Mandheling", batch: "30kg", temp: "222°C", status: "Completed", time: "09:15 AM", profile: "Dark Molasses v1" },
  ]);

  const [newOrigin, setNewOrigin] = useState("Ethiopia Sidama");
  const [newBatch, setNewBatch] = useState("15kg");
  const [newProfile, setNewProfile] = useState("Light Citrus");
  const [newTime, setNewTime] = useState("01:30 PM");

  const [inventory, setInventory] = useState([
    { origin: "Panama Geisha Green lots", stock: 120, capacity: 500, region: "Boquete Valley" },
    { origin: "Ethiopia Yirgacheffe Grade 1", stock: 380, capacity: 600, region: "Gedeo Zone" },
    { origin: "Colombia Pink Bourbon Honey", stock: 450, capacity: 500, region: "Huila Region" },
    { origin: "Sumatran Mandheling Organic", stock: 85, capacity: 400, region: "Aceh Highlands" },
    { origin: "Kenya AA Nyeri", stock: 240, capacity: 300, region: "Nyeri County" },
  ]);

  const recentSubscriptions = [
    { id: 101, name: "Pranitha Reddy", plan: "250g Monthly", roast: "Light Roast", date: "Just now", amount: "$24.00" },
    { id: 102, name: "Suresh Kumar", plan: "500g Bi-weekly", roast: "Medium Roast", date: "15 mins ago", amount: "$38.00" },
    { id: 103, name: "Ananya Sharma", plan: "1kg Monthly", roast: "Dark Roast", date: "1 hour ago", amount: "$62.00" },
    { id: 104, name: "David Miller", plan: "250g Weekly", roast: "Light Roast", date: "4 hours ago", amount: "$24.00" },
  ];

  // Added Customer Orders Management
  const [customerOrders, setCustomerOrders] = useState([
    { id: "ORD-9281", customer: "Pranitha Reddy", date: "2026-06-08", items: "Obscura Signature Blend (250g)", amount: 26.00, status: "Roasting" },
    { id: "ORD-9282", customer: "Suresh Kumar", date: "2026-06-08", items: "Colombia Huila Supremo (500g)", amount: 43.00, status: "Shipped" },
    { id: "ORD-9283", customer: "Ananya Sharma", date: "2026-06-07", items: "Panama Geisha Finca Esmeralda (1kg)", amount: 135.00, status: "Delivered" },
    { id: "ORD-9284", customer: "David Miller", date: "2026-06-07", items: "Ethiopia Yirgacheffe G1 (250g)", amount: 24.50, status: "Ordered" },
    { id: "ORD-9285", customer: "Ravi Teja", date: "2026-06-06", items: "Chemex Classic Series 6-Cup", amount: 54.00, status: "Delivered" },
  ]);

  // Added Users List Directory
  const [usersList, setUsersList] = useState([
    { id: "usr-1", name: "Pranitha Reddy", email: "pranitha@example.com", role: "Member", subscription: "Active (250g Monthly)", points: 395, orders: 1 },
    { id: "usr-2", name: "Suresh Kumar", email: "suresh.k@example.com", role: "Member", subscription: "Active (500g Bi-weekly)", points: 580, orders: 3 },
    { id: "usr-3", name: "Ananya Sharma", email: "ananya.sharma@example.com", role: "Member", subscription: "Active (1kg Monthly)", points: 1420, orders: 5 },
    { id: "usr-4", name: "David Miller", email: "david.miller@example.com", role: "Member", subscription: "Active (250g Weekly)", points: 240, orders: 2 },
    { id: "usr-5", name: "Siva Kumar", email: "siva.kumar@example.com", role: "Admin", subscription: "None", points: 0, orders: 0 },
    { id: "usr-6", name: "Jeevan", email: "jeevan@example.com", role: "Member", subscription: "Active (250g Monthly)", points: 395, orders: 1 }
  ]);

  // Added Settings Configuration State
  const [roasterySettings, setRoasterySettings] = useState({
    name: "Obscura Seattle Roastery",
    dailyCapacity: 240,
    targetTemp: 215,
    emailAlerts: true,
    weeklyReports: false,
    slackIntegration: true,
    slackWebhook: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
  });

  const [toastMessage, setToastMessage] = useState("");

  const handleAddRoast = (e) => {
    e.preventDefault();
    if (!newOrigin) return;
    const newScheduled = {
      id: scheduledRoasts.length + 1,
      origin: newOrigin,
      batch: newBatch,
      temp: "---",
      status: "Scheduled",
      time: newTime,
      profile: newProfile,
    };
    setScheduledRoasts([newScheduled, ...scheduledRoasts]);
    setNewOrigin("");
  };

  // Improved getStatusColor to be readable in both light mode and dark mode
  const getStatusColor = (status) => {
    switch (status) {
      case "Roasting":
        return "bg-brand-gold/15 text-brand-gold border-brand-gold/30 animate-pulse";
      case "Pre-heating":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50";
      default:
        return "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* ── Admin Dashboard Sidebar (Desktop) ── */}
        <div className="hidden md:flex w-60 shrink-0 flex-col md:sticky md:top-4 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-y-auto scrollbar-none border border-zinc-800 rounded-2xl overflow-hidden bg-brand-espresso/40">
          {/* Profile summary */}
          <div className="bg-brand-espresso/70 p-5 text-center flex flex-col items-center border-b border-zinc-800">
            <div className="w-14 h-14 bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-3 rounded-full">
              <Activity className="w-7 h-7" />
            </div>
            <h4 className="text-white font-serif font-bold text-base leading-snug">Roastery Operations</h4>
            <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold mt-1">Admin Panel</span>
            <div className="flex justify-around w-full text-xs mt-4">
              <div className="text-center">
                <span className="block text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Active lots</span>
                <span className="font-bold text-white font-mono">{inventory.length}</span>
              </div>
              <div className="text-center">
                <span className="block text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Queued</span>
                <span className="font-bold text-white font-mono">{scheduledRoasts.length}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col w-full bg-brand-espresso/40">
            {[
              { label: "Overview", page: "roasts", icon: <Calendar className="w-4 h-4" /> },
              { label: "Inventory", page: "inventory", icon: <Coffee className="w-4 h-4" /> },
              { label: "Orders Queue", page: "orders", icon: <ShoppingBag className="w-4 h-4" /> },
              { label: "User Directory", page: "users", icon: <Users className="w-4 h-4" /> },
              { label: "Settings", page: "settings", icon: <Settings className="w-4 h-4" /> },
            ].map((item) => {
              const isActive = activeTab === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => setActiveTab(item.page)}
                  className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors w-full text-left whitespace-nowrap border-b border-zinc-800/60 ${isActive
                      ? "bg-brand-gold text-brand-espresso"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="h-px bg-zinc-800" />

            <button
              onClick={() => { logout(); navigateTo("home"); }}
              className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-500/80 hover:text-red-400 hover:bg-red-500/5 transition-colors whitespace-nowrap w-full text-left"
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
                  <div className="w-14 h-14 bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-3 rounded-full">
                    <Activity className="w-7 h-7" />
                  </div>
                  <h4 className="text-white font-serif font-bold text-base leading-snug">Roastery Operations</h4>
                  <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold mt-1">Admin Panel</span>
                  <div className="flex justify-around w-full text-xs mt-4">
                    <div className="text-center">
                      <span className="block text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Active lots</span>
                      <span className="font-bold text-white font-mono">{inventory.length}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Queued</span>
                      <span className="font-bold text-white font-mono">{scheduledRoasts.length}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col w-full mt-4">
                  {[
                    { label: "Overview", page: "roasts", icon: <Calendar className="w-4 h-4" /> },
                    { label: "Inventory", page: "inventory", icon: <Coffee className="w-4 h-4" /> },
                    { label: "Orders Queue", page: "orders", icon: <ShoppingBag className="w-4 h-4" /> },
                    { label: "User Directory", page: "users", icon: <Users className="w-4 h-4" /> },
                    { label: "Settings", page: "settings", icon: <Settings className="w-4 h-4" /> },
                  ].map((item) => {
                    const isActive = activeTab === item.page;
                    return (
                      <button
                        key={item.page}
                        onClick={() => {
                          setActiveTab(item.page);
                          setDashboardDrawerOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors w-full text-left rounded-xl mt-1 ${isActive
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
                    onClick={() => { logout(); navigateTo("home"); }}
                    className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-500/80 hover:text-red-400 hover:bg-red-500/5 transition-colors rounded-xl w-full text-left"
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

        {/* ── Main Operations Dashboard Panel ── */}
        <div className="flex-grow w-full space-y-8">

          {activeTab === "roasts" && (
            <div className="space-y-8">
              {/* Header summary statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Monthly Gross Revenue", val: "$14,862.00", sub: "+12.4% vs last month", icon: <TrendingUp className="w-5 h-5" /> },
                  { label: "Active Club Members", val: "1,248 subscribers", sub: "34 new signups this week", icon: <Users className="w-5 h-5" /> },
                  { label: "Production Load", val: "240 kg / Day", sub: "82% roaster capacity", icon: <Coffee className="w-5 h-5" /> },
                  { label: "Pending Orders", val: "18 deliveries", sub: "12 roasting, 6 ready to ship", icon: <ShoppingBag className="w-5 h-5" /> },
                ].map((c, i) => (
                  <div key={i} className="bg-brand-medium/50 border border-zinc-800 p-6 space-y-4 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{c.label}</span>
                      <div className="w-8 h-8 rounded-lg bg-zinc-850 text-brand-gold flex items-center justify-center border border-zinc-800">
                        {c.icon}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-2xl font-bold text-white font-mono">{c.val}</span>
                      <span className="block text-xs text-brand-gold/80">{c.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: Active Roast Schedule */}
                <div className="lg:col-span-8 bg-brand-medium/40 border border-zinc-800 p-8 space-y-6 rounded-2xl">
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-brand-gold" />
                      <h3 className="text-xl font-serif font-bold text-white">Daily Roasting Schedule</h3>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">Today's Queue</span>
                  </div>

                  <div className="space-y-4">
                    {scheduledRoasts.map((roast) => (
                      <div key={roast.id} className="bg-brand-medium/70 border border-neutral-800/80 p-5 flex flex-wrap justify-between items-center gap-4 rounded-xl">
                        <div className="space-y-1">
                          <span className="block text-sm font-semibold text-white">{roast.origin}</span>
                          <div className="flex items-center gap-3 text-xs text-zinc-500">
                            <span>Batch: <strong className="text-zinc-300 font-mono">{roast.batch}</strong></span>
                            <span>•</span>
                            <span>Curve: <strong className="text-brand-gold/90">{roast.profile}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 ml-auto sm:ml-0">
                          <div className="text-right">
                            <span className="block text-xs text-zinc-500 font-mono">{roast.time}</span>
                            <span className="block text-[10px] text-zinc-400 font-mono mt-0.5">{roast.temp !== "---" ? `Drop: ${roast.temp}` : "Drop Temp: TBD"}</span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusColor(roast.status)}`}>
                            {roast.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Add to schedule & Recent Subscriptions */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Form */}
                  <form onSubmit={handleAddRoast} className="bg-brand-medium/40 border border-zinc-800 p-6 space-y-4 rounded-2xl">
                    <h4 className="text-lg font-serif font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-850">
                      <Plus className="w-4 h-4 text-brand-gold" /> Add Roast Job
                    </h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Coffee Lot</label>
                        <input
                          type="text"
                          value={newOrigin}
                          onChange={(e) => setNewOrigin(e.target.value)}
                          placeholder="e.g. Ethiopia Sidama Grade 1"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold/60"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Batch Size</label>
                          <select
                            value={newBatch}
                            onChange={(e) => setNewBatch(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
                          >
                            <option>15kg</option>
                            <option>30kg</option>
                            <option>60kg</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Scheduled Time</label>
                          <input
                            type="text"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            placeholder="e.g. 02:45 PM"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Roast Thermal Profile</label>
                        <input
                          type="text"
                          value={newProfile}
                          onChange={(e) => setNewProfile(e.target.value)}
                          placeholder="e.g. Light Fruity Express"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors mt-2"
                    >
                      Queue Roast Job
                    </button>
                  </form>

                  {/* Subscriptions Feed */}
                  <div className="bg-brand-medium/40 border border-zinc-800 p-6 space-y-4 rounded-2xl">
                    <h4 className="text-lg font-serif font-bold text-white pb-2 border-b border-zinc-850">
                      Recent Sign-ups
                    </h4>
                    <div className="space-y-3">
                      {recentSubscriptions.map((sub) => (
                        <div key={sub.id} className="flex justify-between items-center text-xs pb-3 border-b border-zinc-850/50 last:border-0 last:pb-0">
                          <div>
                            <span className="block font-bold text-white">{sub.name}</span>
                            <span className="block text-[10px] text-zinc-500 mt-0.5">{sub.plan} · <strong className="text-brand-gold/90">{sub.roast}</strong></span>
                          </div>
                          <div className="text-right">
                            <span className="block font-bold text-zinc-300 font-mono">{sub.amount}</span>
                            <span className="block text-[9px] text-zinc-500 mt-0.5">{sub.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "inventory" && (
            /* INVENTORY TAB PANEL */
            <div className="bg-brand-medium/40 border border-zinc-800 p-8 space-y-6 rounded-2xl">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-4">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-brand-gold" />
                  <h3 className="text-xl font-serif font-bold text-white">Green Bean Lots Inventory</h3>
                </div>
                <span className="text-xs text-zinc-500">Stock Levels</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {inventory.map((inv, idx) => {
                  const pct = (inv.stock / inv.capacity) * 100;
                  const isLow = pct < 25;
                  return (
                    <div key={idx} className="bg-brand-medium/70 border border-neutral-800/80 p-6 space-y-4 rounded-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-semibold text-white">{inv.origin}</h4>
                          <span className="text-xs text-zinc-500">{inv.region}</span>
                        </div>
                        {isLow && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                            <AlertTriangle className="w-3 h-3" /> Low Stock
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-zinc-400">
                          <span>Available: <strong className="text-white">{inv.stock} kg</strong></span>
                          <span>Max Cap: {inv.capacity} kg</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full">
                          <div
                            className={`h-2 rounded-full transition-all duration-700 ${isLow ? "bg-amber-500" : "bg-brand-gold"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── SECTION 1: URGENT REORDER ALERTS ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4 mt-8">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Urgent Replenishment Alerts</h4>
                  <p className="text-xs text-zinc-500">Green coffee lots currently under the critical threshold of 100 kg.</p>
                </div>
                <div className="space-y-3">
                  {[
                    { origin: "Sumatran Mandheling Organic", stock: "85 kg", supplier: "Aceh Cooperative", status: "Critical" },
                    { origin: "Panama Geisha Green lots", stock: "120 kg", supplier: "Finca Esmeralda", status: "Warning" }
                  ].map((alert, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-lg border border-zinc-850">
                      <div>
                        <span className="block text-xs font-bold text-white uppercase font-mono">{alert.origin}</span>
                        <span className="block text-[10px] text-zinc-500 mt-0.5">Supplier: {alert.supplier}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-red-400">{alert.stock} remaining</span>
                        <button className="px-3 py-1.5 bg-brand-gold/15 hover:bg-brand-gold text-brand-gold hover:text-brand-espresso text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all">
                          Contact Supplier
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 2: WAREHOUSE SILO MICRO-CLIMATE ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4">
                <h4 className="text-sm font-semibold text-white">Warehouse Silo Micro-Climate</h4>
                <p className="text-xs text-zinc-500">Real-time green storage environmental metrics from IoT sensors.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  {[
                    { silo: "Silo A (Panama/Colombia)", temp: "19.2°C", rh: "58% RH", status: "Optimal" },
                    { silo: "Silo B (Ethiopia/Kenya)", temp: "18.8°C", rh: "55% RH", status: "Optimal" },
                    { silo: "Silo C (Sumatra/Blends)", temp: "20.1°C", rh: "62% RH", status: "High RH Warning" }
                  ].map((s, idx) => (
                    <div key={idx} className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-lg space-y-1">
                      <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wide">{s.silo}</span>
                      <p className="text-sm font-bold text-white font-mono">{s.temp} · {s.rh}</p>
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-wider mt-1.5 px-2 py-0.5 rounded-full ${s.status === "Optimal" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30" : "bg-amber-950/40 text-amber-400 border border-amber-900/30"
                        }`}>
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 3: DIRECT TRADE CONTRACTS ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4">
                <h4 className="text-sm font-semibold text-white">Active Sourcing Contracts</h4>
                <p className="text-xs text-zinc-500">Upcoming direct-trade shipments currently cleared at origin ports.</p>
                <div className="space-y-3">
                  {[
                    { origin: "Panama Geisha Finca Esmeralda Lot #3A", eta: "June 22, 2026", weight: "500 kg", status: "Ocean Transit" },
                    { origin: "Kenya Nyeri County AA Lot #12B", eta: "July 08, 2026", weight: "1200 kg", status: "Origin Port" }
                  ].map((c, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-zinc-850/50 last:border-0 last:pb-0">
                      <div>
                        <span className="block font-bold text-brand-gold uppercase font-mono">{c.origin}</span>
                        <span className="block text-[10px] text-zinc-500 mt-0.5">Est. Arrival: {c.eta} • Weight: {c.weight}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            /* ORDERS TAB PANEL */
            <div className="bg-brand-medium/40 border border-zinc-800 p-8 space-y-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-850 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-gold" />
                  <h3 className="text-xl font-serif font-bold text-white">Customer Orders & Status</h3>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850/50">
                    {customerOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-brand-gold">{order.id}</td>
                        <td className="py-4 px-4 text-white font-medium">{order.customer}</td>
                        <td className="py-4 px-4 text-zinc-400">{order.date}</td>
                        <td className="py-4 px-4 text-zinc-300 max-w-[200px] truncate">{order.items}</td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-white">${order.amount.toFixed(2)}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-full ${order.status === "Roasting" ? "bg-brand-gold/15 text-brand-gold border-brand-gold/30 animate-pulse" :
                              order.status === "Shipped" ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50" :
                                order.status === "Delivered" ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50" :
                                  "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                            }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {order.status === "Ordered" && (
                              <button
                                onClick={() => {
                                  setCustomerOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: "Roasting" } : o));
                                }}
                                className="px-2 py-1 bg-brand-gold/20 hover:bg-brand-gold text-brand-gold hover:text-brand-espresso font-bold text-[9px] uppercase tracking-wider rounded-xl transition-colors"
                              >
                                Roast
                              </button>
                            )}
                            {order.status === "Roasting" && (
                              <button
                                onClick={() => {
                                  setCustomerOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: "Shipped" } : o));
                                }}
                                className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-500 hover:text-brand-espresso font-bold text-[9px] uppercase tracking-wider rounded-xl transition-colors"
                              >
                                Ship
                              </button>
                            )}
                            {order.status === "Shipped" && (
                              <button
                                onClick={() => {
                                  setCustomerOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: "Delivered" } : o));
                                }}
                                className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-500 hover:text-brand-espresso font-bold text-[9px] uppercase tracking-wider rounded-xl transition-colors"
                              >
                                Deliver
                              </button>
                            )}
                            {order.status === "Delivered" && (
                              <span className="text-zinc-500 text-[10px] font-bold">None</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── SECTION 1: BATCH ROAST PLANNER ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4 mt-8">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Roastery Batch Planner</h4>
                  <p className="text-xs text-zinc-500">Grouped cargo weights required in the roasting facility to satisfy today's order queues.</p>
                </div>
                <div className="space-y-3">
                  {[
                    { origin: "Panama Geisha (Boquete Valley)", weight: "15.0 kg", status: "Roasting Today" },
                    { origin: "Ethiopia Yirgaffe G1", weight: "24.5 kg", status: "Pending Pre-heat" },
                    { origin: "Colombia Huila Supremo", weight: "24.0 kg", status: "In Queue" }
                  ].map((batch, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-zinc-850/50 last:border-0 last:pb-0">
                      <div>
                        <span className="block font-bold text-brand-gold uppercase font-mono">{batch.origin}</span>
                        <span className="block text-[10px] text-zinc-500 mt-0.5">Status: {batch.status}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">{batch.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 2: SHIPPING CARRIER STATUS ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4">
                <h4 className="text-sm font-semibold text-white">Logistics & Courier Channels</h4>
                <p className="text-xs text-zinc-500">Real-time status of third-party dispatch APIs and courier services.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  {[
                    { carrier: "DHL Express API", status: "Operational", ping: "42ms" },
                    { carrier: "FedEx Webhooks", status: "Operational", ping: "89ms" },
                    { carrier: "Local Cargo Dispatch", status: "Active (2 Vans)", ping: "On Time" }
                  ].map((c, idx) => (
                    <div key={idx} className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-lg space-y-1">
                      <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wide">{c.carrier}</span>
                      <p className="text-xs font-bold text-white font-mono">{c.ping}</p>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-900/30">
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 3: ROAST PROFILE QC RATING LOG ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4">
                <h4 className="text-sm font-semibold text-white">Roast QC Cupping Log</h4>
                <p className="text-xs text-zinc-500">Sensory evaluation scores submitted by roastmasters before packaging dispatch.</p>
                <div className="space-y-3">
                  {[
                    { batch: "Batch #8292 (Panama)", score: "89.5 / 100", cupper: "S.K.", status: "Passed" },
                    { batch: "Batch #8291 (Ethiopia)", score: "87.0 / 100", cupper: "P.R.", status: "Passed" }
                  ].map((qc, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-lg border border-zinc-850">
                      <div>
                        <span className="block text-xs font-bold text-white uppercase font-mono">{qc.batch}</span>
                        <span className="block text-[10px] text-zinc-500 mt-0.5">Cupper Initials: {qc.cupper}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-brand-gold">{qc.score}</span>
                        <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-900/30">
                          {qc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            /* USERS TAB PANEL */
            <div className="bg-brand-medium/40 border border-zinc-800 p-8 space-y-6 rounded-2xl">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-gold" />
                  <h3 className="text-xl font-serif font-bold text-white">User Directory & Subscriptions</h3>
                </div>
                <span className="text-xs text-zinc-500">{usersList.length} Accounts registered</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Coffee Club Subscription</th>
                      <th className="py-3 px-4 text-center">Loyalty Points</th>
                      <th className="py-3 px-4 text-center">Orders</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850/50">
                    {usersList.map((usr) => (
                      <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-medium text-white flex items-center gap-2">
                          <div className="w-7 h-7 bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold text-xs uppercase rounded-full">
                            {usr.name.charAt(0)}
                          </div>
                          <span>{usr.name}</span>
                        </td>
                        <td className="py-4 px-4 text-zinc-400 font-mono">{usr.email}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full ${usr.role === "Admin" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-zinc-850 text-zinc-400 border border-zinc-800"
                            }`}>
                            {usr.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-zinc-300">
                          {usr.subscription !== "None" ? (
                            <span className="text-emerald-400 font-semibold">{usr.subscription}</span>
                          ) : (
                            <span className="text-zinc-500">Inactive</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center font-mono font-bold text-white">{usr.points}</td>
                        <td className="py-4 px-4 text-center font-mono text-zinc-400">{usr.orders}</td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => {
                              setUsersList(prev => prev.map(u => u.id === usr.id ? { ...u, role: u.role === "Admin" ? "Member" : "Admin" } : u));
                            }}
                            className="text-zinc-400 hover:text-white hover:underline font-bold"
                          >
                            Toggle Role
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── SECTION 1: SUBSCRIPTION TIER METRICS ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4 mt-8">
                <h4 className="text-sm font-semibold text-white">Coffee Club Membership Distribution</h4>
                <p className="text-xs text-zinc-500">Breakdown of active subscription sizes and shipment tiers.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  {[
                    { tier: "250g Monthly/Weekly Plan", count: "42 active bags", ratio: "58%" },
                    { tier: "500g Bi-weekly Plan", count: "18 active bags", ratio: "25%" },
                    { tier: "1kg Premium Plan", count: "12 active bags", ratio: "17%" }
                  ].map((tier, idx) => (
                    <div key={idx} className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-lg space-y-1">
                      <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wide">{tier.tier}</span>
                      <p className="text-sm font-bold text-white font-mono">{tier.count}</p>
                      <span className="block text-[10px] text-brand-gold mt-1 font-semibold">Share: {tier.ratio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 2: TOP CUSTOMER LEADERBOARD ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4">
                <h4 className="text-sm font-semibold text-white">Ambassador Leaderboard</h4>
                <p className="text-xs text-zinc-500">Highly active members sorted by accumulated loyalty points and direct purchase volume.</p>
                <div className="space-y-3">
                  {[
                    { name: "Ananya Sharma", points: "1,420 Pts", orders: "5 Orders", tier: "Gold Ambassador" },
                    { name: "Suresh Kumar", points: "580 Pts", orders: "3 Orders", tier: "Silver Enthusiast" },
                    { name: "Pranitha Reddy", points: "395 Pts", orders: "1 Order", tier: "Bronze Member" }
                  ].map((leader, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-zinc-850/50 last:border-0 last:pb-0">
                      <div>
                        <span className="block font-bold text-brand-cream uppercase font-mono">{leader.name}</span>
                        <span className="block text-[10px] text-zinc-500 mt-0.5">{leader.orders} • Tier: {leader.tier}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-gold">{leader.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── SECTION 3: RECENT MEMBER INQUIRIES ── */}
              <div className="bg-brand-medium/50 border border-neutral-800/80 p-6 rounded-xl space-y-4">
                <h4 className="text-sm font-semibold text-white">Recent Member Inquiries</h4>
                <p className="text-xs text-zinc-500">Active communication threads regarding membership billing, grind sizes, or custom beans requests.</p>
                <div className="space-y-3">
                  {[
                    { name: "David Miller", title: "Adjust grind setting for ORD-9284 to Chemex", time: "2 hours ago", status: "Open" },
                    { name: "Pranitha Reddy", title: "Requesting custom light roast blend from Panama", time: "1 day ago", status: "In Review" }
                  ].map((ticket, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-lg border border-zinc-850">
                      <div>
                        <span className="block text-xs font-bold text-white uppercase font-mono">{ticket.name}</span>
                        <p className="text-[10px] text-zinc-400 mt-0.5">{ticket.title}</p>
                        <span className="block text-[9px] text-zinc-500 mt-1">{ticket.time}</span>
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${ticket.status === "Open" ? "bg-amber-950/50 border-amber-900/30 text-amber-450" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                        }`}>
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            /* SETTINGS TAB PANEL */
            <div className="bg-brand-medium/40 border border-zinc-800 p-8 space-y-8 rounded-2xl">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-brand-gold" />
                  <h3 className="text-xl font-serif font-bold text-white">Roastery Settings</h3>
                </div>
                <span className="text-xs text-zinc-500">Operational Configuration</span>
              </div>

              {toastMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 text-xs font-semibold flex items-center gap-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {toastMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Config */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold border-b border-zinc-850 pb-1">General Details</h4>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Roastery Name</label>
                    <input
                      type="text"
                      value={roasterySettings.name}
                      onChange={(e) => setRoasterySettings(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold/60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Daily Roast Cap (kg)</label>
                      <input
                        type="number"
                        value={roasterySettings.dailyCapacity}
                        onChange={(e) => setRoasterySettings(prev => ({ ...prev, dailyCapacity: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold/60"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Target Temp (°C)</label>
                      <input
                        type="number"
                        value={roasterySettings.targetTemp}
                        onChange={(e) => setRoasterySettings(prev => ({ ...prev, targetTemp: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold/60"
                      />
                    </div>
                  </div>
                </div>

                {/* Notifications & System integrations */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold border-b border-zinc-850 pb-1">Integrations & Alerts</h4>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer text-xs text-white font-medium">
                      <input
                        type="checkbox"
                        checked={roasterySettings.emailAlerts}
                        onChange={(e) => setRoasterySettings(prev => ({ ...prev, emailAlerts: e.target.checked }))}
                        className="rounded border-zinc-800 text-brand-gold bg-zinc-900 focus:ring-0 focus:ring-offset-0 w-4 h-4"
                      />
                      <span>Email alerts for low stock levels</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer text-xs text-white font-medium">
                      <input
                        type="checkbox"
                        checked={roasterySettings.weeklyReports}
                        onChange={(e) => setRoasterySettings(prev => ({ ...prev, weeklyReports: e.target.checked }))}
                        className="rounded border-zinc-800 text-brand-gold bg-zinc-900 focus:ring-0 focus:ring-offset-0 w-4 h-4"
                      />
                      <span>Generate weekly operations summary</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer text-xs text-white font-medium">
                      <input
                        type="checkbox"
                        checked={roasterySettings.slackIntegration}
                        onChange={(e) => setRoasterySettings(prev => ({ ...prev, slackIntegration: e.target.checked }))}
                        className="rounded border-zinc-800 text-brand-gold bg-zinc-900 focus:ring-0 focus:ring-offset-0 w-4 h-4"
                      />
                      <span>Enable Slack alerts notification channel</span>
                    </label>
                  </div>

                  {roasterySettings.slackIntegration && (
                    <div className="space-y-1 animate-fade-in-up">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Slack Webhook URL</label>
                      <input
                        type="text"
                        value={roasterySettings.slackWebhook}
                        onChange={(e) => setRoasterySettings(prev => ({ ...prev, slackWebhook: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-gold/60"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-zinc-850 pt-6 flex justify-end">
                <button
                  onClick={() => {
                    setToastMessage("Settings saved successfully!");
                    setTimeout(() => setToastMessage(""), 3000);
                  }}
                  className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  <Save className="w-4 h-4" /> Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



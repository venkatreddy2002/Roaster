import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { ShoppingBag, User, Menu, X, Heart, LogOut, Coffee, Sun, Moon, ChevronDown } from "lucide-react";

export default function Navbar({ onOpenAuth }) {
  const { page, navigateTo, user, logout, cartCount, setCartOpen, dark, setDark, rtl, setRtl } = useApp();
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Accordion states for mobile drawer
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  const [mobileDashOpen, setMobileDashOpen] = useState(false);

  // ── Nav links ─────────────────────────────────────────────
  const links = [
    { 
      label: "Home",        
      page: "home",
      dropdown: [
        { label: "Home 1", page: "home" },
        { label: "Home 2", page: "home2" },
      ]
    },
    { label: "Shop",        page: "shop" },
    { label: "Coffee Club", page: "coffee-club" },
    { label: "Contact",     page: "contact" },
    { label: "Beans Story", page: "about-beans" },
    { 
      label: "Dashboard",   
      page: "dashboard",
      dropdown: [
        { label: "Admin Dashboard", page: "admin-dashboard" },
        { label: "User Dashboard",  page: "dashboard" },
      ]
    },
  ];

  const go = (target) => {
    navigateTo(target);
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const iconBtn = "p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors";

  // ── Toggle pill shared style ──────────────────────────────
  const pillBase = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all";
  const pillActive   = "bg-brand-gold/15 border-brand-gold/40 text-brand-gold";
  const pillInactive = "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/25";

  return (
    <>
      <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-lg z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* ── Brand Logo ── */}
          <button onClick={() => go("home")} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-darkgold to-brand-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Coffee className="w-4 h-4 text-brand-espresso" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-lg font-bold tracking-widest text-brand-gold font-serif">OBSCURA</span>
              <span className="block text-[9px] uppercase tracking-widest text-brand-gold/80">Coffee Roasters</span>
            </div>
          </button>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => {
              if (link.dropdown) {
                const isActive = page === link.page || link.dropdown.some(sub => page === sub.page);
                return (
                  <div key={link.page} className="relative group py-2 flex flex-col items-center">
                    <button
                      className={`text-sm font-medium transition-all flex items-center gap-1 ${
                        isActive ? "text-brand-gold font-semibold" : "text-white/75 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3 opacity-60 transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Active underline */}
                    <span
                      className={`absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-brand-gold transition-all duration-300 ${
                        isActive ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />

                    {/* Dropdown Menu Wrapper (bridges the hover gap) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 hidden group-hover:block animate-fade-in-up">
                      <div className="nav-dropdown-menu w-44 bg-brand-medium border border-brand-lightdark rounded-xl shadow-xl py-1">
                        {link.dropdown.map((sub) => (
                          <button
                            key={sub.page}
                            onClick={() => go(sub.page)}
                            className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                              page === sub.page 
                                ? "bg-brand-gold/15 text-brand-gold" 
                                : "text-brand-cream/80 hover:bg-brand-gold/10 hover:text-brand-gold"
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={link.page} className="relative flex flex-col items-center py-2">
                  <button
                    onClick={() => go(link.page)}
                    className={`text-sm font-medium transition-all ${
                      page === link.page ? "text-brand-gold font-semibold" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </button>
                  {/* Active underline */}
                  <span
                    className={`absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-brand-gold transition-all duration-300 ${
                      page === link.page ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">

            {/* ① RTL / LTR toggle — text only, no arrow */}
            <button
              onClick={() => setRtl(!rtl)}
              title={rtl ? "Switch to LTR" : "Switch to RTL"}
              className={`${pillBase} ${rtl ? pillActive : pillInactive} hidden md:flex`}
            >
              <span>{rtl ? "LTR" : "RTL"}</span>
            </button>

            {/* ② Dark / Light toggle — icon only, no text */}
            <button
              onClick={() => setDark(!dark)}
              title={dark ? "Switch to Light mode" : "Switch to Dark mode"}
              className={`${pillBase} ${dark ? pillActive : pillInactive} hidden md:flex`}
            >
              {dark
                ? <Sun  className="w-3.5 h-3.5" />
                : <Moon className="w-3.5 h-3.5" />
              }
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-white/15 mx-1 hidden md:block" />

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className={`${iconBtn} relative`}
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-gold text-brand-espresso text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User / Auth */}
            <div className="relative hidden md:block">
              <button
                onClick={() => user ? setDropdownOpen(!dropdownOpen) : onOpenAuth()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  user
                    ? "bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {user ? user.displayName.split(" ")[0] : "Sign In"}
                </span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && user && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="user-dropdown-menu absolute right-0 mt-2 w-52 bg-brand-medium border border-brand-lightdark rounded-xl shadow-xl py-1.5 z-20">
                    <div className="px-4 py-2 border-b border-brand-lightdark">
                      <p className="text-xs text-brand-cream/50">Signed in as</p>
                      <p className="text-sm font-bold text-brand-cream truncate">{user.displayName}</p>
                    </div>
                    {[
                      { label: "Dashboard",       target: "dashboard" },
                      { label: "Order History",   target: "orders" },
                      { label: "Saved Favorites", target: "favorites" },
                    ].map(({ label, target }) => (
                      <button
                        key={target}
                        onClick={() => go(target)}
                        className="w-full text-left px-4 py-2 text-sm text-brand-cream/80 hover:bg-brand-gold/10 hover:text-brand-gold transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                    <div className="h-px bg-brand-lightdark my-1" />
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-950/20 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden ${iconBtn}`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-[#0b0908] border-l border-neutral-200 dark:border-brand-gold/20 p-6 pb-12 flex flex-col justify-between animate-slide-in-right shadow-2xl">
            <div className="flex-grow overflow-y-auto pr-1">
              <div className="flex items-center justify-between mb-8 border-b border-neutral-200 dark:border-brand-gold/10 pb-4">
                <span className="font-serif font-bold text-brand-gold tracking-widest text-xl">OBSCURA</span>
                <button onClick={() => setMobileOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:text-brand-cream/60 dark:hover:text-brand-cream p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 mb-6">
                {links.map((link) => {
                  if (link.dropdown) {
                    const isOpen = link.page === "home" ? mobileHomeOpen : mobileDashOpen;
                    const setIsOpen = link.page === "home" ? setMobileHomeOpen : setMobileDashOpen;
                    const isActive = page === link.page || link.dropdown.some(sub => page === sub.page);
                    return (
                      <div key={link.page} className="flex flex-col">
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className={`text-left text-base px-3 py-2.5 rounded-lg font-medium transition-colors flex justify-between items-center ${
                            isActive
                              ? "bg-brand-gold/15 text-brand-gold font-semibold"
                              : "text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 dark:text-brand-cream/80 dark:hover:bg-brand-gold/10 dark:hover:text-brand-cream"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="pl-4 pr-2 py-1 flex flex-col gap-1 mt-1 border-l border-neutral-200 dark:border-brand-gold/20 ml-5">
                            {link.dropdown.map((sub) => (
                              <button
                                key={sub.page}
                                onClick={() => go(sub.page)}
                                className={`text-left text-sm px-3 py-2 rounded-md transition-colors ${
                                  page === sub.page
                                    ? "text-brand-gold font-semibold bg-brand-gold/5"
                                    : "text-neutral-600 hover:bg-neutral-50 dark:text-brand-cream/70 dark:hover:bg-brand-gold/5"
                                }`}
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={link.page}
                      onClick={() => go(link.page)}
                      className={`text-left text-base px-3 py-2.5 rounded-lg font-medium transition-colors ${
                        page === link.page
                          ? "bg-brand-gold/15 text-brand-gold font-semibold"
                          : "text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 dark:text-brand-cream/80 dark:hover:bg-brand-gold/10 dark:hover:text-brand-cream"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                {user && (
                  <button
                    onClick={() => go("favorites")}
                    className={`text-left text-base px-3 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      page === "favorites"
                        ? "bg-brand-gold/15 text-brand-gold font-semibold"
                        : "text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 dark:text-brand-cream/80 dark:hover:bg-brand-gold/10 dark:hover:text-brand-cream"
                    }`}
                  >
                    <Heart className="w-4 h-4 text-brand-gold shrink-0" /> Saved Favorites
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-brand-gold/15 pt-5 space-y-4">
              {/* Mobile toggles */}
              <div className="flex gap-3">
                <button
                  onClick={() => setRtl(!rtl)}
                  className={`flex-grow flex items-center justify-center py-2.5 rounded-xl border text-sm font-bold uppercase tracking-wider transition-all ${
                    rtl ? pillActive : pillInactive
                  }`}
                >
                  {rtl ? "LTR" : "RTL"}
                </button>
                <button
                  onClick={() => setDark(!dark)}
                  className={`flex-grow flex items-center justify-center py-2.5 rounded-xl border transition-all ${
                    dark ? pillActive : pillInactive
                  }`}
                >
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>

              {user ? (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500 dark:text-brand-cream/60 px-1">
                    Signed in as <span className="font-bold text-neutral-800 dark:text-brand-cream">{user.displayName}</span>
                  </p>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-lg py-2.5 text-sm transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileOpen(false); onOpenAuth(); }}
                  className="w-full bg-gradient-to-r from-brand-darkgold to-brand-gold text-brand-espresso font-bold uppercase tracking-wider text-xs rounded-lg py-3 hover:brightness-110 transition-all"
                >
                  Member Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

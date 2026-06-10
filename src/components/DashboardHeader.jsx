import { Coffee, Sun, Moon, Menu } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function DashboardHeader() {
  const { navigateTo, dark, setDark, rtl, setRtl, setDashboardDrawerOpen } = useApp();

  return (
    <header className="w-full border-b border-neutral-850/80 bg-brand-espresso/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* ── Brand Logo ── */}
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-darkgold to-brand-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Coffee className="w-4 h-4 text-brand-espresso" />
          </div>
          <div className="text-left leading-none hidden sm:block">
            <span className="block text-base font-bold tracking-widest text-brand-gold font-serif">OBSCURA</span>
            <span className="block text-[9px] uppercase tracking-widest text-brand-gold/70">Coffee Roasters</span>
          </div>
          {/* Mobile: just text */}
          <span className="sm:hidden text-base font-bold tracking-widest text-brand-gold font-serif">OBSCURA</span>
        </button>

        {/* ── Right Toggles / Mobile Menu ── */}
        <div className="flex items-center gap-2">

          {/* Desktop Only Toggles */}
          <div className="hidden md:flex items-center gap-2">
            {/* RTL Toggle */}
            <button
              onClick={() => setRtl(!rtl)}
              title={rtl ? "Switch to LTR" : "Switch to RTL"}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border
                transition-all duration-300
                ${rtl
                  ? "bg-brand-gold/15 border-brand-gold/40 text-brand-gold"
                  : "bg-brand-medium/40 border-neutral-700/60 text-brand-cream/50 hover:text-brand-cream hover:border-neutral-600"
                }
              `}
            >
              <span className={`transition-all duration-300 ${rtl ? "scale-110" : ""}`}>
                {rtl ? "LTR" : "RTL"}
              </span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDark(!dark)}
              title={dark ? "Switch to Light mode" : "Switch to Dark mode"}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border
                transition-all duration-300
                ${dark
                  ? "bg-brand-gold/15 border-brand-gold/40 text-brand-gold"
                  : "bg-brand-medium/40 border-neutral-700/60 text-brand-cream/50 hover:text-brand-cream hover:border-neutral-600"
                }
              `}
            >
              {dark
                ? <Sun  className="w-3.5 h-3.5" />
                : <Moon className="w-3.5 h-3.5" />
              }
            </button>
          </div>

          {/* Mobile Only Hamburger Menu Button */}
          <button
            onClick={() => setDashboardDrawerOpen(true)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all border border-white/5"
            aria-label="Open Navigation"
          >
            <Menu className="w-4.5 h-4.5 text-brand-gold" />
          </button>

        </div>
      </div>
    </header>
  );
}

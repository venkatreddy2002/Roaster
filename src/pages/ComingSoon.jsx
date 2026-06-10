import React from "react";
import { useApp } from "../context/AppContext";
import { ArrowRight } from "lucide-react";

export default function ComingSoon() {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-brand-espresso flex flex-col lg:flex-row">
      {/* Left Column: Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-20 min-h-screen bg-brand-espresso">
        {/* Top: Logo and Brand Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-gold text-brand-espresso flex items-center justify-center font-bold text-lg font-sans rounded-xl shadow-md select-none">
            O
          </div>
          <div className="-mt-1 flex flex-col justify-center">
            <span className="block text-sm font-serif font-bold tracking-wider text-brand-gold uppercase leading-tight">Obscura</span>
            <span className="block text-[8px] uppercase tracking-widest text-zinc-500 font-bold mt-0.5">Coffee Roasters</span>
          </div>
        </div>

        {/* Middle: Coming Soon content */}
        <div className="max-w-md w-full space-y-6 py-12 lg:py-0 mb-auto mt-12 lg:mt-24">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-gold font-mono">Micro-Lot Cellar</span>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Exclusive Releases Coming Soon
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We are currently sourcing rare, high-altitude microlots from private estates in Panama and Ethiopia. Join our mailing list to receive access to direct-trade reserves.
            </p>
          </div>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              alert("You've been added to our private release list!"); 
            }} 
            className="space-y-3"
          >
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                required 
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-brand-gold focus:outline-none text-xs text-white px-4 py-3 rounded-xl transition-all" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              Get Early Access <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Bottom: Footer / Actions */}
        <div className="pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[10px] text-zinc-500">© 2026 Obscura Coffee Roasters. All rights reserved.</span>
          <button 
            onClick={() => navigateTo("home")}
            className="text-xs font-bold text-brand-gold hover:text-white uppercase tracking-wider transition-colors"
          >
            ← Back to Storefront
          </button>
        </div>
      </div>

      {/* Right Column: Visual Splendor */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-screen bg-neutral-900">
        <img 
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200" 
          alt="Premium Coffee Roasting" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-espresso/60 backdrop-blur-[1px] mix-blend-multiply" />
        <div className="absolute bottom-12 left-12 right-12 bg-brand-espresso/45 backdrop-blur-md border border-white/5 p-8 rounded-3xl space-y-3">
          <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest font-mono">Current Origin Spotlight</span>
          <h3 className="text-xl font-serif font-bold text-white">Boquete Valley, Panama</h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            "We are mapping thermal roast profiles for the incoming Geisha harvest. Expect high floral clarity with notes of jasmine, bergamot, and sweet stonefruit."
          </p>
        </div>
      </div>
    </div>
  );
}

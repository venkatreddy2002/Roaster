import React from "react";
import { useApp } from "../context/AppContext";
import { Coffee } from "lucide-react";

export default function NotFound() {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-brand-espresso">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
        {/* Aesthetic icon container */}
        <div className="w-20 h-20 bg-brand-gold/10 text-brand-gold mx-auto rounded-full flex items-center justify-center border border-brand-gold/20 relative">
          <Coffee className="w-10 h-10 stroke-1" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-gold font-mono">Error 404</span>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Brew Not Found</h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto">
            The cup you are looking for is empty, or the micro-lot page has been moved to another shelf in our cellar.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigateTo("home")}
            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigateTo("shop")}
            className="bg-brand-medium/35 hover:bg-brand-medium/60 text-white border border-zinc-800 hover:border-zinc-700 px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            Explore the Shop
          </button>
        </div>
      </div>
    </div>
  );
}

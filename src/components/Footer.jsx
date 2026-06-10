import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Coffee, Mail, Check, ArrowRight } from "lucide-react";

export default function Footer() {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-brand-espresso border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Branding, Links, Subscription */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-neutral-900">
          
          {/* Col 1: Brand Info (4 Columns) */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center">
                <Coffee className="w-4.5 h-4.5 text-brand-espresso" />
              </div>
              <span className="font-serif font-bold tracking-widest text-brand-cream text-lg">OBSCURA</span>
            </div>
            <p className="text-sm text-brand-latte/70 leading-relaxed max-w-sm">
              We source single-origin micro-lots directly from remote farms. Roasted in micro-batches with meticulous temperature curves to unlock the true terroir of each bean.
            </p>
            <p className="text-xs text-brand-gold font-sans font-semibold">
              ROASTED FRESH IN SEATTLE, WA
            </p>
          </div>

          {/* Col 2: Navigation Links (2 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => navigateTo("shop")} 
                  className="text-sm text-brand-latte/80 hover:text-brand-cream hover:underline transition-colors"
                >
                  Shop Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo("coffee-club")} 
                  className="text-sm text-brand-latte/80 hover:text-brand-cream hover:underline transition-colors"
                >
                  Coffee Subscription
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo("about-beans")} 
                  className="text-sm text-brand-latte/80 hover:text-brand-cream hover:underline transition-colors"
                >
                  Seed-to-Cup Journey
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support (2 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => navigateTo("contact")} 
                  className="text-sm text-brand-latte/80 hover:text-brand-cream hover:underline transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo("contact")} 
                  className="text-sm text-brand-latte/80 hover:text-brand-cream hover:underline transition-colors"
                >
                  Roastery FAQs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo("comingsoon")} 
                  className="text-sm text-brand-latte/80 hover:text-brand-cream hover:underline transition-colors"
                >
                  Shipping & Returns
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter (4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              Stay Roasted
            </h4>
            <p className="text-sm text-brand-latte/70">
              Subscribe to receive micro-lot releases, roast dates, and professional brewing guides.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-medium border border-neutral-800 rounded-lg py-3 pl-4 pr-12 text-sm text-brand-cream placeholder-neutral-500 outline-none focus:border-brand-gold/50"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-gold hover:bg-brand-gold/85 text-brand-espresso p-1.5 rounded-md transition-colors"
                aria-label="Subscribe to newsletter"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 mt-1.5">
                Thanks! You are now subscribed to Obscura notifications.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-latte/50">
          <p>© {new Date().getFullYear()} Obscura Coffee Roasters. Crafted with premium terroir.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <button onClick={() => navigateTo("comingsoon")} className="hover:text-brand-cream transition-colors cursor-pointer bg-transparent border-0 p-0 text-brand-latte/50">Privacy Policy</button>
            <button onClick={() => navigateTo("comingsoon")} className="hover:text-brand-cream transition-colors cursor-pointer bg-transparent border-0 p-0 text-brand-latte/50">Terms of Service</button>
            <button onClick={() => navigateTo("comingsoon")} className="hover:text-brand-cream transition-colors cursor-pointer bg-transparent border-0 p-0 text-brand-latte/50">Sitemap</button>
          </div>
        </div>

      </div>
    </footer>
  );
}

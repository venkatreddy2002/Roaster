import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Coffee, ShieldCheck, Flame, Sliders, Calendar, ArrowRight,
  Gift, Truck, Percent, HelpCircle, ChevronDown
} from "lucide-react";

export default function CoffeeClub({ onOpenAuth }) {
  const { user, createOrUpdateSubscription, navigateTo } = useApp();

  // Subscription States
  const [roastType, setRoastType] = useState("Medium"); // Light, Medium, Dark, Signature Blend
  const [bagSize, setBagSize] = useState("500g"); // 250g, 500g, 1kg
  const [grind, setGrind] = useState("Whole Bean"); // Whole Bean, Espresso, Drip, French Press
  const [frequency, setFrequency] = useState("Every 2 Weeks"); // Every Week, Every 2 Weeks, Every Month
  const [loading, setLoading] = useState(false);

  // FAQ open state
  const [openFaq, setOpenFaq] = useState(null);

  // Pricing Matrix
  const basePrices = {
    "250g": 19.50,
    "500g": 35.00,
    "1kg": 62.00
  };

  const discountRates = {
    "Every Week": 0.10, // 10% off
    "Every 2 Weeks": 0.05, // 5% off
    "Every Month": 0.00 // No discount
  };

  const currentBase = basePrices[bagSize];
  const currentDiscount = discountRates[frequency];
  const finalPrice = currentBase * (1 - currentDiscount);
  const savings = currentBase * currentDiscount;

  // Roast description and color mapping
  const roastProfiles = {
    Light: {
      color: "bg-[#b08968]",
      textColor: "text-[#b08968]",
      label: "Light Roast (Cinnamon / City)",
      desc: "Highlighting floral notes, crisp tea-like acidity, and delicate stone fruit sweetness. Excellent for pour-overs."
    },
    Medium: {
      color: "bg-[#7f5539]",
      textColor: "text-[#7f5539]",
      label: "Medium Roast (Full City)",
      desc: "Perfect balance of body and acidity. Deep caramel sweetness, toasted pecans, and red apple compounds."
    },
    Dark: {
      color: "bg-[#3f2a1d]",
      textColor: "text-[#3f2a1d]",
      label: "Dark Roast (Vienna / French)",
      desc: "Low acidity, heavy-bodied, and bold. Rich molasses sweetness, wood smoke, and intense baker's chocolate flavor."
    },
    "Signature Blend": {
      color: "bg-gradient-to-r from-[#7f5539] to-[#3f2a1d]",
      textColor: "text-brand-gold",
      label: "Obscura House Blend",
      desc: "Our masterfully crafted combination of seasonal origins. Designed specifically to pull rich, chocolatey espresso shots."
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      alert("Please log in or register to join the Coffee Club.");
      onOpenAuth();
      return;
    }

    setLoading(true);
    const subData = {
      roastType,
      bagSize,
      grind,
      frequency,
      price: finalPrice,
    };

    const success = await createOrUpdateSubscription(subData);
    setLoading(false);

    if (success) {
      alert("Subscription activated! Loading your dashboard...");
      navigateTo("dashboard");
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-20 pb-20 animate-fade-in-up">

      {/* ── COFFEE CLUB HERO SECTION ── */}
      <section className="relative py-24 sm:py-32 bg-zinc-950 text-white overflow-hidden flex items-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80')" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-espresso to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-espresso/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/15 border border-brand-gold/20 px-4 py-1.5 rounded-full">
            The Roast Reserve Club
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif leading-tight max-w-2xl">
            Elevate Your <span className="text-brand-gold">Daily</span> Ritual
          </h1>
          <p className="text-brand-latte/80 text-sm sm:text-lg max-w-xl leading-relaxed">
            Freshly roasted specialty coffee — custom formulated for your preferred brew method — delivered directly to your door. Save up to 10% and skip any time.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById("club-builder");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Build My Plan
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("club-perks");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all active:scale-95"
            >
              See Member Perks
            </button>
          </div>
          {/* Stats row */}
          <div className="flex flex-wrap gap-8 text-sm text-zinc-400 pt-4">
            <div><span className="block text-2xl font-bold text-white">10%</span>Max Club Discount</div>
            <div><span className="block text-2xl font-bold text-white">Free</span>Carbon Shipping</div>
            <div><span className="block text-2xl font-bold text-white">0</span>Lock-In Contracts</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Introduction */}
        <div id="club-builder" className="text-center space-y-3 max-w-2xl mx-auto scroll-mt-24">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
            The Roast Reserve Club
          </span>
          <h2 className="text-4xl font-serif font-bold text-brand-cream">Custom Coffee Subscription</h2>
          <p className="text-brand-latte/75 text-sm">
            Select your roast, grind, bag size, and schedule. We roast to order on Mondays and ship carbon-neutral on Tuesdays. Subscriptions enjoy up to 10% off and free shipping.
          </p>
        </div>

        {/* Main Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Selections (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">

            {/* STEP 1: Select Roast */}
            <div className="bg-brand-medium/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3 border-b border-neutral-900 pb-4">
                <span className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold text-sm">1</span>
                <h3 className="text-lg font-serif font-bold text-brand-cream flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-brand-gold" /> Select Roast Style
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.keys(roastProfiles).map((type) => (
                  <button
                    key={type}
                    onClick={() => setRoastType(type)}
                    className={`p-4 rounded-xl border text-center transition-all ${roastType === type
                      ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                      : "bg-brand-espresso/50 border-neutral-850 text-brand-cream/80 hover:border-neutral-800"
                      }`}
                  >
                    <span className="text-sm font-semibold block">{type}</span>
                  </button>
                ))}
              </div>

              {/* Roast interactive visualization */}
              <div className="bg-brand-espresso/70 border border-neutral-855 rounded-xl p-5 flex flex-col sm:flex-row items-center sm:space-x-5 gap-4">
                {/* Colored Indicator */}
                <div className={`w-14 h-14 rounded-full ${roastProfiles[roastType].color} border border-neutral-900/60 shrink-0 shadow-lg flex items-center justify-center`}>
                  <Coffee className="w-5 h-5 text-brand-cream" />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-brand-cream">{roastProfiles[roastType].label}</h4>
                  <p className="text-xs text-brand-latte/70 leading-relaxed">{roastProfiles[roastType].desc}</p>
                </div>
              </div>
            </div>

            {/* STEP 2: Choose Bag Size */}
            <div className="bg-brand-medium/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3 border-b border-neutral-900 pb-4">
                <span className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold text-sm">2</span>
                <h3 className="text-lg font-serif font-bold text-brand-cream flex items-center">
                  <Coffee className="w-5 h-5 mr-2 text-brand-gold" /> Choose Volume / Bag Size
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { size: "250g", label: "Approx. 15 Cups", desc: "Perfect for single coffee drinkers" },
                  { size: "500g", label: "Approx. 30 Cups", desc: "Recommended for couples / daily drinkers" },
                  { size: "1kg", label: "Approx. 60 Cups", desc: "Great for heavy drinkers and families" }
                ].map((item) => (
                  <button
                    key={item.size}
                    onClick={() => setBagSize(item.size)}
                    className={`p-5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${bagSize === item.size
                      ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                      : "bg-brand-espresso/50 border-neutral-850 text-brand-cream/80 hover:border-neutral-800"
                      }`}
                  >
                    <div>
                      <span className="text-lg font-bold block">{item.size}</span>
                      <span className="text-xs text-brand-cream/80 mt-1 block">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-2 block leading-none">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: Choose Grind Type */}
            <div className="bg-brand-medium/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3 border-b border-neutral-900 pb-4">
                <span className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold text-sm">3</span>
                <h3 className="text-lg font-serif font-bold text-brand-cream flex items-center">
                  <Sliders className="w-5 h-5 mr-2 text-brand-gold" /> Select Grind Requirement
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "Whole Bean", desc: "Keep fresh longer" },
                  { name: "Espresso", desc: "Super fine grind" },
                  { name: "Drip", desc: "Standard filter grind" },
                  { name: "French Press", desc: "Coarse grind" }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setGrind(item.name)}
                    className={`p-4 rounded-xl border text-center transition-all ${grind === item.name
                      ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                      : "bg-brand-espresso/50 border-neutral-850 text-brand-cream/80 hover:border-neutral-800"
                      }`}
                  >
                    <span className="text-sm font-semibold block">{item.name}</span>
                    <span className="text-[10px] text-neutral-500 mt-1 block leading-none">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 4: Choose Delivery Frequency */}
            <div className="bg-brand-medium/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3 border-b border-neutral-900 pb-4">
                <span className="w-8 h-8 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold text-sm">4</span>
                <h3 className="text-lg font-serif font-bold text-brand-cream flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-brand-gold" /> Delivery Schedule
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Every Week", discount: "10% Club Discount" },
                  { name: "Every 2 Weeks", discount: "5% Club Discount" },
                  { name: "Every Month", discount: "Standard Price" }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setFrequency(item.name)}
                    className={`p-5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${frequency === item.name
                      ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                      : "bg-brand-espresso/50 border-neutral-850 text-brand-cream/80 hover:border-neutral-800"
                      }`}
                  >
                    <div>
                      <span className="text-base font-bold block">{item.name}</span>
                      <span className="text-xs text-brand-gold/80 mt-1 block font-mono">{item.discount}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-2 block leading-none">Free carbon-neutral shipping</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pricing Summary Widget (4 Columns) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="rounded-3xl glass-panel border border-brand-gold/20 p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-serif font-bold text-brand-cream">Plan Summary</h3>

              {/* Selections breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between border-b border-neutral-900/60 pb-3">
                  <span className="text-xs text-neutral-400">Roast Profile</span>
                  <span className="text-xs font-semibold text-brand-cream">{roastType}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900/60 pb-3">
                  <span className="text-xs text-neutral-400">Bag Volume</span>
                  <span className="text-xs font-semibold text-brand-cream">{bagSize}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900/60 pb-3">
                  <span className="text-xs text-neutral-400">Grind Style</span>
                  <span className="text-xs font-semibold text-brand-cream">{grind}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900/60 pb-3">
                  <span className="text-xs text-neutral-400">Frequency</span>
                  <span className="text-xs font-semibold text-brand-cream">{frequency}</span>
                </div>
              </div>

              {/* Savings & Price display */}
              <div className="bg-brand-espresso/50 border border-neutral-850 rounded-2xl p-4.5 space-y-2.5">
                {savings > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400">
                    <span>Frequency Discount</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">Free</span>
                </div>
                <div className="h-px bg-neutral-850 my-1" />
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-brand-cream">Price/Shipment</span>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-brand-gold">${finalPrice.toFixed(2)}</span>
                    <span className="text-[10px] text-neutral-500 block">USD + tax</span>
                  </div>
                </div>
              </div>

              {/* CTA Subscribe button */}
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-darkgold to-brand-gold text-brand-espresso font-semibold uppercase tracking-wider text-sm py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center"
              >
                {loading ? "Processing..." : "Subscribe Now"} <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Guarantee stamp */}
            <div className="rounded-2xl bg-brand-medium/20 border border-neutral-900 p-5 flex items-start space-x-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-brand-cream">No-Lock Commitment</h4>
                <p className="text-brand-latte/70 leading-relaxed">
                  Pause, modify frequency, change grind sizes, or cancel your subscription plan at any time directly in your dashboard. Zero fees.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── SECTION 1: HOW THE SUBSCRIPTION CLUB WORKS ── */}
        <div className="border-t border-neutral-900 pt-16 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">The Routine</span>
            <h3 className="text-3xl font-serif font-bold text-brand-cream">How the Club Works</h3>
            <p className="text-brand-latte/75 text-sm max-w-lg mx-auto">
              From green sorting to delivery, we operate a tight schedule to ensure freshness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Customize Plan",
                desc: "Choose your preferred roast profiles, bag sizes, and frequency settings. Change them whenever your taste shifts."
              },
              {
                step: "02",
                title: "Roasted Fresh on Mondays",
                desc: "We batch roast all subscription beans on Mondays utilizing precise thermal profile logs."
              },
              {
                step: "03",
                title: "Shipped on Tuesdays",
                desc: "Your beans are immediately packaged and shipped out on Tuesdays to secure peak flavor."
              },
              {
                step: "04",
                title: "Manage in Dashboard",
                desc: "Pause, skip cycles, or change shipping dates directly inside your account panel with zero fees."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-brand-medium/20 border border-neutral-850 p-6 rounded-3xl space-y-3 relative overflow-hidden">
                <span className="absolute right-4 top-2 text-6xl font-serif font-extrabold text-neutral-800/20 select-none">
                  {item.step}
                </span>
                <h4 className="text-sm font-bold text-brand-cream relative z-10">{item.title}</h4>
                <p className="text-xs text-brand-latte/70 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 2: SUBSCRIBER EXCLUSIVE PERKS ── */}
        <div id="club-perks" className="bg-brand-medium/40 border border-neutral-850 rounded-3xl p-8 space-y-8 scroll-mt-24">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Member Privileges</span>
            <h3 className="text-2xl font-serif font-bold text-brand-cream">Subscriber Exclusive Perks</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400",
                title: "Save up to 10%",
                desc: "Every subscription bag comes with an automatic 10% discount off standard retail pricing, ensuring the best price for micro-lot roasts."
              },
              {
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400",
                title: "Free Carbon-Neutral Shipping",
                desc: "All orders are dispatched via carbon-neutral transit partners, fully offset through certified reforestation projects, at absolutely no cost to you."
              },
              {
                image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=400",
                title: "Micro-Lot Early Access",
                desc: "Get exclusive first-access to rare single-origins, private farm lots, and seasonal reserve blends before they go live on our public storefront."
              }
            ].map((perk, idx) => (
              <div key={idx} className="bg-brand-espresso/60 border border-neutral-850 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <img
                    src={perk.image}
                    alt={perk.title}
                    className="w-full h-40 object-cover rounded-xl border border-neutral-800"
                  />
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-brand-cream">{perk.title}</h4>
                    <p className="text-xs text-brand-latte/70 leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 3: SUBSCRIPTION CLUB FREQUENTLY ASKED QUESTIONS ── */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">FAQ</span>
            <h3 className="text-2xl font-serif font-bold text-brand-cream">Subscription FAQ</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Can I skip, pause, or cancel my subscription?",
                a: "Yes, absolutely! You can manage every detail of your subscription plan inside your Obscura Member Dashboard. You can skip upcoming deliveries, pause the subscription, or cancel it entirely with zero cancellation fees."
              },
              {
                q: "How fresh will my coffee be when it arrives?",
                a: "We roast all subscription lots on Mondays and ship them on Tuesdays. Depending on your location, your package will arrive 2–4 days after roasting, which is the perfect duration for the beans to degas and reach optimal brewing maturity."
              },
              {
                q: "Can I change my roast style or grind setting later?",
                a: "Yes. If you want to switch from Medium Roast to Light Roast, or transition from Whole Bean to Drip grind, you can make these edits with a single click in your account settings before the next weekly roast cycle begins."
              },
              {
                q: "Is shipping really free on every package?",
                a: "Yes, standard shipping is completely free for all active subscription levels. Additionally, we flush all bags with food-grade nitrogen to maintain freshness and offset the shipping footprint via certified carbon capture projects."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-brand-medium/20 border border-neutral-850 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-brand-cream hover:text-brand-gold font-semibold text-sm transition-colors outline-none"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-gold shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-gold shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-40 border-t border-neutral-850 p-5" : "max-h-0 p-0 overflow-hidden"
                    }`}
                >
                  <p className="text-xs text-brand-latte/75 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>{/* END max-w-7xl container */}
    </div>
  );
}

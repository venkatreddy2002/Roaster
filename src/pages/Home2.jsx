import { useState } from "react";
import { Coffee, ChevronRight, Award, Compass, BarChart, Leaf, Star, Info, Thermometer, Globe, Droplets, FlaskConical, Zap, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Home2() {
  const { navigateTo } = useApp();
  const [selectedProfile, setSelectedProfile] = useState("light");
  const [selectedBrew, setSelectedBrew] = useState("v60");

  const roastProfiles = {
    light: {
      title: "Light Roast (SCA 88+)",
      temp: "196°C - 204°C Drop",
      body: "Delicate & Tea-like",
      acidity: "High, Crisp Phosphoric",
      notes: ["Jasmine Floral", "Bergamot", "Meyer Lemon", "White Peach"],
      desc: "Preserves the pure genetic flavor profile of the bean. Highly expressive of soil chemistry, micro-climate elevation, and washing method.",
      beans: "Panama Geisha, Ethiopian Yirgacheffe",
    },
    medium: {
      title: "Medium Roast (SCA 86+)",
      temp: "210°C - 215°C Drop",
      body: "Round & Syrupy",
      acidity: "Balanced, Malic & Citric",
      notes: ["Caramelized Sugars", "Toasted Almond", "Red Cherry", "Milk Chocolate"],
      desc: "Perfect balance of organic acidity and caramelized sweetness. Developed during the first crack phase with precise airflow management.",
      beans: "Colombian Pink Bourbon, Guatemalan Antigua",
    },
    dark: {
      title: "Dark Roast (SCA 84+)",
      temp: "220°C - 225°C Drop",
      body: "Full, Velvety & Heavy",
      acidity: "Low, Soft Lactic",
      notes: ["Dark Cocoa", "Molasses", "Smoke & Spice", "Toasted Hazelnut"],
      desc: "Rich, bold caramelization and low acidity. Roasted to the verge of the second crack to draw out natural oils and a heavy finish.",
      beans: "Sumatran Mandheling, Brazil Santos",
    },
  };

  const brewGuides = {
    v60: {
      name: "Hario V60",
      ratio: "1:15 (15g coffee, 225g water)",
      grind: "Medium-Fine (like table salt)",
      temp: "93°C",
      time: "3:00 mins",
      steps: "Bloom with 45g water for 40s. Pour in concentric circles up to 150g, then final pour to 225g. Yields a clean, bright, and highly aromatic cup.",
    },
    espresso: {
      name: "Espresso",
      ratio: "1:2 (18g coffee in, 36g out)",
      grind: "Extra-Fine (like flour)",
      temp: "91°C - 94°C",
      time: "25-30 secs",
      steps: "Apply 9 bars of pressure. Look for a warm hazelnut crema and rich honey-like flow rate. Highlights sweetness and heavy body.",
    },
    frenchpress: {
      name: "French Press",
      ratio: "1:16 (30g coffee, 480g water)",
      grind: "Coarse (like sea salt)",
      temp: "95°C",
      time: "4:00 mins",
      steps: "Pour all water, stir gently. Let steep for 4 mins, break the crust of floating grinds, plunge slowly. Produces a robust, full-bodied cup.",
    },
  };

  const limitedLots = [
    {
      name: "Panama Geisha Reserve",
      origin: "Boquete Valley · 1,950m",
      score: "91.5 SCA",
      price: "$48.00",
      notes: "Jasmine, Mandarin Orange, Bergamot",
      badge: "Competition Grade",
      bgImg: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Colombia Pink Bourbon",
      origin: "Huila Region · 1,800m",
      score: "89.0 SCA",
      price: "$29.00",
      notes: "Pink Grapefruit, Honey, Brown Sugar",
      badge: "Anaerobic Ferment",
      bgImg: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="space-y-24 pb-20 animate-fade-in-up">
      {/* ── LUXURY HERO SECTION ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Parallax ambient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-espresso/30 via-brand-espresso/80 to-brand-espresso z-10" />
          <img
            src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1920&q=80"
            alt="Premium Roastery Background"
            className="w-full h-full object-cover scale-105 filter brightness-50 contrast-125"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-left relative z-20 space-y-6 mt-8 w-full pt-24 md:pt-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs uppercase tracking-widest font-semibold rounded-full">
            <Award className="w-3.5 h-3.5" /> Reserve Batch Coffee Roasters
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-cream leading-tight tracking-wide">
            Where Science <br /> Meets <span className="text-brand-gold italic">Sensory Art</span>
          </h1>

          <p className="text-zinc-300 max-w-2xl text-base md:text-lg font-light leading-relaxed">
            Obscura's second-generation roastery uses real-time convective temperature mapping to unlock
            unmatched floral sweetness and complex acidities from rare micro-lots.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start items-start sm:items-center pt-2">
            <button
              onClick={() => navigateTo("coffee-club")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso font-bold uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-brand-gold/10 hover:-translate-y-0.5"
            >
              Configure Blend Plan
            </button>
            <button
              onClick={() => navigateTo("shop")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-700 hover:border-brand-gold text-brand-cream hover:text-brand-gold font-bold uppercase tracking-widest text-sm transition-all bg-brand-espresso/30 backdrop-blur-sm"
            >
              Explore Cellar Beans
            </button>
          </div>
        </div>
      </section>

      {/* ── BENTO RESERVE GRID ── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Limited Reserve Micro-lots</h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm">
            Exquisite microlots sourced from farmers pushing sensory boundaries through innovative fermentation styles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main big block */}
          <div className="lg:col-span-8 bg-brand-medium/50 border border-neutral-850 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso via-brand-espresso/50 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
              alt="Coffee Farm Origin"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
            />

            <div className="relative z-20">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold px-2.5 py-1 rounded bg-brand-gold/15 border border-brand-gold/20 inline-block mb-4">
                Origin Spotlight
              </span>
              <h3 className="text-3xl font-serif font-bold text-white mb-2">Huila Region Ferments</h3>
              <p className="text-zinc-400 text-sm max-w-md">
                Our latest batch features direct-trade micro-lots processed via 72-hour anaerobic fermentation under constant pH tracking.
              </p>
            </div>

            <div className="relative z-20 flex flex-wrap gap-6 items-center pt-8 border-t border-zinc-800/80 mt-10">
              <div className="space-y-1">
                <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Average Elevation</span>
                <span className="block text-sm font-semibold text-brand-gold">1,850m - 2,100m</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Harvest Profile</span>
                <span className="block text-sm font-semibold text-brand-gold">100% Hand-picked Red Cherry</span>
              </div>
              <button
                onClick={() => navigateTo("shop")}
                className="ml-auto flex items-center gap-1 text-xs font-bold text-brand-gold hover:underline"
              >
                Browse Huila lots <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Two small cards */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {limitedLots.map((lot, idx) => (
              <div
                key={idx}
                className="bg-brand-medium/50 border border-neutral-850 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group flex-1"
              >
                <div className="absolute inset-0 bg-brand-espresso/70 z-10" />
                <img
                  src={lot.bgImg}
                  alt={lot.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="relative z-20 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold px-2 py-0.5 rounded bg-brand-gold/10">
                      {lot.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{lot.score}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-white">{lot.name}</h4>
                    <p className="text-zinc-500 text-xs">{lot.origin}</p>
                  </div>
                  <p className="text-zinc-400 text-xs line-clamp-1 italic">
                    "{lot.notes}"
                  </p>
                </div>

                <div className="relative z-20 flex justify-between items-center pt-4 border-t border-zinc-800/80 mt-4">
                  <span className="text-brand-gold font-mono font-bold text-sm">{lot.price}</span>
                  <button
                    onClick={() => navigateTo("shop")}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-zinc-800 hover:bg-brand-gold hover:text-brand-espresso text-zinc-300 transition-colors"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FLAVOR ROAST PROFILE SELECTOR ── */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-brand-medium/30 border border-neutral-850 p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 mb-10">
            <h2 className="text-3xl font-serif font-bold text-white">Interactive Profile Selection</h2>
            <p className="text-zinc-400 text-sm">
              Different roast thresholds highlight different chemical compounds. Choose a roasting level below to review flavor profiles and target drop temperatures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Buttons column */}
            <div className="md:col-span-4 flex flex-col gap-3">
              {Object.keys(roastProfiles).map((prof) => (
                <button
                  key={prof}
                  onClick={() => setSelectedProfile(prof)}
                  className={`text-left p-4 rounded-2xl border transition-all ${selectedProfile === prof
                      ? "bg-brand-gold/15 border-brand-gold text-brand-gold shadow-md"
                      : "bg-brand-medium/55 border-neutral-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                >
                  <span className="block font-bold text-sm uppercase tracking-wider">
                    {prof} Profile
                  </span>
                  <span className="block text-xs mt-0.5 font-light">
                    {roastProfiles[prof].title.split(" ")[0]} Roast
                  </span>
                </button>
              ))}
            </div>

            {/* Display details */}
            <div className="md:col-span-8 bg-brand-medium/80 border border-neutral-800/60 p-6 rounded-2xl space-y-5">
              <div className="flex justify-between items-baseline border-b border-zinc-850 pb-3">
                <h3 className="text-xl font-serif font-bold text-white">
                  {roastProfiles[selectedProfile].title}
                </h3>
                <span className="text-xs font-mono text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                  {roastProfiles[selectedProfile].temp}
                </span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {roastProfiles[selectedProfile].desc}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Body & Weight</span>
                  <span className="text-zinc-300 text-sm font-medium">{roastProfiles[selectedProfile].body}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Acid Profile</span>
                  <span className="text-zinc-300 text-sm font-medium">{roastProfiles[selectedProfile].acidity}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Sensory Tasting Notes</span>
                <div className="flex flex-wrap gap-2">
                  {roastProfiles[selectedProfile].notes.map((n) => (
                    <span key={n} className="bg-zinc-850 text-zinc-300 text-xs px-2.5 py-1 rounded-full border border-neutral-800">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-850 flex items-center justify-between">
                <span className="text-xs text-zinc-500 italic">Recommended origins: {roastProfiles[selectedProfile].beans}</span>
                <button
                  onClick={() => navigateTo("shop")}
                  className="flex items-center gap-1 text-xs font-bold text-brand-gold hover:underline"
                >
                  Shop Single Origins <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COFFEE BREWING METRIC GUIDE ── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Precision Brew Ratio Guide</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Brewing temperature, grind consistency, and extraction speed are critical to experiencing the bean's full flavor. Choose your method to view extraction metrics.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {Object.keys(brewGuides).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrew(b)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors ${selectedBrew === b
                      ? "bg-brand-gold text-brand-espresso border-brand-gold"
                      : "bg-brand-espresso border-neutral-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                >
                  {brewGuides[b].name}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-brand-medium/40 border border-neutral-850 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Recommended Ratio</span>
                <span className="text-white font-mono text-lg font-bold">{brewGuides[selectedBrew].ratio}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Grind Density</span>
                <span className="text-white text-base font-semibold">{brewGuides[selectedBrew].grind}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Ideal Water Temp</span>
                <span className="text-brand-gold font-mono text-lg font-bold">{brewGuides[selectedBrew].temp}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Extraction Duration</span>
                <span className="text-white text-base font-semibold">{brewGuides[selectedBrew].time}</span>
              </div>
            </div>

            <div className="bg-brand-medium/70 border border-neutral-800 p-6 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">Extraction Notes</span>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {brewGuides[selectedBrew].steps}
                </p>
              </div>
              <div className="flex gap-2 items-center text-xs text-zinc-400 bg-brand-espresso/30 p-2.5 rounded border border-neutral-800/40">
                <Info className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Adjust ratio slightly to modify extraction strength.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: THE ROASTING JOURNEY ── */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Thermometer className="w-3.5 h-3.5" /> From Cherry to Cup
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">The Roasting Journey</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Every bag of Obscura coffee travels through five precision-controlled stages before it reaches your grinder.
          </p>
        </div>

        <div className="relative">
          <div className="space-y-10">
            {[
              {
                step: "01", icon: <Globe className="w-5 h-5" />,
                title: "Direct-Trade Sourcing",
                desc: "We visit farms personally in Colombia, Ethiopia, Panama and Guatemala — building multi-year relationships with producers who share our obsession for quality. No middlemen. No commodity lots.",
                side: "left",
              },
              {
                step: "02", icon: <Droplets className="w-5 h-5" />,
                title: "Fermentation & Processing",
                desc: "Cherries are sorted by density and processed using washed, natural, or anaerobic methods. Our partners use controlled pH environments and temperature logging to develop precise flavor compounds.",
                side: "right",
              },
              {
                step: "03", icon: <FlaskConical className="w-5 h-5" />,
                title: "Pre-Shipment Cupping",
                desc: "Every lot is evaluated by our SCA-Certified Q-Grader in-country before shipping. Only lots scoring 84+ SCA points are approved. We reject over 60% of sampled lots each season.",
                side: "left",
              },
              {
                step: "04", icon: <Thermometer className="w-5 h-5" />,
                title: "Convective Roasting",
                desc: "Our drum roaster uses real-time temperature mapping — tracking Rate of Rise (RoR), Bean Temperature, and airflow every 30 seconds. Each profile is customized per bean density and moisture content.",
                side: "right",
              },
              {
                step: "05", icon: <Zap className="w-5 h-5" />,
                title: "Degassing & Dispatch",
                desc: "Freshly roasted beans release CO₂ for 24–72 hours. We rest each batch in valve-sealed bags for exactly 48 hours before dispatch — ensuring peak extraction quality arrives at your door.",
                side: "left",
              },
            ].map((item, i) => (
              <div key={i} className={`flex gap-6 md:gap-10 items-start ${item.side === "right" ? "md:flex-row-reverse" : ""}`}>
                {/* Step badge */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono text-brand-gold/50 mt-1">{item.step}</span>
                </div>
                {/* Content */}
                <div className={`bg-brand-medium/30 border border-neutral-850 rounded-2xl p-6 flex-1 group hover:border-brand-gold/20 transition-colors ${item.side === "right" ? "md:text-right" : ""}`}>
                  <h3 className="text-white font-serif font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SOURCING PHILOSOPHY ── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs uppercase tracking-widest font-semibold">
            <Leaf className="w-3.5 h-3.5" /> Our Commitment
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Sourcing Philosophy</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            We believe exceptional coffee starts long before the roaster. Our sourcing model is built on three non-negotiable principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Globe className="w-7 h-7" />,
              title: "Direct-Trade Partnerships",
              badge: "No Middlemen",
              desc: "We work directly with 11 farming families across 4 countries. Each producer receives 25–40% above Fair Trade floor prices. We co-invest in solar drying tables, cherry sorters, and fermentation tanks.",
              stats: [{ label: "Avg. Price Premium", val: "31%" }, { label: "Farm Partnerships", val: "11 Active" }],
              accent: "from-brand-gold/20 to-transparent",
            },
            {
              icon: <Thermometer className="w-7 h-7" />,
              title: "Altitude-Driven Quality",
              badge: "1,700m+ Only",
              desc: "High-altitude coffee develops more slowly, concentrating sugars and organic acids. Every lot we purchase originates above 1,700 meters — the threshold for truly expressive specialty flavor development.",
              stats: [{ label: "Min. Altitude", val: "1,700m" }, { label: "Avg. SCA Score", val: "87.2 pts" }],
              accent: "from-emerald-900/20 to-transparent",
            },
            {
              icon: <Star className="w-7 h-7" />,
              title: "SCA Certification Standards",
              badge: "Q-Grader Verified",
              desc: "Our head roaster is a certified SCA Q-Grader — the highest qualification in specialty coffee. Every lot passes a blind cupping protocol scoring aroma, flavor, aftertaste, acidity, body, uniformity, and overall.",
              stats: [{ label: "Cupping Attributes", val: "10 Point Scale" }, { label: "Rejection Rate", val: "62% of Samples" }],
              accent: "from-purple-900/20 to-transparent",
            },
          ].map((card, i) => (
            <div key={i} className={`bg-gradient-to-b ${card.accent} bg-brand-medium/20 border border-neutral-850 rounded-3xl p-8 flex flex-col gap-6 hover:border-brand-gold/20 transition-colors group`}>
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  {card.icon}
                </div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-gold bg-brand-gold/10 px-2 py-1 rounded">
                  {card.badge}
                </span>
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-xl mb-3">{card.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
              <div className="border-t border-neutral-800/80 pt-4 grid grid-cols-2 gap-4 mt-auto">
                {card.stats.map((s, si) => (
                  <div key={si}>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</span>
                    <span className="block text-brand-gold font-mono font-bold text-sm mt-0.5">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: CUPPING LAB NOTES ── */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-brand-medium/25 border border-neutral-850 rounded-3xl p-8 md:p-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs uppercase tracking-widest font-semibold">
                <FlaskConical className="w-3.5 h-3.5" /> Cupping Lab
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Latest Tasting Notes</h2>
              <p className="text-zinc-400 text-sm max-w-lg">
                Our Q-Grader cups every incoming lot using the SCA protocol. These are live session notes from our Seattle roastery lab.
              </p>
            </div>
            <button
              onClick={() => navigateTo("shop")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso font-bold text-sm uppercase tracking-wider transition-all shrink-0 self-start md:self-end"
            >
              Shop All Lots <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                lot: "Ethiopia Yirgacheffe G1",
                process: "Washed",
                score: "90.0",
                date: "Cupped: May 28, 2026",
                roaster: "Head Q-Grader: Venkat S.",
                notes: ["Bergamot", "Lemon Curd", "Jasmine Tea", "Stone Fruit"],
                aroma: "9.0", flavor: "8.75", acidity: "High", body: "Light",
                color: "text-emerald-400",
                bg: "bg-emerald-900/10 border-emerald-900/40",
              },
              {
                lot: "Colombia Pink Bourbon",
                process: "Anaerobic Natural",
                score: "88.5",
                date: "Cupped: Jun 02, 2026",
                roaster: "Head Q-Grader: Venkat S.",
                notes: ["Strawberry Jam", "Hibiscus", "Dark Honey", "Cacao Nib"],
                aroma: "8.75", flavor: "8.5", acidity: "Medium", body: "Syrupy",
                color: "text-rose-400",
                bg: "bg-rose-900/10 border-rose-900/40",
              },
              {
                lot: "Panama Geisha Reserve",
                process: "Natural Honey",
                score: "91.5",
                date: "Cupped: Jun 05, 2026",
                roaster: "Head Q-Grader: Venkat S.",
                notes: ["Mandarin Orange", "White Peach", "Tropical Floral", "Almond Milk"],
                aroma: "9.25", flavor: "9.0", acidity: "Crisp", body: "Delicate",
                color: "text-amber-400",
                bg: "bg-amber-900/10 border-amber-900/40",
              },
            ].map((cup, i) => (
              <div key={i} className={`border ${cup.bg} rounded-2xl p-6 flex flex-col gap-5 hover:border-brand-gold/30 transition-colors`}>
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif font-bold text-white text-base leading-snug">{cup.lot}</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">{cup.process} · {cup.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`block text-2xl font-mono font-bold ${cup.color}`}>{cup.score}</span>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider">SCA pts</span>
                  </div>
                </div>

                {/* Score bars */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Aroma", val: cup.aroma },
                    { label: "Flavor", val: cup.flavor },
                    { label: "Acidity", val: cup.acidity },
                    { label: "Body", val: cup.body },
                  ].map((attr, ai) => (
                    <div key={ai} className="space-y-0.5">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">{attr.label}</span>
                      <span className="text-zinc-300 font-semibold">{attr.val}</span>
                    </div>
                  ))}
                </div>

                {/* Flavor tags */}
                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Tasting Notes</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cup.notes.map((n) => (
                      <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-brand-medium/60 border border-neutral-800 text-zinc-400">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-800/60 pt-3 flex items-center gap-1.5 text-[10px] text-zinc-600">
                  <Clock className="w-3 h-3" /> {cup.roaster}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

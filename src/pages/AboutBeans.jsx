import React, { useState } from "react";
import { Coffee, ArrowRight, Compass, Sun, Flame, Sparkles } from "lucide-react";

export default function AboutBeans() {
  const [flippedCard, setFlippedCard] = useState({
    ethiopia: false,
    colombia: false,
    sumatra: false
  });

  const handleFlip = (country) => {
    setFlippedCard(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  const countries = [
    {
      id: "ethiopia",
      name: "Ethiopia",
      region: "Yirgacheffe / Sidamo",
      image: "https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=600&q=80",
      description: "The birth-place of Arabica coffee. Beans grow semi-wild at high altitudes, producing incredibly complex floral cup profiles.",
      altitude: "1,800m - 2,200m",
      harvest: "Oct - Dec",
      processing: "Washed / Natural",
      notes: "Jasmine, Peach, Bergamot, Black Tea"
    },
    {
      id: "colombia",
      name: "Colombia",
      region: "Huila / Nariño",
      image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=600&q=80",
      description: "Blessed with volcanic soils and multiple microclimates, Colombia produces rich, balanced coffees with classic sweetness.",
      altitude: "1,500m - 1,900m",
      harvest: "Year-Round (Two Peaks)",
      processing: "Washed",
      notes: "Milk Chocolate, Caramel, Red Apple, Pecan"
    },
    {
      id: "sumatra",
      name: "Sumatra",
      region: "Aceh (Gayo Highlands)",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
      description: "Utilizes the rare 'Giling Basah' wet-hulled method, yielding extremely full-bodied, low-acidity coffees with herbal depths.",
      altitude: "1,100m - 1,600m",
      harvest: "Mar - May / Sep - Nov",
      processing: "Wet-Hulled",
      notes: "Dark Chocolate, Cedar, Spiced Licorice, Herbs"
    }
  ];

  const timelineSteps = [
    {
      step: "01",
      title: "Sustainable Cultivation",
      icon: <Compass className="w-5 h-5" />,
      desc: "Our coffees are grown at high altitudes (1,100m - 2,200m) under shade canopies. Slower growth allows beans to absorb rich mineral densities from volcanic soils, packing complex chemical sugars."
    },
    {
      step: "02",
      title: "Selective Hand-Picking",
      icon: <Sun className="w-5 h-5" />,
      desc: "Industrial harvesting strips branches bare, collecting unripe greens and overripe blacks. Our farming partners selectively hand-pick only fully saturated red coffee cherries in multiple passes."
    },
    {
      step: "03",
      title: "Terroir Preservation (Processing)",
      icon: <Flame className="w-5 h-5" />,
      desc: "Cherries are processed on raised African drying beds. Natural coffees dry intact, transferring fruit sugars to the seed. Washed coffees undergo controlled fermentation before skin peeling."
    },
    {
      step: "04",
      title: "Certified Q-Cupping Audit",
      icon: <Sparkles className="w-5 h-5" />,
      desc: "Before shipping across the oceans, samples are roasted and cupped by our SCA Certified Q-Grader. We check body, balance, defect ratios, and score profiles, securing lots rated 86+ points."
    },
    {
      step: "05",
      title: "Meticulous Micro-Batch Roasting",
      icon: <Coffee className="w-5 h-5" />,
      desc: "We roast in our custom Seattle drum roaster. Utilizing software and gas regulators, we track heat absorption curves to hit the precise crack temperature, locking in aromatic profiles."
    }
  ];

  return (
    <div className="animate-fade-in-up">

      {/* ── BEANS STORY HERO SECTION ── */}
      <section className="relative py-24 sm:py-32 bg-zinc-950 text-white overflow-hidden flex items-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=1600&q=80')" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-espresso to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-espresso/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/15 border border-brand-gold/20 px-4 py-1.5 rounded-full">
            Direct Trade Sourcing
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif leading-tight max-w-2xl">
            Trace the <span className="text-brand-gold">Beans</span> Story
          </h1>
          <p className="text-brand-latte/80 text-sm sm:text-lg max-w-xl leading-relaxed">
            From high-altitude micro-climates in Huila and Yirgacheffe to our drum roaster in Seattle, learn how we secure exceptional quality lots.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById("origin-regions");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Explore Sourcing Regions
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("seed-to-cup");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-transparent hover:bg-white/10 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all active:scale-95"
            >
              Seed-to-Cup Process
            </button>
          </div>
          {/* Sourcing Stats */}
          <div className="flex flex-wrap gap-8 text-sm text-zinc-400 pt-4">
            <div><span className="block text-2xl font-bold text-white">86+</span>SCA Cupping Score</div>
            <div><span className="block text-2xl font-bold text-white">100%</span>Direct Sourced Lots</div>
            <div><span className="block text-2xl font-bold text-white">3+</span>Single-Origin Partners</div>
          </div>
        </div>
        </div>
      </section>

      {/* Main Content */}

      {/* Intro Section */}
      <div className="bg-brand-lightdark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
            Bean Sourcing Heritage
          </span>
          <h2 className="text-4xl font-sans font-bold text-brand-cream">About The Beans Journey</h2>
          <p className="text-brand-latte/75 text-sm">
            Trace the path of specialty coffee from high-altitude shade farms to your morning cup. Click the origin cards below to explore details about our growing regions.
          </p>
        </div>
        </div>
      </div>

      {/* Origin Cards + Timeline Section */}
      <div className="bg-brand-espresso py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Origin Country Cards (Interactive Flip) */}
        <div id="origin-regions" className="space-y-6 scroll-mt-24">
          <h3 className="text-lg font-serif font-bold text-brand-cream text-center lg:text-left border-b border-neutral-900 pb-3">
            Our Primary Sourcing Regions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countries.map((c) => (
              <div
                key={c.id}
                onClick={() => handleFlip(c.id)}
                className="group cursor-pointer select-none"
              >
                <div className="text-center text-xs text-neutral-500 mb-2 font-medium">
                  Click Card to {flippedCard[c.id] ? "View Front" : "Flip Details"}
                </div>

                {/* Flip Card Wrapper */}
                <div className={`flip-card w-full h-[360px] ${flippedCard[c.id] ? "flipped" : ""}`}>
                  <div className="flip-card-inner relative w-full h-full duration-700">

                    {/* FRONT SIDE */}
                    <div className="flip-card-front absolute inset-0 w-full h-full rounded-3xl overflow-hidden glass-panel border border-neutral-850 p-6 flex flex-col justify-between">
                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 border border-neutral-900">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">{c.region}</span>
                        <h4 className="text-2xl font-serif font-bold text-brand-cream">{c.name}</h4>
                        <p className="text-xs text-brand-latte/70 leading-relaxed line-clamp-3">
                          {c.description}
                        </p>
                      </div>
                      <div className="text-[10px] font-bold text-brand-gold uppercase tracking-wider flex items-center pt-4 border-t border-neutral-900/60 mt-2">
                        Inspect terroir details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="flip-card-back absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-brand-medium border border-brand-gold/25 p-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="border-b border-neutral-850 pb-2">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Terroir Profile</span>
                          <h4 className="text-2xl font-serif font-bold text-brand-cream mt-0.5">{c.name} Metrics</h4>
                        </div>

                        <div className="space-y-3.5 text-xs">
                          <div>
                            <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Average Altitude</span>
                            <span className="font-semibold text-brand-cream font-mono">{c.altitude}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Harvesting Period</span>
                            <span className="font-semibold text-brand-cream">{c.harvest}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Primary Processing</span>
                            <span className="font-semibold text-brand-cream">{c.processing}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Typical Flavor Notes</span>
                            <span className="font-bold text-brand-gold">{c.notes}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[9px] text-neutral-500 font-mono tracking-wide uppercase border-t border-neutral-850 pt-2 block">
                        Click to flip back
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Seed-to-Cup Alternating Timeline */}
        <section id="seed-to-cup" className="space-y-12 max-w-5xl mx-auto scroll-mt-24">
          <h3 className="text-2xl font-serif font-bold text-brand-cream text-center border-b border-neutral-900 pb-3">
            The Seed-to-Cup Timeline
          </h3>

          <div className="relative">
            {/* Central Vertical Line (Desktop) / Left Line (Mobile) */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 md:-translate-x-1/2" />

            <div className="space-y-12 relative">
              {timelineSteps.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={item.step}
                    className={`flex flex-col md:flex-row items-stretch justify-between relative group ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* Content Card (Left or Right side on desktop, full-width on mobile) */}
                    <div className="w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0">
                      <div className="p-6 rounded-2xl bg-brand-medium/20 border border-neutral-900/60 hover:border-brand-gold/30 hover:bg-brand-medium/30 transition-all duration-300 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-brand-gold">{item.step}</span>
                          <h4 className="text-lg font-bold text-brand-cream">{item.title}</h4>
                        </div>
                        <p className="text-sm text-brand-latte/75 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Stepper Node Icon in Center */}
                    <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-9 h-9 rounded-full bg-brand-espresso border border-neutral-800 text-neutral-400 group-hover:border-brand-gold group-hover:text-brand-gold transition-all duration-300 flex items-center justify-center z-10 shadow-lg">
                      {item.icon}
                    </div>

                    {/* Empty Spacer Card for Desktop layout alignment */}
                    <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                  </div>
                );
              })}
            </div>
          </div>
          </div>
      </section>

        </div>
      </div>

      {/* Roast Profiling Sections */}
      <div className="bg-brand-lightdark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── SECTION 1: ART OF ROAST PROFILING ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-medium/20 border border-neutral-900/60 p-8 rounded-3xl">
          <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-neutral-850 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
              alt="Artisan Roast Profiling"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-3.5 py-1 rounded-full border border-brand-gold/20">
              01 · Thermodynamic Curve Mapping
            </span>
            <h3 className="text-3xl font-serif font-bold text-brand-cream">The Art of Roast Profiling</h3>
            <p className="text-brand-latte/75 text-sm leading-relaxed">
              Every coffee bean has a unique cellular density and moisture content. We don't just apply heat; we map out customized roasting curves. By tracking parameters like Charge Temperature, Rate of Rise (RoR), and color development index, our master roasters unlock the optimal terroir expression of every harvest.
            </p>
            <div className="flex gap-6 text-xs text-neutral-400 font-mono pt-2">
              <div><span className="block text-lg font-bold text-white">30s</span>Log Interval</div>
              <div><span className="block text-lg font-bold text-white">0.1°C</span>Precision Sensors</div>
              <div><span className="block text-lg font-bold text-white">Artisan</span>Software Integration</div>
            </div>
          </div>
          </div>
      </section>

        {/* ── SECTION 2: SCIENTIFIC SENSORY EVALUATION ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-medium/20 border border-neutral-900/60 p-8 rounded-3xl">
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-3.5 py-1 rounded-full border border-brand-gold/20">
              02 · Sensory Calibration Lab
            </span>
            <h3 className="text-3xl font-serif font-bold text-brand-cream">Scientific Sensory Evaluation</h3>
            <p className="text-brand-latte/75 text-sm leading-relaxed">
              Quality assurance doesn't end at the roaster. In our dedicated cupping lab, each production batch undergoes rigorous sensory grading. We evaluate cups based on fragrance, flavor cleanliness, body texture, acidity brightness, and aftertaste stability, ensuring every single bag matches the signature profile.
            </p>
            <div className="flex gap-6 text-xs text-neutral-400 font-mono pt-2">
              <div><span className="block text-lg font-bold text-white">SCA</span>Cupping Protocol</div>
              <div><span className="block text-lg font-bold text-white">100%</span>Batch Calibration</div>
              <div><span className="block text-lg font-bold text-white">Q-Grader</span>Led Operations</div>
            </div>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-neutral-850 shadow-xl order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
              alt="Coffee Cupping Session"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          </div>
      </section>

        {/* ── SECTION 3: OPTIMAL EXTRACTION ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-medium/20 border border-neutral-900/60 p-8 rounded-3xl">
          <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-neutral-850 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
              alt="Pour-over Coffee Extraction"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-3.5 py-1 rounded-full border border-brand-gold/20">
              03 · Brew Science
            </span>
            <h3 className="text-3xl font-serif font-bold text-brand-cream">Optimal Extraction & Brewing</h3>
            <p className="text-brand-latte/75 text-sm leading-relaxed">
              The final step of the bean's journey is in your hands. To highlight the delicate florals and clean fruit notes of our light roasts, or the rich, creamy chocolate bodies of our espresso blends, we recommend standard extraction metrics: clean water filtered to 150 TDS, heated to 93°C, brewed at a 1:16 ratio.
            </p>
            <div className="flex gap-6 text-xs text-neutral-400 font-mono pt-2">
              <div><span className="block text-lg font-bold text-white">93°C</span>Optimal Brew Temp</div>
              <div><span className="block text-lg font-bold text-white">1:16</span>Golden Brew Ratio</div>
              <div><span className="block text-lg font-bold text-white">Fresh</span>Ground on Demand</div>
            </div>
          </div>
          </div>
      </section>

        </div>
      </div>
    </div>
  );
}
  );
}

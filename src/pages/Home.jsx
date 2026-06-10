import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Coffee, ArrowRight, ShieldCheck, Zap, Globe,
  Star, Flame, Clock, Award, Timer, Sparkles
} from "lucide-react";
import Hero from "../components/Hero";

export default function Home() {
  const { navigateTo, products } = useApp();
  const [selectedProfile, setSelectedProfile] = useState("floral");
  const [activeStep, setActiveStep] = useState(0);

  // Flavor Profile Matching
  const profileMatches = {
    floral: {
      title: "Floral & Elegant",
      description: "Delicate tea-like profiles with hints of jasmine, lavender, and sweet citrus notes. Best represented by East African light roasts.",
      productId: "ethiopia-yirgacheffe",
      productName: "Ethiopia Yirgacheffe G1",
      notes: ["Jasmine", "Peach", "Bergamot", "Lemon Tea"]
    },
    fruity: {
      title: "Vibrant & Sweet",
      description: "Jelly-like sweetness with strong notes of berries, stone fruit, and tropical honey. Best represented by natural-processed lots.",
      productId: "geisha-reserve",
      productName: "Panama Geisha Finca Esmeralda",
      notes: ["Bergamot", "Jasmine Bloom", "Mandarin", "Honey"]
    },
    chocolatey: {
      title: "Rich & Balanced",
      description: "Deep cocoa notes, balanced caramel sweetness, and mild apple-like acidity. A classic cup loved by all.",
      productId: "colombia-supremo",
      productName: "Colombia Huila Supremo",
      notes: ["Milk Chocolate", "Red Apple", "Caramel", "Toasted Pecan"]
    },
    earthy: {
      title: "Bold & Earthy",
      description: "Low-acid, heavy-bodied profiles featuring notes of cedar, forest herbs, tobacco leaf, and rich spices.",
      productId: "sumatra-mandheling",
      productName: "Sumatra Mandheling Organic",
      notes: ["Dark Chocolate", "Cedar", "Tobacco Leaf", "Licorice"]
    }
  };

  const currentMatch = profileMatches[selectedProfile];
  const matchedProduct = products.find(p => p.id === currentMatch.productId);

  // Roast Journey Steps
  const journeySteps = [
    {
      title: "Direct Sourcing",
      subtitle: "Securing Green Lots",
      desc: "We travel directly to farm origins, inspecting micro-climates and cupping fresh harvests. By paying 2-3x Fair Trade minimums directly to farm families, we secure top-tier micro-lots.",
      metric: "Direct Trade",
      icon: <Globe className="w-5 h-5 text-brand-gold" />,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Optical Sorting",
      subtitle: "Sorting Grade 1 Defect-Free",
      desc: "Upon arrival, green beans undergo rigorous density and optical sorting. Any defect, under-ripe, or broken bean is removed to ensure a perfectly clean and uniform cup.",
      metric: "SCA Grade 1",
      icon: <ShieldCheck className="w-5 h-5 text-brand-gold" />,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Profile Roasting",
      subtitle: "Thermal Precision Profiles",
      desc: "Our master roasters apply custom temperature curves using specialized heat-conductive drum roasters. Every profile is saved digitally to ensure absolute batch consistency.",
      metric: "Thermal Profiling",
      icon: <Flame className="w-5 h-5 text-brand-gold" />,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Sensory Cupping",
      subtitle: "Score Certification (86+ Points)",
      desc: "Each roasted batch is cupped and evaluated by Q-Graders. We review fragrance, acidity, body, sweetness, and clean finish before packaging.",
      metric: "86+ SCA Score",
      icon: <Award className="w-5 h-5 text-brand-gold" />,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Fresh Despatch",
      subtitle: "Nitrogen Flush Delivery",
      desc: "Beans are immediately packaged in recyclable, plant-based pouches with one-way degassing valves to lock in freshness, then shipped directly to your door.",
      metric: "Freshness Seal",
      icon: <Clock className="w-5 h-5 text-brand-gold" />,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Curated Bundles
  const bundles = [
    {
      name: "Single-Origin Discovery Set",
      subtitle: "Best Sellers Selection",
      price: 52.00,
      description: "Experience the ultimate taste journey across continents. Includes 3 full-sized bags: Ethiopia Yirgacheffe, Colombia Huila, and Sumatra Mandheling.",
      items: ["Ethiopia Yirgacheffe (Light)", "Colombia Huila (Medium)", "Sumatra Mandheling (Dark)"],
      badge: "Roasters Pick",
      link: "shop"
    },
    {
      name: "The Espresso Aficionado Trio",
      subtitle: "Perfect Crema Set",
      price: 55.00,
      description: "A selection formulated specifically for home espresso machines. Includes 3 bags of signature beans optimized for high pressure extraction.",
      items: ["2x Obscura Signature Blend", "1x Colombia Huila Supremo"],
      badge: "Most Popular",
      link: "shop"
    },
    {
      name: "Pour-Over Starter Kit",
      subtitle: "All-in-One Coffee & Gear",
      price: 74.00,
      description: "Everything you need to master pour-over brewing at home. Includes our specialty Hario decanter server and a bag of light roast Ethiopian beans.",
      items: ["Hario V60 Drip Decanter", "Ethiopia Yirgacheffe G1 Bag"],
      badge: "Best Value",
      link: "shop"
    }
  ];

  // Brew Guides Helper
  const brewGuides = [
    {
      method: "Hario V65 / Chemex",
      ratio: "1:16 (15g coffee to 240g water)",
      temp: "93°C - 95°C",
      grind: "Medium (like sea salt)",
      time: "3:00 - 3:30 mins",
      tip: "Pour in slow circular motions, avoiding the paper filter edge."
    },
    {
      method: "Home Espresso",
      ratio: "1:2 (18g dry dose to 36g espresso output)",
      temp: "92°C - 94°C",
      grind: "Fine (like table salt)",
      time: "26 - 30 seconds",
      tip: "Ensure a firm, level tamp for optimal flavor extraction."
    },
    {
      method: "French Press",
      ratio: "1:15 (30g coffee to 450g water)",
      temp: "94°C - 96°C",
      grind: "Coarse (like breadcrumbs)",
      time: "4:00 mins",
      tip: "Stir crust gently at 1:00 min, then plunge smoothly."
    }
  ];

  return (
    <div className="space-y-28 pb-28">

      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. INTERACTIVE FLAVOR SELECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Discover Your Profile</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream mt-2">Find Your Perfect Roast</h2>
          <p className="text-brand-latte/75 text-sm max-w-md mx-auto mt-2">
            Click on a flavor family below to reveal its characteristics and get matched with our current seasonal roasting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-medium/50 rounded-3xl p-6 sm:p-10 border border-neutral-900 shadow-xl">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-3">
            {Object.keys(profileMatches).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedProfile(key)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${selectedProfile === key
                  ? "bg-brand-gold/10 border-brand-gold/40 text-brand-gold"
                  : "bg-brand-espresso/30 border-neutral-850 hover:border-neutral-800 text-brand-cream/80"
                  }`}
              >
                <span className="font-semibold text-base capitalize">{key} Profile</span>
                <span className={`w-3.5 h-3.5 rounded-full border border-current ${selectedProfile === key ? "bg-brand-gold border-brand-gold" : "border-neutral-600"
                  }`} />
              </button>
            ))}
          </div>

          {/* Result Card */}
          <div className="lg:col-span-7 rounded-2xl bg-brand-espresso/80 border border-neutral-850 p-6 sm:p-8 space-y-6 min-h-[300px] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/15 px-2.5 py-1 rounded">
                Matched roast profile
              </span>
              <h3 className="text-2xl font-serif text-brand-cream font-bold">{currentMatch.title}</h3>
              <p className="text-brand-latte/80 text-sm leading-relaxed">{currentMatch.description}</p>


            </div>

            {matchedProduct && (
              <div className="pt-6 border-t border-neutral-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={matchedProduct.image}
                    alt={matchedProduct.name}
                    className="w-12 h-12 rounded-lg object-cover border border-neutral-800"
                  />
                  <div>
                    <p className="text-xs text-neutral-400 font-medium">Recommended Coffee</p>
                    <p className="text-sm font-bold text-brand-cream">{matchedProduct.name}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo("product-details", matchedProduct.id)}
                  className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-full transition-colors flex items-center justify-center"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. NEW SECTION: BEST SELLERS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Roaster's Favorites</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream mt-2">Active Best Sellers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              onClick={() => navigateTo("product-details", product.id)}
              className="group cursor-pointer rounded-3xl glass-panel p-5 space-y-4 hover:border-brand-gold/40 transition-all duration-300"
            >
              <div className="aspect-square w-full rounded-2xl overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-brand-espresso/90 border border-neutral-800 text-[10px] text-brand-gold font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {product.roast || "Specialty"}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                    {product.type || "Equipment"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-brand-gold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <h4 className="text-lg font-serif font-bold text-brand-cream group-hover:text-brand-gold transition-colors truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-brand-latte/70 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-850">
                  <span className="text-base font-bold text-brand-cream">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-brand-gold font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NEW SECTION: THE ROAST JOURNEY (Interactive Stepper) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold font-mono">Bean Journey</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream mt-2">Sourcing To Cup</h2>
        </div>

        {/* Stepper Steps Header */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-10">
          {journeySteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center gap-2 ${activeStep === idx
                ? "bg-brand-gold/10 border-brand-gold/40 text-brand-gold"
                : "bg-brand-espresso/30 border-neutral-850 hover:border-neutral-800 text-brand-cream/60"
                }`}
            >
              <div className="w-9 h-9 rounded-full bg-brand-medium flex items-center justify-center">
                {step.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider block">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-brand-medium/40 border border-neutral-850 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-brand-gold/15 text-brand-gold px-2.5 py-1 rounded">
                Step 0{activeStep + 1}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-latte/65">
                {journeySteps[activeStep].metric}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-cream">
              {journeySteps[activeStep].subtitle}
            </h3>
            <p className="text-sm text-brand-latte/80 leading-relaxed max-w-2xl">
              {journeySteps[activeStep].desc}
            </p>
          </div>
          <div className="lg:col-span-4 aspect-video sm:aspect-square rounded-2xl border border-neutral-800 overflow-hidden relative">
            <img
              src={journeySteps[activeStep].image}
              alt={journeySteps[activeStep].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 backdrop-blur-sm flex items-center justify-center text-brand-gold border border-brand-gold/30">
                {journeySteps[activeStep].icon}
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-brand-gold/80">Step 0{activeStep + 1}</p>
                <p className="text-sm font-bold text-white font-serif">{journeySteps[activeStep].metric}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW SECTION: ROASTER'S CHOICE BUNDLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Curated Selections</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream mt-2">Roaster's Choice Bundles</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bundles.map((bundle, idx) => (
            <div
              key={idx}
              className="bg-brand-medium/30 border border-neutral-850 p-8 rounded-3xl flex flex-col justify-between space-y-6 hover:border-brand-gold/30 transition-all duration-300 shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-gold/15 text-brand-gold px-2.5 py-1 rounded">
                    {bundle.badge}
                  </span>
                  <span className="text-2xl font-bold text-brand-cream">${bundle.price.toFixed(2)}</span>
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-brand-cream">{bundle.name}</h4>
                  <p className="text-xs text-brand-gold font-medium mt-0.5">{bundle.subtitle}</p>
                </div>
                <p className="text-xs text-brand-latte/75 leading-relaxed">
                  {bundle.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-neutral-850">
                  <p className="text-xs uppercase tracking-wider font-bold text-brand-cream/80">Included in bundle:</p>
                  <ul className="space-y-1">
                    {bundle.items.map((item, id) => (
                      <li key={id} className="text-xs text-brand-latte/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => navigateTo(bundle.link)}
                className="w-full bg-brand-gold/10 border border-brand-gold/30 hover:bg-brand-gold hover:text-brand-espresso text-brand-gold text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300"
              >
                Order Bundle
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BRAND VALUES BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Our Philosophy</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream mt-2">Built On Meticulous Sourcing</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Direct Sourcing */}
          <div className="md:col-span-2 rounded-3xl glass-panel p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group">
            <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-cream">100% Direct Sourced Micro-Lots</h3>
              <p className="text-brand-latte/75 text-sm max-w-xl leading-relaxed">
                We travel to regions like Huila in Colombia, Yirgacheffe in Ethiopia, and Boquete in Panama to build direct relationships with smallholder family farms. By bypassing middle exporters, we pay 2-3x Fair Trade minimums directly to farmers, securing access to rare, limited lots.
              </p>
            </div>
            <button
              onClick={() => navigateTo("about-beans")}
              className="relative z-10 self-start text-brand-gold hover:text-brand-cream text-xs font-semibold uppercase tracking-wider flex items-center mt-6 transition-colors"
            >
              Learn about origins <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          {/* Bento Card 2: Precision Roasting */}
          <div className="rounded-3xl glass-panel p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group">
            <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-6">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-cream">Batch-Precision Roasting</h3>
              <p className="text-brand-latte/75 text-sm leading-relaxed mt-4">
                We roast on a custom drum roaster utilizing thermal tracking. Each batch is profiled meticulously to unlock precise floral, berry, and sweet cocoa compounds.
              </p>
            </div>
            <span className="relative z-10 text-brand-gold text-xs font-bold font-mono tracking-widest mt-6">
              SEATTLE, WA ROASTERY
            </span>
          </div>

          {/* Bento Card 3: Quality Control */}
          <div className="rounded-3xl glass-panel p-8 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-cream">SCA Quality Cupped</h3>
              <p className="text-brand-latte/75 text-sm leading-relaxed mt-4">
                Every shipment is tested and cupped by our SCA Certified Q-Grader to check for consistency. We guarantee an SCA score of 86+ points on all our single-origin products.
              </p>
            </div>
            <span className="text-brand-latte/50 text-xs mt-6">
              86+ SCA POINTS GUARANTEED
            </span>
          </div>

          {/* Bento Card 4: Environmental Commitment */}
          <div className="md:col-span-2 rounded-3xl glass-panel p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
            <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-cream">Eco-Conscious Brewing & Carbon Neutral</h3>
              <p className="text-brand-latte/75 text-sm max-w-xl leading-relaxed">
                Our roasting facility is powered by 100% renewable wind energy. We ship our coffees using compostable bags lined with plant-based barriers and ship all orders carbon neutral, offsetting logistics footprint through accredited forestry conservation projects.
              </p>
            </div>
            <span className="relative z-10 text-emerald-400 text-xs font-semibold flex items-center mt-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
              CLIMATE NEUTRAL OPERATIONS
            </span>
          </div>
        </div>
      </section>

      {/* 7. NEW SECTION: CUSTOMER STORIES (Testimonial Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Member Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream mt-2">What Our Community Says</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Julian K.",
              role: "SCA Certified Q-Grader",
              quote: "The Ethiopia Yirgacheffe G1 blew me away. Incredibly distinct jasmine and peach aromas with a clean tea-like finish. It's rare to get single-origins of this caliber roasted so consistently.",
              rating: 5
            },
            {
              name: "Sophia L.",
              role: "Coffee Club Member",
              quote: "I've been on the Medium Roast monthly subscription for 6 months. Every bag arrives within 48 hours of roasting, and the ability to update grind size directly on the dashboard is fantastic.",
              rating: 5
            },
            {
              name: "Marcus T.",
              role: "Home Barista",
              quote: "The Panama Geisha Reserve is phenomenal. Finding premium, traceable micro-lots roasted with this level of thermal profile precision makes Obscura the absolute best in the country.",
              rating: 5
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-brand-medium/40 border border-neutral-850 p-8 rounded-3xl space-y-4 hover:border-brand-gold/20 transition-all duration-300"
            >
              <div className="flex gap-0.5 text-brand-gold">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-brand-cream italic leading-relaxed">
                "{item.quote}"
              </p>
              <div className="pt-4 border-t border-neutral-850">
                <p className="text-sm font-bold text-brand-cream">{item.name}</p>
                <p className="text-xs text-brand-gold font-medium">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEW SECTION: BREW GUIDES HELPER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Learn the Craft</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream mt-2">Interactive Brew Guides</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brewGuides.map((guide, idx) => (
            <div
              key={idx}
              className="bg-brand-medium/30 border border-neutral-850 p-6 sm:p-8 rounded-3xl space-y-4 hover:border-brand-gold/30 transition-colors"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-serif font-bold text-brand-cream">{guide.method}</h4>
                <Timer className="w-5 h-5 text-brand-gold" />
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                  <span className="text-neutral-400">Brew Ratio</span>
                  <span className="font-semibold text-brand-cream">{guide.ratio}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                  <span className="text-neutral-400">Water Temp</span>
                  <span className="font-semibold text-brand-cream">{guide.temp}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                  <span className="text-neutral-400">Grind Size</span>
                  <span className="font-semibold text-brand-cream">{guide.grind}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                  <span className="text-neutral-400">Target Time</span>
                  <span className="font-semibold text-brand-cream">{guide.time}</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[10px] uppercase font-bold tracking-wider text-brand-gold">Pro Tip</p>
                <p className="text-xs text-brand-latte/80 mt-1 leading-relaxed">{guide.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. COFFEE SUBSCRIPTION TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-brand-medium to-brand-espresso border border-brand-gold/25 p-8 sm:p-14 relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-8 shadow-2xl">

          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl -z-10" />

          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded">
              Obscura Coffee Club
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream">
              Never Run Out of Freshly Roasted Beans
            </h2>
            <p className="text-brand-latte/80 text-sm sm:text-base leading-relaxed">
              Join our subscription club to receive custom batches matching your preferred roast, grind size, and delivery frequency. Skip, pause, or adjust settings directly from your member dashboard at any time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => navigateTo("coffee-club")}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso font-semibold uppercase tracking-wider text-xs py-4 px-8 rounded-full shadow-lg transition-all flex items-center justify-center active:scale-95"
            >
              Build Your Plan <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}

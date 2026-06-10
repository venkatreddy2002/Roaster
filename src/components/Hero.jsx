import { useApp } from "../context/AppContext";

export default function Hero() {
  const { navigateTo } = useApp();

  return (
    <section className="h-screen bg-zinc-950 text-white flex items-center relative overflow-hidden">

      {/* Subtle background texture — coffee beans photo at very low opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80')" }}
      />
      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full text-left flex flex-col items-start pt-24 md:pt-28">

        {/* Eyebrow badge */}
        <span className="inline-block mb-6 text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/15 border border-brand-gold/20 px-4 py-1.5 rounded-full">
          Specialty Coffee · Seattle Roastery
        </span>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl font-bold leading-[1.1] tracking-tight">
          Crafted Beans.
          <br />
          <span className="text-brand-gold">Exceptional</span> Mornings.
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-zinc-300 text-lg max-w-xl leading-relaxed">
          Premium specialty coffee delivered monthly. Sourced directly from high-altitude farms, roasted to order in Seattle.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 justify-start">
          <button
            onClick={() => navigateTo("coffee-club")}
            className="px-8 py-4 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso font-semibold text-sm uppercase tracking-wider transition-colors shadow-lg"
          >
            Join Club
          </button>
          <button
            onClick={() => navigateTo("shop")}
            className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 font-semibold text-sm uppercase tracking-wider transition-colors"
          >
            Browse Beans
          </button>
        </div>

        {/* Social proof row */}
        <div className="mt-14 flex flex-wrap gap-8 text-sm text-zinc-400 justify-start">
          <div>
            <span className="block text-2xl font-bold text-white">86+</span>
            SCA Score Guaranteed
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">100%</span>
            Direct Trade Sourced
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">4,200+</span>
            Club Members
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, CheckCircle } from "lucide-react";

export default function Contact() {
  // Contact Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ States
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      q: "Are the coffee beans shipped fresh?",
      a: "Yes, absolutely! We roast our specialty batches on Mondays. All orders placed during the week are compiled, roasted on Monday morning, and shipped on Tuesday in valved degassing bags to lock in peak flavor compounds. They arrive at your doorstep within 2-4 days."
    },
    {
      q: "What is the Obscura Coffee Club lock-in policy?",
      a: "There are absolutely no contracts or hidden cancellation fees. You can pause, skip shipments, modify delivery frequency, adjust grind preferences, or cancel your membership directly from your member dashboard at any time. It's completely flexible."
    },
    {
      q: "Do you offer pre-ground coffee?",
      a: "Yes! While we recommend whole bean for maximum flavor retention, we can grind your beans to order. During checkout or when designing your subscription plan, you can select between Espresso (Fine), Drip/Filter (Medium), or French Press (Coarse) grind sizes."
    },
    {
      q: "Where do you source your beans?",
      a: "We travel directly to remote farming communities in Huila (Colombia), Yirgacheffe (Ethiopia), and Boquete (Panama) to establish direct-trade relationships. We bypass third-party brokers, paying double or triple Fair Trade minimums directly to farmers in exchange for rare lot harvests."
    },
    {
      q: "How does carbon-neutral shipping work?",
      a: "We calculate the exact carbon emissions footprint for every package shipped. We offset 100% of these logistics emissions by investing in certified forestry preservation and clean energy projects in partnership with ClimateNeutral."
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div className="animate-fade-in-up">

      {/* Intro & Form Section */}
      <section className="bg-brand-lightdark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h2 className="text-4xl font-sans font-bold text-brand-cream">Contact Our Roastery</h2>
        <p className="text-brand-latte/75 text-sm">
          Have questions about our single-origin micro-lots, custom wholesale requests, or need help adjusting your subscription plan? Send us a message or consult our FAQ.
        </p>
      </div>

      {/* Main Grid: Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Col: Contact Info (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl glass-panel p-6 sm:p-8 space-y-8">
            <h3 className="text-xl font-serif font-bold text-brand-cream border-b border-neutral-900 pb-3">
              Roastery HQ Coordinates
            </h3>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-cream">Roastery Location</h4>
                  <p className="text-xs text-brand-latte/80 leading-relaxed mt-1">
                    1204 Pine Street, Suite A<br />
                    Seattle, WA 98101
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-cream">Operating Hours</h4>
                  <p className="text-xs text-brand-latte/80 leading-relaxed mt-1">
                    Monday – Friday: 8:00 AM – 6:00 PM PST<br />
                    Saturday: 9:00 AM – 4:00 PM PST<br />
                    <span className="text-[10px] text-neutral-500 block mt-1">Closed Sundays for roasting calibration.</span>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-cream">Call The Roaster</h4>
                  <p className="text-xs text-brand-latte/80 mt-1">
                    +1 (206) 555-0143
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-cream">Electronic Mail</h4>
                  <p className="text-xs text-brand-latte/80 mt-1">
                    support@obscuraroasters.com
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Col: Contact Form (7 Columns) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass-panel p-6 sm:p-8 relative overflow-hidden">
            <h3 className="text-xl font-serif font-bold text-brand-cream border-b border-neutral-900 pb-3 mb-6">
              Send Dispatch Message
            </h3>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-2xl font-serif font-bold text-brand-cream">Message Dispatched</h4>
                <p className="text-brand-latte/75 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. We have logged your request and our SCA cupping staff will reply to your email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-wider py-2 px-5 rounded-full hover:bg-brand-gold/25 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-cream/80 text-xs mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Audrey Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-espresso/60 border border-neutral-850 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/55 text-brand-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-cream/80 text-xs mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="audrey@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-espresso/60 border border-neutral-850 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/55 text-brand-cream"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-brand-cream/80 text-xs mb-1">Subject / Inquiry</label>
                  <input
                    type="text"
                    required
                    placeholder="Wholesale request, subscription support..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-brand-espresso/60 border border-neutral-850 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/55 text-brand-cream"
                  />
                </div>

                <div>
                  <label className="block text-brand-cream/80 text-xs mb-1">Message Description</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your inquiry in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-brand-espresso/60 border border-neutral-850 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/55 text-brand-cream"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-brand-darkgold to-brand-gold text-brand-espresso font-semibold uppercase tracking-wider text-xs py-3.5 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5 mr-2" /> {loading ? "Dispatching..." : "Send Dispatch Message"}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="bg-[#0b0908] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center md:text-left space-y-1">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">Find Us</span>
          <h3 className="text-2xl font-serif font-bold text-brand-cream">Roastery Location Map</h3>
        </div>
        <div className="rounded-3xl overflow-hidden border border-neutral-900 bg-brand-medium/35 p-2 shadow-2xl relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.873265747475!2d-122.33230198436923!3d47.613014979185125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab2d48080ef%3A0x8bb9d68d0e704de!2s1204%20Pine%20St%2C%20Seattle%2C%20WA%2098101%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl w-full transition-all duration-300 dark:grayscale dark:invert-[0.9] dark:hue-rotate-[185deg] dark:brightness-[0.9]"
            title="Obscura Coffee Roastery Map"
          ></iframe>
        </div>
        </div>
      </section>

        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="bg-brand-lightdark py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h3 className="text-2xl font-serif font-bold text-brand-cream text-center border-b border-neutral-900 pb-3">
          Frequently Answered Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-850/80 bg-brand-medium/35 overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4.5 text-left select-none text-sm font-semibold text-brand-cream"
                  aria-expanded={isExpanded}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 shrink-0 ml-4 ${isExpanded ? "rotate-180 text-brand-gold" : ""
                    }`} />
                </button>

                {/* Accordion Content Panel */}
                {isExpanded && (
                  <div className="px-4.5 pb-4.5 text-xs text-brand-latte/85 leading-relaxed border-t border-neutral-900/40 pt-3 bg-brand-espresso/30 animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

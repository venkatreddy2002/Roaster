import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Lock, Mail, User, Eye, EyeOff, Sun, Moon } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, dark, setDark, rtl, setRtl, navigateTo } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isForgotPassword) {
        // Mock password reset request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setResetEmailSent(true);
      } else if (isLogin) {
        await login(email, password);
        onClose();
        navigateTo("dashboard");
        // Clear forms
        setEmail("");
        setPassword("");
      } else {
        if (!displayName.trim()) {
          throw new Error("Please enter your name.");
        }
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        await register(email, password, displayName);
        onClose();
        navigateTo("dashboard");
        // Clear forms
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDisplayName("");
      }
    } catch (err) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-brand-espresso flex overflow-hidden">
      {/* Full-Screen Split Layout */}
      <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Premium Specialty Coffee Roaster Image */}
        <div className="hidden md:block md:w-1/2 relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1200" 
            alt="Specialty Coffee Roaster" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Ambient Overlay */}
          <div className="absolute inset-0 bg-black/45" />
          
          {/* Brand & Quote overlay */}
          <div className="absolute bottom-12 left-12 right-12 space-y-4 z-10">
            <button 
              type="button"
              onClick={() => {
                onClose();
                navigateTo("home");
              }}
              className="flex items-center gap-3 text-left cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              <span className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center font-bold text-sm text-brand-espresso font-serif">O</span>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-gold font-mono">Obscura Reserve</span>
            </button>
            <h3 className="text-2xl font-serif font-bold text-white leading-snug max-w-md">
              "Roasting specialty micro-lots to reveal the true character of origin."
            </h3>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full md:w-1/2 px-6 py-6 md:px-12 md:py-8 flex flex-col justify-between relative bg-brand-espresso min-h-screen overflow-y-auto">
          {/* Border Glow Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-darkgold via-brand-gold to-brand-darkgold" />

          {/* Header Row: Mini Logo on Left, Toggles on Right (X button removed) */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/40">
            <button 
              type="button"
              onClick={() => {
                onClose();
                navigateTo("home");
              }}
              className="flex items-center gap-2 text-left cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center font-bold text-xs text-brand-espresso font-serif">
                O
              </div>
              <div className="-mt-0.5">
                <span className="block text-xs font-serif font-bold tracking-wider text-brand-gold uppercase leading-tight">Obscura</span>
                <span className="block text-[7px] uppercase tracking-widest text-zinc-550 font-bold -mt-0.5">Roasters</span>
              </div>
            </button>

            <div className="flex items-center gap-2.5">
              {/* RTL/LTR Toggle */}
              <button 
                type="button"
                onClick={() => setRtl(!rtl)}
                className="px-3 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 hover:text-brand-gold text-[10px] uppercase tracking-wider font-bold transition-all duration-200 active:scale-95 border border-white/5"
              >
                {rtl ? "LTR" : "RTL"}
              </button>

              {/* Theme Toggle */}
              <button 
                type="button"
                onClick={() => setDark(!dark)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 hover:text-brand-gold transition-all duration-200 active:scale-95 border border-white/5"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Inner Form Wrapper (Centers form on screen) */}
          <div className="max-w-md mx-auto w-full flex-grow flex flex-col justify-center py-6">
            {isForgotPassword ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-serif text-brand-cream font-bold tracking-tight">
                    Reset Password
                  </h2>
                  <p className="text-brand-latte/70 text-xs mt-1.5">
                    Enter your email address to receive a secure password reset link
                  </p>
                </div>

                {resetEmailSent ? (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 rounded-xl text-xs leading-relaxed text-center space-y-3">
                    <p className="font-medium text-emerald-400">Reset instructions sent!</p>
                    <p className="text-[10px] text-zinc-400">Please check your inbox at {email} for the verification link.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setResetEmailSent(false);
                        setError("");
                      }}
                      className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-espresso text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all"
                    >
                      Back to Log In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3.5 bg-red-950/40 border border-red-800/40 text-red-300 rounded-xl text-xs leading-relaxed">
                        <span className="font-semibold">Error:</span> {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-brand-cream/80 text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-brand-espresso/60 border border-neutral-800 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 rounded-xl py-2.5 pl-10 pr-4 text-brand-cream placeholder-neutral-550 outline-none transition-all duration-200 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-brand-darkgold to-brand-gold text-brand-espresso font-semibold uppercase tracking-wider rounded-xl py-3 hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none mt-2 shadow-lg text-xs"
                    >
                      {loading ? "Processing..." : "Send Reset Link"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(false);
                        setError("");
                      }}
                      className="w-full text-center text-xs text-brand-gold hover:text-brand-cream transition-colors duration-200 uppercase tracking-wider font-semibold py-2"
                    >
                      ← Back to Log In
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-serif text-brand-cream font-bold tracking-tight">
                    {isLogin ? "Welcome Back" : "Join the Club"}
                  </h2>
                  <p className="text-brand-latte/70 text-xs mt-1.5">
                    {isLogin 
                      ? "Enter credentials to access your dashboard" 
                      : "Create an account for club rewards"
                  }
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 bg-red-950/40 border border-red-800/40 text-red-300 rounded-xl text-xs leading-relaxed">
                    <span className="font-semibold">Error:</span> {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-brand-cream/80 text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
                        <input
                          type="text"
                          required
                          placeholder="E.g., Julian Vance"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full bg-brand-espresso/60 border border-neutral-800 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 rounded-xl py-2.5 pl-10 pr-4 text-brand-cream placeholder-neutral-550 outline-none transition-all duration-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-brand-cream/80 text-[10px] font-semibold uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-espresso/60 border border-neutral-800 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 rounded-xl py-2.5 pl-10 pr-4 text-brand-cream placeholder-neutral-550 outline-none transition-all duration-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-brand-cream/80 text-[10px] font-semibold uppercase tracking-wider">
                          {isLogin ? "Password" : "Create Password"}
                        </label>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder={isLogin ? "••••••••" : "Create a password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-brand-espresso/60 border border-neutral-800 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 rounded-xl py-2.5 pl-10 pr-10 text-brand-cream placeholder-neutral-550 outline-none transition-all duration-200 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-cream"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {isLogin && (
                        <div className="flex justify-end mt-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setIsForgotPassword(true);
                              setError("");
                            }}
                            className="text-[10px] text-brand-gold hover:text-brand-cream transition-colors duration-200 font-semibold"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}
                    </div>

                    {!isLogin && (
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-brand-cream/80 text-[10px] font-semibold uppercase tracking-wider">
                            Confirm Password
                          </label>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-brand-espresso/60 border border-neutral-800 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 rounded-xl py-2.5 pl-10 pr-10 text-brand-cream placeholder-neutral-550 outline-none transition-all duration-200 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-cream"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-brand-darkgold to-brand-gold text-brand-espresso font-semibold uppercase tracking-wider rounded-xl py-3 hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none mt-2 shadow-lg text-xs"
                  >
                    {loading ? "Processing..." : isLogin ? "Access Dashboard" : "Register Membership"}
                  </button>
                </form>

                {/* Toggle Switch */}
                <div className="mt-4 pt-4 border-t border-neutral-850 text-center space-y-3">
                  <p className="text-brand-latte/70 text-xs">
                    {isLogin ? "New to Obscura Coffee?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                        setPassword("");
                        setConfirmPassword("");
                        setShowPassword(false);
                        setShowConfirmPassword(false);
                      }}
                      className="ml-2 text-brand-gold hover:text-brand-cream underline font-semibold transition-colors duration-200"
                    >
                      {isLogin ? "Register Here" : "Log In"}
                    </button>
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-neutral-450 hover:text-brand-gold transition-colors duration-200 pt-2 block mx-auto font-medium"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

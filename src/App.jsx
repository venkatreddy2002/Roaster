import { useState } from "react";
import { AppContextProvider, useApp } from "./context/AppContext";

import Navbar        from "./components/Navbar";
import Footer        from "./components/Footer";
import DashboardHeader from "./components/DashboardHeader";
import CartDrawer from "./components/CartDrawer";
import AuthModal  from "./components/AuthModal";

import Home          from "./pages/Home";
import Home2         from "./pages/Home2";
import Shop          from "./pages/Shop";
import Dashboard     from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Orders        from "./pages/Orders";
import Favorites     from "./pages/Favorites";
import CoffeeClub    from "./pages/CoffeeClub";
import ProductDetails from "./pages/ProductDetails";
import AboutBeans    from "./pages/AboutBeans";
import Contact       from "./pages/Contact";
import NotFound      from "./pages/NotFound";
import ComingSoon    from "./pages/ComingSoon";

// Inner shell — consumes AppContext for routing state
function App() {
  const { page, navigateTo } = useApp();
  const [authOpen, setAuthOpen] = useState(false);

  const openAuth = () => {
    navigateTo("login");
  };
  
  const closeAuth = () => {
    setAuthOpen(false);
    if (page === "login") {
      navigateTo("home");
    }
  };

  const pages = {
    "home":            <Home />,
    "home1":           <Home />,
    "home2":           <Home2 />,
    "shop":            <Shop />,
    "dashboard":       <Dashboard     onOpenAuth={openAuth} />,
    "admin-dashboard": <AdminDashboard />,
    "orders":          <Orders        onOpenAuth={openAuth} />,
    "favorites":       <Favorites     onOpenAuth={openAuth} />,
    "coffee-club":     <CoffeeClub    onOpenAuth={openAuth} />,
    "product-details": <ProductDetails />,
    "about-beans":     <AboutBeans />,
    "contact":         <Contact />,
    "comingsoon":      <ComingSoon />,
    "404":             <NotFound />,
    "login":           <Home />,
  };

  const isDashboard = ["dashboard", "admin-dashboard", "orders", "favorites"].includes(page);
  const isComingSoon = page === "comingsoon";
  const hasHero = ["home", "home1", "home2", "shop", "coffee-club", "about-beans", "login"].includes(page);
  const needsNavPadding = !isDashboard && !hasHero && !isComingSoon;

  return (
    <div className="min-h-screen bg-brand-espresso text-brand-cream flex flex-col font-sans antialiased selection:bg-brand-gold/30">
      {!isDashboard && !isComingSoon && <Navbar onOpenAuth={openAuth} />}
      {isDashboard  && <DashboardHeader />}
      <main className={`flex-grow ${needsNavPadding ? "pt-20" : ""}`}>
        {pages[page] ?? <NotFound />}
      </main>
      {!isDashboard && !isComingSoon && <Footer />}

      <CartDrawer onOpenAuth={openAuth} />
      <AuthModal isOpen={authOpen || page === "login"} onClose={closeAuth} />
    </div>
  );
}

// Root export — provides global state to the whole tree
export default function Root() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

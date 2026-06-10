import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, dbService } from "../services/firebase";

const AppContext = createContext();

// -------------------------------------------------------------
// PREMIUM PRODUCT CATALOG DATA (Whole Beans & Brewing Equipment)
// -------------------------------------------------------------
export const products = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe G1",
    category: "coffee",
    type: "Single Origin",
    roast: "Light",
    origin: "Ethiopia (Yirgacheffe)",
    process: "Washed",
    altitude: "1,900m - 2,200m",
    price: 19.50,
    rating: 4.9,
    reviewsCount: 124,
    notes: ["Jasmine", "Peach", "Bergamot", "Lemon Tea"],
    description: "A grade-1 lot representing the finest floral and citrus expressions of Yirgacheffe. Complex acidity balanced by clean sweetness.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    bgImage: "https://images.unsplash.com/photo-1508215885820-4585e56135c8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "colombia-supremo",
    name: "Colombia Huila Supremo",
    category: "coffee",
    type: "Single Origin",
    roast: "Medium",
    origin: "Colombia (Huila)",
    process: "Washed",
    altitude: "1,600m - 1,800m",
    price: 18.00,
    rating: 4.8,
    reviewsCount: 98,
    notes: ["Milk Chocolate", "Red Apple", "Caramel", "Toasted Pecan"],
    description: "Rich, nutty, and brilliantly sweet. A classic cup featuring deep caramel undertones and a bright apple-like acidity.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    bgImage: "https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "sumatra-mandheling",
    name: "Sumatra Mandheling Organic",
    category: "coffee",
    type: "Single Origin",
    roast: "Dark",
    origin: "Sumatra (Aceh)",
    process: "Giling Basah (Wet Hulled)",
    altitude: "1,100m - 1,500m",
    price: 20.00,
    rating: 4.7,
    reviewsCount: 82,
    notes: ["Dark Chocolate", "Cedar", "Tobacco Leaf", "Licorice"],
    description: "Intense, full-bodied, and deeply earthy. This wet-hulled cup features notes of dark chocolate and forest herbs with low acidity.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
    bgImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "obscura-blend",
    name: "Obscura Signature Blend",
    category: "coffee",
    type: "House Blend",
    roast: "Medium-Dark",
    origin: "East Africa & South America",
    process: "Mixed",
    altitude: "Various",
    price: 21.00,
    rating: 5.0,
    reviewsCount: 245,
    notes: ["Cherry Cordial", "Brown Sugar", "Cocoa Nibs", "Spiced Plum"],
    description: "Our signature roasting masterpiece. Blended to offer a rich crema, heavy body, and dark cherry notes. Perfect for modern espresso.",
    image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80",
    bgImage: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "geisha-reserve",
    name: "Panama Geisha Finca Esmeralda",
    category: "coffee",
    type: "Limited Reserve",
    roast: "Light",
    origin: "Panama (Boquete)",
    process: "Natural",
    altitude: "1,750m - 1,950m",
    price: 32.50,
    rating: 5.0,
    reviewsCount: 36,
    notes: ["Bergamot", "Jasmine Bloom", "Mandarin", "Honey"],
    description: "An exceptional, world-renowned micro-lot. Unparalleled elegance characterized by intense floral aromas and a sweet, tea-like body.",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
    bgImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
  },
  // EQUIPMENT
  {
    id: "fellow-ode-grinder",
    name: "Fellow Ode Brew Grinder Gen 2",
    category: "equipment",
    brand: "Fellow",
    price: 345.00,
    rating: 4.9,
    reviewsCount: 112,
    description: "A powerful, precise, and beautiful home coffee grinder. Features professional-grade 64mm flat burrs, anti-static technology, and 31 grind settings.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "stagg-ekg-kettle",
    name: "Fellow Stagg EKG Electric Kettle",
    category: "equipment",
    brand: "Fellow",
    price: 165.00,
    rating: 4.8,
    reviewsCount: 164,
    description: "The electric pour-over kettle for coffee lovers. Temperature control to the degree, sleek minimalist base, and a counterbalanced handle for gooseneck precision.",
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hario-v60-decanter",
    name: "Hario V60 Drip Decanter",
    category: "equipment",
    brand: "Hario",
    price: 35.00,
    rating: 4.7,
    reviewsCount: 74,
    description: "Heatproof borosilicate glass decanter with a removable silicone collar. Combines the classic V60 paper filtration system with a server.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "chemex-6cup",
    name: "Chemex Classic Series 6-Cup",
    category: "equipment",
    brand: "Chemex",
    price: 49.00,
    rating: 4.9,
    reviewsCount: 201,
    description: "Made of non-porous borosilicate glass which will not absorb odors or chemical residues. Iconic hourglass shape with wood collar and leather tie.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"
  }
];

export const AppContextProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Theme & RTL State
  const [dark, setDark] = useState(() => {
    const localTheme = localStorage.getItem("theme");
    return localTheme ? localTheme === "dark" : true; // default to dark
  });
  const [rtl, setRtl] = useState(() => {
    const localRtl = localStorage.getItem("rtl");
    return localRtl ? localRtl === "true" : false; // default to LTR
  });

  // Dashboard Mobile Drawer Open State
  const [dashboardDrawerOpen, setDashboardDrawerOpen] = useState(false);

  // Apply dark theme class
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Apply RTL direction
  useEffect(() => {
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
    localStorage.setItem("rtl", rtl ? "true" : "false");
  }, [rtl]);

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("coffee_cart");
    return localCart ? JSON.parse(localCart) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Database States (sync'd to active user)
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscription, setSubscription] = useState(null);

  // Navigation State
  const [page, setPage] = useState("home");
  const [activeProductId, setActiveProductId] = useState(null);

  // ----------------------------------------
  // ROUTING & BROWSER HISTORY SYNC
  // ----------------------------------------
  useEffect(() => {
    // Read initial hash
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").replace(/^\//, "");
      if (!hash) {
        setPage("home");
        setActiveProductId(null);
        return;
      }

      if (hash.startsWith("product/")) {
        const prodId = hash.replace("product/", "");
        setPage("product-details");
        setActiveProductId(prodId);
      } else {
        setPage(hash);
        setActiveProductId(null);
      }
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initialize current page based on page hash on reload
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (pageName, productId = null) => {
    if (pageName === "product-details" && productId) {
      window.location.hash = `product/${productId}`;
    } else {
      window.location.hash = pageName;
    }
  };

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("coffee_cart", JSON.stringify(cart));
  }, [cart]);

  // Auth State Listener
  useEffect(() => {
    setAuthLoading(true);
    const unsubscribe = authService.onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Load user data
        try {
          const [favList, orderList, subData] = await Promise.all([
            dbService.getFavorites(firebaseUser.uid),
            dbService.getOrders(firebaseUser.uid),
            dbService.getSubscription(firebaseUser.uid),
          ]);
          setFavorites(favList);
          setOrders(orderList);
          setSubscription(subData);
        } catch (error) {
          console.error("Failed to load user firestore data", error);
        }
      } else {
        setFavorites([]);
        setOrders([]);
        setSubscription(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ----------------------------------------
  // AUTH ACTIONS
  // ----------------------------------------
  const login = async (email, password) => {
    const loggedUser = await authService.login(email, password);
    return loggedUser;
  };

  const register = async (email, password, displayName) => {
    const registeredUser = await authService.register(email, password, displayName);
    return registeredUser;
  };

  const logout = async () => {
    await authService.logout();
    navigateTo("home");
  };

  // ----------------------------------------
  // CART ACTIONS
  // ----------------------------------------
  const addToCart = (product, quantity = 1, customGrind = null) => {
    setCart((prevCart) => {
      const cartItemId = `${product.id}-${customGrind || "default"}`;
      const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          cartItemId,
          product,
          quantity,
          grind: customGrind,
        },
      ];
    });
    setCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // ----------------------------------------
  // FAVORITES ACTIONS
  // ----------------------------------------
  const toggleFavorite = async (productId) => {
    if (!user) {
      alert("Please log in or sign up to save favorites.");
      return;
    }

    const isFav = favorites.includes(productId);
    let updatedFavorites;

    if (isFav) {
      updatedFavorites = favorites.filter((id) => id !== productId);
    } else {
      updatedFavorites = [...favorites, productId];
    }

    setFavorites(updatedFavorites);
    await dbService.saveFavorites(user.uid, updatedFavorites);
  };

  // ----------------------------------------
  // ORDER ACTIONS
  // ----------------------------------------
  const createOrder = async (address, paymentMethod = "Credit Card") => {
    if (!user) {
      alert("Please log in to check out.");
      return false;
    }

    if (cart.length === 0) return false;

    const orderData = {
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        grind: item.grind,
        image: item.product.image
      })),
      subtotal: cartSubtotal,
      shipping: 5.00,
      total: cartSubtotal + 5.00,
      address,
      paymentMethod,
    };

    try {
      const savedOrder = await dbService.addOrder(user.uid, orderData);
      setOrders(prevOrders => [savedOrder, ...prevOrders]);
      clearCart();
      return savedOrder;
    } catch (error) {
      console.error("Failed to create order", error);
      alert("Could not complete checkout. Please try again.");
      return false;
    }
  };

  // ----------------------------------------
  // SUBSCRIPTION ACTIONS
  // ----------------------------------------
  const createOrUpdateSubscription = async (subData) => {
    if (!user) {
      alert("Please log in or register to join the Coffee Club.");
      return false;
    }

    const updatedSub = {
      ...subData,
      status: "Active",
      startDate: Date.now(),
      nextDeliveryDate: Date.now() + 14 * 24 * 60 * 60 * 1000, // + 14 days
    };

    try {
      await dbService.saveSubscription(user.uid, updatedSub);
      setSubscription(updatedSub);
      return true;
    } catch (error) {
      console.error("Failed to save subscription", error);
      return false;
    }
  };

  const updateSubscriptionStatus = async (status) => {
    if (!user || !subscription) return;

    const updatedSub = { ...subscription, status };
    try {
      await dbService.saveSubscription(user.uid, updatedSub);
      setSubscription(updatedSub);
      return true;
    } catch (error) {
      console.error("Failed to update subscription", error);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        user,
        authLoading,
        cart,
        cartOpen,
        setCartOpen,
        favorites,
        orders,
        subscription,
        page,
        activeProductId,
        navigateTo,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        toggleFavorite,
        createOrder,
        createOrUpdateSubscription,
        updateSubscriptionStatus,
        dark,
        setDark,
        rtl,
        setRtl,
        dashboardDrawerOpen,
        setDashboardDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

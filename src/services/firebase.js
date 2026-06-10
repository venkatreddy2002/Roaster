import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  addDoc 
} from "firebase/firestore";

// Firebase Config from Env variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase is configured
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_API_KEY" &&
  firebaseConfig.projectId;

let firebaseApp = null;
let fbAuth = null;
let fbDb = null;

if (isFirebaseConfigured) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    fbAuth = getAuth(firebaseApp);
    fbDb = getFirestore(firebaseApp);
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase initialization failed, falling back to Mock (LocalStorage) Mode.", error);
  }
} else {
  console.log("Firebase keys not found in environment. Running in Demo (LocalStorage) Mode.");
}

// ==========================================
// MOCK DATABASE & AUTH IMPLEMENTATION (LOCAL STORAGE)
// ==========================================

const getMockUsers = () => JSON.parse(localStorage.getItem("coffee_users") || "{}");
const saveMockUsers = (users) => localStorage.setItem("coffee_users", JSON.stringify(users));

let activeMockUserListener = null;

// ==========================================
// UNIFIED AUTH SERVICE API
// ==========================================
export const authService = {
  // Listen for auth state changes
  onAuthChange: (callback) => {
    if (fbAuth) {
      return onAuthStateChanged(fbAuth, (user) => {
        if (user) {
          callback({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split("@")[0],
          });
        } else {
          callback(null);
        }
      });
    } else {
      activeMockUserListener = callback;
      // Trigger initial call with current mock user
      const currentUser = JSON.parse(localStorage.getItem("coffee_current_user") || "null");
      callback(currentUser);
      // Return unsubscribe function
      return () => { activeMockUserListener = null; };
    }
  },

  // Log in
  login: async (email, password) => {
    if (fbAuth) {
      const credential = await signInWithEmailAndPassword(fbAuth, email, password);
      return {
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: credential.user.displayName || email.split("@")[0],
      };
    } else {
      // Mock Login
      const users = getMockUsers();
      const user = Object.values(users).find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error("Invalid email or password.");
      }
      const userData = { uid: user.uid, email: user.email, displayName: user.displayName };
      localStorage.setItem("coffee_current_user", JSON.stringify(userData));
      if (activeMockUserListener) activeMockUserListener(userData);
      return userData;
    }
  },

  // Register
  register: async (email, password, displayName) => {
    if (fbAuth) {
      const credential = await createUserWithEmailAndPassword(fbAuth, email, password);
      // Set display name in profile or firestore
      const userData = {
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: displayName || email.split("@")[0],
      };
      await dbService.saveUserProfile(credential.user.uid, userData);
      return userData;
    } else {
      // Mock Register
      const users = getMockUsers();
      if (Object.values(users).some(u => u.email === email)) {
        throw new Error("Email address already in use.");
      }
      const uid = "mock_uid_" + Math.random().toString(36).substr(2, 9);
      const newUser = { uid, email, password, displayName };
      users[uid] = newUser;
      saveMockUsers(users);

      // Save initial profile & subscriptions
      localStorage.setItem(`coffee_profile_${uid}`, JSON.stringify({ uid, email, displayName }));
      localStorage.setItem(`coffee_favorites_${uid}`, JSON.stringify([]));
      localStorage.setItem(`coffee_orders_${uid}`, JSON.stringify([]));

      const userData = { uid, email, displayName };
      localStorage.setItem("coffee_current_user", JSON.stringify(userData));
      if (activeMockUserListener) activeMockUserListener(userData);
      return userData;
    }
  },

  // Log out
  logout: async () => {
    if (fbAuth) {
      await fbSignOut(fbAuth);
    } else {
      localStorage.removeItem("coffee_current_user");
      if (activeMockUserListener) activeMockUserListener(null);
    }
  }
};

// ==========================================
// UNIFIED DB SERVICE API
// ==========================================
export const dbService = {
  // User Profile
  getUserProfile: async (uid) => {
    if (fbDb) {
      const docRef = doc(fbDb, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } else {
      return JSON.parse(localStorage.getItem(`coffee_profile_${uid}`) || "null");
    }
  },

  saveUserProfile: async (uid, data) => {
    if (fbDb) {
      await setDoc(doc(fbDb, "users", uid), data, { merge: true });
    } else {
      const current = JSON.parse(localStorage.getItem(`coffee_profile_${uid}`) || "{}");
      localStorage.setItem(`coffee_profile_${uid}`, JSON.stringify({ ...current, ...data }));
    }
  },

  // Coffee Club Subscription
  getSubscription: async (uid) => {
    if (fbDb) {
      const docRef = doc(fbDb, "subscriptions", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } else {
      return JSON.parse(localStorage.getItem(`coffee_sub_${uid}`) || "null");
    }
  },

  saveSubscription: async (uid, subscriptionData) => {
    if (fbDb) {
      await setDoc(doc(fbDb, "subscriptions", uid), subscriptionData, { merge: true });
    } else {
      localStorage.setItem(`coffee_sub_${uid}`, JSON.stringify(subscriptionData));
    }
  },

  // Favorites
  getFavorites: async (uid) => {
    if (fbDb) {
      const docRef = doc(fbDb, "favorites", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().items || [] : [];
    } else {
      return JSON.parse(localStorage.getItem(`coffee_favorites_${uid}`) || "[]");
    }
  },

  saveFavorites: async (uid, favoritesList) => {
    if (fbDb) {
      await setDoc(doc(fbDb, "favorites", uid), { items: favoritesList });
    } else {
      localStorage.setItem(`coffee_favorites_${uid}`, JSON.stringify(favoritesList));
    }
  },

  // Orders
  getOrders: async (uid) => {
    if (fbDb) {
      const q = query(collection(fbDb, "orders"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      return JSON.parse(localStorage.getItem(`coffee_orders_${uid}`) || "[]");
    }
  },

  addOrder: async (uid, orderData) => {
    const newOrder = {
      ...orderData,
      id: "ord_" + Math.random().toString(36).substr(2, 9),
      userId: uid,
      createdAt: Date.now(),
      status: "Ordered" // Stepper: Ordered -> Roasting -> Shipped -> Delivered
    };

    if (fbDb) {
      const docRef = await addDoc(collection(fbDb, "orders"), newOrder);
      return { id: docRef.id, ...newOrder };
    } else {
      const orders = JSON.parse(localStorage.getItem(`coffee_orders_${uid}`) || "[]");
      orders.unshift(newOrder);
      localStorage.setItem(`coffee_orders_${uid}`, JSON.stringify(orders));
      return newOrder;
    }
  }
};

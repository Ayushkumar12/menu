// src/Authentication/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from 'firebase/database';


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnnUtNzcnw0UYR8ikFJptHkuzZFkvp4k4",
  authDomain: "online-food-order-80833.firebaseapp.com",
  databaseURL: "https://online-food-order-80833-default-rtdb.firebaseio.com",
  projectId: "online-food-order-80833",
  storageBucket: "online-food-order-80833.appspot.com",
  messagingSenderId: "980243962311",
  appId: "1:980243962311:web:6c80cf64470477b1bc21e2",
  measurementId: "G-FF4PLG3S2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Initialize Firestore

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser , setCurrentUser ] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser (user);
      if (user) {
        try {
          const userDoc = ref(db, `Users/${user.uid}`);
          const userSnapshot = await get(userDoc);
          if (userSnapshot.exists()) {
            const data = userSnapshot.val();
            setUserData(data);
            
            console.log("User  Data:", data); // Log the user data
          } else {
            setError("No such user!");
          }
        } catch (err) {
          setError(err.message);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser , userData, loading, error }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

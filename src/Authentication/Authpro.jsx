// src/Authentication/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";


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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const Authpro = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser (user);
      console.log("Current User:", user);
      if (user) {
        try {
            const userDoc = doc(db, "Users", user.uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              setUser (userData);
              setUsername(userData.username); // Extract username and store it
            } else {
              setError("No such user!");
            }
          } catch (err) {
            setError("Error fetching user: " + err.message);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
      return unsubscribe;
    }, []);
  

  return (
    <Authpro.Provider value={{ currentUser, username }}>{children}</Authpro.Provider>
  );
};

export const useAuth = () => {
  return useContext(Authpro);
};

import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth'; // Import the Firebase Auth module
import { initializeApp } from 'firebase/app'; // Import the Firebase App module
import "../asserts/style/nav.css"; // Corrected the path to assets

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
const auth = getAuth(app); // Get the Auth instance

export default function Navbar() {
  const logout = async () => {
    try {
      await auth.signOut(); // Use signOut method
      alert("Signed out successfully");
    } catch (error) {
      alert("Error signing out: " + error.message); // Corrected error handling
    }
  };

  return (
    <nav>
      <h2>Delightio</h2>
      <ul className='side'>
        <Link to='/admin' className='log'>Admin</Link> 
        <Link to='/order' className='log'>Order</Link>
        <a onClick={logout} className='log' style={{ cursor: 'pointer' }}>Logout</a>
      </ul>
    </nav>
  );
}

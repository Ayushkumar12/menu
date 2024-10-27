import React, { useState, useEffect } from "react";
import "../style/home.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";

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
const database = getDatabase(app);

export default function Order() {
    const [orders, setorders] = useState([]);
    const [items, setitems] = useState([]);

    useEffect(() => {
      const orderRef = ref(database, "orders");
      onValue(orderRef, (data) => {
        if (data.exists()) {
          const orderItemsArray = Object.values(data.val()); // Convert object to array
          setorders(orderItemsArray);
        } else {
          console.log("No menu items found");
        }
      });
    }, []);
  return (
    <section className="home">
  <h1>Menu</h1>
  <ul className="menu">
    {orders.map((order, index) => (
      <li key={index} className="food">
        <h3>{order.Table}</h3>
        <h3>{order.customerName}</h3>
        <ul>
          {order.menuItems.map((order, index) => (
            <li key={order.dish_Id}>
              <p>
                {order.dish_Name}   {order.quantity}
              </p>
            </li>
          ))}
        </ul>
        <p>Total: ${order.totalCost}</p>
        <button>
          Done
        </button>
      </li>
    ))}
  </ul>
</section>
  );
}

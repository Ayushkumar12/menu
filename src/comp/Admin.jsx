import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";
import '../style/admin.css'
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

export default function Admin() {
    const [dish_Name, setdish_Name] = useState("");
    const [dish_Id, setdish_Id] = useState("");
    const [dish_Price, setdish_Price] = useState("");
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
      const menuRef = ref(database, "menu");
      onValue(menuRef, (data) => {
        if (data.exists()) {
          const menuItemsArray = Object.values(data.val()); // Convert object to array
          setMenuItems(menuItemsArray);
        } else {
          console.log("No menu items found");
        }
      });
    }, []);
  const handleSubmitMenu = async () => {
    try {
      const menuRef = ref(database, "menu");
      push(menuRef, {
        dish_Name,
        dish_Price,
        dish_Id
      })
        .then(() => {
          console.log("Menu submitted successfully");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
        <div className="greet">
            <h2>Hello Admin, Welcomeback</h2>
        </div>
      <form className="add">
        <label><h4>Enter Dish_Id</h4><input type="text" placeholder="Dish_Id" value={dish_Id} onChange={(e) => setdish_Id(e.target.value)} /></label>
        <label><h4>Enter Dish_Name</h4><input type="text" placeholder="Dish_Name" value={dish_Name} onChange={(e) => setdish_Name(e.target.value)} /></label>
        <label><h4>Enter Dish_Price</h4><input type="number" placeholder="Dish_Price" value={dish_Price} onChange={(e) => setdish_Price(e.target.value)} /></label>
        <button className="dish" onClick={handleSubmitMenu}>Add dish</button>
      </form>
      <section className="home">
        <h1>Menu</h1>
        <ul className="menu">
        {menuItems.map((menuItem) => (
            <li key={menuItem.dish_Id} className="food">
              <h3>{menuItem.dish_Name}</h3>
              <p>Price: ${menuItem.dish_Price}</p>
              <button >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

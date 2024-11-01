import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import '../style/admin.css';

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
const storage = getStorage(app);

export default function Admin() {
  const [dish_Name, setDish_Name] = useState("");
  const [dish_Id, setDish_Id] = useState("");
  const [dish_Price, setDish_Price] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const menuRef = ref(database, "menu");
    onValue(menuRef, (data) => {
      if (data.exists()) {
        const menuItemsArray = Object.values(data.val());
        setMenuItems(menuItemsArray);
      } else {
        console.log("No menu items found");
      }
    });
  }, []);

  const generateUniqueId = () => {
    return `dish_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };
  
  const handleSubmitMenu = async (event) => {
      event.preventDefault();
      if (!dish_Name || !dish_Price || !image) {
        alert("Please fill out all fields and upload an image.");
        return;
      }
  
      const dish_Id = generateUniqueId(); 
  
      try {
        const storageReference = storageRef(storage, `images/${image.name}`);
        await uploadBytes(storageReference, image);
        const imageUrl = await getDownloadURL(storageReference);
  
        const menuRef = ref(database, "menu");
        await push(menuRef, {
          dish_Name,
          dish_Price,
          dish_Id, 
          imageUrl
        });
  
        alert("Menu submitted successfully");
        setDish_Name("");
        setDish_Price("");
        setImage(null);
      } catch (error) {
        console.error(error);
        alert("Error submitting menu. Please try again.");
      }
  };

  const handleRemoveMenuItem = async (dish_Id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this dish?");
    if (!confirmDelete) {
      return; 
    }
    else{
      const itemRef = ref(database, `menu/${dish_Id}`);
      await remove(itemRef);
      alert("Dish removed successfully!");
    }
  };

  return (
    <section>
      <div className="greet">
        <h2>Hello Admin, Welcome back</h2>
      </div>
      <form className="add" onSubmit={handleSubmitMenu}>
        
        <label>
          <h4>Enter Dish_Name</h4>
          <input type="text" placeholder="Dish_Name" value={dish_Name} onChange={(e) => setDish_Name(e.target.value)} required />
        </label>
        <label>
          <h4>Enter Dish_Price</h4>
          <input type="number" placeholder="Dish_Price" value={dish_Price} onChange={(e) => setDish_Price (e.target.value)} required />
        </label>
        <label>
          <h4>Upload Image</h4>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </label>
        <button className="dish" type="submit">Add dish</button>
      </form>
      <section className="home">
        <h1>Menu</h1>
        <ul className="menu">
          {menuItems.map((menuItem) => (
            <li key={menuItem.dish_Id} className="food">
              <img className="menuimg" src={menuItem.imageUrl} alt={menuItem.dish_Name} />
              <h3>{menuItem.dish_Name}</h3>
              <p>Price: ${menuItem.dish_Price}</p>
              <button onClick={() => handleRemoveMenuItem(menuItem.dish_Id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
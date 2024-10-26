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

function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [Table, setTable] = useState("");

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

  useEffect(() => {
    calculateTotalCost();
  }, [cartItems]);

  const handleAddToCart = (menuItem) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.dish_Id === menuItem.dish_Id
    );
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.dish_Id === menuItem.dish_Id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...menuItem, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (menuItem) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== menuItem.id
    );
    setCartItems(updatedCartItems);
  };

  const calculateTotalCost = () => {
    const totalCost = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.dish_Price * cartItem.quantity,
      0
    );
    setTotalCost(totalCost.toFixed(2));
  };

  const handleSubmitOrder = async () => {
    try {
      const ordersRef = ref(database, "orders");
      push(ordersRef, {
        customerName,
        Table,
        restaurantId: "12345",
        menuItems: cartItems,
        totalCost,
      })
        .then(() => {
          console.log("Order submitted successfully");
          setCartItems([]);
          setTotalCost(0);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section className="first">
        <div className="herotext">
          <h1>Welcome to Our Restaurant</h1>
          <p>
            Discover the best food & drinks
          </p>
        </div>
        <input type="text" />
      </section>
      <section className="home">
        <div className="collection">
          <h2>Collections</h2>
          <ul className="menu">
            {menuItems.map((menuItem) => (
              <li key={menuItem.dish_Id} className="food">
                <h3>{menuItem.dish_Name}</h3>
                <p>Price: ${menuItem.dish_Price}</p>
                {/* <button onClick={() => handleAddToCart(menuItem)}>
                  Add to Cart
                </button> */}
              </li>
            ))}
          </ul>
        </div>
        {/* <aside>
          <form>
            <h3>
              Customer Name:
            </h3>
            <input
              type="text"
              value={customerName}
              placeholder="Customer Name"
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <h3>
              Table:
            </h3>
            <input
              type="text"
              value={Table}
              placeholder="T4675"
              onChange={(e) => setTable(e.target.value)}
            />
          </form>
          <h2>Cart</h2>
          <ul className="cart">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <div>
                  <h3>{cartItem.dish_Name}</h3>
                  <p>Price: ${cartItem.dish_Price}</p>
                  <p>Quantity: {cartItem.quantity}</p>
                </div>
                <button onClick={() => handleRemoveFromCart(cartItem)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="total">Total: ${totalCost}</p>

          <button className="sub" onClick={handleSubmitOrder}>Submit Order</button>
        </aside> */}
      </section>
      
    </main>
  );
}

export default Home;

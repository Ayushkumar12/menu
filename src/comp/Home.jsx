import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import "../style/home.css";

const firebaseConfig = {
  apiKey: 'AIzaSyBnnUtNzcnw0UYR8ikFJptHkuzZFkvp4k4',
  authDomain: 'online-food-order-80833.firebaseapp.com',
  databaseURL: 'https://online-food-order-80833-default-rtdb.firebaseio.com',
  projectId: 'online-food-order-80833',
  storageBucket: 'online-food-order-80833.appspot.com',
  messagingSenderId: '980243962311',
  appId: '1:980243962311:web:6c80cf64470477b1bc21e2',
  measurementId: "G-FF4PLG3S2T"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const menuRef = ref(database, 'menu');
    onValue(menuRef, (data) => {
      if (data.exists()) {
        setMenuItems(data.val());
      } else {
        console.log('No menu items found');
      }
    });
  }, []);

  useEffect(() => {
    calculateTotalCost();
  }, [cartItems]);

  const handleAddToCart = (menuItem) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === menuItem.id);
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === menuItem.id) {
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
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== menuItem.id);
    setCartItems(updatedCartItems);
  };

  const calculateTotalCost = () => {
    const totalCost = cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
    setTotalCost(totalCost.toFixed(2));
  };

  const handleSubmitOrder = async () => {
    try {
      const ordersRef = ref(database, 'orders');
      push(ordersRef, {
        customerName,
        customerEmail,
        restaurantId: '12345',
        menuItems: cartItems,
        totalCost
      }).then(() => {
        console.log('Order submitted successfully');
        setCartItems([]);
        setTotalCost(0);
      }).catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section className='home'>
        <h1>Menu</h1>
        <ul className='menu'>
          {menuItems.map((menuItem) => (
            <li key={menuItem.id} className='food'>
              <h3>{menuItem.name}</h3>
              <p>Price: ${menuItem.price}</p>
              <p>{menuItem.description}</p>
              <button onClick={() => handleAddToCart(menuItem)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </section>
      <aside>
        <h2>Cart</h2>
        <ul className='cart'>
          {cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <div>
                <h3>{cartItem.name}</h3>
                <p>Price: ${cartItem.price}</p>
                <p>Quantity: {cartItem.quantity}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${totalCost}</p>
        <label>
          Customer Name:
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </label>
        <label>
          Customer Email:
          <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
        </label>
        <button onClick={handleSubmitOrder}>Submit Order</button>
      </aside>
    </main>
  );
}

export default Home;
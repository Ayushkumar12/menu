import React, { useState, useEffect } from "react";
import Footer from '../comp/Footer';
import "../asserts/style/home.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

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
  const [show, setShow] = useState(false);
  
  
  const Handleclick = () => {
    setShow(!show);
  };

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
    if (!customerName || !Table) {
        alert("Please enter customer name and table number");
        return;
    }
    if (cartItems.length === 0) {
        alert("No items in the cart");
        return;
    } else {
        try {
            const ordersRef = ref(database, "orders");
            const newOrderRef = push(ordersRef);
            const orderid = newOrderRef.key;
            const OrdersRef = ref(database, `orders/${orderid}`); // Corrected template literal syntax
            
            await set(OrdersRef, { // Use set instead of push to store the order at the specific reference
                orderid,
                customerName,
                Table,
                restaurantId: "12345",
                menuItems: cartItems,
                totalCost,
            });
            
            alert("Order submitted successfully");
            setCartItems([]);
            setTotalCost(0);
        } catch (error) {
            console.error(error);
            alert("There was an error submitting your order. Please try again.");
        }
    }
};


  return (
    <section>
      <main>
        <section className="first">
          <div className="herotext">
            <h1>Delightio</h1>
            <p>Discover the best food & drinks</p>
          </div>
        </section>
        <section className="home">
          <div className="collection">
            <h2>Menu</h2>
            <ul className="menu">
              {Array.isArray(menuItems) && menuItems.length > 0 ? (
                menuItems.map((menuItem) => (
                  <li key={menuItem.dish_Id} className="food">
                    <img
                      className="menuimg"
                      src={menuItem.imageUrl}
                      alt={menuItem.dish_Name}
                    />
                    <h3>{menuItem.dish_Name}</h3>
                    <p>Price: ${menuItem.dish_Price}</p>
                    <button onClick={() => handleAddToCart(menuItem)}>
                      Add to Cart
                    </button>
                  </li>
                ))
              ) : (
                <p>No menu items available.</p>
              )}
            </ul>
          </div>
          <div className="cart-head"
            onClick={Handleclick}>
              <h1>Order Now</h1>
          </div>
            <aside className={show? 'show' : 'hide'}>
              <h2 onClick={Handleclick}>Cart</h2>
              <div className="cont">
                <form>
                  <h3>Customer Name:</h3>
                  <input
                    type="text"
                    value={customerName}
                    required
                    placeholder="Customer Name"
                    onChange={(e) => setCustomerName(e.target.value)}
                  />

                  <h3>Table:</h3>
                  <input
                    type="text"
                    value={Table}
                    placeholder="T4675"
                    required
                    onChange={(e) => setTable(e.target.value)}
                  />
                </form>
                <table className="cart">
                  <thead>
                    <tr>
                      <th>Dish</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((cartItem) => (
                      <tr key={cartItem.id + cartItem.dish_Name}>
                        <td>{cartItem.dish_Name}</td>
                        <td>${cartItem.dish_Price}</td>
                        <td>{cartItem.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2">Total:</td>
                      <td>${totalCost}</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="obut">
                  <button
                    className="sub"
                    onClick={() => handleRemoveFromCart(cartItems)}
                  >
                    Reset
                  </button>
                  <button className="sub" onClick={handleSubmitOrder}>
                    Place Order
                  </button>
                </div>
              </div>
            </aside>
        </section>
      </main>
      <Footer/>
    </section>
  );
}

export default Home;

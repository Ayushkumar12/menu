import React from 'react';

export default function Order() {
    const [orders, setorders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(database, "orders");
    onValue(ordersRef, (data) => {
      if (data.exists()) {
        setorders(data.val());
      } else {
        console.log("No orders found");
      }
    });
  }, []);
  return (
    <section className="home">
        <h1>Menu</h1>
        <ul className="menu">
          {orders.map((order) => (
            <li key={order.id} className="food">
              <h3>{order.name}</h3>
              <p>Price: ${order.price}</p>
              <p>{order.description}</p>
              <button >
                Done
              </button>
            </li>
          ))}
        </ul>
      </section>
  );
}

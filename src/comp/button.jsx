import React from 'react';

export default function button() {
  const [menu, setmenu] = useState([]);
    
  useEffect(() => {
    const menuRef = ref(database, "menu");
    onValue(menuRef, (data) => {
      if (data.exists()) {
        const menuItemsArray = Object.values(data.val()); // Convert object to array
        setmenu(menuItemsArray);
      } else {
        console.log("No menu items found");
      }
    });
  }, []);
  const handleRemoveMenuItem = async (dish_Id) => { 
    try {
      const menuRef = ref(database, `menus/${dish_Id}`);
      await remove(menuRef);
      console.log(`menu ${dish_Id} deleted successfully`);
      alert(`menu ${dish_Id} deleted successfully`);

    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("Error deleting menu:", error);

    }
  };
  return (
    <section className="home collection">
            <h2>Menu</h2>
            <ul className="menu">
              {menu.map((menu,index) => (
                <li key={index} className="food">
                  <img
                    className="menuimg"
                    src={menu.imageUrl}
                    alt={menu.dish_Name}
                  />
                  <h3>{menu.dish_Name}</h3>
                  <p>Price: ${menu.dish_Price}</p>
                  <button onClick={() => handleRemoveMenuItem(menu.dish_Id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
        </section>
  );
}

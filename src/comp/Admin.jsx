import React from 'react';

export default function admin() {
    
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    
    const handleSubmitMenur = async () => {
        try {
          const menuRef = ref(database, 'menu');
          push(menuRef, {
            dish_Name,
            dish_Price,
          }).then(() => {
            console.log('Menu submitted successfully');
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
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Price:
          <input type="number" name="email" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

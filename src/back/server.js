const express = require('express');
const app = express();
const { initializeApp } = require('firebase/app');
const { getDatabase, ref } = require('firebase/database');

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

const appFirebase = initializeApp(firebaseConfig);
const database = getDatabase(appFirebase);
const dbRef = ref(database);

app.use(express.json());

app.get('/menu', (req, res) => {
  get(dbRef.child('menu')).then((data) => {
    if (data.exists()) {
      res.send(data.val());
    } else {
      console.log('No menu items found');
      res.status(404).send({ message: 'No menu items found' });
    }
  }).catch((error) => {
    console.error('Error retrieving menu:', error);
    res.status(500).send({ message: 'Error retrieving menu' });
  });
});
app.post('/menu', (req, res) => {
    if (!req.body.dish_Name || !req.body.dish_Price || !req.body.dish_Id) {
      console.log('Invalid dish data');
      res.status(400).send({ message: 'Invalid dish data' });
    } else {
      push(dbRef.child('menu'), req.body).then(() => {
        console.log('dish submitted successfully');
        res.send({ message: 'dish submitted successfully' });
      }).catch((error) => {
        console.error('Error submitting dish:', error);
        res.status(500).send({ message: 'Error submitting dish' });
      });
    }
  });
app.post('/orders', (req, res) => {
  if (!req.body.customerName || !req.body.Table || !req.body.menuItems) {
    console.log('Invalid order data');
    res.status(400).send({ message: 'Invalid order data' });
  } else {
    push(dbRef.child('orders'), req.body).then(() => {
      console.log('Order submitted successfully');
      res.send({ message: 'Order submitted successfully' });
    }).catch((error) => {
      console.error('Error submitting order:', error);
      res.status(500).send({ message: 'Error submitting order' });
    });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
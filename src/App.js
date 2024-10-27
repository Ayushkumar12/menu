import React from 'react';
import Home from './comp/Home';
import Admin from './comp/Admin';
import Order from './comp/Order';
import Navbar from './comp/Navbar';
import Footer from './comp/Footer';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';

function App() {
  return (
    <section className='ba'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/order' element={<Order />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </section>
  );
}

export default App;

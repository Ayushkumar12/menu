import React from 'react';
import Home from './comp/Home';
import Admin from './comp/Admin';
import Navbar from './comp/Navbar';
import './App.css';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';

function App() {
  return (
    <section className='ba'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/admin' element={<Admin />}/>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;

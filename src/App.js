import React from 'react';
import Home from './comp/Home';
import Navbar from './comp/Navbar';
import './App.css';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';

function App() {
  return (
    <section className='ba'>
      <Navbar />
      <Home />
    </section>
  );
}

export default App;

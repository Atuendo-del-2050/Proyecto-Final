import React from 'react';

// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';

import NosotrosPage from './pages/NosotrosPage';
import HomePage from './pages/HomePage';
import PromocionesPage from './pages/PromocionesPage';
import ContactoPage from './pages/ContactoPage';


function App() {
  return (
      <><div className="App">
      <Header />

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="promociones" element={<promocionesPage />} />
          <Route path="contacto" element={<ContactoPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />

    </div> <Nav /><Footer /></>
   );
}
export default App;



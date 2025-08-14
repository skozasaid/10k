import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import EndSituationPage from './pages/EndSituationPage';
import LightSituationPage from './pages/LightSituationPage';
import SettingsPage from './pages/SettingsPage';
import BookingPage from './pages/BookingPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/end-situation" element={<EndSituationPage />} />
                <Route path="/light-situation" element={<LightSituationPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
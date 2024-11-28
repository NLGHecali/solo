import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { MenuManager } from './components/MenuManager';
import { CustomerMenu } from './components/CustomerMenu';
import { KitchenOrders } from './components/KitchenOrders';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';  // Componente da página principal

export function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu-manager" element={<MenuManager />} />
          <Route path="/menu" element={<CustomerMenu />} />
          <Route path="/kitchen" element={<KitchenOrders />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

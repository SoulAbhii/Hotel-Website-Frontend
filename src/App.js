import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Gal from './pages/gallery';
import Contact from './pages/contactus';
import Room from './pages/room';
import About from './pages/about';
import Activities from './pages/activity';
import Book from './pages/Book';
import LoginPage from './pages/Login';
import AdminDashboard from './pages/dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    alert('Login successful!');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/room" element={<Room />} />
        <Route path="/about" element={<About />} />
        <Route path="/activity" element={<Activities />} />
        <Route path="/book-now" element={<Book />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/admin" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;

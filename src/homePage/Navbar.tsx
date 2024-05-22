import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Library
      </Link>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarAfterLogin.css';

const NavbarAfterLogin = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Library
      </Link>
      <nav className="navbar">
        <Link to="/book/getAll">Books</Link>
        <Link to="/loan/getAll">Loans</Link>
      </nav>
    </header>
  );
};

export default NavbarAfterLogin;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useTranslation } from 'react-i18next';
const Navbar = () => {
  const { t, i18n } = useTranslation();
  return (
    <header className="header">
      <Link to="/" className="logo">
        {t('Library')}
      </Link>
      <nav className="navbar">
        <Link to="/">{t('Home')}</Link>
        <Link to="/about">{t('About')}</Link>
        <Link to="/login">{t('Login')}</Link>
      </nav>
    </header>
  );
};

export default Navbar;

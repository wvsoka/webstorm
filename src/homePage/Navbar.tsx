import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useTranslation } from 'react-i18next';
const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('pl')}>PL</button>
      </div>
    </header>
  );
};

export default Navbar;

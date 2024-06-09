import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Navbar />
      <div className="homepage-container">
        <section className="intro">
          <h1>{t('A1')}</h1>
          <p>{t('A2')}</p>
        </section>
        <section className="sign-in">
          <h2>
            {t('A3')}{' '}
            <Link to="/login" className="sign-in-link">
              {t('A4')}
            </Link>
          </h2>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import Navbar from '../homePage/Navbar';
import './About.css';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1>{t('B1')}</h1>
        <p>{t('B2')}</p>
        <p>{t('B3')}</p>
        <p>{t('B4')}</p>
      </div>
    </div>
  );
};

export default About;

import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="homepage-container">
        <section className="intro">
          <h1>Welcome to the Library</h1>
          <p>
            Discover a world of knowledge and adventure. Explore our extensive
            collection of books and resources.
          </p>
        </section>
        <section className="sign-in">
          <h2>
            Please{' '}
            <Link to="/login" className="sign-in-link">
              sign in
            </Link>
          </h2>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import Navbar from '../homePage/Navbar';
import './About.css';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1>About Our Library</h1>
        <p>
          Welcome to our library. Our mission is to provide a welcoming space
          for the community to explore, learn, and grow. We offer a wide range
          of books, digital resources, and events for all ages.
        </p>
        <p>
          Our dedicated staff is here to help you find what you need and make
          the most of your library experience. Whether you're looking for the
          latest bestseller, a quiet place to study, or a fun event to attend,
          we have something for everyone.
        </p>
        <p>
          Thank you for being a part of our library community. We look forward
          to serving you.
        </p>
      </div>
    </div>
  );
};

export default About;

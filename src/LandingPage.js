import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const backgroundStyle = {
    backgroundImage: 'url("plants/plants.jpg")',
  };

  return (
    <div className="landing-page" style={backgroundStyle}>
      <div className="overlay">
        <h1>Paradise Nursery</h1>
        <p>Welcome to Paradise Nursery — your one-stop shop for beautiful, air-purifying,
            and easy-to-care-for houseplants. Whether you're decorating your space, improving
            air quality, or finding the perfect gift, we’ve got you covered with a curated
            selection of plants for every lifestyle.</p>
        <Link to="/products" className="get-started-btn">Get Started</Link>
      </div>
    </div>
  );
};

export default LandingPage;

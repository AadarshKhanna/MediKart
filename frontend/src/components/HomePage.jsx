import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">Welcome to HealthCare Portal</h1>

      <div className="section" onClick={() => navigate('/user')}>
        <h2 className="section-title">Medicine</h2>
        <p className="section-description">
          Buy Medicine: Upload prescriptions and order medicines at your doorstep.
        </p>
      </div>

      <div className="section" onClick={() => navigate('skin_detection')}>
        <h2 className="section-title">Skin Detection</h2>
        <p className="section-description">
          Upload a skin photo to detect diseases and get personalized suggestions.
        </p>
      </div>
    </div>
  );
};

export default HomePage;

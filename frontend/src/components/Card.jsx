//Card.jsx
import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
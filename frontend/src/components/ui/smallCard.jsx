import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-md dark:bg-gray-800 ${className}`}>
      <div className="dark:text-white">{children}</div>
    </div>
  );
};

export default Card;
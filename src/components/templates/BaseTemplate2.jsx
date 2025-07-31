import React from 'react';

const BaseTemplate2 = ({ children, width = "794px", height = "1123px", className = "", isPrint = false }) => {
  const printStyle = isPrint
    ? { width, height }
    : { width: "380px", height: "auto", minHeight: "570px" };
  
  return (
    <div
      className={`bg-white rounded-lg shadow-lg mx-auto ${className}`}
      style={printStyle}
    >
      {children}
    </div>
  );
};

export default BaseTemplate2;

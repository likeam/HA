import React from "react";

const UrduText = ({ children, className }) => {
  return (
    <span className={`font-urdu ${className}`} style={{ direction: "rtl" }}>
      {children}
    </span>
  );
};

export default UrduText;

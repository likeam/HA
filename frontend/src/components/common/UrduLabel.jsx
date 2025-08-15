import React from "react";
import { useUrduText } from "../../hooks/useUrduText";

const UrduLabel = ({ textKey, defaultText }) => {
  const text = useUrduText(textKey, defaultText);

  return (
    <span
      className="font-urdu"
      style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
    >
      {text}
    </span>
  );
};

export default UrduLabel;

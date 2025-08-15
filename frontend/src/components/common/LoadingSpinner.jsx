import React from "react";
import { translateLabel } from "../utils/urduUtils";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        <p className="mt-4 font-urdu">{translateLabel("LOADING")}...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

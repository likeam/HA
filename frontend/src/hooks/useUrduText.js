import { useSelector } from "react-redux";
import urduLabels from "../locales/ur.json";

export const useUrduText = (key, defaultText) => {
  const isUrdu = true; // Always Urdu in this app

  if (isUrdu && urduLabels[key]) {
    return urduLabels[key];
  }

  return defaultText || key;
};

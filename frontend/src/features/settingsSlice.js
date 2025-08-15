import { createSlice } from "@reduxjs/toolkit";

// Load settings from localStorage
const loadSettings = () => {
  try {
    const savedSettings = localStorage.getItem("appSettings");
    return savedSettings ? JSON.parse(savedSettings) : {};
  } catch (error) {
    console.error("Failed to load settings:", error);
    return {};
  }
};

const initialState = loadSettings();

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    saveSettings: (state, action) => {
      const newSettings = { ...state, ...action.payload };

      // Save to localStorage
      localStorage.setItem("appSettings", JSON.stringify(newSettings));

      return newSettings;
    },
  },
});

export const { saveSettings } = settingsSlice.actions;
export default settingsSlice.reducer;

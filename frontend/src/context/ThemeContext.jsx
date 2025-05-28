import React, { createContext, useContext, useEffect, useState } from "react";
import { predefinedThemes } from "../styles/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themes] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("themes"));
    return saved?.length ? saved : predefinedThemes;
  });

  const [selectedTheme, setSelectedTheme] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedTheme")) || themes[0];
  });

  useEffect(() => {
    applyTheme(selectedTheme);
  }, [selectedTheme]);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    for (let key in theme.colors) {
      root.style.setProperty(`--color-${key}`, theme.colors[key]);
  
      // Add RGB version if hex
      if (theme.colors[key].startsWith("#")) {
        const hex = theme.colors[key].replace("#", "");
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        root.style.setProperty(`--color-${key}-rgb`, `${r}, ${g}, ${b}`);
      }
    }
    localStorage.setItem("selectedTheme", JSON.stringify(theme));
  };
  

  const value = {
    themes,
    selectedTheme,
    setSelectedTheme,
    applyTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

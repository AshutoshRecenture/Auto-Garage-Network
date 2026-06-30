import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";

const LogoContext = createContext(null);

export const LogoProvider = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState("/logo-color.webp");
  const [navbarLineColor, setNavbarLineColor] = useState("indigo");
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data.logoUrl) setLogoUrl(data.logoUrl);
        if (data.navbarLineColor) setNavbarLineColor(data.navbarLineColor);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateContextSettings = (newSettings) => {
    if (newSettings.logoUrl) setLogoUrl(newSettings.logoUrl);
    if (newSettings.navbarLineColor) setNavbarLineColor(newSettings.navbarLineColor);
  };

  return (
    <LogoContext.Provider
      value={{
        logoUrl,
        navbarLineColor,
        loading,
        refreshSettings: fetchSettings,
        updateContextSettings,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error("useLogo must be used within a LogoProvider");
  }
  return context;
};

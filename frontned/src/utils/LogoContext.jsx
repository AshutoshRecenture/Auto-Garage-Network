import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";

const LogoContext = createContext(null);

export const LogoProvider = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState("/logo-color.webp");
  const [navbarLineColor, setNavbarLineColor] = useState("indigo");
  const [salesPhone, setSalesPhone] = useState("07947 906789");
  const [supportPhone, setSupportPhone] = useState("01702 655556");
  const [email, setEmail] = useState("info@autogaragenetwork.com");
  const [supportEmail, setSupportEmail] = useState("jatindersingh@autogaragenetwork.com");
  const [address, setAddress] = useState("The Chestnuts, 46 Middle Lane, Nether Broughton, LE14 3HD");
  const [googleMapUrl, setGoogleMapUrl] = useState("https://maps.app.goo.gl/vBwPZYJRoGCNC1M67");
  const [priceEliteWorkshop, setPriceEliteWorkshop] = useState("135");
  const [setupEliteWorkshop, setSetupEliteWorkshop] = useState("500");
  const [priceEliteProMax, setPriceEliteProMax] = useState("235");
  const [setupEliteProMax, setSetupEliteProMax] = useState("1000");
  const [priceEliteProMaxPlus, setPriceEliteProMaxPlus] = useState("375");
  const [setupEliteProMaxPlus, setSetupEliteProMaxPlus] = useState("500");
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data.logoUrl) setLogoUrl(data.logoUrl);
        if (data.navbarLineColor) setNavbarLineColor(data.navbarLineColor);
        if (data.salesPhone) setSalesPhone(data.salesPhone);
        if (data.supportPhone) setSupportPhone(data.supportPhone);
        if (data.email) setEmail(data.email);
        if (data.supportEmail) setSupportEmail(data.supportEmail);
        if (data.address) setAddress(data.address);
        if (data.googleMapUrl) setGoogleMapUrl(data.googleMapUrl);
        if (data.priceEliteWorkshop) setPriceEliteWorkshop(data.priceEliteWorkshop);
        if (data.setupEliteWorkshop) setSetupEliteWorkshop(data.setupEliteWorkshop);
        if (data.priceEliteProMax) setPriceEliteProMax(data.priceEliteProMax);
        if (data.setupEliteProMax) setSetupEliteProMax(data.setupEliteProMax);
        if (data.priceEliteProMaxPlus) setPriceEliteProMaxPlus(data.priceEliteProMaxPlus);
        if (data.setupEliteProMaxPlus) setSetupEliteProMaxPlus(data.setupEliteProMaxPlus);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const [disabledPages, setDisabledPages] = useState([]);

  const fetchSocialMedia = async () => {
    try {
      const res = await fetch(`${API_URL}/api/social-media`);
      if (res.ok) {
        const data = await res.json();
        const activeLinks = (data || []).filter(link => link.isActive !== false);
        setSocialLinks(activeLinks);
      }
    } catch (error) {
      console.error("Failed to load social links:", error);
    }
  };

  const fetchPages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/pages`);
      if (res.ok) {
        const data = await res.json();
        const disabled = (data || [])
          .filter(page => page.isActive === false)
          .map(page => page.slug);
        setDisabledPages(disabled);
      }
    } catch (error) {
      console.error("Failed to load pages status:", error);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchSettings(), fetchSocialMedia(), fetchPages()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const updateContextSettings = (newSettings) => {
    if (newSettings.logoUrl) setLogoUrl(newSettings.logoUrl);
    if (newSettings.navbarLineColor) setNavbarLineColor(newSettings.navbarLineColor);
    if (newSettings.salesPhone) setSalesPhone(newSettings.salesPhone);
    if (newSettings.supportPhone) setSupportPhone(newSettings.supportPhone);
    if (newSettings.email) setEmail(newSettings.email);
    if (newSettings.supportEmail) setSupportEmail(newSettings.supportEmail);
    if (newSettings.address) setAddress(newSettings.address);
    if (newSettings.googleMapUrl) setGoogleMapUrl(newSettings.googleMapUrl);
    if (newSettings.priceEliteWorkshop) setPriceEliteWorkshop(newSettings.priceEliteWorkshop);
    if (newSettings.setupEliteWorkshop) setSetupEliteWorkshop(newSettings.setupEliteWorkshop);
    if (newSettings.priceEliteProMax) setPriceEliteProMax(newSettings.priceEliteProMax);
    if (newSettings.setupEliteProMax) setSetupEliteProMax(newSettings.setupEliteProMax);
    if (newSettings.priceEliteProMaxPlus) setPriceEliteProMaxPlus(newSettings.priceEliteProMaxPlus);
    if (newSettings.setupEliteProMaxPlus) setSetupEliteProMaxPlus(newSettings.setupEliteProMaxPlus);
  };

  return (
    <LogoContext.Provider
      value={{
        logoUrl,
        navbarLineColor,
        salesPhone,
        supportPhone,
        email,
        supportEmail,
        address,
        googleMapUrl,
        priceEliteWorkshop,
        setupEliteWorkshop,
        priceEliteProMax,
        setupEliteProMax,
        priceEliteProMaxPlus,
        setupEliteProMaxPlus,
        socialLinks,
        disabledPages,
        loading,
        refreshSettings: loadAll,
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

import { useState, useEffect } from "react";

const CLOUDINARY_CLOUD_NAME = "n4okswsd";

import { API_URL } from "../config";

let backendOnline = true;
const listeners = new Set();

export const subscribeBackendStatus = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const checkBackendStatus = async () => {
  try {
    const res = await fetch(`${API_URL}/api/media`);
    const isOnline = res.ok;
    if (isOnline !== backendOnline) {
      backendOnline = isOnline;
      listeners.forEach((l) => l(isOnline));
    }
  } catch (error) {
    if (backendOnline !== false) {
      backendOnline = false;
      listeners.forEach((l) => l(false));
    }
  }
};

export const useBackendOnline = () => {
  const [isOnline, setIsOnline] = useState(backendOnline);

  useEffect(() => {
    const unsubscribe = subscribeBackendStatus(setIsOnline);
    checkBackendStatus();
    return unsubscribe;
  }, []);

  return isOnline;
};

export const getCloudinaryUrl = (filename) => {
  if (!filename) return "";
  if (!backendOnline) return "";
  // If it's already a full URL, return as is
  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }
  // Extract just the base filename to prevent path-based issues
  const cleanFilename = filename.split("/").pop();
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/blogs/${cleanFilename}`;
};

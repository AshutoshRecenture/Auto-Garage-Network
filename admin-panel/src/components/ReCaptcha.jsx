import React, { useState, useEffect, useRef } from "react";
import { FiCheck } from "react-icons/fi";
import { API_URL } from "../config";

const ReCaptcha = ({ onVerify, onExpired }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const verifyTimeoutRef = useRef(null);

  const fetchToken = async () => {
    try {
      const response = await fetch(`${API_URL}/api/captcha/token`);
      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        setError(null);
      } else {
        throw new Error(data.message || "Failed to load captcha token");
      }
    } catch (err) {
      console.error("Error loading captcha token:", err);
      setError("Failed to initialize security check. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchToken();
    return () => {
      if (verifyTimeoutRef.current) clearTimeout(verifyTimeoutRef.current);
    };
  }, []);

  const handleCheckboxClick = () => {
    if (isChecked || isLoading || error || !token) return;
    
    setIsLoading(true);
    // Mimic the verification spinner delay of Google reCAPTCHA
    verifyTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsChecked(true);
      if (onVerify) {
        onVerify(token);
      }
    }, 900);
  };

  const handleReset = () => {
    setIsChecked(false);
    setIsLoading(false);
    fetchToken();
    if (onExpired) {
      onExpired();
    }
  };

  // Expose a custom event listener on window so that forms can reset the captcha widget upon submission
  useEffect(() => {
    const handleResetEvent = () => handleReset();
    window.addEventListener("reset-captcha", handleResetEvent);
    return () => {
      window.removeEventListener("reset-captcha", handleResetEvent);
    };
  }, [token]);

  return (
    <div className="flex flex-col gap-1.5 my-3 select-none align-baseline w-[302px]">
      <div 
        style={{
          width: "302px",
          height: "74px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #d3d3d3",
          borderRadius: "3px",
          boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.05)",
        }}
        className="flex items-center justify-between px-3 py-1.5 text-slate-800"
      >
        <div className="flex items-center gap-3">
          {/* Checkbox / Spinner / Green Check */}
          <div className="relative flex items-center justify-center w-[28px] h-[28px]">
            {isLoading ? (
              <div 
                className="w-[24px] h-[24px] rounded-full border-[3px] border-[#1A73E8] border-t-transparent animate-spin"
              />
            ) : isChecked ? (
              <div className="w-[30px] h-[30px] flex items-center justify-center text-[#0F9D58] font-bold scale-110">
                <FiCheck size={28} strokeWidth={3.5} />
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCheckboxClick}
                disabled={!!error || !token}
                className={`w-[24px] h-[24px] border-2 border-[#c1c1c1] rounded-[2px] bg-white transition-colors focus:outline-none cursor-pointer ${
                  !error && token ? "hover:border-[#b2b2b2]" : "opacity-55 cursor-not-allowed"
                }`}
                aria-label="I'm not a robot"
              />
            )}
          </div>
          
          {/* Text */}
          <span 
            className="text-[14px] font-normal text-[#222] font-sans"
            style={{ fontFamily: "Roboto, helvetica, arial, sans-serif" }}
          >
            I'm not a robot
          </span>
        </div>

        {/* reCAPTCHA Info Logo Panel */}
        <div className="flex flex-col items-center justify-center pr-1.5 opacity-90 select-none pointer-events-none">
          <svg className="w-[32px] h-[32px] mb-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              fill="#1A73E8" 
              fillOpacity="0.1"
              stroke="#1A73E8" 
              strokeWidth="1.5"
            />
            <path 
              d="M8.5 12.5L10.5 14.5L15.5 9.5" 
              stroke="#1A73E8" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[8px] font-bold text-gray-500 tracking-tight leading-none">reCAPTCHA</span>
          <div className="flex gap-1 text-[7px] text-gray-400 font-semibold mt-0.5 leading-none">
            <span>Privacy</span>
            <span>-</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
      {error && (
        <span className="text-xs text-red-500 px-1 font-semibold">{error}</span>
      )}
    </div>
  );
};

export default ReCaptcha;

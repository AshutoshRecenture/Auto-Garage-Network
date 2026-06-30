import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLogo } from "../utils/LogoContext.jsx";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiSend,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";
import { API_URL } from "../config";

// Happy Smiley Face Chat Widget Icon matching the user's reference screenshot
const ChatBubbleIcon = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Speech bubble shape with tail at bottom-left */}
    <path
      d="M50 15 C28 15 15 28 15 50 C15 62 21 72 30 78 L25 90 L40 84 C43 85 47 85 50 85 C72 85 85 72 85 50 C85 28 72 15 50 15 Z"
      fill="#1A73E8"
    />
    {/* Yellow face offset to the bottom right */}
    <path
      d="M55 22 C37 22 25 34 25 52 C25 62 30 71 38 76 L36 84 L46 80 C48 81 52 81 55 81 C73 81 81 69 81 52 C81 34 73 22 55 22 Z"
      fill="#FFCB05"
    />
    {/* Eyes */}
    <circle cx="45" cy="46" r="4.5" fill="#1A73E8" />
    <circle cx="65" cy="46" r="4.5" fill="#1A73E8" />
    {/* Smiley mouth */}
    <path
      d="M47 58 Q55 66 63 58"
      stroke="#1A73E8"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const menuOptions = [
  { text: "What does this website do? 🤔", value: "faq_about" },
  { text: "What services do we provide? 🛠️", value: "faq_services" },
  { text: "Our USP (Unique Selling Proposition) 🚀", value: "faq_usp" },
  { text: "Website Development 🌐", value: "faq_web_dev" },
  { text: "Mobile App Development 📱", value: "faq_app_dev" },
  { text: "SEO Services 📈", value: "faq_seo" },
  { text: "Digital Marketing 📢", value: "faq_marketing" },
  { text: "Contact Support 🛠️", value: "faq_contact" },
];

const Footer = () => {
  const { logoUrl } = useLogo();
  // Chatbot State
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadStep, setLeadStep] = useState(0);
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    mobile: "",
    businessName: "",
    selectedService: "",
    budgetRange: "",
    projectDeadline: "",
    projectDescription: "",
  });

  const [isAtBottom, setIsAtBottom] = useState(false);
  const leadIdRef = useRef(null);
  const [unselectedOptions, setUnselectedOptions] = useState(menuOptions);
  const leadDataRef = useRef(leadData);

  const updateLeadFields = (fields) => {
    leadDataRef.current = { ...leadDataRef.current, ...fields };
    setLeadData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 50;
      setIsAtBottom(isBottom);

      // Hide welcoming chatbot tooltip if user scrolls down at all
      if (window.scrollY > 20) {
        setShowTooltip(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Accordion state
  const [openSections, setOpenSections] = useState({
    company: false,
    industries: false,
    products: false,
    contact: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getFormattedTime = () => {
    return new Date()
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! Welcome to Auto Garage Network Assistant. 👋",
      time: getFormattedTime(),
    },
    {
      id: 2,
      sender: "bot",
      text: "How can I help you improve or grow your business today? Please select one of our services below to get started.",
      time: getFormattedTime(),
    },
    {
      id: 3,
      sender: "bot",
      text: "",
      isMenu: true,
      options: menuOptions,
      time: getFormattedTime(),
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Auto scroll to bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const syncChatToDatabase = async (currentMessages) => {
    try {
      const formattedMessages = currentMessages.map((m) => ({
        sender: m.sender || "bot",
        text: m.text || "",
        time: m.time || "",
      }));

      // Base payload structured for ChatLead schema
      const payload = {
        name: leadDataRef.current.name || "Website Visitor",
        email: leadDataRef.current.email || "",
        mobile: leadDataRef.current.mobile || "",
        businessName: leadDataRef.current.businessName || "",
        selectedService:
          leadDataRef.current.selectedService || "General Inquiry",
        budgetRange: leadDataRef.current.budgetRange || "",
        projectDeadline: leadDataRef.current.projectDeadline || "",
        projectDescription: leadDataRef.current.projectDescription || "",
        chatMessages: formattedMessages,
        leadStatus: "New",
      };

      if (!leadIdRef.current) {
        const response = await fetch(`${API_URL}/api/chat-submissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.data) {
            leadIdRef.current = resData.data._id;
            console.log("Chat session created in DB:", leadIdRef.current);
          }
        }
      } else {
        await fetch(`${API_URL}/api/chat-submissions/${leadIdRef.current}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        console.log("Chat log and fields updated in DB");
      }
    } catch (error) {
      console.error("Error syncing chat to DB:", error);
    }
  };

  const handleUserMessage = (text, optionValue = null) => {
    if (!text.trim()) return;

    // Add user message to list
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: getFormattedTime(),
    };
    const newMessagesList = [...messages, userMsg];
    setMessages(newMessagesList);
    setInputValue("");
    setIsTyping(true);
    setShowTooltip(false);

    if (leadStep === 0) {
      const query = (optionValue || text).toLowerCase();

      // Check for navigation / restart options first
      if (query === "navigate_gms") {
        const botText =
          "Certainly! Redirecting you to our Garage Management System page to explore dynamic workshop schedules and CRM tools...";
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: botText,
            time: getFormattedTime(),
          },
        ]);
        setIsTyping(false);
        setTimeout(() => {
          window.location.href = "/garage-management-system";
        }, 1500);
        return;
      } else if (query === "navigate_blog") {
        const botText =
          "Sure! Redirecting you to our insights and blogs page...";
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: botText,
            time: getFormattedTime(),
          },
        ]);
        setIsTyping(false);
        setTimeout(() => {
          window.location.href = "/blog";
        }, 1500);
        return;
      } else if (query === "show_socials") {
        const botText1 =
          "Follow us to stay updated with our latest releases and news:\n\n• [Facebook](https://www.facebook.com/autogaragenetworkltd) ➔\n• [Instagram](https://www.instagram.com/autogaragenetworkltd.uk) ➔\n• [LinkedIn](https://www.linkedin.com/company/auto-garage-network-ltd/) ➔\n• [YouTube](https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ) ➔";
        const botText2 = "Is there anything else I can assist you with?";
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: botText1,
            time: getFormattedTime(),
          },
          {
            id: Date.now() + 2,
            sender: "bot",
            text: botText2,
            time: getFormattedTime(),
          },
          {
            id: Date.now() + 3,
            sender: "bot",
            text: "",
            isCompletedMenu: true,
            time: getFormattedTime(),
          },
        ]);
        setIsTyping(false);
        return;
      } else if (query === "restart_chat") {
        const botText =
          "Restarting chat assistant. How can I help you improve or grow your business today?";
        setUnselectedOptions(menuOptions);
        setMessages([
          {
            id: 1,
            sender: "bot",
            text: "Hello! Welcome to Auto Garage Network Assistant. 👋",
            time: getFormattedTime(),
          },
          {
            id: 2,
            sender: "bot",
            text: botText,
            time: getFormattedTime(),
          },
          {
            id: 3,
            sender: "bot",
            text: "",
            isMenu: true,
            options: menuOptions,
            time: getFormattedTime(),
          },
        ]);
        setIsTyping(false);
        return;
      }

      // Q&A / Start Flow State
      if (optionValue) {
        setUnselectedOptions((prev) =>
          prev.filter((opt) => opt.value !== optionValue),
        );
      }

      // Sync user message to DB
      syncChatToDatabase(newMessagesList);

      setTimeout(() => {
        let botText1 = "";
        const query = (optionValue || text).toLowerCase();

        // 1. Check if Q&A Option
        if (optionValue) {
          if (optionValue === "faq_about") {
            botText1 =
              "Auto Garage Network provides state-of-the-art Garage Management Systems, bespoke websites for garages, MOT diaries, and digital marketing/SEO solutions specifically tailored for auto-garages in the UK to help them streamline operations, manage customers, and grow revenue.";
          } else if (optionValue === "faq_services") {
            botText1 =
              "We provide comprehensive digital solutions including:\n• Bespoke Garage Websites\n• SEO & Local Search optimization\n• MOT & Online Booking diaries\n• Autotech data integration\n• Fully integrated Garage Management Systems (GMS) to automate invoicing, customer notifications, and technician workflows.";
          } else if (optionValue === "faq_usp") {
            botText1 =
              "Our Unique Selling Proposition (USP) includes:\n• 100% cloud-based systems built specifically for auto garages in the UK.\n• All-in-one platform: from website bookings directly into your workshop schedule and invoicing.\n• UK-based dedicated support and sales personnel to assist you anytime.\n• Cloudinary integration for lightning-fast image/media delivery and high performance.";
          }

          if (botText1) {
            setMessages((prev) => {
              const updated = [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: "bot",
                  text: botText1,
                  time: getFormattedTime(),
                },
                {
                  id: Date.now() + 2,
                  sender: "bot",
                  text: "Would you like to explore other services or ask another question?",
                  isAnythingElseMenu: true,
                  time: getFormattedTime(),
                },
              ];
              syncChatToDatabase(updated);
              return updated;
            });
            setIsTyping(false);
            return;
          }

          // 2. Check if Service Option
          let serviceName = "";
          if (optionValue === "faq_web_dev")
            serviceName = "Website Development";
          else if (optionValue === "faq_app_dev")
            serviceName = "Mobile App Development";
          else if (optionValue === "faq_seo") serviceName = "SEO";
          else if (optionValue === "faq_marketing")
            serviceName = "Digital Marketing";
          else if (optionValue === "faq_contact") serviceName = "Contact Us";

          if (serviceName) {
            const initialLeadData = {
              name: leadDataRef.current.name || "",
              email: leadDataRef.current.email || "",
              mobile: leadDataRef.current.mobile || "",
              businessName: leadDataRef.current.businessName || "",
              selectedService: serviceName,
              budgetRange: "",
              projectDeadline: "",
              projectDescription: "",
            };
            updateLeadFields(initialLeadData);
            setLeadStep(1);

            botText1 = `Awesome choice! Let's collect some details to prepare a proposal for ${serviceName}.`;
            const botText2 =
              serviceName === "Contact Us"
                ? "Would you like our team to call you back? If yes, please tell me your Full Name to register a callback request."
                : "May I start with your Full Name, please?";

            setMessages((prev) => {
              const updated = [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: "bot",
                  text: botText1,
                  time: getFormattedTime(),
                },
                {
                  id: Date.now() + 2,
                  sender: "bot",
                  text: botText2,
                  time: getFormattedTime(),
                },
              ];
              syncChatToDatabase(updated);
              return updated;
            });
            setIsTyping(false);
            return;
          }
        }

        // 3. Fallback Typed Text Queries
        let matchedOption = null;
        let serviceNameFallback = null;
        if (
          query.includes("website") ||
          query.includes("web") ||
          query.includes("dev")
        ) {
          matchedOption = "faq_web_dev";
          serviceNameFallback = "Website Development";
        } else if (
          query.includes("app") ||
          query.includes("mobile") ||
          query.includes("phone")
        ) {
          matchedOption = "faq_app_dev";
          serviceNameFallback = "Mobile App Development";
        } else if (
          query.includes("seo") ||
          query.includes("rank") ||
          query.includes("google")
        ) {
          matchedOption = "faq_seo";
          serviceNameFallback = "SEO";
        } else if (
          query.includes("marketing") ||
          query.includes("ads") ||
          query.includes("advertise")
        ) {
          matchedOption = "faq_marketing";
          serviceNameFallback = "Digital Marketing";
        } else if (
          query.includes("contact") ||
          query.includes("support") ||
          query.includes("phone") ||
          query.includes("call") ||
          query.includes("email")
        ) {
          matchedOption = "faq_contact";
          serviceNameFallback = "Contact Us";
        } else if (
          query.includes("usp") ||
          query.includes("unique") ||
          query.includes("special")
        ) {
          matchedOption = "faq_usp";
        } else if (
          query.includes("service") ||
          query.includes("provide") ||
          query.includes("do you do")
        ) {
          matchedOption = "faq_services";
        } else if (
          query.includes("what does") ||
          query.includes("about") ||
          query.includes("network")
        ) {
          matchedOption = "faq_about";
        }

        if (
          matchedOption &&
          unselectedOptions.some((opt) => opt.value === matchedOption)
        ) {
          // Exclude it
          setUnselectedOptions((prev) =>
            prev.filter((opt) => opt.value !== matchedOption),
          );

          if (serviceNameFallback) {
            // Start lead flow
            const initialLeadData = {
              name: leadDataRef.current.name || "",
              email: leadDataRef.current.email || "",
              mobile: leadDataRef.current.mobile || "",
              businessName: leadDataRef.current.businessName || "",
              selectedService: serviceNameFallback,
              budgetRange: "",
              projectDeadline: "",
              projectDescription: "",
            };
            updateLeadFields(initialLeadData);
            setLeadStep(1);

            botText1 = `Awesome choice! Let's collect some details to prepare a proposal for ${serviceNameFallback}.`;
            const botText2 =
              serviceNameFallback === "Contact Us"
                ? "Would you like our team to call you back? If yes, please tell me your Full Name to register a callback request."
                : "May I start with your Full Name, please?";

            setMessages((prev) => {
              const updated = [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: "bot",
                  text: botText1,
                  time: getFormattedTime(),
                },
                {
                  id: Date.now() + 2,
                  sender: "bot",
                  text: botText2,
                  time: getFormattedTime(),
                },
              ];
              syncChatToDatabase(updated);
              return updated;
            });
          } else {
            // General FAQ response
            if (matchedOption === "faq_about") {
              botText1 =
                "Auto Garage Network provides state-of-the-art Garage Management Systems, bespoke websites for garages, MOT diaries, and digital marketing/SEO solutions specifically tailored for auto-garages in the UK to help them streamline operations, manage customers, and grow revenue.";
            } else if (matchedOption === "faq_services") {
              botText1 =
                "We provide comprehensive digital solutions including:\n• Bespoke Garage Websites\n• SEO & Local Search optimization\n• MOT & Online Booking diaries\n• Autotech data integration\n• Fully integrated Garage Management Systems (GMS) to automate invoicing, customer notifications, and technician workflows.";
            } else if (matchedOption === "faq_usp") {
              botText1 =
                "Our Unique Selling Proposition (USP) includes:\n• 100% cloud-based systems built specifically for auto garages in the UK.\n• All-in-one platform: from website bookings directly into your workshop schedule and invoicing.\n• UK-based dedicated support and sales personnel to assist you anytime.\n• Cloudinary integration for lightning-fast image/media delivery and high performance.";
            }

            setMessages((prev) => {
              const updated = [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: "bot",
                  text: botText1,
                  time: getFormattedTime(),
                },
                {
                  id: Date.now() + 2,
                  sender: "bot",
                  text: "Would you like to explore other services or ask another question?",
                  isAnythingElseMenu: true,
                  time: getFormattedTime(),
                },
              ];
              syncChatToDatabase(updated);
              return updated;
            });
          }
        } else {
          // Standard typed fallback
          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: "I didn't quite catch that. Please choose from our available service options below:",
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: "",
                isMenu: true,
                options: [...unselectedOptions],
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated);
            return updated;
          });
        }
        setIsTyping(false);
      }, 1000);
    } else {
      // Lead form capturing flow is active (leadStep > 0)
      setTimeout(async () => {
        let botText1 = "";
        let botText2 = "";
        let nextStep = leadStep;

        if (leadStep === 1) {
          updateLeadFields({ name: text });
          botText1 = `Nice to meet you, ${text}!`;
          botText2 = "Can you please enter your Email Address?";
          nextStep = 2;

          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: botText1,
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: botText2,
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated);
            return updated;
          });
          setLeadStep(nextStep);
        } else if (leadStep === 2) {
          updateLeadFields({ email: text });
          botText1 = "Got it, email address saved.";
          botText2 = "Could you please enter your Mobile Number?";
          nextStep = 3;

          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: botText1,
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: botText2,
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated);
            return updated;
          });
          setLeadStep(nextStep);
        } else if (leadStep === 3) {
          updateLeadFields({ mobile: text });
          botText1 = "Thank you.";
          botText2 =
            "What is your Business Name? (Type 'skip' or 'no' if you don't have one)";
          nextStep = 4;

          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: botText1,
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: botText2,
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated);
            return updated;
          });
          setLeadStep(nextStep);
        } else if (leadStep === 4) {
          const company =
            text.toLowerCase() === "skip" || text.toLowerCase() === "no"
              ? ""
              : text;
          updateLeadFields({ businessName: company });

          botText1 = `Thank you. For your ${leadDataRef.current.selectedService} project, what is your estimated Budget Range?`;
          botText2 =
            "Please select from the options below or type your budget.";
          nextStep = 6;

          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: botText1,
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: botText2,
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated);
            return updated;
          });
          setLeadStep(nextStep);
        } else if (leadStep === 6) {
          updateLeadFields({ budgetRange: text });
          botText1 = `Budget set to ${text}.`;
          botText2 =
            "What is your desired Project Deadline? (e.g. 2 weeks, 1 month, 3 months)";
          nextStep = 7;

          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: botText1,
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: botText2,
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated);
            return updated;
          });
          setLeadStep(nextStep);
        } else if (leadStep === 7) {
          updateLeadFields({ projectDeadline: text });
          botText1 = `Project deadline set to ${text}.`;
          botText2 =
            "Lastly, could you please write a short Project Description of what you want us to do?";
          nextStep = 8;

          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: botText1,
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: botText2,
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated);
            return updated;
          });
          setLeadStep(nextStep);
        } else if (leadStep === 8) {
          updateLeadFields({ projectDescription: text });

          botText1 =
            "Perfect, I am saving your lead information to our database...";
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: botText1,
              time: getFormattedTime(),
            },
          ]);

          try {
            const currentChatMessages = [
              ...messages,
              { sender: "user", text, time: getFormattedTime() },
            ].map((m) => ({
              sender: m.sender || "bot",
              text: m.text || "",
              time: m.time || "",
            }));

            const finalPayload = {
              name: leadDataRef.current.name,
              email: leadDataRef.current.email,
              mobile: leadDataRef.current.mobile,
              businessName: leadDataRef.current.businessName,
              chatMessages: currentChatMessages,
              selectedService: leadDataRef.current.selectedService,
              budgetRange: leadDataRef.current.budgetRange,
              projectDeadline: leadDataRef.current.projectDeadline,
              projectDescription: text,
              leadStatus: "New",
            };

            let response;
            if (leadIdRef.current) {
              response = await fetch(
                `${API_URL}/api/chat-submissions/${leadIdRef.current}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(finalPayload),
                },
              );
            } else {
              response = await fetch(`${API_URL}/api/chat-submissions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalPayload),
              });
            }

            if (response.ok) {
              botText2 = `🎉 Thank you, ${leadDataRef.current.name}! Your request has been successfully registered. Our team will get back to you shortly at ${leadDataRef.current.email} or on ${leadDataRef.current.mobile}.`;
            } else {
              botText2 = `Thank you, ${leadDataRef.current.name}! Although our database connection encountered a brief delay, I have logged your details. Our team will contact you shortly!`;
            }
          } catch (err) {
            console.error("Failed to post final chat lead:", err);
            botText2 = `Thank you, ${leadDataRef.current.name}! I have recorded your details and our team will get in touch with you shortly.`;
          }

          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: botText2,
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: "Would you like to explore other services or ask another question?",
                isAnythingElseMenu: true,
                time: getFormattedTime(),
              },
            ];
            // Clear ref to allow a brand-new form if they fill another service
            leadIdRef.current = null;
            return updated;
          });

          // Reset lead flow status
          setLeadStep(0);
          updateLeadFields({
            name: "",
            email: "",
            mobile: "",
            businessName: "",
            selectedService: "",
            budgetRange: "",
            projectDeadline: "",
            projectDescription: "",
          });
        }
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleAnythingElseChoice = (choice) => {
    const userChoiceText =
      choice === "yes" ? "Yes, show options" : "No, thank you";
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userChoiceText,
      time: getFormattedTime(),
    };
    const newMessagesList = [...messages, userMsg];
    setMessages(newMessagesList);
    setIsTyping(true);

    // Sync Yes/No user choice to DB
    syncChatToDatabase(newMessagesList);

    setTimeout(() => {
      if (choice === "yes") {
        if (unselectedOptions.length > 0) {
          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: "Please choose from the remaining options:",
                time: getFormattedTime(),
              },
              {
                id: Date.now() + 2,
                sender: "bot",
                text: "",
                isMenu: true,
                options: [...unselectedOptions],
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated); // Sync next menu options to DB
            return updated;
          });
        } else {
          setMessages((prev) => {
            const updated = [
              ...prev,
              {
                id: Date.now() + 1,
                sender: "bot",
                text: "You have explored all available options! If you have other inquiries, feel free to contact us at info@autogaragenetwork.com.",
                time: getFormattedTime(),
              },
            ];
            syncChatToDatabase(updated);
            return updated;
          });
        }
      } else {
        setMessages((prev) => {
          const updated = [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: "Thank you for contacting AGN Support. If you have any other questions in the future, feel free to chat with us again.",
              time: getFormattedTime(),
            },
          ];
          syncChatToDatabase(updated); // Sync final thank you response to DB
          return updated;
        });
      }
      setIsTyping(false);
    }, 800);
  };

  const completedMenuOptions = [
    { text: "Explore GMS Features ⚙️", value: "navigate_gms" },
    { text: "Read Latest Insights 📚", value: "navigate_blog" },
    { text: "Follow Our Socials 📱", value: "show_socials" },
    { text: "Start New Inquiry 🔄", value: "restart_chat" },
  ];

  const formatMessageText = (text) => {
    if (!text) return "";
    const splitRegex = /\*\*(.*?)\*\*/g;
    const items = [];
    let lastIndex = 0;
    let match;

    while ((match = splitRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        items.push(text.substring(lastIndex, match.index));
      }
      items.push(
        <strong key={match.index} className="font-bold text-slate-900">
          {match[1]}
        </strong>,
      );
      lastIndex = splitRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      items.push(text.substring(lastIndex));
    }

    return items.length > 0 ? items : text;
  };

  return (
    <>
      <footer className="bg-[#050816] pt-0 pb-0 relative text-white font-sans">
        {/* 1. Blue Top Bar */}
        <div className="no-invert bg-[#1e73be] w-full py-4 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Follow Us & Social Icons */}
            <div className="flex items-center space-x-4">
              <span className="font-bold text-sm text-white select-none">
                Follow Us
              </span>
              <div className="flex items-center space-x-2.5">
                <a
                  href="https://www.facebook.com/autogaragenetworkltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <FaFacebookF size={13} />
                </a>
                <a
                  href="https://www.instagram.com/autogaragenetworkltd.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram profile"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E1306C] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <FaInstagram size={13} />
                </a>
                <a
                  href="https://x.com/autogaragent"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Twitter profile"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1DA1F2] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <FaTwitter size={13} />
                </a>
                <a
                  href="https://www.linkedin.com/company/auto-garage-network-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our LinkedIn page"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0A66C2] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <FaLinkedinIn size={13} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our YouTube channel"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF0000] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <FaYoutube size={13} />
                </a>
              </div>
            </div>

            {/* Contact Email on right */}
            <a
              href="mailto:info@autogaragenetwork.com"
              className="flex items-center space-x-2 text-white hover:text-cyan-200 transition-colors text-sm font-semibold"
            >
              <FiMail className="w-4 h-4 shrink-0" />
              <span>info@autogaragenetwork.com</span>
            </a>
          </div>
        </div>

        {/* 2. Main Footer columns grid */}
        <div className="max-w-[1500px] mx-auto px-8 lg:px-16 pt-10 md:pt-16 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-10">
            {/* Column 1: Auto Garage Network blurb */}
            <div className="space-y-5 text-center md:text-left flex flex-col items-center md:items-start pb-6 md:pb-0 border-b border-white/5 md:border-0">
              <Link to="/" className="inline-block cursor-pointer">
                <img
                  src={logoUrl || "/logo-color.png"}
                  alt="Auto Garage Network Logo"
                  className="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="120"
                  height="48"
                />
              </Link>
              <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                Take full control of your garage operations with our system.
                Manage your customers, optimise pricing, oversee employee tasks,
                track inventory, and access real-time revenue reports–all
                seamlessly and hassle-free!
              </p>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-4 border-b border-white/5 md:border-0 pb-4 md:pb-0">
              <button
                onClick={() => toggleSection("company")}
                className="w-full md:cursor-default flex justify-between items-center text-left md:block focus:outline-none"
                aria-expanded={openSections.company}
                aria-controls="footer-company-links"
              >
                <h4 className="font-extrabold text-base select-none">
                  Company
                </h4>
                <span className="md:hidden text-gray-400 font-bold text-lg leading-none pr-1">
                  {openSections.company ? "−" : "+"}
                </span>
              </button>

              <div
                id="footer-company-links"
                className={`${openSections.company ? "block" : "hidden"} md:block mt-3 md:mt-0`}
              >
                <ul className="space-y-2.5 text-xs text-gray-400 font-semibold">
                  <li>
                    <Link to="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about-us"
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact-us"
                      className="hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Career
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/sitemap"
                      className="hover:text-white transition-colors"
                    >
                      Sitemap
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pricing"
                      className="hover:text-white transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/latest-work"
                      className="hover:text-white transition-colors"
                    >
                      Latest Work
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cookie-policy"
                      className="hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-of-service"
                      className="hover:text-white transition-colors"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 3: Industries */}
            <div className="space-y-4 border-b border-white/5 md:border-0 pb-4 md:pb-0">
              <button
                onClick={() => toggleSection("industries")}
                className="w-full md:cursor-default flex justify-between items-center text-left md:block focus:outline-none"
                aria-expanded={openSections.industries}
                aria-controls="footer-industries-links"
              >
                <h4 className="font-extrabold text-base select-none">
                  Industries
                </h4>
                <span className="md:hidden text-gray-400 font-bold text-lg leading-none pr-1">
                  {openSections.industries ? "−" : "+"}
                </span>
              </button>

              <div
                id="footer-industries-links"
                className={`${openSections.industries ? "block" : "hidden"} md:block mt-3 md:mt-0`}
              >
                <ul className="space-y-2.5 text-xs text-gray-400 font-semibold">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Car Workshop
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Car Traders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      MOT Centres
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Automotive
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 4: Products */}
            <div className="space-y-4 border-b border-white/5 md:border-0 pb-4 md:pb-0">
              <button
                onClick={() => toggleSection("products")}
                className="w-full md:cursor-default flex justify-between items-center text-left md:block focus:outline-none"
                aria-expanded={openSections.products}
                aria-controls="footer-products-links"
              >
                <h4 className="font-extrabold text-base select-none">
                  Products
                </h4>
                <span className="md:hidden text-gray-400 font-bold text-lg leading-none pr-1">
                  {openSections.products ? "−" : "+"}
                </span>
              </button>

              <div
                id="footer-products-links"
                className={`${openSections.products ? "block" : "hidden"} md:block mt-3 md:mt-0`}
              >
                <ul className="space-y-2.5 text-xs text-gray-400 font-semibold">
                  <li>
                    <Link
                      to="/mot-diary"
                      className="hover:text-white transition-colors"
                    >
                      MOT Diary
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/seo"
                      className="hover:text-white transition-colors"
                    >
                      SEO
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Website Register (WRF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Website Register with Contract
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Products & Services Price
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 5: Contact Information */}
            <div className="space-y-4 border-b border-white/5 md:border-0 pb-4 md:pb-0">
              <button
                onClick={() => toggleSection("contact")}
                className="w-full md:cursor-default flex justify-between items-center text-left md:block focus:outline-none"
                aria-expanded={openSections.contact}
                aria-controls="footer-contact-links"
              >
                <h4 className="font-extrabold text-base select-none">
                  Contact Information
                </h4>
                <span className="md:hidden text-gray-400 font-bold text-lg leading-none pr-1">
                  {openSections.contact ? "−" : "+"}
                </span>
              </button>

              <div
                id="footer-contact-links"
                className={`${openSections.contact ? "block" : "hidden"} md:block space-y-5 mt-4 md:mt-0 text-xs text-gray-400 font-semibold leading-relaxed`}
              >
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-indigo-400 w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">
                      Address:
                    </span>
                    <a
                      href="https://maps.app.goo.gl/vBwPZYJRoGCNC1M67"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors block"
                    >
                      The Chestnuts, 46 Middle Lane,
                      <br />
                      Nether Broughton, LE14 3HD
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiPhone className="text-indigo-400 w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">
                      Sales Inquiry:
                    </span>
                    <a
                      href="tel:07947906789"
                      className="text-white hover:text-indigo-400 block font-bold"
                    >
                      07947 906789
                    </a>
                    <a
                      href="mailto:info@autogaragenetwork.com"
                      className="text-gray-400 hover:text-white block mt-0.5 break-all"
                    >
                      info@autogaragenetwork.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiPhone className="text-indigo-400 w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">
                      Customer Support:
                    </span>
                    <a
                      href="tel:01702655556"
                      className="text-white hover:text-indigo-400 block font-bold"
                    >
                      01702 655556
                    </a>
                    <a
                      href="mailto:jatindersingh@autogaragenetwork.com"
                      className="text-gray-400 hover:text-white block mt-0.5 whitespace-nowrap"
                    >
                      jatindersingh@autogaragenetwork.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Copyright Bar */}
        <div className="copyright-text copy_txt select-none">
          <p className="mb-lg-0 mb-md-0">
            Copyright © 2016 - 2026 Auto Garage Network. All Right Reserved.
          </p>
        </div>
      </footer>

      {/* Floating Chatbot Assistant Widget */}
      <div
        id="chatbot-widget-container"
        className={`fixed bottom-6 right-6 z-50 flex flex-col items-end transition-opacity duration-300 ${
          isAtBottom ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Chat Tooltip Preview */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="bg-white text-slate-800 border border-gray-200 px-4 py-3 rounded-2xl rounded-br-none shadow-2xl mb-3 mr-1 text-xs max-w-[240px] flex items-center justify-between gap-3 select-none"
            >
              <div>
                <span className="font-semibold block text-blue-600 mb-0.5">
                  AGN Support Bot
                </span>
                <span>Hello! How may I help you today? 👋</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-gray-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Dismiss tooltip"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window Dialog */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#f4f6f9] border border-gray-200 rounded-2xl shadow-2xl mb-4 w-[330px] sm:w-[360px] h-[480px] flex flex-col overflow-hidden text-slate-800 font-sans"
            >
              {/* Header */}
              <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  {/* Yellow Circle Logo with Blue A */}
                  <div className="w-9 h-9 rounded-full bg-[#FFCB05] flex items-center justify-center font-black text-blue-700 shadow-md select-none">
                    A
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">
                      AGN Support
                    </span>
                    <span className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-slate-600 p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div
                className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 38.5 C10 38.5 10 35.5 20 35.5 C30 35.5 30 38.5 40 38.5' fill='none' stroke='%231a73e8' stroke-opacity='0.03' stroke-width='1.2'/%3E%3C/svg%3E")`,
                  backgroundColor: "#f4f6f9",
                }}
              >
                {/* Warning notice in the center */}
                <div className="text-center text-[10px] text-gray-500 bg-white/50 py-2 px-3 rounded-xl mx-auto my-2 max-w-[95%] leading-normal border border-gray-200 shadow-sm select-none">
                  Please excuse any mistakes as we work to better answer your
                  questions. Do not give personal information in this chat.
                </div>

                {messages.map((msg) => {
                  if (msg.isMenu) {
                    return (
                      <div key={msg.id} className="flex justify-start">
                        <div className="flex flex-col items-start max-w-[85%]">
                          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none shadow-md overflow-hidden w-full">
                            {(msg.options || []).map((opt, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  handleUserMessage(opt.text, opt.value)
                                }
                                className={`w-full text-left px-4 py-3.5 text-xs font-semibold text-blue-600 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer ${
                                  idx < (msg.options || []).length - 1
                                    ? "border-b border-gray-150"
                                    : ""
                                }`}
                              >
                                <span>{opt.text}</span>
                                <span className="text-gray-400 text-[10px]">
                                  ➔
                                </span>
                              </button>
                            ))}
                          </div>
                          <span className="text-[9px] text-gray-400 mt-1 ml-1 select-none">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  if (msg.isAnythingElseMenu) {
                    return (
                      <div key={msg.id} className="flex justify-start">
                        <div className="flex flex-col items-start max-w-[85%] w-full">
                          <div className="bg-white border border-gray-205 rounded-2xl rounded-tl-none shadow-md overflow-hidden p-3.5 w-full flex flex-col gap-2.5">
                            <span className="text-xs text-slate-800 font-medium leading-relaxed">
                              {msg.text ||
                                "Would you like to explore other services or ask another question?"}
                            </span>
                            <div className="flex gap-2 w-full">
                              <button
                                type="button"
                                onClick={() => handleAnythingElseChoice("yes")}
                                className="flex-1 py-2 px-3 bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1e3a8a] rounded-xl text-xs font-semibold transition-all border border-[#dbeafe] cursor-pointer text-center"
                              >
                                Yes, show options
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAnythingElseChoice("no")}
                                className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-all border border-slate-200 cursor-pointer text-center"
                              >
                                No, thank you
                              </button>
                            </div>
                          </div>
                          <span className="text-[9px] text-gray-400 mt-1 ml-1 select-none">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  if (msg.isCompletedMenu) {
                    return (
                      <div key={msg.id} className="flex justify-start">
                        <div className="flex flex-col items-start max-w-[85%]">
                          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none shadow-md overflow-hidden w-full">
                            {completedMenuOptions.map((opt, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  handleUserMessage(opt.text, opt.value)
                                }
                                className={`w-full text-left px-4 py-3.5 text-xs font-semibold text-blue-600 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer ${
                                  idx < completedMenuOptions.length - 1
                                    ? "border-b border-gray-150"
                                    : ""
                                }`}
                              >
                                <span>{opt.text}</span>
                                <span className="text-gray-400 text-[10px]">
                                  ➔
                                </span>
                              </button>
                            ))}
                          </div>
                          <span className="text-[9px] text-gray-400 mt-1 ml-1 select-none">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex flex-col items-start max-w-[85%]">
                        <div
                          className={`px-3.5 py-2.5 text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                            isUser
                              ? "bg-[#1A73E8] text-white rounded-2xl rounded-tr-none self-end"
                              : "bg-white border border-gray-200 text-slate-800 rounded-2xl rounded-tl-none self-start"
                          }`}
                        >
                          {formatMessageText(msg.text)}
                        </div>
                        <span
                          className={`text-[9px] text-gray-400 mt-1 select-none w-full ${isUser ? "text-right pr-1" : "text-left pl-1"}`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-3.5 py-3 text-xs flex items-center gap-1 text-gray-400 shadow-sm">
                      <span
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Choice Buttons for Budget or Deadline */}
              {(leadStep === 6 || leadStep === 7) && (
                <div className="px-4 py-2 bg-slate-50 border-t border-gray-200 flex flex-wrap gap-2 justify-center">
                  {leadStep === 6 &&
                    [
                      "Under £1,000",
                      "£1,000 - £5,000",
                      "£5,000 - £10,000",
                      "£10,000+",
                    ].map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => handleUserMessage(budget)}
                        className="chat-choice-btn px-3 py-1.5 bg-white hover:bg-[#eff6ff] border border-gray-200 hover:border-blue-300 text-blue-600 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                      >
                        {budget}
                      </button>
                    ))}
                  {leadStep === 7 &&
                    [
                      "Immediate (< 2 weeks)",
                      "1 Month",
                      "2-3 Months",
                      "Flexible",
                    ].map((deadline) => (
                      <button
                        key={deadline}
                        type="button"
                        onClick={() => handleUserMessage(deadline)}
                        className="chat-choice-btn px-3 py-1.5 bg-white hover:bg-[#eff6ff] border border-gray-200 hover:border-blue-300 text-blue-600 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                      >
                        {deadline}
                      </button>
                    ))}
                </div>
              )}

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUserMessage(inputValue);
                }}
                className="border-t border-gray-200 px-4 py-3 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow bg-transparent border-0 outline-none text-xs font-semibold text-slate-800 placeholder-slate-400 min-w-0"
                  aria-label="Type message"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 rounded-xl bg-[#1A73E8] hover:bg-blue-600 text-white disabled:opacity-50 disabled:hover:bg-[#1A73E8] transition-colors shadow-lg cursor-pointer"
                  aria-label="Send message"
                >
                  <FiSend className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={!isOpen ? { y: [0, -4, 0] } : {}}
          transition={
            !isOpen ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : {}
          }
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative select-none cursor-pointer transition-all duration-300 ${
            isOpen
              ? "bg-white text-slate-800 border border-gray-200 hover:bg-gray-50"
              : "bg-white text-slate-800 border border-gray-100 shadow-xl hover:shadow-2xl"
          }`}
          aria-label={isOpen ? "Close support chat" : "Open support chat"}
        >
          {isOpen ? (
            <FiX className="w-6 h-6 text-slate-600" />
          ) : (
            <>
              <ChatBubbleIcon className="w-11 h-11" />
              {/* Pulse Indicator */}
              <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-white"></span>
              </span>
            </>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default Footer;

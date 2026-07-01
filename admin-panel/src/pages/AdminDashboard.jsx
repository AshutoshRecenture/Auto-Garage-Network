import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useLogo } from "../utils/LogoContext.jsx";
import { API_URL } from "../config";
import {
  FiTrash2,
  FiDownload,
  FiSearch,
  FiKey,
  FiDatabase,
  FiLayers,
  FiMail,
  FiPhone,
  FiUploadCloud,
  FiSettings,
  FiPlus,
  FiEdit2,
  FiEye,
  FiImage,
  FiVideo,
  FiCopy,
  FiGrid,
  FiCheckCircle,
  FiLogOut,
  FiX,
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiChevronRight,
  FiHelpCircle
} from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";

const AdminDashboard = () => {
  const { logoUrl, navbarLineColor, refreshSettings } = useLogo();
  const [activeTab, setActiveTab] = useState("contact-leads");
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminName, setAdminName] = useState("");

  // Leads state
  const [chatLeads, setChatLeads] = useState([]);
  const [contactLeads, setContactLeads] = useState([]);
  const [leadsSearch, setLeadsSearch] = useState("");
  const [leadsFilter, setLeadsFilter] = useState("all");
  const [selectedChat, setSelectedChat] = useState(null); // for chat logs modal

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogSubmitLoading, setBlogSubmitLoading] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  // Blog Form fields
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "Workflow Optimization",
    readTime: "5 min read",
    excerpt: "",
    content: "",
    color: "bg-blue-500/10 text-blue-400",
    image: ""
  });

  // Media state
  const [media, setMedia] = useState([]);
  const [mediaSearch, setMediaSearch] = useState("");
  const [mediaUploadLoading, setMediaUploadLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaDesc, setMediaDesc] = useState("");
  const [showMediaPickerModal, setShowMediaPickerModal] = useState(false); // picker modal inside blog form

  // FAQ state
  const [faqs, setFaqs] = useState([]);
  const [faqSearch, setFaqSearch] = useState("");
  const [faqSubmitLoading, setFaqSubmitLoading] = useState(false);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    order: 0
  });

  // Settings state
  const [settingsForm, setSettingsForm] = useState({
    logoUrl: "",
    navbarLineColor: "indigo"
  });
  const [settingsSaveLoading, setSettingsSaveLoading] = useState(false);

  // Contact Form states
  const [contactSubmitLoading, setContactSubmitLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    garageName: "",
    email: "",
    phone: "",
    interestedIn: "Garage Management System",
    address: "",
    message: ""
  });

  // Chatbot Lead Form states
  const [chatLeadSubmitLoading, setChatLeadSubmitLoading] = useState(false);
  const [showChatLeadForm, setShowChatLeadForm] = useState(false);
  const [editingChatLead, setEditingChatLead] = useState(null);
  const [chatLeadForm, setChatLeadForm] = useState({
    name: "",
    email: "",
    mobile: "",
    businessName: "",
    selectedService: "General Inquiry",
    budgetRange: "",
    projectDeadline: "",
    projectDescription: "",
    leadStatus: "New"
  });


  // Load Admin auth and fetch data
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("agn_token");
    const role = localStorage.getItem("agn_user_role");
    const name = localStorage.getItem("agn_user_name");
    
    if (token && role === "admin") {
      setIsAuthenticated(true);
      setAdminName(name || "Administrator");
      loadAllData(token);
      setCheckingAuth(false);
    } else {
      // Redirect to login if not authenticated
      window.location.href = "/login";
    }
  }, []);

  const loadAllData = (token) => {
    fetchLeads(token);
    fetchContacts(token);
    fetchBlogs();
    fetchMedia();
    fetchSettings();
    fetchFaqs(token);
  };

  const getHeaders = () => {
    const token = localStorage.getItem("agn_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  };

  // --- API Fetches ---
  const fetchLeads = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/chat-submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setChatLeads(data.data || data || []);
      }
    } catch (e) {
      console.error("Error fetching chat leads:", e);
    }
  };

  const fetchContacts = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setContactLeads(data || []);
      }
    } catch (e) {
      console.error("Error fetching contacts:", e);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data || []);
      }
    } catch (e) {
      console.error("Error fetching blogs:", e);
    }
  };

  const fetchMedia = async () => {
    try {
      const res = await fetch(`${API_URL}/api/media`);
      if (res.ok) {
        const data = await res.json();
        setMedia(data || []);
      }
    } catch (e) {
      console.error("Error fetching media:", e);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`);
      if (res.ok) {
        const data = await res.json();
        setSettingsForm({
          logoUrl: data.logoUrl || "/logo-color.png",
          navbarLineColor: data.navbarLineColor || "indigo"
        });
      }
    } catch (e) {
      console.error("Error fetching settings:", e);
    }
  };

  const fetchFaqs = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/faqs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFaqs(data || []);
      }
    } catch (e) {
      console.error("Error fetching faqs:", e);
    }
  };

  // --- Auth Handlers ---
  const handleLogout = () => {
    localStorage.removeItem("agn_token");
    localStorage.removeItem("agn_user_role");
    localStorage.removeItem("agn_user_name");
    localStorage.removeItem("agn_admin_authenticated");
    window.location.href = "/login";
  };

  // --- Leads Handlers ---
  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact submission?")) return;
    try {
      const res = await fetch(`${API_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        setContactLeads(contactLeads.filter(c => c._id !== id));
        alert("Contact lead deleted successfully.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitLoading(true);
    try {
      const url = editingContact
        ? `${API_URL}/api/contact/${editingContact._id}`
        : `${API_URL}/api/contact`;
      
      const method = editingContact ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(contactForm)
      });

      if (res.ok) {
        alert(editingContact ? "Contact lead updated successfully!" : "Contact lead created successfully!");
        setShowContactForm(false);
        setEditingContact(null);
        setContactForm({
          name: "",
          garageName: "",
          email: "",
          phone: "",
          interestedIn: "Garage Management System",
          address: "",
          message: ""
        });
        const token = localStorage.getItem("agn_token");
        fetchContacts(token);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to save contact lead.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving contact.");
    } finally {
      setContactSubmitLoading(false);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setContactForm({
      name: contact.name || "",
      garageName: contact.garageName || "",
      email: contact.email || "",
      phone: contact.phone || "",
      interestedIn: contact.interestedIn || "Garage Management System",
      address: contact.address || "",
      message: contact.message || ""
    });
    setShowContactForm(true);
  };

  const handleChatLeadFormSubmit = async (e) => {
    e.preventDefault();
    setChatLeadSubmitLoading(true);
    try {
      const url = `${API_URL}/api/chat-submissions/${editingChatLead._id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(chatLeadForm)
      });

      if (res.ok) {
        alert("Chatbot lead updated successfully!");
        setShowChatLeadForm(false);
        setEditingChatLead(null);
        const token = localStorage.getItem("agn_token");
        fetchLeads(token);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to save chatbot lead.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving chatbot lead.");
    } finally {
      setChatLeadSubmitLoading(false);
    }
  };

  const handleEditChatLead = (ch) => {
    setEditingChatLead(ch);
    setChatLeadForm({
      name: ch.name || "",
      email: ch.email || "",
      mobile: ch.mobile || "",
      businessName: ch.businessName || "",
      selectedService: ch.selectedService || "General Inquiry",
      budgetRange: ch.budgetRange || "",
      projectDeadline: ch.projectDeadline || "",
      projectDescription: ch.projectDescription || "",
      leadStatus: ch.leadStatus || "New"
    });
    setShowChatLeadForm(true);
  };

  const handleDeleteChatLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this chatbot lead session?")) return;
    try {
      const res = await fetch(`${API_URL}/api/chat-submissions/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        setChatLeads(chatLeads.filter(c => c._id !== id));
        alert("Chatbot lead deleted successfully.");
      } else {
        alert("Failed to delete chatbot lead.");
      }
    } catch (e) {
      console.error(e);
    }
  };


  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return "";
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (e) {
      return "";
    }
  };

  const downloadContactLeadsExcel = () => {
    if (contactLeads.length === 0) {
      alert("No contact leads to download.");
      return;
    }

    const headers = ["Name", "Email", "Phone", "Garage Name", "Interest", "Message/Notes", "Date"];
    
    let tableRows = "";
    contactLeads.forEach((c) => {
      tableRows += `
        <tr>
          <td>${(c.name || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(c.email || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td class="phone-col">${(c.phone || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(c.garageName || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(c.interestedIn || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(c.message || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td class="date-col">${formatDate(c.createdAt)}</td>
        </tr>
      `;
    });

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-excel:office:excel" xmlns:x="urn:schemas-microsoft-excel:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Contact Leads</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; font-family: 'Segoe UI', Calibri, Arial, sans-serif; font-size: 11pt; }
          th { background-color: #4F46E5; color: #FFFFFF; font-weight: bold; border: 1px solid #D1D5DB; padding: 10px 14px; text-align: left; }
          td { border: 1px solid #E5E7EB; padding: 8px 14px; text-align: left; vertical-align: top; }
          .phone-col { mso-number-format: "\\@"; }
          .date-col { mso-number-format: "yyyy-mm-dd"; text-align: center; }
          tr:nth-child(even) { background-color: #F9FAFB; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelHtml], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const blobUrl = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", blobUrl);
    link.setAttribute("download", `agn_contact_leads_${formatDate(new Date())}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const downloadChatLeadsExcel = () => {
    if (chatLeads.length === 0) {
      alert("No chatbot leads to download.");
      return;
    }

    const headers = ["Name", "Email", "Mobile", "Business Name", "Selected Service", "Project Deadline", "Budget Range", "Status", "Chat Messages Count", "Date"];
    
    let tableRows = "";
    chatLeads.forEach((ch) => {
      tableRows += `
        <tr>
          <td>${(ch.name || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(ch.email || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td class="phone-col">${(ch.mobile || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(ch.businessName || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(ch.selectedService || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(ch.projectDeadline || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(ch.budgetRange || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>${(ch.leadStatus || "New").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
          <td>Chat messages logged: ${ch.chatMessages?.length || 0}</td>
          <td class="date-col">${formatDate(ch.createdAt)}</td>
        </tr>
      `;
    });

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-excel:office:excel" xmlns:x="urn:schemas-microsoft-excel:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Chatbot Leads</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; font-family: 'Segoe UI', Calibri, Arial, sans-serif; font-size: 11pt; }
          th { background-color: #4F46E5; color: #FFFFFF; font-weight: bold; border: 1px solid #D1D5DB; padding: 10px 14px; text-align: left; }
          td { border: 1px solid #E5E7EB; padding: 8px 14px; text-align: left; vertical-align: top; }
          .phone-col { mso-number-format: "\\@"; }
          .date-col { mso-number-format: "yyyy-mm-dd"; text-align: center; }
          tr:nth-child(even) { background-color: #F9FAFB; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelHtml], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const blobUrl = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", blobUrl);
    link.setAttribute("download", `agn_chatbot_leads_${formatDate(new Date())}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  // --- Blog Handlers ---
  const handleBlogImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Maximum size is 10MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", `Blog Cover - ${file.name}`);
    formData.append("description", "Uploaded directly via Blog editor");

    try {
      setBlogSubmitLoading(true);
      const token = localStorage.getItem("agn_token");
      const res = await fetch(`${API_URL}/api/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setBlogForm(prev => ({ ...prev, image: data.secure_url || data.url }));
        alert("Image uploaded and selected successfully!");
        if (typeof fetchMedia === "function") {
          fetchMedia();
        }
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    } finally {
      setBlogSubmitLoading(false);
    }
  };

  const handleBlogFormSubmit = async (e) => {
    e.preventDefault();
    setBlogSubmitLoading(true);
    try {
      const url = editingBlog 
        ? `${API_URL}/api/blogs/${editingBlog._id}` 
        : `${API_URL}/api/blogs`;
      
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify({
          ...blogForm,
          date: editingBlog ? editingBlog.date : undefined // preserve original date or let backend handle it
        })
      });

      if (res.ok) {
        alert(editingBlog ? "Blog post updated successfully!" : "Blog post created successfully!");
        setShowBlogForm(false);
        setEditingBlog(null);
        setBlogForm({
          title: "",
          category: "Workflow Optimization",
          readTime: "5 min read",
          excerpt: "",
          content: "",
          color: "bg-blue-500/10 text-blue-400",
          image: ""
        });
        fetchBlogs();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to save blog post.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving blog.");
    } finally {
      setBlogSubmitLoading(false);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || "",
      category: blog.category || "Workflow Optimization",
      readTime: blog.readTime || "5 min read",
      excerpt: blog.excerpt || "",
      content: Array.isArray(blog.content) 
        ? blog.content.map(c => c.value).join("\n\n") 
        : blog.content || "",
      color: blog.color || "bg-blue-500/10 text-blue-400",
      image: blog.image || ""
    });
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        setBlogs(blogs.filter(b => b._id !== id));
        alert("Blog post deleted successfully.");
      } else {
        alert("Failed to delete blog.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Helper categories colors
  const categoryColors = [
    { name: "Blue / Workflow", class: "bg-blue-500/10 text-blue-400" },
    { name: "Indigo / Industry & News", class: "bg-indigo-500/10 text-indigo-400" },
    { name: "Purple / Automation", class: "bg-purple-500/10 text-purple-400" },
    { name: "Emerald / CRM & Relations", class: "bg-emerald-500/10 text-emerald-400" },
    { name: "Rose / Efficiency", class: "bg-rose-500/10 text-rose-400" },
    { name: "Cyan / Case Study", class: "bg-cyan-500/10 text-cyan-400" },
    { name: "Amber / Guide", class: "bg-amber-500/10 text-amber-400" },
    { name: "Teal / Features & Diary", class: "bg-teal-500/10 text-teal-400" }
  ];

  // --- Media Handlers ---
  const handleMediaUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please choose a file to upload first!");
      return;
    }

    setMediaUploadLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", mediaTitle);
    formData.append("description", mediaDesc);

    try {
      const token = localStorage.getItem("agn_token");
      const res = await fetch(`${API_URL}/api/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        alert("Media uploaded successfully!");
        setSelectedFile(null);
        setMediaTitle("");
        setMediaDesc("");
        // Clear input element
        const fileInput = document.getElementById("media-file-input");
        if (fileInput) fileInput.value = "";
        fetchMedia();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to upload media.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading media file.");
    } finally {
      setMediaUploadLoading(false);
    }
  };

  const handleDeleteMedia = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file from Cloudinary and DB?")) return;
    try {
      const res = await fetch(`${API_URL}/api/media/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        setMedia(media.filter(m => m._id !== id));
        alert("Media file deleted successfully.");
      } else {
        alert("Failed to delete media.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("URL copied to clipboard!");
  };

  // --- Settings Handlers ---
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSettingsSaveLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        alert("Settings saved successfully!");
        refreshSettings(); // refresh global LogoContext state
      } else {
        alert("Failed to update settings.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating settings.");
    } finally {
      setSettingsSaveLoading(false);
    }
  };

  // --- FAQ Handlers ---
  const handleFaqFormSubmit = async (e) => {
    e.preventDefault();
    setFaqSubmitLoading(true);
    try {
      const url = editingFaq 
        ? `${API_URL}/api/faqs/${editingFaq._id}` 
        : `${API_URL}/api/faqs`;
      
      const method = editingFaq ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(faqForm)
      });

      if (res.ok) {
        alert(editingFaq ? "FAQ updated successfully!" : "FAQ created successfully!");
        setShowFaqForm(false);
        setEditingFaq(null);
        setFaqForm({ question: "", answer: "", order: 0 });
        const token = localStorage.getItem("agn_token");
        fetchFaqs(token);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to save FAQ.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving FAQ.");
    } finally {
      setFaqSubmitLoading(false);
    }
  };

  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question || "",
      answer: faq.answer || "",
      order: faq.order || 0
    });
    setShowFaqForm(true);
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`${API_URL}/api/faqs/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        setFaqs(faqs.filter(f => f._id !== id));
        alert("FAQ deleted successfully.");
      } else {
        alert("Failed to delete FAQ.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filter FAQs
  const filteredFaqs = faqs.filter(f => {
    const query = faqSearch.toLowerCase();
    return (f.question || "").toLowerCase().includes(query) ||
           (f.answer || "").toLowerCase().includes(query);
  });

  // Filter Leads
  const filteredChatLeads = chatLeads.filter(c => {
    if (!c) return false;
    const query = leadsSearch.toLowerCase();
    const matchQuery = 
      (c.name || "").toLowerCase().includes(query) ||
      (c.email || "").toLowerCase().includes(query) ||
      (c.mobile || "").includes(query) ||
      (c.businessName || "").toLowerCase().includes(query) ||
      (c.selectedService || "").toLowerCase().includes(query);
    
    if (leadsFilter === "all") return matchQuery;
    return matchQuery && (c.selectedService || "").toLowerCase().includes(leadsFilter.toLowerCase());
  });

  const filteredContactLeads = contactLeads.filter(c => {
    if (!c) return false;
    const query = leadsSearch.toLowerCase();
    const matchQuery = 
      (c.name || "").toLowerCase().includes(query) ||
      (c.email || "").toLowerCase().includes(query) ||
      (c.phone || "").includes(query) ||
      (c.garageName || "").toLowerCase().includes(query) ||
      (c.interestedIn || "").toLowerCase().includes(query);

    if (leadsFilter === "all") return matchQuery;
    return matchQuery && (c.interestedIn || "").toLowerCase().includes(leadsFilter.toLowerCase());
  });

  // Filter Blogs
  const filteredBlogs = blogs.filter(b => {
    const query = blogSearch.toLowerCase();
    return b.title.toLowerCase().includes(query) || 
           b.category.toLowerCase().includes(query) ||
           b.excerpt.toLowerCase().includes(query);
  });

  // Filter Media
  const filteredMedia = media.filter(m => {
    const query = mediaSearch.toLowerCase();
    return (m.original_filename || "").toLowerCase().includes(query) ||
           (m.title || "").toLowerCase().includes(query) ||
           (m.format || "").toLowerCase().includes(query) ||
           (m.resource_type || "").toLowerCase().includes(query);
  });

  // Main UI render
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Admin Control Suite"
        description="Administrative panel for Auto Garage Network."
        canonicalPath="/admin"
      />
      <Navbar />

      {/* Main panel layout */}
      <main className="flex-grow pt-24 pb-16 px-6 lg:px-12 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
          <div className="bg-[#0c1222] border border-white/10 p-6 rounded-3xl shadow-xl space-y-6">
            <div>
              <span className="text-[10px] tracking-widest font-black uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                System Admin
              </span>
              <h2 className="text-lg font-black text-white mt-3 truncate">{adminName}</h2>
              <p className="text-gray-500 text-xs truncate">admin@autogaragenetwork.com</p>
            </div>

            <nav className="flex flex-col gap-1.5 border-t border-white/5 pt-5">
              <button
                onClick={() => { setActiveTab("contact-leads"); setShowBlogForm(false); setShowContactForm(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "contact-leads"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FiDatabase size={16} />
                <span>Contact Form Requests</span>
              </button>

              <button
                onClick={() => { setActiveTab("chat-leads"); setShowBlogForm(false); setShowChatLeadForm(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "chat-leads"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FiMessageSquare size={16} />
                <span>Chatbot Assistant Leads</span>
              </button>

              <button
                onClick={() => { setActiveTab("blogs"); setShowFaqForm(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "blogs"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FiLayers size={16} />
                <span>Manage Blogs</span>
              </button>

              <button
                onClick={() => { setActiveTab("faqs"); setShowFaqForm(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "faqs"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FiHelpCircle size={16} />
                <span>Manage FAQs</span>
              </button>

              <button
                onClick={() => { setActiveTab("media"); setShowBlogForm(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "media"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FiImage size={16} />
                <span>Media Gallery</span>
              </button>

              <button
                onClick={() => { setActiveTab("settings"); setShowBlogForm(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FiSettings size={16} />
                <span>Site Settings</span>
              </button>
            </nav>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all border border-rose-500/10 cursor-pointer mt-4"
            >
              <FiLogOut size={16} />
              <span>Logout Session</span>
            </button>
          </div>
        </aside>

        {/* Dashboard Panels */}
        <section className="flex-grow min-w-0 bg-[#0c1222] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* TAB 1: Contact Form Requests */}
          {activeTab === "contact-leads" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Contact Form Requests</h1>
                  <p className="text-gray-400 text-xs">Manage incoming visitor requests submitted via the Contact Us form.</p>
                </div>
                <div className="flex items-center gap-3">
                  {!showContactForm && (
                    <button
                      onClick={() => {
                        setEditingContact(null);
                        setContactForm({
                          name: "",
                          garageName: "",
                          email: "",
                          phone: "",
                          interestedIn: "Garage Management System",
                          address: "",
                          message: ""
                        });
                        setShowContactForm(true);
                      }}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      <FiPlus />
                      <span>Add Contact</span>
                    </button>
                  )}
                  <button
                    onClick={downloadContactLeadsExcel}
                    className="flex items-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    <FiDownload />
                    <span>Export Excel</span>
                  </button>
                </div>
              </div>

              {showContactForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#050816]/70 border border-white/10 p-6 rounded-3xl space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-sm uppercase font-black tracking-widest text-indigo-400">
                      {editingContact ? "Edit Contact Lead" : "Create New Contact Lead"}
                    </h3>
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      <FiX size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleContactFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Garage Name</label>
                        <input
                          type="text"
                          value={contactForm.garageName}
                          onChange={(e) => setContactForm({ ...contactForm, garageName: e.target.value })}
                          placeholder="e.g. AutoTech Services"
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="e.g. john@example.com"
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="e.g. +1 234 567 890"
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Interested In / Services</label>
                        <select
                          value={contactForm.interestedIn}
                          onChange={(e) => setContactForm({ ...contactForm, interestedIn: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white cursor-pointer"
                        >
                          <option value="Garage Management System">Garage Management System</option>
                          <option value="Autotech Data Integration">Autotech Data Integration</option>
                          <option value="SEO / Marketing / Branding">SEO / Marketing / Branding</option>
                          <option value="Custom Web Development">Custom Web Development</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Address / Location</label>
                        <input
                          type="text"
                          value={contactForm.address}
                          onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                          placeholder="e.g. London, UK"
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Message / Notes</label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Additional notes or message from the lead..."
                        className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white font-sans"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={contactSubmitLoading}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        {contactSubmitLoading ? "Saving..." : editingContact ? "Update Contact" : "Create Contact"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <>
                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#050816] border border-white/10 p-4 rounded-2xl col-span-2 sm:col-span-1">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Web Contacts</span>
                      <p className="text-2xl font-black text-emerald-400 mt-1">{contactLeads.length}</p>
                    </div>
                    <div className="bg-[#050816] border border-white/10 p-4 rounded-2xl col-span-2 sm:col-span-1">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Logo</span>
                      <p className="text-xs font-semibold text-slate-200 mt-2 truncate" title={logoUrl}>{logoUrl}</p>
                    </div>
                    <div className="bg-[#050816] border border-white/10 p-4 rounded-2xl col-span-2 md:col-span-2">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Navbar lining</span>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: navbarLineColor === "indigo" ? "#6366f1" : navbarLineColor }} />
                        <span className="text-xs font-bold text-slate-200 capitalize">{navbarLineColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Filters / Search */}
                  <div className="bg-[#050816] p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:w-80">
                      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search by name, email, company..."
                        value={leadsSearch}
                        onChange={(e) => setLeadsSearch(e.target.value)}
                        className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-white placeholder-gray-500"
                      />
                    </div>

                    <div className="w-full sm:w-48">
                      <select
                        value={leadsFilter}
                        onChange={(e) => setLeadsFilter(e.target.value)}
                        className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-white cursor-pointer"
                      >
                        <option value="all">All Services</option>
                        <option value="gms">Garage System</option>
                        <option value="website">Website Dev</option>
                        <option value="seo">SEO/Marketing</option>
                      </select>
                    </div>
                  </div>

                  {/* Contacts Table */}
                  <div className="overflow-x-auto bg-[#050816]/30 border border-white/5 rounded-2xl">
                    {filteredContactLeads.length === 0 ? (
                      <p className="text-center text-gray-500 py-10 text-xs">No contact form requests matching filters.</p>
                    ) : (
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="border-b border-white/5 bg-[#050816]/80 text-gray-400 uppercase tracking-wider font-bold text-[10px]">
                            <th className="py-3 px-5">Contact Details</th>
                            <th className="py-3 px-5">Garage Name</th>
                            <th className="py-3 px-5">Interest</th>
                            <th className="py-3 px-5">Message</th>
                            <th className="py-3 px-5 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredContactLeads.map((c) => (
                            <tr key={c._id} className="hover:bg-white/[0.01]">
                              <td className="py-3 px-5 space-y-0.5">
                                <span className="font-extrabold text-white block text-sm">{c.name}</span>
                                <span className="text-gray-400 block">{c.email}</span>
                                <span className="text-gray-500 text-[10px] block">{c.phone}</span>
                              </td>
                              <td className="py-3 px-5 text-gray-300 font-medium">{c.garageName || "-"}</td>
                              <td className="py-3 px-5">
                                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                                  {c.interestedIn}
                                </span>
                              </td>
                              <td className="py-3 px-5 max-w-xs truncate text-gray-400" title={c.message}>{c.message}</td>
                              <td className="py-3 px-5 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => handleEditContact(c)}
                                    className="text-indigo-400 hover:text-white p-2 hover:bg-indigo-500/20 rounded-xl transition-all cursor-pointer"
                                    title="Edit contact"
                                  >
                                    <FiEdit2 size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteContact(c._id)}
                                    className="text-rose-400 hover:text-white p-2 hover:bg-rose-500/20 rounded-xl transition-all cursor-pointer"
                                    title="Delete contact"
                                  >
                                    <FiTrash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 1.5: Chatbot Assistant Leads */}
          {activeTab === "chat-leads" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Chatbot Assistant Leads</h1>
                  <p className="text-gray-400 text-xs">Manage incoming customer requests gathered by the interactive Chatbot Assistant.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={downloadChatLeadsExcel}
                    className="flex items-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    <FiDownload />
                    <span>Export Excel</span>
                  </button>
                </div>
              </div>

              {showChatLeadForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#050816]/70 border border-white/10 p-6 rounded-3xl space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-sm uppercase font-black tracking-widest text-indigo-400">
                      Edit Chatbot Lead Details
                    </h3>
                    <button
                      onClick={() => setShowChatLeadForm(false)}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      <FiX size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleChatLeadFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Visitor Name</label>
                        <input
                          type="text"
                          required
                          value={chatLeadForm.name}
                          onChange={(e) => setChatLeadForm({ ...chatLeadForm, name: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Business / Company Name</label>
                        <input
                          type="text"
                          value={chatLeadForm.businessName}
                          onChange={(e) => setChatLeadForm({ ...chatLeadForm, businessName: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                        <input
                          type="email"
                          value={chatLeadForm.email}
                          onChange={(e) => setChatLeadForm({ ...chatLeadForm, email: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Mobile Number</label>
                        <input
                          type="text"
                          value={chatLeadForm.mobile}
                          onChange={(e) => setChatLeadForm({ ...chatLeadForm, mobile: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Selected Service / Interest</label>
                        <input
                          type="text"
                          value={chatLeadForm.selectedService}
                          onChange={(e) => setChatLeadForm({ ...chatLeadForm, selectedService: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Budget Range</label>
                        <input
                          type="text"
                          value={chatLeadForm.budgetRange}
                          onChange={(e) => setChatLeadForm({ ...chatLeadForm, budgetRange: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Project Deadline</label>
                        <input
                          type="text"
                          value={chatLeadForm.projectDeadline}
                          onChange={(e) => setChatLeadForm({ ...chatLeadForm, projectDeadline: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Lead Status</label>
                        <select
                          value={chatLeadForm.leadStatus}
                          onChange={(e) => setChatLeadForm({ ...chatLeadForm, leadStatus: e.target.value })}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white cursor-pointer"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Closed / Signed">Closed / Signed</option>
                          <option value="Lost / Unresponsive">Lost / Unresponsive</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Project / Problem Description</label>
                      <textarea
                        rows={3}
                        value={chatLeadForm.projectDescription}
                        onChange={(e) => setChatLeadForm({ ...chatLeadForm, projectDescription: e.target.value })}
                        className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white font-sans"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setShowChatLeadForm(false)}
                        className="bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={chatLeadSubmitLoading}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        {chatLeadSubmitLoading ? "Saving..." : "Update Chat Lead"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <>
                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#050816] border border-white/10 p-4 rounded-2xl col-span-2 sm:col-span-1">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Chat Leads</span>
                      <p className="text-2xl font-black text-indigo-400 mt-1">{chatLeads.length}</p>
                    </div>
                    <div className="bg-[#050816] border border-white/10 p-4 rounded-2xl col-span-2 sm:col-span-1">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Logo</span>
                      <p className="text-xs font-semibold text-slate-200 mt-2 truncate" title={logoUrl}>{logoUrl}</p>
                    </div>
                    <div className="bg-[#050816] border border-white/10 p-4 rounded-2xl col-span-2 md:col-span-2">
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Navbar lining</span>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: navbarLineColor === "indigo" ? "#6366f1" : navbarLineColor }} />
                        <span className="text-xs font-bold text-slate-200 capitalize">{navbarLineColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Filters / Search */}
                  <div className="bg-[#050816] p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:w-80">
                      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search by name, email, company..."
                        value={leadsSearch}
                        onChange={(e) => setLeadsSearch(e.target.value)}
                        className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-white placeholder-gray-500"
                      />
                    </div>

                    <div className="w-full sm:w-48">
                      <select
                        value={leadsFilter}
                        onChange={(e) => setLeadsFilter(e.target.value)}
                        className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-white cursor-pointer"
                      >
                        <option value="all">All Services</option>
                        <option value="gms">Garage System</option>
                        <option value="website">Website Dev</option>
                        <option value="seo">SEO/Marketing</option>
                      </select>
                    </div>
                  </div>

                  {/* Chatbot Leads Table */}
                  <div className="overflow-x-auto bg-[#050816]/30 border border-white/5 rounded-2xl">
                    {filteredChatLeads.length === 0 ? (
                      <p className="text-center text-gray-500 py-10 text-xs">No chatbot leads found matching search.</p>
                    ) : (
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="border-b border-white/5 bg-[#050816]/80 text-gray-400 uppercase tracking-wider font-bold text-[10px]">
                            <th className="py-3 px-5">Visitor / Details</th>
                            <th className="py-3 px-5">Business</th>
                            <th className="py-3 px-5">Service / Budget</th>
                            <th className="py-3 px-5">Chat Log</th>
                            <th className="py-3 px-5 text-center">Submitted Date</th>
                            <th className="py-3 px-5 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredChatLeads.map((ch) => (
                            <tr key={ch._id} className="hover:bg-white/[0.01]">
                              <td className="py-3 px-5 space-y-0.5">
                                <span className="font-extrabold text-white block text-sm">{ch.name}</span>
                                {ch.email && <span className="text-gray-400 block">{ch.email}</span>}
                                {ch.mobile && <span className="text-gray-500 text-[10px] block">{ch.mobile}</span>}
                              </td>
                              <td className="py-3 px-5 text-gray-300 font-medium">{ch.businessName || "-"}</td>
                              <td className="py-3 px-5 space-y-1">
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold text-[10px] block w-max">
                                  {ch.selectedService || "Inquiry"}
                                </span>
                                {ch.budgetRange && (
                                  <span className="text-gray-400 text-[10px] block">Budget: {ch.budgetRange}</span>
                                )}
                                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md block w-max ${
                                  ch.leadStatus === "New" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                  ch.leadStatus === "Contacted" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                  ch.leadStatus === "In Progress" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" :
                                  ch.leadStatus === "Closed / Signed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                  "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                }`}>
                                  {ch.leadStatus || "New"}
                                </span>
                              </td>
                              <td className="py-3 px-5">
                                <button
                                  onClick={() => setSelectedChat(ch)}
                                  className="flex items-center gap-1 text-indigo-400 hover:text-white bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-600 hover:border-indigo-500 px-3 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer"
                                >
                                  <FiMessageSquare size={12} />
                                  <span>View Logs ({ch.chatMessages?.length || 0})</span>
                                </button>
                              </td>
                              <td className="py-3 px-5 text-center text-gray-400 font-medium">
                                {new Date(ch.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-5 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => handleEditChatLead(ch)}
                                    className="text-indigo-400 hover:text-white p-2 hover:bg-indigo-500/20 rounded-xl transition-all cursor-pointer"
                                    title="Edit chat lead"
                                  >
                                    <FiEdit2 size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteChatLead(ch._id)}
                                    className="text-rose-400 hover:text-white p-2 hover:bg-rose-500/20 rounded-xl transition-all cursor-pointer"
                                    title="Delete chat lead"
                                  >
                                    <FiTrash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 2: Manage Blogs */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Manage Blogs</h1>
                  <p className="text-gray-400 text-xs">Add, edit, or delete automotive industry articles.</p>
                </div>
                {!showBlogForm && (
                  <button
                    onClick={() => {
                      setEditingBlog(null);
                      setBlogForm({
                        title: "",
                        category: "Workflow Optimization",
                        readTime: "5 min read",
                        excerpt: "",
                        content: "",
                        color: "bg-blue-500/10 text-blue-400",
                        image: ""
                      });
                      setShowBlogForm(true);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    <FiPlus />
                    <span>Create New Blog</span>
                  </button>
                )}
              </div>

              {/* Show Add/Edit Form */}
              {showBlogForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#050816]/70 border border-white/10 p-6 rounded-3xl space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-sm uppercase font-black tracking-widest text-indigo-400">
                      {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                    </h3>
                    <button
                      onClick={() => setShowBlogForm(false)}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      <FiX size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleBlogFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Blog Title</label>
                        <input
                          type="text"
                          required
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          placeholder="e.g. 5 Tips to Optimize Workshop Scheduling"
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Category</label>
                        <select
                          value={blogForm.category}
                          onChange={(e) => {
                            const cat = e.target.value;
                            const matchedColor = categoryColors.find(c => c.name.toLowerCase().includes(cat.split(" ")[0].toLowerCase()))?.class || "bg-indigo-500/10 text-indigo-400";
                            setBlogForm({ ...blogForm, category: cat, color: matchedColor });
                          }}
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white cursor-pointer"
                        >
                          <option value="Workflow Optimization">Workflow Optimization</option>
                          <option value="Industry & News">Industry & News</option>
                          <option value="Garage Automation">Garage Automation</option>
                          <option value="Customer Relations">Customer Relations</option>
                          <option value="Efficiency Tips">Efficiency Tips</option>
                          <option value="Case Studies">Case Studies</option>
                          <option value="Guides & Tutorials">Guides & Tutorials</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Read Time</label>
                        <input
                          type="text"
                          required
                          value={blogForm.readTime}
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                          placeholder="e.g. 5 min read"
                          className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                        />
                      </div>

                      {/* Cover Image Selector */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Cover Image URL</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            required
                            value={blogForm.image}
                            onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                            placeholder="Direct URL, upload from computer, or choose from gallery"
                            className="flex-grow bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                          />
                          <div className="flex gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setShowMediaPickerModal(true)}
                              className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer"
                            >
                              Gallery
                            </button>
                            <label className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md">
                              <FiUploadCloud size={14} />
                              <span>Upload File</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleBlogImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Short Excerpt (Intro Text)</label>
                      <input
                        type="text"
                        required
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        placeholder="Brief summary showing on the card listings..."
                        className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Blog Content (Detailed Text)</label>
                        <span className="text-[9px] text-gray-500">Separating paragraphs with blank line is supported.</span>
                      </div>
                      <textarea
                        required
                        rows={8}
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        placeholder="Write the full post contents here..."
                        className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white font-sans"
                      />
                    </div>

                    {/* Previews if cover is set */}
                    {blogForm.image && (
                      <div className="bg-[#050816] border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                        <img src={blogForm.image} alt="Preview" className="w-24 h-16 object-cover rounded-lg border border-white/10" />
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image Selected</p>
                          <span className="text-[11px] text-gray-500 truncate block max-w-xs lg:max-w-md">{blogForm.image}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => setShowBlogForm(false)}
                        className="bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={blogSubmitLoading}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        {blogSubmitLoading ? "Saving..." : editingBlog ? "Update Post" : "Publish Post"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                /* Blogs grid list */
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative w-full">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search blogs by title, tags..."
                      value={blogSearch}
                      onChange={(e) => setBlogSearch(e.target.value)}
                      className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-white placeholder-gray-500"
                    />
                  </div>

                  {filteredBlogs.length === 0 ? (
                    <div className="text-center py-16">
                      <FiLayers className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <h4 className="text-white font-bold mb-1">No Blog Posts</h4>
                      <p className="text-gray-500 text-xs max-w-xs mx-auto">Click "Create New Blog" to write your first automotive post.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredBlogs.map((b) => (
                        <div key={b._id} className="bg-[#050816] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/20 transition-all">
                          <div className="relative aspect-video max-h-40 overflow-hidden bg-black/30">
                            <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                            <span className="absolute top-3 left-3 bg-[#0c1222]/80 backdrop-blur-md text-indigo-400 text-[9px] uppercase font-black px-2.5 py-1 rounded-full border border-white/5">
                              {b.category}
                            </span>
                          </div>
                          
                          <div className="p-5 flex-grow space-y-2 text-left">
                            <div className="flex gap-2 text-[10px] text-gray-500">
                              <span>{b.date}</span>
                              <span>&bull;</span>
                              <span>{b.readTime}</span>
                            </div>
                            <h4 className="text-sm font-extrabold text-white line-clamp-2 leading-snug">{b.title}</h4>
                            <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{b.excerpt}</p>
                          </div>

                          <div className="p-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-bold truncate max-w-xs">{b._id}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditBlog(b)}
                                className="p-2 hover:bg-indigo-500/20 text-indigo-400 hover:text-white rounded-lg transition-all cursor-pointer"
                                title="Edit post"
                              >
                                <FiEdit2 size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(b._id)}
                                className="p-2 hover:bg-rose-500/20 text-rose-400 hover:text-white rounded-lg transition-all cursor-pointer"
                                title="Delete post"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Media Gallery */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Media Manager</h1>
                  <p className="text-gray-400 text-xs">Upload images and videos to Cloudinary and query links.</p>
                </div>
              </div>

              {/* Upload Dropzone form */}
              <div className="bg-[#050816] border border-white/10 p-5 rounded-2xl text-left">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">
                  Upload Media File to Cloudinary
                </h4>

                <form onSubmit={handleMediaUpload} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">File Title (Optional)</label>
                      <input
                        type="text"
                        value={mediaTitle}
                        onChange={(e) => setMediaTitle(e.target.value)}
                        placeholder="e.g. Engine diagnostics vector"
                        className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Short Description (Optional)</label>
                      <input
                        type="text"
                        value={mediaDesc}
                        onChange={(e) => setMediaDesc(e.target.value)}
                        placeholder="Brief summary..."
                        className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Dropzone container */}
                  <div className="border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-2xl p-6 text-center cursor-pointer transition-all bg-[#050816]/40 relative group">
                    <input
                      id="media-file-input"
                      type="file"
                      required
                      accept="image/*,video/*"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                      <FiUploadCloud size={32} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
                      <p className="text-xs font-bold text-white">
                        {selectedFile ? selectedFile.name : "Select Image or Video"}
                      </p>
                      <span className="text-[10px] text-gray-500">
                        {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : "Drag and drop or click here to browse"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={mediaUploadLoading || !selectedFile}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer disabled:opacity-40 transition-all flex items-center gap-2"
                    >
                      {mediaUploadLoading ? "Uploading to Cloudinary..." : "Start Upload"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Uploaded Assets ({media.length})</h3>
                  
                  <div className="relative w-48 lg:w-64">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={12} />
                    <input
                      type="text"
                      placeholder="Filter by name..."
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      className="w-full bg-[#050816] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-[11px] focus:outline-none focus:border-indigo-500 text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {filteredMedia.length === 0 ? (
                  <p className="text-center text-gray-500 py-10 text-xs">No media files found.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMedia.map((m) => (
                      <div key={m._id} className="bg-[#050816] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/15 transition-all group relative">
                        
                        {/* Image/Video Preview */}
                        <div className="aspect-video overflow-hidden bg-black/40 relative flex items-center justify-center border-b border-white/5">
                          {m.resource_type === "video" ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <video src={m.secure_url} className="w-full h-full object-cover" muted />
                              <span className="absolute bottom-2 right-2 bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                                <FiVideo size={8} /> Video
                              </span>
                            </div>
                          ) : (
                            <img src={m.secure_url} alt={m.title} className="w-full h-full object-cover" />
                          )}
                        </div>

                        {/* Text info */}
                        <div className="p-3 text-left space-y-1">
                          <p className="text-white font-extrabold text-[11px] truncate" title={m.original_filename}>
                            {m.title || m.original_filename}
                          </p>
                          <span className="text-gray-500 text-[9px] uppercase tracking-wider block">
                            {m.format} &bull; {m.resource_type}
                          </span>
                        </div>

                        {/* Hover Overlay actions */}
                        <div className="p-2 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                          <button
                            onClick={() => copyToClipboard(m.secure_url)}
                            className="p-1.5 bg-indigo-500/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all cursor-pointer flex items-center justify-center"
                            title="Copy URL"
                          >
                            <FiCopy size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteMedia(m._id)}
                            className="p-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg transition-all cursor-pointer flex items-center justify-center"
                            title="Delete File"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: FAQs */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Manage FAQs</h1>
                  <p className="text-gray-400 text-xs">Create, update, and organize the Frequently Asked Questions displayed on the main website.</p>
                </div>
                <div className="flex items-center gap-3">
                  {!showFaqForm && (
                    <button
                      onClick={() => {
                        setEditingFaq(null);
                        setFaqForm({ question: "", answer: "", order: 0 });
                        setShowFaqForm(true);
                      }}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      <FiPlus />
                      <span>Add New FAQ</span>
                    </button>
                  )}
                </div>
              </div>

              {showFaqForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#050816]/70 border border-white/10 p-6 rounded-3xl space-y-6 text-left"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-sm uppercase font-black tracking-widest text-indigo-400">
                      {editingFaq ? "Edit FAQ" : "Create New FAQ"}
                    </h3>
                    <button onClick={() => setShowFaqForm(false)} className="text-gray-400 hover:text-white cursor-pointer">
                      <FiX size={18} />
                    </button>
                  </div>
                  <form onSubmit={handleFaqFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Question</label>
                      <input type="text" required value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} placeholder="Enter question..." className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Answer</label>
                      <textarea rows={4} required value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} placeholder="Enter detailed answer..." className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Sort Order (Optional)</label>
                      <input type="number" value={faqForm.order} onChange={(e) => setFaqForm({ ...faqForm, order: Number(e.target.value) })} className="w-full max-w-xs bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                      <button type="button" onClick={() => setShowFaqForm(false)} className="bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer">Cancel</button>
                      <button type="submit" disabled={faqSubmitLoading} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl disabled:opacity-50 cursor-pointer">
                        {faqSubmitLoading ? "Saving..." : editingFaq ? "Update FAQ" : "Save FAQ"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <>
                  <div className="bg-[#050816] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div className="relative w-full max-w-md">
                      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="text" placeholder="Search FAQs..." value={faqSearch} onChange={(e) => setFaqSearch(e.target.value)} className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-white" />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto bg-[#050816]/30 border border-white/5 rounded-2xl">
                    {filteredFaqs.length === 0 ? (
                      <p className="text-center text-gray-500 py-10 text-xs">No FAQs found.</p>
                    ) : (
                      <table className="w-full border-collapse text-left text-xs">
                        <thead>
                          <tr className="border-b border-white/5 bg-[#050816]/80 text-gray-400 uppercase font-bold text-[10px]">
                            <th className="py-3 px-5">Order</th>
                            <th className="py-3 px-5">Question</th>
                            <th className="py-3 px-5">Answer</th>
                            <th className="py-3 px-5 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredFaqs.map(f => (
                            <tr key={f._id} className="hover:bg-white/[0.01]">
                              <td className="py-3 px-5 font-bold text-gray-400">{f.order}</td>
                              <td className="py-3 px-5 font-bold text-white max-w-[200px] truncate">{f.question}</td>
                              <td className="py-3 px-5 text-gray-400 max-w-xs truncate">{f.answer}</td>
                              <td className="py-3 px-5 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button onClick={() => handleEditFaq(f)} className="text-indigo-400 hover:text-white p-2 hover:bg-indigo-500/20 rounded-xl cursor-pointer" title="Edit FAQ"><FiEdit2 size={14}/></button>
                                  <button onClick={() => handleDeleteFaq(f._id)} className="text-rose-400 hover:text-white p-2 hover:bg-rose-500/20 rounded-xl cursor-pointer" title="Delete FAQ"><FiTrash2 size={14}/></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 4: Site Settings */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white">General Settings</h1>
                <p className="text-gray-400 text-xs">Configure site branding and navbar bottom line styling.</p>
              </div>

              <form onSubmit={handleSettingsSubmit} className="bg-[#050816]/70 border border-white/10 p-6 rounded-3xl space-y-6 text-left">
                
                {/* Logo Section */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dynamic Logo File URL</label>
                  <p className="text-gray-500 text-[10px]">Provide the logo URL (Cloudinary or local) that will update across Navbar, Footer, and SEO Header.</p>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      required
                      value={settingsForm.logoUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                      placeholder="e.g. /logo-color.png"
                      className="flex-grow bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        // Open a simple media picker to copy/select
                        alert("Select any image URL from Media Manager and paste here.");
                        setActiveTab("media");
                      }}
                      className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      Browse Media
                    </button>
                  </div>

                  {settingsForm.logoUrl && (
                    <div className="mt-3 bg-[#050816] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[9px] text-gray-500 font-extrabold uppercase block">Branding Preview</span>
                        <img src={settingsForm.logoUrl} alt="Branding Preview" className="h-10 w-auto object-contain mt-2 bg-slate-900/60 p-1.5 rounded" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, logoUrl: "/logo-color.png" })}
                        className="text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
                      >
                        Reset Default
                      </button>
                    </div>
                  )}
                </div>

                {/* Lining Section */}
                <div className="space-y-2 border-t border-white/5 pt-5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Navbar Bottom Lining Color</label>
                  <p className="text-gray-500 text-[10px]">Define the line/border color under the top navbar when scrolled. You can select a preset or type any custom HEX value.</p>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
                    {["indigo", "blue", "violet", "emerald", "cyan", "pink", "none"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, navbarLineColor: c })}
                        className={`px-3 py-2 rounded-xl text-center text-xs font-bold border transition-all capitalize cursor-pointer ${
                          settingsForm.navbarLineColor === c
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                            : "bg-[#050816] border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase">Or Custom Color (HEX / RGB)</label>
                    <input
                      type="text"
                      value={settingsForm.navbarLineColor}
                      onChange={(e) => setSettingsForm({ ...settingsForm, navbarLineColor: e.target.value })}
                      placeholder="e.g. #ff007f or rgba(255, 255, 255, 0.2)"
                      className="w-full max-w-xs bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button
                    type="submit"
                    disabled={settingsSaveLoading}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {settingsSaveLoading ? "Saving..." : "Save System Settings"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
      <Footer />

      {/* MODAL 1: Chat Logs View */}
      <AnimatePresence>
        {selectedChat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0c1222] border border-white/10 rounded-3xl w-full max-w-xl max-h-[80vh] flex flex-col text-left overflow-hidden shadow-2xl"
            >
              <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#050816]/40">
                <div>
                  <h3 className="font-extrabold text-white text-base">{selectedChat.name}</h3>
                  <span className="text-[10px] text-gray-500">Service: {selectedChat.selectedService || "General"}</span>
                </div>
                <button
                  onClick={() => setSelectedChat(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-full cursor-pointer bg-white/5 border border-white/5"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="p-5 overflow-y-auto space-y-4 flex-grow max-h-[50vh] bg-[#050816]/10">
                {selectedChat.chatMessages && selectedChat.chatMessages.length > 0 ? (
                  selectedChat.chatMessages.map((m, idx) => {
                    const isBot = m.sender === "bot";
                    return (
                      <div key={idx} className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                          isBot 
                            ? "bg-[#0d1226]/80 text-gray-300 border border-white/5 rounded-tl-none" 
                            : "bg-indigo-600 text-white rounded-tr-none shadow-md"
                        }`}>
                          <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                          <span className={`text-[8px] mt-1 block text-right ${isBot ? "text-gray-500" : "text-indigo-200"}`}>
                            {m.time}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500 text-xs py-8">No messages in chat session log.</p>
                )}
              </div>

              {/* Lead metadata summary */}
              <div className="p-5 border-t border-white/5 bg-[#050816]/40 space-y-2 text-[11px] text-gray-400">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-500 block">Contact Info</span>
                    {selectedChat.email && <span className="block">{selectedChat.email}</span>}
                    {selectedChat.mobile && <span className="block">{selectedChat.mobile}</span>}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gray-500 block">Business & Budget</span>
                    <span>{selectedChat.businessName || "-"}</span>
                    {selectedChat.budgetRange && <span className="block">Budget: {selectedChat.budgetRange}</span>}
                  </div>
                </div>
                {selectedChat.projectDescription && (
                  <div className="border-t border-white/5 pt-2">
                    <span className="text-[9px] uppercase font-bold text-gray-500 block">Project / Problem Details</span>
                    <p className="leading-relaxed">{selectedChat.projectDescription}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Media Asset Picker inside Blog Form */}
      <AnimatePresence>
        {showMediaPickerModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0c1222] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col text-left overflow-hidden shadow-2xl"
            >
              <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#050816]/40">
                <div>
                  <h3 className="font-extrabold text-white text-base">Select Cover Image</h3>
                  <p className="text-gray-500 text-[10px]">Choose an asset to set as cover. Click to select.</p>
                </div>
                <button
                  onClick={() => setShowMediaPickerModal(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-full cursor-pointer bg-white/5 border border-white/5"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Assets list */}
              <div className="p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 flex-grow max-h-[60vh]">
                {media.length === 0 ? (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 text-xs">No media assets in gallery. Please upload some assets under Media tab first.</p>
                  </div>
                ) : (
                  media.filter(m => m.resource_type === "image").map((m) => (
                    <div
                      key={m._id}
                      onClick={() => {
                        setBlogForm({ ...blogForm, image: m.secure_url });
                        setShowMediaPickerModal(false);
                      }}
                      className="bg-[#050816] border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-indigo-500 transition-all aspect-video relative group flex items-center justify-center bg-black/30"
                    >
                      <img src={m.secure_url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] text-white font-extrabold bg-indigo-600 px-3 py-1 rounded-lg">Select Asset</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;

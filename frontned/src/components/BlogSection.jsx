import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiX,
  FiCalendar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

// Blog images are now fetched dynamically from the backend static folder
const getCategoryStyles = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes("workflow")) {
    return "bg-blue-600/90 text-white border-blue-500/30 shadow-md shadow-blue-500/20";
  }
  if (cat.includes("news") || cat.includes("industry")) {
    return "bg-indigo-600/90 text-white border-indigo-500/30 shadow-md shadow-indigo-500/20";
  }
  if (cat.includes("automation")) {
    return "bg-purple-600/90 text-white border-purple-500/30 shadow-md shadow-purple-500/20";
  }
  if (cat.includes("customer") || cat.includes("relations")) {
    return "bg-emerald-600/90 text-white border-emerald-500/30 shadow-md shadow-emerald-500/20";
  }
  if (cat.includes("efficiency")) {
    return "bg-rose-600/90 text-white border-rose-500/30 shadow-md shadow-rose-500/20";
  }
  if (cat.includes("case")) {
    return "bg-cyan-600/90 text-white border-cyan-500/30 shadow-md shadow-cyan-500/20";
  }
  if (cat.includes("guide")) {
    return "bg-amber-600/90 text-white border-amber-500/30 shadow-md shadow-amber-500/20";
  }
  if (cat.includes("features")) {
    return "bg-teal-600/90 text-white border-teal-500/30 shadow-md shadow-teal-500/20";
  }
  if (cat.includes("diary")) {
    return "bg-teal-600/90 text-white border-teal-500/30 shadow-md shadow-teal-500/20";
  }
  return "bg-slate-600/90 text-white border-slate-500/30 shadow-md shadow-slate-500/20";
};

const getHoverTextColor = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes("workflow")) return "group-hover:text-blue-400";
  if (cat.includes("news") || cat.includes("industry"))
    return "group-hover:text-indigo-400";
  if (cat.includes("automation")) return "group-hover:text-purple-400";
  if (cat.includes("customer") || cat.includes("relations"))
    return "group-hover:text-emerald-400";
  if (cat.includes("efficiency")) return "group-hover:text-rose-400";
  if (cat.includes("case")) return "group-hover:text-cyan-400";
  if (cat.includes("guide")) return "group-hover:text-amber-400";
  return "group-hover:text-teal-400";
};

const getFilterStyles = (cat, isSelected) => {
  if (!isSelected) {
    return "bg-[#0d1226]/50 text-gray-400 border border-white/5 hover:text-white hover:border-indigo-500/30";
  }
  const name = cat.toLowerCase();
  if (name === "all")
    return "bg-blue-600 text-white shadow-lg shadow-blue-500/30";
  if (name.includes("workflow"))
    return "bg-blue-600 text-white shadow-lg shadow-blue-500/30";
  if (name.includes("news") || name.includes("industry"))
    return "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30";
  if (name.includes("automation"))
    return "bg-purple-600 text-white shadow-lg shadow-purple-500/30";
  if (name.includes("customer") || name.includes("relations"))
    return "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30";
  if (name.includes("efficiency"))
    return "bg-rose-600 text-white shadow-lg shadow-rose-500/30";
  if (name.includes("case"))
    return "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30";
  if (name.includes("guide"))
    return "bg-amber-600 text-white shadow-lg shadow-amber-500/30";
  return "bg-teal-600 text-white shadow-lg shadow-teal-500/30";
};

const generateBlogContent = (post) => {
  const cat = post.category.toLowerCase();

  let p1 = "";
  let p2 = "";
  let p3 = "";

  if (cat.includes("workflow")) {
    p1 =
      "Effective workflow management is the foundation of any successful garage. In the fast-paced automotive industry, scheduling bottlenecks, misallocated day slots, and delayed parts procurement can quickly cascade into lost revenue and unsatisfied customers.";
    p2 =
      "A modern, cloud-based workshop management system solves these pain points by integrating all scheduling operations into a single interactive diary dashboard. Service managers can dynamically reallocate jobs, assign specific technicians based on certifications, and monitor day load limits in real-time. This eliminates downtime and ensures that every lift operates at peak efficiency.";
    p3 =
      "Furthermore, automated parts inventory tracking links direct job bookings with local wholesale API databases. The moment a booking is confirmed, necessary filters, brakes, or diagnostic parts can be reserved or ordered. This dramatically minimizes vehicle-off-road (VOR) times and keeps the service floor running smoothly without administrative drag.";
  } else if (cat.includes("news") || cat.includes("industry")) {
    p1 =
      "The UK automotive and tyre services industry is experiencing significant consolidation and digital transformation. As independent and multi-site garage operations seek to streamline their technical operations, corporate mergers and acquisitions are driving the development of more integrated software ecosystems.";
    p2 =
      "Recent strategic acquisitions, such as Bond International acquiring Worcester-based software provider Tyresoft Ltd., signal a major shift towards all-in-one distribution and management systems. By blending wholesale inventory availability with modern shop scheduling software, garages gain direct, latency-free access to stock lists, customer history, and live market pricing.";
    p3 =
      "For the end consumer and garage owner alike, this means fewer ordering errors, faster turnaround times, and robust support systems. Embracing these integrated digital channels will be vital for workshops aiming to capture market share and sustain profit margins in a highly competitive arena.";
  } else if (cat.includes("automation")) {
    p1 =
      "Digitalisation has become the key to business growth in today’s digital economy. With every industry integrating themselves with technology, they have also been growing. Garages and auto repair shops have also seen a lot of growth in their business as new software has been introduced to streamline their operations and make their working much simpler. In this blog, we are going to discuss in detail what these softwares and how they have helped the garages in the growth of their business.";

    p2 = <h3>What Is The Software For Garage Management?</h3>;
    ("To automate the work and to help make it easy for the garages and auto repair shops to maintain their data, garage management software has been developed. Business owners can use this software for various purposes like including appointments, inventory, staff performance, and more. This has helped both small and large garages and auto repair shops to make their day to day work much easier.");
    p3 =
      "By leveraging systematic garage software, technicians receive digital checklists directly on their mobile devices. They can attach inspection reports, note parts requirements, and upload photos of worn items. The system automatically converts these checklists into professional customer estimates, driving both transparency and workshop revenue.";
  } else if (cat.includes("customer") || cat.includes("relations")) {
    p1 =
      "Building long-term customer loyalty is the primary driver of repeat business for independent workshops. Unlike dealership networks, local garages rely heavily on personal trust, clear pricing transparency, and high-quality service.";
    p2 =
      "Modern garage software enhances customer relations by offering interactive customer portals and automated status notifications. Instead of wondering when their vehicle will be ready, customers receive real-time SMS updates as the car moves from diagnostics to repair and final testing. This level of active communication builds immediate confidence and peace of mind.";
    p3 =
      "Additionally, digital invoice links and transparent diagnostic checklists allow owners to review recommendations online with photos of the parts that require replacement. This open-book approach removes friction, increases estimate approval rates, and creates a highly professional dealership-grade customer experience.";
  } else {
    p1 =
      "Maintaining a competitive edge in today's fast-paced automotive services market requires a blend of technical excellence and state-of-the-art management tools. Workshops that transition away from legacy spreadsheets and manual logs achieve greater visibility and control over their operations.";
    p2 =
      "Using advanced features like automated VRM lookup, direct wholesale parts integrations, and interactive day scheduling allows managers to streamline the entire job lifecycle. Technicians work with clear, digital instruction cards, and parts managers can match stock levels to upcoming jobs automatically.";
    p3 =
      "Ultimately, implementing integrated software solutions leads to higher technician utilization rates, reduced administrative waste, and improved cash flow. The resulting data insights empower business owners to make informed decisions and drive long-term profitability.";
  }

  return { p1, p2, p3 };
};

const BlogModal = ({ post, onClose }) => {
  const { p1, p2, p3 } = generateBlogContent(post);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-2xl bg-[#0c1222] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-44 md:h-52 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width="600"
            height="300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-[#0c1222]/20 to-transparent pointer-events-none modal-image-gradient" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-neutral-50 hover:text-rose-400 hover:scale-105 p-2 rounded-full transition-all focus:outline-none cursor-pointer flex items-center justify-center"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-4.5 overflow-y-auto max-h-[45vh] text-left">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-md ${getCategoryStyles(post.category)}`}
            >
              {post.category}
            </span>
            <span className="text-[11px] text-gray-500 font-semibold">
              {post.date} &bull; {post.readTime}
            </span>
          </div>

          <h2 className="text-lg md:text-2xl font-extrabold text-white leading-tight">
            {post.title}
          </h2>

          <p className="text-gray-400 text-xs md:text-sm font-medium italic border-l-4 border-indigo-500 pl-4">
            {post.excerpt}
          </p>

          <div className="space-y-3.5 text-gray-300 text-xs md:text-sm leading-relaxed">
            {post.content ? (
              post.content.map((item, idx) => {
                if (item.type === "heading") {
                  return (
                    <h3
                      key={idx}
                      className="text-sm md:text-base font-extrabold text-white pt-2.5"
                    >
                      {item.value}
                    </h3>
                  );
                }
                return <p key={idx}>{item.value}</p>;
              })
            ) : (
              <>
                <p>{p1}</p>
                <p>{p2}</p>
                <p>{p3}</p>
              </>
            )}
          </div>
        </div>

        <div className="p-5 bg-[#0a0f24]/20 border-t border-white/5 flex items-center justify-end gap-3 rounded-b-3xl">
          <Link to="/contact-us" onClick={onClose}>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer">
              Book Free Demo
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BlogCard = ({ post, onReadMore }) => {
  const cardRef = React.useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    setRotateX((yc - y) / 12);
    setRotateY((x - xc) / 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const getShadowColor = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("workflow"))
      return "hover:shadow-blue-500/10 hover:border-blue-500/30";
    if (cat.includes("news") || cat.includes("industry"))
      return "hover:shadow-indigo-500/10 hover:border-indigo-500/30";
    if (cat.includes("automation"))
      return "hover:shadow-purple-500/10 hover:border-purple-500/30";
    if (cat.includes("customer") || cat.includes("relations"))
      return "hover:shadow-emerald-500/10 hover:border-emerald-500/30";
    if (cat.includes("efficiency"))
      return "hover:shadow-rose-500/10 hover:border-rose-500/30";
    if (cat.includes("case"))
      return "hover:shadow-cyan-500/10 hover:border-cyan-500/30";
    if (cat.includes("guide"))
      return "hover:shadow-amber-500/10 hover:border-amber-500/30";
    return "hover:shadow-teal-500/10 hover:border-teal-500/30";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onReadMore}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -6 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group cursor-pointer select-none text-left bg-[#0d1226]/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/35 transition-all duration-300 flex flex-col h-full ${getShadowColor(post.category)}`}
    >
      {/* Blog Image wrapper with category tag */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width="600"
          height="300"
        />
        <div
          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0 z-10 backdrop-blur-md transition-all duration-300 ${getCategoryStyles(post.category)}`}
        >
          {post.category}
        </div>
      </div>

      {/* Text details content wrapper */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-gray-400 font-semibold mb-3">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-indigo-500/80" />
              {post.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-gray-700"></span>
            <span className="flex items-center gap-1.5">
              <FiClock className="w-3.5 h-3.5 text-indigo-500/80" />
              {post.readTime}
            </span>
          </div>

          <h3
            className={`text-lg font-extrabold text-white transition-colors leading-snug mb-3 line-clamp-2 h-[56px] ${getHoverTextColor(post.category)}`}
          >
            {post.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 h-[60px] overflow-hidden">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-4">
          <div className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md">
            <span>Read More</span>
            <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlogSection = ({ limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showOthers, setShowOthers] = useState(false);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 9;
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!limit) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, limit]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOthers(false);
      }
    };
    if (showOthers) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOthers]);

  const allCategories = ["All", ...new Set(posts.map((post) => post.category))];
  const cutIndex = allCategories.findIndex(
    (c) =>
      c.toLowerCase().includes("relations") ||
      c.toLowerCase().includes("customer relations"),
  );

  const mainCategories =
    cutIndex !== -1
      ? allCategories.slice(0, cutIndex + 1)
      : allCategories.slice(0, 5);
  const otherCategories =
    cutIndex !== -1 ? allCategories.slice(cutIndex + 1) : allCategories.slice(5);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = limit
    ? filteredPosts.slice(0, limit)
    : filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const getVisiblePages = () => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage < totalPages) {
      return [currentPage, currentPage + 1];
    }
    return [totalPages - 1, totalPages];
  };

  return (
    <section
      id="blog"
      className={`px-6 md:px-12 bg-[#050816] border-b border-white/5 relative overflow-hidden ${limit ? "py-12 md:py-24" : "pt-6 pb-10 md:pb-20"}`}
    >
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {limit && (
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl text-left"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                Latest Insights
              </h2>
              <p className="text-gray-400 text-lg">
                Tips, news, and product updates from the Auto Garage Network
                team.
              </p>
            </motion.div>

            <Link to="/blog">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 3 }}
                className="hidden md:flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 font-extrabold transition-colors cursor-pointer"
              >
                <span>View All Articles</span>
                <FiArrowRight />
              </motion.div>
            </Link>
          </div>
        )}

        {!limit && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-5xl mx-auto transition-all duration-300">
            {mainCategories.map((cat, idx) => (
              <span
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${getFilterStyles(cat, selectedCategory === cat)} cursor-pointer select-none`}
              >
                {cat}
              </span>
            ))}

            {otherCategories.length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <span
                  onClick={() => setShowOthers(!showOthers)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer select-none ${
                    otherCategories.includes(selectedCategory)
                      ? getFilterStyles(selectedCategory, true)
                      : "bg-[#0d1226]/50 text-gray-400 border border-white/5 hover:text-white hover:border-indigo-500/30"
                  }`}
                >
                  <span>
                    {otherCategories.includes(selectedCategory)
                      ? selectedCategory
                      : "Other..."}
                  </span>
                  <span className="opacity-75">
                    {showOthers ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </span>

                <AnimatePresence>
                  {showOthers && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 py-2 w-52 bg-[#0c1222]/90 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-md"
                    >
                      <div className="max-h-60 overflow-y-auto pr-1">
                        {otherCategories.map((cat, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setCurrentPage(1);
                              setShowOthers(false);
                            }}
                            className={`px-4 py-2.5 text-xs md:text-sm text-left transition-colors cursor-pointer select-none font-bold ${
                              selectedCategory === cat
                                ? "bg-blue-600 text-white"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {cat}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-8">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[380px] flex"
              >
                <BlogCard
                  post={post}
                  onReadMore={() => setSelectedPost(post)}
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-20">
              <p className="text-gray-400 text-lg">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedPost && (
            <BlogModal
              post={selectedPost}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </AnimatePresence>

        {/* Pagination UI */}
        {!limit && filteredPosts.length > 0 && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <span className="text-sm text-gray-400 font-medium">
              Showing {indexOfFirstPost + 1} -{" "}
              {Math.min(indexOfLastPost, filteredPosts.length)} of{" "}
              {filteredPosts.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d1226]/50 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/30 transition-colors disabled:opacity-40 disabled:hover:text-gray-400 disabled:hover:border-white/5 cursor-pointer"
                aria-label="Previous page"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm border transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20"
                      : "bg-[#0d1226]/50 border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/30"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d1226]/50 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/30 transition-colors disabled:opacity-40 disabled:hover:text-gray-400 disabled:hover:border-white/5 cursor-pointer"
                aria-label="Next page"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

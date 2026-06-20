import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiX,
  FiCalendar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// Import downloaded blog image assets (Folder: assets)
import workshopImg from "../assets/workshop-management-software-600x300.jpg";
import tyreSoftwareImg from "../assets/international-enters-into-tyre-software-600x300.jpg";
import automateImg from "../assets/The-Automate-Garage-Management-Software-600x300.jpg";
import customerImg from "../assets/garage-software-improve-customer-600x300.jpg";
import efficientImg from "../assets/garage-management-software-efficient-600x300.jpg";
import experienceImg from "../assets/experience-garage-management-software-600x300.jpg";
import vehicleImg from "../assets/garage-managemen-software-vehicle-600x300.jpg";
import toolsImg from "../assets/new_garage-managment-600x300.jpg";

// Extra assets to prevent duplicates
import aboutImg from "../assets/about-img-add.jpg";
import featureImg from "../assets/feature-img3.jpg";
import videoImg from "../assets/video-img-01.png";

// Import downloaded blog image assets (Folder: assets/images)
import taskAutomationImg from "../assets/images/Automate-Tasks-600x300.webp";
import dataImg from "../assets/images/Workshop-Management-Systems-600x300.webp";
import drivingSuccessImg from "../assets/images/Driving-Success-600x300.webp";
import createGarageImg from "../assets/images/create-garage-software-600x300.jpg";
import justifyUseImg from "../assets/images/garage-software-600x300.jpg";
import appAdvantagesImg from "../assets/images/applications-advantages-garage-600x300.jpg";
import purposeAutomotiveImg from "../assets/images/Purpose-of-Automotive-Software-for-Garages-600x300.jpg";
import saveHassleImg from "../assets/images/Garage-Management-Software-Can-Save-Your-Hassle-600x300.jpg";
import streamlineOpsImg from "../assets/images/garage-management-software-600x300.jpg";
import repairShopImg from "../assets/images/Automobile-Repair-Shop-600x300.jpg";
import insightGarageImg from "../assets/images/garagesoftware-600x300.jpg";

// Dashboard and Hero subfolders
import dashboardImg from "../assets/images/dashboard/dashboard.jpg";
import heroImg from "../assets/images/hero/hero.jpg";

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

    p2 = <h1>What Is The Software For Garage Management?</h1>;
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-[#0c1222]/20 to-transparent pointer-events-none" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-rose-400 hover:scale-105 p-2 rounded-full transition-all focus:outline-none cursor-pointer flex items-center justify-center"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-4.5 overflow-y-auto max-h-[45vh] text-left">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${post.color} border border-current/10`}
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
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            Close Reader
          </button>
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
      className={`group cursor-pointer select-none text-left bg-[#0d1226]/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/20 transition-all duration-300 flex flex-col h-full ${getShadowColor(post.category)}`}
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
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${post.color} border border-current/10 shrink-0 z-10`}
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

          <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors leading-snug mb-3 line-clamp-2 h-[56px]">
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
  const postsPerPage = 9;

  useEffect(() => {
    if (!limit) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, limit]);

  const posts = [
    {
      category: "Workflow",
      title:
        "What Role Does Workshop Management System Play in Managing Workshop Workflow?",
      date: "20 May, 2025",
      readTime: "5 min read",
      excerpt:
        "Running a garage can be a very daunting and tough task, especially if you are doing it without any technical help. A modern workshop management system resolves scheduling bottlenecks and streamlines parts ordering.",
      color: "bg-blue-500/10 text-blue-400",
      image: workshopImg,
      content: [
        {
          type: "text",
          value:
            "Running a garage can be a very daunting and tough task, especially if you are doing it without any technical help. You need to do many things in one go, and you also need to manage many tasks at once. You must care for the cars, help customers, keep the tools in order, and ensure everything runs on time. These things might get messy and confusing. Garage Software has been introduced to ease workflow and simultaneously manage all tasks.",
        },
        {
          type: "text",
          value:
            "This helps garages stay organised, work faster, and give better services to customers. Garage management software is a special computer tool made for auto repair shops. It manages all the tough tasks of garages at one stop. You can use this tool for many tasks, see which car is coming for which problem, and whether it gets fixed. This software has proven to be a competent help running the garage smoothly. Read this blog to get the information.",
        },
        {
          type: "heading",
          value: "Keeps Track of All Jobs",
        },
        {
          type: "text",
          value:
            "Sometimes garages don’t correctly note what they need for their cars. By opting for this software, garages can analyse the procedure for what is going on with the vehicle. This system lets you track the car coming to the garage, what it needs, and how you fix it. You don’t need to look at a paper for records, and you don’t need to ask many people to get the details of the car and the work the car needs. The software shows everything on your computer screen and how the work is being completed. This helps the workers focus on their jobs, and they don’t have to waste time searching for information.",
        },
        {
          type: "heading",
          value: "Easy Scheduling",
        },
        {
          type: "text",
          value:
            "This software eases the scheduling process a lot. Customers just need to call or come in to book a service. This software lets people set appointments according to their schedule and needs using their phones and computers. When customers book an appointment and add the time slot, the software automatically adds it to the garage calendar. This allows the garage owners to access the appointments independently and serve their customers. You don’t have to book an appointment for two cars at the same time by mistake. Workers can easily see what jobs are coming up. The garage stays ready on time to fix the car.",
        },
        {
          type: "heading",
          value: "Saves Time on Paperwork",
        },
        {
          type: "text",
          value:
            "Writing everything can take longer, especially when filling out forms or bills. But not anymore, the garage management software is also designed to help you with the paperwork. This software makes the workflow easy by generating bills for you. This software also tells you about the parts used to fix the car and their cost. You don’t need to keep big stacks of paper to write down everything. This makes everything sorted in your computer quickly by saving time and keeping the records safe.",
        },
        {
          type: "heading",
          value: "Helps with Inventory Control",
        },
        {
          type: "text",
          value:
            "The garage uses many parts, like oils, filters, and tyres, but keeping a manual record of everything can be very tough. This inventory work involves what you have and need to buy for your garage. This software keeps a list of everything, along with the restocking. When you use something, the number just goes down and automatically goes to restocking. If you are running low, the software reminds you to order that item. You don’t have to rush for the parts at the end time while performing the repair work. This helps the garage manage its workflow without any delays.",
        },
        {
          type: "heading",
          value: "Keeps the Team Organised",
        },
        {
          type: "text",
          value:
            "Every person in the garage has to do something and has a lot of work as well. Some need to fix the engine, some need to look at restocking the parts, some need to change the oil in the vehicle, and some need to look at administrative work. The software makes the staff workflow more efficient, and they can focus on their other work without worrying about it. This software assigns the work according to their capabilities. This software allows you to give tasks to the right person and set deadlines accordingly. If someone does their job early, they don’t have to sit idle. They can check what the next thing is that they need to do. This keeps the staff busy and helps the garage finish the work on time every day.",
        },
        {
          type: "heading",
          value: "Final Thoughts",
        },
        {
          type: "text",
          value:
            "Garage management software has proven to be a big help to garages and workshops. It eases the garage's workflow and helps them manage their other tasks. This keeps the garage clean, saves time and ensures that the job is done correctly. This helps you to remember all the essential things and keeps the team on track. When the garage runs better, the customers will notice everything. The customers see the positive side of the garage and will return. If the garage still uses paper and simple tools, it may be time to switch to this software. This makes the workflow more manageable and helps the business to grow.",
        },
      ],
    },
    {
      category: "Industry News",
      title:
        "Bond International Enters Into Tyre Software with Tyresoft Ltd. Acquisition",
      date: "01 May, 2025",
      readTime: "4 min read",
      excerpt:
        "Bond International, an established name in the UK tyre industry, has acquired Worcester-based Tyresoft Ltd., expanding its digital ecosystem and capabilities for garages nationwide.",
      color: "bg-indigo-500/10 text-indigo-400",
      image: tyreSoftwareImg,
      content: [
        {
          type: "text",
          value:
            "Bond International, an established name in the UK tyre industry, has acquired Worcester-based Tyresoft Ltd., one of the country's most recognised tyre software providers. The deal effectuates Bond's foothold in the UK's tyre software market.",
        },
        {
          type: "text",
          value:
            'Founded in 2011, Tyresoft Ltd. quickly rose to eminence because of its unique business approach, which offered an "all-purpose complete management system" to the tyre and automobile industries. Marcus Hathaway, the company’s founder, provided groundbreaking solutions to harmonise tyre sales, systematise tyre stock, and strengthen overall tyre business operations.',
        },
        {
          type: "text",
          value:
            "The acquisition strongly indicates Bond’s tactical focus on top-notch infrastructure after escalating its delivery and warehouse capabilities to cover 96% of the UK with same-day service. Bond International's CEO, Charlie Bond, described the deal as “historic” in the company's long-term growth strategy.",
        },
        {
          type: "text",
          value:
            "Bond talked about his company's significant achievement in building a nationwide delivery network; he also added that his company's vision is to gain success in the system development sector, where Tyresoft, as a partner, will play a vital role in upscaling its operations.",
        },
        {
          type: "text",
          value:
            "Hathaway, too, lauded the agreement between the two organisations. He exemplified the new journey as a \"thrilling opportunity\" for the customers. Marcus Hathaway praised Bond International's commitment to quality and innovation and added that the company's values synchronise perfectly with Tyresoft’s ambitions.",
        },
        {
          type: "text",
          value:
            "As part of the accord, Hathaway will soon join Bond International’s Board of Directors as the Director of Systems Development. He will also continue to guide Tyresoft’s software management and direction. On the other hand, Oliver Russell will join Tyresoft as its Managing Director.",
        },
        {
          type: "text",
          value:
            "Last month, Bond International acquired yet another leading tyre brand: Tyrescope. This undoubtedly signals Bond’s business strategy to incorporate high-end digital solutions into the core of its tyre-related operations. By affiliating with giant market leaders in the tyre software space, Bond is diversifying its operations to optimise business efficiency, customer value, and new-age innovation.",
        },
      ],
    },
    {
      category: "Automation",
      title: "Automate All The Work Of Your Garage With Workshop Software",
      date: "15 March, 2025",
      readTime: "6 min read",
      excerpt:
        "Digitalisation has become the key to business growth in today's digital economy. With every industry integrating smart tools, automating billing and client intake ensures maximum throughput for technicians.",
      color: "bg-purple-500/10 text-purple-400",
      image: automateImg,
    },
    {
      category: "Customer Relations",
      title:
        "Does Garage Software Improve Customer Relationship & Competitive Benefits?",
      date: "19 February, 2025",
      readTime: "5 min read",
      excerpt:
        "Customer loyalty and systematic management are two strengths that ensure the success of any business. Learn how automated booking confirmations and technician updates foster direct customer trust.",
      color: "bg-emerald-500/10 text-emerald-400",
      image: customerImg,
    },
    {
      category: "Efficiency",
      title: "Why Is Workshop Management Software Efficient?",
      date: "15 January, 2025",
      readTime: "5 min read",
      excerpt:
        "Nowadays, everything is fast and furious. In this fast-paced automotive industry, paper records cause massive delays. Modern cloud scheduling brings instantaneous efficiency updates to your service desks.",
      color: "bg-rose-500/10 text-rose-400",
      image: efficientImg,
    },
    {
      category: "Case Study",
      title: "Want to Know About Our Experience with Garage Software?",
      date: "10 December, 2024",
      readTime: "8 min read",
      excerpt:
        "You might have heard the name of garage software but before investing in it, you want to confirm whether it will yield positive ROI. Here is an in-depth look at performance data from top UK test centres.",
      color: "bg-cyan-500/10 text-cyan-400",
      image: experienceImg,
    },
    {
      category: "Guide",
      title: "Is Garage Software the right fit for your vehicle?",
      date: "18 November, 2024",
      readTime: "5 min read",
      excerpt:
        "Introduction to Garage Software: A platform that helps in keeping a record of garage work. Learn how our software aligns vehicle specs automatically using live DVSA and wholesale database links.",
      color: "bg-amber-500/10 text-amber-400",
      image: vehicleImg,
    },
    {
      category: "Features",
      title: "All About the Tools and Features of Garage Management Systems",
      date: "28 October, 2024",
      readTime: "6 min read",
      excerpt:
        "When it comes to good management, it does not matter whether the garage is small or big. Key features like inventory control, VRM lookup, and SMS diaries play a vital role in day-to-day operations.",
      color: "bg-teal-500/10 text-teal-400",
      image: toolsImg,
    },
    {
      category: "Automation",
      title: "Using Garage Software to Automate Tasks",
      date: "07 August, 2023",
      readTime: "7 min read",
      excerpt:
        "The requirements put on garages and repair shops have grown as the automotive industry has progressed. Keeping up with tasks manually leads to missed revenue. Automation saves valuable manager time.",
      color: "bg-indigo-500/10 text-indigo-400",
      image: taskAutomationImg,
    },
    {
      category: "Data Protection",
      title: "Protecting Client Data in Workshop Management Systems",
      date: "21 July, 2023",
      readTime: "6 min read",
      excerpt:
        "Data security is critical for modern workshops. Learn how industry-standard encryption, cloud backups, and user access permissions safeguard sensitive customer and business records.",
      color: "bg-rose-500/10 text-rose-400",
      image: dataImg,
    },
    {
      category: "Benefits",
      title: "Driving Success: The Benefits of Implementing Garage Software",
      date: "11 July, 2023",
      readTime: "5 min read",
      excerpt:
        "As new technologies emerge, businesses across sectors look for ways to incorporate them into their operations. Implementing workshop software drives mechanic utilization and simplifies scheduling.",
      color: "bg-blue-500/10 text-blue-400",
      image: drivingSuccessImg,
    },
    {
      category: "Workflow",
      title: "Why Create A Garage Software You Should Know",
      date: "22 June, 2023",
      readTime: "6 min read",
      excerpt:
        "Different improvements are being made to vehicles in the current day to get better performance out of them. A specialized workshop portal adapts to these changes and simplifies job tracking.",
      color: "bg-indigo-500/10 text-indigo-400",
      image: createGarageImg,
    },
    {
      category: "Guide",
      title: "What Justifies The Use Of Garage Software?",
      date: "09 June, 2023",
      readTime: "5 min read",
      excerpt:
        "Before purchasing car repair software, there must be a lot of reasons why you should. Automating key workflows yields massive improvements in direct labor conversion and booking counts.",
      color: "bg-purple-500/10 text-purple-400",
      image: justifyUseImg,
    },
    {
      category: "Workflow",
      title: "How Do You Create a Workshop Management Software?",
      date: "23 May, 2023",
      readTime: "7 min read",
      excerpt:
        "The automotive business is changing faster in the current world, and technology is introducing new models of management. We explain the core modular design needed to scale a software workspace.",
      color: "bg-emerald-500/10 text-emerald-400",
      image: aboutImg, // Replaced duplicate whiteboard with aboutImg for uniqueness
    },
    {
      category: "Benefits",
      title: "Applications and Advantages of Garage Software",
      date: "10 May, 2023",
      readTime: "6 min read",
      excerpt:
        "Whenever the car industry is thus brought up, software for managing garages is appropriate. Learn how built-in vehicle status dashboards keep services transparent and boost customer trust.",
      color: "bg-rose-500/10 text-rose-400",
      image: appAdvantagesImg,
    },
    {
      category: "Workflow",
      title: "Purpose of Automotive Software for Garages",
      date: "12 April, 2023",
      readTime: "5 min read",
      excerpt:
        "Many industries are seeking to change in order to benefit from developing technology. Car mechanics utilize central tools to access wholesale parts networks and complete repair orders faster.",
      color: "bg-cyan-500/10 text-cyan-400",
      image: purposeAutomotiveImg,
    },
    {
      category: "Workflow",
      title: "How a Garage Software Can Save Your Hassle",
      date: "21 April, 2023",
      readTime: "6 min read",
      excerpt:
        "When it comes to running a successful garage, having the right tools and resources is essential. Eliminating paper billing sheets resolves most service-desk invoicing errors and hassles.",
      color: "bg-amber-500/10 text-amber-400",
      image: saveHassleImg,
    },
    {
      category: "Efficiency",
      title: "Streamlining Automotive Business Operations with Technology",
      date: "08 February, 2023",
      readTime: "5 min read",
      excerpt:
        "Utilizing technology to enhance efficiency with the help of Garage Management Software allows independent shops to coordinate technician day schedules and increase monthly booking slots.",
      color: "bg-teal-500/10 text-teal-400",
      image: streamlineOpsImg,
    },
    {
      category: "Guide",
      title: "Top Six Reasons for Using Software in Automobile Repair Shop",
      date: "20 January, 2023",
      readTime: "5 min read",
      excerpt:
        "If you own an auto repair shop, you are aware of how important it is to spend money on the proper tools. Modern software provides key integrations that make parts inventory tracking effortless.",
      color: "bg-indigo-500/10 text-indigo-400",
      image: repairShopImg,
    },
    {
      category: "Case Study",
      title: "Let's Have a Deep Yet Brief Insight Into Garage Software!",
      date: "10 January, 2023",
      readTime: "8 min read",
      excerpt:
        "Automobiles are becoming more technical nowadays. In tandem with the development of auto repair shops, digitizing booking and job sheets brings unprecedented visibility to shop owners.",
      color: "bg-rose-500/10 text-rose-400",
      image: insightGarageImg,
    },
    {
      category: "Diaries",
      title: "Maximizing Mechanic Efficiency in Modern Workshop Diaries",
      date: "15 December, 2022",
      readTime: "5 min read",
      excerpt:
        "Workshop booking diaries have evolved. Smart calendars coordinate mechanical technicians, allocate day tasks, and issue automatic updates to minimize booking bottlenecks.",
      color: "bg-blue-500/10 text-blue-400",
      image: featureImg, // Replaced with unique extra asset
    },
    {
      category: "Outreach",
      title: "Integrating SMS and Email Reminders for Customer Retention",
      date: "05 December, 2022",
      readTime: "4 min read",
      excerpt:
        "Automated notifications help workshops reduce booking no-shows. Discover how simple, timely MOT and service check reminders keep your calendar filled months in advance.",
      color: "bg-indigo-500/10 text-indigo-400",
      image: videoImg, // Replaced with unique extra asset
    },
    {
      category: "Guide",
      title: "The Evolution of Digital Job Cards in Independent Garages",
      date: "28 November, 2022",
      readTime: "6 min read",
      excerpt:
        "Say goodbye to greasy paper sheets. Digital job checklists allow technicians to upload vehicle photos, record diagnostics, and sign off on tasks straight from tablet devices.",
      color: "bg-purple-500/10 text-purple-400",
      image: dashboardImg, // Replaced with unique extra asset
    },
    {
      category: "Features",
      title: "Understanding VRM Lookups & Parts Procurement Networks",
      date: "14 November, 2022",
      readTime: "5 min read",
      excerpt:
        "Searching for parts by vehicle registration plates saves time. Explore how integrated parts catalog search makes selecting and ordering matching spare parts simple.",
      color: "bg-emerald-500/10 text-emerald-400",
      image: heroImg, // Replaced with unique extra asset
    },
    {
      category: "Guide",
      title: "Why SEO is Essential for Local Garage Websites",
      date: "22 October, 2022",
      readTime: "5 min read",
      excerpt:
        "Garages rely on local customers. Structuring your website's search engine optimizations ensures that drivers searching for tire changes or MOTs in your city find your workshop first.",
      color: "bg-rose-500/10 text-rose-400",
      image: customerImg,
    },
    {
      category: "Workflow",
      title: "A Guide to Managing Multi-Site Garages and Branches",
      date: "10 October, 2022",
      readTime: "7 min read",
      excerpt:
        "Managing multiple branches requires a central viewpoint. Unified dashboards allow managers to compare performance, transfer parts stock, and track multi-site billing metrics.",
      color: "bg-cyan-500/10 text-cyan-400",
      image: tyreSoftwareImg,
    },
    {
      category: "Benefits",
      title: "The Importance of Customer Portals in Car Repair Invoicing",
      date: "18 September, 2022",
      readTime: "5 min read",
      excerpt:
        "Customers demand clarity. Central portals allow drivers to review detailed visual quotes, accept repair jobs, view historic invoices, and complete payments securely online.",
      color: "bg-amber-500/10 text-amber-400",
      image: efficientImg,
    },
    {
      category: "Analytics",
      title: "Leveraging Analytics to Increase Garage Profitability",
      date: "02 September, 2022",
      readTime: "6 min read",
      excerpt:
        "Workshop numbers point to productivity. Tracking key indicators like average job values, parts markup, and labor rates helps owners identify opportunities to improve margins.",
      color: "bg-teal-500/10 text-teal-400",
      image: experienceImg,
    },
    {
      category: "Workflow",
      title: "Streamlining Vehicle Intake and Diagnostics with Smart Systems",
      date: "15 August, 2022",
      readTime: "5 min read",
      excerpt:
        "Intake is the first point of contact. Standardizing check-ins, reporting vehicle damage, and registering keys electronically prevents drop-off scheduling delays.",
      color: "bg-indigo-500/10 text-indigo-400",
      image: vehicleImg,
    },
    {
      category: "Guide",
      title: "Future Trends in Automotive Workshop Software",
      date: "28 July, 2022",
      readTime: "5 min read",
      excerpt:
        "As electric vehicles and connected vehicles increase, repair spaces must adapt. Discover how software systems are integrating advanced diagnostics to match these EV tech trends.",
      color: "bg-rose-500/10 text-rose-400",
      image: taskAutomationImg,
    },
    {
      category: "Features",
      title: "Simplifying Accounting Sync with QuickBooks & Sage",
      date: "10 July, 2022",
      readTime: "4 min read",
      excerpt:
        "Accounting should not require manual double entries. Automating the transfer of client invoices and payment data to standard accounting programs saves valuable hours.",
      color: "bg-blue-500/10 text-blue-400",
      image: dataImg,
    },
  ];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = limit
    ? posts.slice(0, limit)
    : posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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
      className="py-24 px-6 md:px-12 bg-[#050816] border-b border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {limit && (
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
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

        <div className="flex flex-wrap justify-center gap-8">
          {currentPosts.map((post, idx) => (
            <div
              key={idx}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[380px] flex"
            >
              <BlogCard post={post} onReadMore={() => setSelectedPost(post)} />
            </div>
          ))}
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
        {!limit && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <span className="text-sm text-gray-400 font-medium">
              Showing {indexOfFirstPost + 1} -{" "}
              {Math.min(indexOfLastPost, posts.length)} of {posts.length}
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

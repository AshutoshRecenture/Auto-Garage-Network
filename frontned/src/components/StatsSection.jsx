import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedCounter = ({ end, duration = 1.5, inView, isFloat = false }) => {
  const [count, setCount] = useState(0);
  const prevEndRef = useRef(end);

  useEffect(() => {
    if (!inView) return;

    // Start animating from current count, or 0 if it's the initial run
    const start = count;
    const endValue = parseFloat(end);
    if (start === endValue) return;

    let startTime = null;
    const animationDuration = duration * 1000;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / animationDuration, 1);

      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = start + easeProgress * (endValue - start);

      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    window.requestAnimationFrame(step);
    prevEndRef.current = end;
  }, [end, inView, duration]);

  return (
    <span>
      {isFloat ? count.toFixed(1) : Math.round(count).toLocaleString()}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  // Dynamic state values for real-time simulation
  const [garages, setGarages] = useState(2584);
  const [jobs, setJobs] = useState(58942);
  const [satisfaction, setSatisfaction] = useState(98.6);

  useEffect(() => {
    if (!inView) return;

    // Jobs count increments frequently to show high activity
    const jobsInterval = setInterval(() => {
      setJobs((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3500);

    // Garages increment occasionally
    const garagesInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setGarages((prev) => prev + 1);
      }
    }, 7000);

    // Satisfaction wiggles slightly
    const satisfactionInterval = setInterval(() => {
      setSatisfaction((prev) => {
        const delta = Math.random() * 0.2 - 0.1;
        const next = prev + delta;
        return parseFloat(Math.min(Math.max(next, 98.1), 99.2).toFixed(1));
      });
    }, 9000);

    return () => {
      clearInterval(jobsInterval);
      clearInterval(garagesInterval);
      clearInterval(satisfactionInterval);
    };
  }, [inView]);

  const stats = [
    { value: garages, suffix: "+", label: "Garages Across UK", isFloat: false },
    { value: jobs, suffix: "+", label: "Jobs Completed", isFloat: false },
    {
      value: satisfaction,
      suffix: "%",
      label: "Satisfaction Rate",
      isFloat: true,
    },
    { value: 15, suffix: "+", label: "Years Experience", isFloat: false },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#050816] to-[#0c1222]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col space-y-3 p-6 rounded-2xl bg-[#111827] border border-white/5 hover:border-indigo-500/30 transition-colors group"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500 group-hover:scale-110 transition-transform">
                <AnimatedCounter
                  end={stat.value}
                  inView={inView}
                  isFloat={stat.isFloat}
                />
                {stat.suffix}
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

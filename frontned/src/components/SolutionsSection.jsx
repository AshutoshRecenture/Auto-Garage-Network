import React from "react";

const SolutionsSection = () => {
  const solutions = [
    {
      title: "Website Solutions",
      desc: "Professional websites for garage businesses.",
      color: "from-blue-600 to-indigo-600",
      icon: (
        <div className="relative w-full h-16 bg-slate-950/80 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden">
          <div className="absolute -bottom-2 w-16 h-12 bg-indigo-500/10 border border-indigo-500/25 rounded-md flex flex-col p-1 space-y-1">
            <div className="w-full h-1.5 bg-indigo-500/30 rounded" />
            <div className="w-2/3 h-1 bg-white/20 rounded" />
            <div className="w-1/2 h-1 bg-white/10 rounded" />
          </div>
        </div>
      ),
    },
    {
      title: "MOT Diary",
      desc: "Smart MOT scheduling & management.",
      color: "from-purple-600 to-indigo-600",
      icon: (
        <div className="relative w-full h-16 bg-slate-950/80 rounded-lg border border-white/5 flex items-center justify-center p-2">
          <div className="grid grid-cols-3 gap-1 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`rounded-[3px] border border-white/5 ${i === 2 ? "bg-indigo-500/20" : "bg-white/5"}`}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "SEO Services",
      desc: "Rank higher & get more customers.",
      color: "from-pink-600 to-purple-600",
      icon: (
        <div className="relative w-full h-16 bg-slate-950/80 rounded-lg border border-white/5 flex flex-col justify-end p-2 space-y-1.5">
          <div className="flex justify-between items-end h-8 px-2">
            {[20, 35, 55, 45, 75].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-1.5 rounded-t-sm ${i === 4 ? "bg-pink-500" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Mobile App",
      desc: "Manage your garage on the go.",
      color: "from-blue-600 to-cyan-600",
      icon: (
        <div className="relative w-full h-16 bg-slate-950/80 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden">
          <div className="w-8 h-14 bg-slate-900 border border-white/20 rounded-md p-1 relative flex flex-col justify-between">
            <div className="w-3 h-0.5 bg-white/20 rounded-full mx-auto" />
            <div className="w-full h-8 bg-indigo-500/10 rounded flex items-center justify-center">
              <span className="text-[6px] text-indigo-400 font-bold">AGN</span>
            </div>
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full mx-auto" />
          </div>
        </div>
      ),
    },
    {
      title: "Reporting",
      desc: "Advanced reports & analytics.",
      color: "from-cyan-600 to-teal-600",
      icon: (
        <div className="relative w-full h-16 bg-slate-950/80 rounded-lg border border-white/5 flex items-center justify-center p-2">
          <svg
            className="w-8 h-8 text-cyan-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "CRM",
      desc: "Better customer relationships.",
      color: "from-indigo-600 to-teal-600",
      icon: (
        <div className="relative w-full h-16 bg-slate-950/80 rounded-lg border border-white/5 flex items-center justify-center p-2">
          <div className="flex space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px]">
              👤
            </div>
            <div className="w-5 h-5 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[10px]">
              👤
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Website & Support Solutions
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-medium">
          Professional platforms designed specifically to grow your garage
          operation
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((s, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-bg-card/90 border border-white/5 hover:border-indigo-500/20 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] group hover:bg-bg-card-hover text-left shadow-lg"
          >
            <div className="space-y-4">
              {s.icon}
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`#learn-${s.title.toLowerCase().replace(" ", "-")}`}
                className="inline-flex items-center space-x-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
              >
                <span>Learn More</span>
                <svg
                  className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionsSection;

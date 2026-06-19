import React from 'react'
import { motion } from 'framer-motion'

const PartnerLogos = () => {
  const partners = [
    { name: 'TecRMI', logo: 'TecRMI' },
    { name: 'autodata SOLUTIONS', logo: 'autodata' },
    { name: 'GSF CAR PARTS', logo: 'GSF CAR PARTS' },
    { name: 'Sage', logo: 'Sage' },
    { name: 'quickbooks', logo: 'Intuit QuickBooks' },
    { name: 'PARTSLINK24', logo: 'PARTSLINK24' },
    { name: 'MOT EXPERT', logo: 'MOT EXPERT' },
    { name: 'Service Reminder', logo: 'Service Reminder' },
  ]

  // Double the array for seamless infinite scrolling
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-12 border-t border-white/5 bg-[#050816] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-8 text-center">
          INTEGRATED WITH LEADING AUTOMOTIVE BRANDS & SOFTWARE
        </p>
        
        <div className="relative flex overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050816] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050816] to-transparent z-10"></div>
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 20 
            }}
            className="flex items-center space-x-16 whitespace-nowrap opacity-60"
          >
            {duplicatedPartners.map((p, i) => (
              <div 
                key={i} 
                className="text-sm md:text-lg font-extrabold tracking-wider text-white hover:opacity-100 transition-opacity duration-200 cursor-pointer flex-shrink-0"
              >
                {p.logo === 'Intuit QuickBooks' ? (
                  <span className="flex items-center space-x-1 text-green-400 font-bold font-sans">
                    <span>intuit</span>
                    <span className="text-white">quickbooks</span>
                  </span>
                ) : p.logo === 'autodata' ? (
                  <span className="text-white italic font-black">
                    auto<span className="text-blue-400">data</span>
                  </span>
                ) : (
                  p.logo
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PartnerLogos

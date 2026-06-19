import React from 'react'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

const TestimonialsSection = () => {
  const reviews = [
    {
      name: 'David Roberts',
      garage: 'Roberts Motors Ltd',
      text: 'AGN completely transformed how we run our workshop. The Autodata integration alone saves us hours every week. Best decision we made.',
      rating: 5,
      image: 'DR'
    },
    {
      name: 'Sarah Jenkins',
      garage: 'Elite Tyre & MOT',
      text: 'The MOT diary is incredibly intuitive. We have reduced no-shows by 40% thanks to the automated SMS reminders.',
      rating: 5,
      image: 'SJ'
    },
    {
      name: 'Michael Chang',
      garage: 'Chang Auto Repairs',
      text: 'Being able to order parts from GSF directly inside the job card is a game changer. The seamless QuickBooks sync makes accounting a breeze.',
      rating: 5,
      image: 'MC'
    }
  ]

  return (
    <section className="py-24 px-6 md:px-12 bg-[#050816] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">2500+ Garages</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Don't just take our word for it. Here's what garage owners across the UK have to say about AGN.
          </motion.p>
        </div>



        {/* Text Review Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-[#111827] border border-white/5 p-8 rounded-2xl shadow-lg hover:border-white/10 transition-all"
            >
              <div className="flex text-yellow-400 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-8">"{review.text}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                  {review.image}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{review.name}</div>
                  <div className="text-gray-500 text-xs">{review.garage}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

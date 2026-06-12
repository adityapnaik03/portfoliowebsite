import { motion } from 'framer-motion';
import { FaGraduationCap, FaSchool, FaBookReader } from 'react-icons/fa';

export default function Education() {
  const timelineData = [
    {
      id: 1,
      type: 'College',
      degree: 'B.Tech in Information Science & Engineering (ISE)',
      institution: 'NMAM Institute Of Technology (NMAMIT)',
      year: '2024 - 2028',
      score: 'Pursuing (CGPA: Current)',
      icon: <FaGraduationCap className="w-5 h-5" />,
      color: 'from-cyan-400 to-blue-500',
      shadow: 'shadow-neon-blue',
    },
    {
      id: 2,
      type: 'PUC / 12th',
      degree: 'Pre-University Course (PCMB)',
      institution: 'Excellent PU College, Moodbidri',
      year: '2022 - 2024',
      score: 'Percentage: 91.3%',
      icon: <FaBookReader className="w-5 h-5" />,
      color: 'from-indigo-400 to-purple-500',
      shadow: 'shadow-neon-indigo',
    },
    {
      id: 3,
      type: '10th Grade',
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: "St. Cecily's High School, Udupi",
      year: 'Graduated 2022',
      score: 'Percentage: 86.06%',
      icon: <FaSchool className="w-5 h-5" />,
      color: 'from-purple-400 to-pink-500',
      shadow: 'shadow-neon-purple',
    },
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Education <span className="text-gradient">Timeline</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central line (desktop-only or left-aligned on mobile) */}
          <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-500 opacity-30" />

          {/* Timeline Cards */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center relative ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Indicator */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    className={`absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 z-20 ${item.shadow}`}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Spacer for desktop alignment */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Card Content Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                    className={`w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0 ${
                      isEven ? 'sm:pr-8' : 'sm:pl-8'
                    }`}
                  >
                    <div className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 shadow-lg hover:shadow-neon-indigo/5 hover:translate-y-[-4px] transition-all duration-300">
                      {/* Year badge */}
                      <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${item.color} mb-3`}>
                        {item.year}
                      </span>
                      
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                        {item.degree}
                      </h3>
                      
                      <h4 className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 mb-4">
                        {item.institution}
                      </h4>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{item.score}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

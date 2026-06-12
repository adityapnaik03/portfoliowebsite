import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('All');

  const platforms = ['All', 'Coursera', 'Udemy', 'NPTEL', 'Infosys Springboard', 'Great Learning'];

  const certificatesData = [
    {
      id: 1,
      name: 'Python for Everybody Specialization',
      platform: 'Coursera',
      verification: 'https://coursera.org',
      image: '/images/cert_placeholder.svg'
    },
    {
      id: 2,
      name: 'Machine Learning Specialization',
      platform: 'Coursera',
      verification: 'https://coursera.org',
      image: '/images/cert_placeholder.svg'
    },
    {
      id: 3,
      name: 'React - The Complete Guide (with Redux)',
      platform: 'Udemy',
      verification: 'https://udemy.com',
      image: '/images/cert_placeholder.svg'
    },
    {
      id: 4,
      name: 'Java Programming Foundations',
      platform: 'Infosys Springboard',
      verification: 'https://springboard.infosys.com',
      image: '/images/cert_placeholder.svg'
    },
    {
      id: 5,
      name: 'Introduction to Internet of Things',
      platform: 'NPTEL',
      verification: 'https://nptel.ac.in',
      image: '/images/cert_placeholder.svg'
    },
    {
      id: 6,
      name: 'Introduction to Artificial Intelligence',
      platform: 'Great Learning',
      verification: 'https://greatlearning.in',
      image: '/images/cert_placeholder.svg'
    }
  ];

  // Filtering logic
  const filteredCertificates = activeFilter === 'All'
    ? certificatesData
    : certificatesData.filter(cert => cert.platform.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-12 max-w-3xl mx-auto">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setActiveFilter(platform)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === platform
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'border border-slate-300 dark:border-white/10 dark:glass-card-dark text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-white/5'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={cert.id}
                className="p-4 rounded-2xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 shadow-lg hover:translate-y-[-4px] transition-all duration-300"
              >
                {/* Certificate Image Frame */}
                <div className="rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-200/10 dark:border-white/5">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/cert_placeholder.svg';
                    }}
                  />
                </div>
                
                {/* Platform Tag */}
                <span className="inline-block px-2.5 py-0.5 mb-3 text-[10px] font-bold tracking-wide text-cyan-500 dark:text-cyan-400 rounded-full bg-cyan-500/10">
                  {cert.platform}
                </span>

                {/* Course Name */}
                <h3 className="text-base font-bold text-slate-800 dark:text-white mb-5 line-clamp-2 h-12">
                  {cert.name}
                </h3>

                {/* Verification Link */}
                <a
                  href={cert.verification}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 dark:text-indigo-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  <span>Verify Credential</span>
                  <FaExternalLinkAlt className="w-3" />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

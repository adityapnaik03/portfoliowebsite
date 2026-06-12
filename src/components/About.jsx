import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaAward, FaLaptopCode, FaGraduationCap } from 'react-icons/fa';

// Custom Animated Counter Card Component
function StatCard({ icon, title, endVal, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds animation
    const increment = endVal / (duration / 16); // ~60fps
    
    const counter = setInterval(() => {
      start += increment;
      if (start >= endVal) {
        setCount(endVal);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [isInView, endVal]);

  return (
    <div
      ref={ref}
      className="p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 flex flex-col items-center text-center shadow-lg hover:translate-y-[-5px] transition-transform duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-white mb-4 shadow-neon-blue">
        {icon}
      </div>
      <span className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1">
        {count}
        {suffix}
      </span>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </span>
    </div>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Side: Avatar/Photo */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
            <div className="relative group w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-40" />
              <img
                src="/images/profile.svg"
                alt="Aditya Profile Detail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-slate-900"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/profile.svg';
                }}
              />
              {/* Corner Glowing Borders */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-purple-500 z-20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Side: Introduction Text */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-center text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              I am Aditya P Naik, a second-year B.Tech Student in Information Science & Engineering.
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Based at <strong className="text-slate-800 dark:text-slate-200">NMAM Institute of Technology</strong>, 
              my engineering journey is fueled by a passion for creating performant desktop and web software systems, 
              delving into Artificial Intelligence workflows, and solving algorithmic problems. 
              I love engineering code that solves actual real-world problems and creating fluid user experiences.
            </p>

            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              I'm constantly looking to expand my technological footprint. Whether it's structural backend engines, 
              front-end animations, or local machine learning training pipelines, I enjoy building projects 
              from scratch and turning complex operations into elegant code solutions.
            </p>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                icon={<FaLaptopCode className="w-5 h-5" />}
                title="Projects Built"
                endVal={8}
                suffix="+"
              />
              <StatCard
                icon={<FaAward className="w-5 h-5" />}
                title="Certifications"
                endVal={12}
                suffix="+"
              />
              <StatCard
                icon={<FaCode className="w-5 h-5" />}
                title="Tech Stack"
                endVal={15}
                suffix="+"
              />
              <StatCard
                icon={<FaGraduationCap className="w-5 h-5" />}
                title="Coding Solved"
                endVal={250}
                suffix="+"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

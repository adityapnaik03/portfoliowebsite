import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Custom 3D Tilt Card Component
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside element
    const y = e.clientY - rect.top;  // y position inside element

    // Calculate rotation percentage (-0.5 to 0.5)
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;

    // Apply rotation values (tilt intensity: max 12 degrees)
    const rotateX = -yPct * 12;
    const rotateY = xPct * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="rounded-2xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 overflow-hidden shadow-xl hover:shadow-neon-blue/10 flex flex-col h-full select-none"
    >
      {/* Project Thumbnail Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/project_placeholder.svg';
          }}
        />
        {/* Absolute Glowing Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0620] via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* Details Container */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          {project.title}
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech Stack List */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs font-bold text-indigo-500 dark:text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Call to Actions */}
        <div className="flex items-center gap-4 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-white/10 dark:glass-card-dark text-slate-700 dark:text-slate-200 hover:bg-slate-200/20 dark:hover:bg-white/5 transition-all duration-300"
          >
            <FaGithub className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md hover:shadow-neon-blue transition-all duration-300"
          >
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const projectsData = [
    {
      id: 1,
      title: 'AI Resume Shortlister',
      description: 'An AI-powered screening solution that extracts key text from resumes, parses skills, and scores candidates based on job description semantic matching.',
      tags: ['React', 'Node.js', 'Python', 'Flask', 'MongoDB'],
      image: '/images/project_placeholder.svg',
      github: 'https://github.com/adityapnaik',
      demo: '#projects',
    },
    {
      id: 2,
      title: 'Certificate Verification System',
      description: 'A tamper-proof credential ledger designed to generate cryptography-secured certificate keys for platforms, ensuring secure verification and authenticity.',
      tags: ['React', 'Solidity', 'Web3.js', 'Node.js', 'MySQL'],
      image: '/images/project_placeholder.svg',
      github: 'https://github.com/adityapnaik',
      demo: '#projects',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A premium developer portfolio featuring custom React physics cursor interactions, drifting backgrounds, glassmorphism layouts, and dark/light modes.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      image: '/images/project_placeholder.svg',
      github: 'https://github.com/adityapnaik',
      demo: '#home',
    },
    {
      id: 4,
      title: 'Student Management System',
      description: 'A GUI-driven system utilizing Java Swing and MySQL databases to manage student details, register course selections, score marks, and automate records.',
      tags: ['Java', 'Swing', 'JDBC', 'MySQL'],
      image: '/images/project_placeholder.svg',
      github: 'https://github.com/adityapnaik',
      demo: '#projects',
    },
    {
      id: 5,
      title: 'Face Recognition Attendance System',
      description: 'An automated classroom attendance portal implementing OpenCV Haar Cascade face filters to map face structures and log attendance timestamps.',
      tags: ['Python', 'OpenCV', 'Deep Learning', 'SQLite'],
      image: '/images/project_placeholder.svg',
      github: 'https://github.com/adityapnaik',
      demo: '#projects',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

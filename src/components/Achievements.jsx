import { motion } from 'framer-motion';
import { FaTrophy, FaCode, FaUsers, FaAward, FaGraduationCap } from 'react-icons/fa';

export default function Achievements() {
  const achievementsData = [
    {
      id: 1,
      category: 'Hackathons',
      title: 'College Hackathon Runner Up',
      description: 'Secured 2nd Place in NMAMIT Annual Hackathon for designing a cryptography-based Certificate Verification ledger.',
      icon: <FaTrophy className="w-5 h-5" />,
      color: 'from-cyan-400 to-indigo-500',
      shadow: 'hover:shadow-neon-blue/10'
    },
    {
      id: 2,
      category: 'Coding Competitions',
      title: 'LeetCode Problem Solver',
      description: 'Solved over 250+ DSA algorithmic issues on LeetCode with active ranking progress in monthly programming challenges.',
      icon: <FaCode className="w-5 h-5" />,
      color: 'from-indigo-400 to-purple-500',
      shadow: 'hover:shadow-neon-indigo/10'
    },
    {
      id: 3,
      category: 'Workshops',
      title: 'Generative AI & Deep Learning',
      description: 'Successfully participated in a hands-on technical workshop on Pytorch Neural Networks and LLM fine-tuning techniques.',
      icon: <FaGraduationCap className="w-5 h-5" />,
      color: 'from-purple-400 to-pink-500',
      shadow: 'hover:shadow-neon-purple/10'
    },
    {
      id: 4,
      category: 'Leadership Roles',
      title: 'ISE Association Organizer',
      description: 'Active organizing committee member for the ISE Department, coordinating technical quizzes, coding fests, and workshops.',
      icon: <FaUsers className="w-5 h-5" />,
      color: 'from-pink-400 to-rose-500',
      shadow: 'hover:shadow-neon-purple/10'
    },
    {
      id: 5,
      category: 'Awards',
      title: 'Academic Performance Excellence',
      description: 'Awarded department merit rank recognition certificate for outstanding technical score in C and Object-Oriented Java.',
      icon: <FaAward className="w-5 h-5" />,
      color: 'from-amber-400 to-orange-500',
      shadow: 'hover:shadow-neon-blue/10'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
            Achievements & <span className="text-gradient">Activities</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto rounded-full" />
        </div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievementsData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="p-6 sm:p-8 rounded-2xl glass-card-light border border-slate-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
            >
              {/* Badge Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                {item.icon}
              </div>

              {/* Category */}
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-600 uppercase mb-2 block">
                {item.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { FaJava, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from 'react-icons/fa';
import { SiPython, SiC, SiJavascript, SiHtml5, SiCss3, SiMysql, SiMongodb, SiVisualstudiocode } from 'react-icons/si';

// Helper component for individual skill bars
function SkillItem({ icon, name, level }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5 px-1">
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
          <span className="text-xl text-indigo-500 dark:text-indigo-400">{icon}</span>
          <span className="font-semibold text-sm">{name}</span>
        </div>
        <span className="text-xs font-semibold text-cyan-500 dark:text-cyan-400">{level}%</span>
      </div>
      
      {/* Outer track */}
      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        {/* Inner filling progress */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', level: 85, icon: <SiPython /> },
        { name: 'Java', level: 80, icon: <FaJava /> },
        { name: 'C Language', level: 85, icon: <SiC /> },
        { name: 'JavaScript', level: 80, icon: <SiJavascript /> },
      ],
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'HTML5', level: 90, icon: <SiHtml5 /> },
        { name: 'CSS3 / Tailwind', level: 85, icon: <SiCss3 /> },
        { name: 'React.js', level: 80, icon: <FaReact /> },
        { name: 'Node.js', level: 70, icon: <FaNodeJs /> },
      ],
    },
    {
      title: 'Database Management',
      skills: [
        { name: 'MySQL', level: 80, icon: <SiMysql /> },
        { name: 'MongoDB', level: 70, icon: <SiMongodb /> },
      ],
    },
    {
      title: 'Developer Tools',
      skills: [
        { name: 'Git', level: 85, icon: <FaGitAlt /> },
        { name: 'GitHub', level: 90, icon: <FaGithub /> },
        { name: 'VS Code', level: 95, icon: <SiVisualstudiocode /> },
        { name: 'Figma', level: 65, icon: <FaFigma /> },
      ],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="p-6 sm:p-8 rounded-2xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 shadow-lg hover:shadow-neon-indigo/5 transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold text-indigo-500 dark:text-indigo-400 mb-6 border-b border-slate-200/20 dark:border-white/5 pb-3">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {category.skills.map((skill) => (
                  <SkillItem
                    key={skill.name}
                    icon={skill.icon}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

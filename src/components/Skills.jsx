import { motion } from 'framer-motion';
import { FaJava, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from 'react-icons/fa';
import { SiPython, SiC, SiJavascript, SiHtml5, SiCss3, SiMysql, SiMongodb, SiVisualstudiocode } from 'react-icons/si';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', icon: <SiPython /> },
        { name: 'Java', icon: <FaJava /> },
        { name: 'C Language', icon: <SiC /> },
        { name: 'JavaScript', icon: <SiJavascript /> },
      ],
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'HTML5', icon: <SiHtml5 /> },
        { name: 'CSS3 / Tailwind', icon: <SiCss3 /> },
        { name: 'React.js', icon: <FaReact /> },
        { name: 'Node.js', icon: <FaNodeJs /> },
      ],
    },
    {
      title: 'Database Management',
      skills: [
        { name: 'MySQL', icon: <SiMysql /> },
        { name: 'MongoDB', icon: <SiMongodb /> },
      ],
    },
    {
      title: 'Developer Tools',
      skills: [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'GitHub', icon: <FaGithub /> },
        { name: 'VS Code', icon: <SiVisualstudiocode /> },
        { name: 'Figma', icon: <FaFigma /> },
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="p-6 sm:p-8 rounded-2xl glass-card-dark border border-white/10 shadow-lg hover:shadow-neon-indigo/5 transition-all duration-300"
            >
              <h3 className="text-sm font-extrabold text-indigo-400 mb-4 border-b border-white/5 pb-3 uppercase tracking-wider">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10 shadow-sm transition-all duration-200 hover:scale-[1.03] flex items-center gap-1.5"
                  >
                    <span className="text-sm text-indigo-400">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

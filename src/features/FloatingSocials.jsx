import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function FloatingSocials() {
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/adityapnaik',
      icon: <FaGithub className="w-5 h-5" />,
      color: 'hover:text-white hover:bg-neutral-800 hover:shadow-neon-indigo',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/adityapnaik', // Placeholder path
      icon: <FaLinkedinIn className="w-5 h-5" />,
      color: 'hover:text-white hover:bg-blue-600 hover:shadow-neon-blue',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/aditya.p.naik', // Placeholder path
      icon: <FaInstagram className="w-5 h-5" />,
      color: 'hover:text-white hover:bg-pink-600 hover:shadow-neon-purple',
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/adityapnaik', // Placeholder path
      icon: <FaXTwitter className="w-5 h-5" />,
      color: 'hover:text-white hover:bg-black dark:hover:bg-neutral-900 hover:shadow-neon-blue',
    },
    {
      name: 'Email',
      url: 'mailto:adityapnaik@gmail.com', // Placeholder path
      icon: <FaEnvelope className="w-5 h-5" />,
      color: 'hover:text-white hover:bg-indigo-600 hover:shadow-neon-indigo',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-0 left-8 z-40 hidden xl:flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-4">
        {socials.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-slate-400/20 dark:border-white/10 bg-[#0a0620]/30 backdrop-blur-md text-slate-400 dark:text-slate-400 hover:scale-115 transition-all duration-300 ${social.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
      
      {/* Decorative vertical line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 96 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-[1.5px] bg-gradient-to-t from-transparent via-indigo-500/50 to-indigo-500/10 dark:via-indigo-500/30"
      />
    </motion.div>
  );
}

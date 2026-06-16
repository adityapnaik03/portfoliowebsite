import { FaInstagram, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/adityapnaik', icon: <FaGithub /> },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/adityapnaik', icon: <FaLinkedinIn /> },
    { name: 'Instagram', href: 'https://instagram.com/aditya.p.naik', icon: <FaInstagram /> },
    { name: 'X (Twitter)', href: 'https://x.com/adityapnaik', icon: <FaXTwitter /> },
    { name: 'Email', href: 'mailto:adityapnaik@gmail.com', icon: <FaEnvelope /> }
  ];

  return (
    <footer className="border-t border-slate-200 glass-card-light py-12 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8">
        
        {/* Quick Links List */}
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social Icons row */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-gradient-to-tr hover:from-cyan-500 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm bg-white"
              aria-label={social.name}
            >
              <span className="text-lg">{social.icon}</span>
            </a>
          ))}
        </div>

        {/* Divider line */}
        <div className="w-full max-w-md h-[1px] bg-slate-200" />

        {/* Text Details */}
        <div className="text-center text-xs sm:text-sm text-slate-500 space-y-1">
          <p>© {currentYear} Aditya P Naik. All rights reserved.</p>
          <p className="font-semibold text-slate-600">
            Designed & Developed by{' '}
            <span className="text-gradient font-bold">Aditya P Naik</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

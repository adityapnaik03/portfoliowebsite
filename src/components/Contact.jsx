import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const contactInfo = [
    {
      id: 1,
      name: 'Phone',
      value: '+91 99014 XXXXX', // Placeholder phone
      icon: <FaPhoneAlt className="w-5 h-5 text-cyan-400" />,
      href: 'tel:+9199014XXXXX'
    },
    {
      id: 2,
      name: 'Email',
      value: 'adityapnaik@gmail.com',
      icon: <FaEnvelope className="w-5 h-5 text-indigo-400" />,
      href: 'mailto:adityapnaik@gmail.com'
    },
    {
      id: 3,
      name: 'Location',
      value: 'Udupi / Nitte, Karnataka, India',
      icon: <FaMapMarkerAlt className="w-5 h-5 text-purple-400" />,
      href: 'https://maps.google.com/?q=NMAM+Institute+of+Technology'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Trigger local simulation if keys are missing (development fallback)
    if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id_here') {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        triggerConfetti();
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      }, 1500);
      return;
    }

    try {
      const result = await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey,
      });

      if (result.status === 200 || result.text === 'OK') {
        setSubmitStatus('success');
        triggerConfetti();
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#6366f1', '#a855f7']
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Left Side: Contact Information cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            <h3 className="text-xl font-bold text-white mb-2 text-left">
              Contact Details
            </h3>
            
            <p className="text-sm sm:text-base text-slate-350 leading-relaxed mb-6 text-left">
              Have an exciting project, a role opening, or just want to chat about programming? 
              Drop me a line! I will get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.id}
                  href={info.href}
                  target={info.name === 'Location' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl glass-card-dark border border-white/10 shadow-lg hover:translate-y-[-3px] hover:shadow-neon-indigo/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-cyan-500 group-hover:to-indigo-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                    {info.icon}
                  </div>
                  
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {info.name}
                    </span>
                    <span className="text-sm font-semibold text-slate-200 break-all">
                      {info.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Form Panel */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl glass-card-dark border border-white/10 shadow-xl relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {/* Name */}
                <div className="text-left">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-1 block font-medium">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="text-left">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-xs text-red-500 mt-1 block font-medium">{errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-5 text-left">
                <label htmlFor="subject" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all ${
                    errors.subject ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Collaboration Project"
                />
                {errors.subject && <span className="text-xs text-red-500 mt-1 block font-medium">{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="mb-6 text-left">
                <label htmlFor="message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all ${
                    errors.message ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Write your message here..."
                />
                {errors.message && <span className="text-xs text-red-500 mt-1 block font-medium">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg hover:shadow-neon-blue flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Message Overlay banner */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-0 bg-[#0a0620]/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20 border border-white/5 shadow-lg"
                  >
                    <FaCheckCircle className="w-14 h-14 text-green-400 mb-4 animate-bounce" />
                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
                      Thank you for reaching out, Aditya will respond to your message shortly!
                    </p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-semibold"
                  >
                    Oops! Something went wrong. Please check your credentials and try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

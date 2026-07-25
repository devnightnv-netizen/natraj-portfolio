import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Command, Menu, X, ArrowUpRight, Github, Send } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position for header animations and active section highlights
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'projects', 'about', 'skills', 'experience', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', id: 'hero' },
    { label: 'Projects', id: 'projects' },
    { label: 'Story', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Awards', id: 'achievements' }
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div id="navigation-root" className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pt-4 md:pt-6">
        <motion.nav
          id="navbar"
          animate={{
            width: scrolled ? '85%' : '95%',
            maxWidth: scrolled ? '900px' : '1100px',
            y: scrolled ? 4 : 0
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between border backdrop-blur-md transition-all duration-300 ${
            scrolled ? 'border-white/60 bg-white/40 shadow-lg shadow-black/5' : 'border-white/45 bg-white/25'
          }`}
        >
          {/* Logo / Brand */}
          <button 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <Logo size="md" />
            <span className="hidden sm:block text-sm font-semibold tracking-tight text-slate-800 font-display">
              Natraj<span className="text-[#4F8CFF] font-sans"></span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/5 p-1 rounded-full border border-black/[0.03]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all duration-300 focus:outline-none cursor-pointer ${
                    isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-black/[0.02]"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar command palette trigger / Call-to-actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#7C4DFF] text-white hover:opacity-95 shadow-[0_4px_15px_rgba(79,140,255,0.15)] transition duration-300 text-xs font-bold cursor-pointer"
            >
              <span>Connect</span>
              <Send className="w-3 h-3" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 text-slate-600 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-35 md:hidden p-5 bg-white/45 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl shadow-black/5"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-sans text-sm font-semibold transition ${
                    activeSection === item.id 
                      ? 'bg-[#4F8CFF]/10 text-[#4F8CFF]' 
                      : 'text-slate-600 hover:bg-slate-100/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-[1px] bg-slate-200/50 my-2" />
              <button
                onClick={() => scrollTo('contact')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#7C4DFF] text-white font-sans text-sm font-bold flex items-center justify-center gap-2"
              >
                Connect With Me
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowDown, Sparkles, FileText, ArrowRight, Command, Instagram, MessageSquare } from 'lucide-react';
import { developerProfile } from '../data';
import natrajImg from '../assets/images/natraj.jpg';

interface HeroProps {
  onOpenCommandPalette: () => void;
  profile?: typeof developerProfile;
}

export default function Hero({ onOpenCommandPalette, profile }: HeroProps) {
  const activeProfile = profile || developerProfile;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const ROLES = [
    activeProfile.title || "IT Graduate & Software Developer",
    "Java & Python Developer",
    "MongoDB Database Specialist",
    "Creative Photo Designer"
  ];

  // Rotate roles every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [ROLES.length]);

  // Track mouse position relative to container for real-time glass lighting spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const scrollNext = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#F7F9FC] px-4 pt-24 pb-16"
    >
      {/* 1. Slow-moving morphing aurora blobs in background */}
      <div id="aurora-blob-1" className="absolute top-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-tr from-[#4F8CFF] to-[#00D4FF] blur-[100px] opacity-25 animate-aurora-slow pointer-events-none" />
      <div id="aurora-blob-2" className="absolute bottom-[15%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#7C4DFF] to-pink-300 blur-[110px] opacity-[0.22] animate-float-reverse pointer-events-none" />
      <div id="aurora-blob-3" className="absolute top-[40%] left-[45%] w-[250px] h-[250px] rounded-full bg-[#00D4FF]/20 blur-[80px] animate-float-slow pointer-events-none" />

      {/* 2. Interactive Spotlight follow cursor */}
      <div
        id="mouse-spotlight"
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 hidden md:block"
        style={{
          background: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, rgba(124, 77, 255, 0.08), transparent)`
        }}
      />

      {/* 3. Grid overlay */}
      <div id="grid-overlay" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Hero content container */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-center lg:text-left px-2 sm:px-6">
        
        {/* Left Column: Profile Details */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start space-y-8 w-full">
          {/* Sparkle badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#4F8CFF] text-[11px] font-bold uppercase tracking-widest shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4F8CFF] animate-pulse" />
            <span className="font-sans tracking-widest">
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4 w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-bold uppercase tracking-widest text-black/40 font-display"
            >
              Software Developer Portfolio
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] mb-2 bg-gradient-to-b from-[#1D1D1F] to-[#434343] bg-clip-text text-transparent leading-[1.1]"
            >
              {activeProfile.name}
            </motion.h1>

            {/* Rotating Role with sliding effect */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start overflow-hidden py-1">
              <motion.div
                key={currentRoleIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-2xl md:text-3xl font-bold font-sans bg-gradient-to-r from-[#4F8CFF] via-[#7C4DFF] to-[#00D4FF] bg-clip-text text-transparent text-glow-primary tracking-tight"
              >
                {ROLES[currentRoleIndex]}
              </motion.div>
            </div>
          </div>

          {/* Intro Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-black/55 max-w-xl font-sans font-medium leading-relaxed"
          >
            {activeProfile.tagline}
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full justify-center lg:justify-start"
          >
            <button
              onClick={() => {
                const el = document.getElementById('projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#4F8CFF] text-white hover:bg-blue-600 transition duration-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCommandPalette}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-panel border border-white/60 bg-white/40 text-slate-700 hover:bg-white/60 hover:text-slate-900 transition duration-300 text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Command className="w-4 h-4" />
              <span>Search Portfolio</span>
              <span className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-black/5 border border-black/5 font-mono text-slate-400">⌘K</span>
            </button>
          </motion.div>

          {/* Floating Social & Shortcut Indicator Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg p-4 glass-panel border border-white/50 bg-white/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md"
          >
            {/* Social icons */}
            <div className="flex gap-2.5">
              <a
                href={activeProfile.contact.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/60 hover:bg-[#7C4DFF]/10 hover:text-[#7C4DFF] border border-white/80 transition text-slate-500"
                title="GitHub"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={activeProfile.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/60 hover:bg-[#4F8CFF]/10 hover:text-[#4F8CFF] border border-white/80 transition text-slate-500"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href={`mailto:${activeProfile.contact.email}`}
                className="p-2 rounded-full bg-white/60 hover:bg-[#FF4F4F]/10 hover:text-[#FF4F4F] border border-white/80 transition text-slate-500"
                title="Email"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
              <a
                href={activeProfile.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/60 hover:bg-[#25D366]/10 hover:text-[#25D366] border border-white/80 transition text-slate-500"
                title="WhatsApp"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </a>
              <a
                href={activeProfile.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/60 hover:bg-[#E1306C]/10 hover:text-[#E1306C] border border-white/80 transition text-slate-500"
                title="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
            </div>

            <div className="hidden sm:block h-6 w-[1px] bg-slate-200/60" />

            {/* Quick link chip */}
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7C4DFF] hover:opacity-80 transition cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Connect & Resume</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive Developer Image Card */}
        <div className="lg:col-span-5 flex justify-center items-center w-full pt-6 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            {/* Soft background glow following gradient scheme */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#4F8CFF]/20 via-[#7C4DFF]/20 to-[#00D4FF]/25 blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-slow" />
            
            {/* Image frame container with modern dual-border & frost styling */}
            <div className="relative w-full h-full rounded-[36px] overflow-hidden border border-white/60 bg-white/20 backdrop-blur-md p-3 shadow-2xl transition duration-500 group-hover:translate-y-[-4px]">
              
              <img
                src={natrajImg}
                alt={`${activeProfile.name} - ${activeProfile.title}`}
                className="w-full h-full object-cover rounded-[26px] filter brightness-[98%] group-hover:brightness-100 transition duration-500 scale-100 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />

              {/* Float badge indicator */}
              <div className="absolute bottom-6 left-6 right-6 p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="font-sans min-w-0 pr-2">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{activeProfile.name}</h4>
                  <p className="text-[10px] font-semibold text-[#4F8CFF] truncate">{activeProfile.title}</p>
                </div>
                
                {/* Simulated live status indicator */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[9px] font-bold text-emerald-600 font-sans tracking-wide">ONLINE</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>

      {/* 5. Animated scroll down indicator */}
      <div id="scroll-indicator" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer select-none" onClick={scrollNext}>
        <span className="text-[10px] font-bold tracking-widest text-slate-400 font-sans uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </div>
    </div>
  );
}

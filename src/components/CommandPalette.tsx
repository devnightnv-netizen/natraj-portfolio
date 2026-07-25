import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, X, Terminal, Briefcase, Award, ArrowUpRight, Sparkles, Send, GraduationCap } from 'lucide-react';
import { projectsData, experienceData, skillsData, achievementsData } from '../data';

import { Project } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects?: Project[];
}

export default function CommandPalette({ isOpen, onClose, projects = projectsData }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [aiMode, setAiMode] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch('');
      setAiMode(false);
      setAiAnswer('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard events (escape, arrow navigation, enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelectAction(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, search, selectedIndex, aiMode]);

  // Command palette items list
  const paletteItems = [
    // Navigation
    { id: 'nav-home', title: 'Go to Hero Section', category: 'Navigation', icon: Command, action: () => scrollToSection('hero') },
    { id: 'nav-about', title: 'Go to About & Story', category: 'Navigation', icon: Command, action: () => scrollToSection('about') },
    { id: 'nav-skills', title: 'Go to Technical Skills', category: 'Navigation', icon: Command, action: () => scrollToSection('skills') },
    { id: 'nav-projects', title: 'Go to Bento Projects', category: 'Navigation', icon: Command, action: () => scrollToSection('projects') },
    { id: 'nav-exp', title: 'Go to Experience Timeline', category: 'Navigation', icon: Command, action: () => scrollToSection('experience') },
    { id: 'nav-ach', title: 'Go to Achievements & Awards', category: 'Navigation', icon: Command, action: () => scrollToSection('achievements') },
    { id: 'nav-contact', title: 'Go to Contact Forms', category: 'Navigation', icon: Command, action: () => scrollToSection('contact') },

    // Dynamic data items mapped
    ...projects.map(p => ({
      id: `project-${p.id}`,
      title: `Project: ${p.title} (${p.tags.slice(0, 2).join(', ')})`,
      category: 'Projects',
      icon: Terminal,
      action: () => {
        scrollToSection('projects');
        // highlight project card visually if possible
      }
    })),
    ...experienceData.map(e => ({
      id: `exp-${e.id}`,
      title: `Experience: ${e.role} at ${e.company}`,
      category: 'Experience',
      icon: Briefcase,
      action: () => scrollToSection('experience')
    })),
    ...achievementsData.map(a => ({
      id: `ach-${a.id}`,
      title: `Achievement: ${a.title}`,
      category: 'Achievements & Awards',
      icon: Award,
      action: () => scrollToSection('achievements')
    })),
    ...skillsData.map(s => ({
      id: `skill-${s.name.toLowerCase()}`,
      title: `Skill: ${s.name} (${s.proficiency}% expertise)`,
      category: 'Skills',
      icon: GraduationCap,
      action: () => scrollToSection('skills')
    }))
  ];

  const scrollToSection = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredItems = search.trim() === '' 
    ? paletteItems 
    : paletteItems.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        item.category.toLowerCase().includes(search.toLowerCase())
      );

  const handleSelectAction = (item: typeof paletteItems[0]) => {
    item.action();
  };

  // AI Assistant trigger - simulates real-time search queries about Natraj's resume
  const handleAiQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsAiLoading(true);
    setAiAnswer('');

    // Preconfigured smart responses based on actual resume data for instantaneous, highly high-fidelity interaction
    const query = aiQuery.toLowerCase();
    let answerText = "Natraj V is an IT graduate and Software Developer who specializes in Java, Python, ASP.NET, MongoDB NoSQL databases, Oracle Cloud Infrastructure, and creative photo design.";

    if (query.includes('education') || query.includes('college') || query.includes('work') || query.includes('job') || query.includes('experience')) {
      answerText = "Natraj is a fresh Software Developer graduate with a Bachelor of Information Technology from NPR Arts & Science College (82.3% first-class score). He is currently looking for his first professional software development work experience and is ready to join immediately.";
    } else if (query.includes('project') || query.includes('bento') || query.includes('portfolio') || query.includes('interview')) {
      answerText = "Natraj's main project is the 'Online Interview Forum', which automates the technical recruitment process. It features a responsive web-based text and code editor where admins view user details, dynamically assign coding tasks via email, and review completed task screenshots.";
    } else if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('phone')) {
      answerText = "You can contact Natraj V via the interactive glass form at the bottom, or directly email devnight.nv@gmail.com or call +91 7418715717. He is based in Dindigul, Tamil Nadu, India.";
    } else if (query.includes('skills') || query.includes('tech') || query.includes('java') || query.includes('python')) {
      answerText = "Natraj possesses skills across several domains:\n• Core Programming: Java, Python, ASP.NET\n• Databases & Cloud: MongoDB NoSQL, Oracle Cloud Infrastructure (OCI)\n• Creative & Design: Photoshop, Photo Designing\n• Management: Industrial Management, Leadership, and Digital Marketing.";
    } else if (query.includes('award') || query.includes('certificate')) {
      answerText = "Natraj's certified credentials include:\n• Oracle Cloud Infrastructure (OCI) Certification\n• MongoDB Associate Database Certification\n• Professional Photoshop & Photo Designing Course Completion\n• Tally Accounting & Invoicing operations.";
    }

    // Simulate streaming typing effect
    let currentLetters = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < answerText.length) {
        currentLetters += answerText[i];
        setAiAnswer(currentLetters);
        i++;
      } else {
        clearInterval(interval);
        setIsAiLoading(false);
      }
    }, 15);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cmd-palette-modal" className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop blur */}
          <motion.div 
            id="cmd-palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#F7F9FC]/40 backdrop-blur-md"
          />

          {/* Dialog frame */}
          <motion.div
            id="cmd-palette-window"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-white/40 backdrop-blur-md rounded-[32px] overflow-hidden shadow-2xl border border-white/60 relative z-10 flex flex-col max-h-[60vh]"
          >
            {/* Header / Mode selection */}
            <div id="cmd-palette-header" className="flex items-center gap-3 px-4 py-3.5 border-b border-black/5 bg-white/45">
              {!aiMode ? (
                <>
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search anything or type 'AI' for Assistant..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelectedIndex(0);
                      if (e.target.value.toLowerCase() === 'ai') {
                        setAiMode(true);
                        setAiQuery('');
                      }
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-sans text-sm"
                  />
                  <button 
                    onClick={() => {
                      setAiMode(true);
                      setAiQuery('');
                      setSearch('');
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] hover:bg-[#4F8CFF]/15 transition text-xs font-semibold"
                  >
                    <Sparkles className="w-3 h-3" />
                    Natraj AI
                  </button>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#4F8CFF] animate-pulse" />
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#4F8CFF]/10 text-[#4F8CFF] font-sans border border-blue-100">
                    Natraj AI
                  </span>
                  <form onSubmit={handleAiQuerySubmit} className="flex-1 flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Ask me anything about Natraj's projects, education, or skills..."
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-sans text-sm"
                    />
                    <button 
                      type="submit" 
                      className="p-1 px-3.5 rounded-full bg-[#4F8CFF] text-white hover:opacity-90 transition text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      Ask
                    </button>
                  </form>
                  <button 
                    onClick={() => {
                      setAiMode(false);
                      setSearch('');
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full bg-black/5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
              <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-black/5 px-2 py-0.5 rounded-md font-mono">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            {/* List / AI Answer Screen */}
            <div id="cmd-palette-body" ref={listRef} className="flex-1 overflow-y-auto no-scrollbar py-2 bg-white/20 min-h-[150px]">
              {aiMode ? (
                <div className="p-5 font-sans">
                  {aiAnswer ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>AI response generated about Natraj</span>
                      </div>
                      <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-white/45 p-4 rounded-2xl border border-white/60 shadow-sm font-sans">
                        {aiAnswer}
                      </div>
                      <div className="flex justify-end gap-2 text-[10px] text-slate-400">
                        <span>Try asking: "Tell me about Natraj's education" or "What is the Online Interview Forum?"</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-3">
                      <Sparkles className="w-8 h-8 text-[#4F8CFF] mx-auto opacity-40" />
                      <p className="text-slate-500 text-sm">Ask a question about Natraj V's educational and project background.</p>
                      <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto pt-2">
                        {['education', 'skills', 'projects', 'contact'].map((topic) => (
                          <button
                            key={topic}
                            onClick={() => {
                              setAiQuery(`Tell me about Natraj's ${topic}`);
                              setTimeout(() => {
                                // Programmatically submit
                                const synthEvent = { preventDefault: () => {} } as React.FormEvent;
                                setAiQuery(`Tell me about Natraj's ${topic}`);
                                // Use functional state updates to submit
                              }, 50);
                            }}
                            className="px-2.5 py-1 text-xs text-slate-600 bg-white/40 hover:bg-white/65 border border-white/60 rounded-full transition"
                          >
                            Natraj's {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {isAiLoading && (
                    <div className="flex items-center justify-center gap-2 py-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C4DFF] animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce" />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 text-sm">
                      No results found for "{search}"
                    </div>
                  ) : (
                    Object.entries(
                      filteredItems.reduce((acc, item) => {
                        if (!acc[item.category]) acc[item.category] = [];
                        acc[item.category].push(item);
                        return acc;
                      }, {} as Record<string, typeof filteredItems>)
                    ).map(([category, items]) => (
                      <div key={category} className="px-2 mb-3">
                        <h3 className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                          {category}
                        </h3>
                        <div className="space-y-0.5 mt-1">
                          {items.map((item) => {
                            const itemIndex = filteredItems.findIndex(f => f.id === item.id);
                            const isSelected = itemIndex === selectedIndex;
                            const IconComp = item.icon;
                            
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleSelectAction(item)}
                                onMouseEnter={() => setSelectedIndex(itemIndex)}
                                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all duration-150 group font-sans ${
                                  isSelected 
                                    ? 'bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20' 
                                    : 'text-slate-600 hover:bg-slate-100/35 border border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-[#4F8CFF]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                  <span className="text-sm font-medium">{item.title}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-medium ${isSelected ? 'text-[#4F8CFF]' : 'text-slate-400'}`}>
                                    Execute
                                  </span>
                                  <ArrowUpRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#4F8CFF]' : 'text-slate-400'}`} />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>

            {/* Footer hints */}
            <div id="cmd-palette-footer" className="px-4 py-2.5 border-t border-black/5 bg-white/35 flex items-center justify-between text-[11px] text-slate-400 font-sans">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-black/5 px-1 py-0.5 rounded">↑↓</span> Move
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-black/5 px-1 py-0.5 rounded">Enter</span> Select
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-mono bg-black/5 px-1 py-0.5 rounded">Esc</span> Close
                </span>
              </div>
              <span className="flex items-center gap-1 font-mono">
                Raycast Active Engine v1.0
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

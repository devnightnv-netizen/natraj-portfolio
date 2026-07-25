import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Globe, Terminal, Cpu, Database, Sparkles, Code2, GraduationCap } from 'lucide-react';
import { skillsData } from '../data';
import { Skill } from '../types';

interface SkillsGridProps {
  skills?: Skill[];
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  const activeSkills = skills && skills.length > 0 ? skills : skillsData;
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'languages' | 'devops'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Map icon names from data to actual lucide components safely
  const renderIcon = (iconName: string, color: string) => {
    const iconProps = { className: 'w-5 h-5 transition-transform duration-300', style: { color } };
    switch (iconName) {
      case 'Layers': return <Layers {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      case 'Terminal': return <Terminal {...iconProps} />;
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'Database': return <Database {...iconProps} />;
      case 'Sparkles': return <Sparkles {...iconProps} />;
      default: return <Code2 {...iconProps} />;
    }
  };

  const filteredSkills = activeCategory === 'all'
    ? activeSkills
    : activeSkills.filter(s => s.category === activeCategory || (activeCategory === 'devops' && s.category === 'devops'));

  return (
    <section
      id="skills"
      className="relative py-24 px-4 bg-[#F7F9FC] overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-100/30 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#7C4DFF]/10 blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section title */}
        <div className="text-center space-y-3">
          <h2 className="text-[11px] font-bold tracking-widest text-[#4F8CFF] uppercase font-sans">
            Core Competencies
          </h2>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] bg-gradient-to-b from-[#1D1D1F] to-[#434343] bg-clip-text text-transparent font-display">
            The Technology Matrix
          </h3>
          <p className="text-sm text-black/50 max-w-lg mx-auto font-sans leading-relaxed">
            Crafting beautiful products using industrial-grade frameworks and cloud infrastructure.
          </p>
        </div>

        {/* Category triggers */}
        <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-black/5 rounded-full max-w-md mx-auto border border-black/[0.03]">
          {['all', 'languages', 'frontend', 'backend', 'devops'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold font-sans transition-all duration-300 uppercase tracking-wide cursor-pointer focus:outline-none ${
                activeCategory === cat
                  ? 'bg-white text-[#1D1D1F] shadow-sm border border-black/5'
                  : 'text-slate-500 hover:text-slate-800'
               }`}
            >
              {cat === 'all' ? 'All Tech' : cat}
            </button>
          ))}
        </div>

        {/* Skills grid container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: Skill) => {
              const isHovered = hoveredSkill === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white/40 backdrop-blur-md border border-white/60 p-5 rounded-[24px] sm:rounded-[32px] shadow-sm relative overflow-hidden flex flex-col gap-4 cursor-default group"
                >
                  {/* Dynamic hovering light matching brand color */}
                  <div 
                    className="absolute w-[120px] h-[120px] rounded-full blur-[45px] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 -top-10 -right-10 pointer-events-none"
                    style={{ backgroundColor: skill.color }}
                  />

                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/70 border border-white flex items-center justify-center p-2 shadow-sm group-hover:shadow transition">
                        {renderIcon(skill.icon, skill.color)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 font-sans group-hover:text-slate-900 transition">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span 
                      className="text-xs font-bold font-mono"
                      style={{ color: skill.color }}
                    >
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Proficiency loading bar in glass */}
                  <div className="space-y-1 font-sans">
                    <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden p-[1px] border border-white/40">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-semibold text-slate-400">
                      <span>Foundational</span>
                      <span>Production</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

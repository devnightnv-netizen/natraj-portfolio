import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Compass, Milestone, Sparkles, Award, User, Layers, ShieldCheck, Instagram, MessageSquare, Github, Linkedin, Mail } from 'lucide-react';
import { developerProfile } from '../data';

interface AboutProps {
  profile?: typeof developerProfile;
}

export default function About({ profile }: AboutProps) {
  const activeProfile = profile || developerProfile;
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="relative py-24 px-4 bg-[#F7F9FC] overflow-hidden"
    >
      {/* Soft auroras background */}
      <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] rounded-full bg-indigo-200/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-[#00D4FF]/10 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section title */}
        <div className="text-center space-y-3">
          <h2 className="text-[11px] font-bold tracking-widest text-[#4F8CFF] uppercase font-sans">
            Aesthetic & Journey
          </h2>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] bg-gradient-to-b from-[#1D1D1F] to-[#434343] bg-clip-text text-transparent font-display">
            The Vision Behind The Code
          </h3>
          <p className="text-sm text-black/50 max-w-lg mx-auto font-sans leading-relaxed">
            Building responsive system architectures, automated testing tools, and clean databases.
          </p>
        </div>

        {/* Section Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile, Mission, & Stat capsules */}
          <div className="lg:col-span-5 space-y-6">
            {/* Glass profile & mission card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white/40 backdrop-blur-md border border-white/60 p-6 sm:p-8 rounded-[32px] shadow-sm space-y-6"
            >
              <div className="flex items-center gap-4">
                {/* Simulated high-fidelity avatar icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#4F8CFF] via-[#7C4DFF] to-[#00D4FF] flex items-center justify-center p-[2px] shadow-md relative overflow-hidden">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-slate-800">
                    <User className="w-6 h-6 text-[#4F8CFF]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-sans">{activeProfile.name}</h4>
                  <p className="text-xs font-medium text-slate-400 font-sans">{activeProfile.title} • Tamil Nadu, India</p>
                </div>
              </div>

              <div className="h-[1px] bg-slate-200/50" />

              {/* Bio & Mission statements */}
              <div className="space-y-4 font-sans">
                <div className="flex gap-3">
                  <Compass className="w-5 h-5 text-[#4F8CFF] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeProfile.about}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Target className="w-5 h-5 text-[#7C4DFF] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-700">Mission:</strong> {activeProfile.mission}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-slate-200/50" />

              {/* Direct Hotlines Grid */}
              <div className="space-y-3 font-sans pt-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Direct Hotlines & Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href={activeProfile.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10 hover:bg-emerald-500/[0.08] transition text-slate-600 hover:text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium font-mono text-[10px] truncate">{activeProfile.contact.whatsapp}</span>
                  </a>
                  <a
                    href={`mailto:${activeProfile.contact.email}`}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-rose-500/[0.03] border border-rose-500/10 hover:bg-rose-500/[0.08] transition text-slate-600 hover:text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium font-mono text-[10px] truncate">{activeProfile.contact.email}</span>
                  </a>
                  <a
                    href={activeProfile.contact.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-500/[0.03] border border-slate-500/10 hover:bg-slate-500/[0.08] transition text-slate-600 hover:text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700">
                      <Github className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium font-mono text-[10px] truncate">{activeProfile.contact.github}</span>
                  </a>
                  <a
                    href={activeProfile.contact.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-blue-500/[0.03] border border-blue-500/10 hover:bg-blue-500/[0.08] transition text-slate-600 hover:text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                      <Linkedin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium font-mono text-[10px] truncate">{activeProfile.contact.linkedin}</span>
                  </a>
                  <a
                    href={activeProfile.contact.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-pink-500/[0.03] border border-pink-500/10 hover:bg-pink-500/[0.08] transition col-span-1 sm:col-span-2 text-slate-600 hover:text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-600">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium font-mono text-[10px] truncate">{activeProfile.contact.instagram}</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Stat grid */}
            <div className="grid grid-cols-2 gap-4">
              {activeProfile.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl text-center relative overflow-hidden shadow-sm"
                >
                  <span className="text-2xl font-bold font-display text-slate-800 block text-glow-primary">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-sans mt-1 block">
                    {stat.label}
                  </span>
                  {hoveredStat === index && (
                    <motion.div
                      layoutId="statGlow"
                      className="absolute inset-0 bg-gradient-to-tr from-[#4F8CFF]/5 via-transparent to-[#00D4FF]/5 pointer-events-none"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Timeline */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/40 backdrop-blur-md border border-white/60 p-6 sm:p-8 rounded-[32px] shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                <Milestone className="w-5 h-5 text-[#4F8CFF]" />
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-black/40 font-sans">
                  Milestone Roadmap
                </h4>
              </div>

              {/* Connected chronological items */}
              <div className="relative border-l border-slate-200/80 ml-3 pl-6 space-y-8 py-2">
                {activeProfile.journey.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative group cursor-default"
                  >
                    {/* Circle timeline connector */}
                    <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-white bg-gradient-to-tr from-[#4F8CFF] to-[#00D4FF] shadow-sm flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>

                    <div className="space-y-1.5 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#4F8CFF]/10 text-[#4F8CFF] font-mono">
                          {item.year}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">Milestone</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed group-hover:text-slate-900 transition">
                        {item.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quality statement */}
              <div className="mt-8 pt-6 border-t border-slate-200/50 flex items-center gap-3.5 text-slate-400">
                <ShieldCheck className="w-5 h-5 text-[#4F8CFF]" />
                <p className="text-[11px] font-sans italic leading-relaxed max-w-md">
                  "Quality code is structured design built for longevity. Every file I construct adheres to clean, validated architecture principles."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

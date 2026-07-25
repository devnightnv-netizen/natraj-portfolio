import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Trophy, Star, ShieldCheck, Sparkles, Flame, CheckCircle } from 'lucide-react';
import { achievementsData } from '../data';

export default function Achievements() {
  const [experienceCount, setExperienceCount] = useState(0);
  const [sprintCount, setSprintCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0);

  // Smooth numeric counter animation on mount
  useEffect(() => {
    let expTimer = setInterval(() => {
      setExperienceCount((prev) => {
        if (prev >= 1) { clearInterval(expTimer); return 1; }
        return prev + 1;
      });
    }, 100);

    let sprintTimer = setInterval(() => {
      setSprintCount((prev) => {
        if (prev >= 24) { clearInterval(sprintTimer); return 24; }
        return prev + 1;
      });
    }, 40);

    let commitTimer = setInterval(() => {
      setCommitCount((prev) => {
        if (prev >= 4800) { clearInterval(commitTimer); return 4800; }
        return prev + 150;
      });
    }, 25);

    return () => {
      clearInterval(expTimer);
      clearInterval(sprintTimer);
      clearInterval(commitTimer);
    };
  }, []);

  return (
    <section
      id="achievements"
      className="relative py-24 px-4 bg-[#F7F9FC] overflow-hidden"
    >
      {/* Background radial auroras */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-blue-100/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[320px] h-[320px] rounded-full bg-purple-100/20 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section title */}
        <div className="text-center space-y-3">
          <h2 className="text-[11px] font-bold tracking-widest text-[#4F8CFF] uppercase font-sans">
            Accolades & Credentials
          </h2>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] bg-gradient-to-b from-[#1D1D1F] to-[#434343] bg-clip-text text-transparent font-display">
            Honors & Certifications
          </h3>
          <p className="text-sm text-black/50 max-w-lg mx-auto font-sans leading-relaxed">
            Industry validation, AWS certified technical blueprints, and hackathon triumphs.
          </p>
        </div>

        {/* Counter dashboard stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[32px] text-center shadow-sm relative overflow-hidden group">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-3 text-[#4F8CFF]">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-4xl font-semibold font-display tracking-tight text-slate-800 block">
              {experienceCount}+
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans mt-1.5 block">
              Years Experience
            </span>
            <p className="text-[11px] text-slate-500 font-sans mt-2 max-w-[200px] mx-auto leading-relaxed">
              Designing user workspaces and cloud routing layouts.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[32px] text-center shadow-sm relative overflow-hidden group">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3 text-[#7C4DFF]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-4xl font-semibold font-display tracking-tight text-slate-800 block">
              {sprintCount}+
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans mt-1.5 block">
              SaaS Shipments
            </span>
            <p className="text-[11px] text-slate-500 font-sans mt-2 max-w-[200px] mx-auto leading-relaxed">
              Production grade web dashboards and interactive widgets.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[32px] text-center shadow-sm relative overflow-hidden group">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-500">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <span className="text-4xl font-semibold font-display tracking-tight text-slate-800 block">
              {(commitCount / 1000).toFixed(1)}k+
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans mt-1.5 block">
              Commit History
            </span>
            <p className="text-[11px] text-slate-500 font-sans mt-2 max-w-[200px] mx-auto leading-relaxed">
              Documented code updates across active repositories.
            </p>
          </div>
        </div>

        {/* Accolades grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsData.map((ach, idx) => {
            const isAward = ach.type === 'award';
            const isCert = ach.type === 'certification';
            
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[32px] flex flex-col justify-between shadow-sm relative overflow-hidden group"
              >
                {/* Visual Glow */}
                <div className="absolute w-[100px] h-[100px] rounded-full blur-[40px] opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500 -top-10 -right-10 bg-[#4F8CFF]" />

                <div className="space-y-4 font-sans">
                  {/* Category icon header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-black/5 text-slate-500 font-mono">
                      {ach.type}
                    </span>
                    
                    {isAward && <Trophy className="w-5 h-5 text-amber-500" />}
                    {isCert && <ShieldCheck className="w-5 h-5 text-blue-500" />}
                    {!isAward && !isCert && <Sparkles className="w-5 h-5 text-purple-500" />}
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-slate-900 transition leading-snug">
                      {ach.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#4F8CFF]">
                      <span>{ach.issuer}</span>
                      <span>•</span>
                      <span className="text-slate-400 font-mono font-normal">{ach.date}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {ach.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-semibold pt-4">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Credential Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

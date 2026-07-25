import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data';
import { Experience } from '../types';

interface ExperienceTimelineProps {
  experience?: Experience[];
}

export default function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  const activeExperience = experience && experience.length > 0 ? experience : experienceData;

  return (
    <section
      id="experience"
      className="relative py-24 px-4 bg-[#F7F9FC] overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-[40%] left-[5%] w-[320px] h-[320px] rounded-full bg-blue-100/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[280px] h-[280px] rounded-full bg-purple-100/20 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section title */}
        <div className="text-center space-y-3">
          <h2 className="text-[11px] font-bold tracking-widest text-[#4F8CFF] uppercase font-sans">
            Education & Milestones
          </h2>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] bg-gradient-to-b from-[#1D1D1F] to-[#434343] bg-clip-text text-transparent font-display">
            The Learning Journey
          </h3>
          <p className="text-sm text-black/50 max-w-lg mx-auto font-sans leading-relaxed">
            Academic foundation, specialized certifications, and core technology milestones.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative border-l-2 border-slate-200/80 pl-6 md:pl-10 ml-4 md:ml-8 space-y-12 py-4">
          {activeExperience.map((exp: Experience, idx: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group font-sans"
            >
              {/* Chronological circular icon marker */}
              <span className="absolute -left-[38px] md:-left-[54px] top-1.5 w-6 h-6 rounded-full border-4 border-[#F7F9FC] bg-gradient-to-tr from-[#4F8CFF] via-[#7C4DFF] to-[#00D4FF] shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <GraduationCap className="w-3.5 h-3.5 text-white" />
              </span>

              {/* Experience glass card */}
              <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 sm:p-8 rounded-[32px] shadow-sm hover:border-[#4F8CFF]/50 hover:bg-white/45 transition-all duration-300 flex flex-col gap-5">
                {/* Header detail */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-[#4F8CFF] transition duration-300">
                      {exp.role}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <span className="text-[#4F8CFF] font-bold text-sm tracking-tight">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full bg-white border border-slate-200/50 shadow-sm text-xs font-bold text-slate-600 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#4F8CFF]" />
                    {exp.period}
                  </span>
                </div>

                <div className="h-[1px] bg-black/5" />

                {/* Professional accomplishments */}
                <ul className="space-y-3">
                  {exp.description.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Accomplished Tech badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 self-center">
                    Stack:
                  </span>
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold bg-[#4F8CFF]/5 border border-[#4F8CFF]/10 px-2.5 py-0.5 rounded-md text-[#4F8CFF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Star, GitFork, Eye, Sparkles, X, ChevronLeft, ChevronRight, ArrowUpRight, Terminal } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

interface ProjectsBentoProps {
  projects?: Project[];
}

export default function ProjectsBento({ projects = projectsData }: ProjectsBentoProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'web' | 'mobile' | 'ai' | 'cloud'>('all');
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);

  const filteredProjects = filterCategory === 'all'
    ? projects
    : projects.filter(p => p.category === filterCategory);

  const handleNextProject = () => {
    setActiveScrollIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrevProject = () => {
    setActiveScrollIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section
      id="projects"
      className="relative py-24 px-4 bg-white text-slate-900 overflow-hidden border-t border-slate-100"
    >
      {/* Background subtle gradient blobs */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[140px] pointer-events-none" />

      {/* HUGE BACKGROUND DISPLAY TYPOGRAPHY - "PROJECTS" */}
      <div className="relative z-0 pointer-events-none select-none text-center">
        <h2 className="text-[64px] sm:text-[110px] md:text-[160px] lg:text-[220px] font-black tracking-tighter uppercase font-display text-slate-100 leading-none -mb-10 sm:-mb-24">
          PROJECTS
        </h2>
      </div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* Section title header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-[11px] font-bold tracking-widest uppercase font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Slide Deck</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
            Featured Showcase
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto font-sans leading-relaxed">
            Slide through curated production systems, technical architectures, and live deployments.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-1.5 p-1.5 bg-slate-100/80 backdrop-blur-md rounded-2xl border border-slate-200 max-w-md mx-auto shadow-sm">
          {['all', 'web', 'mobile', 'ai', 'cloud'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat as any);
                setActiveScrollIndex(0);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold font-sans transition-all duration-300 uppercase tracking-wider cursor-pointer focus:outline-none ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
               }`}
            >
              {cat === 'all' ? 'All Work' : cat}
            </button>
          ))}
        </div>

        {/* SLIDE DECK CAROUSEL SHOWCASE */}
        {filteredProjects.length > 0 && (
          <div className="space-y-6 pt-2">
            <div className="relative">
              <AnimatePresence mode="wait">
                {(() => {
                  const proj = filteredProjects[activeScrollIndex] || filteredProjects[0];
                  return (
                    <motion.div
                      key={proj.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-white rounded-[32px] border border-slate-200/90 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden text-slate-900"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left image mockup */}
                        <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl group/img">
                          {/* Browser frame dots header */}
                          <div className="h-8 bg-slate-800 border-b border-slate-700/80 px-3 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                              <span className="text-[10px] font-mono text-slate-400 ml-2 truncate max-w-[200px]">
                                https://{proj.id}.app
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                              SLIDE {activeScrollIndex + 1} / {filteredProjects.length}
                            </span>
                          </div>

                          {/* Image preview */}
                          <div className="relative h-64 sm:h-80 overflow-hidden">
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                            {/* Hover overlay inspect button */}
                            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <button
                                onClick={() => setSelectedProject(proj)}
                                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition cursor-pointer"
                              >
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <span>Inspect Architecture</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right Details */}
                        <div className="lg:col-span-5 space-y-5 font-sans">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full">
                              {proj.subtitle || proj.category}
                            </span>

                            {proj.stats?.stars && (
                              <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                {proj.stats.stars}
                              </span>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                              {proj.title}
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {proj.description}
                            </p>
                          </div>

                          {/* Stack Tags */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Technologies
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {proj.tags.map((t, i) => (
                                <span key={i} className="text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-lg">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action CTA buttons */}
                          <div className="pt-2 flex flex-wrap items-center gap-3">
                            <button
                              onClick={() => setSelectedProject(proj)}
                              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition cursor-pointer"
                            >
                              <Sparkles className="w-4 h-4" />
                              <span>View Specs</span>
                            </button>

                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                              >
                                <span>Live Demo</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                              </a>
                            )}

                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                                title="Source Code"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>

              {/* Prev/Next Navigation Buttons */}
              <button
                onClick={handlePrevProject}
                className="absolute left-[-16px] sm:left-[-20px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-xl flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer z-20"
                title="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextProject}
                className="absolute right-[-16px] sm:right-[-20px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-xl flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer z-20"
                title="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination & Counter */}
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-bold font-mono text-slate-400">
                0{activeScrollIndex + 1} / 0{filteredProjects.length}
              </span>

              <div className="flex items-center gap-2">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveScrollIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeScrollIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                Use arrows to navigate deck
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modal Drawer details for clicked project */}
      <AnimatePresence>
        {selectedProject && (
          <div id="project-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col font-sans text-slate-900"
            >
              {/* Image banner */}
              <div className="h-[220px] relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full border border-white/20 text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Brand Banner Title */}
                <div className="absolute bottom-4 left-6 text-white space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-600 px-3 py-1 rounded-full text-white">
                    {selectedProject.subtitle || selectedProject.category}
                  </span>
                  <h4 className="text-3xl font-extrabold font-display tracking-tight text-white mt-1">
                    {selectedProject.title}
                  </h4>
                </div>
              </div>

              {/* Text specifications */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto no-scrollbar bg-white">
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase text-blue-600 font-sans tracking-widest">
                    Architectural Overview
                  </h5>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase text-blue-600 font-sans tracking-widest">
                    Integrated Stack
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Statistics panel */}
                {selectedProject.stats && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase text-blue-600 font-sans tracking-widest">
                      Repository Intelligence
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 mx-auto mb-1" />
                        <span className="text-xs font-bold text-slate-900 block">{selectedProject.stats.stars || 0}</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase font-sans">Stars</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                        <GitFork className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                        <span className="text-xs font-bold text-slate-900 block">{selectedProject.stats.forks || 0}</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase font-sans">Forks</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                        <Eye className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                        <span className="text-xs font-bold text-slate-900 block">{selectedProject.stats.views || 0}</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase font-sans">Views</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Licensed under Apache-2.0</span>
                </div>
                <div className="flex gap-2">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 transition text-xs font-bold flex items-center gap-1.5 text-slate-800"
                    >
                      <Github className="w-4 h-4" />
                      <span>Codebase</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


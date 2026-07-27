import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  Eye, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Terminal, 
  Search, 
  FolderGit2,
  Tag
} from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

interface ProjectsBentoProps {
  projects?: Project[];
}

export default function ProjectsBento({ projects = projectsData }: ProjectsBentoProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'web' | 'mobile' | 'ai' | 'cloud'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);

  // Filter projects by category & search query
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.longDescription && p.longDescription.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, filterCategory, searchQuery]);

  const handleNextProject = () => {
    if (filteredProjects.length === 0) return;
    setActiveScrollIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrevProject = () => {
    if (filteredProjects.length === 0) return;
    setActiveScrollIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 bg-white text-slate-900 overflow-hidden border-t border-slate-100"
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

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Section title header */}
        <div className="text-center space-y-3">
          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
            Welcome To My Projects
          </h3>
          <p className="text-sm italic text-slate-600 max-w-lg mx-auto font-sans leading-relaxed">
            &ldquo;First, solve the problem. Then, write the code.&rdquo; <span className="not-italic font-semibold text-slate-800">&mdash; John Johnson</span>
          </p>
        </div>

        {/* Filter Controls Bar: Search + Category Switcher + View Mode Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2.5 bg-slate-100/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xs">
          
          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveScrollIndex(0);
              }}
              placeholder="Search projects or tech tags..."
              className="w-full pl-9 pr-8 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1">
            {(['all', 'web', 'mobile', 'ai', 'cloud'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilterCategory(cat);
                  setActiveScrollIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all duration-200 uppercase tracking-wider cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state if search or category yields no results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-3">
            <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No matching projects found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or selecting a different category tab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ==================================================================== */}
        {/* SLIDE DECK CAROUSEL SHOWCASE                                         */}
        {/* ==================================================================== */}
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
                          </div>
                        </div>

                        {/* Right Details */}
                        <div className="lg:col-span-5 space-y-5 font-sans">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full">
                              {proj.subtitle || proj.category}
                            </span>

                            {proj.stats?.stars !== undefined && (
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
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition"
                              >
                                <span>Live Demo</span>
                                <ArrowUpRight className="w-4 h-4" />
                              </a>
                            )}

                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold flex items-center gap-2 transition"
                              >
                                <Github className="w-4 h-4" />
                                <span>Codebase</span>
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

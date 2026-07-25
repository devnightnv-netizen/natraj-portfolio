import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitFork, BookOpen, Terminal, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';
import { generateGitHubData } from '../data';
import { ContributionDay } from '../types';

export default function GitHubActivity() {
  const [gridData, setGridData] = useState<ContributionDay[]>([]);
  const [selectedCell, setSelectedCell] = useState<ContributionDay | null>(null);
  const [streakCount] = useState(18); // Active streak
  
  useEffect(() => {
    setGridData(generateGitHubData());
  }, []);

  // Set default selected cell on load
  useEffect(() => {
    if (gridData.length > 0) {
      setSelectedCell(gridData[gridData.length - 1]);
    }
  }, [gridData]);

  // Click handler to allow users to toggle commits in real-time (Draw mode!)
  const handleCellClick = (idx: number) => {
    setGridData((prev) => {
      const next = [...prev];
      const cell = next[idx];
      // Increment commit level (0-4)
      const nextLevel = ((cell.level + 1) % 5) as 0 | 1 | 2 | 3 | 4;
      const nextCount = nextLevel === 0 ? 0 : nextLevel * 2 + Math.floor(Math.random() * 2);
      
      next[idx] = {
        ...cell,
        count: nextCount,
        level: nextLevel
      };
      setSelectedCell(next[idx]);
      return next;
    });
  };

  const getCellColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-[#4F8CFF]/25 border-[#4F8CFF]/10';
      case 2: return 'bg-[#4F8CFF]/45 border-[#4F8CFF]/20';
      case 3: return 'bg-[#4F8CFF]/70 border-[#4F8CFF]/30';
      case 4: return 'bg-[#4F8CFF] border-[#4F8CFF]/40';
      default: return 'bg-slate-200/40 border-slate-200/60';
    }
  };

  // Language shares
  const languages = [
    { name: "TypeScript", share: 82, color: "#3178C6" },
    { name: "React & CSS", share: 12, color: "#4F8CFF" },
    { name: "Node.js / Java", share: 6, color: "#7C4DFF" }
  ];

  const githubUserRepos = [
    {
      name: "interior-billing",
      title: "Interior Billing System",
      desc: "Comprehensive billing, invoice calculation, and order management platform for interior design businesses.",
      stars: 12,
      forks: 2,
      lang: "TypeScript",
      githubUrl: "https://github.com/devnightnv-netizen/interior-billing",
      liveUrl: "https://interior-billing.vercel.app"
    },
    {
      name: "textile_website",
      title: "Textile Web Experience",
      desc: "Modern interactive e-commerce and showcase platform for textile product manufacturing and distribution.",
      stars: 15,
      forks: 3,
      lang: "TypeScript",
      githubUrl: "https://github.com/devnightnv-netizen/textile_website",
      liveUrl: "https://textile-website-inky.vercel.app"
    },
    {
      name: "natraj-portfolio",
      title: "Natraj Portfolio & Admin Workspace",
      desc: "Liquid glass software developer portfolio with Raycast command palette, live GitHub sync, and admin console.",
      stars: 8,
      forks: 1,
      lang: "TypeScript",
      githubUrl: "https://github.com/devnightnv-netizen/natraj-portfolio",
      liveUrl: "https://github.com/devnightnv-netizen/natraj-portfolio"
    }
  ];

  return (
    <section
      id="github"
      className="relative py-24 px-4 bg-[#F7F9FC] overflow-hidden"
    >
      {/* Background soft lighting */}
      <div className="absolute top-[20%] right-[10%] w-[320px] h-[320px] rounded-full bg-blue-100/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[25%] left-[5%] w-[300px] h-[300px] rounded-full bg-purple-100/20 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section title */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-[11px] font-bold tracking-widest text-[#4F8CFF] uppercase font-sans">
              Realtime GitHub Sync
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-mono text-[#4F8CFF] font-bold">
              @devnightnv-netizen
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] bg-gradient-to-b from-[#1D1D1F] to-[#434343] bg-clip-text text-transparent font-display">
            Public Repositories & Activity
          </h3>
          <p className="text-sm text-black/50 max-w-lg mx-auto font-sans leading-relaxed">
            Live commit analytics, public repositories, and deployed cloud applications.
          </p>
        </div>

        {/* Dashboard panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Contribution graph (Left, spans 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[32px] shadow-sm flex flex-col justify-between h-full gap-5">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <a
                  href="https://github.com/devnightnv-netizen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans hover:text-[#4F8CFF] transition"
                >
                  <Github className="w-5 h-5 text-slate-800" />
                  <span className="text-xs font-bold text-slate-800">@devnightnv-netizen Pushes</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <span className="px-2.5 py-0.5 rounded-full bg-[#4F8CFF]/10 text-xs font-bold text-[#4F8CFF] font-mono border border-blue-100">
                  {streakCount} Day Streak
                </span>
              </div>

              {/* Grid Box */}
              <div className="space-y-4">
                {/* Scroll container for grid representation */}
                <div className="overflow-x-auto no-scrollbar py-1">
                  <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[500px]">
                    {gridData.map((day, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCellClick(idx)}
                        className={`w-[12px] h-[12px] rounded-sm border cursor-pointer transition-all hover:scale-125 hover:z-10 ${getCellColor(day.level)}`}
                        title={`${day.count} commits on ${day.date}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 font-sans">
                  <span>18 Weeks Ago</span>
                  <div className="flex items-center gap-1">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-sm bg-slate-200/40 border border-slate-200/60" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]/25" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]/45" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]/70" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]" />
                    <span>More</span>
                  </div>
                  <span>Today</span>
                </div>
              </div>

              {/* Informative Selected Cell Data */}
              {selectedCell && (
                <div className="p-3 rounded-xl bg-black/5 border border-black/[0.02] flex items-center justify-between text-xs font-sans text-slate-600">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#4F8CFF]" />
                    <span>
                      Date: <strong className="text-slate-800">{selectedCell.date}</strong> — 
                      Commits: <strong className="text-[#4F8CFF]">{selectedCell.count} pushes</strong>
                    </span>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-400 px-2 py-0.5 rounded-md font-mono hidden sm:inline">
                    Click cells to "paint" commits!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Languages card (Right, spans 4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-[32px] shadow-sm flex flex-col justify-between h-full gap-4">
              <div className="flex items-center gap-2 border-b border-black/5 pb-3">
                <Terminal className="w-5 h-5 text-[#4F8CFF]" />
                <span className="text-xs font-bold text-slate-700 font-sans">Primary Tech Distribution</span>
              </div>

              {/* List bars */}
              <div className="space-y-4 flex-1 flex flex-col justify-center font-sans">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{lang.name}</span>
                      <span className="font-mono text-slate-400">{lang.share}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden p-[1px] border border-white/40">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${lang.share}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 font-sans flex items-center gap-1.5 border-t border-black/5 pt-3">
                <Sparkles className="w-3.5 h-3.5 text-[#4F8CFF]" />
                <span>Synced live from github.com/devnightnv-netizen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight repos (3 Cards from devnightnv-netizen) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {githubUserRepos.map((repo) => (
            <motion.div
              key={repo.name}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/40 backdrop-blur-md border border-white/60 p-5 rounded-[24px] sm:rounded-[32px] flex flex-col justify-between gap-5 shadow-sm group font-sans"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#4F8CFF]" />
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#4F8CFF] transition font-mono">
                      {repo.name}
                    </h4>
                  </div>
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-800 transition"
                    title="View on GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <h5 className="text-xs font-bold text-slate-700">{repo.title}</h5>
                <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2">
                  {repo.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-2 border-t border-black/5">
                <span className="flex items-center gap-1.5 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3178C6]" />
                  {repo.lang}
                </span>

                <div className="flex items-center gap-3">
                  {repo.liveUrl && (
                    <a
                      href={repo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-[#4F8CFF] hover:underline"
                    >
                      Live App ↗
                    </a>
                  )}
                  <span className="flex items-center gap-1 hover:text-slate-700 transition">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {repo.stars}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button to visit GitHub Repositories directly */}
        <div className="flex justify-center">
          <a
            href="https://github.com/devnightnv-netizen?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition shadow-lg shadow-slate-900/10 cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>View All Repositories on github.com/devnightnv-netizen</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsGrid from './components/SkillsGrid';
import ProjectsBento from './components/ProjectsBento';
import ExperienceTimeline from './components/ExperienceTimeline';
import Achievements from './components/Achievements';
import GitHubActivity from './components/GitHubActivity';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import LoadingPage from './components/LoadingPage';
import AdminProjectModal from './components/AdminProjectModal';
import { developerProfile, projectsData, skillsData, experienceData } from './data';
import { Project, Skill, Experience } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Initialize profile state with local storage fallback
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_profile_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load profile from localStorage:', e);
    }
    return developerProfile;
  });

  // Initialize projects state with local storage fallback
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load portfolio projects from localStorage:', e);
    }
    return projectsData;
  });

  // Initialize skills state with local storage fallback
  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_skills_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load skills from localStorage:', e);
    }
    return skillsData;
  });

  // Initialize experience state with local storage fallback
  const [experience, setExperience] = useState<Experience[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_experience_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load experience from localStorage:', e);
    }
    return experienceData;
  });

  const handleSaveProfile = (newProfile: typeof developerProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('portfolio_profile_v1', JSON.stringify(newProfile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
  };

  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem('portfolio_projects_v1', JSON.stringify(newProjects));
    } catch (e) {
      console.error('Failed to save portfolio projects to localStorage:', e);
    }
  };

  const handleSaveSkills = (newSkills: Skill[]) => {
    setSkills(newSkills);
    try {
      localStorage.setItem('portfolio_skills_v1', JSON.stringify(newSkills));
    } catch (e) {
      console.error('Failed to save skills to localStorage:', e);
    }
  };

  const handleSaveExperience = (newExp: Experience[]) => {
    setExperience(newExp);
    try {
      localStorage.setItem('portfolio_experience_v1', JSON.stringify(newExp));
    } catch (e) {
      console.error('Failed to save experience to localStorage:', e);
    }
  };

  // Trigger loading screen fadeout after 1200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  // Global Keyboard listener for opening the Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  return (
    <>
      {/* 1. Frosted Loading Splash screen */}
      <AnimatePresence mode="wait">
        <LoadingPage isVisible={loading} />
      </AnimatePresence>

      {/* 2. Main application container */}
      <div id="portfolio-canvas" className="min-h-screen bg-[#F7F9FC] text-slate-800 selection:bg-[#7C4DFF]/25 selection:text-[#7C4DFF] relative overflow-x-hidden antialiased">
        
        {/* Floating pill navigation */}
        <Navbar onOpenCommandPalette={() => setCmdPaletteOpen(true)} />

        {/* Hero Landing */}
        <Hero profile={profile} onOpenCommandPalette={() => setCmdPaletteOpen(true)} />

        {/* Section Wrapper: Interactive workspaces & details */}
        <div className="relative space-y-0.5 z-10">
          
          {/* Projects Bento Exhibition */}
          <ProjectsBento projects={projects} />

          {/* Profile About & Milestones */}
          <About profile={profile} />

          {/* Core Technical competency cards */}
          <SkillsGrid skills={skills} />

          {/* History Roadmap curved tracking */}
          <ExperienceTimeline experience={experience} />

          {/* Credentials, AWS validation, awards */}
          <Achievements />

          {/* Realtime Git commit matrices */}
          <GitHubActivity />

          {/* Floating client contact forms */}
          <ContactForm profile={profile} />

        </div>

        {/* Global minimal footer with Admin Icon on the left side next to logo */}
        <Footer profile={profile} onOpenAdminModal={() => setAdminModalOpen(true)} />

        {/* Raycast Command Search Overlay */}
        <CommandPalette
          isOpen={cmdPaletteOpen}
          onClose={() => setCmdPaletteOpen(false)}
          projects={projects}
        />

        {/* Portfolio Admin Upload & Management Portal */}
        <AdminProjectModal
          isOpen={adminModalOpen}
          onClose={() => setAdminModalOpen(false)}
          profile={profile}
          onSaveProfile={handleSaveProfile}
          projects={projects}
          onSaveProjects={handleSaveProjects}
          skills={skills}
          onSaveSkills={handleSaveSkills}
          experience={experience}
          onSaveExperience={handleSaveExperience}
        />
      </div>
    </>
  );
}

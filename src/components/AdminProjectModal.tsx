import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  PlusCircle,
  Upload,
  Trash2,
  Edit3,
  X,
  Image as ImageIcon,
  Sparkles,
  Check,
  ExternalLink,
  Github,
  Star,
  GitFork,
  Eye,
  EyeOff,
  RefreshCw,
  FolderPlus,
  Layers,
  Link as LinkIcon,
  CheckCircle2,
  Lock,
  User,
  KeyRound,
  LogOut,
  ShieldAlert,
  ArrowRight,
  GraduationCap,
  Compass,
  Target,
  Mail,
  Phone,
  MessageSquare,
  Linkedin,
  Instagram,
  Code2,
  Cpu,
  Terminal,
  Database,
  Globe,
  Calendar,
  MapPin,
  Save,
  Briefcase
} from 'lucide-react';
import { Project, Skill, Experience } from '../types';
import { developerProfile as defaultProfile, projectsData as defaultProjects, skillsData as defaultSkills, experienceData as defaultExperience } from '../data';
import { fetchGitHubRepos } from '../services/github';

export interface DeveloperProfile {
  name: string;
  title: string;
  tagline: string;
  about: string;
  mission: string;
  contact: {
    whatsapp: string;
    whatsappUrl: string;
    email: string;
    github: string;
    githubUrl: string;
    instagram: string;
    instagramUrl: string;
    linkedin: string;
    linkedinUrl: string;
  };
  journey: Array<{ year: string; event: string }>;
  stats: Array<{ value: string; label: string }>;
}

interface AdminProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Profile
  profile?: DeveloperProfile;
  onSaveProfile?: (newProfile: DeveloperProfile) => void;
  // Projects
  projects: Project[];
  onSaveProjects: (newProjects: Project[]) => void;
  // Skills
  skills?: Skill[];
  onSaveSkills?: (newSkills: Skill[]) => void;
  // Experience
  experience?: Experience[];
  onSaveExperience?: (newExp: Experience[]) => void;
}

// Tech cover presets for quick selection
const PRESET_IMAGES = [
  { name: 'AI & Data Processing', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cloud Infrastructure', url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80' },
  { name: 'Code Sandbox & Analytics', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { name: 'Creative Design Canvas', url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80' },
  { name: 'Full-Stack Web App', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mobile Application', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80' }
];

export default function AdminProjectModal({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  projects,
  onSaveProjects,
  skills,
  onSaveSkills,
  experience,
  onSaveExperience,
}: AdminProjectModalProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('portfolio_admin_authed') === 'true';
    } catch {
      return false;
    }
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Main Section Tab Navigation
  const [mainTab, setMainTab] = useState<'projects' | 'profile' | 'skills' | 'experience'>('projects');

  // Projects Tab Sub-state
  const [projectSubTab, setProjectSubTab] = useState<'add' | 'manage' | 'github'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [githubUsernameInput, setGithubUsernameInput] = useState('devnightnv-netizen');
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);

  const handleSyncGitHubRepos = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!githubUsernameInput.trim()) return;

    setIsSyncingGithub(true);
    try {
      const fetchedProjects = await fetchGitHubRepos(githubUsernameInput.trim());
      if (fetchedProjects.length === 0) {
        showNotification(`No public repositories found for @${githubUsernameInput}`);
      } else {
        const existingMap = new Map(projects.map((p) => [p.id, p]));
        fetchedProjects.forEach((fp) => {
          existingMap.set(fp.id, fp);
        });
        const updatedList = Array.from(existingMap.values());
        onSaveProjects(updatedList);
        showNotification(`Successfully fetched & imported ${fetchedProjects.length} GitHub repositories from @${githubUsernameInput}!`);
      }
    } catch (err: any) {
      console.error('Failed to sync GitHub repos:', err);
      showNotification(`Error: ${err.message || 'Failed to fetch GitHub repositories'}`);
    } finally {
      setIsSyncingGithub(false);
    }
  };

  // Project Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState<'web' | 'mobile' | 'ai' | 'cloud'>('web');
  const [tagsInput, setTagsInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [stars, setStars] = useState<number>(12);
  const [forks, setForks] = useState<number>(3);
  const [views, setViews] = useState<number>(150);

  // Profile Form States
  const activeProfile = profile || defaultProfile;
  const [profName, setProfName] = useState(activeProfile.name);
  const [profTitle, setProfTitle] = useState(activeProfile.title);
  const [profTagline, setProfTagline] = useState(activeProfile.tagline);
  const [profAbout, setProfAbout] = useState(activeProfile.about);
  const [profMission, setProfMission] = useState(activeProfile.mission);
  const [profEmail, setProfEmail] = useState(activeProfile.contact.email);
  const [profWhatsapp, setProfWhatsapp] = useState(activeProfile.contact.whatsapp);
  const [profWhatsappUrl, setProfWhatsappUrl] = useState(activeProfile.contact.whatsappUrl);
  const [profGithub, setProfGithub] = useState(activeProfile.contact.github);
  const [profGithubUrl, setProfGithubUrl] = useState(activeProfile.contact.githubUrl);
  const [profLinkedin, setProfLinkedin] = useState(activeProfile.contact.linkedin);
  const [profLinkedinUrl, setProfLinkedinUrl] = useState(activeProfile.contact.linkedinUrl);
  const [profInstagram, setProfInstagram] = useState(activeProfile.contact.instagram);
  const [profInstagramUrl, setProfInstagramUrl] = useState(activeProfile.contact.instagramUrl);

  // Sync profile local form state when profile prop changes
  useEffect(() => {
    if (profile) {
      setProfName(profile.name);
      setProfTitle(profile.title);
      setProfTagline(profile.tagline);
      setProfAbout(profile.about);
      setProfMission(profile.mission);
      setProfEmail(profile.contact.email);
      setProfWhatsapp(profile.contact.whatsapp);
      setProfWhatsappUrl(profile.contact.whatsappUrl);
      setProfGithub(profile.contact.github);
      setProfGithubUrl(profile.contact.githubUrl);
      setProfLinkedin(profile.contact.linkedin);
      setProfLinkedinUrl(profile.contact.linkedinUrl);
      setProfInstagram(profile.contact.instagram);
      setProfInstagramUrl(profile.contact.instagramUrl);
    }
  }, [profile]);

  // Skills Management Local State
  const activeSkillsList = skills || defaultSkills;
  const [localSkills, setLocalSkills] = useState<Skill[]>(activeSkillsList);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'frontend' | 'backend' | 'devops' | 'mobile' | 'languages'>('frontend');
  const [newSkillProficiency, setNewSkillProficiency] = useState<number>(85);
  const [newSkillIcon, setNewSkillIcon] = useState<string>('Code2');

  useEffect(() => {
    if (skills) {
      setLocalSkills(skills);
    }
  }, [skills]);

  // Experience Management Local State
  const activeExperienceList = experience || defaultExperience;
  const [localExp, setLocalExp] = useState<Experience[]>(activeExperienceList);
  const [newExpRole, setNewExpRole] = useState('');
  const [newExpCompany, setNewExpCompany] = useState('');
  const [newExpLocation, setNewExpLocation] = useState('');
  const [newExpPeriod, setNewExpPeriod] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [newExpTags, setNewExpTags] = useState('');

  useEffect(() => {
    if (experience) {
      setLocalExp(experience);
    }
  }, [experience]);

  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    setTimeout(() => {
      const user = usernameInput.trim().toLowerCase();
      const pass = passwordInput.trim();

      if ((user === 'admin' || user === 'natraj') && (pass === 'admin123@' || pass === 'admin123')) {
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem('portfolio_admin_authed', 'true');
        } catch (e) {
          console.error('Session storage unavailable:', e);
        }
        setLoginError(null);
        setUsernameInput('');
        setPasswordInput('');
      } else {
        setLoginError('Invalid admin credentials. Username: admin | Password: admin123@');
      }
      setIsLoggingIn(false);
    }, 400);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('portfolio_admin_authed');
    } catch (e) {
      console.error('Session storage unavailable:', e);
    }
    setNotification(null);
  };

  const resetProjectForm = () => {
    setTitle('');
    setDescription('');
    setLongDescription('');
    setCategory('web');
    setTagsInput('');
    setGithubUrl('');
    setLiveUrl('');
    setFeatured(false);
    setImage(PRESET_IMAGES[0].url);
    setCustomImageUrl('');
    setStars(12);
    setForks(3);
    setViews(150);
    setEditingId(null);
  };

  // Populate form for editing a project
  const handleEditProject = (proj: Project) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description);
    setLongDescription(proj.longDescription || '');
    setCategory(proj.category);
    setTagsInput(proj.tags.join(', '));
    setGithubUrl(proj.githubUrl || '');
    setLiveUrl(proj.liveUrl || '');
    setFeatured(proj.featured);
    setImage(proj.image);
    setCustomImageUrl(proj.image.startsWith('data:') || !PRESET_IMAGES.some(p => p.url === proj.image) ? proj.image : '');
    setStars(proj.stats?.stars || 0);
    setForks(proj.stats?.forks || 0);
    setViews(proj.stats?.views || 0);

    setProjectSubTab('add');
    setMainTab('projects');
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    onSaveProjects(updated);
    showNotification('Project removed successfully.');
  };

  // Submit project form
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const finalImage = customImageUrl.trim() ? customImageUrl.trim() : image;

    const newProject: Project = {
      id: editingId || `project-${Date.now()}`,
      title,
      description,
      longDescription: longDescription || description,
      category,
      tags: tagsArray.length > 0 ? tagsArray : ['TypeScript', 'React'],
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      featured,
      image: finalImage,
      stats: { stars, forks, views }
    };

    let updatedProjects: Project[];
    if (editingId) {
      updatedProjects = projects.map((p) => (p.id === editingId ? newProject : p));
      showNotification(`"${title}" updated & published!`);
    } else {
      updatedProjects = [newProject, ...projects];
      showNotification(`"${title}" added & published to portfolio!`);
    }

    onSaveProjects(updatedProjects);
    resetProjectForm();
    setProjectSubTab('manage');
  };

  // Submit profile changes
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSaveProfile) return;

    const updatedProfile: DeveloperProfile = {
      ...activeProfile,
      name: profName,
      title: profTitle,
      tagline: profTagline,
      about: profAbout,
      mission: profMission,
      contact: {
        whatsapp: profWhatsapp,
        whatsappUrl: profWhatsappUrl,
        email: profEmail,
        github: profGithub,
        githubUrl: profGithubUrl,
        instagram: profInstagram,
        instagramUrl: profInstagramUrl,
        linkedin: profLinkedin,
        linkedinUrl: profLinkedinUrl,
      }
    };

    onSaveProfile(updatedProfile);
    showNotification('Profile details updated & synced across portfolio!');
  };

  // Submit skills changes
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: newSkillProficiency,
      icon: newSkillIcon,
      color: newSkillCategory === 'frontend' ? '#007396' : newSkillCategory === 'backend' ? '#47A248' : '#7C4DFF'
    };

    const updated = [newSkill, ...localSkills];
    setLocalSkills(updated);
    if (onSaveSkills) onSaveSkills(updated);

    setNewSkillName('');
    showNotification(`Added skill "${newSkill.name}" to portfolio!`);
  };

  const handleDeleteSkill = (skillName: string) => {
    const updated = localSkills.filter(s => s.name !== skillName);
    setLocalSkills(updated);
    if (onSaveSkills) onSaveSkills(updated);
    showNotification(`Skill "${skillName}" removed.`);
  };

  const handleUpdateProficiency = (skillName: string, val: number) => {
    const updated = localSkills.map(s => s.name === skillName ? { ...s, proficiency: val } : s);
    setLocalSkills(updated);
    if (onSaveSkills) onSaveSkills(updated);
  };

  // Submit Experience / Timeline changes
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpRole.trim() || !newExpCompany.trim()) return;

    const descList = newExpDesc
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const tagsList = newExpTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newItem: Experience = {
      id: `exp-${Date.now()}`,
      role: newExpRole.trim(),
      company: newExpCompany.trim(),
      location: newExpLocation.trim() || 'Tamil Nadu, India',
      period: newExpPeriod.trim() || '2024 - Present',
      description: descList.length > 0 ? descList : ['Developed core software modules.'],
      tags: tagsList.length > 0 ? tagsList : ['Software Development']
    };

    const updated = [newItem, ...localExp];
    setLocalExp(updated);
    if (onSaveExperience) onSaveExperience(updated);

    setNewExpRole('');
    setNewExpCompany('');
    setNewExpLocation('');
    setNewExpPeriod('');
    setNewExpDesc('');
    setNewExpTags('');
    showNotification(`Added "${newItem.role}" to timeline!`);
  };

  const handleDeleteExperience = (id: string) => {
    const updated = localExp.filter(e => e.id !== id);
    setLocalExp(updated);
    if (onSaveExperience) onSaveExperience(updated);
    showNotification('Timeline entry removed.');
  };

  // Image Upload helper
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('File size is too large. Please select an image under 4MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomImageUrl(reader.result);
          showNotification('Custom image uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Reset all data to defaults
  const handleResetDefaults = () => {
    onSaveProjects(defaultProjects);
    if (onSaveProfile) onSaveProfile(defaultProfile);
    if (onSaveSkills) onSaveSkills(defaultSkills);
    if (onSaveExperience) onSaveExperience(defaultExperience);

    setLocalSkills(defaultSkills);
    setLocalExp(defaultExperience);
    showNotification('Portfolio restored to initial defaults.');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="admin-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
        
        {/* Backdrop click dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Modal Window in Landscape Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl h-[88vh] max-h-[720px] bg-white rounded-[32px] shadow-2xl border border-white/80 overflow-hidden flex flex-col font-sans"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-slate-50/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4F8CFF] to-[#7C4DFF] flex items-center justify-center text-white shadow-md shadow-[#4F8CFF]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800 font-display">
                    Portfolio Admin Management Console
                  </h3>
                  {isAuthenticated && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">
                      ADMIN AUTHENTICATED
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-semibold text-slate-400">
                  Manage profile details, projects, skills, and milestones live
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <>
                  <button
                    onClick={handleResetDefaults}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                    title="Reset Defaults"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Defaults</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                    title="Lock Console"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Lock</span>
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Content Area */}
          {!isAuthenticated ? (
            /* LOGIN SCREEN */
            <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center bg-slate-50/50">
              <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-6">
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#4F8CFF] flex items-center justify-center mx-auto shadow-xs">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 font-display">
                    Admin Access Gateway
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Enter admin credentials to manage your portfolio content
                  </p>
                </div>

                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 text-rose-500" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Username Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Username
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder=""
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Password
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder=""
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#4F8CFF] to-[#7C4DFF] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#4F8CFF]/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoggingIn ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock Admin Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN DASHBOARD WORKSPACE */
            <div className="flex-1 flex flex-col min-h-0">
              
              {/* Notification Banner */}
              {notification && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-50 border-b border-emerald-200/60 px-6 py-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{notification}</span>
                </motion.div>
              )}

              {/* Main Section Tabs Header */}
              <div className="flex items-center gap-1 sm:gap-2 px-6 pt-3 bg-white border-b border-black/5 overflow-x-auto no-scrollbar">
                
                {/* 1. Projects Tab */}
                <button
                  onClick={() => setMainTab('projects')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-bold transition border-b-2 cursor-pointer whitespace-nowrap ${
                    mainTab === 'projects'
                      ? 'border-[#4F8CFF] text-[#4F8CFF] bg-blue-50/40'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Projects Exhibition ({projects.length})</span>
                </button>

              </div>

              {/* Workspace Content View */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-slate-50/40">
                
                {/* TAB 1: PROJECTS MANAGEMENT */}
                {mainTab === 'projects' && (
                  <div className="space-y-6">
                    {/* Projects Sub-Nav */}
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setProjectSubTab('add')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            projectSubTab === 'add'
                              ? 'bg-[#4F8CFF] text-white shadow-sm'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {editingId ? <Edit3 className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
                          <span>{editingId ? 'Edit Selected Project' : 'Upload New Project'}</span>
                        </button>

                        <button
                          onClick={() => setProjectSubTab('manage')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            projectSubTab === 'manage'
                              ? 'bg-[#4F8CFF] text-white shadow-sm'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>All Projects ({projects.length})</span>
                        </button>

                        <button
                          onClick={() => setProjectSubTab('github')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            projectSubTab === 'github'
                              ? 'bg-[#4F8CFF] text-white shadow-sm'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Sync GitHub Repos (@devnightnv-netizen)</span>
                        </button>
                      </div>

                      {editingId && (
                        <button
                          onClick={resetProjectForm}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl bg-slate-200/70 hover:bg-slate-200 transition"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    {projectSubTab === 'add' ? (
                      /* PROJECT ADD / EDIT FORM */
                      <form onSubmit={handleProjectSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          
                          {/* LEFT COLUMN: Metadata */}
                          <div className="md:col-span-7 space-y-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                              1. Primary Project Information
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Title */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                  Project Title *
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. Online Interview Forum"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                                />
                              </div>

                              {/* Category */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                  Category
                                </label>
                                <select
                                  value={category}
                                  onChange={(e) => setCategory(e.target.value as any)}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                                >
                                  <option value="web">Web Application</option>
                                  <option value="mobile">Mobile Application</option>
                                  <option value="ai">AI / Data Engine</option>
                                  <option value="cloud">Cloud / Infrastructure</option>
                                </select>
                              </div>
                            </div>

                            {/* Short Description */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                Short Summary (Bento Card View) *
                              </label>
                              <textarea
                                required
                                rows={2}
                                placeholder="Brief 1-2 sentence description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white resize-none"
                              />
                            </div>

                            {/* Detailed Description */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                Detailed Description (Modal / Full Inspector)
                              </label>
                              <textarea
                                rows={3}
                                placeholder="Detailed overview of architecture, features, and key takeaways..."
                                value={longDescription}
                                onChange={(e) => setLongDescription(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white resize-none"
                              />
                            </div>

                            {/* Tech Stack Tags */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                Tech Stack Tags (Comma-Separated)
                              </label>
                              <input
                                type="text"
                                placeholder="Java, ASP.NET, MongoDB, React..."
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                              />
                            </div>

                            {/* Links & Metrics */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                  GitHub Repository URL
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://github.com/..."
                                  value={githubUrl}
                                  onChange={(e) => setGithubUrl(e.target.value)}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                  Live Demo / Deployment URL
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://..."
                                  value={liveUrl}
                                  onChange={(e) => setLiveUrl(e.target.value)}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                                />
                              </div>
                            </div>
                          </div>

                          {/* RIGHT COLUMN: Cover Media & Controls */}
                          <div className="md:col-span-5 space-y-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                2. Project Cover & Display Options
                              </h4>

                              {/* Featured Checkbox */}
                              <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/80 transition">
                                <input
                                  type="checkbox"
                                  checked={featured}
                                  onChange={(e) => setFeatured(e.target.checked)}
                                  className="w-4 h-4 rounded text-[#4F8CFF] focus:ring-[#4F8CFF]"
                                />
                                <div className="text-xs font-sans">
                                  <span className="font-bold text-slate-800 block">Pin as Featured Exhibition Card</span>
                                  <span className="text-[10px] text-slate-400">Renders as high-priority wide card on bento grid</span>
                                </div>
                              </label>

                              {/* Preview Image */}
                              <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                                  Selected Cover Image
                                </span>
                                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                                  <img
                                    src={customImageUrl || image}
                                    alt="Cover preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>

                              {/* Presets Grid */}
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                  Select Preset Theme Cover
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                  {PRESET_IMAGES.map((preset, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => {
                                        setImage(preset.url);
                                        setCustomImageUrl('');
                                      }}
                                      className={`h-12 rounded-xl overflow-hidden border-2 relative transition cursor-pointer ${
                                        image === preset.url && !customImageUrl ? 'border-[#4F8CFF] ring-2 ring-[#4F8CFF]/30' : 'border-transparent opacity-70 hover:opacity-100'
                                      }`}
                                    >
                                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Custom Image Upload */}
                              <div className="pt-1">
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  accept="image/*"
                                  onChange={handleImageFileUpload}
                                  className="hidden"
                                />
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#4F8CFF] text-slate-600 hover:text-[#4F8CFF] text-xs font-bold flex items-center justify-center gap-2 transition bg-slate-50 cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload Custom Image File</span>
                                </button>
                              </div>
                            </div>

                            {/* Submit Button */}
                            <button
                              type="submit"
                              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#4F8CFF] to-[#7C4DFF] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#4F8CFF]/20 transition flex items-center justify-center gap-2 cursor-pointer mt-4"
                            >
                              <Sparkles className="w-4 h-4" />
                              <span>{editingId ? 'Save & Update Project' : 'Publish New Project Live'}</span>
                            </button>

                          </div>

                        </div>
                      </form>
                    ) : projectSubTab === 'manage' ? (
                      /* PROJECTS MANAGEMENT LIST */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((proj) => (
                          <div
                            key={proj.id}
                            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-slate-300 transition"
                          >
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-20 h-20 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                            />

                            <div className="flex-1 min-w-0 font-sans">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#4F8CFF]">
                                  {proj.category}
                                </span>
                                {proj.featured && (
                                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <h5 className="text-sm font-bold text-slate-800 truncate mt-1">
                                {proj.title}
                              </h5>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                {proj.description}
                              </p>
                            </div>

                            <div className="flex flex-col gap-1.5 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => handleEditProject(proj)}
                                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#4F8CFF] hover:text-white transition cursor-pointer"
                                title="Edit Project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {deleteConfirmId === proj.id ? (
                                <div className="flex flex-col gap-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleDeleteProject(proj.id);
                                      setDeleteConfirmId(null);
                                    }}
                                    className="px-2 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700 transition cursor-pointer shadow-xs"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="px-2 py-0.5 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 text-[9px] font-bold transition cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(proj.id)}
                                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* GITHUB ACCOUNT AUTO-SYNC PANEL */
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                              <Github className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-slate-800 font-display">
                                GitHub Repository Auto-Sync
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                Pull live public repositories directly from GitHub API into your portfolio
                              </p>
                            </div>
                          </div>

                          <a
                            href={`https://github.com/${githubUsernameInput}?tab=repositories`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 transition w-fit"
                          >
                            <span>Open GitHub Profile</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <form onSubmit={handleSyncGitHubRepos} className="space-y-4 max-w-xl">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            GitHub Account Handle
                          </label>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm font-bold">@</span>
                              <input
                                type="text"
                                required
                                value={githubUsernameInput}
                                onChange={(e) => setGithubUsernameInput(e.target.value)}
                                placeholder="devnightnv-netizen"
                                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={isSyncingGithub}
                              className="px-6 py-2.5 rounded-xl bg-[#4F8CFF] hover:bg-blue-600 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#4F8CFF]/20 cursor-pointer disabled:opacity-50"
                            >
                              {isSyncingGithub ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span>Syncing Repos...</span>
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Fetch & Import Repositories</span>
                                </>
                              )}
                            </button>
                          </div>
                        </form>

                        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-2">
                          <div className="flex items-center gap-2 font-bold text-[#4F8CFF]">
                            <Sparkles className="w-4 h-4" />
                            <span>Target Account Detected: devnightnv-netizen</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            Includes live projects such as <strong className="text-slate-800">interior-billing</strong>, <strong className="text-slate-800">textile_website</strong>, and <strong className="text-slate-800">natraj-portfolio</strong>.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: PROFILE & CONTACT DETAILS */}
                {mainTab === 'profile' && (
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* LEFT COLUMN: Identity & Bio */}
                      <div className="md:col-span-6 space-y-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Primary Developer Identity
                        </h4>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={profName}
                            onChange={(e) => setProfName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Headline Title / Role
                          </label>
                          <input
                            type="text"
                            required
                            value={profTitle}
                            onChange={(e) => setProfTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Hero Tagline
                          </label>
                          <textarea
                            rows={2}
                            required
                            value={profTagline}
                            onChange={(e) => setProfTagline(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white resize-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            About Biography
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={profAbout}
                            onChange={(e) => setProfAbout(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white resize-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Core Mission Statement
                          </label>
                          <textarea
                            rows={2}
                            required
                            value={profMission}
                            onChange={(e) => setProfMission(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:bg-white resize-none"
                          />
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Contact Channels & Social Links */}
                      <div className="md:col-span-6 space-y-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Contact Channels & Social Media Links
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                                Email Address
                              </label>
                              <input
                                type="email"
                                value={profEmail}
                                onChange={(e) => setProfEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                                WhatsApp Number
                              </label>
                              <input
                                type="text"
                                value={profWhatsapp}
                                onChange={(e) => setProfWhatsapp(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                                GitHub Handle
                              </label>
                              <input
                                type="text"
                                value={profGithub}
                                onChange={(e) => setProfGithub(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                                GitHub Full URL
                              </label>
                              <input
                                type="url"
                                value={profGithubUrl}
                                onChange={(e) => setProfGithubUrl(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                                LinkedIn Display Name
                              </label>
                              <input
                                type="text"
                                value={profLinkedin}
                                onChange={(e) => setProfLinkedin(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                                LinkedIn Full URL
                              </label>
                              <input
                                type="url"
                                value={profLinkedinUrl}
                                onChange={(e) => setProfLinkedinUrl(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                                Instagram Handle
                              </label>
                              <input
                                type="text"
                                value={profInstagram}
                                onChange={(e) => setProfInstagram(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                                Instagram Full URL
                              </label>
                              <input
                                type="url"
                                value={profInstagramUrl}
                                onChange={(e) => setProfInstagramUrl(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#4F8CFF] to-[#7C4DFF] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#4F8CFF]/20 transition flex items-center justify-center gap-2 cursor-pointer mt-4"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save & Sync Profile Live</span>
                        </button>
                      </div>

                    </div>
                  </form>
                )}

                {/* TAB 3: SKILLS & TECH STACK */}
                {mainTab === 'skills' && (
                  <div className="space-y-6">
                    {/* Add Skill Form */}
                    <form onSubmit={handleAddSkill} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Add New Competency to Matrix
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1 sm:col-span-1">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Skill Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Next.js, Docker..."
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50"
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-1">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                            Category
                          </label>
                          <select
                            value={newSkillCategory}
                            onChange={(e) => setNewSkillCategory(e.target.value as any)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                          >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="languages">Languages</option>
                            <option value="devops">DevOps & Cloud</option>
                          </select>
                        </div>

                        <div className="space-y-1 sm:col-span-1">
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                              Proficiency %
                            </label>
                            <span className="text-xs font-bold font-mono text-[#4F8CFF]">{newSkillProficiency}%</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={100}
                            value={newSkillProficiency}
                            onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                            className="w-full accent-[#4F8CFF]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="sm:col-span-1 py-2.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-bold hover:bg-blue-600 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>Add Skill</span>
                        </button>
                      </div>
                    </form>

                    {/* Existing Skills List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {localSkills.map((sk) => (
                        <div
                          key={sk.name}
                          className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 font-sans"
                        >
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800 truncate">{sk.name}</span>
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                                {sk.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min={10}
                                max={100}
                                value={sk.proficiency}
                                onChange={(e) => handleUpdateProficiency(sk.name, Number(e.target.value))}
                                className="w-24 accent-[#4F8CFF]"
                              />
                              <span className="text-[10px] font-mono font-bold text-slate-400">{sk.proficiency}%</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteSkill(sk.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: MILESTONES & TIMELINE */}
                {mainTab === 'experience' && (
                  <div className="space-y-6">
                    {/* Add Experience Form */}
                    <form onSubmit={handleAddExperience} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Add Milestone / Educational Degree to Timeline
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Role / Degree (e.g. B.Sc IT)"
                          value={newExpRole}
                          onChange={(e) => setNewExpRole(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Institution / Company Name"
                          value={newExpCompany}
                          onChange={(e) => setNewExpCompany(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Location (e.g. Dindigul, Tamil Nadu)"
                          value={newExpLocation}
                          onChange={(e) => setNewExpLocation(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                        />
                        <input
                          type="text"
                          placeholder="Time Period (e.g. 2022 - 2025)"
                          value={newExpPeriod}
                          onChange={(e) => setNewExpPeriod(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Bullet Highlights (One point per line)..."
                        value={newExpDesc}
                        onChange={(e) => setNewExpDesc(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium resize-none"
                      />

                      <div className="flex gap-3 items-center">
                        <input
                          type="text"
                          placeholder="Tags (e.g. Java, Python, Database)"
                          value={newExpTags}
                          onChange={(e) => setNewExpTags(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                        />

                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-bold hover:bg-blue-600 transition flex items-center gap-1.5 cursor-pointer shadow-sm flex-shrink-0"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>Add Milestone</span>
                        </button>
                      </div>
                    </form>

                    {/* Existing Experience Items */}
                    <div className="space-y-3">
                      {localExp.map((exp) => (
                        <div
                          key={exp.id}
                          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start justify-between gap-4 font-sans"
                        >
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-800">{exp.role}</span>
                              <span className="text-xs font-semibold text-[#4F8CFF]">@{exp.company}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {exp.description.join(' • ')}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

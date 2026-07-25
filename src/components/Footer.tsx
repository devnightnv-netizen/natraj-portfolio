import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Instagram, MessageSquare, ShieldCheck } from 'lucide-react';
import { developerProfile } from '../data';
import Logo from './Logo';

interface FooterProps {
  onOpenAdminModal?: () => void;
  profile?: typeof developerProfile;
}

export default function Footer({ onOpenAdminModal, profile }: FooterProps) {
  const activeProfile = profile || developerProfile;
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { contact } = activeProfile;

  return (
    <footer id="footer" className="relative bg-[#F7F9FC] border-t border-black/5 py-12 px-4 overflow-hidden">
      {/* Background flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] rounded-full bg-gradient-to-t from-[#4F8CFF]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 font-sans">
        {/* Logo label & Admin Portal Icon */}
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="text-xs font-semibold text-slate-500 font-display">
            {activeProfile.name} <span className="text-[#4F8CFF]">© 2026</span>
          </span>
          {onOpenAdminModal && (
            <button
              onClick={onOpenAdminModal}
              className="p-1.5 rounded-full bg-[#4F8CFF]/10 text-[#4F8CFF] hover:bg-[#4F8CFF] hover:text-white transition-all duration-300 border border-[#4F8CFF]/20 flex items-center justify-center cursor-pointer group ml-1 shadow-2xs"
              title="Admin Portal - Upload Portfolio Project"
            >
              <ShieldCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>

        {/* Middle notes */}
        <p className="text-[11px] text-slate-400 flex items-center gap-1">
          Designed & coded with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> following modern human design guidelines.
        </p>

        {/* Right side back to top and socials */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full bg-black/5 hover:bg-slate-900 hover:text-white transition text-slate-400"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full bg-black/5 hover:bg-[#0077B5] hover:text-white transition text-slate-400"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="p-1.5 rounded-full bg-black/5 hover:bg-rose-500 hover:text-white transition text-slate-400"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full bg-black/5 hover:bg-emerald-500 hover:text-white transition text-slate-400"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full bg-black/5 hover:bg-[#E1306C] hover:text-white transition text-slate-400"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <div className="h-4 w-[1px] bg-slate-200" />

          <button
            onClick={scrollUp}
            className="p-2.5 rounded-full bg-white border border-slate-200/60 text-slate-500 hover:text-[#4F8CFF] hover:border-[#4F8CFF]/30 shadow-sm hover:shadow transition flex items-center justify-center cursor-pointer"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

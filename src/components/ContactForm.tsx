import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  // Navigation & Control Icons
  ArrowLeft, ArrowRight, Sparkles, Check, Send, AlertCircle, X, Trash2, Printer, Download, Eye,
  // Step 1
  User, Building2, Mail, Phone, Globe2, MapPin, 
  // Step 2
  Globe, ShoppingCart, Smartphone, Monitor, Cloud, Bot, BarChart, Activity, 
  GraduationCap, Receipt, Briefcase, Cpu, Paintbrush, ArrowUpCircle, Settings, 
  ShieldCheck, Zap, HelpCircle,
  // Step 5
  Lock, LayoutDashboard, CreditCard, FileText, Bell, MessageSquare, HardDrive, 
  Languages, Link2, Laptop, Moon, RefreshCw, UploadCloud,
  // Step 9
  Video, Users, FileIcon,
  // Socials
  Github, Linkedin, Instagram
} from 'lucide-react';
import { developerProfile } from '../data';
import natrajImg from '../assets/images/natraj.jpg';

// Form Data Interface
interface EnquiryFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  whatsApp: string;
  country: string;
  city: string;
  projectTypes: string[];
  otherProjectType: string;
  budget: string;
  timeline: string;
  requiredFeatures: string[];
  techPreferences: string[];
  projectDescription: string;
  uploadedFiles: Array<{ id: string; name: string; size: string; type: string; progress: number; isUploading: boolean }>;
  preferredContact: string;
}

// Configuration Lists
const PROJECT_TYPES = [
  { id: 'website', label: 'Website Development', icon: Globe, color: 'from-blue-400 to-indigo-500' },
  { id: 'ecommerce', label: 'E-Commerce Website', icon: ShoppingCart, color: 'from-amber-400 to-orange-500' },
  { id: 'mobile', label: 'Mobile Application', icon: Smartphone, color: 'from-emerald-400 to-teal-500' },
  { id: 'desktop', label: 'Desktop Software', icon: Monitor, color: 'from-purple-400 to-indigo-600' },
  { id: 'saas', label: 'SaaS Platform', icon: Cloud, color: 'from-sky-400 to-blue-600' },
  { id: 'ai', label: 'AI Application', icon: Bot, color: 'from-fuchsia-400 to-purple-600' },
  { id: 'erp_crm', label: 'ERP / CRM', icon: BarChart, color: 'from-rose-400 to-pink-500' },
  { id: 'hospital', label: 'Hospital Management System', icon: Activity, color: 'from-red-400 to-rose-500' },
  { id: 'school', label: 'School / College Management', icon: GraduationCap, color: 'from-cyan-400 to-blue-500' },
  { id: 'billing', label: 'Billing & Inventory Software', icon: Receipt, color: 'from-teal-400 to-emerald-500' },
  { id: 'business', label: 'Business Management Software', icon: Briefcase, color: 'from-slate-400 to-slate-600' },
  { id: 'api', label: 'API Development', icon: Cpu, color: 'from-violet-400 to-purple-500' },
  { id: 'uiux', label: 'UI/UX Design', icon: Paintbrush, color: 'from-pink-400 to-rose-500' },
  { id: 'upgrade', label: 'Existing Project Upgrade', icon: ArrowUpCircle, color: 'from-indigo-400 to-violet-500' },
  { id: 'maintenance', label: 'Maintenance & Support', icon: Settings, color: 'from-orange-400 to-amber-500' },
  { id: 'security', label: 'Cyber Security', icon: ShieldCheck, color: 'from-emerald-500 to-green-600' },
  { id: 'automation', label: 'Automation', icon: Zap, color: 'from-yellow-400 to-orange-500' },
  { id: 'custom', label: 'Custom Software', icon: Sparkles, color: 'from-sky-400 to-indigo-500' },
  { id: 'other', label: 'Other', icon: HelpCircle, color: 'from-slate-500 to-zinc-600' }
];

const BUDGET_OPTIONS = [
  { id: '10k_25k', label: '₹10K–25K' },
  { id: '25k_50k', label: '₹25K–50K' },
  { id: '50k_1l', label: '₹50K–1L' },
  { id: '1l_5l', label: '₹1L–5L' },
  { id: '5l_plus', label: '₹5L+' },
  { id: 'discuss', label: "Let's Discuss" }
];

const TIMELINE_OPTIONS = [
  { id: 'asap', label: 'ASAP' },
  { id: '1week', label: '1 Week' },
  { id: '2weeks', label: '2 Weeks' },
  { id: '1month', label: '1 Month' },
  { id: '2_3months', label: '2–3 Months' },
  { id: 'flexible', label: 'Flexible' }
];

const FEATURE_OPTIONS = [
  { id: 'auth', label: 'Authentication', icon: Lock },
  { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
  { id: 'payments', label: 'Payment Gateway', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'ai', label: 'AI Features', icon: Sparkles },
  { id: 'storage', label: 'Cloud Storage', icon: HardDrive },
  { id: 'roles', label: 'Role Management', icon: ShieldCheck },
  { id: 'multilang', label: 'Multi Language', icon: Languages },
  { id: 'api', label: 'API Integration', icon: Link2 },
  { id: 'responsive', label: 'Responsive Design', icon: Laptop },
  { id: 'darkmode', label: 'Dark Mode', icon: Moon },
  { id: 'realtime', label: 'Real-Time Updates', icon: RefreshCw },
  { id: 'upload', label: 'File Upload', icon: UploadCloud }
];

const TECH_OPTIONS = [
  { id: 'react', label: 'React', color: '#61DAFB' },
  { id: 'nextjs', label: 'Next.js', color: '#000000' },
  { id: 'angular', label: 'Angular', color: '#DD0031' },
  { id: 'vue', label: 'Vue', color: '#4FC08D' },
  { id: 'nodejs', label: 'Node.js', color: '#339933' },
  { id: 'python', label: 'Python', color: '#3776AB' },
  { id: 'java', label: 'Java', color: '#007396' },
  { id: 'dotnet', label: '.NET', color: '#512BD4' },
  { id: 'php', label: 'PHP', color: '#777BB4' },
  { id: 'flutter', label: 'Flutter', color: '#02569B' },
  { id: 'reactnative', label: 'React Native', color: '#61DAFB' },
  { id: 'laravel', label: 'Laravel', color: '#FF2D20' },
  { id: 'aws', label: 'AWS', color: '#FF9900' },
  { id: 'azure', label: 'Azure', color: '#0089D6' },
  { id: 'firebase', label: 'Firebase', color: '#FFCA28' },
  { id: 'mongodb', label: 'MongoDB', color: '#47A248' },
  { id: 'postgresql', label: 'PostgreSQL', color: '#4169E1' },
  { id: 'mysql', label: 'MySQL', color: '#4479A1' },
  { id: 'notsure', label: 'Not Sure', color: '#94A3B8' }
];

const CONTACT_CHANNELS = [
  { id: 'email', label: 'Email', icon: Mail, color: 'text-blue-500 border-blue-100 hover:bg-blue-50/50 active:bg-blue-100/50 bg-blue-50/20' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-emerald-500 border-emerald-100 hover:bg-emerald-50/50 active:bg-emerald-100/50 bg-emerald-50/20' },
  { id: 'phone', label: 'Phone Call', icon: Phone, color: 'text-indigo-500 border-indigo-100 hover:bg-indigo-50/50 active:bg-indigo-100/50 bg-indigo-50/20' },
  { id: 'meet', label: 'Google Meet', icon: Video, color: 'text-rose-500 border-rose-100 hover:bg-rose-50/50 active:bg-rose-100/50 bg-rose-50/20' },
  { id: 'zoom', label: 'Zoom', icon: Video, color: 'text-sky-500 border-sky-100 hover:bg-sky-50/50 active:bg-sky-100/50 bg-sky-50/20' },
  { id: 'teams', label: 'Microsoft Teams', icon: Users, color: 'text-violet-500 border-violet-100 hover:bg-violet-50/50 active:bg-violet-100/50 bg-violet-50/20' }
];

// Helper to format byte sizes
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

interface ContactFormProps {
  profile?: typeof developerProfile;
}

export default function ContactForm({ profile }: ContactFormProps) {
  const activeProfile = profile || developerProfile;
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Spotlight Effect states
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    whatsApp: '',
    country: '',
    city: '',
    projectTypes: [],
    otherProjectType: '',
    budget: 'discuss',
    timeline: 'flexible',
    requiredFeatures: [],
    techPreferences: [],
    projectDescription: '',
    uploadedFiles: [],
    preferredContact: 'email'
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Spotlight effect tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // WhatsApp Sync option
  const [whatsAppSync, setWhatsAppSync] = useState(false);
  useEffect(() => {
    if (whatsAppSync) {
      setFormData(prev => ({ ...prev, whatsApp: prev.phone }));
    }
  }, [whatsAppSync, formData.phone]);

  // Step validation
  const isStepValid = (step: number) => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
      if (!formData.email.trim()) {
        errors.email = 'Email Address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) errors.phone = 'Phone Number is required';
      if (!formData.country.trim()) errors.country = 'Country is required';
      if (!formData.city.trim()) errors.city = 'City is required';

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    }
    if (step === 2) {
      if (formData.projectTypes.length === 0) {
        errors.projectTypes = 'Please select at least one Project Type';
        setValidationErrors(errors);
        return false;
      }
      if (formData.projectTypes.includes('other') && !formData.otherProjectType.trim()) {
        errors.otherProjectType = 'Please specify your other project type';
        setValidationErrors(errors);
        return false;
      }
    }
    if (step === 3) {
      if (formData.projectDescription.trim().length < 10) {
        errors.projectDescription = 'Please provide a brief description (at least 10 characters)';
        setValidationErrors(errors);
        return false;
      }
    }
    setValidationErrors({});
    return true;
  };

  // Handle Forward Navigation
  const handleNext = () => {
    if (isStepValid(currentStep)) {
      setDirection(1);
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  // Handle Back Navigation
  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle jump to unlocked steps
  const handleStepJump = (targetStep: number) => {
    if (targetStep < currentStep) {
      setDirection(-1);
      setCurrentStep(targetStep);
    } else {
      // Validate all intermediate steps
      for (let s = currentStep; s < targetStep; s++) {
        if (!isStepValid(s)) return;
      }
      setDirection(1);
      setCurrentStep(targetStep);
    }
  };

  // Drag & Drop File Upload Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const allowedExtensions = ['.pdf', '.docx', '.zip', '.png', '.jpg', '.jpeg', '.fig'];
    const newFilesList = Array.from(files).map(file => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const isAllowed = allowedExtensions.includes(ext);

      if (!isAllowed) {
        alert(`File "${file.name}" has an unsupported format. Please upload PDF, DOCX, ZIP, PNG, JPG, or Figma files.`);
        return null;
      }

      const fileId = Math.random().toString(36).substring(2, 9);
      
      // Return file mock structure
      return {
        id: fileId,
        name: file.name,
        size: formatBytes(file.size),
        type: ext,
        progress: 0,
        isUploading: true
      };
    }).filter(Boolean) as EnquiryFormData['uploadedFiles'];

    if (newFilesList.length === 0) return;

    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...newFilesList]
    }));

    // Trigger mock upload animations per file
    newFilesList.forEach(file => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 25) + 15;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setFormData(prev => ({
            ...prev,
            uploadedFiles: prev.uploadedFiles.map(f => f.id === file.id ? { ...f, progress: 100, isUploading: false } : f)
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            uploadedFiles: prev.uploadedFiles.map(f => f.id === file.id ? { ...f, progress: currentProgress } : f)
          }));
        }
      }, 250);
    });
  };

  const deleteUploadedFile = (id: string) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter(file => file.id !== id)
    }));
  };

  // Submit flow
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid(currentStep)) return;

    setIsSubmitting(true);
    
    // Construct structured mail content
    const mailToAddress = "devnight.nv@gmail.com";
    const selectedTypes = formData.projectTypes
      .map(p => PROJECT_TYPES.find(t => t.id === p)?.label || p)
      .join(', ') + (formData.otherProjectType ? ` (${formData.otherProjectType})` : '');
    
    const budgetLabel = BUDGET_OPTIONS.find(b => b.id === formData.budget)?.label || formData.budget;
    const timelineLabel = TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline;
    
    const featuresList = formData.requiredFeatures
      .map(f => FEATURE_OPTIONS.find(o => o.id === f)?.label || f)
      .join(', ') || 'None specified';
      
    const techList = formData.techPreferences
      .map(t => TECH_OPTIONS.find(o => o.id === t)?.label || t)
      .join(', ') || 'None specified';

    const subject = `[Portfolio Project Inquiry] - ${formData.fullName}`;
    const body = `Hi Natraj V,

You have received a new project consultation inquiry from your portfolio website:

--- CLIENT INFORMATION ---
Client Name: ${formData.fullName}
Company Name: ${formData.companyName || 'N/A'}
Email Address: ${formData.email}
Phone Number: ${formData.phone}
WhatsApp Number: ${formData.whatsApp || 'N/A'}
Location: ${formData.city}, ${formData.country}
Preferred Contact Channel: ${formData.preferredContact}

--- PROJECT SCOPE ---
Project Category/Types: ${selectedTypes}
Allocated Budget: ${budgetLabel}
Target Timeline: ${timelineLabel}

--- TECHNICAL DETAILS ---
Required Core Features: ${featuresList}
Technology Preference: ${techList}

--- PROJECT DESCRIPTION ---
${formData.projectDescription}

---
Inquiry generated automatically via Natraj V's Software Developer Portfolio.`;

    const mailtoUrl = `mailto:${mailToAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Simulate premium agency database ingest delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Open default mail client
      window.location.href = mailtoUrl;
    }, 1500);
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      whatsApp: '',
      country: '',
      city: '',
      projectTypes: [],
      otherProjectType: '',
      budget: 'discuss',
      timeline: 'flexible',
      requiredFeatures: [],
      techPreferences: [],
      projectDescription: '',
      uploadedFiles: [],
      preferredContact: 'email'
    });
    setCurrentStep(1);
    setDirection(-1);
    setShowSuccess(false);
    setWhatsAppSync(false);
  };

  // Calculate overall percentage completion
  const percentComplete = Math.floor(((currentStep - 1) / 2) * 100);

  // Dynamic Description Placeholder based on selected project types
  const getDynamicPlaceholder = () => {
    if (formData.projectTypes.includes('ecommerce')) {
      return "Describe your digital storefront! Mention your products, any required payment gateway, target audience, shipping preferences, or existing retail websites you draw inspiration from...";
    }
    if (formData.projectTypes.includes('ai')) {
      return "Tell me about your AI concept! What intelligence capabilities (e.g. LLM integration, predictive models, voice synthesis) do you require? How do users interact with the model?";
    }
    if (formData.projectTypes.includes('mobile')) {
      return "Detail your mobile app! Is it targeting iOS, Android, or both? Are there location-based services, camera access, or offline capability requirements?";
    }
    return "Describe your project idea, target audience, required features, key business goals, and any reference websites or interfaces you admire...";
  };

  // Framer Motion slide variants
  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: 'blur(4px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      filter: 'blur(4px)',
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 bg-[#F7F9FC] overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Immersive background auroras */}
      <div className="absolute top-[5%] left-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#4F8CFF]/8 to-[#00D4FF]/4 blur-[130px] pointer-events-none animate-aurora-slow" />
      <div className="absolute bottom-[5%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#7C4DFF]/8 to-[#4F8CFF]/5 blur-[120px] pointer-events-none animate-float-slow" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading, Vector Illustration, Dynamic Progress Stepper */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Header Block */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-white/50 backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#7C4DFF]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans">
                  Free Architecture Consultation
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-800 font-display leading-[1.1]">
                Let's Build Your <br />
                <span className="bg-gradient-to-r from-[#4F8CFF] via-[#7C4DFF] to-[#00D4FF] bg-clip-text text-transparent">
                  Next Digital Product
                </span>
              </h2>
              <p className="text-sm text-slate-500 max-w-md font-sans leading-relaxed">
                Have an idea? Tell me about your project and I'll help turn it into a powerful, scalable, and modern software solution.
              </p>
            </div>

            {/* Direct Connect Grid */}
            <div className="space-y-3 font-sans">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Direct Contact Channels
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {/* 1. Phone Call */}
                <a
                  href={`tel:${developerProfile.contact.whatsapp}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-slate-200/50 hover:bg-white hover:border-[#4F8CFF]/50 hover:shadow-sm transition-all duration-300 group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 group-hover/item:bg-blue-500 group-hover/item:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Contact Number</p>
                    <p className="text-xs font-bold text-slate-700 truncate group-hover/item:text-[#4F8CFF] transition-colors">
                      {developerProfile.contact.whatsapp}
                    </p>
                  </div>
                </a>

                {/* 2. WhatsApp */}
                <a
                  href={developerProfile.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-slate-200/50 hover:bg-white hover:border-emerald-500/50 hover:shadow-sm transition-all duration-300 group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-500 group-hover/item:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp Chat</p>
                    <p className="text-xs font-bold text-slate-700 truncate group-hover/item:text-emerald-600 transition-colors">
                      {developerProfile.contact.whatsapp}
                    </p>
                  </div>
                </a>

                {/* 3. Email ID */}
                <a
                  href={`mailto:${developerProfile.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-slate-200/50 hover:bg-white hover:border-rose-500/50 hover:shadow-sm transition-all duration-300 group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 group-hover/item:bg-rose-500 group-hover/item:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-xs font-bold text-slate-700 truncate group-hover/item:text-rose-500 transition-colors">
                      {developerProfile.contact.email}
                    </p>
                  </div>
                </a>

                {/* 4. LinkedIn */}
                <a
                  href={developerProfile.contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-slate-200/50 hover:bg-white hover:border-indigo-600/50 hover:shadow-sm transition-all duration-300 group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">LinkedIn Profile</p>
                    <p className="text-xs font-bold text-slate-700 truncate group-hover/item:text-indigo-600 transition-colors">
                      {developerProfile.contact.linkedin}
                    </p>
                  </div>
                </a>

                {/* 5. Instagram */}
                <a
                  href={developerProfile.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-slate-200/50 hover:bg-white hover:border-pink-500/50 hover:shadow-sm transition-all duration-300 group/item cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-500 group-hover/item:bg-pink-500 group-hover/item:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Instagram Feed</p>
                    <p className="text-xs font-bold text-slate-700 truncate group-hover/item:text-pink-500 transition-colors">
                      {developerProfile.contact.instagram}
                    </p>
                  </div>
                </a>

                {/* 6. Resume / CV */}
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-slate-200/50 hover:bg-white hover:border-violet-500/50 hover:shadow-sm transition-all duration-300 group/item cursor-pointer text-left w-full focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-500 group-hover/item:bg-violet-500 group-hover/item:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Professional Resume</p>
                    <p className="text-xs font-bold text-slate-700 truncate group-hover/item:text-violet-500 transition-colors">
                      View Digital CV (PDF / Print)
                    </p>
                  </div>
                </button>
              </div>
            </div>



          </div>

          {/* Right Column: Dynamic Form Card */}
          <div className="lg:col-span-7">
            
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className="relative w-full rounded-3xl glass-panel border border-white/65 p-6 sm:p-10 shadow-xl overflow-hidden bg-white/35"
              style={{
                background: 'rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Apple Vision Pro Mouse Spotlight glow effect */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 77, 255, 0.08), transparent)`
                }}
              />

              {/* Glowing animated border element */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4F8CFF] via-[#7C4DFF] to-[#00D4FF]" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8 h-full flex flex-col justify-between">
                
                {/* Wizard Header Progress Bar */}
                <div className="space-y-3 font-sans">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#7C4DFF] uppercase tracking-wider">
                      Step {currentStep} of 3
                    </span>
                    <span className="font-mono text-slate-500 bg-white/60 px-2 py-0.5 rounded-full border border-white/50 shadow-sm">
                      {percentComplete}% Complete
                    </span>
                  </div>
                  
                  {/* Horizontal Glowing Track */}
                  <div className="h-[4px] w-full bg-slate-200/50 rounded-full overflow-hidden p-[1px] border border-white/35">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#7C4DFF] rounded-full"
                      animate={{ width: `${percentComplete}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* ACTIVE WIZARD CONTENT WITH SLIDE/FADE */}
                <div className="min-h-[350px] flex flex-col justify-center">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-6"
                    >
                      
                      {/* STEP 1: CLIENT INFORMATION */}
                      {currentStep === 1 && (
                        <div className="space-y-5">
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-800 font-display">Let's start with your contact details</h3>
                            <p className="text-xs text-slate-500 font-sans">I'll use this information to reach back with structural feedback and wireframe ideas.</p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                            {/* Full Name */}
                            <div className="space-y-1.5 col-span-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <User className="w-3 h-3" /> Full Name <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                placeholder="e.g. Alexis Vance"
                                className={`w-full px-4 py-3 rounded-xl bg-white/45 border ${validationErrors.fullName ? 'border-red-400/60 focus:border-red-400' : 'border-slate-200/50 focus:border-[#4F8CFF]/50'} text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F8CFF]/30 transition text-sm shadow-inner`}
                              />
                              {validationErrors.fullName && <p className="text-[10px] text-red-500 font-sans flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {validationErrors.fullName}</p>}
                            </div>

                            {/* Company Name */}
                            <div className="space-y-1.5 col-span-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Building2 className="w-3 h-3" /> Company Name <span className="text-[9px] text-slate-400">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                                placeholder="e.g. Stripe, Inc."
                                className="w-full px-4 py-3 rounded-xl bg-white/45 border border-slate-200/50 focus:border-[#4F8CFF]/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F8CFF]/30 transition text-sm shadow-inner"
                              />
                            </div>

                            {/* Email Address */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Mail className="w-3 h-3" /> Email Address <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="e.g. alexis@stripe.com"
                                className={`w-full px-4 py-3 rounded-xl bg-white/45 border ${validationErrors.email ? 'border-red-400/60 focus:border-red-400' : 'border-slate-200/50 focus:border-[#4F8CFF]/50'} text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F8CFF]/30 transition text-sm shadow-inner`}
                              />
                              {validationErrors.email && <p className="text-[10px] text-red-500 font-sans flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {validationErrors.email}</p>}
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Phone className="w-3 h-3" /> Phone Number <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                placeholder="e.g. +1 (415) 890-4122"
                                className={`w-full px-4 py-3 rounded-xl bg-white/45 border ${validationErrors.phone ? 'border-red-400/60 focus:border-red-400' : 'border-slate-200/50 focus:border-[#4F8CFF]/50'} text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F8CFF]/30 transition text-sm shadow-inner`}
                              />
                              {validationErrors.phone && <p className="text-[10px] text-red-500 font-sans flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {validationErrors.phone}</p>}
                            </div>

                            {/* WhatsApp number with autofill sync */}
                            <div className="space-y-1.5 col-span-1">
                              <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                  WhatsApp Number <span className="text-[9px] text-slate-400">(Optional)</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={whatsAppSync}
                                    onChange={(e) => setWhatsAppSync(e.target.checked)}
                                    className="w-3 h-3 rounded border-slate-300 text-[#4F8CFF] focus:ring-[#4F8CFF]/40 cursor-pointer"
                                  />
                                  <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">Same as Phone</span>
                                </label>
                              </div>
                              <input
                                type="tel"
                                disabled={whatsAppSync}
                                value={formData.whatsApp}
                                onChange={(e) => setFormData(prev => ({ ...prev, whatsApp: e.target.value }))}
                                placeholder="e.g. Same as above"
                                className="w-full px-4 py-3 rounded-xl bg-white/45 disabled:bg-slate-100/30 disabled:text-slate-400 border border-slate-200/50 focus:border-[#4F8CFF]/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F8CFF]/30 transition text-sm shadow-inner"
                              />
                            </div>

                            {/* Country */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Globe2 className="w-3 h-3" /> Country <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.country}
                                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                                placeholder="e.g. United States"
                                className={`w-full px-4 py-3 rounded-xl bg-white/45 border ${validationErrors.country ? 'border-red-400/60 focus:border-red-400' : 'border-slate-200/50 focus:border-[#4F8CFF]/50'} text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F8CFF]/30 transition text-sm shadow-inner`}
                              />
                              {validationErrors.country && <p className="text-[10px] text-red-500 font-sans flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {validationErrors.country}</p>}
                            </div>

                            {/* City */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" /> City <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.city}
                                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                placeholder="e.g. San Francisco"
                                className={`w-full px-4 py-3 rounded-xl bg-white/45 border ${validationErrors.city ? 'border-red-400/60 focus:border-red-400' : 'border-slate-200/50 focus:border-[#4F8CFF]/50'} text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F8CFF]/30 transition text-sm shadow-inner`}
                              />
                              {validationErrors.city && <p className="text-[10px] text-red-500 font-sans flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {validationErrors.city}</p>}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 2: PROJECT SCOPE & ARCHITECTURE */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-800 font-display">Define your project scope & timeline</h3>
                            <p className="text-xs text-slate-500 font-sans">Choose the best fit options for your project category, budget, and timeline.</p>
                          </div>

                          <div className="space-y-5 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin no-scrollbar font-sans">
                            {/* Project Category */}
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                Project Category <span className="text-red-400">*</span>
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {PROJECT_TYPES.map((type) => {
                                  const Icon = type.icon;
                                  const isSelected = formData.projectTypes.includes(type.id);
                                  return (
                                    <button
                                      key={type.id}
                                      type="button"
                                      onClick={() => {
                                        setFormData(prev => {
                                          const exists = prev.projectTypes.includes(type.id);
                                          const updated = exists
                                            ? prev.projectTypes.filter(x => x !== type.id)
                                            : [...prev.projectTypes, type.id];
                                          return { ...prev, projectTypes: updated };
                                        });
                                      }}
                                      className={`p-2.5 rounded-xl border text-left transition-all duration-300 flex items-center gap-2.5 focus:outline-none cursor-pointer ${
                                        isSelected
                                          ? 'bg-white border-[#4F8CFF] shadow-sm ring-1 ring-[#4F8CFF]/20'
                                          : 'bg-white/45 border-slate-200/60 hover:bg-white/90'
                                      }`}
                                    >
                                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                        isSelected ? 'bg-gradient-to-tr from-[#4F8CFF] to-[#7C4DFF] text-white' : 'bg-slate-100 text-slate-500'
                                      }`}>
                                        <Icon className="w-3.5 h-3.5" />
                                      </div>
                                      <span className={`text-[10px] font-bold truncate ${isSelected ? 'text-slate-800' : 'text-slate-600'}`}>
                                        {type.label}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                              {formData.projectTypes.includes('other') && (
                                <input
                                  type="text"
                                  required
                                  value={formData.otherProjectType}
                                  onChange={(e) => setFormData(prev => ({ ...prev, otherProjectType: e.target.value }))}
                                  placeholder="Specify project category..."
                                  className="w-full mt-2 px-3 py-2 rounded-xl bg-white/45 border border-slate-200/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F8CFF]/50 text-xs shadow-inner"
                                />
                              )}
                              {validationErrors.projectTypes && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {validationErrors.projectTypes}</p>}
                            </div>

                            {/* Budget & Timeline Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Allocated Budget */}
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                  Allocated Budget
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {BUDGET_OPTIONS.map((tier) => (
                                    <button
                                      key={tier.id}
                                      type="button"
                                      onClick={() => setFormData(prev => ({ ...prev, budget: tier.id }))}
                                      className={`p-2.5 rounded-xl border text-center transition-all duration-300 text-[11px] font-bold focus:outline-none cursor-pointer ${
                                        formData.budget === tier.id
                                          ? 'bg-[#4F8CFF]/5 border-[#4F8CFF] text-[#4F8CFF]'
                                          : 'bg-white/45 border-slate-200/60 text-slate-600 hover:bg-white'
                                      }`}
                                    >
                                      {tier.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Sprint Timeline */}
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                  Sprint Timeline
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {TIMELINE_OPTIONS.map((time) => (
                                    <button
                                      key={time.id}
                                      type="button"
                                      onClick={() => setFormData(prev => ({ ...prev, timeline: time.id }))}
                                      className={`p-2.5 rounded-xl border text-center transition-all duration-300 text-[11px] font-bold focus:outline-none cursor-pointer ${
                                        formData.timeline === time.id
                                          ? 'bg-[#4F8CFF]/5 border-[#4F8CFF] text-[#4F8CFF]'
                                          : 'bg-white/45 border-slate-200/60 text-slate-600 hover:bg-white'
                                      }`}
                                    >
                                      {time.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Preferred Contact Method */}
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                Preferred Contact Channel
                              </label>
                              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {CONTACT_CHANNELS.map((channel) => {
                                  const Icon = channel.icon;
                                  const isSelected = formData.preferredContact === channel.id;
                                  return (
                                    <button
                                      key={channel.id}
                                      type="button"
                                      onClick={() => setFormData(prev => ({ ...prev, preferredContact: channel.id }))}
                                      className={`p-2 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer focus:outline-none ${
                                        isSelected ? 'bg-white border-[#4F8CFF] shadow-sm' : 'bg-white/45 border-slate-200/60'
                                      }`}
                                    >
                                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#4F8CFF]' : 'text-slate-400'}`} />
                                      <span className={`text-[9px] font-bold truncate max-w-full ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
                                        {channel.label}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* STEP 3: TECHNICAL DETAILS & REQUIREMENTS */}
                      {currentStep === 3 && (
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-800 font-display">Technical details & specifications</h3>
                            <p className="text-xs text-slate-500 font-sans">Share your functional needs, core features, technology preferences, or files.</p>
                          </div>

                          <div className="space-y-5 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin no-scrollbar font-sans">
                            {/* Required Features */}
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                Required Core Features (Optional)
                              </label>
                              <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pr-1">
                                {FEATURE_OPTIONS.map((feat) => {
                                  const Icon = feat.icon;
                                  const isSelected = formData.requiredFeatures.includes(feat.id);
                                  return (
                                    <button
                                      key={feat.id}
                                      type="button"
                                      onClick={() => {
                                        setFormData(prev => {
                                          const exists = prev.requiredFeatures.includes(feat.id);
                                          const updated = exists
                                            ? prev.requiredFeatures.filter(x => x !== feat.id)
                                            : [...prev.requiredFeatures, feat.id];
                                          return { ...prev, requiredFeatures: updated };
                                        });
                                      }}
                                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold flex items-center gap-1.5 transition duration-300 focus:outline-none cursor-pointer ${
                                        isSelected
                                          ? 'bg-[#4F8CFF]/10 border-[#4F8CFF] text-[#4F8CFF]'
                                          : 'bg-white/45 border-slate-200/60 text-slate-600 hover:bg-white'
                                      }`}
                                    >
                                      <Icon className="w-3 h-3" />
                                      <span>{feat.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Technology Preference */}
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                Technology Preference (Optional)
                              </label>
                              <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pr-1">
                                {TECH_OPTIONS.map((tech) => {
                                  const isSelected = formData.techPreferences.includes(tech.id);
                                  return (
                                    <button
                                      key={tech.id}
                                      type="button"
                                      onClick={() => {
                                        setFormData(prev => {
                                          const exists = prev.techPreferences.includes(tech.id);
                                          const updated = exists
                                            ? prev.techPreferences.filter(x => x !== tech.id)
                                            : [...prev.techPreferences, tech.id];
                                          return { ...prev, techPreferences: updated };
                                        });
                                      }}
                                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold flex items-center gap-1.5 transition duration-300 focus:outline-none cursor-pointer ${
                                        isSelected
                                          ? 'bg-white border-[#4F8CFF] shadow-sm text-slate-800'
                                          : 'bg-white/45 border-slate-200/60 text-slate-500 hover:bg-white'
                                      }`}
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                                      <span>{tech.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Project Description Textarea */}
                            <div className="space-y-2 font-sans relative">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                Project Requirements Description <span className="text-red-400">*</span>
                              </label>
                              <textarea
                                rows={3}
                                required
                                value={formData.projectDescription}
                                onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                                placeholder={getDynamicPlaceholder()}
                                className="w-full px-3 py-2 rounded-xl bg-white/45 border border-slate-200/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F8CFF]/50 focus:ring-1 focus:ring-[#4F8CFF]/30 transition text-xs resize-none shadow-inner"
                              />
                              <div className="flex justify-between text-[9px] text-slate-400">
                                <span>Minimum 10 characters required</span>
                                <span className={formData.projectDescription.length >= 10 ? 'text-emerald-500' : 'text-slate-400'}>
                                  {formData.projectDescription.length} characters
                                </span>
                              </div>
                              {validationErrors.projectDescription && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {validationErrors.projectDescription}</p>}
                            </div>

                            {/* File Upload Zone */}
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                Upload Wireframes / Specifications (Optional)
                              </label>
                              <div
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition duration-300 flex items-center justify-center gap-3 bg-white/10 ${
                                  dragActive
                                    ? 'border-[#4F8CFF] bg-[#4F8CFF]/5'
                                    : 'border-slate-300/60 hover:border-[#4F8CFF]/45 hover:bg-white/45'
                                }`}
                              >
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  multiple
                                  onChange={handleFileSelect}
                                  className="hidden"
                                />
                                <UploadCloud className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                <div className="text-left">
                                  <p className="text-[11px] font-bold text-slate-700">Drag files here or click to upload</p>
                                  <p className="text-[9px] text-slate-400">PDF, DOCX, ZIP, PNG, JPG, Figma up to 25MB</p>
                                </div>
                              </div>

                              {/* Uploaded Files status */}
                              {formData.uploadedFiles.length > 0 && (
                                <div className="space-y-1.5 mt-2">
                                  {formData.uploadedFiles.map((file) => (
                                    <div key={file.id} className="p-2 rounded-lg bg-white/60 border border-white/80 flex items-center justify-between gap-3 text-xs">
                                      <div className="flex items-center gap-2 min-w-0">
                                        <FileIcon className="w-3.5 h-3.5 text-[#4F8CFF]" />
                                        <span className="truncate font-medium text-slate-700">{file.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {file.isUploading ? (
                                          <span className="text-[9px] font-bold text-[#4F8CFF]">{file.progress}%</span>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={() => deleteUploadedFile(file.id)}
                                            className="text-slate-400 hover:text-red-500"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* STEERING FOOTER ACTION BUTTONS */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200/40 font-sans">
                  {/* Prev Button */}
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-3 rounded-xl border border-slate-200/50 hover:border-slate-300 hover:bg-white text-slate-500 hover:text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition duration-300 focus:outline-none cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  )}

                  {/* Forward Button / Final Submit */}
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#7C4DFF] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden focus:outline-none cursor-pointer"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#4F8CFF] via-[#7C4DFF] to-[#00D4FF] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-lg shadow-[#7C4DFF]/15 hover:shadow-xl hover:opacity-95 transition-all duration-300 relative overflow-hidden focus:outline-none cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Dispatching Consultation Packet...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Free Consultation</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>

            </motion.div>
          </div>

        </div>

      </div>

      {/* FULL-SCREEN PREMIUM SUCCESS POPUP */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xl"
          >
            {/* Soft Glowing Particles background overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[20%] left-[30%] w-32 h-32 rounded-full bg-[#4F8CFF]/10 blur-xl animate-pulse-slow" />
              <div className="absolute bottom-[30%] right-[20%] w-40 h-40 rounded-full bg-[#7C4DFF]/10 blur-2xl animate-float-slow" />
            </div>

            {/* Success Card */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="max-w-xl w-full bg-white/70 backdrop-blur-2xl border border-white/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden text-center"
            >
              {/* Confetti celebration dots */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
                <div className="absolute top-1/2 right-12 w-2 h-2 rounded-full bg-[#7C4DFF] animate-ping" style={{ animationDelay: '1.2s' }} />
                <div className="absolute bottom-16 left-24 w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-ping" style={{ animationDelay: '0.6s' }} />
              </div>

              {/* Glowing animated check circles */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200/50 flex items-center justify-center mx-auto text-emerald-500 shadow-md relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="w-full h-full rounded-full border border-emerald-400 absolute inset-0 animate-ping opacity-25"
                />
                <Check className="w-8 h-8 stroke-[3.5]" />
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-2xl font-bold text-slate-800 font-display">
                  Enquiry Dispatched Successfully!
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-sm mx-auto">
                  Thank you! Your enquiry has been received successfully. I'll review your requirements and contact you within 24 hours.
                </p>
              </div>

              {/* Consultation Ticket Summary */}
              <div className="bg-white/60 border border-white/80 p-4.5 rounded-2xl my-6 text-left space-y-3 shadow-inner font-sans text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-200/40 pb-1.5">
                  Consultation Slip Receipt
                </span>
                
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                  <div>
                    <span className="text-slate-400 block font-medium">Consultant Prospect</span>
                    <span className="text-slate-700 font-bold">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Preferred Contact</span>
                    <span className="text-slate-700 font-bold capitalize">{formData.preferredContact}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block font-medium">Selected Architecture</span>
                    <span className="text-slate-700 font-bold">
                      {formData.projectTypes.map(p => PROJECT_TYPES.find(t => t.id === p)?.label || p).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Target Budget</span>
                    <span className="text-slate-700 font-bold">
                      {BUDGET_OPTIONS.find(b => b.id === formData.budget)?.label || formData.budget}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Sprint Timeline</span>
                    <span className="text-[#4F8CFF] font-bold">
                      {TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close / Return Button */}
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#7C4DFF] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:opacity-95 transition-all cursor-pointer focus:outline-none"
              >
                Return to Workspace
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROFESSIONAL INTERACTIVE DIGITAL RESUME MODAL */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsResumeModalOpen(false)}
            className="fixed inset-x-0 bottom-0 top-[72px] md:top-[88px] z-40 flex items-start justify-center p-4 overflow-y-auto bg-slate-950/50 backdrop-blur-md no-print"
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full my-4 bg-slate-50 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden font-sans flex flex-col max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-140px)]"
            >
              
              {/* Header Action Bar */}
              <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200/80 sticky top-0 z-10 no-print flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Digital CV Viewer</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Close button on the right side */}
                  <button
                    type="button"
                    onClick={() => setIsResumeModalOpen(false)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-rose-500 hover:text-white hover:bg-rose-500 bg-rose-50 border border-rose-100 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none"
                    title="Close CV Viewer"
                  >
                    <span className="text-xs font-bold font-sans">Close</span>
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Printable Area - styled as a pristine modern CV page */}
              <div id="printable-resume-card" className="printable-resume-container bg-white p-8 md:p-12 text-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 leading-relaxed overflow-y-auto flex-1 max-h-[calc(100vh-180px)] md:max-h-[calc(100vh-200px)] print:max-h-none print:overflow-visible no-scrollbar">
                
                {/* CV Left Sidebar */}
                <div className="md:col-span-4 space-y-8 border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0 md:pr-8 text-sm">
                  
                  {/* Portrait / Profile headshot */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 p-1 bg-white shadow-sm">
                      <img
                        src={natrajImg}
                        alt="Natraj V"
                        className="w-full h-full object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-slate-900 font-display">NATRAJ V</h2>
                      <p className="text-xs font-semibold text-[#4F8CFF] uppercase tracking-wider mt-0.5">Software Developer</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3.5 font-sans">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Contact Details</h3>
                    
                    <div className="space-y-3 font-medium text-slate-600">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs leading-normal">
                          14b, Mentonsa Colony,<br />
                          Nagal Nagar, Dindigul-3
                        </span>
                      </div>
                      
                      <a href="mailto:devnight.nv@gmail.com" className="flex items-center gap-3 text-xs hover:text-[#4F8CFF] transition truncate">
                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>devnight.nv@gmail.com</span>
                      </a>
                      
                      <a href="tel:7418715717" className="flex items-center gap-3 text-xs hover:text-[#4F8CFF] transition">
                        <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>7418715717</span>
                      </a>

                      <a href="https://github.com/NATRAJ-V" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs hover:text-[#4F8CFF] transition truncate">
                        <Github className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>github.com/NATRAJ-V</span>
                      </a>
                    </div>
                  </div>

                  {/* Core Professional Skills */}
                  <div className="space-y-3.5 font-sans">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Skills</h3>
                    <ul className="space-y-2 font-medium text-slate-600 text-xs">
                      {['Management Skill', 'Technical Thinking', 'Digital Marketing', 'Leadership', 'Photo Designing'].map((skill) => (
                        <li key={skill} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications list */}
                  <div className="space-y-3.5 font-sans">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Certificates</h3>
                    <ul className="space-y-2 font-medium text-slate-600 text-xs">
                      {['Photoshop', 'Tally', 'Oracle Cloud Infrastructure', 'MongoDB'].map((cert) => (
                        <li key={cert} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5] flex-shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extracurricular Activities */}
                  <div className="space-y-3.5 font-sans">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Activities</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['Carrom', 'Driving', 'Chess'].map((act) => (
                        <span key={act} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-semibold">{act}</span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="space-y-3.5 font-sans">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Languages</h3>
                    <ul className="space-y-2 font-medium text-slate-600 text-xs">
                      <li className="flex justify-between">
                        <span>English</span>
                        <span className="text-slate-400">Professional</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tamil</span>
                        <span className="text-slate-400">Native</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Hindi</span>
                        <span className="text-slate-400">Beginner</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* CV Right Content */}
                <div className="md:col-span-8 space-y-8 text-slate-700 font-sans">
                  
                  {/* Professional Summary */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <User className="w-4 h-4 text-[#4F8CFF]" />
                      <span>About Profile</span>
                    </h3>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-600 whitespace-pre-line">
                      I consider myself a responsible and orderly person. I am looking forward for my first work experience. Highly motivated and detail-oriented fresher Software developer with a strong passion for coding. Quick learner with excellent problem-solving skills. I have a management skill in industrial company.
                    </p>
                  </div>

                  {/* Education details */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                      <GraduationCap className="w-4 h-4 text-[#4F8CFF]" />
                      <span>Education Timeline</span>
                    </h3>
                    
                    <div className="space-y-5">
                      {/* NPR Arts */}
                      <div className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-[#4F8CFF] before:ring-4 before:ring-blue-100 border-l border-slate-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">Bachelor of Information Technology : English</h4>
                          <span className="px-2.5 py-0.5 bg-blue-50 text-[#4F8CFF] text-[10px] font-bold rounded-full sm:mt-0 mt-1">2022 - 2025</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 mt-1 font-sans">NPR Arts & Science College - Natham</p>
                        <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Cumulative Score: 82.3%
                        </p>
                      </div>

                      {/* Aruljothi Vallalar */}
                      <div className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-indigo-400 before:ring-4 before:ring-indigo-100 border-l border-slate-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">Computer Commerce : Tamil</h4>
                          <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-500 text-[10px] font-bold rounded-full sm:mt-0 mt-1">2020 - 2022</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 mt-1 font-sans">Aruljothi Vallalar Higher Secondary School - Dindigul</p>
                        <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Cumulative Score: 70.6%
                        </p>
                      </div>

                      {/* Sowrashtra Sri Varatharaja */}
                      <div className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-slate-400 before:ring-4 before:ring-slate-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">SSLC 10th Graduation</h4>
                          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full sm:mt-0 mt-1">2019 - 2020</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 mt-1 font-sans">Sowrashtra Sri Varatharaja High School - Dindigul</p>
                        <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Cumulative Score: 55.8%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical skill matrix badge clouds */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Cpu className="w-4 h-4 text-[#4F8CFF]" />
                      <span>Technical Competency</span>
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {[
                        { name: 'Java', color: 'bg-orange-50 text-orange-600 border-orange-100' },
                        { name: 'Python', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                        { name: 'ASP.NET', color: 'bg-purple-50 text-purple-600 border-purple-100' },
                        { name: 'MongoDB', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                        { name: 'Oracle Cloud Infrastructure', color: 'bg-rose-50 text-rose-600 border-rose-100' },
                        { name: 'Photoshop', color: 'bg-sky-50 text-sky-600 border-sky-100' },
                        { name: 'Tally', color: 'bg-teal-50 text-teal-600 border-teal-100' }
                      ].map((tech) => (
                        <span key={tech.name} className={`px-3 py-1.5 border rounded-xl text-xs font-bold ${tech.color}`}>{tech.name}</span>
                      ))}
                    </div>
                  </div>

                  {/* Project completion details */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Briefcase className="w-4 h-4 text-[#4F8CFF]" />
                      <span>Project Completion</span>
                    </h3>
                    
                    <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-slate-900">ONLINE INTERVIEW FORUM</h4>
                        <span className="text-[10px] font-bold text-[#4F8CFF] px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-lg font-sans">Full-Stack Project</span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600 font-medium font-sans">
                        Online Interview Forum is conducting an interview for the candidates through online. This interview forum is based on the online Editor Concept. The user has to register in that site, then the admin views the user's details and assigns the First interview task and sends it to the particular user email. Users receive the task by clicking the link that appears on the task editor window. After the completion of the first task, the user has to capture the task as a screenshot image and send it to the admin. Admin checks the first task and decides whether the candidate is selected for the next round or not. If they are selected, the admin sends the confirmation through user Email.
                      </p>
                    </div>
                  </div>

                  {/* Declaration block */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 text-[11px] font-medium text-slate-500 italic leading-relaxed text-center sm:text-left font-sans">
                    <p>
                      "I declare that I am a fresher and do not have any prior work experience. The information provided in this resume is accurate and true to the best of my knowledge."
                    </p>
                    <div className="flex justify-between items-end pt-4 not-italic">
                      <div className="text-left">
                        <p className="text-slate-400">Location / Date</p>
                        <p className="text-xs font-bold text-slate-700 mt-0.5">Dindigul, Tamil Nadu</p>
                      </div>
                      <div className="text-right font-sans">
                        <p className="text-slate-400">Signature</p>
                        <p className="text-xs font-bold text-slate-700 mt-0.5 font-display">NATRAJ V</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

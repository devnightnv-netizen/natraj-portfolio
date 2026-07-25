import { Project, Experience, Skill, Achievement, ContributionDay } from './types';

export const developerProfile = {
  name: "Natraj V",
  title: "Software Developer & IT Graduate",
  tagline: "Building clean, responsive, and performance-driven applications.",
  about: "I am a motivated, detail-oriented Bachelor of Information Technology graduate and an aspiring Software Developer. Highly passionate about coding, I am a quick learner with excellent problem-solving skills. I bring technical expertise in Python, Java, and ASP.NET alongside industrial management and creative photo design skills.",
  mission: "To leverage solid computer science fundamentals, clean database architecture, and user-centric design to build robust digital products that solve real-world problems.",
  contact: {
    whatsapp: "+91 7418715717",
    whatsappUrl: "https://wa.me/917305997418",
    email: "devnight.nv@gmail.com",
    github: "github.com/devnightnv-netizen",
    githubUrl: "https://github.com/devnightnv-netizen",
    instagram: "@natraj_venkat74",
    instagramUrl: "https://instagram.com/natraj_venkat74",
    linkedin: "Natraj V",
    linkedinUrl: "https://linkedin.com/in/natraj-v"
  },
  journey: [
    { year: "2025", event: "Graduating with a Bachelor of Information Technology from NPR Arts & Science College, Natham (82.3%)" },
    { year: "2024", event: "Completed Online Interview Forum and engineered a dynamic automated testing platform" },
    { year: "2023", event: "Earned Certified Credentials in Oracle Cloud Infrastructure (OCI) and MongoDB Database Systems" },
    { year: "2022", event: "Completed Computer Commerce from Aruljothi Vallalar Higher Secondary School, Dindigul (70.6%)" },
    { year: "2020", event: "Completed SSLC 10th Graduation from Sowrashtra Sri Varatharaja High School, Dindigul (55.8%)" }
  ],
  stats: [
    { value: "82.3%", label: "B.Sc IT Score" },
    { value: "4+", label: "Key Credentials" },
    { value: "3+", label: "Core Languages" },
    { value: "Fresher", label: "Ready to Join" }
  ]
};

export const projectsData: Project[] = [
  {
    id: "interior-billing",
    title: "Interior Billing System",
    description: "A comprehensive billing, estimation, and customer invoice platform built for interior design & decor workflows.",
    longDescription: "Interior Billing System is a production-ready application tailored for interior design firms. Features itemized material estimation, automated sales tax & discount breakdowns, client order tracking, printable invoice receipts, and Vercel cloud deployment integration.",
    category: "web",
    tags: ["TypeScript", "React", "Node.js", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/devnightnv-netizen/interior-billing",
    liveUrl: "https://interior-billing.vercel.app",
    featured: true,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    stats: { stars: 12, forks: 2, views: 340 }
  },
  {
    id: "textile_website",
    title: "Textile Web Experience",
    description: "An interactive showcase and e-commerce portal for textile product manufacturing, fabric catalogs, and customer inquiries.",
    longDescription: "Textile Web Experience is a modern digital storefront showcasing textile product collections, fabric specifications, yarn thread details, custom inquiry submission forms, and responsive mobile-first views deployed on Vercel.",
    category: "web",
    tags: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/devnightnv-netizen/textile_website",
    liveUrl: "https://textile-website-inky.vercel.app",
    featured: true,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    stats: { stars: 15, forks: 3, views: 410 }
  },
  {
    id: "natraj-portfolio",
    title: "Natraj Portfolio & Admin Workspace",
    description: "An ultra-modern liquid glass software developer portfolio with live GitHub synchronization and admin content management.",
    longDescription: "Natraj Portfolio is a feature-packed web experience showcasing interactive bento grid layouts, Raycast command palette search (Cmd+K), real-time GitHub activity matrices, resume PDF exporter, and a secure admin management console.",
    category: "web",
    tags: ["TypeScript", "React", "Motion", "Tailwind CSS", "Express"],
    githubUrl: "https://github.com/devnightnv-netizen/natraj-portfolio",
    liveUrl: "https://github.com/devnightnv-netizen/natraj-portfolio",
    featured: true,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stats: { stars: 8, forks: 1, views: 220 }
  },
  {
    id: "online-interview-forum",
    title: "Online Interview Forum",
    description: "An automated technical recruitment portal centered on a secure browser code editor, allowing admins to dynamically assign coding challenges and review submissions.",
    longDescription: "Online Interview Forum is a comprehensive web system designed to streamline technical hiring. Built with a responsive code editor concept, it registers candidates, allows administrators to view candidate profiles, and dynamically assigns programming tasks via automated email notifications.",
    category: "web",
    tags: ["Java", "ASP.NET", "MongoDB", "Email Service API"],
    githubUrl: "https://github.com/devnightnv-netizen/online-interview-forum",
    liveUrl: "https://online-interview-forum.demo",
    featured: false,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    stats: { stars: 45, forks: 8, views: 520 }
  },
  {
    id: "cloud-native-tracker",
    title: "Cloud-Native Inventory Engine",
    description: "A cloud-hosted resource tracking dashboard featuring high-performance database indexing and secure storage deployed on Oracle Cloud Infrastructure.",
    longDescription: "An inventory management utility designed to showcase robust database structures and containerized deployments. This application links ASP.NET backend servers with indexed MongoDB databases, managing storage clusters, active assets, and data ledger operations with real-time logging.",
    category: "cloud",
    tags: ["ASP.NET", "MongoDB", "Oracle Cloud", "C#"],
    githubUrl: "https://github.com/devnightnv-netizen/cloud-native-tracker",
    liveUrl: "https://cloud-native-tracker.demo",
    featured: false,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    stats: { stars: 32, forks: 4, views: 240 }
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    role: "Bachelor of Information Technology (B.Sc IT)",
    company: "NPR Arts & Science College",
    location: "Natham, Tamil Nadu, India",
    period: "2022 - 2025",
    description: [
      "Graduated with a first-class score of 82.3% in Information Technology, specializing in software structures, system analysis, and databases.",
      "Developed the 'Online Interview Forum' as a final year capstone project using dynamic web views and database structures.",
      "Engaged in core practical labs for programming logic, mastering OOP in Java and scripting in Python."
    ],
    tags: ["Information Technology", "Java", "Python", "MongoDB", "ASP.NET"]
  },
  {
    id: "exp-2",
    role: "Computer Commerce (HSC)",
    company: "Aruljothi Vallalar Higher Secondary School",
    location: "Dindigul, Tamil Nadu, India",
    period: "2020 - 2022",
    description: [
      "Completed Higher Secondary Certificate with a solid academic score of 70.6%.",
      "Gained key proficiencies in business applications, database ledger entries, and computational logic."
    ],
    tags: ["Computer Commerce", "Tally", "Office Automation", "Foundational Programming"]
  },
  {
    id: "exp-3",
    role: "SSLC 10th Graduation",
    company: "Sowrashtra Sri Varatharaja High School",
    location: "Dindigul, Tamil Nadu, India",
    period: "2019 - 2020",
    description: [
      "Completed high school education with a score of 55.8%, establishing a strong mathematical and logical thinking foundation."
    ],
    tags: ["General Science", "Analytical Mathematics", "Logical Skills"]
  }
];

export const skillsData: Skill[] = [
  { name: "React", category: "frontend", icon: "Code2", proficiency: 95, color: "#007396" },
  { name: "Java", category: "languages", icon: "Code2", proficiency: 85, color: "#007396" },
  { name: "Python", category: "languages", icon: "Cpu", proficiency: 80, color: "#3776AB" },
  { name: "ASP.NET", category: "backend", icon: "Terminal", proficiency: 75, color: "#512BD4" },
  { name: "MongoDB", category: "backend", icon: "Database", proficiency: 82, color: "#47A248" },
  { name: "Oracle Cloud", category: "devops", icon: "Globe", proficiency: 75, color: "#F80000" },
  { name: "Photoshop", category: "frontend", icon: "Layers", proficiency: 90, color: "#31A8FF" },
  { name: "Tally", category: "backend", icon: "Layers", proficiency: 80, color: "#4F8CFF" },
  { name: "Photo Designing", category: "frontend", icon: "Sparkles", proficiency: 85, color: "#E1306C" },
  { name: "Management", category: "languages", icon: "Sparkles", proficiency: 80, color: "#7C4DFF" },
  { name: "Digital Marketing", category: "languages", icon: "Globe", proficiency: 78, color: "#00D4FF" }
];

export const achievementsData: Achievement[] = [
  {
    id: "ach-1",
    title: "Oracle Cloud Infrastructure Certification",
    issuer: "Oracle",
    date: "2024",
    type: "certification",
    description: "Certified capability in understanding Oracle cloud architectures, cloud deployments, security policies, and container configurations."
  },
  {
    id: "ach-2",
    title: "MongoDB Database Associate Certification",
    issuer: "MongoDB Academy",
    date: "2024",
    type: "certification",
    description: "Validated skill in NoSQL database structures, document schemas, dynamic JSON models, query indexing, and performance tuning."
  },
  {
    id: "ach-3",
    title: "Photoshop & Photo Designing Excellence Certificate",
    issuer: "Technical Training Center",
    date: "2023",
    type: "certification",
    description: "Honored with a course completion certification for mastery in photo manipulation, color correcting, layers composite, and web UI layout creation."
  },
  {
    id: "ach-4",
    title: "Tally ERP & Accounting Operations",
    issuer: "Dindigul Academy of Business",
    date: "2022",
    type: "certification",
    description: "Certified proficiency in operating digital ledgers, accounting journals, business invoices, and stock tracking tools."
  }
];

// Generates continuous mock GitHub grid data for a real-time feel
export const generateGitHubData = (): ContributionDay[] => {
  const data: ContributionDay[] = [];
  const today = new Date();
  
  // Create 18 weeks of data (126 days)
  for (let i = 125; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    
    // Create organic-looking active spikes (weekends lower, mid-week higher, occasional sprints)
    const dayOfWeek = d.getDay();
    let baseChance = 25; // default percentage
    if (dayOfWeek === 0 || dayOfWeek === 6) baseChance = 10; // low weekend
    if (dayOfWeek >= 2 && dayOfWeek <= 4) baseChance = 55; // high mid-week
    
    // Add seasonal sprints
    const dateNum = d.getDate();
    if (dateNum >= 10 && dateNum <= 15) baseChance += 25; 
    
    const random = Math.floor(Math.random() * 100);
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    
    if (random < baseChance) {
      count = Math.floor(Math.random() * 8) + 1;
      if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 6) level = 3;
      else level = 4;
    }
    
    data.push({
      date: d.toISOString().split('T')[0],
      count,
      level
    });
  }
  return data;
};

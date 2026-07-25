export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  category: 'web' | 'mobile' | 'ai' | 'cloud';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image: string;
  stats?: {
    stars?: number;
    forks?: number;
    views?: number;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'mobile' | 'languages';
  icon: string; // lucide icon name
  proficiency: number; // 0-100
  color: string; // hex or Tailwind color name
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'award' | 'certification' | 'hackathon';
  description: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

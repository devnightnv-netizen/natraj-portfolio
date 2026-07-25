import { Project } from '../types';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

const CATEGORY_IMAGES: Record<string, string> = {
  'interior-billing': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  'textile_website': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  'textile-website': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  'natraj-portfolio': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  'default-web': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'default-mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  'default-ai': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'default-cloud': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
};

export function formatRepoTitle(name: string): string {
  if (name === 'interior-billing') return 'Interior Billing System';
  if (name === 'textile_website' || name === 'textile-website') return 'Textile Web Experience';
  if (name === 'natraj-portfolio') return 'Natraj Portfolio & Admin Workspace';

  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatRepoDescription(repo: GitHubRepo): { description: string; longDescription: string } {
  if (repo.name === 'interior-billing') {
    return {
      description: 'A comprehensive billing, estimation, and customer invoice platform built for interior design & decor workflows.',
      longDescription: 'Interior Billing System is a production-ready application tailored for interior design firms. Features itemized material estimation, automated sales tax & discount breakdowns, client order tracking, printable invoice receipts, and Vercel cloud deployment integration.'
    };
  }

  if (repo.name === 'textile_website' || repo.name === 'textile-website') {
    return {
      description: 'An interactive showcase and e-commerce portal for textile product manufacturing, fabric catalogs, and customer inquiries.',
      longDescription: 'Textile Web Experience is a modern digital storefront showcasing textile product collections, fabric specifications, yarn thread details, custom inquiry submission forms, and responsive mobile-first views deployed on Vercel.'
    };
  }

  if (repo.name === 'natraj-portfolio') {
    return {
      description: 'An ultra-modern liquid glass software developer portfolio with live GitHub synchronization and admin content management.',
      longDescription: 'Natraj Portfolio is a feature-packed web experience showcasing interactive bento grid layouts, Raycast command palette search (Cmd+K), real-time GitHub activity matrices, resume PDF exporter, and a secure admin management console.'
    };
  }

  const desc = repo.description || `Open-source ${repo.language || 'software'} project hosted on GitHub.`;
  const longDesc = `${desc} Built using ${repo.language || 'modern web technologies'}. Includes active version control, automated commit tracking, and public source repository access at ${repo.html_url}.`;

  return { description: desc, longDescription: longDesc };
}

export function selectRepoImage(repo: GitHubRepo): string {
  if (CATEGORY_IMAGES[repo.name]) {
    return CATEGORY_IMAGES[repo.name];
  }
  const lang = (repo.language || '').toLowerCase();
  if (lang.includes('python') || lang.includes('ai')) return CATEGORY_IMAGES['default-ai'];
  if (lang.includes('docker') || lang.includes('asp.net')) return CATEGORY_IMAGES['default-cloud'];
  return CATEGORY_IMAGES['default-web'];
}

export function convertGitHubRepoToProject(repo: GitHubRepo): Project {
  const { description, longDescription } = formatRepoDescription(repo);
  const tags = ['GitHub', repo.language || 'TypeScript'];

  if (repo.homepage) {
    tags.push('Live Demo');
  }
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics.slice(0, 3));
  } else {
    tags.push('Open Source');
  }

  return {
    id: `gh-${repo.name}`,
    title: formatRepoTitle(repo.name),
    description,
    longDescription,
    category: 'web',
    tags: Array.from(new Set(tags)),
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || repo.html_url,
    featured: true,
    image: selectRepoImage(repo),
    stats: {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      views: Math.max(120, repo.stargazers_count * 25 + 150)
    }
  };
}

export async function fetchGitHubRepos(username: string = 'devnightnv-netizen'): Promise<Project[]> {
  const cleanUsername = username.trim().replace(/^@/, '');
  const response = await fetch(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=100`);

  if (!response.ok) {
    throw new Error(`GitHub API returned status ${response.status} for user "${cleanUsername}"`);
  }

  const data: GitHubRepo[] = await response.json();
  return data.map(convertGitHubRepoToProject);
}

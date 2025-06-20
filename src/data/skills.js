export const skills = {
  programming: [
    {
      name: 'JavaScript',
      level: 90,
      category: 'Frontend',
      icon: 'javascript',
      description: 'ES6+, React, Node.js, TypeScript',
    },
    {
      name: 'Python',
      level: 85,
      category: 'Backend',
      icon: 'python',
      description: 'Django, Flask, Data Analysis, Automation',
    },
    {
      name: 'React',
      level: 88,
      category: 'Frontend',
      icon: 'react',
      description: 'Hooks, Context, Redux, Next.js',
    },
    {
      name: 'Node.js',
      level: 82,
      category: 'Backend',
      icon: 'nodejs',
      description: 'Express, REST APIs, Authentication',
    },
    {
      name: 'TypeScript',
      level: 80,
      category: 'Frontend',
      icon: 'typescript',
      description: 'Type safety, Interfaces, Generics',
    },
  ],

  databases: [
    {
      name: 'MongoDB',
      level: 75,
      category: 'NoSQL',
      icon: 'mongodb',
      description: 'Mongoose, Aggregation, Indexing',
    },
    {
      name: 'PostgreSQL',
      level: 70,
      category: 'SQL',
      icon: 'postgresql',
      description: 'Complex queries, Joins, Optimization',
    },
    {
      name: 'Redis',
      level: 65,
      category: 'Cache',
      icon: 'redis',
      description: 'Caching, Session management',
    },
  ],

  tools: [
    {
      name: 'Git',
      level: 85,
      category: 'Version Control',
      icon: 'git',
      description: 'GitHub, GitLab, CI/CD',
    },
    {
      name: 'Docker',
      level: 70,
      category: 'DevOps',
      icon: 'docker',
      description: 'Containerization, Docker Compose',
    },
    {
      name: 'AWS',
      level: 65,
      category: 'Cloud',
      icon: 'aws',
      description: 'EC2, S3, Lambda, RDS',
    },
  ],

  design: [
    {
      name: 'Figma',
      level: 75,
      category: 'Design',
      icon: 'figma',
      description: 'UI/UX Design, Prototyping',
    },
    {
      name: 'CSS/SCSS',
      level: 85,
      category: 'Styling',
      icon: 'css',
      description: 'Flexbox, Grid, Animations',
    },
    {
      name: 'Tailwind CSS',
      level: 80,
      category: 'Styling',
      icon: 'tailwind',
      description: 'Utility-first CSS framework',
    },
  ],
};

export const skillCategories = [
  {
    id: 'programming',
    name: 'Programming Languages',
    description: 'Core programming languages and frameworks',
  },
  {
    id: 'databases',
    name: 'Databases',
    description: 'Database technologies and management',
  },
  {
    id: 'tools',
    name: 'Tools & DevOps',
    description: 'Development tools and deployment',
  },
  {
    id: 'design',
    name: 'Design & Styling',
    description: 'UI/UX and styling technologies',
  },
];

export const getSkillsByCategory = (category) => {
  return skills[category] || [];
};

export const getAllSkills = () => {
  return Object.values(skills).flat();
};

export const getTopSkills = (limit = 6) => {
  return getAllSkills()
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
};

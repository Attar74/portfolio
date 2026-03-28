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
      name: 'TypeScript',
      level: 88,
      category: 'Full Stack',
      icon: 'typescript',
      description: 'Type safety, Interfaces, Generics, Decorators',
    },
    {
      name: 'React',
      level: 90,
      category: 'Frontend',
      icon: 'react',
      description: 'Hooks, Context, Redux, Next.js',
    },
    {
      name: 'Node.js',
      level: 85,
      category: 'Backend',
      icon: 'nodejs',
      description: 'Express, NestJS, REST APIs, Authentication',
    },
    {
      name: 'NestJS',
      level: 82,
      category: 'Backend',
      icon: 'nestjs',
      description: 'Enterprise architecture, DI, Guards, Interceptors',
    },
    {
      name: 'Python',
      level: 80,
      category: 'Backend',
      icon: 'python',
      description: 'Django, Flask, Data Analysis, Automation',
    },
  ],

  databases: [
    {
      name: 'PostgreSQL',
      level: 85,
      category: 'SQL',
      icon: 'postgresql',
      description: 'Advanced queries, Prisma ORM, Migrations, Optimization',
    },
    {
      name: 'Prisma',
      level: 82,
      category: 'ORM',
      icon: 'prisma',
      description: 'Type-safe ORM, Migrations, Relations, Query builder',
    },
    {
      name: 'MongoDB',
      level: 80,
      category: 'NoSQL',
      icon: 'mongodb',
      description: 'Mongoose, Aggregation, Indexing, Replica sets',
    },
    {
      name: 'Redis',
      level: 70,
      category: 'Cache',
      icon: 'redis',
      description: 'Caching, Session management, Pub/Sub',
    },
  ],

  tools: [
    {
      name: 'Git',
      level: 88,
      category: 'Version Control',
      icon: 'git',
      description: 'GitHub, GitLab, CI/CD, Advanced workflows',
    },
    {
      name: 'Docker',
      level: 78,
      category: 'DevOps',
      icon: 'docker',
      description: 'Containerization, Docker Compose, Multi-stage builds',
    },
    {
      name: 'REST APIs',
      level: 88,
      category: 'Backend',
      icon: 'api',
      description: 'Design, Implementation, Documentation, Swagger',
    },
    {
      name: 'JWT & Auth',
      level: 85,
      category: 'Security',
      icon: 'security',
      description: 'JWT, OAuth, RBAC, Guards, Refresh tokens',
    },
    {
      name: 'AWS',
      level: 68,
      category: 'Cloud',
      icon: 'aws',
      description: 'EC2, S3, Lambda, RDS, VPC',
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
    name: 'Programming & Frameworks',
    description: 'Core programming languages and frameworks',
  },
  {
    id: 'databases',
    name: 'Databases & ORMs',
    description: 'Database technologies, ORMs, and data management',
  },
  {
    id: 'tools',
    name: 'Backend & DevOps',
    description: 'Backend development, APIs, security, and deployment',
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

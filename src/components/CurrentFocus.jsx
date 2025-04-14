import React from 'react';
import projects from '../data/projects';
import ProjectItem from './ProjectItem';

const CurrentFocus = () => {
  // Get featured projects or first 3 projects
  const featuredProjects =
    projects.filter((project) => project.featured) || projects.slice(0, 3);

  return (
    <div className="py-12 px-12 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Current Focus</h2>
          <div className="w-16 h-1 bg-blue-600"></div>
        </div>

        <a
          href="/projects"
          className="mt-4 md:mt-0 text-gray-300 hover:text-[#fff] flex items-center group"
        >
          View All Projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1  gap-6">
        {featuredProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default CurrentFocus;

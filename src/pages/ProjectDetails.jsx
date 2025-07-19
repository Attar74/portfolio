import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import projects from '../data/projects';
import { useIcons } from '../hooks/useIcons.jsx';

const ProjectDetails = () => {
  const { getIcon } = useIcons();
  const { id } = useParams();
  const project = projects.find((p) => String(p.id) === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Project not found
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    technologies,
    imageUrl,
    link,
    companyLink,
    companyLogo,
  } = project;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl mt-[15rem] mx-5 lg:mx-0">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-lg" />
            <span className="font-medium">Back to Projects</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 lg:px-6 py-12">
        {/* Hero Image Section */}
        <div className="mb-12 px-0 lg:px-5 cursor-pointer">
          {imageUrl ? (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-96 md:h-[500px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center rounded-2xl shadow-2xl">
              <span className="text-white text-8xl font-bold">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Section */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {title}
              </h1>
              {companyLink && (
                <a
                  href={companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="w-8 h-8 rounded"
                  />
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    View Company
                  </span>
                </a>
              )}
            </div>

            {/* Description Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                About This Project
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Tech Stack
              </h3>
              <div className="space-y-3">
                {technologies &&
                  technologies.map((tech) => (
                    <div
                      key={tech}
                      className={`flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 transition-all duration-300 transform hover:scale-110
                      cursor-pointer group`}
                    >
                      <span className="text-xl text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {getIcon(tech)}
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                        {tech}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Section */}
            {link && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  View Project
                </h3>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-3 px-10 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Live Demo
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

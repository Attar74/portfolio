import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AttarLogo from '../assets/Attar-white.svg';
import projects from '../data/projects';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [timeOutFading, setTimeOutFading] = useState(5000); // Start with longer display
  const timeoutRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
      // Toggle between short fade (500ms) and longer display (5000ms)
      setTimeOutFading(timeOutFading === 500 ? 5000 : 500);
    };

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout with current duration
    timeoutRef.current = setTimeout(toggleVisibility, timeOutFading);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, timeOutFading]); // Re-run effect when visibility or timeout duration changes

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white lg:hidden cursor-pointer"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            className="select-none outline-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="18"
              x2="18"
              y2="6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            className="select-none outline-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="4" width="24" height="2" rx="1" fill="currentColor" />

            <rect
              x="0"
              y="11"
              width="18"
              height="2"
              rx="1"
              fill="currentColor"
            />

            <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full  text-white transition-all duration-300 ease-in-out transform ${
          isOpen
            ? 'translate-x-0 bg-black'
            : '-translate-x-full lg:translate-x-0 bg-transparent'
        } lg:w-64 w-64 shadow-xl`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4">
            <Link
              className="w-12 h-12 select-none outline-none"
              to="/"
              aria-label="Home"
            >
              <img
                src={AttarLogo}
                alt="Attar Logo"
                className={`w-16 h-16 m-0 transition-opacity duration-1000 ${
                  isVisible ? 'opacity-100' : 'opacity-10'
                } ${isOpen ? 'translate-x-30' : 'translate-x-0'}`}
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-4 opacity-30 hover:opacity-60 transition-opacity duration-200 cursor-pointer">
            <svg
              className="select-none outline-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="4" width="24" height="2" rx="1" fill="currentColor" />

              <rect
                x="0"
                y="11"
                width="18"
                height="2"
                rx="1"
                fill="currentColor"
              />

              <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
            </svg>

            {/* Projects Section */}
            <div className="mt-6">
              <h3 className="px-2 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <a href="#">Projects</a>
              </h3>
              <ul className="space-y-1">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      to={project.link}
                      target="_blank"
                      className={`flex items-center p-2 rounded-md transition-colors hover:text-[#fff] ${
                        location.pathname === `/projects/${project.id}`
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="truncate">{project.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 text-xs text-left text-gray-500">
            © {new Date().getFullYear()} Mahmod Attar
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

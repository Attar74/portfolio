import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AttarLogo from '../assets/Attar-white.svg';

// Logo component with variable fade animation
const Logo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeOutFading, setTimeOutFading] = useState(5000); // Start with longer display
  const timeoutRef = useRef(null);

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
    <img
      src={AttarLogo}
      alt="Attar Logo"
      className={`w-full h-full m-0 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-10'
      }`}
    />
  );
};

// Theme toggle component - implement based on your needs
const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-1 m-auto"
      title="Toggle Dark Mode"
    >
      <div className={isDark ? 'i-ri-sun-line' : 'i-ri-moon-line'}>
        {/* Replace with your icon component or SVG */}
        {isDark ? '☀️' : '🌙'}
      </div>
    </button>
  );
};

const Navbar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="z-40 relative max-w-screen-xl mx-auto">
        <Link
          className="w-12 h-12 absolute top-6 left-6 select-none outline-none"
          to="/"
          aria-label="Home"
        >
          <Logo />
        </Link>

        <button
          title="Scroll to top"
          className={`fixed right-3 bottom-3 w-10 h-10 hover:opacity-100 rounded-full
            hover:bg-[#8883] transition duration-300 z-100 print:hidden
            ${scroll > 300 ? 'opacity-30' : 'opacity-0 pointer-events-none'}`}
          onClick={toTop}
        >
          <div className="i-ri-arrow-up-line">↑</div>
        </button>

        <nav className="p-8 w-full flex justify-between items-center box-border ">
          <div className="m-auto" />
          <div className="grid grid-flow-col gap-5 print:opacity-0">
            {/* 
            <Link
              to="/posts"
              title="Blog"
              className="font-bold cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <span className="hidden md:inline">Blog</span>
              <div className="md:hidden i-ri-article-line">📄</div>
            </Link>
            */}

            <Link
              to="https://www.linkedin.com/in/attar74/#projects"
              target="_blank"
              rel="noopener noreferrer"
              title="Projects"
              className="font-bold cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <span className="hidden md:inline">Projects</span>
              <div className="md:hidden i-ri-lightbulb-line">💡</div>
            </Link>

            {/*
            <Link
              to="/talks"
              className="font-bold cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
              title="Talks"
            >
              Talks
            </Link>
            */}

            {/*
            <Link
              to="/sponsors-list"
              title="Sponsors"
              className="font-bold cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <span className="hidden md:inline">Sponsors</span>
              <div className="md:hidden i-ri-heart-line">❤️</div>
            </Link>
            */}

            {/*
            <Link
              to="/podcasts"
              className="hidden md:inline cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
              title="Podcasts"
            >
              <div className="i-ri-mic-line">🎙️</div>
            </Link>
            */}

            {/*
            <Link
              to="/photos"
              title="Photos"
              className="cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <div className="i-ri-camera-3-line">📷</div>
            </Link>
            */}

            {/*
            <Link
              to="/demos"
              title="Demos"
              className="cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <div className="i-ri-screenshot-line">🖼️</div>
            </Link>
            */}

            {/*
            <a
              href="https://bsky.app/profile/antfu.me"
              target="_blank"
              rel="noopener noreferrer"
              title="Bluesky"
              className="hidden md:inline cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <div className="i-ri-bluesky-line">🔵</div>
            </a>
            */}

            <a
              href="https://github.com/Attar74"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="hidden md:inline cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <div className="i-uil-github-alt">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.96.58.11.79-.25.79-.56v-2.2c-3.2.69-3.87-1.54-3.87-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.28 3.4.98.1-.76.4-1.29.72-1.58-2.55-.29-5.23-1.28-5.23-5.72 0-1.27.45-2.31 1.19-3.12-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.19a11.1 11.1 0 012.88-.39c.98 0 1.97.13 2.88.39 2.19-1.5 3.16-1.19 3.16-1.19.63 1.58.23 2.75.11 3.04.74.81 1.19 1.85 1.19 3.12 0 4.45-2.68 5.43-5.23 5.71.42.36.76 1.09.76 2.2v3.26c0 .31.21.67.8.56A10.5 10.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/attar-khan-74/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="hidden md:inline cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <div className="i-uil-linkedin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.45 20.45h-3.6v-5.4c0-1.29-.03-2.95-1.8-2.95-1.81 0-2.09 1.41-2.09 2.86v5.49h-3.6V9h3.46v1.56h.05c.48-.91 1.66-1.86 3.41-1.86 3.64 0 4.31 2.4 4.31 5.51v6.24zM5.34 7.43a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zm1.8 13.02h-3.6V9h3.6v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.72C24 .77 23.21 0 22.23 0z" />
                </svg>
              </div>
            </a>

            {/*
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              title="RSS"
              className="hidden md:inline cursor-pointer no-underline text-inherit transition-opacity duration-200 opacity-60 hover:opacity-100 outline-none m-auto"
            >
              <div
                className="i-la-rss-square"
                style={{ fontSize: '1.25rem', margin: '0 -0.125rem' }}
              >
                📰
              </div>
            </a>
            */}

            {/*
            <ToggleTheme />
            */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

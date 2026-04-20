import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import blogs from '../data/blogs';

// Utility function to generate slug from heading text
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Extract headings from markdown content
const extractHeadings = (content) => {
  const headings = [];
  const lines = content.split('\n');

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2]
        .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
        .replace(/`([^`]+)`/g, '$1') // Remove inline code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Remove links

      headings.push({
        level,
        text,
        slug: generateSlug(text),
      });
    }
  });

  return headings;
};

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const currentIndex = blogs.findIndex((b) => b.id === id);
  const nextBlog =
    currentIndex !== -1 && currentIndex < blogs.length - 1
      ? blogs[currentIndex + 1]
      : null;

  const [activeSection, setActiveSection] = useState('');

  // Extract headings for table of contents
  const headings = useMemo(() => {
    if (!blog?.content) return [];
    return extractHeadings(blog.content);
  }, [blog?.content]);

  // Scroll to top when blog post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) =>
        document.getElementById(h.slug),
      );
      const scrollPosition = window.scrollY + 150;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(headings[i].slug);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Smooth scroll to section
  const scrollToSection = (slug) => {
    const element = document.getElementById(slug);
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!blog) {
    return (
      <div className="py-12 px-6 md:px-12 xl:px-0 w-full min-h-screen">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Blog Post Not Found
          </h1>
          <Link
            to="/blog"
            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[5rem] py-12 px-6 md:px-12 xl:px-0 w-full max-w-7xl mx-auto min-h-screen">
      <div className="flex gap-8 relative">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {/* Back button */}
          <Link
            to="/blog"
            className="text-gray-400 hover:text-white inline-flex items-center gap-2 mb-8 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Blog header */}
          <article className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 p-8 md:p-12">
            {blog.imageUrl && (
              <div className="relative h-64 md:h-96 -mx-8 md:-mx-12 -mt-8 md:-mt-12 mb-8">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              {blog.date && (
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {blog.author && (
                <>
                  <span>•</span>
                  <span>By {blog.author}</span>
                </>
              )}
              {blog.readTime && (
                <>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {blog.title}
            </h1>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none">
              <MarkdownRenderer
                content={blog.content || blog.description}
                generateSlug={generateSlug}
              />
            </div>

            {/* Next Blog Post Section */}
            {nextBlog && (
              <div className="mt-12 pt-8 border-t border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  What's Next?
                </h3>
                <Link
                  to={`/blog/${nextBlog.id}`}
                  className="block group bg-gray-700/30 hover:bg-gray-700/50 rounded-lg p-6 border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-sm text-blue-400 mb-2">
                        Next Post
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {nextBlog.title}
                      </h4>
                      <p className="text-gray-400 line-clamp-2">
                        {nextBlog.description}
                      </p>
                      {nextBlog.readTime && (
                        <div className="text-sm text-gray-500 mt-3">
                          {nextBlog.readTime}
                        </div>
                      )}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
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
                  </div>
                </Link>
              </div>
            )}
          </article>
        </div>

        {/* Table of Contents Sidebar */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-86 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  On This Page
                </h3>
                <nav className="space-y-1">
                  {headings.map((heading, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(heading.slug)}
                      className={`block w-full text-left text-sm py-1.5 px-3 rounded transition-all ${
                        activeSection === heading.slug
                          ? 'text-blue-400 bg-blue-400/10 font-medium border-l-2 border-blue-400 -ml-px pl-[11px]'
                          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                      }`}
                      style={{
                        paddingLeft: `${(heading.level - 1) * 12 + 12}px`,
                      }}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;

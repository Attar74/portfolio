import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/avatar.png';
import VelentsLogo from '../assets/velents-logo.png';

const Profile = () => {
  return (
    <>
      <div className="bg-black text-white p-6 min-h-screen max-w-screen-md mx-auto my-[10rem]">
        <div className="absolute top-10 right-[30%] lg:top-[15rem] lg:right-[10rem] bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-lg transform rotate-3 shadow-lg shake-animation transition-all duration-300 cursor-pointer">
          Under Development
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold mb-6">Mahmod Attar</h1>
          <img
            src={Avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full mb-6"
          />
        </div>

        <p className="text-lg mb-6">
          Hey, I am Mahmod Attar, a passionate Frontend Developer based in
          Cairo, Egypt with mainly expertise in Vue.js, React.
        </p>

        <div className="space-y-2 mb-6">
          <p className="flex items-center gap-2">
            <strong>Working at </strong>
            <span className="flex items-center gap-1 hover:scale-105 transition-all duration-300 cursor-pointer">
              <img src={VelentsLogo} alt="Velents Logo" className="w-4 h-4" />
              <a
                className="hover:text-yellow-300 hover:underline"
                href="https://velents.ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Velents
              </a>
            </span>
          </p>

          <p className="flex items-center gap-2 flex-wrap">
            <strong>Skilled in </strong>
            <span className="flex items-center gap-1">
              <span className="text-blue-500">⚛️</span> React
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">V</span> Vue.js
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-400">▲</span> Nuxt
            </span>
            <span className="flex items-center gap-1">
              <span className="text-blue-400">🌐</span> JavaScript
            </span>
          </p>

          <p className="flex items-center gap-2 flex-wrap">
            <strong>Education </strong>
            <span className="flex items-center gap-1">
              <span className="text-orange-500">🎓</span> BSc. Computer Science,
              Benha University
            </span>
            <span className="flex items-center gap-1">
              <span className="text-purple-400">📚</span> MEARN Stack, ITI
            </span>
          </p>

          <p className="flex items-center gap-2 flex-wrap">
            <strong>Services </strong>
            <span className="flex items-center gap-1">
              <span className="text-blue-300">🎨</span> Web Design
            </span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">💻</span> Web Development
            </span>
          </p>
        </div>

        <p className="mb-2">
          I'm a senior front-end developer with a BSc and a postgraduate diploma
          in Computer Science, and over 5 years of experience crafting scalable,
          accessible, and performance-optimized web applications. At{' '}
          <span className="text-yellow-400">▲</span>{' '}
          <a
            className="text-yellow-300 hover:underline hover:scale-105 transition-all duration-300"
            href="https://velents.ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Velents
          </a>
          , I’ve contributed to AI-powered platforms using React, Nuxt, and
          TypeScript. You can find my{' '}
          <Link
            to="https://www.linkedin.com/in/attar74"
            className="text-blue-400 underline hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            featured projects here
          </Link>
          , including <em>AudioCloud</em> — a platform for uploading and
          streaming audio content.
        </p>

        <p className="mb-2">
          I’ve completed several certifications in front-end development,
          including <span className="text-blue-400">React Hooks</span>,{' '}
          <span className="text-blue-400">React Accessibility</span>, and{' '}
          <span className="text-blue-400">
            React: Creating and Hosting a Full-Stack Site
          </span>
          . I also recently completed the{' '}
          <span className="text-blue-400">Nuxt 3 Bootcamp</span> to strengthen
          my Vue.js expertise.
        </p>

        <p className="mb-2">
          I'm proud to have earned 2nd place in the{' '}
          <span className="text-blue-400">Ideation Marathon Competition</span>{' '}
          by Egypt’s Ministry of Communications and Information Technology,
          which led to an incubation phase at the Technology Innovation &
          Entrepreneurship Center (TIEC).
        </p>

        <p className="mb-2">
          I'm fluent in <span className="text-blue-400">Arabic</span> (native),
          professionally proficient in{' '}
          <span className="text-blue-400">English</span>, and possess basic
          knowledge of <span className="text-blue-400">German</span>. If you're
          interested in collaborating or just want to connect, feel free to{' '}
          <Link
            to="https://www.linkedin.com/in/attar74"
            className="text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            reach out
          </Link>
          .
        </p>
        <div className="bg-black text-white mt-[5rem]">
          <h2 className="text-xl font-medium mb-4">Find me on</h2>

          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="https://github.com/Attar74"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.96.58.11.79-.25.79-.56v-2.2c-3.2.69-3.87-1.54-3.87-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.28 3.4.98.1-.76.4-1.29.72-1.58-2.55-.29-5.23-1.28-5.23-5.72 0-1.27.45-2.31 1.19-3.12-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.19a11.1 11.1 0 012.88-.39c.98 0 1.97.13 2.88.39 2.19-1.5 3.16-1.19 3.16-1.19.63 1.58.23 2.75.11 3.04.74.81 1.19 1.85 1.19 3.12 0 4.45-2.68 5.43-5.23 5.71.42.36.76 1.09.76 2.2v3.26c0 .31.21.67.8.56A10.5 10.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
              </span>{' '}
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/attar74"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.45 20.45h-3.6v-5.4c0-1.29-.03-2.95-1.8-2.95-1.81 0-2.09 1.41-2.09 2.86v5.49h-3.6V9h3.46v1.56h.05c.48-.91 1.66-1.86 3.41-1.86 3.64 0 4.31 2.4 4.31 5.51v6.24zM5.34 7.43a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zm1.8 13.02h-3.6V9h3.6v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.72C24 .77 23.21 0 22.23 0z" />
                </svg>
              </span>{' '}
              LinkedIn
            </a>
          </div>

          <p className="mb-4 opacity-80">
            Whatsapp me at{' '}
            <a
              href="https://wa.me/31653209256"
              className="underline hover:opacity-100"
            >
              +31653209256
            </a>
          </p>

          <p className="mb-4 opacity-80">
            Or mail me at{' '}
            <a
              href="mailto:m.elattar.dev@gmail.com"
              className="underline hover:opacity-100"
            >
              m.elattar.dev@gmail.com
            </a>
          </p>

          {/* {false && (
            <div className="opacity-60">
              <p className="mb-2">Inactive on</p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="text-xl">🐘</span> Mastodon
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="text-xl">𝕏</span> Twitter
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="text-xl">🧠</span> 知乎
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="text-xl">🔄</span> 微博
                </span>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Profile;

import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/avatar.png';
const Profile = () => {
  return (
    <div className="bg-black text-white p-6 min-h-screen max-w-screen-md mx-auto">
      <div className="absolute top-[10rem] right-[10rem] bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-lg transform rotate-3 shadow-lg shake-animation transition-all duration-300 cursor-pointer">
        Under Development
      </div>
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold mb-6">Mahmod Attar</h1>
        <img src={Avatar} alt="Avatar" className="w-8 h-8 rounded-full mb-6" />
      </div>

      <p className="text-lg mb-6">
        Hey, I am Mahmod Attar, a passionate Frontend Developer based in Cairo,
        Egypt with mainly expertise in Vue.js, React.
      </p>

      <div className="space-y-2 mb-6">
        <p className="flex items-center gap-2">
          Working at{' '}
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">▲</span>{' '}
            <a
              className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300"
              href="https://velents.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Velents
            </a>
          </span>
        </p>

        <p className="flex items-center gap-2 flex-wrap">
          Skilled in{' '}
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
          Education{' '}
          <span className="flex items-center gap-1">
            <span className="text-orange-500">🎓</span> BSc. Computer Science,
            Benha University
          </span>
          <span className="flex items-center gap-1">
            <span className="text-purple-400">📚</span> MEARN Stack, ITI
          </span>
        </p>

        <p className="flex items-center gap-2 flex-wrap">
          Services{' '}
          <span className="flex items-center gap-1">
            <span className="text-blue-300">🎨</span> Web Design
          </span>
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">💻</span> Web Development
          </span>
        </p>
      </div>

      <p className="mb-2">
        With a solid foundation in Computer Science and continuous learning, I'm
        passionate about creating exceptional web experiences. You can find my{' '}
        <Link
          to="https://www.linkedin.com/in/attar74"
          className="text-blue-400 underline hover:text-blue-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          projects here
        </Link>
        , including AudioCloud - an audio platform for uploading and listening
        to audio content.
      </p>

      <p className="mb-2">
        I've completed numerous certifications in React development, including{' '}
        <span className="text-blue-400">React Hooks</span>,{' '}
        <span className="text-blue-400">React Accessibility</span>, and{' '}
        <span className="text-blue-400">
          React: Creating and Hosting a Full-Stack Site
        </span>
        . Recently, I've also completed{' '}
        <span className="text-blue-400">The Nuxt 3 Bootcamp</span>, enhancing my
        Vue.js skills.
      </p>

      <p className="mb-2">
        I'm proud to have been part of the team that won 2nd place in the{' '}
        <span className="text-blue-400">Ideation Marathon Competition</span> by
        the Ministry of Communications and Information Technology, which led to
        an incubation phase at the Technology Innovation Entrepreneurship
        Center.
      </p>

      <p className="mb-2">
        I'm fluent in <span className="text-blue-400">Arabic</span> (native),{' '}
        <span className="text-blue-400">English</span> (professional), and have
        elementary proficiency in <span className="text-blue-400">German</span>.
        If you're interested in collaborating or just want to connect, feel free
        to{' '}
        <Link to="/contact" className="text-blue-400 hover:text-blue-300">
          reach out
        </Link>
        .
      </p>
    </div>
  );
};

export default Profile;

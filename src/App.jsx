import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Projects from './pages/Projects';

function App() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

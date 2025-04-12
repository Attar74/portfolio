import Navbar from '../components/Navbar';
import Profile from '../components/Profile';

function Home() {
  return (
    <div>
      <Navbar />
      <main className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <Profile />
        </div>
      </main>
    </div>
  );
}

export default Home;

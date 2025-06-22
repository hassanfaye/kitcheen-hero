import MainLayout from './MainLayout.jsx';
import { setIsSignedIn } from './router.jsx';
import { useNavigate } from '@solidjs/router';

export default function Dashboard() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.setItem('signedIn', 'false');
    navigate('/signin');
  };

  return (
    <MainLayout>
      <div class="max-w-2xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
        <h2 class="text-3xl font-extrabold text-white mb-4 tracking-tight" style={{fontFamily: 'SF Pro Display, Inter, Arial, sans-serif'}}>Welcome to Kitchen Hero!</h2>
        <p class="text-lg text-gray-300 mb-8">This is your luxury dashboard. Explore, manage your profile, or sign out below.</p>
        <div class="flex gap-4">
          <button
            onClick={() => navigate('/profile')}
            class="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/60 text-lg tracking-wide"
          >
            Profile
          </button>
          <button
            onClick={handleSignOut}
            class="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-400/60 text-lg tracking-wide"
          >
            Sign Out
          </button>
        </div>
      </div>
    </MainLayout>
  );
} 
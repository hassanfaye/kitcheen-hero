import MainLayout from './MainLayout.jsx';
import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = createSignal('Demo User');
  const [email, setEmail] = createSignal('demo@kitchenhero.com');
  const [success, setSuccess] = createSignal('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess('Profile updated! (demo)');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <MainLayout>
      <div class="max-w-2xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
        <h2 class="text-3xl font-extrabold text-white mb-4 tracking-tight" style={{fontFamily: 'SF Pro Display, Inter, Arial, sans-serif'}}>Profile</h2>
        <form onSubmit={handleSave} class="flex flex-col gap-6">
          <div>
            <label class="block text-gray-300 mb-2" htmlFor="profile-name">Name</label>
            <input
              id="profile-name"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 font-medium shadow-inner backdrop-blur-md"
              value={name()}
              onInput={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-2" htmlFor="profile-email">Email</label>
            <input
              id="profile-email"
              type="email"
              class="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 font-medium shadow-inner backdrop-blur-md"
              value={email()}
              onInput={e => setEmail(e.target.value)}
            />
          </div>
          {success() && <div class="text-green-400 text-center font-medium">{success()}</div>}
          <div class="flex gap-4 mt-2">
            <button
              type="submit"
              class="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/60 text-lg tracking-wide"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              class="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-400/60 text-lg tracking-wide"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
} 
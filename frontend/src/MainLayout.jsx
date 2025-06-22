import { A } from '@solidjs/router';
import { setIsSignedIn } from './router';

export default function MainLayout(props) {
  const handleSignOut = () => {
    localStorage.removeItem('signedIn');
    setIsSignedIn(false);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 transition-colors duration-200 px-2 flex flex-col items-center relative overflow-hidden">
      {/* Techy SVG grid background */}
      <svg class="absolute inset-0 w-full h-full z-0 opacity-20" style={{pointerEvents: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <header class="w-full max-w-4xl mx-auto flex justify-between items-center py-6 px-4 z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-2xl font-extrabold shadow-xl border border-white/20 backdrop-blur-md">
            KH
          </div>
          <span class="text-xl font-bold text-cyan-300 tracking-tight font-techy" style={{fontFamily: 'Share Tech Mono, Orbitron, Inter, Arial, sans-serif'}}>Kitchen Hero</span>
        </div>
        <nav class="flex items-center gap-4">
          <A href="/dashboard" class="text-cyan-300 hover:text-white transition-colors">Dashboard</A>
          <A href="/profile" class="text-cyan-300 hover:text-white transition-colors">Profile</A>
          <A href="/recipe" class="text-cyan-300 hover:text-white transition-colors">Recipes</A>
          <button onClick={handleSignOut} class="text-cyan-300 hover:text-white transition-colors">
            Sign Out
          </button>
        </nav>
      </header>
      <main class="flex-1 w-full flex flex-col items-center justify-center z-10">
        {props.children}
      </main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Share+Tech+Mono&display=swap');
        .font-techy { font-family: 'Share Tech Mono', 'Orbitron', monospace; }
        .neon-card {
          box-shadow: 0 0 32px 4px #38bdf8, 0 1.5px 8px 0 #000a;
          border: 1.5px solid #38bdf8;
        }
      `}</style>
    </div>
  );
} 
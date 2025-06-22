import { createSignal, onMount } from 'solid-js';

export default function AuthLayout(props) {
  const [theme, setTheme] = createSignal('dark');

  // On mount, read theme from localStorage
  onMount(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      if (saved === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  });

  const toggleTheme = () => {
    const next = theme() === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    if (next === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 transition-colors duration-200 px-2 relative overflow-hidden">
      {/* Techy SVG grid background */}
      <svg class="absolute inset-0 w-full h-full z-0 opacity-20" style={{pointerEvents: 'none'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <button
        onClick={toggleTheme}
        class="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 shadow-lg backdrop-blur-md border border-white/20 text-xl text-white transition-colors z-10"
        aria-label="Toggle dark mode"
      >
        {theme() === 'light' ? '🌙' : '☀️'}
      </button>
      <div class="flex flex-col items-center mb-8 z-10">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-4xl font-extrabold mb-3 shadow-2xl border border-white/20 backdrop-blur-md">
          <span style={{letterSpacing: '0.1em'}}>KH</span>
        </div>
        <h1 class="text-4xl font-extrabold text-cyan-300 tracking-tight drop-shadow-lg font-techy" style={{fontFamily: 'Share Tech Mono, Orbitron, Inter, Arial, sans-serif'}}>Kitchen Hero</h1>
      </div>
      {props.children}
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
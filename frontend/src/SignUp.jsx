import { createSignal } from 'solid-js';
import AuthLayout from './AuthLayout.jsx';
import { setIsSignedIn } from './router.jsx';
import { useNavigate } from '@solidjs/router';

export default function SignUp() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [success, setSuccess] = createSignal('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    if (!email() || !password() || !confirmPassword()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password() !== confirmPassword()) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setSuccess('Account created! (demo)');
    setIsSignedIn(true);
    localStorage.setItem('signedIn', 'true');
    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <AuthLayout>
      <div class="w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 bg-white/10 dark:bg-white/10 backdrop-blur-lg border border-white/20">
        <h2 class="text-2xl font-bold mb-6 text-center text-white tracking-tight" style={{fontFamily: 'SF Pro Display, Inter, Arial, sans-serif'}}>Sign Up</h2>
        <form onSubmit={handleSubmit} class="flex flex-col gap-5" autoComplete="on">
          <label class="sr-only" for="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="Email"
            class="px-4 py-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 font-medium shadow-inner backdrop-blur-md"
            value={email()}
            onInput={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <label class="sr-only" for="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="Password"
            class="px-4 py-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 font-medium shadow-inner backdrop-blur-md"
            value={password()}
            onInput={e => setPassword(e.target.value)}
            required
          />
          <label class="sr-only" for="signup-confirm">Confirm Password</label>
          <input
            id="signup-confirm"
            type="password"
            placeholder="Confirm Password"
            class="px-4 py-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60 font-medium shadow-inner backdrop-blur-md"
            value={confirmPassword()}
            onInput={e => setConfirmPassword(e.target.value)}
            required
          />
          {error() && <div class="text-red-400 text-sm text-center font-medium">{error()}</div>}
          {success() && <div class="text-green-400 text-sm text-center font-medium">{success()}</div>}
          <button
            type="submit"
            class="mt-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/60 text-lg tracking-wide"
          >
            Sign Up
          </button>
        </form>
        <p class="mt-6 text-center text-gray-300">
          Already have an account?{' '}
          <button class="text-blue-300 hover:underline font-semibold" onClick={() => navigate('/signin')}>
            Sign In
          </button>
        </p>
      </div>
    </AuthLayout>
  );
} 
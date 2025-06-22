import { createSignal, onMount } from 'solid-js';
import lottie from 'lottie-web';
import { Motion } from '@motionone/solid';
import { useNavigate } from '@solidjs/router';
import TrustMetrics from './TrustMetrics';
import FeatureSwiper from './FeatureSwiper.jsx';
import AuthLayout from './AuthLayout.jsx';
import { A } from '@solidjs/router';

function SignUpModal({ open, onClose }) {
  let inputRef;
  const navigate = useNavigate();
  onMount(() => {
    if (open() && inputRef) inputRef.focus();
  });
  
  const handleStart = (e) => {
      e.preventDefault();
      onClose();
      navigate('/signup'); // Navigate to full signup page
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: open() ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      class={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${open() ? '' : 'pointer-events-none'}`}
      onClick={onClose}
    >
      <Motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: open() ? 0 : 50, scale: open() ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
        class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl w-full max-w-sm relative"
        onClick={e => e.stopPropagation()}
      >
        <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl" onClick={onClose}>&times;</button>
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Start Your Free Trial</h3>
        <p class="mb-4 text-gray-600 dark:text-gray-300 text-sm">Enter your email to create an account and begin your journey to a smarter kitchen.</p>
        <form onSubmit={handleStart}>
          <input ref={el => inputRef = el} type="email" required placeholder="you@email.com" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white mb-4" />
          <button type="submit" class="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition">Continue</button>
        </form>
      </Motion.div>
    </Motion.div>
  );
}


export default function HeroScreen() {
  let lottieContainer;
  const [showModal, setShowModal] = createSignal(false);
  const navigate = useNavigate();

  onMount(() => {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets3.lottiefiles.com/packages/lf20_v4isjbj5.json', // New, working Lottie animation
    });
  });

  return (
    <AuthLayout>
      {/* Hero Section */}
      <section class="relative min-h-screen w-full flex flex-col justify-end bg-gradient-to-b from-slate-900 to-gray-900 overflow-hidden snap-start">
        {/* Lottie Background */}
        <div ref={el => (lottieContainer = el)} class="absolute inset-0 z-0 opacity-20" />

        {/* Content */}
        <Motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, easing: 'ease-out' }}
          class="relative z-10 p-8 pb-20 flex flex-col"
        >
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Turn Waste Into Profit — In Real Time
          </h1>
          <p class="text-lg text-cyan-300 mb-8">
            AI-powered insights. Real-time savings.
          </p>
          
          <div class="mt-8 flex justify-center items-center gap-4">
            <A href="/signup" class="px-8 py-3 bg-cyan-400 text-gray-900 font-bold rounded-full hover:bg-cyan-300 transition-all duration-300 text-lg shadow-lg">Get Started</A>
            <A href="/signin" class="px-8 py-3 text-cyan-300 border-2 border-cyan-400 font-bold rounded-full hover:bg-cyan-400/10 transition-all duration-300 text-lg">Sign In</A>
          </div>
          <div class="mt-4 text-center">
            <A href="/preview" class="text-sm text-cyan-400 hover:underline">Or see a preview of our dashboard</A>
          </div>
        </Motion.div>
        
        {/* Scroll Down Indicator */}
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

      </section>
      
      {/* Trust Metrics Section */}
      <section class="snap-start">
        <TrustMetrics />
      </section>

      {/* Feature Swiper Section */}
      <section class="snap-start">
        <FeatureSwiper />
      </section>

      <SignUpModal open={showModal} onClose={() => setShowModal(false)} />
    </AuthLayout>
  );
} 
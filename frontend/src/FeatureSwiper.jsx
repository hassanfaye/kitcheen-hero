import { Motion } from '@motionone/solid';
import { For } from 'solid-js';

const features = [
  {
    icon: '🤖',
    title: 'AI Insights',
    desc: 'Get custom waste-saving tips daily',
  },
  {
    icon: '📊',
    title: 'Live Dashboards',
    desc: 'See real-time kitchen performance',
  },
  {
    icon: '📦',
    title: 'Smart Inventory',
    desc: 'Auto-order when stock is low',
  },
  {
    icon: '💳',
    title: 'POS Sync',
    desc: 'Connect with your point-of-sale system',
  },
  {
    icon: '🎮',
    title: 'Team Gamification',
    desc: 'Motivate staff with fun, data-driven goals',
  },
];

function FeatureCard({ feature, index }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      inView={{ opacity: 1, y: 0 }}
      inViewOptions={{ amount: 0.3, once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, easing: 'ease-out' }}
      whileHover={{ scale: 1.05, y: -5 }}
      class="group relative min-w-[300px] w-full flex-shrink-0 snap-center overflow-hidden rounded-2xl p-px"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/50 to-blue-500/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div class="relative h-full rounded-[15px] bg-slate-800/90 p-8 flex flex-col items-center text-center backdrop-blur-lg">
          <div class="w-16 h-16 mb-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 text-3xl shadow-lg">
            {feature.icon}
          </div>
          <h3 class="text-xl font-bold text-white mb-2">{feature.title}</h3>
          <p class="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
      </div>
    </Motion.div>
  );
}

export default function FeatureSwiper() {
  return (
    <section class="bg-gradient-to-b from-slate-900 to-gray-900 py-24">
      <div class="max-w-7xl mx-auto text-center px-4">
        <h2 class="text-3xl font-extrabold text-white mb-3">
          Unlock Your Kitchen's Potential
        </h2>
        <p class="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
          A suite of tools designed for the modern chef, from AI-driven insights to seamless POS integration.
        </p>
        <div 
          class="relative flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
          style={{ 
            "-webkit-overflow-scrolling": "touch",
            "mask-image": "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
          <div class="w-8 flex-shrink-0"></div> {/* Spacer for left side */}
          <For each={features}>
            {(feature, i) => <FeatureCard feature={feature} index={i()} />}
          </For>
          <div class="w-8 flex-shrink-0"></div> {/* Spacer for right side */}
        </div>
      </div>
    </section>
  );
} 
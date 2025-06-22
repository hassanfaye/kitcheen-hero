import { createSignal, onMount } from 'solid-js';
import { inView } from 'motion';

function useAnimatedCounter(target, duration = 1500) {
  const [value, setValue] = createSignal(0);
  let raf;

  const startAnimation = () => {
    let startTimestamp;
    if (raf) cancelAnimationFrame(raf);
    function animate(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(easedProgress * target));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    }
    raf = requestAnimationFrame(animate);
  };
  
  onMount(() => () => raf && cancelAnimationFrame(raf));
  return [value, startAnimation];
}

export default function TrustMetrics() {
  const [waste, startWasteAnim] = useAnimatedCounter(92);
  const [savings, startSavingsAnim] = useAnimatedCounter(1400);
  const [kitchens, startKitchensAnim] = useAnimatedCounter(200);
  let sectionRef;

  onMount(() => {
    inView(sectionRef, 
      () => {
        startWasteAnim();
        startSavingsAnim();
        startKitchensAnim();
      },
      { amount: 0.5 } 
    );
  });

  return (
    <section ref={el => sectionRef = el} class="bg-gradient-to-b from-gray-900 to-slate-900 py-24 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div class="grid grid-cols-1 gap-y-16 sm:grid-cols-3 sm:gap-x-8">
          <div class="flex flex-col items-center">
            <div class="text-5xl font-extrabold text-green-400">
              {waste()}%
            </div>
            <p class="mt-2 text-lg font-medium text-gray-300">Less Food Waste</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-5xl font-extrabold text-cyan-400">
              {savings().toLocaleString()} SAR
            </div>
            <p class="mt-2 text-lg font-medium text-gray-300">Saved Per Month</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-5xl font-extrabold text-blue-400">
              {kitchens()}+
            </div>
            <p class="mt-2 text-lg font-medium text-gray-300">Kitchens Optimizing Daily</p>
          </div>
        </div>
      </div>
    </section>
  );
} 
export default function LoadingSpinner() {
  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div class="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin shadow-2xl bg-white/10 backdrop-blur-lg"></div>
    </div>
  );
} 
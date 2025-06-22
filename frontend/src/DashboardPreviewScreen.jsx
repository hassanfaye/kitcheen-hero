import { createSignal, onMount, For } from 'solid-js';
import MainLayout from './MainLayout';

function DashboardPreviewScreen() {
    const [waste, setWaste] = createSignal(50);
    const [savings, setSavings] = createSignal(0);
    const [showNotification, setShowNotification] = createSignal(false);
    const [showSparkles, setShowSparkles] = createSignal(false);
    const [sparkles, setSparkles] = createSignal([]);

    const triggerSparkles = () => {
        setShowSparkles(true);
        const colors = ['#38bdf8', '#fbbf24', '#a3e635', '#f472b6'];
        const generateSparkles = () => {
            for (let i = 0; i < 40; i++) { 
                const newSparkle = {
                    id: Math.random(),
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 8 + 4,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    duration: Math.random() * 1000 + 800,
                };
                setSparkles(s => [...s, newSparkle]);
                setTimeout(() => {
                    setSparkles(s => s.filter(sp => sp.id !== newSparkle.id));
                }, newSparkle.duration);
            }
        };
        generateSparkles();
        setTimeout(() => setShowSparkles(false), 2000);
    };

    onMount(() => {
        const wasteTarget = 17;
        const savingsTarget = 1234;

        setTimeout(() => {
            const wasteInterval = setInterval(() => {
                setWaste(w => {
                    const nextW = w - 1;
                    if (nextW <= wasteTarget) {
                        clearInterval(wasteInterval);
                        return wasteTarget;
                    }
                    return nextW;
                });
            }, 80);

            const savingsInterval = setInterval(() => {
                setSavings(s => {
                    const nextS = s + 23;
                    if (nextS >= savingsTarget) {
                        clearInterval(savingsInterval);
                        setTimeout(() => setShowNotification(true), 500);
                        triggerSparkles();
                        return savingsTarget;
                    }
                    return nextS;
                });
            }, 50);
        }, 1000);
    });

    return (
        <MainLayout>
            <div class="container mx-auto px-4 py-8 text-white text-center">
                <h1 class="text-4xl font-bold mb-8">Dashboard Preview</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <div class="bg-gray-800/50 p-6 rounded-lg neon-card backdrop-blur-sm">
                        <h2 class="text-2xl font-bold mb-4 text-cyan-300/80">Waste Reduction</h2>
                        <p class="text-5xl font-bold text-cyan-300">{waste()}%</p>
                    </div>
                    <div class="bg-gray-800/50 p-6 rounded-lg neon-card backdrop-blur-sm">
                        <h2 class="text-2xl font-bold mb-4 text-cyan-300/80">Total Savings</h2>
                        <p class="text-5xl font-bold text-cyan-300">${savings()}</p>
                    </div>
                </div>

                {showNotification() && (
                    <div class="fixed top-24 right-5 bg-green-500/80 backdrop-blur-md text-white p-4 rounded-lg shadow-lg animate-fade-in-down">
                        <p class="font-bold">🎉 New Achievement!</p>
                        <p>Chef Omar just saved 17% this week!</p>
                    </div>
                )}
            </div>

             {showSparkles() && (
                <div class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-50">
                    <For each={sparkles()}>
                        {sparkle => (
                            <div
                              class="absolute rounded-full"
                              style={{
                                left: `${sparkle.x}%`,
                                top: `${sparkle.y}%`,
                                width: `${sparkle.size}px`,
                                height: `${sparkle.size}px`,
                                "background-color": sparkle.color,
                                animation: `sparkle-anim ${sparkle.duration}ms ease-out forwards`,
                              }}
                            />
                        )}
                    </For>
                </div>
             )}
             <style>{`
                @keyframes sparkle-anim {
                  0% { transform: scale(0) rotate(0deg); opacity: 1; }
                  50% { opacity: 1; }
                  100% { transform: scale(1.5) rotate(90deg); opacity: 0; }
                }
                @keyframes fade-in-down {
                  0% { opacity: 0; transform: translateY(-20px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                  animation: fade-in-down 0.5s ease-out forwards;
                }
            `}</style>
        </MainLayout>
    );
}

export default DashboardPreviewScreen; 
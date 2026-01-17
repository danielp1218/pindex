import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BalanceCard } from './components/BalanceCard';
import { BetsList } from './components/BetsList';
import { HeroText } from './components/HeroText';
import { DownloadButton } from './components/DownloadButton';
import { IndexTable } from './components/IndexTable';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050b14] overflow-hidden font-sans selection:bg-blue-500/30">
      <Header />

      <main className="flex-1 relative">
        {/* Main Background Gradient - Deep Blue/Black */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a2c4e]/20 via-[#0a0e14] to-[#050b14]" />
        
        <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center pt-24">
          {/* Dashboard UI - Background Layer - Blurred & Frosted */}
          <div className="relative z-0 scale-[1.0] opacity-100 select-none pointer-events-none origin-top mask-image-gradient blur-[3px]">
            <div className="flex gap-8 items-start">
              <div className="pt-2">
                <Sidebar />
              </div>
              <div className="flex flex-col gap-6 w-[800px]">
                <div className="flex gap-6 w-full">
                  <div className="flex-1">
                    <BalanceCard />
                  </div>
                  <div className="w-[320px]">
                    <BetsList />
                  </div>
                </div>
                <div className="relative">
                  <IndexTable />
                  {/* Fade out bottom of table */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0e14] via-[#0a0e14]/80 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Foreground Content - Overlay - Shifted Down */}
          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center w-full px-4">
            <HeroText />
            <DownloadButton />
          </div>
        </section>
      </main>

      <footer className="relative z-10 p-8 text-center border-t border-gray-800/50 bg-[#0a0e14]">
        <p className="text-sm text-gray-500">&copy; 2024 PolyIndex. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

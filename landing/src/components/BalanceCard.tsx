export function BalanceCard() {
  return (
    <div className="bg-gradient-to-b from-[#1e3a8a]/20 to-[#0f172a]/40 backdrop-blur-md border border-white/10 rounded-xl p-6 w-full h-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden group">
      {/* Glossy sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-baseline">
          <span className="text-2xl text-white/80">$</span>
          <span className="text-4xl font-semibold text-white tracking-tight">1,652,342</span>
          <span className="text-xl text-white/60">.90</span>
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-700 text-white">Balance</button>
          <button className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-400 hover:text-white">Card Spend</button>
          <button className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-400 hover:text-white">This Week</button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Current balance</p>
        <svg className="w-full h-[100px]" viewBox="0 0 400 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f7931a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f7931a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 C20,90 40,85 60,80 C80,75 100,70 120,65 C140,60 160,55 180,45 C200,35 220,40 240,38 C260,36 280,30 300,25 C320,20 340,22 360,18 C380,14 400,10 400,10 L400,120 L0,120 Z"
            fill="url(#chartGradient)"
          />
          <path
            d="M0,100 C20,90 40,85 60,80 C80,75 100,70 120,65 C140,60 160,55 180,45 C200,35 220,40 240,38 C260,36 280,30 300,25 C320,20 340,22 360,18 C380,14 400,10 400,10"
            fill="none"
            stroke="#f7931a"
            strokeWidth="2"
          />
          <circle cx="400" cy="10" r="4" fill="#f7931a" />
        </svg>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
          <span>SUN</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
        <span className="text-sm text-gray-400">Available to spend</span>
        <span className="text-lg font-semibold text-white">$1,000,000.00</span>
      </div>
    </div>
  );
}

const indexData = [
  { name: 'Politics Index', icon: '🏛️', performance: '+12.5%', amount: '+$18,750.00', status: 'Active' },
  { name: 'Crypto Index', icon: '₿', performance: '+5.2%', amount: '+$7,800.00', status: 'Active' },
  { name: 'Sports Index', icon: '⚽', performance: '-1.1%', amount: '-$1,850.00', status: 'Paused' },
  { name: 'Science Index', icon: '🔬', performance: '+8.9%', amount: '+$13,300.00', status: 'Active' },
];

export function IndexTable() {
  return (
    <div className="bg-gradient-to-b from-[#1e3a8a]/20 to-[#0f172a]/40 backdrop-blur-md border border-white/10 rounded-xl p-6 w-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="grid grid-cols-[1fr_1fr_100px] gap-4 pb-4 border-b border-white/10 mb-4 relative z-10">
        <span className="text-sm font-medium text-gray-400">Bet Groups</span>
        <span className="text-sm font-medium text-gray-400">Index Performance</span>
        <span className="text-sm font-medium text-gray-400">Status</span>
      </div>
      <div className="flex flex-col gap-2">
        {indexData.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_100px] gap-4 py-2 items-center">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-white text-sm">{item.name}</span>
            </div>
            <div>
              <span className={`text-sm font-medium ${item.performance.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {item.performance} ({item.amount})
              </span>
            </div>
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                item.status === 'Active'
                  ? 'bg-green-500/15 text-green-500 border border-green-500/30'
                  : 'bg-gray-500/15 text-gray-400 border border-gray-500/30'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

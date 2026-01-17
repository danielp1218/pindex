const bets = [
  {
    id: 1,
    title: "US Election '24 Winner",
    category: 'Political Prediction',
    value: '-$1,500.00',
    positive: false,
    icon: '🇺🇸',
    iconBg: 'bg-blue-600',
  },
  {
    id: 2,
    title: 'Bitcoin Price > $100k by EOY',
    category: 'Crypto Market',
    value: '-$2,300.00',
    positive: false,
    icon: '₿',
    iconBg: 'bg-orange-500',
  },
  {
    id: 3,
    title: 'SpaceX Starship Launch Success',
    category: 'Science & Tech',
    value: '+$4,200.00',
    positive: true,
    icon: '✕',
    iconBg: 'bg-gray-800',
  },
  {
    id: 4,
    title: 'Next Recession Start Date',
    category: 'Economic Bet',
    value: '-$800.00',
    positive: false,
    icon: '📉',
    iconBg: 'bg-teal-600',
  },
  {
    id: 5,
    title: "Taylor Swift's Next Album Title",
    category: 'Entertainment Bet',
    value: '+$1,100.00',
    positive: true,
    icon: '/polylogo.jpeg',
    iconBg: 'bg-white overflow-hidden',
  },
];

export function BetsList() {
  return (
    <div className="bg-gradient-to-b from-[#1e3a8a]/20 to-[#0f172a]/40 backdrop-blur-md border border-white/10 rounded-xl p-5 w-full max-w-[320px] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="mb-4 relative z-10">
        <h3 className="text-white font-semibold">Latest Polymarket Bets</h3>
      </div>
      <ul className="flex flex-col gap-3">
        {bets.map((bet) => (
          <li key={bet.id} className="flex items-center gap-3">
            <div className={`w-10 h-10 ${bet.iconBg} rounded-lg flex items-center justify-center text-lg`}>
              {bet.icon.startsWith('/') ? (
                 <img src={bet.icon} alt="icon" className="w-full h-full object-cover" />
              ) : (
                bet.icon
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm text-white truncate">{bet.title}</span>
              <span className="block text-xs text-gray-500">{bet.category}</span>
            </div>
            <div className="text-right">
              <span className={`block text-sm font-medium ${bet.positive ? 'text-green-500' : 'text-red-500'}`}>
                {bet.value}
              </span>
              <span className="block text-xs text-gray-500">Poly Index</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

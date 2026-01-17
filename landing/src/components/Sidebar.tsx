const menuItems = [
  { icon: 'trending', label: 'Trending', active: true },
  { icon: 'bolt', label: 'Breaking' },
  { icon: 'star', label: 'New' },
  { icon: 'globe', label: 'Sports' },
  { icon: 'crypto', label: 'Crypto' },
  { icon: 'finance', label: 'Finance' },
  { icon: 'sparkles', label: 'Virtual Accounts' },
  { icon: 'document', label: 'Invoicing' },
  { icon: 'chart', label: 'Analytics' },
  { icon: 'calculator', label: 'Accounting' },
];

function SidebarIcon({ type }: { type: string }) {
  const iconClass = "w-5 h-5";

  switch (type) {
    case 'trending':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 6l-9.5 9.5-5-5L1 18" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 6h6v6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'bolt':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'star':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'globe':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      );
    case 'crypto':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.5 9.5c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2 0 .8-.5 1.5-1.2 1.8L12 12v1.5M12 16v.5"/>
        </svg>
      );
    case 'finance':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="8" width="18" height="12" rx="1"/>
          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
          <path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/>
          <path d="M19 13l.5 1.5L21 15l-1.5.5L19 17l-.5-1.5L17 15l1.5-.5L19 13z"/>
        </svg>
      );
    case 'document':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      );
    case 'chart':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 20V10M12 20V4M6 20v-6"/>
        </svg>
      );
    case 'calculator':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="2" width="16" height="20" rx="2"/>
          <line x1="8" y1="6" x2="16" y2="6"/>
          <line x1="8" y1="10" x2="8" y2="10.01"/>
          <line x1="12" y1="10" x2="12" y2="10.01"/>
          <line x1="16" y1="10" x2="16" y2="10.01"/>
          <line x1="8" y1="14" x2="8" y2="14.01"/>
          <line x1="12" y1="14" x2="12" y2="14.01"/>
          <line x1="16" y1="14" x2="16" y2="14.01"/>
          <line x1="8" y1="18" x2="8" y2="18.01"/>
          <line x1="12" y1="18" x2="12" y2="18.01"/>
          <line x1="16" y1="18" x2="16" y2="18.01"/>
        </svg>
      );
    default:
      return null;
  }
}

function SidebarItem({ item }: { item: any }) {
  return (
    <li
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
        item.active
          ? 'text-white'
          : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <SidebarIcon type={item.icon} />
      <span className="text-sm font-medium">{item.label}</span>
    </li>
  );
}

export function Sidebar() {
  return (
    <div className="w-52 py-4 select-none">
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col gap-1">
          {menuItems.slice(0, 3).map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </ul>
        <ul className="flex flex-col gap-1">
          {menuItems.slice(3, 6).map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </ul>
        <ul className="flex flex-col gap-1">
          {menuItems.slice(6).map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

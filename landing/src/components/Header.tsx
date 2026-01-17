import { ChevronDownIcon } from '@radix-ui/react-icons';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0e14]/90 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="/" className="text-white font-serif text-xl font-bold italic">
            PolyIndex
          </a>
          <nav className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-sm text-gray-300 cursor-pointer hover:text-white">
              <span>Company</span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-300 cursor-pointer hover:text-white">
              <span>Products</span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-300 cursor-pointer hover:text-white">
              <span>Solutions</span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <a href="#" className="text-sm text-gray-300 hover:text-white">Customers</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">Pricing</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">FAQ</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-gray-300 hover:text-white">Log in</a>
          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

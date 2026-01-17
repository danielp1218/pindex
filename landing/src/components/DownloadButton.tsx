export function DownloadButton() {
  return (
    <button className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#1a1a2e] rounded-full text-base font-semibold transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-xl mt-8">
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
        <path d="M12 2C14.5 2 16.8 2.9 18.5 4.5L12 12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18.5 4.5C20.9 7 21.8 10.5 21 13.8L12 12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 13.8C19.7 18.7 14.8 22 9.5 21L12 12" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
      <span>Download for Chrome</span>
    </button>
  );
}

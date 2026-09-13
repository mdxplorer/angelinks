"use client";

interface Props {
  itemCount: number;
  total: number;
  onClick: () => void;
}

export default function FloatingCart({ itemCount, total, onClick }: Props) {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 bg-accent-500 hover:bg-accent-600 text-white rounded-2xl px-5 py-3.5 shadow-lg shadow-accent-500/30 flex items-center gap-3 transition-all active:scale-95 hover:shadow-xl"
    >
      <div className="relative">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-white text-accent-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      </div>
      <span className="font-semibold text-sm">
        ${total.toLocaleString("es-CO")}
      </span>
    </button>
  );
}

export default function BrandPattern({
  className = "",
  opacity = 0.08,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="brand-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Interlocking leaf/knot motif */}
            <path
              d="M30 5 C35 5 40 10 40 15 C40 22 35 28 30 30 C25 28 20 22 20 15 C20 10 25 5 30 5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <path
              d="M30 30 C35 32 40 38 40 45 C40 50 35 55 30 55 C25 55 20 50 20 45 C20 38 25 32 30 30Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <path
              d="M5 30 C5 25 10 20 15 20 C22 20 28 25 30 30 C28 35 22 40 15 40 C10 40 5 35 5 30Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <path
              d="M30 30 C32 25 38 20 45 20 C50 20 55 25 55 30 C55 35 50 40 45 40 C38 40 32 35 30 30Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <circle cx="30" cy="30" r="2" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brand-pattern)" />
      </svg>
    </div>
  );
}

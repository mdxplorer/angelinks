interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
  xl: "w-24 h-24 text-2xl",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Avatar({ name, size = "md", className = "" }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-brand-300 to-brand-500 text-white font-display font-bold flex items-center justify-center flex-shrink-0 ${className}`}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

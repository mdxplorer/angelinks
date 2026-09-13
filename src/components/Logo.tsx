import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
  className?: string;
}

const sizes = {
  sm: { px: 28, text: "text-sm", gap: "gap-1.5" },
  md: { px: 36, text: "text-lg", gap: "gap-2" },
  lg: { px: 48, text: "text-2xl", gap: "gap-3" },
};

export default function Logo({
  size = "md",
  variant = "full",
  className = "",
}: LogoProps) {
  const s = sizes[size];

  const icon = (
    <Image
      src="/logo.png"
      alt="AngeLinks"
      width={s.px}
      height={s.px}
      className="flex-shrink-0"
      priority
    />
  );

  if (variant === "icon") {
    return <span className={className}>{icon}</span>;
  }

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {icon}
      <span className={`font-display font-bold ${s.text} text-warm-800`}>
        Ange<span className="text-accent-500">L</span>inks
      </span>
    </div>
  );
}

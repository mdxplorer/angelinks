"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import Avatar from "@/components/shared/Avatar";

interface DashboardHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export default function DashboardHeader({
  title,
  showBack = false,
  backHref = "/dashboard",
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-warm-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack ? (
            <>
              <Link
                href={backHref}
                className="w-10 h-10 rounded-xl bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="font-display font-bold text-lg text-warm-800">{title}</h1>
            </>
          ) : (
            <>
              <Logo size="md" />
              <span className="text-xs text-warm-500 border-l border-warm-200 pl-3 hidden sm:inline">
                {title || "Panel de vendedor"}
              </span>
            </>
          )}
        </div>
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 hover:bg-warm-100 rounded-xl px-2 py-1.5 transition-colors"
        >
          <Avatar name="María García" size="sm" />
          <span className="text-sm font-medium text-warm-700 hidden sm:inline">María</span>
        </Link>
      </div>
    </header>
  );
}

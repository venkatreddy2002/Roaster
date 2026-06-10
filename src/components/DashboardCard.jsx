import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * DashboardCard — Reusable bento-grid stat tile for the Member Dashboard.
 *
 * Props:
 *   icon        — React node (Lucide icon element)
 *   title       — Card heading string
 *   value       — Primary metric string or number
 *   subtitle    — Small descriptive text below the value
 *   trend       — "up" | "down" | "neutral" (optional)
 *   trendLabel  — e.g. "+12% this month" (optional)
 *   accent      — Tailwind color key used for the icon bg: "gold" | "emerald" | "red" | "blue"
 *   children    — Optional slot for additional content below the header block
 *   className   — Additional classes to apply to the wrapper
 */
export default function DashboardCard({
  icon,
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  accent = "gold",
  children,
  className = "",
}) {
  const accentMap = {
    gold:    "bg-brand-gold/10 border-brand-gold/20 text-brand-gold",
    emerald: "bg-emerald-950/30 border-emerald-800/30 text-emerald-400",
    red:     "bg-red-950/25 border-red-900/25 text-red-400",
    blue:    "bg-blue-950/25 border-blue-900/25 text-blue-400",
  };

  const trendIcon = {
    up:      <TrendingUp  className="w-3.5 h-3.5" />,
    down:    <TrendingDown className="w-3.5 h-3.5" />,
    neutral: <Minus       className="w-3.5 h-3.5" />,
  };

  const trendColor = {
    up:      "text-emerald-400",
    down:    "text-red-400",
    neutral: "text-neutral-500",
  };

  return (
    <div
      className={`rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden ${className}`}
    >
      {/* Subtle glow accent in top-right corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">{title}</p>
          <p className="text-3xl font-serif font-bold text-brand-cream leading-none">{value}</p>
          {subtitle && (
            <p className="text-xs text-brand-latte/65 leading-snug mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Icon bubble */}
        {icon && (
          <div
            className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${accentMap[accent] ?? accentMap.gold}`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Trend badge */}
      {trend && trendLabel && (
        <div
          className={`flex items-center space-x-1 mt-4 text-xs font-semibold ${trendColor[trend] ?? trendColor.neutral}`}
        >
          {trendIcon[trend]}
          <span>{trendLabel}</span>
        </div>
      )}

      {/* Optional children slot (charts, progress bars, etc.) */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

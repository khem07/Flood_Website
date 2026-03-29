'use client';
import React, { useState } from 'react';
import { AlertTriangle, X, Info } from 'lucide-react';

const WARNING_LEVELS = {
  EXTREME: {
    label: 'EXTREME DANGER',
    color: '#4b5563',
    bg: 'rgba(75,85,99,0.08)',
    border: 'rgba(75,85,99,0.35)',
    icon: AlertTriangle,
    pulse: true,
  },
  DANGER: {
    label: 'DANGER',
    color: '#4b5563',
    bg: 'rgba(75,85,99,0.08)',
    border: 'rgba(75,85,99,0.35)',
    icon: AlertTriangle,
    pulse: true,
  },
  WARNING: {
    label: 'FLOOD WARNING',
    color: '#6b7280',
    bg: 'rgba(107,114,128,0.08)',
    border: 'rgba(107,114,128,0.35)',
    icon: AlertTriangle,
    pulse: false,
  },
  WATCH: {
    label: 'FLOOD WATCH',
    color: '#9ca3af',
    bg: 'rgba(156,163,175,0.06)',
    border: 'rgba(156,163,175,0.25)',
    icon: Info,
    pulse: false,
  },
};

// Backend integration point: fetch current warning level from flood monitoring API
const CURRENT_WARNING = {
  level: 'WARNING' as keyof typeof WARNING_LEVELS,
  message:
    'All three models predict discharge exceeding 4,500 m³/s by Day 3–4. Downstream communities in Rajapur and Chisapani floodplain advised to prepare for possible inundation.',
  issuedAt: '27 Mar 2026, 06:00 NPT',
  validUntil: '03 Apr 2026, 06:00 NPT',
  peakDay: 'Day 4 (30 Mar 2026)',
  peakDischarge: '5,847 m³/s (Transformer model)',
  affectedDistricts: ['Bardiya', 'Surkhet', 'Dailekh', 'Achham'],
};

export default function WarningBanner() {
  const [dismissed, setDismissed] = useState(false);
  const config = WARNING_LEVELS[CURRENT_WARNING.level];
  const IconComp = config.icon;

  if (dismissed) return null;

  return (
    <div
      className="rounded-xl border p-4 animate-fade-in"
      style={{
        background: config.bg,
        borderColor: config.border,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg"
          style={{ background: `${config.color}20` }}
        >
          <IconComp
            size={18}
            style={{ color: config.color }}
            className={config.pulse ? 'animate-pulse-warning' : ''}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[11px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded"
              style={{
                color: config.color,
                background: `${config.color}20`,
              }}
            >
              {config.label}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              Issued: {CURRENT_WARNING.issuedAt}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              Valid until: {CURRENT_WARNING.validUntil}
            </span>
          </div>

          <p className="mt-1.5 text-[13px] text-foreground leading-relaxed">
            {CURRENT_WARNING.message}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-4">
            <div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                Predicted Peak
              </span>
              <div
                className="text-[13px] font-semibold font-mono tabular-nums mt-0.5"
                style={{ color: config.color }}
              >
                {CURRENT_WARNING.peakDischarge}
              </div>
            </div>
            <div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                Peak Day
              </span>
              <div
                className="text-[13px] font-semibold font-mono mt-0.5"
                style={{ color: config.color }}
              >
                {CURRENT_WARNING.peakDay}
              </div>
            </div>
            <div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                Affected Districts
              </span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {CURRENT_WARNING.affectedDistricts.map((d) => (
                  <span
                    key={`district-${d}`}
                    className="text-[11px] font-mono px-1.5 py-0.5 rounded"
                    style={{
                      background: `${config.color}15`,
                      color: config.color,
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
          title="Dismiss warning banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
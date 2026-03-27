'use client';
import React, { useState } from 'react';
import { AlertTriangle, X, Info } from 'lucide-react';

const WARNING_LEVELS = {
  EXTREME: {
    label: 'EXTREME DANGER',
    color: 'hsl(0,84%,60%)',
    bg: 'hsl(0,84%,60%,0.08)',
    border: 'hsl(0,84%,60%,0.35)',
    icon: AlertTriangle,
    pulse: true,
  },
  DANGER: {
    label: 'DANGER',
    color: 'hsl(0,84%,60%)',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.35)',
    icon: AlertTriangle,
    pulse: true,
  },
  WARNING: {
    label: 'FLOOD WARNING',
    color: 'hsl(38,92%,50%)',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.35)',
    icon: AlertTriangle,
    pulse: false,
  },
  WATCH: {
    label: 'FLOOD WATCH',
    color: 'hsl(38,92%,65%)',
    bg: 'rgba(251,191,36,0.06)',
    border: 'rgba(251,191,36,0.25)',
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
            <span className="text-[11px] font-mono text-[hsl(215,20%,55%)]">
              Issued: {CURRENT_WARNING.issuedAt}
            </span>
            <span className="text-[11px] font-mono text-[hsl(215,20%,55%)]">
              Valid until: {CURRENT_WARNING.validUntil}
            </span>
          </div>

          <p className="mt-1.5 text-[13px] text-[hsl(210,40%,88%)] leading-relaxed">
            {CURRENT_WARNING.message}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-4">
            <div>
              <span className="text-[11px] text-[hsl(215,20%,55%)] uppercase tracking-wider font-mono">
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
              <span className="text-[11px] text-[hsl(215,20%,55%)] uppercase tracking-wider font-mono">
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
              <span className="text-[11px] text-[hsl(215,20%,55%)] uppercase tracking-wider font-mono">
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
          className="flex-shrink-0 p-1 rounded-md text-[hsl(215,20%,55%)] hover:text-[hsl(210,40%,96%)] hover:bg-[hsl(217,32%,17%)] transition-all duration-150"
          title="Dismiss warning banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
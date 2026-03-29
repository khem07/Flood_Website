'use client';
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Brush,  } from 'recharts';
import { TrendingUp, Info, Eye, EyeOff } from 'lucide-react';

// Backend integration point: fetch 7-day forecast from model prediction API
const forecastData = [
  { day: 'Jan 01', date: 'Day 0', rf: 0.198, transformer: 0.002, tcn: 0.007, observed: null },
  { day: 'Jan 02', date: 'Day 1', rf: 0.234, transformer: 0.002, tcn: 0.006, observed: null },
  { day: 'Jan 03', date: 'Day 2', rf: 0.266, transformer: 0.002, tcn: 0.006, observed: null },
  { day: 'Jan 04', date: 'Day 3', rf: 0.288, transformer: 0.002, tcn: 0.006, observed: null },
  { day: 'Jan 05', date: 'Day 4', rf: 0.307, transformer: 0.002, tcn: 0.005, observed: null },
  { day: 'Jan 06', date: 'Day 5', rf: 0.324, transformer: 0.002, tcn: 0.006, observed: null },
  { day: 'Jan 07', date: 'Day 6', rf: 0.334, transformer: 0.002, tcn: 0.006, observed: null },
  
];

const THRESHOLDS = {
  watch: 0.3,
  warning: 0.45,
  danger: 0.6,
  extreme: 0.7,
};

const MODEL_COLORS = {
  rf: '#9ca3af',
  transformer: '#6b7280',
  tcn: '#4b5563',
  observed: '#a1aab8',
};

const MODEL_LABELS = {
  rf: 'Random Forest',
  transformer: 'Transformer',
  tcn: 'TCN',
  observed: 'Observed',
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-2xl min-w-[200px]">
      <p className="text-[12px] font-mono text-muted-foreground mb-2 border-b border-border pb-2">
        {label}
      </p>
      {payload.map((entry) => (
        <div
          key={`tooltip-${entry.name}`}
          className="flex items-center justify-between gap-4 mb-1"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: entry.color }}
            />
            <span className="text-[11px] text-muted-foreground">
              {MODEL_LABELS[entry.name as keyof typeof MODEL_LABELS] || entry.name}
            </span>
          </div>
          <span className="text-[12px] font-mono font-semibold tabular-nums text-foreground">
            {entry.value != null ? `${entry.value.toLocaleString()} ` : '—'}
          </span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t border-border">
        {payload[0]?.value > THRESHOLDS.danger ? (
          <span className="text-[10px] font-mono text-destructive">⚠ Above danger threshold</span>
        ) : payload[0]?.value > THRESHOLDS.warning ? (
          <span className="text-[10px] font-mono text-warning">⚠ Above warning threshold</span>
        ) : payload[0]?.value > THRESHOLDS.watch ? (
          <span className="text-[10px] font-mono text-warning">Watch threshold exceeded</span>
        ) : (
          <span className="text-[10px] font-mono text-success">Below watch threshold</span>
        )}
      </div>
    </div>
  );
}

export default function ForecastChart() {
  const [visibleModels, setVisibleModels] = useState({
    rf: true,
    transformer: true,
    tcn: true,
    observed: true,
  });

  const toggleModel = (model: keyof typeof visibleModels) => {
    setVisibleModels((prev) => ({ ...prev, [model]: !prev[model] }));
  };

  return (
    <div
      id="forecast"
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-primary" />
            <h2 className="text-[15px] font-semibold text-foreground">
              7-Day Flood Forecast
            </h2>
          </div>
          {/* <p className="text-[12px] text-muted-foreground">
            Karnali River at Chisapani · 28 Mar – 03 Apr 2026 · Discharge in m³/s
          </p> */}
        </div>

        {/* Model toggle buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {(Object.keys(visibleModels) as Array<keyof typeof visibleModels>).map((model) => (
            <button
              key={`toggle-${model}`}
              onClick={() => toggleModel(model)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all duration-150 ${
                visibleModels[model]
                  ? 'opacity-100' :'opacity-40'
              }`}
              style={{
                borderColor: `${MODEL_COLORS[model]}40`,
                background: visibleModels[model]
                  ? `${MODEL_COLORS[model]}15`
                  : 'transparent',
                color: MODEL_COLORS[model],
              }}
            >
              {visibleModels[model] ? <Eye size={11} /> : <EyeOff size={11} />}
              {MODEL_LABELS[model]}
            </button>
          ))}
        </div>
      </div>

      {/* Threshold legend */}
      {/* <div className="flex flex-wrap gap-3 mb-4">
        {[
          { label: 'Watch (3,000)', color: '#e5e7eb' },
          { label: 'Warning (4,000)', color: '#d1d5db' },
          { label: 'Danger (5,000)', color: '#9ca3af' },
          { label: 'Extreme (6,500)', color: '#6b7280' },
        ].map((t) => (
          <div key={`thresh-${t.label}`} className="flex items-center gap-1.5">
            <div
              className="w-6 h-0.5 border-t-2 border-dashed"
              style={{ borderColor: t.color }}
            />
            <span className="text-[10px] font-mono" style={{ color: t.color }}>
              {t.label} m³/s
            </span>
          </div>
        ))}
      </div> */}

      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={forecastData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="rfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#9ca3af" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="transformerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6b7280" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6b7280" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="tcnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4b5563" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4b5563" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="obsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a1aab8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a1aab8" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
          <XAxis
            dataKey="day"
            tick={{ fill: 'hsl(var(--color-muted-foreground))', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
            axisLine={{ stroke: 'hsl(var(--color-border))' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--color-muted-foreground))', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v)}`}
            domain={[0, 0.5]}
          />
          <Tooltip content={<CustomTooltip />} />

          <ReferenceLine
            y={THRESHOLDS.watch}
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            strokeOpacity={0.7}
          />
          <ReferenceLine
            y={THRESHOLDS.warning}
            stroke="#d1d5db"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            strokeOpacity={0.7}
          />
          <ReferenceLine
            y={THRESHOLDS.danger}
            stroke="#9ca3af"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            strokeOpacity={0.8}
          />
          <ReferenceLine
            y={THRESHOLDS.extreme}
            stroke="#6b7280"
            strokeDasharray="4 4"
            strokeWidth={1}
            strokeOpacity={0.5}
          />

          {visibleModels.observed && (
            <Area
              type="monotone"
              dataKey="observed"
              stroke="#a1aab8"
              strokeWidth={2.5}
              fill="url(#obsGrad)"
              dot={{ fill: '#a1aab8', r: 4, strokeWidth: 0 }}
              connectNulls={false}
            />
          )}
          {visibleModels.rf && (
            <Area
              type="monotone"
              dataKey="rf"
              stroke="#9ca3af"
              strokeWidth={2}
              fill="url(#rfGrad)"
              strokeDasharray="6 3"
              dot={false}
            />
          )}
          {visibleModels.transformer && (
            <Area
              type="monotone"
              dataKey="transformer"
              stroke="#6b7280"
              strokeWidth={2}
              fill="url(#transformerGrad)"
              dot={false}
            />
          )}
          {visibleModels.tcn && (
            <Area
              type="monotone"
              dataKey="tcn"
              stroke="#4b5563"
              strokeWidth={2}
              fill="url(#tcnGrad)"
              strokeDasharray="3 3"
              dot={false}
            />
          )}

          <Brush
            dataKey="day"
            height={24}
            stroke="hsl(var(--color-border))"
            fill="hsl(var(--color-card))"
            travellerWidth={6}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Info size={11} />
        <span className="font-mono">
          Day 0 shows current observed discharge. Forecast begins Day 1. Transformer model predicts highest peak on Day 4.
        </span>
      </div>
    </div>
  );
}
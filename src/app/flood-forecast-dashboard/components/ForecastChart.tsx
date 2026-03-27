'use client';
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Brush,  } from 'recharts';
import { TrendingUp, Info, Eye, EyeOff } from 'lucide-react';

// Backend integration point: fetch 7-day forecast from model prediction API
const forecastData = [
  { day: 'Mar 27', date: 'Day 0', rf: 3241, transformer: 3241, tcn: 3241, observed: 3241 },
  { day: 'Mar 28', date: 'Day 1', rf: 3680, transformer: 3720, tcn: 3655, observed: null },
  { day: 'Mar 29', date: 'Day 2', rf: 4120, transformer: 4280, tcn: 4050, observed: null },
  { day: 'Mar 30', date: 'Day 3', rf: 4850, transformer: 5100, tcn: 4780, observed: null },
  { day: 'Mar 31', date: 'Day 4', rf: 5340, transformer: 5847, tcn: 5210, observed: null },
  { day: 'Apr 01', date: 'Day 5', rf: 5120, transformer: 5480, tcn: 4990, observed: null },
  { day: 'Apr 02', date: 'Day 6', rf: 4540, transformer: 4820, tcn: 4410, observed: null },
  { day: 'Apr 03', date: 'Day 7', rf: 3890, transformer: 4050, tcn: 3760, observed: null },
];

const THRESHOLDS = {
  watch: 3000,
  warning: 4000,
  danger: 5000,
  extreme: 6500,
};

const MODEL_COLORS = {
  rf: '#38bdf8',
  transformer: '#f59e0b',
  tcn: '#a78bfa',
  observed: '#34d399',
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
    <div className="bg-[hsl(222,40%,10%)] border border-[hsl(217,32%,22%)] rounded-xl p-3 shadow-2xl min-w-[200px]">
      <p className="text-[12px] font-mono text-[hsl(215,20%,55%)] mb-2 border-b border-[hsl(217,32%,17%)] pb-2">
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
            <span className="text-[11px] text-[hsl(215,20%,65%)]">
              {MODEL_LABELS[entry.name as keyof typeof MODEL_LABELS] || entry.name}
            </span>
          </div>
          <span className="text-[12px] font-mono font-semibold tabular-nums text-[hsl(210,40%,92%)]">
            {entry.value != null ? `${entry.value.toLocaleString()} m³/s` : '—'}
          </span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t border-[hsl(217,32%,17%)]">
        {payload[0]?.value > THRESHOLDS.danger ? (
          <span className="text-[10px] font-mono text-[hsl(0,84%,60%)]">⚠ Above danger threshold</span>
        ) : payload[0]?.value > THRESHOLDS.warning ? (
          <span className="text-[10px] font-mono text-[hsl(38,92%,55%)]">⚠ Above warning threshold</span>
        ) : payload[0]?.value > THRESHOLDS.watch ? (
          <span className="text-[10px] font-mono text-[hsl(38,92%,65%)]">Watch threshold exceeded</span>
        ) : (
          <span className="text-[10px] font-mono text-[hsl(142,71%,55%)]">Below watch threshold</span>
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
      className="rounded-xl border border-[hsl(217,32%,17%)] bg-[hsl(222,40%,9%)] p-5"
    >
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-[hsl(199,89%,48%)]" />
            <h2 className="text-[15px] font-semibold text-[hsl(210,40%,96%)]">
              7-Day Flood Discharge Forecast
            </h2>
          </div>
          <p className="text-[12px] text-[hsl(215,20%,55%)]">
            Karnali River at Chisapani · 28 Mar – 03 Apr 2026 · Discharge in m³/s
          </p>
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
          { label: 'Watch (3,000)', color: '#fbbf24' },
          { label: 'Warning (4,000)', color: '#f97316' },
          { label: 'Danger (5,000)', color: '#ef4444' },
          { label: 'Extreme (6,500)', color: '#dc2626' },
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
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="transformerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="tcnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="obsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217,32%,17%)" />
          <XAxis
            dataKey="day"
            tick={{ fill: 'hsl(215,20%,55%)', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
            axisLine={{ stroke: 'hsl(217,32%,22%)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'hsl(215,20%,55%)', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            domain={[0, 7500]}
          />
          <Tooltip content={<CustomTooltip />} />

          <ReferenceLine
            y={THRESHOLDS.watch}
            stroke="#fbbf24"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            strokeOpacity={0.7}
          />
          <ReferenceLine
            y={THRESHOLDS.warning}
            stroke="#f97316"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            strokeOpacity={0.7}
          />
          <ReferenceLine
            y={THRESHOLDS.danger}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            strokeOpacity={0.8}
          />
          <ReferenceLine
            y={THRESHOLDS.extreme}
            stroke="#dc2626"
            strokeDasharray="4 4"
            strokeWidth={1}
            strokeOpacity={0.5}
          />

          {visibleModels.observed && (
            <Area
              type="monotone"
              dataKey="observed"
              stroke="#34d399"
              strokeWidth={2.5}
              fill="url(#obsGrad)"
              dot={{ fill: '#34d399', r: 4, strokeWidth: 0 }}
              connectNulls={false}
            />
          )}
          {visibleModels.rf && (
            <Area
              type="monotone"
              dataKey="rf"
              stroke="#38bdf8"
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
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#transformerGrad)"
              dot={false}
            />
          )}
          {visibleModels.tcn && (
            <Area
              type="monotone"
              dataKey="tcn"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#tcnGrad)"
              strokeDasharray="3 3"
              dot={false}
            />
          )}

          <Brush
            dataKey="day"
            height={24}
            stroke="hsl(217,32%,22%)"
            fill="hsl(222,40%,9%)"
            travellerWidth={6}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[hsl(215,20%,45%)]">
        <Info size={11} />
        <span className="font-mono">
          Day 0 shows current observed discharge. Forecast begins Day 1. Transformer model predicts highest peak on Day 4.
        </span>
      </div>
    </div>
  );
}
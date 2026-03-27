'use client';
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,  } from 'recharts';
import { Crosshair } from 'lucide-react';

// Backend integration point: fetch scatter data from model residuals API
const generateScatterData = (
  scale: number,
  noise: number,
  bias: number,
  count: number,
  seed: number
) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const base = 500 + (i / count) * scale;
    const obs = base + (((seed * (i + 1) * 7919) % 1000) / 1000 - 0.5) * noise;
    const pred = obs * (1 + bias / 100) + (((seed * (i + 7) * 6271) % 1000) / 1000 - 0.5) * noise * 0.8;
    data.push({ observed: Math.max(200, Math.round(obs)), predicted: Math.max(200, Math.round(pred)) });
  }
  return data;
};

const scatterDataByModel = {
  rf: generateScatterData(9000, 1800, -2.4, 80, 42),
  transformer: generateScatterData(9000, 1200, 1.8, 80, 17),
  tcn: generateScatterData(9000, 1400, -1.1, 80, 93),
};

const MODEL_COLORS: Record<string, string> = {
  rf: '#38bdf8',
  transformer: '#f59e0b',
  tcn: '#a78bfa',
};

const MODEL_LABELS: Record<string, string> = {
  rf: 'Random Forest',
  transformer: 'Transformer',
  tcn: 'TCN',
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { observed: number; predicted: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  const err = Math.abs(d.predicted - d.observed);
  const pctErr = ((err / d.observed) * 100).toFixed(1);
  return (
    <div className="bg-[hsl(222,40%,10%)] border border-[hsl(217,32%,22%)] rounded-xl p-3 shadow-2xl">
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-[11px] text-[hsl(215,20%,55%)]">Observed</span>
          <span className="text-[12px] font-mono tabular-nums text-[hsl(142,71%,55%)]">{d.observed.toLocaleString()} m³/s</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[11px] text-[hsl(215,20%,55%)]">Predicted</span>
          <span className="text-[12px] font-mono tabular-nums text-[hsl(199,89%,58%)]">{d.predicted.toLocaleString()} m³/s</span>
        </div>
        <div className="flex justify-between gap-4 pt-1 border-t border-[hsl(217,32%,17%)]">
          <span className="text-[11px] text-[hsl(215,20%,55%)]">Error</span>
          <span className="text-[11px] font-mono tabular-nums text-[hsl(215,20%,65%)]">{err.toLocaleString()} m³/s ({pctErr}%)</span>
        </div>
      </div>
    </div>
  );
}

export default function ScatterPlotChart() {
  const [activeModel, setActiveModel] = useState<keyof typeof scatterDataByModel>('transformer');

  return (
    <div className="rounded-xl border border-[hsl(217,32%,17%)] bg-[hsl(222,40%,9%)] p-5">
      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crosshair size={15} className="text-[hsl(199,89%,48%)]" />
            <h3 className="text-[14px] font-semibold text-[hsl(210,40%,96%)]">
              Scatter Plot — Obs vs Pred
            </h3>
          </div>
          <p className="text-[11px] text-[hsl(215,20%,55%)] font-mono">
            Validation period 2023–2025 · Points on 1:1 line = perfect forecast
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[hsl(217,32%,11%)] rounded-lg p-1 border border-[hsl(217,32%,17%)]">
          {(Object.keys(scatterDataByModel) as Array<keyof typeof scatterDataByModel>).map((key) => (
            <button
              key={`scatter-tab-${key}`}
              onClick={() => setActiveModel(key)}
              className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition-all duration-150"
              style={
                activeModel === key
                  ? {
                      background: `${MODEL_COLORS[key]}20`,
                      color: MODEL_COLORS[key],
                      border: `1px solid ${MODEL_COLORS[key]}40`,
                    }
                  : {
                      color: 'hsl(215,20%,55%)',
                    }
              }
            >
              {MODEL_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217,32%,16%)" />
          <XAxis
            dataKey="observed"
            name="Observed"
            type="number"
            domain={[0, 12000]}
            tick={{ fill: 'hsl(215,20%,50%)', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            label={{
              value: 'Observed (m³/s)',
              position: 'insideBottom',
              offset: -5,
              fill: 'hsl(215,20%,45%)',
              fontSize: 10,
            }}
          />
          <YAxis
            dataKey="predicted"
            name="Predicted"
            type="number"
            domain={[0, 12000]}
            tick={{ fill: 'hsl(215,20%,50%)', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            label={{
              value: 'Predicted (m³/s)',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              fill: 'hsl(215,20%,45%)',
              fontSize: 10,
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          {/* 1:1 perfect line */}
          <ReferenceLine
            segment={[{ x: 0, y: 0 }, { x: 12000, y: 12000 }]}
            stroke="hsl(215,20%,35%)"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{
              value: '1:1',
              position: 'insideTopLeft',
              fill: 'hsl(215,20%,45%)',
              fontSize: 10,
            }}
          />
          <Scatter
            data={scatterDataByModel[activeModel]}
            fill={MODEL_COLORS[activeModel]}
            fillOpacity={0.55}
            r={3}
          />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          {
            label: 'Weighted F1',
            value: activeModel === 'rf' ? '0.8569' : activeModel === 'transformer' ? '0.8396' : '0.8642',
          },
          {
            label: 'Accuracy',
            value: activeModel === 'rf' ? '0.8569' : activeModel === 'transformer' ? '0.8405' : '0.8652',
          },
          {
            label: 'MCC',
            value: activeModel === 'rf' ? '0.8094' : activeModel === 'transformer' ? '0.7877' : '0.8204',
          },
        ].map((s) => (
          <div key={`scatter-stat-${s.label}`} className="text-center p-2 rounded-lg bg-[hsl(217,32%,11%)] border border-[hsl(217,32%,17%)]">
            <div
              className="text-[14px] font-mono font-bold tabular-nums"
              style={{ color: MODEL_COLORS[activeModel] }}
            >
              {s.value}
            </div>
            <div className="text-[10px] text-[hsl(215,20%,50%)] mt-0.5 font-mono">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
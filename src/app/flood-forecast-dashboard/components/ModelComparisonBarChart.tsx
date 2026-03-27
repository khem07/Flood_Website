'use client';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

// Real performance metrics from research results
const metricsData = {
  weightedF1: [
    { model: 'Random Forest', value: 0.8569, ciLower: 0.8471, ciUpper: 0.8667, color: '#38bdf8' },
    { model: 'Transformer',   value: 0.8396, ciLower: 0.8291, ciUpper: 0.8510, color: '#f59e0b' },
    { model: 'TCN',           value: 0.8642, ciLower: 0.8537, ciUpper: 0.8746, color: '#a78bfa' },
  ],
  accuracy: [
    { model: 'Random Forest', value: 0.8569, ciLower: 0.8465, ciUpper: 0.8673, color: '#38bdf8' },
    { model: 'Transformer',   value: 0.8405, ciLower: 0.8299, ciUpper: 0.8518, color: '#f59e0b' },
    { model: 'TCN',           value: 0.8652, ciLower: 0.8558, ciUpper: 0.8750, color: '#a78bfa' },
  ],
  mcc: [
    { model: 'Random Forest', value: 0.8094, ciLower: 0.7951, ciUpper: 0.8233, color: '#38bdf8' },
    { model: 'Transformer',   value: 0.7877, ciLower: 0.7738, ciUpper: 0.8019, color: '#f59e0b' },
    { model: 'TCN',           value: 0.8204, ciLower: 0.8066, ciUpper: 0.8343, color: '#a78bfa' },
  ],
  meanF1: [
    { model: 'Random Forest', value: 0.8570, ciLower: 0.8292, ciUpper: 0.8848, color: '#38bdf8' },
    { model: 'Transformer',   value: 0.8410, ciLower: 0.7720, ciUpper: 0.9100, color: '#f59e0b' },
    { model: 'TCN',           value: 0.8652, ciLower: 0.7794, ciUpper: 0.9510, color: '#a78bfa' },
  ],
};

type MetricKey = keyof typeof metricsData;

const metricMeta: Record<MetricKey, { label: string; description: string }> = {
  weightedF1: { label: 'Weighted F1', description: 'Weighted F1-Score with 95% bootstrap CI — higher is better' },
  accuracy:   { label: 'Accuracy',    description: 'Classification accuracy with 95% bootstrap CI — higher is better' },
  mcc:        { label: 'MCC',         description: 'Matthews Correlation Coefficient with 95% bootstrap CI — higher is better' },
  meanF1:     { label: 'Mean F1 CV',  description: '5-fold CV mean F1-Score (±Std shown as error bars) — higher is better' },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { model: string; color: string; ciLower: number; ciUpper: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  return (
    <div className="bg-[hsl(222,40%,10%)] border border-[hsl(217,32%,22%)] rounded-xl p-3 shadow-2xl">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: entry.payload.color }} />
        <span className="text-[12px] font-semibold text-[hsl(210,40%,92%)]">{entry.payload.model}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-[11px] text-[hsl(215,20%,55%)]">Value</span>
          <span className="text-[13px] font-mono font-bold tabular-nums" style={{ color: entry.payload.color }}>
            {entry.value.toFixed(4)}
          </span>
        </div>
        {entry.payload.ciLower !== undefined && (
          <div className="flex justify-between gap-4">
            <span className="text-[11px] text-[hsl(215,20%,55%)]">95% CI</span>
            <span className="text-[11px] font-mono tabular-nums text-[hsl(142,71%,55%)]">
              [{entry.payload.ciLower.toFixed(4)}, {entry.payload.ciUpper.toFixed(4)}]
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ModelComparisonBarChart() {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('weightedF1');

  const currentData = metricsData[activeMetric];
  const meta = metricMeta[activeMetric];

  const bestModel = currentData.reduce((a, b) => (a.value > b.value ? a : b));

  return (
    <div className="rounded-xl border border-[hsl(217,32%,17%)] bg-[hsl(222,40%,9%)] p-5">
      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={15} className="text-[hsl(199,89%,48%)]" />
            <h3 className="text-[14px] font-semibold text-[hsl(210,40%,96%)]">
              Model Performance Comparison
            </h3>
          </div>
          <p className="text-[11px] text-[hsl(215,20%,55%)] font-mono">{meta.description}</p>
        </div>

        <div className="flex items-center gap-1 bg-[hsl(217,32%,11%)] rounded-lg p-1 border border-[hsl(217,32%,17%)]">
          {(Object.keys(metricsData) as MetricKey[]).map((key) => (
            <button
              key={`metric-tab-${key}`}
              onClick={() => setActiveMetric(key)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition-all duration-150 ${
                activeMetric === key
                  ? 'bg-[hsl(199,89%,48%)]/20 text-[hsl(199,89%,58%)] border border-[hsl(199,89%,48%)]/30'
                  : 'text-[hsl(215,20%,55%)] hover:text-[hsl(210,40%,80%)]'
              }`}
            >
              {metricMeta[key].label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={52}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217,32%,16%)" vertical={false} />
          <XAxis
            dataKey="model"
            tick={{ fill: 'hsl(215,20%,55%)', fontSize: 11, fontFamily: 'IBM Plex Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0.75, 0.90]}
            tick={{ fill: 'hsl(215,20%,50%)', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v.toFixed(2)}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(217,32%,17%)', radius: 4 }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {currentData.map((entry) => (
              <Cell key={`bar-cell-${entry.model}`} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* CI summary row */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {currentData.map((d) => (
          <div key={d.model} className="p-2 rounded-lg bg-[hsl(217,32%,11%)] border border-[hsl(217,32%,17%)] text-center">
            <div className="text-[13px] font-mono font-bold tabular-nums" style={{ color: d.color }}>
              {d.value.toFixed(4)}
            </div>
            <div className="text-[9px] font-mono text-[hsl(215,20%,50%)] mt-0.5">
              [{d.ciLower.toFixed(3)}, {d.ciUpper.toFixed(3)}]
            </div>
            <div className="text-[10px] font-mono text-[hsl(215,20%,55%)] mt-0.5 truncate">{d.model}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsl(217,32%,11%)] border border-[hsl(217,32%,17%)]">
          <span className="text-[11px] text-[hsl(215,20%,55%)] font-mono">Best model:</span>
          <span className="text-[11px] font-mono font-semibold text-[hsl(142,71%,55%)]">
            {bestModel.model}
          </span>
          <span className="text-[11px] font-mono text-[hsl(215,20%,45%)]">
            ({bestModel.value.toFixed(4)})
          </span>
        </div>
      </div>
    </div>
  );
}
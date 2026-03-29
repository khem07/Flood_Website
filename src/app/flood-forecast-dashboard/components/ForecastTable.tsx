'use client';
import React, { useState } from 'react';
import { Table2 } from 'lucide-react';

// Actual 7-day flood probability forecast from research results
const forecastRows = [
  {
    id: 'frow-1',
    leadDay: 'Day 1',
    rf:          { prob: 0.198, ciLower: 0.130, ciUpper: 0.266, riskLevel: 'No Risk' },
    transformer: { prob: 0.002, ciLower: 0.002, ciUpper: 0.002, riskLevel: 'No Risk' },
    tcn:         { prob: 0.007, ciLower: 0.006, ciUpper: 0.007, riskLevel: 'No Risk' },
  },
  {
    id: 'frow-2',
    leadDay: 'Day 2',
    rf:          { prob: 0.234, ciLower: 0.161, ciUpper: 0.307, riskLevel: 'No Risk' },
    transformer: { prob: 0.002, ciLower: 0.002, ciUpper: 0.002, riskLevel: 'No Risk' },
    tcn:         { prob: 0.006, ciLower: 0.005, ciUpper: 0.007, riskLevel: 'No Risk' },
  },
  {
    id: 'frow-3',
    leadDay: 'Day 3',
    rf:          { prob: 0.266, ciLower: 0.184, ciUpper: 0.347, riskLevel: 'No Risk' },
    transformer: { prob: 0.002, ciLower: 0.002, ciUpper: 0.002, riskLevel: 'No Risk' },
    tcn:         { prob: 0.006, ciLower: 0.004, ciUpper: 0.008, riskLevel: 'No Risk' },
  },
  {
    id: 'frow-4',
    leadDay: 'Day 4',
    rf:          { prob: 0.288, ciLower: 0.204, ciUpper: 0.372, riskLevel: 'No Risk' },
    transformer: { prob: 0.002, ciLower: 0.001, ciUpper: 0.002, riskLevel: 'No Risk' },
    tcn:         { prob: 0.006, ciLower: 0.003, ciUpper: 0.008, riskLevel: 'No Risk' },
  },
  {
    id: 'frow-5',
    leadDay: 'Day 5',
    rf:          { prob: 0.307, ciLower: 0.224, ciUpper: 0.393, riskLevel: 'No Risk' },
    transformer: { prob: 0.002, ciLower: 0.001, ciUpper: 0.002, riskLevel: 'No Risk' },
    tcn:         { prob: 0.005, ciLower: 0.002, ciUpper: 0.008, riskLevel: 'No Risk' },
  },
  {
    id: 'frow-6',
    leadDay: 'Day 6',
    rf:          { prob: 0.324, ciLower: 0.245, ciUpper: 0.403, riskLevel: 'No Risk' },
    transformer: { prob: 0.002, ciLower: 0.001, ciUpper: 0.002, riskLevel: 'No Risk' },
    tcn:         { prob: 0.006, ciLower: 0.002, ciUpper: 0.009, riskLevel: 'No Risk' },
  },
  {
    id: 'frow-7',
    leadDay: 'Day 7',
    rf:          { prob: 0.334, ciLower: 0.247, ciUpper: 0.421, riskLevel: 'No Risk' },
    transformer: { prob: 0.002, ciLower: 0.001, ciUpper: 0.002, riskLevel: 'No Risk' },
    tcn:         { prob: 0.006, ciLower: 0.000, ciUpper: 0.013, riskLevel: 'No Risk' },
  },
];

type ModelKey = 'rf' | 'transformer' | 'tcn';

const MODEL_META: Record<ModelKey, { label: string; color: string }> = {
  rf:          { label: 'Random Forest', color: '#4b5563' },
  transformer: { label: 'Transformer',   color: '#4b5563' },
  tcn:         { label: 'TCN',           color: '#4b5563' },
};

function ProbBar({ value, color }: { value: number; color: string }) {
  const pct = Math.min(value * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-muted/10 overflow-hidden min-w-[40px]">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, background: color, opacity: 0.75 }}
        />
      </div>
    </div>
  );
}

export default function ForecastTable() {
  const [activeModel, setActiveModel] = useState<ModelKey>('rf');

  const modelData = MODEL_META[activeModel];

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Table2 size={15} className="text-primary" />
            <h3 className="text-[14px] font-semibold text-foreground">
              7-Day Flood Probability Forecast
            </h3>
          </div>
          <p className="text-[11px] text-muted-foreground font-mono">
            Flood probability with 95% confidence intervals · All lead days: No Risk
          </p>
        </div>

        {/* Model selector */}
        <div className="flex items-center gap-1 bg-muted/20 rounded-lg p-1 border border-border">
          {(Object.keys(MODEL_META) as ModelKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveModel(key)}
              className="px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-150"
              style={
                activeModel === key
                  ? { background: `${MODEL_META[key].color}20`, color: MODEL_META[key].color, border: `1px solid ${MODEL_META[key].color}40` }
                  : { color: 'hsl(var(--color-muted-foreground))', border: '1px solid transparent' }
              }
            >
              {MODEL_META[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[12px] min-w-[480px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 pr-4 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Lead Day
              </th>
              <th className="text-right py-2.5 px-3 text-[10px] font-mono uppercase tracking-wider" style={{ color: modelData.color }}>
                Flood Probability
              </th>
              <th className="text-right py-2.5 px-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                CI Lower
              </th>
              <th className="text-right py-2.5 px-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                CI Upper
              </th>
              <th className="py-2.5 px-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Probability Bar
              </th>
            </tr>
          </thead>
          <tbody>
            {forecastRows.map((row) => {
              const m = row[activeModel];
              return (
                <tr
                  key={row.id}
                  className="border-b border-muted/20 hover:bg-muted/20 transition-colors duration-100"
                >
                  <td className="py-3 pr-4">
                    <span className="font-mono font-medium text-card-foreground text-[12px]">
                      {row.leadDay}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-mono tabular-nums text-[12px]" style={{ color: modelData.color }}>
                      {m.prob.toFixed(3)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-mono tabular-nums text-[12px] text-muted-foreground">
                      {m.ciLower.toFixed(3)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-mono tabular-nums text-[12px] text-muted-foreground">
                      {m.ciUpper.toFixed(3)}
                    </span>
                  </td>
                  <td className="py-3 px-3 w-32">
                    <ProbBar value={m.prob} color={modelData.color} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* All-model summary */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {(Object.keys(MODEL_META) as ModelKey[]).map((key) => {
          const maxProb = Math.max(...forecastRows.map((r) => r[key].prob));
          const minProb = Math.min(...forecastRows.map((r) => r[key].prob));
          return (
            <div key={key} className="p-3 rounded-lg bg-muted/20 border border-border">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-sm" style={{ background: MODEL_META[key].color }} />
                <span className="text-[11px] font-mono font-medium" style={{ color: MODEL_META[key].color }}>
                  {MODEL_META[key].label}
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">Max Prob</span>
                  <span className="tabular-nums text-card-foreground">{maxProb.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">Min Prob</span>
                  <span className="tabular-nums text-card-foreground">{minProb.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">Risk</span>
                  <span className="text-success">No Risk</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
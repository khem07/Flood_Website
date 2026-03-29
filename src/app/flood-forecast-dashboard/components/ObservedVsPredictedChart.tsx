'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  } from 'recharts';
import { GitCompare, ChevronDown } from 'lucide-react';

// Backend integration point: fetch historical observed vs predicted from model validation API
const validationData2024 = [
  { date: 'Jun 01', observed: 1820, rf: 1750, transformer: 1890, tcn: 1780 },
  { date: 'Jun 08', observed: 2340, rf: 2280, transformer: 2410, tcn: 2300 },
  { date: 'Jun 15', observed: 3120, rf: 3050, transformer: 3190, tcn: 3080 },
  { date: 'Jun 22', observed: 3890, rf: 3820, transformer: 3960, tcn: 3840 },
  { date: 'Jun 29', observed: 4650, rf: 4520, transformer: 4780, tcn: 4600 },
  { date: 'Jul 06', observed: 5820, rf: 5640, transformer: 5910, tcn: 5780 },
  { date: 'Jul 13', observed: 7240, rf: 6980, transformer: 7380, tcn: 7100 },
  { date: 'Jul 20', observed: 8120, rf: 7840, transformer: 8290, tcn: 7980 },
  { date: 'Jul 27', observed: 7650, rf: 7410, transformer: 7820, tcn: 7590 },
  { date: 'Aug 03', observed: 6840, rf: 6620, transformer: 6980, tcn: 6790 },
  { date: 'Aug 10', observed: 5920, rf: 5740, transformer: 6050, tcn: 5870 },
  { date: 'Aug 17', observed: 4780, rf: 4620, transformer: 4890, tcn: 4740 },
  { date: 'Aug 24', observed: 3650, rf: 3520, transformer: 3720, tcn: 3610 },
  { date: 'Aug 31', observed: 2940, rf: 2840, transformer: 2990, tcn: 2900 },
  { date: 'Sep 07', observed: 2120, rf: 2060, transformer: 2180, tcn: 2100 },
  { date: 'Sep 14', observed: 1680, rf: 1640, transformer: 1720, tcn: 1660 },
];

const validationData2023 = [
  { date: 'Jun 01', observed: 1540, rf: 1480, transformer: 1610, tcn: 1510 },
  { date: 'Jun 08', observed: 2180, rf: 2090, transformer: 2240, tcn: 2150 },
  { date: 'Jun 15', observed: 3420, rf: 3280, transformer: 3510, tcn: 3380 },
  { date: 'Jun 22', observed: 4890, rf: 4720, transformer: 5010, tcn: 4840 },
  { date: 'Jun 29', observed: 6340, rf: 6120, transformer: 6490, tcn: 6280 },
  { date: 'Jul 06', observed: 8720, rf: 8410, transformer: 8910, tcn: 8640 },
  { date: 'Jul 13', observed: 11240, rf: 10820, transformer: 11490, tcn: 11080 },
  { date: 'Jul 20', observed: 9840, rf: 9480, transformer: 10050, tcn: 9720 },
  { date: 'Jul 27', observed: 7620, rf: 7340, transformer: 7790, tcn: 7540 },
  { date: 'Aug 03', observed: 5980, rf: 5760, transformer: 6110, tcn: 5910 },
  { date: 'Aug 10', observed: 4340, rf: 4180, transformer: 4440, tcn: 4300 },
  { date: 'Aug 17', observed: 3120, rf: 3010, transformer: 3190, tcn: 3090 },
  { date: 'Aug 24', observed: 2240, rf: 2160, transformer: 2300, tcn: 2210 },
  { date: 'Aug 31', observed: 1820, rf: 1760, transformer: 1870, tcn: 1800 },
  { date: 'Sep 07', observed: 1460, rf: 1410, transformer: 1500, tcn: 1450 },
  { date: 'Sep 14', observed: 1180, rf: 1140, transformer: 1210, tcn: 1170 },
];

const yearOptions = [
  { label: 'Monsoon 2024', value: '2024', data: validationData2024 },
  { label: 'Monsoon 2023', value: '2023', data: validationData2023 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-2xl">
      <p className="text-[11px] font-mono text-muted-foreground mb-2 pb-2 border-b border-border">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={`ovp-tt-${entry.name}`} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-[11px] text-muted-foreground capitalize">{entry.name}</span>
          </div>
          <span className="text-[12px] font-mono tabular-nums font-semibold text-foreground">
            {entry.value.toLocaleString()} m³/s
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ObservedVsPredictedChart() {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [showDropdown, setShowDropdown] = useState(false);

  const currentData = yearOptions.find((y) => y.value === selectedYear)?.data || validationData2024;
  const currentLabel = yearOptions.find((y) => y.value === selectedYear)?.label || 'Monsoon 2024';

  return (
    <div
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitCompare size={15} className="text-primary" />
            <h3 className="text-[14px] font-semibold text-foreground">
              Observed vs Predicted
            </h3>
          </div>
          <p className="text-[11px] text-muted-foreground font-mono">
            Historical validation · Chisapani gauge · Weekly aggregated
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-mono text-muted-foreground bg-muted/20 border border-border hover:border-border/80 transition-all duration-150"
          >
            {currentLabel}
            
          </button>
          
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={currentData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'hsl(var(--color-muted-foreground))', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--color-muted-foreground))', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="observed"
            stroke="#9ca3af"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#9ca3af', strokeWidth: 0 }}
            name="observed"
          />
          <Line
            type="monotone"
            dataKey="rf"
            stroke="#9ca3af"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={false}
            name="rf"
          />
          <Line
            type="monotone"
            dataKey="transformer"
            stroke="#6b7280"
            strokeWidth={1.5}
            dot={false}
            name="transformer"
          />
          <Line
            type="monotone"
            dataKey="tcn"
            stroke="#4b5563"
            strokeWidth={1.5}
            strokeDasharray="3 2"
            dot={false}
            name="tcn"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { model: 'Random Forest', r2: '0.891', bias: '-2.4%', color: '#9ca3af' },
          { model: 'Transformer', r2: '0.924', bias: '+1.8%', color: '#6b7280' },
          { model: 'TCN', r2: '0.908', bias: '-1.1%', color: '#4b5563' },
        ].map((m) => (
          <div
            key={`val-stat-${m.model}`}
            className="text-center p-2 rounded-lg bg-muted/20 border border-border"
          >
            <div
              className="text-[13px] font-mono font-semibold tabular-nums"
              style={{ color: m.color }}
            >
              R² = {m.r2}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{m.model}</div>
            <div className="text-[10px] font-mono text-muted-foreground">Bias: {m.bias}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
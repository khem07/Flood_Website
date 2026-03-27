'use client';
import React from 'react';
import { Waves, BarChart3, Calendar, ArrowUpRight, ArrowDownRight, Minus, Target, Activity, Zap } from 'lucide-react';

// KPI values derived from actual research results
const kpiData = [
  {
    id: 'kpi-best-f1',
    label: 'Best Weighted F1',
    value: '0.8642',
    unit: '',
    subValue: 'TCN · 95% CI [0.8537, 0.8746]',
    trend: 'up',
    trendValue: '+0.0246 vs Transformer',
    status: 'good',
    icon: Target,
    description: 'Highest weighted F1-score across all models (bootstrap CI)',
    threshold: 'RF: 0.8569 · TF: 0.8396 · TCN: 0.8642',
  },
  {
    id: 'kpi-best-accuracy',
    label: 'Best Accuracy',
    value: '0.8652',
    unit: '',
    subValue: 'TCN · 95% CI [0.8558, 0.8750]',
    trend: 'up',
    trendValue: '+0.0247 vs Transformer',
    status: 'good',
    icon: BarChart3,
    description: 'Highest classification accuracy across 5-fold CV (TCN model)',
    threshold: 'RF: 0.8570 · TF: 0.8405 · TCN: 0.8652',
  },
  {
    id: 'kpi-best-mcc',
    label: 'Best MCC',
    value: '0.8204',
    unit: '',
    subValue: 'TCN · 95% CI [0.8066, 0.8343]',
    trend: 'up',
    trendValue: '+0.0327 vs Transformer',
    status: 'good',
    icon: Activity,
    description: "Matthews Correlation Coefficient — balanced metric for all classes",
    threshold: 'RF: 0.8094 · TF: 0.7877 · TCN: 0.8204',
  },
  {
    id: 'kpi-forecast-horizon',
    label: 'Forecast Horizon',
    value: '7',
    unit: 'days',
    subValue: 'Day 1 – Day 7 lead time',
    trend: 'neutral',
    trendValue: 'All days: No Risk',
    status: 'info',
    icon: Calendar,
    description: 'Lead time window for all three ML model flood probability forecasts',
    threshold: 'Study period: 2009–2023 (15 years)',
  },
  {
    id: 'kpi-high-risk-f1',
    label: 'High Risk F1',
    value: '0.92',
    unit: '',
    subValue: 'RF & TCN · Support: 1085–1145',
    trend: 'up',
    trendValue: 'Best class performance',
    status: 'good',
    icon: Zap,
    description: 'F1-score for High Risk class — critical for flood early warning',
    threshold: 'RF: 0.92 · TF: 0.90 · TCN: 0.92',
  },
  {
    id: 'kpi-current-risk',
    label: 'Current Forecast Risk',
    value: 'No Risk',
    unit: '',
    subValue: 'All 3 models · All 7 days',
    trend: 'down',
    trendValue: 'RF max prob: 0.334',
    status: 'good',
    icon: Waves,
    description: 'Current 7-day flood risk classification from all three ML models',
    threshold: 'TCN max prob: 0.007 · TF max prob: 0.002',
  },
];

const statusConfig = {
  good: {
    bg: 'bg-[hsl(142,71%,45%)]/10',
    border: 'border-[hsl(142,71%,45%)]/20',
    badge: 'bg-[hsl(142,71%,45%)]/15 text-[hsl(142,71%,55%)]',
    value: 'text-[hsl(142,71%,55%)]',
  },
  warning: {
    bg: 'bg-[hsl(38,92%,50%)]/8',
    border: 'border-[hsl(38,92%,50%)]/25',
    badge: 'bg-[hsl(38,92%,50%)]/15 text-[hsl(38,92%,55%)]',
    value: 'text-[hsl(38,92%,55%)]',
  },
  watch: {
    bg: 'bg-[hsl(38,92%,50%)]/6',
    border: 'border-[hsl(38,92%,50%)]/20',
    badge: 'bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,65%)]',
    value: 'text-[hsl(38,92%,65%)]',
  },
  danger: {
    bg: 'bg-[hsl(0,84%,60%)]/8',
    border: 'border-[hsl(0,84%,60%)]/25',
    badge: 'bg-[hsl(0,84%,60%)]/15 text-[hsl(0,84%,65%)]',
    value: 'text-[hsl(0,84%,65%)]',
  },
  info: {
    bg: 'bg-[hsl(199,89%,48%)]/8',
    border: 'border-[hsl(199,89%,48%)]/20',
    badge: 'bg-[hsl(199,89%,48%)]/15 text-[hsl(199,89%,58%)]',
    value: 'text-[hsl(199,89%,58%)]',
  },
};

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
      {kpiData.map((kpi, i) => {
        const IconComp = kpi.icon;
        const cfg = statusConfig[kpi.status as keyof typeof statusConfig];
        const isFirst = i === 0;

        return (
          <div
            key={kpi.id}
            className={`
              rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01] cursor-default
              ${cfg.bg} ${cfg.border}
              ${isFirst ? 'sm:col-span-2 lg:col-span-1 2xl:col-span-2' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: 'hsl(217,32%,17%)' }}
              >
                <IconComp size={16} className="text-[hsl(215,20%,65%)]" />
              </div>
              <TrendBadge trend={kpi.trend} value={kpi.trendValue} />
            </div>

            <div className="mb-1">
              <div className="flex items-end gap-1">
                <span
                  className={`font-mono tabular-nums font-bold leading-none ${isFirst ? 'text-3xl' : 'text-2xl'} ${cfg.value}`}
                >
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[13px] text-[hsl(215,20%,55%)] mb-0.5 font-mono">
                    {kpi.unit}
                  </span>
                )}
              </div>
            </div>

            <p className="text-[12px] font-medium text-[hsl(210,40%,80%)] mb-0.5 leading-tight">
              {kpi.label}
            </p>
            <p className="text-[11px] text-[hsl(215,20%,55%)] font-mono leading-tight">
              {kpi.subValue}
            </p>

            <div className="mt-3 pt-3 border-t border-[hsl(217,32%,17%)]">
              <p className="text-[10px] text-[hsl(215,20%,45%)] leading-tight">
                {kpi.threshold}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TrendBadge({ trend, value }: { trend: string; value: string }) {
  if (trend === 'up') {
    return (
      <div className="flex items-center gap-0.5 text-[10px] font-mono text-[hsl(38,92%,55%)]">
        <ArrowUpRight size={12} />
        <span className="hidden xl:inline truncate max-w-[80px]">{value}</span>
      </div>
    );
  }
  if (trend === 'down') {
    return (
      <div className="flex items-center gap-0.5 text-[10px] font-mono text-[hsl(142,71%,55%)]">
        <ArrowDownRight size={12} />
        <span className="hidden xl:inline truncate max-w-[80px]">{value}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-0.5 text-[10px] font-mono text-[hsl(215,20%,55%)]">
      <Minus size={12} />
    </div>
  );
}
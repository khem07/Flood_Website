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
    status: 'good',
    icon: Activity,
    description: "Matthews Correlation Coefficient - balanced metric for all classes",
    threshold: 'RF: 0.8094 · TF: 0.7877 · TCN: 0.8204',
  },
  {
    id: 'kpi-forecast-horizon',
    label: 'Forecast Horizon',
    value: '7',
    unit: 'days',
    subValue: 'Day 1 – Day 7 lead time',
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
    status: 'good',
    icon: Zap,
    description: 'F1-score for High Risk class - critical for flood early warning',
    threshold: 'RF: 0.92 · TF: 0.90 · TCN: 0.92',
  },
  {
    id: 'kpi-current-risk',
    label: 'Current Forecast Risk',
    value: 'No Risk',
    unit: '',
    subValue: 'All 3 models · All 7 days',
    status: 'good',
    icon: Waves,
    description: 'Current 7-day flood risk classification from all three ML models',
    threshold: 'TCN max prob: 0.007 · TF max prob: 0.002',
  },
];

const statusConfig = {
  good: {
    bg: 'bg-muted/5',
    border: 'border-muted/30',
    badge: 'bg-muted/15 text-muted-foreground',
    value: 'text-foreground',
  },
  warning: {
    bg: 'bg-muted/5',
    border: 'border-muted/30',
    badge: 'bg-muted/15 text-muted-foreground',
    value: 'text-foreground',
  },
  watch: {
    bg: 'bg-muted/5',
    border: 'border-muted/30',
    badge: 'bg-muted/15 text-muted-foreground',
    value: 'text-foreground',
  },
  danger: {
    bg: 'bg-muted/5',
    border: 'border-muted/30',
    badge: 'bg-muted/15 text-muted-foreground',
    value: 'text-foreground',
  },
  info: {
    bg: 'bg-muted/5',
    border: 'border-muted/30',
    badge: 'bg-muted/15 text-muted-foreground',
    value: 'text-foreground',
  },
};

export default function KPICards() {
  return (
    <div id='analysis' className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
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
            <div className="mb-1">
              <div className="flex items-end gap-1">
                <span
                  className={`font-mono tabular-nums font-bold leading-none ${isFirst ? 'text-3xl' : 'text-2xl'} ${cfg.value}`}
                >
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[13px] text-muted-foreground mb-0.5 font-mono">
                    {kpi.unit}
                  </span>
                )}
              </div>
            </div>

            <p className="text-[12px] font-medium text-foreground mb-0.5 leading-tight">
              {kpi.label}
            </p>
            <p className="text-[11px] text-muted-foreground font-mono leading-tight">
              {kpi.subValue}
            </p>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-[10px] text-muted-foreground leading-tight">
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
      <div className="flex items-center gap-0.5 text-[10px] font-mono text-muted-foreground">
        <ArrowUpRight size={12} />
        <span className="hidden xl:inline truncate max-w-[80px]">{value}</span>
      </div>
    );
  }
  if (trend === 'down') {
    return (
      <div className="flex items-center gap-0.5 text-[10px] font-mono text-muted-foreground">
        <ArrowDownRight size={12} />
        <span className="hidden xl:inline truncate max-w-[80px]">{value}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-0.5 text-[10px] font-mono text-muted-foreground">
      <Minus size={12} />
    </div>
  );
}
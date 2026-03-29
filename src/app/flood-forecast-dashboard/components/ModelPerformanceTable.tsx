'use client';
import React, { useState } from 'react';
import { Award } from 'lucide-react';

// ── 5-Fold Cross-Validation Data ──────────────────────────────────────────────
const cvFolds = [
  {
    model: 'Random Forest',
    color: '#9ca3af',
    folds: [
      { fold: 1, period: '2009–2011', precision: 0.8295, recall: 0.8171, f1: 0.8111, accuracy: 0.8171, mcc: 0.7634, kappa: 0.7561 },
      { fold: 2, period: '2012–2014', precision: 0.8680, recall: 0.8641, f1: 0.8644, accuracy: 0.8641, mcc: 0.8187, kappa: 0.8177 },
      { fold: 3, period: '2015–2017', precision: 0.9030, recall: 0.8949, f1: 0.8961, accuracy: 0.8949, mcc: 0.8574, kappa: 0.8552 },
      { fold: 4, period: '2018–2020', precision: 0.8782, recall: 0.8527, f1: 0.8559, accuracy: 0.8527, mcc: 0.8111, kappa: 0.8039 },
      { fold: 5, period: '2021–2023', precision: 0.8659, recall: 0.8561, f1: 0.8568, accuracy: 0.8561, mcc: 0.8103, kappa: 0.8076 },
    ],
    mean: { precision: '0.8690±0.0265', recall: '0.8570±0.0278', f1: '0.8569±0.0304', accuracy: '0.8570±0.0278', mcc: '0.8122±0.0334', kappa: '0.8081±0.0355' },
  },
  {
    model: 'Transformer',
    color: '#6b7280',
    folds: [
      { fold: 1, period: '2009–2011', precision: 0.796, recall: 0.751, f1: 0.732, accuracy: 0.751, mcc: 0.689, kappa: 0.668 },
      { fold: 2, period: '2012–2014', precision: 0.808, recall: 0.804, f1: 0.802, accuracy: 0.804, mcc: 0.740, kappa: 0.737 },
      { fold: 3, period: '2015–2017', precision: 0.895, recall: 0.893, f1: 0.893, accuracy: 0.893, mcc: 0.852, kappa: 0.852 },
      { fold: 4, period: '2018–2020', precision: 0.889, recall: 0.888, f1: 0.888, accuracy: 0.888, mcc: 0.850, kappa: 0.850 },
      { fold: 5, period: '2021–2023', precision: 0.883, recall: 0.868, f1: 0.868, accuracy: 0.868, mcc: 0.825, kappa: 0.821 },
    ],
    mean: { precision: '0.854±0.048', recall: '0.841±0.062', f1: '0.836±0.069', accuracy: '0.841±0.062', mcc: '0.791±0.073', kappa: '0.785±0.081' },
  },
  {
    model: 'TCN',
    color: '#4b5563',
    folds: [
      { fold: 1, period: '2009–2011', precision: 0.7899, recall: 0.7455, f1: 0.7193, accuracy: 0.7455, mcc: 0.6814, kappa: 0.6593 },
      { fold: 2, period: '2012–2014', precision: 0.8788, recall: 0.8671, f1: 0.8691, accuracy: 0.8671, mcc: 0.8238, kappa: 0.8210 },
      { fold: 3, period: '2015–2017', precision: 0.9136, recall: 0.9084, f1: 0.9095, accuracy: 0.9084, mcc: 0.8747, kappa: 0.8735 },
      { fold: 4, period: '2018–2020', precision: 0.8896, recall: 0.8861, f1: 0.8872, accuracy: 0.8861, mcc: 0.8475, kappa: 0.8471 },
      { fold: 5, period: '2021–2023', precision: 0.9198, recall: 0.9185, f1: 0.9174, accuracy: 0.9185, mcc: 0.8912, kappa: 0.8901 },
    ],
    mean: { precision: '0.8784±0.0523', recall: '0.8652±0.0698', f1: '0.8606±0.0812', accuracy: '0.8652±0.0698', mcc: '0.8238±0.0836', kappa: '0.8183±0.0926' },
  },
];

// ── Per-Class Metrics ─────────────────────────────────────────────────────────
const perClassData = [
  {
    model: 'Random Forest',
    color: '#9ca3af',
    classes: [
      { name: 'No Risk',     precision: 0.88, recall: 0.91, f1: 0.89, support: 1015 },
      { name: 'Low Risk',    precision: 0.79, recall: 0.80, f1: 0.80, support: 1090 },
      { name: 'Medium Risk', precision: 0.85, recall: 0.81, f1: 0.82, support: 1189 },
      { name: 'High Risk',   precision: 0.92, recall: 0.92, f1: 0.92, support: 1085 },
    ],
    macroAvg:    { precision: 0.86, recall: 0.86, f1: 0.86, support: 4379 },
    weightedAvg: { precision: 0.86, recall: 0.86, f1: 0.86, support: 4379 },
  },
  {
    model: 'Transformer',
    color: '#6b7280',
    classes: [
      { name: 'No Risk',     precision: 0.83, recall: 0.92, f1: 0.87, support: 1015 },
      { name: 'Low Risk',    precision: 0.80, recall: 0.76, f1: 0.78, support: 1090 },
      { name: 'Medium Risk', precision: 0.83, recall: 0.80, f1: 0.81, support: 1189 },
      { name: 'High Risk',   precision: 0.91, recall: 0.90, f1: 0.90, support: 1085 },
    ],
    macroAvg:    { precision: 0.84, recall: 0.84, f1: 0.84, support: 4379 },
    weightedAvg: { precision: 0.84, recall: 0.84, f1: 0.84, support: 4379 },
  },
  {
    model: 'TCN',
    color: '#4b5563',
    classes: [
      { name: 'No Risk',     precision: 0.85, recall: 0.92, f1: 0.89, support: 1016 },
      { name: 'Low Risk',    precision: 0.83, recall: 0.76, f1: 0.79, support: 1124 },
      { name: 'Medium Risk', precision: 0.86, recall: 0.86, f1: 0.86, support: 1195 },
      { name: 'High Risk',   precision: 0.91, recall: 0.93, f1: 0.92, support: 1145 },
    ],
    macroAvg:    { precision: 0.86, recall: 0.87, f1: 0.86, support: 4480 },
    weightedAvg: { precision: 0.86, recall: 0.87, f1: 0.86, support: 4480 },
  },
];

// ── Bootstrap Confidence Intervals ───────────────────────────────────────────
const bootstrapData = [
  {
    model: 'Random Forest',
    color: '#9ca3af',
    metrics: [
      { metric: 'Weighted F1', point: 0.8569, ciLower: 0.8471, ciUpper: 0.8667, ciWidth: 0.0196 },
      { metric: 'Accuracy',    point: 0.8569, ciLower: 0.8465, ciUpper: 0.8673, ciWidth: 0.0208 },
      { metric: 'MCC',         point: 0.8094, ciLower: 0.7951, ciUpper: 0.8233, ciWidth: 0.0282 },
    ],
  },
  {
    model: 'Transformer',
    color: '#6b7280',
    metrics: [
      { metric: 'Weighted F1', point: 0.8396, ciLower: 0.8291, ciUpper: 0.8510, ciWidth: 0.0219 },
      { metric: 'Accuracy',    point: 0.8405, ciLower: 0.8299, ciUpper: 0.8518, ciWidth: 0.0219 },
      { metric: 'MCC',         point: 0.7877, ciLower: 0.7738, ciUpper: 0.8019, ciWidth: 0.0281 },
    ],
  },
  {
    model: 'TCN',
    color: '#4b5563',
    metrics: [
      { metric: 'Weighted F1', point: 0.8642, ciLower: 0.8537, ciUpper: 0.8746, ciWidth: 0.0209 },
      { metric: 'Accuracy',    point: 0.8652, ciLower: 0.8558, ciUpper: 0.8750, ciWidth: 0.0192 },
      { metric: 'MCC',         point: 0.8204, ciLower: 0.8066, ciUpper: 0.8343, ciWidth: 0.0277 },
    ],
  },
];

type TabKey = 'cv' | 'perclass' | 'bootstrap';

export default function ModelPerformanceTable() {
  const [activeTab, setActiveTab] = useState<TabKey>('cv');
  const [activeModel, setActiveModel] = useState<number>(0);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'cv', label: '5-Fold CV' },
    { key: 'perclass', label: 'Per-Class' },
    { key: 'bootstrap', label: 'Bootstrap CI' },
  ];

  return (
    <div
      id="performance"
      className="rounded-xl border border-border bg-card p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Award size={15} className="text-primary" />
        <h3 className="text-[14px] font-semibold text-foreground">
          Model Performance Metrics
        </h3>
        <div className="ml-auto flex items-center gap-1 bg-muted/20 rounded-lg p-1 border border-border">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-150"
              style={
                activeTab === t.key
                  ? { background: '#6b728020', color: '#6b7280', border: '1px solid #6b728040' }
                  : { color: 'hsl(var(--color-muted-foreground))', border: '1px solid transparent' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Model selector (for CV and Per-Class) */}
      {activeTab !== 'bootstrap' && (
        <div className="flex items-center gap-1 mb-4">
          {(activeTab === 'cv' ? cvFolds : perClassData).map((m, i) => (
            <button
              key={`model-tab-${i}`}
              onClick={() => setActiveModel(i)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-150"
              style={
                activeModel === i
                  ? { background: `${m.color}20`, color: m.color, border: `1px solid ${m.color}40` }
                  : { color: 'hsl(var(--color-muted-foreground))', border: '1px solid transparent' }
              }
            >
              <span className="w-2 h-2 rounded-sm" style={{ background: m.color }} />
              {m.model}
            </button>
          ))}
        </div>
      )}

      {/* ── 5-Fold CV Table ── */}
      {activeTab === 'cv' && (
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] min-w-[560px]">
            <thead>
              <tr className="border-b border-border">
                {['Fold', 'Period', 'Precision', 'Recall', 'F1-Score', 'Accuracy', 'MCC', 'Kappa'].map((h) => (
                  <th key={h} className="text-right first:text-left py-2 px-2 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cvFolds[activeModel].folds.map((row) => (
                <tr key={`cv-${row.fold}`} className="border-b border-muted/20 hover:bg-muted transition-colors">
                  <td className="py-2.5 px-2 font-mono text-muted-foreground">{row.fold}</td>
                  <td className="py-2.5 px-2 font-mono text-muted-foreground">{row.period}</td>
                  {[row.precision, row.recall, row.f1, row.accuracy, row.mcc, row.kappa].map((v, vi) => (
                    <td key={vi} className="py-2.5 px-2 text-right font-mono tabular-nums text-foreground">
                      {v.toFixed(4)}
                    </td>
                  ))}
                </tr>
              ))}
              {/* Mean ± Std row */}
              <tr className="border-t-2 border-border" style={{ background: `${cvFolds[activeModel].color}08` }}>
                <td className="py-2.5 px-2 font-mono font-semibold" style={{ color: cvFolds[activeModel].color }}>Mean</td>
                <td className="py-2.5 px-2 font-mono text-muted-foreground">±Std</td>
                {(['precision', 'recall', 'f1', 'accuracy', 'mcc', 'kappa'] as const).map((k) => (
                  <td key={k} className="py-2.5 px-2 text-right font-mono tabular-nums text-[11px]" style={{ color: cvFolds[activeModel].color }}>
                    {cvFolds[activeModel].mean[k]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ── Per-Class Metrics Table ── */}
      {activeTab === 'perclass' && (
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] min-w-[440px]">
            <thead>
              <tr className="border-b border-border">
                {['Risk Class', 'Precision', 'Recall', 'F1-Score', 'Support'].map((h) => (
                  <th key={h} className="text-right first:text-left py-2 px-2 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {perClassData[activeModel].classes.map((cls) => {
                const riskColor = '#6b7280';
                return (
                  <tr key={cls.name} className="border-b border-muted/20 hover:bg-muted transition-colors">
                    <td className="py-2.5 px-2">
                      <span className="font-mono text-[11px] font-medium" style={{ color: riskColor }}>{cls.name}</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-foreground">{cls.precision.toFixed(2)}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-foreground">{cls.recall.toFixed(2)}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-foreground">{cls.f1.toFixed(2)}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-muted-foreground">{cls.support.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Bootstrap CI Table ── */}
      {activeTab === 'bootstrap' && (
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] min-w-[500px]">
            <thead>
              <tr className="border-b border-border">
                {['Model', 'Metric', 'Point Est.', 'CI Lower', 'CI Upper', 'CI Width'].map((h) => (
                  <th key={h} className="text-right first:text-left py-2 px-2 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bootstrapData.map((m) =>
                m.metrics.map((row, ri) => (
                  <tr key={`${m.model}-${row.metric}`} className="border-b border-muted/20 hover:bg-muted transition-colors">
                    <td className="py-2.5 px-2">
                      {ri === 0 ? (
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: m.color }} />
                          <span className="font-mono font-medium text-[11px]" style={{ color: m.color }}>{m.model}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-muted-foreground">{row.metric}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums  text-foreground">{row.point.toFixed(4)}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-foreground">{row.ciLower.toFixed(4)}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-foreground">{row.ciUpper.toFixed(4)}</td>
                    <td className="py-2.5 px-2 text-right font-mono tabular-nums text-muted-foreground">{row.ciWidth.toFixed(4)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="mt-3 text-[10px] font-mono text-muted-foreground">
            95% bootstrap confidence intervals · 1000 bootstrap iterations
          </p>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-muted border border-border">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Evaluation Method
          </p>
          <p className="text-[12px] text-foreground">5-Fold Temporal Cross-Validation</p>
        </div>
        <div className="p-3 rounded-lg bg-muted border border-border">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Study Period
          </p>
          <p className="text-[12px] text-foreground">2009–2023 (15 years)</p>
        </div>
      </div>
    </div>
  );
}
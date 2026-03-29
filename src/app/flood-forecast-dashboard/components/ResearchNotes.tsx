import React from 'react';
import { BookOpen, FlaskConical, Database, Cpu, FileText, ExternalLink } from 'lucide-react';

const notes = [
  {
    id: 'note-study',
    icon: BookOpen,
    title: 'Study Overview',
    color: '#9ca3af',
    content:
      'This dashboard presents results from a comparative analysis of three machine learning approaches for flood forecasting in the Karnali River basin, Nepal. The study evaluates Random Forest (RF), Transformer, and Temporal Convolutional Network (TCN) models trained on daily discharge data from the Chisapani hydrological station (Station ID: 340, DHM Nepal).',
  },
  {
    id: 'note-data',
    icon: Database,
    title: 'Data & Study Area',
    color: '#4b5563',
    content:
      'Input data: Daily discharge (m³/s), rainfall (mm/day), and temperature (°C) from 1985–2025. Training period: 2020–2022 (monsoon Jun–Sep). Validation: 2023–2025. Catchment area: ~45,000 km². Elevation range: 84–7,694 m AMSL. Data source: Department of Hydrology and Meteorology (DHM), Government of Nepal.',
  },
  {
    id: 'note-models',
    icon: Cpu,
    title: 'Model Architecture',
    color: '#6b7280',
    content:
      'Random Forest: 500 estimators, max depth 15, 14 lagged features (t-1 to t-14). Transformer: 4 attention heads, 2 encoder layers, d_model=64, 30-day input sequence, 2.4M parameters. TCN: 6 residual blocks, kernel size 3, dilation factors [1,2,4,8,16,32], 1.1M parameters. All models use identical 30-day input window and predict t+1 to t+7 discharge.',
  },
  {
    id: 'note-findings',
    icon: FlaskConical,
    title: 'Key Findings',
    color: '#a1aab8',
    content:
      'TCN achieved the best overall performance with Weighted F1: 0.8642, Accuracy: 0.8652, and MCC: 0.8204 (bootstrap 95% CI). Random Forest followed closely with Weighted F1: 0.8569 and MCC: 0.8094. Transformer scored Weighted F1: 0.8396 and MCC: 0.7877. All models classified the current 7-day forecast as No Risk across all lead days. High Risk class F1 reached 0.92 for RF and TCN, 0.90 for Transformer - critical for early warning reliability. 5-fold temporal CV (2009–2023) confirmed consistent generalization across all periods.',
  },
  {
    id: 'note-limitations',
    icon: FileText,
    title: 'Limitations & Future Work',
    color: '#fb923c',
    content:
      'Current models do not incorporate real-time satellite precipitation estimates (GPM-IMERG). Model performance degrades significantly during compound events (simultaneous rainfall + snowmelt). Future work: integration of upstream glacier melt dynamics, spatial precipitation variability using radar data, and real-time data assimilation for improved 7-day lead time accuracy. Bias correction post-processing recommended before operational deployment.',
  },
];

export default function ResearchNotes() {
  return (
    <div id="notes" className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-5">
        <BookOpen size={15} className="text-primary" />
        <h3 className="text-[15px] font-semibold text-foreground">
          Research Notes & Methodology
        </h3>
        <span className="ml-auto text-[11px] font-mono text-muted-foreground">
          Karnali Flood Forecasting Study · 2026
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        {notes?.map((note) => {
          const IconComp = note?.icon;
          return (
            <div
              key={note?.id}
              className="rounded-xl border border-border bg-background hover:border-muted transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="p-1.5 rounded-lg"
                  style={{ background: `${note?.color}15` }}
                >
                  <IconComp size={13} style={{ color: note?.color }} />
                </div>
                <h4 className="text-[12px] font-semibold" style={{ color: note?.color }}>
                  {note?.title}
                </h4>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {note?.content}
              </p>
            </div>
          );
        })}
      </div>
      {/* Citation block */}
      <div className="mt-5 p-4 rounded-xl bg-muted border border-border">
        <p className="text-[11px] font-mono text-muted-foreground mb-2 uppercase tracking-wider">
          Citation
        </p>
        <p className="text-[12px] font-mono text-muted-foreground leading-relaxed">
          [Author(s)]. (2026). Comparative Analysis of Machine Learning Models for Flood Forecasting in the Karnali River Basin, Nepal: Random Forest, Transformer, and TCN Approaches. <em className="text-muted-foreground">Journal of Hydrology</em> [Under Review].
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: 'DHM Nepal', href: '#' },
            { label: 'Karnali Basin Study', href: '#' },
            { label: 'Model Code Repository', href: '#' },
            { label: 'Dataset DOI', href: '#' },
          ]?.map((link) => (
            <a
              key={`link-${link?.label}`}
              href={link?.href}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:text-primary transition-colors duration-150"
            >
              <ExternalLink size={10} />
              {link?.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
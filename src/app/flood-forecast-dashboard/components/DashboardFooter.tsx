import React from 'react';
import { Droplets, MapPin, Shield, Activity } from 'lucide-react';

export default function DashboardFooter() {
  return (
    <footer className="border-t border-border mt-10 bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-14 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 border border-primary/30">
                <Droplets size={14} className="text-primary" />
              </div>
              <span className="font-semibold text-[13px] text-foreground">KarnaliFloodWatch</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              ML-powered flood forecasting research dashboard for the Karnali River basin, Nepal. Comparing Random Forest, Transformer, and TCN models.
            </p>
          </div>

          <div>
            <h5 className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-3">Study Area</h5>
            <div className="space-y-1.5">
              {[
                { label: 'Station', value: 'Chisapani (ID: 340)' },
                { label: 'River', value: 'Karnali River, Nepal' },
                { label: 'Catchment', value: '~45,000 km²' },
                { label: 'Datum', value: 'WGS84, AMSL' },
              ]?.map((item) => (
                <div key={`footer-area-${item?.label}`} className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-mono">{item?.label}</span>
                  <span className="text-[11px] text-muted-foreground">{item?.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-3">Models</h5>
            <div className="space-y-1.5">
              {[
                { model: 'Random Forest', color: '#9ca3af', rmse: '430.7 m³/s' },
                { model: 'Transformer', color: '#6b7280', rmse: '358.2 m³/s' },
                { model: 'TCN', color: '#4b5563', rmse: '312.4 m³/s' },
              ]?.map((m) => (
                <div key={`footer-model-${m?.model}`} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm" style={{ background: m?.color }} />
                    <span className="text-[11px] text-muted-foreground">{m?.model}</span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">{m?.rmse}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-3">Data Sources</h5>
            <div className="space-y-1.5">
              {[
                'DHM Nepal (Discharge)',
                'CHIRPS (Rainfall)',
                'ERA5 (Temperature)',
                'MODIS (Land Cover)',
                'SRTM DEM (Elevation)',
              ]?.map((src) => (
                <div key={`footer-src-${src}`} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">{src}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Activity size={11} className="text-success" />
              <span className="text-[10px] font-mono text-muted-foreground">
                Dashboard operational · v1.0.0
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield size={11} className="text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground">
                Research use only — not for emergency response
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={10} className="text-muted-foreground" />
            <span className="text-[10px] font-mono text-muted-foreground">
              Karnali River Basin · Nepal · © 2026 KarnaliFloodWatch Research
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
'use client';
import React, { useState } from 'react';
import { Droplets, Bell, Download, Menu, X, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardTopbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleExport = () => {
    toast?.success('Export started', {
      description: 'forecast_results_karnali_2026-03-27.csv downloading…',
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(217,32%,17%)] bg-[hsl(222,47%,6%)]/95 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-14">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[hsl(199,89%,48%)]/15 border border-[hsl(199,89%,48%)]/30">
              <Droplets size={18} className="text-[hsl(199,89%,48%)]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[15px] tracking-tight text-[hsl(210,40%,96%)]">
                  KarnaliFloodRisk
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[hsl(199,89%,48%)]/15 text-[hsl(199,89%,48%)] border border-[hsl(199,89%,48%)]/30 font-mono">
                  RESEARCH
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
                <MapPin size={10} className="text-[hsl(215,20%,55%)]" />
                <span className="text-[11px] text-[hsl(215,20%,55%)] font-mono">
                  Chisapani Station · Karnali, Nepal
                </span>
              </div>
            </div>
          </div>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Forecast', href: '#forecast' },
              { label: 'Analysis', href: '#analysis' },
              { label: 'Performance', href: '#performance' },
              
            ]?.map((item) => (
              <a
                key={`nav-${item?.label}`}
                href={item?.href}
                className="px-3 py-1.5 rounded-md text-[13px] text-[hsl(215,20%,65%)] hover:text-[hsl(210,40%,96%)] hover:bg-[hsl(217,32%,17%)] transition-all duration-150"
              >
                {item?.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[hsl(217,32%,11%)] border border-[hsl(217,32%,17%)]">
              <Clock size={12} className="text-[hsl(215,20%,55%)]" />
              <span className="text-[11px] font-mono text-[hsl(215,20%,65%)]">
                Last sync: 11:30 NPT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(142,71%,45%)] animate-pulse ml-1" />
            </div>

            

            <button
              className="relative p-2 rounded-md text-[hsl(215,20%,65%)] hover:text-[hsl(210,40%,96%)] hover:bg-[hsl(217,32%,17%)] transition-all duration-150"
              title="Alerts"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[hsl(0,84%,60%)]" />
            </button>

            <button
              className="lg:hidden p-2 rounded-md text-[hsl(215,20%,65%)] hover:bg-[hsl(217,32%,17%)] transition-all duration-150"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[hsl(217,32%,17%)] py-3 space-y-1">
            {[
              { label: 'Forecast', href: '#forecast' },
              { label: 'Analysis', href: '#analysis' },
              { label: 'Performance', href: '#performance' },
             
            ]?.map((item) => (
              <a
                key={`mobile-nav-${item?.label}`}
                href={item?.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-[13px] text-[hsl(215,20%,65%)] hover:text-[hsl(210,40%,96%)] hover:bg-[hsl(217,32%,17%)] transition-all duration-150"
              >
                {item?.label}
              </a>
            ))}
            <div className="flex items-center gap-1.5 px-3 py-2">
              <Clock size={12} className="text-[hsl(215,20%,55%)]" />
              <span className="text-[11px] font-mono text-[hsl(215,20%,55%)]">
                Last sync: 27 Mar 2026, 11:30 NPT
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
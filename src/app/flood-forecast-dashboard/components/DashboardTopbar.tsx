'use client';
import React, { useState } from 'react';
import { Droplets, Bell, Download, Menu, X, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function DashboardTopbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleExport = () => {
    toast?.success('Export started', {
      description: 'forecast_results_karnali_2026-03-27.csv downloading…',
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-14">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/flood_logo.png"
              alt="Karnali Flood Risk Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[15px] tracking-tight text-foreground">
                  KarnaliFloodRisk
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
                <MapPin size={10} className="text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground font-mono">
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
                className="px-3 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
              >
                {item?.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
              title="Alerts"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>

            <button
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:bg-muted transition-all duration-150"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border py-3 space-y-1">
            {[
              { label: 'Forecast', href: '#forecast' },
              { label: 'Analysis', href: '#analysis' },
              { label: 'Performance', href: '#performance' },
             
            ]?.map((item) => (
              <a
                key={`mobile-nav-${item?.label}`}
                href={item?.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
              >
                {item?.label}
              </a>
            ))}
            <div className="flex items-center gap-1.5 px-3 py-2">
              <Clock size={12} className="text-muted-foreground" />
              <span className="text-[11px] font-mono text-muted-foreground">
                Last sync: 27 Mar 2026, 11:30 NPT
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
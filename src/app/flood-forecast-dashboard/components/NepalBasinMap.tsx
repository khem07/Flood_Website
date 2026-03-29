'use client';
import React, { useState } from 'react';
import { X, MapPin, ZoomIn, ImageIcon } from 'lucide-react';

export default function NepalBasinMap() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={15} className="text-primary" />
        <h3 className="text-[15px] font-semibold text-foreground">
          Nepal — Karnali River Basin
        </h3>
        <span className="ml-auto text-[11px] font-mono text-muted-foreground">
          Study Area · ~45,000 km²
        </span>
      </div>

      {/* Map image placeholder */}
      <div
        className="relative w-full rounded-xl border-2 border-dashed border-border bg-muted overflow-hidden flex flex-col items-center justify-center"
        style={{ maxHeight: '900px' }}
      >
        {/*
          To add your Nepal map image:
          1. Place your image in public/assets/images/ (e.g. nepal_map.png)
          2. Remove the placeholder block below
          3. Uncomment the <img> tag below

          <img
            src="/assets/images/study area_jpg.jpg"
            alt="Map of Nepal showing Karnali River Basin study area"
            className="w-full h-full object-contain"
          />
        */}
        <img
           src="/assets/images/study area_jpg.jpg"
            alt="Map of Nepal showing Karnali River Basin study area"
            className="w-[60%] h-full object-fill"
          />
        
      </div>

      {/* Caption */}
      

      {/* Risk Map Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 border border-primary text-primary text-[13px] font-semibold hover:bg-primary/20 transition-all duration-200"
        >
          <ZoomIn size={14} />
          Open QGIS Risk Mapping
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={(e) => { if (e?.target === e?.currentTarget) setShowModal(false); }}
        >
          <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-primary" />
                <h4 className="text-[14px] font-semibold text-foreground">
                  Karnali Basin — QGIS Flood Risk Map
                </h4>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5">
              <div
                className="relative w-full rounded-xl border-2 border-dashed border-border bg-muted overflow-hidden flex flex-col items-center justify-center"
                style={{ minHeight: '400px' }}
              >
                {/*
                  Uncomment once you add your QGIS image:
                  <img
                    src="/assets/images/nali_risk_karmap.png"
                    alt="QGIS Flood Risk Map of Karnali River Basin showing spatial flood risk zones"
                    className="w-full h-full object-contain"
                  />
                */}
                <img
                    src="/assets/images/riskhazardvulnerability.jpg"
                    alt="QGIS Flood Risk Map of Karnali River Basin showing spatial flood risk zones"
                    className="w-full h-full object-contain"
                  />
                
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

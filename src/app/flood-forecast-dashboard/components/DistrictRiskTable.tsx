'use client';
import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';

interface District {
  sn: number;
  district: string;
  province: string;
  riskLevel: 'High' | 'Moderate' | 'VeryHigh';
  riskScore: number;
  keyFloodHazardZones: string;
}

const districts: District[] = [
  { sn: 1,  district: 'Bardiya',     province: 'Lumbini', riskLevel: 'VeryHigh',     riskScore: 95, keyFloodHazardZones: 'Main Karnali corridor; flat floodplain; cropland' },
  { sn: 2,  district: 'Banke',  province: 'Lumbini', riskLevel: 'VeryHigh',     riskScore: 92, keyFloodHazardZones: 'Mahakali-Sharda river overflow; western terai plains; border canal flooding' },
  { sn: 3,  district: 'Kailali',       province: 'Sudurpashchim',       riskLevel: 'VeryHigh',     riskScore: 90, keyFloodHazardZones: 'Rapti river overflow zones; terai low-lying areas; urban flood pockets' },
  { sn: 4,  district: 'Kanchanpur',    province: 'Sudurpashchim', riskLevel: 'High',     riskScore: 78, keyFloodHazardZones: 'Mahakali river international corridor; Chameliya river gorge; glacial melt streams' },
  { sn: 5,  district: 'Dang',     province: 'Lumbini',       riskLevel: 'High', riskScore: 75, keyFloodHazardZones: 'Karnali river bank overflow; terai floodplain; wildlife corridor flooding' },
  { sn: 6,  district: 'Surkhet',        province: 'Karnali',       riskLevel: 'High', riskScore: 62, keyFloodHazardZones: 'Rapti river floodplain; Dang valley floor; seasonal inundation areas' },
  { sn: 7,  district: 'Dailekh',     province: 'Karnali',       riskLevel: 'Moderate', riskScore: 60, keyFloodHazardZones: 'Bheri-Karnali confluence; Surkhet valley floor; urban drainage channels' },
  { sn: 8,  district: 'Achham',       province: 'Sudurpashchim',       riskLevel: 'Moderate', riskScore: 58, keyFloodHazardZones: 'Thuli Bheri river basin; eastern border streams; alpine lake overflow risk' },
  { sn: 9,  district: 'Salyan',     province: 'Karnali', riskLevel: 'Moderate', riskScore: 55, keyFloodHazardZones: 'Seti river upper corridor; Bajhang valley channels' },
  { sn: 10, district: 'Jajarkot',       province: 'Karnali',       riskLevel: 'Moderate', riskScore: 53, keyFloodHazardZones: 'Karnali river upper corridor; glacial melt zones; northern highland streams' },
  { sn: 11, district: 'Doti',      province: 'Sudurpashchim', riskLevel: 'Moderate', riskScore: 50, keyFloodHazardZones: 'Karnali upper tributaries; Bajura hill streams' },
  { sn: 12, district: 'Baitadi',    province: 'Sudurpashchim',       riskLevel: 'Moderate', riskScore: 48, keyFloodHazardZones: 'Bheri river corridor; Jajarkot river channels' },
  { sn: 13, district: 'Dadeldhura',        province: 'Sudurpashchim',       riskLevel: 'Moderate', riskScore: 45, keyFloodHazardZones: 'Karnali tributaries; remote river valleys; trans-Himalayan drainage' },
  { sn: 14, district: 'Rukum West',     province: 'Karnali', riskLevel: 'Moderate', riskScore: 43, keyFloodHazardZones: 'Mahakali tributaries; Surnaya river channel' },
];

function RiskBadge({ level }: { level: 'High' | 'Moderate' | 'VeryHigh' }) {
  const styles =
    level === 'High' ? 'bg-[#f15619] text-white border border-muted/30' : level === 'VeryHigh' ? 'bg-[#c03a3a] text-white border border-muted/40' : 'bg-[#dbc036] text-white border border-muted/25';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${styles}`}>
      {level}
    </span>
  );
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 65 ? '#6b7280' : '#9ca3af';
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono tabular-nums text-[12px] font-semibold" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

type FilterType = 'All' | 'VeryHigh' | 'High' | 'Moderate';

export default function DistrictRiskTable() {
  const [filter, setFilter] = useState<FilterType>('All');

  const filtered = filter === 'All' ? districts : districts.filter((d) => d.riskLevel === filter);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[14px] font-semibold text-foreground">
              District Flood Risk Scores
            </h3>
          </div>
          <p className="text-[11px] text-muted-foreground font-mono">
            Karnali River Basin · {districts.length} districts assessed
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 bg-muted/20 rounded-lg p-1 border border-border">
          {(['All', 'VeryHigh', 'High', 'Moderate'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-150"
              style={
                filter === f
                  ? {
                      background: '#e5e7eb',
                      color: '#1f2937',
                      border: '1px solid #d1d5db',
                    }
                  : { color: 'hsl(var(--color-muted-foreground))', border: '1px solid transparent' }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[12px] min-w-[700px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 pr-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider w-10">
                S.N
              </th>
              <th className="text-left py-2.5 px-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                District
              </th>
              <th className="text-left py-2.5 px-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Province
              </th>
              <th className="text-center py-2.5 px-3 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Risk Level
              </th>
              <th className="text-left py-2.5 px-3 text[10px] font-mono text-muted-foreground uppercase tracking-wider w-44">
                Risk Score
              </th>
              
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={`district-${row.sn}`}
                className="border-b border-muted/20 hover:bg-muted/20 transition-colors duration-100"
              >
                <td className="py-3 pr-3">
                  <span className="font-mono text-muted-foreground text-[11px]">{row.sn}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="font-mono text-muted-foreground text-[11px]">{row.district}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="font-mono text-muted-foreground text-[11px]">{row.province}</span>
                </td>
                <td className="py-3 px-3 text-center">
                  <RiskBadge level={row.riskLevel} />
                </td>
                <td className="py-3 px-3">
                  <ScoreBar score={row.riskScore} />
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary row */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-muted/20 border border-border">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Total Districts</p>
          <p className="text-[20px] font-bold  font-mono">{districts.length}</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/20 border border-border">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Very High Risk</p>
          <p className="text-[20px] font-bold font-mono">
            {districts.filter((d) => d.riskLevel === 'VeryHigh').length}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-muted/20 border border-border">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">High Risk</p>
          <p className="text-[20px] font-bold font-mono">
            {districts.filter((d) => d.riskLevel === 'High').length}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-muted/20 border border-border">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Moderate Risk</p>
          <p className="text-[20px] font-bold font-mono">
            {districts.filter((d) => d.riskLevel === 'Moderate').length}
          </p>
        </div>
      </div>
    </div>
  );
}

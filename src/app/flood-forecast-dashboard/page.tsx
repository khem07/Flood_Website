import React from 'react';
import DashboardTopbar from './components/DashboardTopbar';
import KPICards from './components/KPICards';
import ForecastTable from './components/ForecastTable';
import ForecastChart from './components/ForecastChart';
import ObservedVsPredictedChart from './components/ObservedVsPredictedChart';
import ModelComparisonBarChart from './components/ModelComparisonBarChart';
import ModelPerformanceTable from './components/ModelPerformanceTable';
import NepalBasinMap from './components/NepalBasinMap';
import DistrictRiskTable from './components/DistrictRiskTable';
import DashboardFooter from './components/DashboardFooter';
import ToastProvider from './components/ToastProvider';

export default function FloodForecastDashboard() {
  return (
    <div className="min-h-screen bg-[hsl(222,47%,6%)] text-[hsl(210,40%,96%)]">
      <ToastProvider />
      <DashboardTopbar />
      <main className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-14 py-6 space-y-6">
        <ForecastTable />
        <NepalBasinMap />
        <DistrictRiskTable />
        <KPICards />
        <ForecastChart />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ObservedVsPredictedChart />
          <ModelComparisonBarChart />
        </div>
        <ModelPerformanceTable />
      </main>
      <DashboardFooter />
    </div>
  );
}
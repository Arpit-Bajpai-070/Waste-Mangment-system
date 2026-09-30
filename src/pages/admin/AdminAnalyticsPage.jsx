import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Truck,
  Layers,
  ArrowUpRight,
  Shield,
  Filter,
  Download,
  Calendar
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';

const HOTSPOTS = [
  {
    area: 'Central Metro Station Plaza',
    complaints: 142,
    severity: 'Critical Hotspot',
    primaryIssue: 'Overflowing public dual-stream bins during transit peak',
    patrolFrequency: 'Every 2 hours',
    color: 'border-rose-300 bg-rose-50/50'
  },
  {
    area: 'Highland Business District (Alley 3)',
    complaints: 98,
    severity: 'High Hotspot',
    primaryIssue: 'Commercial cardboard boxes & packaging left on curb',
    patrolFrequency: 'Daily 06:00 AM',
    color: 'border-amber-300 bg-amber-50/50'
  },
  {
    area: 'Sunset Boulevard Park (Gate 4)',
    complaints: 74,
    severity: 'Moderate Hotspot',
    primaryIssue: 'Weekend picnic food packaging & drink containers',
    patrolFrequency: 'Fri/Sat/Sun Extra Route',
    color: 'border-yellow-300 bg-yellow-50/50'
  },
  {
    area: 'Riverfront Commercial Port',
    complaints: 61,
    severity: 'Watchlist',
    primaryIssue: 'Occasional industrial pallet & wrap debris',
    patrolFrequency: 'Bi-weekly Inspection',
    color: 'border-blue-300 bg-blue-50/50'
  }
];

const AdminAnalyticsPage = () => {
  const { requests, stats, addToast } = useApp();
  const [timeRange, setTimeRange] = useState('Month');

  const monthlyTrends = [
    { month: 'May', requests: 780, resolved: 740 },
    { month: 'Jun', requests: 920, resolved: 890 },
    { month: 'Jul', requests: 1150, resolved: 1110 },
    { month: 'Aug', requests: 1290, resolved: 1240 },
    { month: 'Sep', requests: 1420, resolved: 1390 },
    { month: 'Oct (Proj)', requests: 1560, resolved: 1510 }
  ];

  const maxMonthlyVal = 1600;

  const handleExportReport = () => {
    addToast('Report Exported', 'CleanCity Municipal Monthly Analytics Report (PDF/CSV) generated.', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <BarChart3 className="h-4 w-4" /> Municipal Waste Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Waste Operations Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Aggregated municipal waste patterns, area complaint density, and crew resolution efficiency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
            {['Week', 'Month', 'Quarter', 'Year'].map(t => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  timeRange === t ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Button variant="secondary" size="sm" icon={Download} onClick={handleExportReport}>
            Export Audit
          </Button>
        </div>
      </div>

      {/* TOP KPI CARDS (Requirement 12) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Requests Logged"
          value="14,892"
          subtitle="Lifetime municipal intake"
          icon={Layers}
          color="slate"
          trend="12.4%"
        />
        <StatCard
          title="Average Resolution Time"
          value="3.8 hrs"
          subtitle="From citizen submit to verified cleanup"
          icon={Clock}
          color="green"
          trend="18% faster"
        />
        <StatCard
          title="Landfill Diversion"
          value="71.2%"
          subtitle="Composted or recycled"
          icon={CheckCircle2}
          color="blue"
          trend="4.5%"
        />
        <StatCard
          title="Fleet Utilization"
          value="94.6%"
          subtitle="Electric vehicle routes active"
          icon={Truck}
          color="purple"
          trend="99% uptime"
        />
      </div>

      {/* CHART 1: Monthly Request Trends & Completed vs Pending */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Bars */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Monthly Request Volume Trends</h3>
              <p className="text-xs text-slate-500">Intake volume vs successfully resolved cleanups</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" /> Total Inflow
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-[#166534]" /> Completed
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-100">
            {monthlyTrends.map((item, idx) => {
              const inflowHeight = Math.round((item.requests / maxMonthlyVal) * 100);
              const resolvedHeight = Math.round((item.resolved / maxMonthlyVal) * 100);

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-48">
                    {/* Inflow Bar */}
                    <div
                      style={{ height: `${inflowHeight}%` }}
                      className="w-1/2 max-w-[24px] rounded-t-md bg-emerald-400 group-hover:bg-emerald-500 transition-all duration-300 relative"
                      title={`${item.requests} intake`}
                    />
                    {/* Resolved Bar */}
                    <div
                      style={{ height: `${resolvedHeight}%` }}
                      className="w-1/2 max-w-[24px] rounded-t-md bg-[#166534] group-hover:bg-[#14532D] transition-all duration-300"
                      title={`${item.resolved} resolved`}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">{item.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Overall intake grew by +18% due to higher citizen reporting participation.</span>
            <span className="font-semibold text-emerald-700">98.4% Resolution Efficiency</span>
          </div>
        </div>

        {/* Completed vs Pending Ratio */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Completed vs Pending</h3>
            <p className="text-xs text-slate-500 mt-0.5">Current operational queue balance</p>
          </div>

          {/* Ratio Progress Bars */}
          <div className="space-y-4 my-auto">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-800">Completed ({stats.completed})</span>
                <span className="text-slate-500">{stats.resolutionRate}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${stats.resolutionRate}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-800">In Progress / Assigned ({stats.inProgress + stats.assigned})</span>
                <span className="text-slate-500">22%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '22%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-800">Pending Review ({stats.pending})</span>
                <span className="text-slate-500">14%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
            <strong>CleanCity Standard:</strong> All pending requests must be reviewed within 2 hours of citizen filing.
          </div>
        </div>
      </div>

      {/* WASTE HOTSPOTS SECTION (Requirement 12) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
              <Flame className="h-4 w-4" /> Predictive Hotspot Analysis
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Municipal Waste Hotspots
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              High-complaint sectors requiring increased bin infrastructure and preventive patrol schedules.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOTSPOTS.map((h, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between ${h.color}`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 shadow-2xs">
                    {h.severity}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {h.complaints} Reports
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{h.area}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{h.primaryIssue}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Patrol:</span>
                <span className="font-semibold text-slate-800">{h.patrolFrequency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;

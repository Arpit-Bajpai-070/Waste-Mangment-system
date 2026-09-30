import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Layers,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Users,
  TrendingUp,
  MapPin,
  ArrowRight,
  UserCheck,
  ChevronRight,
  Eye,
  BarChart2,
  PieChart,
  Truck,
  Sparkles
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';

const AdminDashboard = () => {
  const { requests, issues, stats, updateRequestStatus, assignWorker, workers } = useApp();
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');

  // Priority queue: pending and urgent requests
  const pendingRequests = requests.filter(r => r.status === 'Pending');

  // Chart data calculations
  const wasteTypeCounts = {
    Plastic: requests.filter(r => r.wasteType === 'Plastic').length,
    'Construction Waste': requests.filter(r => r.wasteType === 'Construction Waste').length,
    'Organic Waste': requests.filter(r => r.wasteType === 'Organic Waste').length,
    'General Waste': requests.filter(r => r.wasteType === 'General Waste').length,
    'Mixed Waste': requests.filter(r => r.wasteType === 'Mixed Waste').length,
    Other: requests.filter(r => r.wasteType === 'Other').length
  };

  const areaCounts = {
    'Greenwood Ave': requests.filter(r => r.location.includes('Greenwood')).length + 4,
    'Sunset Blvd': requests.filter(r => r.location.includes('Sunset')).length + 3,
    'Highland District': requests.filter(r => r.location.includes('Highland')).length + 5,
    'Central Metro': requests.filter(r => r.location.includes('Central')).length + 6,
    'Rosewood Suburb': requests.filter(r => r.location.includes('Rosewood')).length + 2
  };

  const maxAreaCount = Math.max(...Object.values(areaCounts));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Shield className="h-4 w-4" /> Municipal Authority Control Deck
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time municipal waste operations, sanitation crew routing, and resolution metrics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/admin/requests">
            <Button variant="primary" size="sm" icon={Layers}>
              Dispatch Console
            </Button>
          </Link>
          <Link to="/admin/analytics">
            <Button variant="secondary" size="sm" icon={BarChart2}>
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* STATISTICS (Requirement 9) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3.5 sm:gap-4">
        <StatCard
          title="Total Requests"
          value={stats.totalRequests}
          icon={Layers}
          color="slate"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={Activity}
          color="blue"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Reported Issues"
          value={stats.totalIssues}
          icon={AlertTriangle}
          color="rose"
        />
        <StatCard
          title="Registered Users"
          value={stats.activeCitizens.toLocaleString()}
          icon={Users}
          color="purple"
        />
      </div>

      {/* CHARTS SECTION (Requirement 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Requests Over Time (Trend Curve) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Requests Volume Over Time</h3>
              <p className="text-xs text-slate-500">Weekly intake vs completed sanitation routes</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Intake
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Resolved
              </span>
            </div>
          </div>

          {/* SVG Trend Chart */}
          <div className="relative h-56 w-full pt-4">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="165" x2="500" y2="165" stroke="#E2E8F0" strokeWidth="1" />

              {/* Intake Area & Line */}
              <path
                d="M 20,130 Q 90,80 160,110 T 300,50 T 420,70 T 490,40 L 490,165 L 20,165 Z"
                fill="url(#emeraldGrad)"
              />
              <path
                d="M 20,130 Q 90,80 160,110 T 300,50 T 420,70 T 490,40"
                fill="none"
                stroke="#16A34A"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Resolved Line */}
              <path
                d="M 20,145 Q 90,105 160,125 T 300,75 T 420,85 T 490,55 L 490,165 L 20,165 Z"
                fill="url(#blueGrad)"
              />
              <path
                d="M 20,145 Q 90,105 160,125 T 300,75 T 420,85 T 490,55"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Dots */}
              <circle cx="300" cy="50" r="4" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="490" cy="40" r="4" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between pt-2 text-[10px] font-semibold text-slate-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun (Peak)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Resolution Rate Gauge & SLA */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Resolution Rate & SLA</h3>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                Target: &gt;95%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Municipal Service Level Agreement compliance</p>
          </div>

          {/* Radial Donut Progress */}
          <div className="py-4 flex items-center justify-center gap-6">
            <div className="relative h-32 w-32 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3.2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="3.2"
                  strokeDasharray="98.4, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-2xl font-extrabold text-slate-900">98.4%</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">On Time</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-700">Resolved under 24h: <strong>89%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                <span className="font-medium text-slate-700">Resolved 24-48h: <strong>9.4%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="font-medium text-slate-700">Delayed / Escalated: <strong>1.6%</strong></span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-500 flex items-center justify-between">
            <span>Average Dispatch Latency:</span>
            <span className="font-bold text-emerald-800">42 minutes</span>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: Requests by Waste Type & Requests by Area (Requirement 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Waste Type */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Requests by Waste Category</h3>
            <span className="text-xs text-slate-400 font-medium">Monthly Distribution</span>
          </div>

          <div className="space-y-3">
            {Object.entries(wasteTypeCounts).map(([type, count]) => {
              const pct = Math.round((count / (requests.length || 1)) * 100);
              return (
                <div key={type} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">{type}</span>
                    <span className="text-slate-500">{count} requests ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                      style={{ width: `${Math.max(8, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By City Area */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Requests by Municipal Zone</h3>
            <Link to="/admin/analytics" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              Hotspots Map →
            </Link>
          </div>

          <div className="space-y-3">
            {Object.entries(areaCounts).map(([area, count]) => {
              const pct = Math.round((count / maxAreaCount) * 100);
              return (
                <div key={area} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">{area}</span>
                    <span className="text-slate-500">{count} load cycles</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#166534] to-[#16A34A] transition-all duration-500"
                      style={{ width: `${Math.max(12, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RAPID DISPATCH QUEUE: Pending Requests */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">Priority Dispatch Queue</h3>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                {pendingRequests.length} Pending Actions
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Assign sanitation squads or update status with single click</p>
          </div>
          <Link
            to="/admin/requests"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Open All Requests ({requests.length}) <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Request ID</th>
                <th className="py-3.5 px-4">Citizen</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Waste Type</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Quick Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingRequests.slice(0, 4).map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900">
                    {req.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {req.citizenName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                    {req.location}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {req.wasteType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={req.priority} size="sm" />
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={req.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={UserCheck}
                      onClick={() => {
                        setSelectedRequest(req);
                        setAssignModalOpen(true);
                      }}
                    >
                      Assign Crew
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => setSelectedRequest(req)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pendingRequests.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-500 mb-1" />
            <p className="text-xs font-semibold text-slate-700">All pending requests have been assigned!</p>
          </div>
        )}
      </div>

      {/* ASSIGN WORKER MODAL */}
      {assignModalOpen && selectedRequest && (
        <Modal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          title={`Assign Worker to Request ${selectedRequest.id}`}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Select an available municipal sanitation lead or specialized eco-squad unit for this location:
            </p>

            <div className="space-y-2">
              {workers.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorkerId(w.id)}
                  className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer transition-all ${
                    selectedWorkerId === w.id
                      ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{w.name}</h5>
                    <p className="text-[11px] text-slate-500">{w.role} • {w.team}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">
                      {w.activeTasks} tasks active
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="secondary" size="sm" onClick={() => setAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={!selectedWorkerId}
                onClick={() => {
                  const workerObj = workers.find(w => w.id === selectedWorkerId);
                  if (workerObj) {
                    assignWorker(selectedRequest.id, workerObj.id, workerObj.name);
                    setAssignModalOpen(false);
                  }
                }}
              >
                Confirm Assignment
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* QUICK VIEW DETAILS MODAL */}
      {selectedRequest && !assignModalOpen && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={`Municipal Request Overview: ${selectedRequest.id}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedRequest.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{selectedRequest.address}</p>
              </div>
              <StatusBadge status={selectedRequest.status} size="md" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 h-44 bg-slate-100">
                <img src={selectedRequest.imageUrl} alt="Request site" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="font-bold uppercase text-[10px] text-slate-400">Citizen:</span>
                  <div className="font-semibold text-slate-800">{selectedRequest.citizenName} ({selectedRequest.citizenPhone})</div>
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] text-slate-400">Category:</span>
                  <div className="font-semibold text-emerald-800">{selectedRequest.wasteType}</div>
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] text-slate-400">Preferred Pickup:</span>
                  <div className="text-slate-700">{selectedRequest.preferredDate} ({selectedRequest.preferredTime})</div>
                </div>
                <div>
                  <span className="font-bold uppercase text-[10px] text-slate-400">Assigned Squad:</span>
                  <div className="font-bold text-slate-900">{selectedRequest.assignedWorker || 'Unassigned'}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <Link to="/admin/requests" onClick={() => setSelectedRequest(null)}>
                <Button variant="secondary" size="sm">
                  Open Full Dispatch Console →
                </Button>
              </Link>
              <Button variant="primary" size="sm" onClick={() => setSelectedRequest(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;

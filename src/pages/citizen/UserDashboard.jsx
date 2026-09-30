import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  PlusCircle,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  Calendar,
  MapPin,
  Truck,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const UserDashboard = () => {
  const { user, requests, stats } = useApp();
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filter requests for current citizen
  const citizenRequests = requests.filter(r =>
    !user || r.citizenEmail === user.email || user.role === 'citizen'
  );

  const pendingCount = citizenRequests.filter(r => r.status === 'Pending').length;
  const inProgressCount = citizenRequests.filter(r => r.status === 'In Progress' || r.status === 'Assigned').length;
  const resolvedCount = citizenRequests.filter(r => r.status === 'Completed').length;
  const totalCount = citizenRequests.length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#166534] via-[#15803D] to-[#16A34A] p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-12 -translate-y-12 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-emerald-100 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              Verified Resident • {user?.area || 'Metro Sector 4'}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Good morning, {user?.name || 'Citizen'}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Your neighborhood has achieved a 98.4% timely waste resolution index this month. Have bulk waste or a community cleanup needed?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/cleanup-request">
              <Button variant="light" size="md" icon={PlusCircle}>
                Request Cleanup
              </Button>
            </Link>
            <Link to="/report-issue">
              <Button
                variant="secondary"
                size="md"
                icon={AlertTriangle}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Report Issue
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* STATISTICS CARDS (Requirement 5) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Requests"
          value={totalCount}
          icon={Layers}
          color="slate"
          subtitle="All filed cleanup requests"
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          icon={Clock}
          color="amber"
          subtitle="Awaiting municipal review"
        />
        <StatCard
          title="In Progress"
          value={inProgressCount}
          icon={Activity}
          color="blue"
          subtitle="Sanitation crew dispatched"
        />
        <StatCard
          title="Resolved"
          value={resolvedCount}
          icon={CheckCircle2}
          color="green"
          subtitle="Cleaned & verified"
        />
      </div>

      {/* PROMINENT CTA CARD (Requirement 5) */}
      <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border-2 border-dashed border-emerald-300 bg-[#F0FDF4] p-5 sm:p-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Need an area cleaned?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Submit location, preferred pickup slot, and photo. Our municipal rapid team will handle the rest.
            </p>
          </div>
        </div>
        <Link to="/cleanup-request" className="w-full sm:w-auto shrink-0">
          <Button variant="primary" size="md" icon={PlusCircle}>
            Create Cleanup Request
          </Button>
        </Link>
      </div>

      {/* RECENT REQUESTS TABLE / CARDS (Requirement 5) */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Cleanup Requests</h3>
            <p className="text-xs text-slate-500 mt-0.5">Track live progress and vehicle assignments</p>
          </div>
          <Link
            to="/my-requests"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View All ({citizenRequests.length}) <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Request ID</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Request Type</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {citizenRequests.slice(0, 5).map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900">
                    {req.id}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-slate-800 truncate">{req.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate mt-0.5">
                      <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                      {req.location}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                      {req.wasteType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {req.submittedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={req.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors shadow-2xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {citizenRequests.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <Truck className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium">No cleanup requests yet</p>
            <p className="text-xs text-slate-500 mt-1">Get started by scheduling your first cleanup request.</p>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={`Request Details: ${selectedRequest.id}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedRequest.title}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  {selectedRequest.address || selectedRequest.location}
                </p>
              </div>
              <StatusBadge status={selectedRequest.status} size="md" />
            </div>

            {/* Photo & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <img
                  src={selectedRequest.imageUrl}
                  alt="Waste Site"
                  className="h-44 w-full rounded-xl object-cover border border-slate-200"
                />
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Waste Classification:</span>
                  <div className="font-semibold text-slate-800 text-sm mt-0.5">{selectedRequest.wasteType}</div>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Preferred Window:</span>
                  <div className="text-slate-700 mt-0.5">{selectedRequest.preferredDate} ({selectedRequest.preferredTime})</div>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Assigned Worker / Unit:</span>
                  <div className="font-semibold text-emerald-800 mt-0.5">{selectedRequest.assignedWorker || 'Pending Assignment'}</div>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Description:</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{selectedRequest.description}</p>
                </div>
              </div>
            </div>

            {/* Timeline in Modal */}
            <div className="pt-3 border-t border-slate-100">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Live Status Progression</h5>
              <div className="space-y-2">
                {selectedRequest.timeline?.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{step.step}</span>
                        <span className="text-[10px] text-slate-400">{step.time}</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedRequest(null);
                  navigate('/my-requests');
                }}
              >
                Open Full Tracking Page →
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserDashboard;

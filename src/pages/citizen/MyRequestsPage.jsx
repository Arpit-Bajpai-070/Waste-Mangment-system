import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ClipboardList,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  User,
  Truck,
  Eye,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  PlusCircle
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const TIMELINE_STEPS = [
  'Submitted',
  'Under Review',
  'Assigned',
  'Cleanup in Progress',
  'Completed'
];

const MyRequestsPage = () => {
  const { requests, user } = useApp();

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filter requests
  const filteredRequests = requests.filter(req => {
    const matchesTab = activeTab === 'All' || req.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.wasteType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStepStatus = (currentStatus, stepName) => {
    const order = ['Pending', 'Under Review', 'Assigned', 'In Progress', 'Completed'];
    const stepNormalized = stepName === 'Cleanup in Progress' ? 'In Progress' : stepName === 'Submitted' ? 'Pending' : stepName;

    if (currentStatus === 'Rejected') {
      return stepName === 'Submitted' ? 'completed' : 'rejected';
    }

    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepNormalized);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Cleanup Requests & Tracking
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time status updates and municipal dispatch timelines for all your requests.
          </p>
        </div>
        <Link to="/cleanup-request">
          <Button variant="primary" size="md" icon={PlusCircle}>
            New Cleanup Request
          </Button>
        </Link>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1">
          {['All', 'Pending', 'Assigned', 'In Progress', 'Completed'].map(tab => {
            const count = tab === 'All'
              ? requests.length
              : requests.filter(r => r.status.toLowerCase() === tab.toLowerCase()).length;
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{tab}</span>
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${isActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, area, or waste..."
            className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-3 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map(req => (
          <div
            key={req.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all space-y-5"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {req.id}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{req.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {req.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" /> Submitted: {req.submittedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <StatusBadge status={req.status} size="md" />
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                  onClick={() => setSelectedRequest(req)}
                >
                  View Details
                </Button>
              </div>
            </div>

            {/* VISUAL TIMELINE (Requirement 8) */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Live Resolution Timeline
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
                {TIMELINE_STEPS.map((step, idx) => {
                  const status = getStepStatus(req.status, step);
                  const isCompleted = status === 'completed';
                  const isCurrent = status === 'current';
                  const isUpcoming = status === 'upcoming';

                  return (
                    <div
                      key={step}
                      className={`relative flex flex-col p-3 rounded-xl border text-center transition-all ${
                        isCompleted
                          ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                          : isCurrent
                          ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-slate-100 bg-slate-50/50 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-1.5">
                        {isCompleted ? (
                          <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        ) : isCurrent ? (
                          <div className="h-6 w-6 rounded-full bg-emerald-100 border-2 border-emerald-600 text-emerald-700 flex items-center justify-center animate-pulse">
                            <span className="h-2 w-2 rounded-full bg-emerald-600" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-semibold ${isCurrent ? 'text-emerald-800' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Assigned Worker</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {req.assignedWorker || 'Awaiting assignment'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Expected Completion</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {req.expectedCompletion || 'Within 24 hours of approval'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">Waste Classification</span>
                <span className="font-semibold text-emerald-700 mt-0.5 block">
                  {req.wasteType}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-400">
            <ClipboardList className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No requests found</p>
            <p className="text-xs text-slate-400 mt-1">Try changing the status tab filter or search query.</p>
          </div>
        )}
      </div>

      {/* DETAILED REQUEST MODAL (Requirement 8) */}
      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={`Detailed Request Tracking: ${selectedRequest.id}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{selectedRequest.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{selectedRequest.address}</p>
              </div>
              <StatusBadge status={selectedRequest.status} size="md" />
            </div>

            {/* Image & Key Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-48">
                <img
                  src={selectedRequest.imageUrl}
                  alt="Site Upload"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-3 text-xs bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Citizen / Contact</span>
                  <span className="font-semibold text-slate-800">{selectedRequest.citizenName} ({selectedRequest.citizenPhone})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Waste Category</span>
                  <span className="font-semibold text-emerald-800">{selectedRequest.wasteType}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Preferred Pickup Window</span>
                  <span className="font-medium text-slate-700">{selectedRequest.preferredDate} • {selectedRequest.preferredTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Assigned Sanitation Crew</span>
                  <span className="font-semibold text-slate-900">{selectedRequest.assignedWorker || 'Pending Assignment'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Citizen Description</span>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedRequest.description}
              </p>
            </div>

            {/* Full Audit Timeline */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Full Municipal Event Log
              </h5>
              <div className="space-y-2.5">
                {selectedRequest.timeline?.map((entry, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3 text-xs">
                    <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{entry.step}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{entry.time}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{entry.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setSelectedRequest(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyRequestsPage;

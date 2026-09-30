import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Activity,
  AlertTriangle,
  UserCheck,
  XCircle,
  Eye,
  MapPin,
  Calendar,
  Phone,
  Mail,
  User,
  Truck,
  RotateCcw,
  Sparkles,
  Download
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import { CITY_AREAS, WASTE_TYPES } from '../../data/mockData';

const AdminRequestsPage = () => {
  const { requests, workers, updateRequestStatus, assignWorker, rejectRequest } = useApp();
  const [searchParams] = useSearchParams();

  // Search & Filters State
  const initialStatus = searchParams.get('status') || 'All';
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedWasteType, setSelectedWasteType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Action States
  const [viewRequest, setViewRequest] = useState(null);
  const [assignTargetRequest, setAssignTargetRequest] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    action: null
  });

  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
  }, [searchParams]);

  // Filtered requests list
  const filteredRequests = requests.filter(req => {
    const matchesStatus = selectedStatus === 'All' || req.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesArea = selectedArea === 'All' || req.location.includes(selectedArea.split(',')[0]);
    const matchesWaste = selectedWasteType === 'All' || req.wasteType === selectedWasteType;
    const matchesSearch =
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesArea && matchesWaste && matchesSearch;
  });

  // Action handlers
  const handleMarkInProgress = (req) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Dispatch Crew En-Route?',
      message: `Mark Request #${req.id} as "In Progress"? This will notify citizen ${req.citizenName} that the sanitation vehicle is arriving.`,
      type: 'info',
      action: () => {
        updateRequestStatus(req.id, 'In Progress', req.assignedWorker, 'Sanitation truck en-route to location.');
        if (viewRequest && viewRequest.id === req.id) {
          setViewRequest(prev => ({ ...prev, status: 'In Progress' }));
        }
      }
    });
  };

  const handleMarkCompleted = (req) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Verify & Complete Cleanup?',
      message: `Are you sure cleanup for Request #${req.id} is verified and fully finished? This will resolve the request and archive the audit trail.`,
      type: 'warning',
      action: () => {
        updateRequestStatus(req.id, 'Completed', req.assignedWorker, 'Cleanup verified by municipal inspector. Waste safely transported.');
        if (viewRequest && viewRequest.id === req.id) {
          setViewRequest(prev => ({ ...prev, status: 'Completed' }));
        }
      }
    });
  };

  const handleReject = (req) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Reject Waste Request?',
      message: `Are you sure you want to reject Request #${req.id}? This will inform the resident that the waste is ineligible for standard municipal pickup.`,
      type: 'danger',
      action: () => {
        rejectRequest(req.id, 'Ineligible for standard municipal collection per Civic By-Law §12.');
        if (viewRequest && viewRequest.id === req.id) {
          setViewRequest(prev => ({ ...prev, status: 'Rejected' }));
        }
      }
    });
  };

  const handleOpenAssignModal = (req) => {
    setAssignTargetRequest(req);
    setSelectedWorkerId(req.assignedWorkerId || workers[0].id);
  };

  const handleConfirmAssign = () => {
    const workerObj = workers.find(w => w.id === selectedWorkerId);
    if (assignTargetRequest && workerObj) {
      assignWorker(assignTargetRequest.id, workerObj.id, workerObj.name);
      if (viewRequest && viewRequest.id === assignTargetRequest.id) {
        setViewRequest(prev => ({
          ...prev,
          status: prev.status === 'Pending' ? 'Assigned' : prev.status,
          assignedWorker: workerObj.name
        }));
      }
      setAssignTargetRequest(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            All Cleanup Requests Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Filter, inspect citizen submissions, assign sanitation officers, and manage lifecycle status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            Total in Database: <strong>{requests.length}</strong>
          </span>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROLS (Requirement 10) */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, citizen name, address, or waste..."
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden"
            >
              <option value="All">All Statuses ({requests.length})</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Area Filter */}
          <div>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden"
            >
              <option value="All">All Municipal Areas</option>
              {CITY_AREAS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Waste Type Filter */}
          <div>
            <select
              value={selectedWasteType}
              onChange={(e) => setSelectedWasteType(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden"
            >
              <option value="All">All Waste Types</option>
              {WASTE_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Reset Filters Pill */}
        {(selectedStatus !== 'All' || selectedArea !== 'All' || selectedWasteType !== 'All' || searchTerm) && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Showing {filteredRequests.length} of {requests.length} requests</span>
            <button
              onClick={() => {
                setSelectedStatus('All');
                setSelectedArea('All');
                setSelectedWasteType('All');
                setSearchTerm('');
              }}
              className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ALL REQUESTS MANAGEMENT TABLE (Requirement 10) */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Request ID</th>
                <th className="py-3.5 px-4">Citizen</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Waste Type</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned Worker</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Request ID */}
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900">
                    {req.id}
                  </td>

                  {/* Citizen */}
                  <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                    <div>{req.citizenName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{req.citizenPhone}</div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="text-slate-800 truncate font-medium">{req.title}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {req.location}
                    </div>
                  </td>

                  {/* Waste Type */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {req.wasteType}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {req.submittedDate}
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={req.priority} size="sm" />
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={req.status} size="sm" />
                  </td>

                  {/* Assigned Worker */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-800">
                    {req.assignedWorker && req.assignedWorker !== 'Unassigned' ? (
                      <span className="text-emerald-800 flex items-center gap-1 font-semibold">
                        <UserCheck className="h-3.5 w-3.5" />
                        {req.assignedWorker}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>

                  {/* Actions Column (View, Assign, Update Status, Reject) */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      {/* View Action */}
                      <button
                        title="View Full Request Details"
                        onClick={() => setViewRequest(req)}
                        className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 hover:text-emerald-700 transition-colors shadow-2xs"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Assign Worker Action */}
                      <button
                        title="Assign Sanitation Officer"
                        onClick={() => handleOpenAssignModal(req)}
                        className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors shadow-2xs"
                      >
                        <UserCheck className="h-4 w-4" />
                      </button>

                      {/* Status Update Quick Toggles */}
                      {req.status === 'Assigned' && (
                        <button
                          title="Mark In Progress"
                          onClick={() => handleMarkInProgress(req)}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          Start
                        </button>
                      )}

                      {req.status === 'In Progress' && (
                        <button
                          title="Mark Completed"
                          onClick={() => handleMarkCompleted(req)}
                          className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                        >
                          Resolve
                        </button>
                      )}

                      {/* Reject Action */}
                      {req.status !== 'Completed' && req.status !== 'Rejected' && (
                        <button
                          title="Reject Request"
                          onClick={() => handleReject(req)}
                          className="rounded-lg border border-rose-200 bg-white p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <Layers className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No requests match filters</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the status or area dropdowns.</p>
          </div>
        )}
      </div>

      {/* ADMIN REQUEST DETAILS MODAL (Requirement 11) */}
      {viewRequest && (
        <Modal
          isOpen={!!viewRequest}
          onClose={() => setViewRequest(null)}
          title={`Municipal Request Details: ${viewRequest.id}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{viewRequest.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  {viewRequest.address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={viewRequest.priority} size="md" />
                <StatusBadge status={viewRequest.status} size="md" />
              </div>
            </div>

            {/* Split Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo & Description */}
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-52 bg-slate-100">
                  <img src={viewRequest.imageUrl} alt="Request site" className="h-full w-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Citizen Waste Description:
                  </span>
                  <p className="mt-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {viewRequest.description}
                  </p>
                </div>
              </div>

              {/* Citizen & Location Cards */}
              <div className="space-y-4 text-xs">
                {/* Citizen Details */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-2">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Citizen Information</h5>
                  <div className="flex items-center gap-2 text-slate-800">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold">{viewRequest.citizenName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{viewRequest.citizenEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{viewRequest.citizenPhone}</span>
                  </div>
                </div>

                {/* Operations & Schedule */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-2">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Schedule & Dispatch</h5>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Waste Classification:</span>
                    <span className="font-semibold text-emerald-800">{viewRequest.wasteType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Preferred Window:</span>
                    <span className="text-slate-700">{viewRequest.preferredDate} ({viewRequest.preferredTime})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Squad:</span>
                    <span className="font-bold text-slate-900">{viewRequest.assignedWorker || 'Unassigned'}</span>
                  </div>
                </div>

                {/* Coordinates */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 flex items-center justify-between text-slate-600 font-mono text-[11px]">
                  <span>GPS: {viewRequest.lat || 37.7749}° N, {viewRequest.lng || -122.4194}° W</span>
                  <span className="text-emerald-700 font-semibold font-sans">Active Grid</span>
                </div>
              </div>
            </div>

            {/* Request Timeline (Requirement 11) */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Lifecycle Event Log
              </h5>
              <div className="space-y-2">
                {viewRequest.timeline?.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-3 text-xs">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{step.step}</span>
                        <span className="text-[10px] text-slate-400">{step.time}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS (Requirement 11) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={UserCheck}
                  onClick={() => handleOpenAssignModal(viewRequest)}
                >
                  Assign Request
                </Button>
                {viewRequest.status !== 'In Progress' && viewRequest.status !== 'Completed' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Activity}
                    onClick={() => handleMarkInProgress(viewRequest)}
                  >
                    Mark In Progress
                  </Button>
                )}
                {viewRequest.status !== 'Completed' && (
                  <Button
                    variant="dark"
                    size="sm"
                    icon={CheckCircle2}
                    onClick={() => handleMarkCompleted(viewRequest)}
                  >
                    Mark Completed
                  </Button>
                )}
                {viewRequest.status !== 'Rejected' && (
                  <Button
                    variant="dangerOutline"
                    size="sm"
                    icon={XCircle}
                    onClick={() => handleReject(viewRequest)}
                  >
                    Reject Request
                  </Button>
                )}
              </div>

              <Button variant="secondary" size="sm" onClick={() => setViewRequest(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ASSIGN WORKER MODAL */}
      {assignTargetRequest && (
        <Modal
          isOpen={!!assignTargetRequest}
          onClose={() => setAssignTargetRequest(null)}
          title={`Assign Worker to Request ${assignTargetRequest.id}`}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Select an available municipal sanitation lead or specialized eco-squad unit:
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
                    <span className="text-[10px] text-slate-400">Tel: {w.phone}</span>
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
              <Button variant="secondary" size="sm" onClick={() => setAssignTargetRequest(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmAssign}
              >
                Confirm Assignment
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* CONFIRMATION DIALOG (Requirement 11) */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={() => {
          if (confirmDialog.action) confirmDialog.action();
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        }}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
      />
    </div>
  );
};

export default AdminRequestsPage;

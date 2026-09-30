import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Camera,
  ShieldAlert,
  Search,
  Check
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const AdminIssuesPage = () => {
  const { issues, resolveIssue } = useApp();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIssues = issues.filter(iss => {
    const matchesFilter = filterType === 'All' || iss.status === filterType;
    const matchesSearch =
      iss.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iss.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iss.issueType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
            <AlertTriangle className="h-4 w-4" /> Civic Hazard Reports
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Reported Waste Incidents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Public nuisance complaints, overflowing civic bins, and illegal dumps reported by residents.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 shadow-2xs">
            Open Incidents: <strong className="text-rose-600">{issues.filter(i => i.status !== 'Resolved').length}</strong>
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-xs">
        <div className="flex gap-1">
          {['All', 'Pending', 'In Progress', 'Resolved'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                filterType === tab
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search issues by location or type..."
            className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-3 text-xs text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIssues.map((iss) => (
          <div
            key={iss.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                    {iss.id}
                  </span>
                  <StatusBadge status={iss.priority} size="sm" />
                </div>
                <StatusBadge status={iss.status} size="sm" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">{iss.issueType}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  {iss.location}
                </p>
              </div>

              <div className="flex gap-3">
                {iss.imageUrl && (
                  <img
                    src={iss.imageUrl}
                    alt="Issue preview"
                    className="h-20 w-24 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                )}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed flex-1">
                  {iss.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span>Reported: {iss.submittedDate}</span>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                  onClick={() => setSelectedIssue(iss)}
                >
                  Inspect
                </Button>
                {iss.status !== 'Resolved' && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Check}
                    onClick={() => resolveIssue(iss.id)}
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-400">
            <AlertTriangle className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No issues found</p>
            <p className="text-xs text-slate-400 mt-1">All civic hazards for this filter are currently clear.</p>
          </div>
        )}
      </div>

      {/* Inspect Modal */}
      {selectedIssue && (
        <Modal
          isOpen={!!selectedIssue}
          onClose={() => setSelectedIssue(null)}
          title={`Civic Issue Inspection: ${selectedIssue.id}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 h-52 bg-slate-100">
              <img src={selectedIssue.imageUrl} alt="Incident Site" className="h-full w-full object-cover" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Incident Type:</span>
                <span className="font-semibold text-rose-700">{selectedIssue.issueType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Location:</span>
                <span className="font-semibold text-slate-800">{selectedIssue.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Reported By:</span>
                <span className="text-slate-700">{selectedIssue.reportedBy || 'Citizen'}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold text-[10px] block mb-1">Details:</span>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedIssue.description}
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-100">
              {selectedIssue.status !== 'Resolved' ? (
                <Button
                  variant="primary"
                  size="sm"
                  icon={Check}
                  onClick={() => {
                    resolveIssue(selectedIssue.id);
                    setSelectedIssue(null);
                  }}
                >
                  Mark as Resolved & Close
                </Button>
              ) : (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Issue Closed & Archived
                </span>
              )}
              <Button variant="secondary" size="sm" onClick={() => setSelectedIssue(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminIssuesPage;

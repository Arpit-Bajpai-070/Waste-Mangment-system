import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Shield, Bell, Database, RefreshCw, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminSettingsPage = () => {
  const { resetDemoData, addToast } = useApp();

  const handleSave = () => {
    addToast('Settings Saved', 'Municipal operational parameters updated.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System & Municipal Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure response thresholds, automated SMS alerts, and database cache.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Bell className="h-4 w-4 text-emerald-600" /> Dispatch Thresholds & SLA
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800">Priority Request Target Resolution</span>
                <p className="text-slate-500">Maximum hours before auto-escalation to Chief Engineer</p>
              </div>
              <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800">
                <option>4 Hours</option>
                <option>6 Hours</option>
                <option>12 Hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <span className="font-semibold text-slate-800">Automated Resident SMS Updates</span>
                <p className="text-slate-500">Send driver proximity SMS when within 2 km of location</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-emerald-600 rounded" />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Database className="h-4 w-4 text-emerald-600" /> Demonstration Data Controls
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-800">Reset Local Storage & Seed Records</span>
              <p className="text-xs text-slate-500">Restores default demo requests, issues, and mock users</p>
            </div>
            <Button variant="secondary" size="sm" icon={RefreshCw} onClick={resetDemoData}>
              Reset Demo Data
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button variant="primary" size="md" onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;

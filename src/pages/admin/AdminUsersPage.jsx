import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, UserCheck, Shield, Phone, Star, Truck, Award } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminUsersPage = () => {
  const { workers, stats } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Users className="h-4 w-4" /> Personnel & Field Operators
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Sanitation Crew & Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Active municipal waste management leads, heavy vehicle drivers, and rapid eco-squad teams.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workers.map((w) => (
          <div
            key={w.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-emerald-300 transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-base shadow-xs">
                  {w.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{w.name}</h4>
                  <p className="text-xs text-slate-500">{w.role}</p>
                </div>
              </div>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                {w.id}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Team:</span>
                <span className="font-semibold text-slate-800">{w.team}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-medium text-slate-800">{w.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Performance Rating:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                  {w.rating} / 5.0
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Current Task Load:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                {w.activeTasks} Dispatched
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;

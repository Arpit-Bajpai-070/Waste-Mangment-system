import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Phone, MapPin, Building, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import Button from '../../components/common/Button';

const CitizenProfilePage = () => {
  const { user, requests } = useApp();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Citizen Resident Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Your registered resident credentials, neighborhood sector, and civic cleanliness record.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white font-extrabold text-2xl shadow-md shadow-emerald-600/20">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{user?.name || 'Aarav Mehta'}</h3>
            <p className="text-xs text-slate-500">{user?.email || 'citizen@vacuum.org'}</p>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Resident Guardian
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Registered Phone</span>
            <div className="text-slate-800 font-semibold">{user?.phone || '+1 (555) 890-1234'}</div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Municipal City</span>
            <div className="text-slate-800 font-semibold">{user?.city || 'Metro Vacuum'}</div>
          </div>

          <div className="sm:col-span-2 rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Assigned Sector / Area</span>
            <div className="text-slate-800 font-semibold flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-600" />
              {user?.area || 'Greenwood Avenue, Sector 4'}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-[#F0FDF4] p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-emerald-950">Civic Cleanliness Impact</h4>
            <p className="text-xs text-emerald-700 mt-0.5">
              You have submitted {requests.length} requests and helped clear ~480kg of segregated waste!
            </p>
          </div>
          <Award className="h-8 w-8 text-emerald-600 shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default CitizenProfilePage;

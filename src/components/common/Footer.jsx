import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Heart, PhoneCall, ShieldCheck, Mail, Globe, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      {/* Top Banner */}
      <div className="border-b border-slate-100 bg-[#F0FDF4]/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">24/7 Civic Cleanup Helpline</p>
              <p className="text-base font-bold text-slate-900">1800-CLEAN-CITY (1800-253-2624)</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-emerald-800">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> ISO 14001 Environmental Standard
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1">
              <Recycle className="h-4 w-4 text-emerald-600" /> 100% Zero-Landfill Target
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#166534] to-[#16A34A] text-white shadow-xs">
                <Recycle className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                CLEAN<span className="text-[#16A34A]">CITY</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
              CleanCity is an integrated civic-technology platform empowering residents and municipal authorities to maintain cleaner streets, optimize waste routing, and drive circular waste recovery.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <Globe className="h-3.5 w-3.5" /> Metro Region Operations
              </span>
              <span>•</span>
              <span>v2.4.0 Smart City Release</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Citizen Services</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/cleanup-request" className="hover:text-emerald-700 transition-colors">Request Waste Cleanup</Link>
              </li>
              <li>
                <Link to="/report-issue" className="hover:text-emerald-700 transition-colors">Report Public Hazard</Link>
              </li>
              <li>
                <Link to="/my-requests" className="hover:text-emerald-700 transition-colors">Track Request Status</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-700 transition-colors">Citizen Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Education & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Knowledge Hub</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/waste-awareness" className="hover:text-emerald-700 transition-colors">Waste Segregation Guide</Link>
              </li>
              <li>
                <Link to="/waste-awareness#dos-donts" className="hover:text-emerald-700 transition-colors">Do's & Don'ts Rules</Link>
              </li>
              <li>
                <Link to="/waste-awareness#categories" className="hover:text-emerald-700 transition-colors">Hazardous & E-Waste</Link>
              </li>
              <li>
                <Link to="/waste-awareness#compost" className="hover:text-emerald-700 transition-colors">Community Composting</Link>
              </li>
            </ul>
          </div>

          {/* Municipal Administration */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Administration</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/admin" className="hover:text-emerald-700 transition-colors">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/requests" className="hover:text-emerald-700 transition-colors">Request Dispatch Console</Link>
              </li>
              <li>
                <Link to="/admin/analytics" className="hover:text-emerald-700 transition-colors">Waste Hotspots Analytics</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-700 transition-colors">Officer Portal Access</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CleanCity Municipal Waste Management. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Civic Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Municipal Open Data</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

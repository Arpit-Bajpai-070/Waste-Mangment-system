import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  PlusCircle,
  AlertTriangle,
  ClipboardList,
  BookOpen,
  User,
  Shield,
  Layers,
  Clock,
  UserCheck,
  Activity,
  CheckCircle2,
  Users,
  BarChart3,
  Settings,
  Sparkles,
  LogOut,
  RefreshCw
} from 'lucide-react';

const Sidebar = ({ role = 'citizen', activeFilter, onSelectFilter }) => {
  const { user, logout, requests, issues, resetDemoData } = useApp();
  const navigate = useNavigate();

  const pendingRequestsCount = requests.filter(r => r.status === 'Pending').length;
  const assignedRequestsCount = requests.filter(r => r.status === 'Assigned').length;
  const inProgressCount = requests.filter(r => r.status === 'In Progress').length;
  const completedCount = requests.filter(r => r.status === 'Completed').length;
  const pendingIssuesCount = issues.filter(i => i.status === 'Pending').length;

  const citizenLinks = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Request Cleanup', to: '/cleanup-request', icon: PlusCircle, badge: 'New' },
    { name: 'Report Issue', to: '/report-issue', icon: AlertTriangle },
    { name: 'My Requests', to: '/my-requests', icon: ClipboardList, count: requests.length },
    { name: 'Waste Awareness', to: '/waste-awareness', icon: BookOpen },
    { name: 'My Profile', to: '/profile', icon: User }
  ];

  const adminLinks = [
    { name: 'Dashboard', to: '/admin', icon: LayoutDashboard },
    { name: 'All Requests', to: '/admin/requests', icon: Layers, count: requests.length },
    { name: 'Pending Requests', to: '/admin/requests?status=Pending', icon: Clock, count: pendingRequestsCount, highlight: true },
    { name: 'Assigned Requests', to: '/admin/requests?status=Assigned', icon: UserCheck, count: assignedRequestsCount },
    { name: 'In Progress', to: '/admin/requests?status=In Progress', icon: Activity, count: inProgressCount },
    { name: 'Completed', to: '/admin/requests?status=Completed', icon: CheckCircle2, count: completedCount },
    { name: 'Reported Issues', to: '/admin/issues', icon: AlertTriangle, count: pendingIssuesCount, dangerBadge: true },
    { name: 'Users & Crew', to: '/admin/users', icon: Users },
    { name: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', to: '/admin/settings', icon: Settings }
  ];

  const links = role === 'admin' ? adminLinks : citizenLinks;

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between border-r border-slate-200/80 bg-white min-h-[calc(100vh-4.5rem)] p-4">
      <div className="space-y-6">
        {/* User Card */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white font-bold text-sm shadow-xs ${role === 'admin' ? 'bg-[#166534]' : 'bg-[#16A34A]'}`}>
            {role === 'admin' ? <Shield className="h-5 w-5" /> : user?.name?.charAt(0) || 'C'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Citizen'}</h4>
            <p className="text-[11px] text-slate-500 truncate">{role === 'admin' ? 'Municipal Officer' : user?.area || 'Metro Sector 4'}</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {role === 'admin' ? 'Administration Console' : 'Citizen Services'}
          </p>

          <nav className="mt-2 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.to === '/admin' || link.to === '/dashboard'}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className="h-4 w-4 shrink-0 transition-colors group-hover:text-emerald-700" />
                    <span className="truncate">{link.name}</span>
                  </div>

                  {link.count !== undefined && (
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        link.highlight
                          ? 'bg-amber-100 text-amber-800'
                          : link.dangerBadge
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {link.count}
                    </span>
                  )}
                  {link.badge && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Shortcuts */}
      <div className="space-y-2 border-t border-slate-100 pt-4">
        {/* Reset Demo Data button */}
        <button
          onClick={resetDemoData}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
          title="Restore sample requests & issues"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Sample Data</span>
        </button>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

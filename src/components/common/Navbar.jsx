import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Recycle,
  Bell,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  PlusCircle,
  FileText,
  BookOpen,
  LayoutDashboard,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import Button from './Button';
import AdminAuthModal from './AdminAuthModal';

const Navbar = () => {
  const { user, logout, switchRole, requests, issues } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);

  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const recentNotifications = [
    { id: 1, title: 'Request #CC-8941 in Progress', desc: 'Sanitation vehicle assigned to Greenwood Ave.', time: '10m ago' },
    { id: 2, title: 'Cleanup Completed #CC-8943', desc: 'Green waste processed for composting.', time: '1h ago' },
    { id: 3, title: 'Civic Alert: Sector 4', desc: 'Scheduled electronic recycling drive this Saturday.', time: '3h ago' }
  ];

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#166534] to-[#16A34A] text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Recycle className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
              VACCUM
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Smart Waste System
            </span>
          </div>
        </Link>

        {/* Center Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-sm font-medium text-slate-600">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Home
          </Link>

          {!isAdmin ? (
            <>
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/dashboard' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Dashboard
              </Link>
              <Link
                to="/cleanup-request"
                className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/cleanup-request' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Request Cleanup
              </Link>
              <Link
                to="/my-requests"
                className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/my-requests' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Track Requests
              </Link>
              <Link
                to="/report-issue"
                className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/report-issue' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Report Issue
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/admin' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Admin Overview
              </Link>
              <Link
                to="/admin/requests"
                className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/admin/requests' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Manage Requests
              </Link>
              <Link
                to="/admin/analytics"
                className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/admin/analytics' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Analytics
              </Link>
            </>
          )}

          <Link
            to="/waste-awareness"
            className={`px-3 py-2 rounded-lg transition-colors ${location.pathname === '/waste-awareness' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Waste Awareness
          </Link>
        </nav>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher Pill (Great for immediate testing/demo) */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-full p-1 border border-slate-200/80 text-xs">
            <button
              onClick={() => {
                switchRole('citizen');
                navigate('/dashboard');
              }}
              className={`px-3 py-1 rounded-full font-medium transition-all ${!isAdmin ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Citizen View
            </button>
            <button
              onClick={() => {
                if (isAdmin) {
                  navigate('/admin');
                } else {
                  setAdminAuthModalOpen(true);
                }
              }}
              className={`px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1 ${isAdmin ? 'bg-emerald-700 text-white shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Shield className="h-3 w-3" /> Admin View
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Civic Notifications</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    {recentNotifications.length} New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 mt-1 max-h-64 overflow-y-auto">
                  {recentNotifications.map(n => (
                    <div key={n.id} className="py-2.5 px-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate(isAdmin ? '/admin/requests' : '/my-requests');
                    }}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    View All Activity →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Account or Auth CTA */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 p-1.5 pr-3 hover:bg-slate-100 transition-colors"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-white font-semibold text-xs ${isAdmin ? 'bg-emerald-800' : 'bg-emerald-600'}`}>
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">{user.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                    {isAdmin ? 'Admin' : 'Citizen'}
                  </div>
                </div>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in">
                  <div className="p-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className="mt-1 inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      {isAdmin ? 'Municipal Administrator' : 'Verified Resident'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate(isAdmin ? '/admin' : '/dashboard');
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <LayoutDashboard className="h-4 w-4 text-slate-400" />
                      {isAdmin ? 'Admin Portal' : 'My Dashboard'}
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/my-requests');
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <FileText className="h-4 w-4 text-slate-400" />
                      My Requests
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/waste-awareness');
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      Waste Segregation Guide
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                        navigate('/login');
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Quick CTA - Request Cleanup */}
          <Link to="/cleanup-request" className="hidden sm:inline-flex">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Request Cleanup
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl p-2 text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-around bg-slate-100 rounded-xl p-1 text-xs">
            <button
              onClick={() => {
                switchRole('citizen');
                setMobileMenuOpen(false);
                navigate('/dashboard');
              }}
              className={`flex-1 py-1.5 rounded-lg font-medium ${!isAdmin ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'text-slate-500'}`}
            >
              Citizen View
            </button>
            <button
              onClick={() => {
                switchRole('admin');
                setMobileMenuOpen(false);
                navigate('/admin');
              }}
              className={`flex-1 py-1.5 rounded-lg font-medium flex items-center justify-center gap-1 ${isAdmin ? 'bg-emerald-700 text-white shadow-2xs font-semibold' : 'text-slate-500'}`}
            >
              <Shield className="h-3 w-3" /> Admin View
            </button>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to={isAdmin ? '/admin' : '/dashboard'}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {isAdmin ? 'Admin Dashboard' : 'Citizen Dashboard'}
            </Link>
            <Link
              to="/cleanup-request"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Request Cleanup
            </Link>
            <Link
              to="/my-requests"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Track Requests
            </Link>
            <Link
              to="/report-issue"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Report Waste Issue
            </Link>
            {isAdmin && (
              <>
                <Link
                  to="/admin/requests"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Manage All Requests
                </Link>
                <Link
                  to="/admin/analytics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Hotspots & Analytics
                </Link>
              </>
            )}
            <Link
              to="/waste-awareness"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Waste Awareness & Education
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <Link to="/cleanup-request" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full" size="sm">
                Request Cleanup
              </Button>
            </Link>
            {user ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

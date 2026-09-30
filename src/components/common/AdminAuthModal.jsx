import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
  Building
} from 'lucide-react';
import Button from './Button';

const AdminAuthModal = ({ isOpen, onClose, onSuccess, redirectOnCancel = false }) => {
  const { login, addToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@cleancity.gov');
  const [password, setPassword] = useState('civicAdmin2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAutofill = () => {
    setEmail('admin@cleancity.gov');
    setPassword('civicAdmin2026');
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Verification check
    const isValidAdmin =
      email.trim().toLowerCase() === 'admin@cleancity.gov' ||
      email.trim().toLowerCase().includes('admin');

    if (!isValidAdmin) {
      setError('Access Denied. Only authorized @cleancity.gov administrator accounts are permitted.');
      return;
    }

    if (!password || password.length < 4) {
      setError('Please enter a valid administrator passcode.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const adminUser = login(email, password, 'admin');
      addToast('Security Clearance Verified', 'Welcome to Municipal Admin Portal, Director Sarah Vance.', 'success');
      if (onSuccess) {
        onSuccess(adminUser);
      }
      if (onClose) {
        onClose();
      }
    }, 600);
  };

  const handleCancel = () => {
    if (onClose) onClose();
    if (redirectOnCancel) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Heavy Backdrop Blur to prevent normal user peeking */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={handleCancel}
      />

      {/* Security Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl transition-all animate-in zoom-in-95 z-10 overflow-hidden">
        {/* Top security badge ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-[#166534]" />

        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          title="Cancel and return"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center space-y-3 pt-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#166534] to-[#16A34A] text-white shadow-md shadow-emerald-700/20 ring-4 ring-emerald-50">
            <Shield className="h-7 w-7" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700">
              <Lock className="h-3 w-3" /> Restricted Municipal Area
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Admin Login Required
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              Standard citizen accounts cannot access municipal operations. Please verify administrator credentials.
            </p>
          </div>
        </div>

        {/* Quick Demo Autofill Notice */}
        <div className="mt-4 rounded-2xl border border-emerald-100 bg-[#F0FDF4] p-3 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-900">Official Municipal Demo</span>
          </div>
          <button
            type="button"
            onClick={handleAutofill}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" /> Auto-Fill Admin Keys
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Admin Official Email
            </label>
            <div className="relative rounded-xl shadow-2xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cleancity.gov"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Security Passcode
            </label>
            <div className="relative rounded-xl shadow-2xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <KeyRound className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-9 pr-9 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <Button
              type="submit"
              variant="dark"
              size="md"
              loading={loading}
              icon={Shield}
              className="w-full shadow-md shadow-emerald-900/20"
            >
              Verify & Access Admin View
            </Button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-700 py-1.5 transition-colors"
            >
              Cancel & Return to Citizen Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthModal;

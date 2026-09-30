import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Recycle, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, User, CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';
import EnvironmentalScene from '../components/common/EnvironmentalScene';

const LoginPage = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('aarav.mehta@citymail.org');
  const [password, setPassword] = useState('••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const isOfficer = email.toLowerCase().includes('admin');
      const loggedIn = login(email, password, isOfficer ? 'admin' : 'citizen');
      if (loggedIn.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }, 600);
  };

  const handleQuickCitizen = () => {
    setEmail('aarav.mehta@citymail.org');
    setPassword('resident123');
    setError('');
  };

  const handleQuickAdmin = () => {
    setEmail('admin@vaccum.gov');
    setPassword('civicAdmin2026');
    setError('');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex flex-col lg:flex-row bg-white">
      {/* LEFT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Welcome */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#166534] to-[#16A34A] text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Recycle className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  VACCUM
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Smart Waste System
                </span>
              </div>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to manage your cleanup requests and access civic waste services.
            </p>
          </div>

          {/* Quick Demo Credentials Pill Box */}
          <div className="rounded-2xl border border-emerald-100 bg-[#F0FDF4] p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-800">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Quick Demo Accounts (1-Click Fill)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickCitizen}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-white py-2 px-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-2xs"
              >
                <User className="h-3.5 w-3.5 text-emerald-600" />
                Citizen (Aarav)
              </button>
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-white py-2 px-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-2xs"
              >
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                Admin (Director)
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered email.'); }} className="text-xs font-medium text-emerald-700 hover:text-emerald-800">
                  Forgot Password?
                </a>
              </div>
              <div className="relative rounded-xl shadow-2xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 cursor-pointer select-none">
                Remember this device for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full shadow-md shadow-emerald-600/20"
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to Vaccum
            </Button>
          </form>

          {/* Footer switch */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Animated Environmental Scene (Requirements 3 & 17) */}
      <div className="hidden lg:block lg:w-1/2 min-h-[580px]">
        <EnvironmentalScene />
      </div>
    </div>
  );
};

export default LoginPage;

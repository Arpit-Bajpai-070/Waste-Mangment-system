import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Recycle,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Truck,
  ShieldCheck,
  TrendingUp,
  Users,
  Compass,
  FileCheck,
  Building,
  Heart,
  ChevronRight,
  Apple,
  Package,
  Layers
} from 'lucide-react';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { WASTE_CATEGORIES } from '../data/mockData';

const LandingPage = () => {
  const { stats, requests } = useApp();
  const navigate = useNavigate();

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Register / Login',
      desc: 'Create your resident profile or sign in instantly with one-click access.',
      icon: Users
    },
    {
      step: '02',
      title: 'Select Location',
      desc: 'Pinpoint the cleanup address on our interactive smart-city civic map.',
      icon: MapPin
    },
    {
      step: '03',
      title: 'Submit Cleanup Request',
      desc: 'Specify waste category (plastic, organic, debris), attach photos, and pick a preferred time.',
      icon: FileCheck
    },
    {
      step: '04',
      title: 'Track Progress',
      desc: 'Follow live dispatch in real time from worker assignment to en-route sanitation vehicles.',
      icon: Truck
    },
    {
      step: '05',
      title: 'Get Resolution',
      desc: 'Receive proof of cleanup completion and a municipal resolution summary.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0FDF4] via-[#F8FAFC] to-[#F8FAFC] pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Soft Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
          <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-100/70 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs backdrop-blur-xs">
                <span className="flex h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
                Smart City Civic-Tech Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Keep Your City Clean.{' '}
                <span className="text-[#16A34A] block mt-1">Report. Request. Resolve.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Empowering citizens to effortlessly schedule bulk waste cleanups, report overflowing civic bins, and monitor municipal resolution in real time. Together, we build healthier, greener neighborhoods.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/cleanup-request" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" icon={Truck} className="w-full sm:w-auto shadow-md shadow-emerald-600/20">
                    Request Cleanup
                  </Button>
                </Link>
                <Link to="/report-issue" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" icon={AlertTriangle} className="w-full sm:w-auto">
                    Report an Issue
                  </Button>
                </Link>
                <Link to="/my-requests" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto text-emerald-700">
                    Track Existing
                  </Button>
                </Link>
              </div>

              {/* Citizen trust indicators */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold text-slate-900">4 hrs</div>
                  <div className="text-xs text-slate-500 font-medium">Avg Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">98.4%</div>
                  <div className="text-xs text-slate-500 font-medium">Issues Resolved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Eco Verified</div>
                </div>
              </div>
            </div>

            {/* Right Environmental Visual & Interactive Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Environmental Showcase Card */}
                <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-emerald-950/10">
                  {/* Top graphic scene */}
                  <div className="relative h-60 bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 p-6 flex flex-col justify-between text-white overflow-hidden">
                    {/* Background SVG city line */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                        <polygon points="20,180 60,60 100,180" fill="white" />
                        <rect x="120" y="40" width="70" height="160" fill="white" />
                        <rect x="210" y="80" width="50" height="120" fill="white" />
                        <polygon points="290,180 320,70 350,180" fill="white" />
                      </svg>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                        CleanCity Live Grid
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-100">
                        <span className="h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
                        Sector 4 Active
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold leading-tight">Civic Waste Resolution Center</h3>
                      <p className="text-xs text-emerald-100 mt-1">Smart sensors & GPS-tracked electric collection fleets</p>
                    </div>
                  </div>

                  {/* Dynamic interactive preview card */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest Dispatched Task</span>
                      <StatusBadge status="In Progress" size="sm" />
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 truncate">Bulk Segregated Plastic Pickup</h4>
                          <span className="text-[10px] font-mono text-slate-400">#CC-8941</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">Greenwood Avenue, Sector 4</p>
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
                          <span>Officer Rajesh Sharma (Unit 4B)</span>
                          <span>•</span>
                          <span>Est. Arrival: 15 mins</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => navigate('/cleanup-request')}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 py-2.5 px-3 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                      >
                        <FileCheck className="h-4 w-4" />
                        New Request
                      </button>
                      <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2.5 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        <Building className="h-4 w-4" />
                        Admin View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION (Requirement 2) */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#16A34A]">14,892+</div>
              <div className="mt-1 text-sm font-semibold text-slate-700">Requests Submitted</div>
              <div className="text-xs text-slate-400 mt-0.5">Across 8 municipal sectors</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#166534]">13,950+</div>
              <div className="mt-1 text-sm font-semibold text-slate-700">Requests Resolved</div>
              <div className="text-xs text-slate-400 mt-0.5">98.4% timely completion</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-600">840+ km²</div>
              <div className="mt-1 text-sm font-semibold text-slate-700">Areas Cleaned</div>
              <div className="text-xs text-slate-400 mt-0.5">Public parks, roads & zones</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">48,200+</div>
              <div className="mt-1 text-sm font-semibold text-slate-700">Active Citizens</div>
              <div className="text-xs text-slate-400 mt-0.5">Registered civic guardians</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (Requirement 2) */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Streamlined Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How CleanCity Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A transparent, 5-step civic technology workflow designed to resolve waste issues swiftly.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {howItWorksSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-emerald-200 font-mono">{s.step}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-emerald-700">
                    <span>Phase {idx + 1}</span>
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WASTE AWARENESS SECTION (Requirement 2) */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Segregation At Source
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Waste Awareness & Segregation
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Proper separation of waste is the first and most vital step towards a zero-landfill smart city.
              </p>
            </div>
            <Link to="/waste-awareness">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                Explore Full Guide
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WASTE_CATEGORIES.slice(0, 4).map((cat) => (
              <div
                key={cat.id}
                className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${cat.badgeColor}`}>
                      {cat.name}
                    </span>
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: cat.colorHex }}
                    />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/80">
                    <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Common Items:</h5>
                    <ul className="mt-2 space-y-1 text-xs text-slate-500">
                      {cat.examples.slice(0, 3).map((ex, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <Link
                    to={`/waste-awareness#${cat.id}`}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    Disposal Rules <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-r from-[#166534] to-[#16A34A] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to make your neighborhood cleaner?
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
            Submit a request in under 60 seconds. Our municipal rapid cleanup units are ready to deploy across your sector.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/cleanup-request">
              <Button variant="light" size="lg" icon={Truck}>
                Schedule Bulk Cleanup
              </Button>
            </Link>
            <Link to="/report-issue">
              <Button variant="secondary" size="lg" icon={AlertTriangle}>
                Report an Issue
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

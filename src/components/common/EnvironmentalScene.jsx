import React from 'react';
import { Sparkles, Trees, Truck, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';

const EnvironmentalScene = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-[#DCFCE7] to-[#F0FDF4] flex flex-col justify-between p-8 select-none">
      {/* Sun & Atmosphere */}
      <div className="absolute top-8 right-12 h-24 w-24 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-100 opacity-90 blur-xs shadow-lg shadow-amber-200/50" />
      <div className="absolute top-12 right-16 h-16 w-16 rounded-full bg-yellow-100/60 animate-ping duration-1000" />

      {/* Drifting Clouds */}
      <div className="absolute top-10 left-16 animate-cloud opacity-80 pointer-events-none">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="white">
          <ellipse cx="40" cy="25" rx="30" ry="15" />
          <ellipse cx="65" cy="20" rx="25" ry="18" />
          <ellipse cx="85" cy="25" rx="20" ry="14" />
        </svg>
      </div>
      <div className="absolute top-24 right-40 animate-cloud opacity-60 pointer-events-none" style={{ animationDelay: '-6s' }}>
        <svg width="90" height="30" viewBox="0 0 90 30" fill="white">
          <ellipse cx="30" cy="18" rx="20" ry="11" />
          <ellipse cx="50" cy="15" rx="18" ry="13" />
          <ellipse cx="65" cy="18" rx="15" ry="10" />
        </svg>
      </div>

      {/* Floating Eco Leaves */}
      <div className="absolute top-1/4 right-1/4 pointer-events-none animate-leaf-1 text-emerald-600">
        <Leaf className="h-6 w-6 fill-emerald-500/80 stroke-emerald-700" />
      </div>
      <div className="absolute top-1/3 left-1/3 pointer-events-none animate-leaf-2 text-teal-600">
        <Leaf className="h-5 w-5 fill-teal-400/80 stroke-teal-700" />
      </div>
      <div className="absolute top-1/2 right-16 pointer-events-none animate-leaf-1 text-green-500" style={{ animationDelay: '-3s' }}>
        <Leaf className="h-4 w-4 fill-green-400 stroke-green-600" />
      </div>

      {/* Subtle Floating Sparkles */}
      <div className="absolute top-1/3 left-16 pointer-events-none animate-particle text-amber-400">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="absolute top-1/2 left-1/4 pointer-events-none animate-particle text-emerald-400" style={{ animationDelay: '-2s' }}>
        <Sparkles className="h-4 w-4" />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md border border-white/60">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Smart City Environmental Grid 2.0
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 text-white px-3 py-1 text-xs font-medium backdrop-blur-xs shadow-xs">
          <ShieldCheck className="h-3.5 w-3.5" />
          Zero Waste Initiative
        </div>
      </div>

      {/* Center Scenic Illustration - City Skyline, Wind Turbines, Green Hills */}
      <div className="relative z-0 my-auto h-72 w-full flex items-end justify-center pointer-events-none">
        {/* Wind Turbines */}
        <div className="absolute bottom-32 left-12 flex flex-col items-center opacity-75">
          <div className="h-10 w-10 animate-spin-slow">
            <svg viewBox="0 0 40 40" className="h-full w-full text-slate-400 fill-slate-400">
              <path d="M 20 20 L 20 2 A 2 2 0 0 1 20 2 Z" stroke="currentColor" strokeWidth="2" />
              <path d="M 20 20 L 35 30 A 2 2 0 0 1 35 30 Z" stroke="currentColor" strokeWidth="2" />
              <path d="M 20 20 L 5 30 A 2 2 0 0 1 5 30 Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="h-20 w-1 bg-slate-300 rounded-full" />
        </div>

        <div className="absolute bottom-36 left-28 flex flex-col items-center opacity-60 scale-75">
          <div className="h-10 w-10 animate-spin-slow" style={{ animationDuration: '6s' }}>
            <svg viewBox="0 0 40 40" className="h-full w-full text-slate-400 fill-slate-400">
              <path d="M 20 20 L 20 2 Z" stroke="currentColor" strokeWidth="2" />
              <path d="M 20 20 L 35 30 Z" stroke="currentColor" strokeWidth="2" />
              <path d="M 20 20 L 5 30 Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="h-20 w-1 bg-slate-300 rounded-full" />
        </div>

        {/* City Skyline */}
        <svg className="absolute bottom-20 w-full h-44 opacity-80" viewBox="0 0 600 160" preserveAspectRatio="none">
          {/* Back Towers */}
          <rect x="50" y="50" width="40" height="110" rx="3" fill="#93C5FD" opacity="0.5" />
          <rect x="110" y="30" width="55" height="130" rx="3" fill="#A7F3D0" opacity="0.6" />
          <rect x="180" y="65" width="45" height="95" rx="3" fill="#BAE6FD" opacity="0.5" />
          <rect x="240" y="20" width="60" height="140" rx="4" fill="#6EE7B7" opacity="0.6" />
          <polygon points="270,5 240,20 300,20" fill="#34D399" opacity="0.7" />
          <rect x="320" y="45" width="50" height="115" rx="3" fill="#93C5FD" opacity="0.5" />
          <rect x="390" y="25" width="70" height="135" rx="3" fill="#A7F3D0" opacity="0.6" />
          <rect x="480" y="55" width="45" height="105" rx="3" fill="#BAE6FD" opacity="0.5" />

          {/* Windows / Solar Panels */}
          <line x1="250" y1="40" x2="290" y2="40" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <line x1="250" y1="60" x2="290" y2="60" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <line x1="250" y1="80" x2="290" y2="80" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <line x1="400" y1="45" x2="450" y2="45" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <line x1="400" y1="65" x2="450" y2="65" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
          <line x1="400" y1="85" x2="450" y2="85" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
        </svg>

        {/* Rolling Green Hills */}
        <svg className="absolute bottom-12 w-full h-28" viewBox="0 0 600 100" preserveAspectRatio="none">
          <path d="M 0,60 Q 150,10 320,50 T 600,30 L 600,100 L 0,100 Z" fill="#4ADE80" opacity="0.7" />
          <path d="M 0,70 Q 200,30 400,65 T 600,50 L 600,100 L 0,100 Z" fill="#22C55E" opacity="0.85" />
        </svg>

        {/* Swaying Trees */}
        <div className="absolute bottom-14 left-8 animate-sway">
          <svg width="48" height="60" viewBox="0 0 48 60">
            <rect x="22" y="32" width="4" height="28" fill="#78350F" rx="2" />
            <circle cx="24" cy="24" r="20" fill="#15803D" />
            <circle cx="18" cy="18" r="14" fill="#16A34A" />
            <circle cx="30" cy="20" r="12" fill="#22C55E" />
          </svg>
        </div>

        <div className="absolute bottom-14 left-24 animate-sway-rev" style={{ animationDelay: '0.8s' }}>
          <svg width="36" height="48" viewBox="0 0 36 48">
            <rect x="16" y="24" width="4" height="24" fill="#78350F" rx="2" />
            <circle cx="18" cy="18" r="16" fill="#166534" />
            <circle cx="14" cy="14" r="11" fill="#15803D" />
          </svg>
        </div>

        <div className="absolute bottom-14 right-14 animate-sway" style={{ animationDelay: '1.4s' }}>
          <svg width="52" height="65" viewBox="0 0 52 65">
            <rect x="24" y="36" width="5" height="29" fill="#78350F" rx="2" />
            <circle cx="26" cy="26" r="22" fill="#166534" />
            <circle cx="22" cy="18" r="15" fill="#16A34A" />
            <circle cx="32" cy="22" r="13" fill="#4ADE80" />
          </svg>
        </div>

        <div className="absolute bottom-14 right-32 animate-sway-rev">
          <svg width="40" height="52" viewBox="0 0 40 52">
            <rect x="18" y="28" width="4" height="24" fill="#78350F" rx="2" />
            <circle cx="20" cy="20" r="16" fill="#15803D" />
            <circle cx="16" cy="16" r="12" fill="#22C55E" />
          </svg>
        </div>

        {/* Clean Road */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-slate-700 shadow-md">
          {/* Animated Road Dash Lines */}
          <div className="road-stripes absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2" />
          {/* Curb */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />
        </div>

        {/* Sanitation Vehicle / Garbage Truck Driving Across */}
        <div className="absolute bottom-3 w-full overflow-hidden pointer-events-none">
          <div className="animate-truck flex items-center gap-1">
            {/* The Sanitation Truck Body */}
            <div className="relative">
              {/* Truck SVG */}
              <svg width="110" height="55" viewBox="0 0 110 55">
                {/* Waste Container Back */}
                <rect x="5" y="10" width="62" height="32" rx="4" fill="#16A34A" />
                {/* Recycling Emblem on Truck */}
                <circle cx="36" cy="26" r="10" fill="#DCFCE7" />
                <path d="M 36 20 L 40 28 L 32 28 Z" fill="#166534" />
                <path d="M 33 24 L 39 24" stroke="#166534" strokeWidth="1.5" />
                {/* Truck Cabin */}
                <path d="M 68 18 L 84 18 L 94 30 L 94 42 L 68 42 Z" fill="#0F172A" />
                {/* Cabin Windshield */}
                <polygon points="72,21 82,21 90,30 72,30" fill="#93C5FD" />
                {/* CleanCity Badge */}
                <text x="12" y="38" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">CLEANCITY</text>
                {/* Bumper & Headlights */}
                <rect x="94" y="34" width="4" height="6" rx="1" fill="#FDE047" />
                <rect x="2" y="34" width="4" height="6" rx="1" fill="#EF4444" />
                {/* Wheels */}
                <circle cx="22" cy="44" r="8" fill="#334155" />
                <circle cx="22" cy="44" r="4" fill="#E2E8F0" />
                <circle cx="54" cy="44" r="8" fill="#334155" />
                <circle cx="54" cy="44" r="4" fill="#E2E8F0" />
                <circle cx="82" cy="44" r="8" fill="#334155" />
                <circle cx="82" cy="44" r="4" fill="#E2E8F0" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Environmental Quote Card (Requirement 3 & 17) */}
      <div className="relative z-10 mx-auto max-w-md rounded-2xl border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur-md text-center">
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <HeartHandshake className="h-5 w-5" />
        </div>
        <p className="text-base font-semibold text-slate-800 leading-snug">
          “Together, we can build cleaner and healthier communities.”
        </p>
        <p className="mt-1 text-xs text-slate-500">
          CleanCity Municipal Waste Intelligence • Serving 1.2M+ Citizens
        </p>

        {/* Mini stats row */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center">
          <div>
            <div className="text-sm font-bold text-emerald-700">98.4%</div>
            <div className="text-[10px] text-slate-500">Resolution Rate</div>
          </div>
          <div>
            <div className="text-sm font-bold text-emerald-700">&lt; 4 hrs</div>
            <div className="text-[10px] text-slate-500">Avg Response</div>
          </div>
          <div>
            <div className="text-sm font-bold text-emerald-700">100%</div>
            <div className="text-[10px] text-slate-500">EV Sanitation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalScene;

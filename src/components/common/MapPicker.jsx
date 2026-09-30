import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, Check } from 'lucide-react';

const PRESET_ZONES = [
  { name: 'Greenwood Ave, Sector 4', lat: 37.7749, lng: -122.4194, zone: 'Zone A - North' },
  { name: 'Sunset Boulevard Park', lat: 37.7690, lng: -122.4467, zone: 'Zone B - West' },
  { name: 'Highland Business District', lat: 37.7833, lng: -122.4167, zone: 'Zone C - Downtown' },
  { name: 'Central Metro Station', lat: 37.7780, lng: -122.4120, zone: 'Zone D - Metro' },
  { name: 'Rosewood Suburb', lat: 37.7950, lng: -122.4050, zone: 'Zone E - East' }
];

const MapPicker = ({ selectedLocation, onSelectLocation, initialCoords }) => {
  const [coords, setCoords] = useState(initialCoords || { lat: 37.7749, lng: -122.4194 });
  const [pinPos, setPinPos] = useState({ x: 52, y: 46 }); // percentage on map
  const [isDetecting, setIsDetecting] = useState(false);

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(8, Math.min(92, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(10, Math.min(90, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
    setPinPos({ x, y });

    // Calculate simulated lat/lng
    const calculatedLat = +(37.7600 + (100 - y) * 0.00035).toFixed(4);
    const calculatedLng = +(-122.4500 + x * 0.00045).toFixed(4);
    setCoords({ lat: calculatedLat, lng: calculatedLng });

    // Closest zone
    const chosenZone = PRESET_ZONES[Math.floor((x + y) % PRESET_ZONES.length)];
    onSelectLocation(chosenZone.name, { lat: calculatedLat, lng: calculatedLng });
  };

  const handleUseCurrentGPS = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setPinPos({ x: 48, y: 52 });
      const current = { lat: 37.7749, lng: -122.4194 };
      setCoords(current);
      onSelectLocation('Greenwood Avenue, Sector 4 (Current GPS)', current);
      setIsDetecting(false);
    }, 700);
  };

  const handlePresetSelect = (preset) => {
    const index = PRESET_ZONES.findIndex(p => p.name === preset.name);
    const xPositions = [45, 25, 70, 60, 80];
    const yPositions = [50, 65, 35, 40, 25];
    setPinPos({ x: xPositions[index] || 50, y: yPositions[index] || 50 });
    setCoords({ lat: preset.lat, lng: preset.lng });
    onSelectLocation(preset.name, { lat: preset.lat, lng: preset.lng });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Compass className="h-4 w-4 text-emerald-600" /> Click on the map to set cleanup coordinates
        </span>
        <button
          type="button"
          onClick={handleUseCurrentGPS}
          disabled={isDetecting}
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
        >
          <Navigation className={`h-3.5 w-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
          {isDetecting ? 'Acquiring GPS...' : 'Use Current GPS'}
        </button>
      </div>

      {/* Interactive Map Canvas */}
      <div
        onClick={handleMapClick}
        className="relative h-64 w-full cursor-crosshair overflow-hidden rounded-2xl border-2 border-slate-200 bg-[#E2E8F0] shadow-inner select-none transition-all group"
      >
        {/* Vector Map Elements */}
        {/* Land Background */}
        <div className="absolute inset-0 bg-[#F1F5F9]" />

        {/* River Water Body */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-80" preserveAspectRatio="none" viewBox="0 0 400 200">
          <path
            d="M -20,130 C 80,110 140,160 220,140 C 300,120 340,170 420,150 L 420,220 L -20,220 Z"
            fill="#BAE6FD"
          />
          {/* Green Parks */}
          <path
            d="M 40,20 C 70,10 110,25 120,60 C 90,80 40,70 40,20 Z"
            fill="#BBF7D0"
            opacity="0.8"
          />
          <path
            d="M 280,30 C 330,20 370,40 360,80 C 320,90 270,70 280,30 Z"
            fill="#BBF7D0"
            opacity="0.8"
          />
          {/* Main Highway / Roads */}
          <line x1="0" y1="90" x2="400" y2="90" stroke="#CBD5E1" strokeWidth="8" />
          <line x1="0" y1="90" x2="400" y2="90" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="6 4" />
          <line x1="180" y1="0" x2="180" y2="200" stroke="#CBD5E1" strokeWidth="7" />
          <line x1="180" y1="0" x2="180" y2="200" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6 4" />
          <line x1="60" y1="0" x2="340" y2="200" stroke="#E2E8F0" strokeWidth="4" />
          <line x1="30" y1="160" x2="380" y2="30" stroke="#E2E8F0" strokeWidth="3" />
        </svg>

        {/* Civic Grid Labels */}
        <div className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur-xs border border-slate-200/80 shadow-2xs pointer-events-none">
          Sector 4 • Vaccum Municipal Grid
        </div>

        <div className="absolute bottom-3 right-3 rounded-md bg-slate-900/80 px-2.5 py-1 text-[11px] font-mono text-emerald-300 backdrop-blur-xs shadow-xs pointer-events-none">
          LAT: {coords.lat}° N, LNG: {coords.lng}° W
        </div>

        {/* The Clicked / Placed Location Pin */}
        <div
          className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 pointer-events-none"
          style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
        >
          {/* Pulse ring */}
          <span className="absolute -bottom-1 -left-3 h-6 w-6 rounded-full bg-emerald-500/30 animate-ping" />
          <span className="absolute -bottom-1 -left-1.5 h-3 w-3 rounded-full bg-emerald-600/60" />

          {/* Pin Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl ring-4 ring-white animate-bounce">
            <MapPin className="h-5 w-5 fill-white stroke-emerald-600" />
          </div>
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md">
            Target Location
          </div>
        </div>
      </div>

      {/* Quick Location Pills */}
      <div>
        <p className="text-xs font-medium text-slate-500 mb-1.5">Or pick a frequently requested civic zone:</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_ZONES.map(zone => {
            const isSelected = selectedLocation && selectedLocation.includes(zone.name.split(',')[0]);
            return (
              <button
                key={zone.name}
                type="button"
                onClick={() => handlePresetSelect(zone)}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition-colors ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-medium shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {zone.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapPicker;

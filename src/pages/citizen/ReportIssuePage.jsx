import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  MapPin,
  Calendar,
  Upload,
  Camera,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';
import Button from '../../components/common/Button';
import MapPicker from '../../components/common/MapPicker';
import { ISSUE_TYPES, CITY_AREAS } from '../../data/mockData';

const SAMPLE_ISSUE_PHOTOS = [
  { label: 'Overflowing Public Bin', url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80' },
  { label: 'Spilled Trash on Roadway', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Illegal Dumping Behind Wall', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80' }
];

const ReportIssuePage = () => {
  const { reportIssue } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    issueType: ISSUE_TYPES[0],
    location: CITY_AREAS[0],
    address: 'Near Central Metro Station Gate 2',
    description: '',
    date: new Date().toISOString().split('T')[0],
    priority: 'High',
    imageUrl: SAMPLE_ISSUE_PHOTOS[0].url
  });

  const [loading, setLoading] = useState(false);
  const [submittedIssue, setSubmittedIssue] = useState(null);
  const [previewImage, setPreviewImage] = useState(SAMPLE_ISSUE_PHOTOS[0].url);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (locName) => {
    setFormData(prev => ({ ...prev, location: locName }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description) {
      alert('Please provide a brief description of the waste nuisance.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newIssue = reportIssue(formData);
      setSubmittedIssue(newIssue);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 700);
  };

  if (submittedIssue) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-12 text-center shadow-xl shadow-emerald-900/5 space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Issue Report Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Report Logged Successfully
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Thank you for keeping our city clean. Your report has been dispatched to the Rapid Incident Taskforce for inspection.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-left space-y-3 max-w-md mx-auto text-xs">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <span className="text-slate-400 font-bold uppercase">Incident ID</span>
              <span className="font-mono font-bold text-slate-900">{submittedIssue.id}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <span className="text-slate-400 font-bold uppercase">Type</span>
              <span className="font-semibold text-rose-700">{submittedIssue.issueType}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <span className="text-slate-400 font-bold uppercase">Location</span>
              <span className="font-semibold text-slate-800 truncate max-w-[200px]">{submittedIssue.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold uppercase">Report Status</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-800">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                Dispatching Field Crew
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto"
            >
              Return to Dashboard
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                setSubmittedIssue(null);
                setFormData(prev => ({ ...prev, description: '' }));
              }}
              className="w-full sm:w-auto"
            >
              Report Another Issue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
          <AlertTriangle className="h-4 w-4" /> Rapid Civic Reporting
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Report a Waste Issue
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Report overflowing bins, illegal roadside dumping, or hazardous municipal litter for priority cleanup.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          {/* Issue Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Type of Waste Issue *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ISSUE_TYPES.map(type => {
                const isSelected = formData.issueType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, issueType: type }))}
                    className={`flex items-center justify-between rounded-xl p-3 border text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span>{type}</span>
                    {isSelected && <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location & Map */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Sector / Area *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                >
                  {CITY_AREAS.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Street / Landmark Reference *
                </label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. Near Bus Stop #4 or Behind Supermarket"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <MapPicker
              selectedLocation={formData.location}
              onSelectLocation={handleLocationSelect}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Description of the Issue *
            </label>
            <textarea
              required
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide exact details (e.g., bin has been overflowing for 2 days, sharp objects protruding, obstructing sidewalk)..."
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Attach Issue Photo *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center hover:border-emerald-400 transition-colors bg-slate-50/50">
                <Camera className="h-8 w-8 text-slate-400 mb-2" />
                <p className="text-xs font-medium text-slate-700">Take photo or browse file</p>
                <p className="text-[10px] text-slate-400 mt-1">Direct upload supported</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {previewImage && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-36 bg-slate-100">
                  <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                    Incident Photo
                  </span>
                </div>
              )}
            </div>

            {/* Presets */}
            <div className="pt-1">
              <p className="text-[11px] text-slate-500 mb-1 font-medium">Or choose sample incident picture:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_ISSUE_PHOTOS.map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPreviewImage(sample.url);
                      setFormData(prev => ({ ...prev, imageUrl: sample.url }));
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                      formData.imageUrl === sample.url
                        ? 'bg-rose-100 border-rose-300 text-rose-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="danger"
            size="lg"
            loading={loading}
            icon={AlertTriangle}
            className="w-full sm:w-auto px-8"
          >
            Submit Waste Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssuePage;

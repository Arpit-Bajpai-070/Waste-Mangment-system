import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Truck,
  MapPin,
  Calendar,
  Clock,
  Upload,
  Phone,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import Button from '../../components/common/Button';
import MapPicker from '../../components/common/MapPicker';
import StatusBadge from '../../components/common/StatusBadge';
import { WASTE_TYPES, CITY_AREAS } from '../../data/mockData';

const SAMPLE_WASTE_PHOTOS = [
  { label: 'Bulk Cardboard & Plastic', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Construction Renovation Debris', url: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pruned Garden Greens', url: 'https://images.unsplash.com/photo-1611288879857-410a6230f368?auto=format&fit=crop&w=800&q=80' },
  { label: 'Household Bulky Furniture', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80' }
];

const RequestCleanupPage = () => {
  const { user, createCleanupRequest } = useApp();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    wasteType: 'Plastic',
    location: CITY_AREAS[0],
    address: 'Corner of Greenwood Ave & 4th Crossway',
    description: '',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '10:00 AM - 12:00 PM',
    contactNumber: user?.phone || '+1 (555) 890-1234',
    imageUrl: SAMPLE_WASTE_PHOTOS[0].url,
    lat: 37.7749,
    lng: -122.4194
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [previewImage, setPreviewImage] = useState(SAMPLE_WASTE_PHOTOS[0].url);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (locName, coords) => {
    setFormData(prev => ({
      ...prev,
      location: locName,
      lat: coords.lat,
      lng: coords.lng
    }));
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
    if (!formData.title || !formData.address) {
      alert('Please fill out the request title and address.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newReq = createCleanupRequest(formData);
      setSubmittedData(newReq);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }, 800);
  };

  // SUCCESS SCREEN (Requirement 6)
  if (submittedData) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-12 text-center shadow-xl shadow-emerald-900/5 space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="h-10 w-10 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Request Dispatched
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cleanup Request Submitted Successfully
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Your municipal request has been registered in the smart city queue. A sanitation inspector is reviewing the volume for vehicle dispatch.
            </p>
          </div>

          {/* Submission Summary Card */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 text-left space-y-3.5 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Request ID</span>
              <span className="font-mono text-sm font-extrabold text-slate-900 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                {submittedData.id}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</span>
              <span className="text-xs font-semibold text-slate-800 text-right truncate max-w-[200px]">
                {submittedData.location}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Submitted Date</span>
              <span className="text-xs font-medium text-slate-700">
                {submittedData.submittedDate}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Status</span>
              <StatusBadge status={submittedData.status} size="sm" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Category</span>
              <span className="text-xs font-semibold text-emerald-800">
                {submittedData.wasteType}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/my-requests')}
              className="w-full sm:w-auto shadow-md shadow-emerald-600/20"
            >
              Track Request
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                setSubmittedData(null);
                setFormData(prev => ({
                  ...prev,
                  title: '',
                  description: ''
                }));
              }}
              className="w-full sm:w-auto"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // CLEANUP REQUEST FORM
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Truck className="h-4 w-4" /> Municipal Sanitation Fleet
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Request Waste Cleanup
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Schedule municipal bulk collection for residential, commercial, or construction debris.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Request Details */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-600" /> 1. Waste Details & Classification
          </h3>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Request Title *
            </label>
            <input
              type="text"
              required
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Bulk Plastic Packing Scrap from Community Fair"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Waste Type Selector Grid */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Waste Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {WASTE_TYPES.map(type => {
                const isSelected = formData.wasteType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, wasteType: type }))}
                    className={`flex items-center justify-between rounded-xl p-3 border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span>{type}</span>
                    {isSelected && <Check className="h-4 w-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Description & Approximate Volume
            </label>
            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the waste items, estimated bags/pallets, accessibility for heavy sanitation vehicle, etc."
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Section 2: Location Picker & Map */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-600" /> 2. Location & Coordinate Pinning
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Civic Sector / Neighborhood Area *
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
                Detailed Street Address *
              </label>
              <input
                type="text"
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g. Building 14, Near Community Center Park, Greenwood Ave"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Interactive Map Picker Component */}
          <div className="pt-2">
            <MapPicker
              selectedLocation={formData.location}
              onSelectLocation={handleLocationSelect}
              initialCoords={{ lat: formData.lat, lng: formData.lng }}
            />
          </div>
        </div>

        {/* Section 3: Schedule, Photo, Contact */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" /> 3. Schedule & Verification Image
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Preferred Pickup Date *
              </label>
              <input
                type="date"
                required
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Preferred Time Slot *
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="08:00 AM - 10:00 AM">Early Morning (08:00 AM - 10:00 AM)</option>
                <option value="10:00 AM - 12:00 PM">Mid-Morning (10:00 AM - 12:00 PM)</option>
                <option value="01:00 PM - 03:00 PM">Afternoon (01:00 PM - 03:00 PM)</option>
                <option value="04:00 PM - 06:00 PM">Evening (04:00 PM - 06:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Contact Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Optional Contact Number
            </label>
            <div className="relative rounded-xl shadow-2xs max-w-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <p className="text-[11px] text-slate-400">Assigned driver will notify via SMS prior to pickup.</p>
          </div>

          {/* Image Upload Zone */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Upload Waste Site Photo *
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center hover:border-emerald-400 transition-colors bg-slate-50/50">
                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                <p className="text-xs font-medium text-slate-700">Drag & drop or click to upload</p>
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {previewImage && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-36 bg-slate-100 flex items-center justify-center group">
                  <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                    Preview Attached
                  </span>
                </div>
              )}
            </div>

            {/* Quick Sample Presets */}
            <div className="pt-1">
              <p className="text-[11px] text-slate-500 mb-1.5 font-medium">Or choose a sample demonstration photo:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_WASTE_PHOTOS.map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPreviewImage(sample.url);
                      setFormData(prev => ({ ...prev, imageUrl: sample.url }));
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                      formData.imageUrl === sample.url
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-semibold'
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

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500">
            By submitting, you confirm that waste will be segregated according to municipal bylaws.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={Truck}
            className="w-full sm:w-auto shadow-md shadow-emerald-600/20 px-8"
          >
            Submit Cleanup Request
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestCleanupPage;

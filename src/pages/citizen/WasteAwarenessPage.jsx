import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  Apple,
  Package,
  Recycle,
  AlertTriangle,
  Cpu,
  HelpCircle,
  Sparkles,
  Info,
  ArrowRight
} from 'lucide-react';
import { WASTE_CATEGORIES } from '../../data/mockData';

const COMMON_ITEMS_DATABASE = [
  { item: 'Plastic Water Bottle (PET)', category: 'Recyclable Waste', bin: 'Blue / Yellow Bin', tip: 'Rinse, empty completely, and crush bottle flat.' },
  { item: 'Greasy Pizza Box with cheese', category: 'Wet / Compost Waste', bin: 'Green Bin', tip: 'Grease contaminates paper recycling; tear clean lid into dry paper.' },
  { item: 'Dry Clean Delivery Box', category: 'Dry / Recyclable Waste', bin: 'Blue Bin', tip: 'Flatten completely before placing in curbside bin.' },
  { item: 'Banana Peels & Coffee Grounds', category: 'Wet Waste', bin: 'Green Bin', tip: 'Excellent for organic compost or biogas digester.' },
  { item: 'AA / AAA Alkaline Batteries', category: 'Hazardous Waste', bin: 'Hazardous Drop-off', tip: 'Never toss in general trash; store in dry container for hazardous drive.' },
  { item: 'Broken Smartphone & Chargers', category: 'Electronic Waste (E-Waste)', bin: 'E-Waste Hub', tip: 'Wipe personal data; drop off at certified municipal e-waste center.' },
  { item: 'Fluorescent CFL Tube Light', category: 'Hazardous Waste', bin: 'Special Handling', tip: 'Contains toxic mercury vapor; handle without shattering.' },
  { item: 'Aluminum Soda Can', category: 'Recyclable Waste', bin: 'Blue Bin', tip: 'Infinite recycling life; rinse lightly.' },
  { item: 'Glass Jam Jar', category: 'Dry / Recyclable Waste', bin: 'Blue Bin', tip: 'Rinse glass jar; metal lid can be recycled separately.' },
  { item: 'Expired Medications & Syringes', category: 'Hazardous Waste', bin: 'Medical Return Box', tip: 'Do not flush down toilets; hand to pharmacy drop-off box.' },
  { item: 'Used Cooking Oil & Grease', category: 'Hazardous / Wet Special', bin: 'Grease Container', tip: 'Pour into sealed jar; never dump into sewer pipes.' },
  { item: 'Old Laptop Computer', category: 'Electronic Waste (E-Waste)', bin: 'E-Waste Drive', tip: 'Remove hard drive or wipe disk before dropping at collection depot.' }
];

const WasteAwarenessPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredItems = COMMON_ITEMS_DATABASE.filter(i =>
    i.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'wet': return Apple;
      case 'dry': return Package;
      case 'recyclable': return Recycle;
      case 'hazardous': return AlertTriangle;
      case 'ewaste': return Cpu;
      default: return Package;
    }
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#166534] via-[#15803D] to-[#16A34A] p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5" />
            Citizen Education & Segregation Standards
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Waste Segregation Guide
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Sorting waste at the source prevents 85% of refuse from reaching city landfills. Understand categories, proper disposal methods, and circular recycling principles.
          </p>

          {/* Quick Search Tool */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-800">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Can I recycle this? (e.g. pizza box, battery, milk jug, phone)..."
                className="block w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-lg placeholder:text-slate-400 focus:outline-hidden focus:ring-4 focus:ring-emerald-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Item Lookup Results */}
      {searchTerm && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Search Results for “{searchTerm}” ({filteredItems.length} items found)
            </h3>
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Clear Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-slate-800">{item.item}</h4>
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    {item.bin}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">{item.category}</div>
                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                  💡 {item.tip}
                </p>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="text-xs text-slate-500 py-4 text-center">
              No direct matches found. For non-standard items, please file a request with photo under “Other Waste”.
            </p>
          )}
        </div>
      )}

      {/* FIVE CORE WASTE CATEGORIES (Requirement 13) */}
      <div id="categories" className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Five Municipal Streams</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Understanding Waste Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WASTE_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            return (
              <div
                key={cat.id}
                id={cat.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-all space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm"
                      style={{ backgroundColor: cat.colorHex }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${cat.badgeColor}`}>
                      {cat.name}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">{cat.description}</p>
                  </div>

                  {/* Examples */}
                  <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Common Household Examples:
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {cat.examples.map((ex, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Proper Disposal Instructions */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Disposal Protocol:
                    </span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {cat.instructions}
                    </p>
                  </div>
                </div>

                {/* Mini Do's & Don'ts */}
                <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px]">
                  <div className="flex items-start gap-1.5 text-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Do:</strong> {cat.doList[0]}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-rose-800">
                    <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span><strong>Don't:</strong> {cat.dontList[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DO'S AND DON'TS SECTION (Requirement 13) */}
      <div id="dos-donts" className="space-y-6 pt-6 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Rules of the Road
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Do's and Don'ts of Waste Disposal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Follow these essential community guidelines to maintain public hygiene and accelerate recycling efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DO'S CARD */}
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/40 p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <CheckCircle2 className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-950">DO'S (Civic Best Practices)</h3>
                <p className="text-xs text-emerald-700">Follow these practices every day</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700">
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Segregate at Source into 3 Bins</strong>
                  Keep wet compostables, dry paper/plastics, and hazardous items strictly separate.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Rinse Containers Lightly</strong>
                  Wash out leftover milk, sauce, or beverage residue from recyclable plastics and cans.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Flatten Cardboard & Plastic Bottles</strong>
                  Crush packaging flat to conserve 60% more space in curbside collection trucks.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Schedule Bulk Cleanup for Renovations</strong>
                  Never dump concrete, tiles, or furniture on street curbs; use our Vaccum request form.
                </div>
              </li>
            </ul>
          </div>

          {/* DON'TS CARD */}
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/40 p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-md shadow-rose-600/20">
                <XCircle className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-950">DON'TS (Violations to Avoid)</h3>
                <p className="text-xs text-rose-700">Actions that lead to fines and contamination</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700">
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Do NOT Mix Hazardous Items in General Trash</strong>
                  Never toss lithium batteries, paints, or CFL lights into regular bins; they cause landfill fires.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Do NOT Throw Greasy Boxes into Recycling</strong>
                  Food grease ruins entire batches of recycled paper fibers; compost food boxes instead.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Do NOT Openly Burn Yard Waste or Leaves</strong>
                  Open incineration is strictly banned and triggers heavy municipal penalties.
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Do NOT Pour Hot Oils Down Sinks or Storm Drains</strong>
                  Fats, oils, and grease (FOG) solidify into massive fatbergs that choke municipal sewers.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteAwarenessPage;

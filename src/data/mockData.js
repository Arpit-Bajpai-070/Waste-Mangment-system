// Mock database and seed data for Vaccum Smart Waste Management System

export const INITIAL_WORKERS = [
  { id: 'W-101', name: 'Rajesh Sharma', role: 'Senior Sanitation Lead', team: 'Eco-Squad Unit 4B', phone: '+1 (555) 234-8901', rating: 4.9, activeTasks: 2 },
  { id: 'W-102', name: 'Marcus Vance', role: 'Heavy Waste Operator', team: 'Civic Rapid Response 2', phone: '+1 (555) 456-1122', rating: 4.8, activeTasks: 1 },
  { id: 'W-103', name: 'Elena Rostova', role: 'Biohazard & E-Waste Specialist', team: 'GreenZone Taskforce', phone: '+1 (555) 789-3344', rating: 5.0, activeTasks: 1 },
  { id: 'W-104', name: 'David Chen', role: 'Municipal Route Inspector', team: 'Metro Cleanliness Sector A', phone: '+1 (555) 321-9988', rating: 4.7, activeTasks: 0 },
  { id: 'W-105', name: 'Aisha Noor', role: 'Recycling Fleet Coordinator', team: 'Circular Economy Unit 1', phone: '+1 (555) 654-7711', rating: 4.9, activeTasks: 1 }
];

export const INITIAL_REQUESTS = [
  {
    id: 'CC-8941',
    title: 'Bulk Plastic & Cardboard Disposal',
    citizenName: 'Aarav Mehta',
    citizenEmail: 'aarav.mehta@citymail.org',
    citizenPhone: '+1 (555) 890-1234',
    location: 'Greenwood Avenue, Sector 4',
    address: 'Building 14, Near Community Center Park, Greenwood Ave',
    lat: 37.7749,
    lng: -122.4194,
    wasteType: 'Plastic',
    description: 'Post-community fair cleanup with approx 12 bags of segregated plastic bottles, shrink wraps, and flat-packed cardboard boxes.',
    preferredDate: '2026-10-02',
    preferredTime: '10:00 AM - 12:00 PM',
    submittedDate: '2026-09-28',
    status: 'In Progress', // Pending, Assigned, In Progress, Completed, Rejected
    priority: 'Medium',
    assignedWorker: 'Rajesh Sharma',
    assignedWorkerId: 'W-101',
    expectedCompletion: '2026-10-02 12:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    timeline: [
      { step: 'Submitted', time: '2026-09-28 09:15 AM', note: 'Request registered by citizen Aarav Mehta.' },
      { step: 'Under Review', time: '2026-09-28 11:30 AM', note: 'Municipal officer reviewed waste categorization and volume.' },
      { step: 'Assigned', time: '2026-09-29 08:45 AM', note: 'Assigned to Officer Rajesh Sharma (Eco-Squad Unit 4B).' },
      { step: 'Cleanup in Progress', time: '2026-09-30 08:30 AM', note: 'Sanitation vehicle en route with compacting unit.' }
    ]
  },
  {
    id: 'CC-8942',
    title: 'Debris from Home Renovation',
    citizenName: 'Sophia Lin',
    citizenEmail: 'sophia.lin@outlook.com',
    citizenPhone: '+1 (555) 432-8877',
    location: 'Sunset Boulevard Park',
    address: 'Corner of Sunset Blvd & 8th Crossway',
    lat: 37.7690,
    lng: -122.4467,
    wasteType: 'Construction Waste',
    description: 'Drywall scraps, broken ceramic tiles, and masonry chunks left neatly boxed along the driveway curb.',
    preferredDate: '2026-10-03',
    preferredTime: '02:00 PM - 04:00 PM',
    submittedDate: '2026-09-29',
    status: 'Assigned',
    priority: 'High',
    assignedWorker: 'Marcus Vance',
    assignedWorkerId: 'W-102',
    expectedCompletion: '2026-10-03 04:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=800&q=80',
    timeline: [
      { step: 'Submitted', time: '2026-09-29 02:20 PM', note: 'Request filed via Vaccum Portal.' },
      { step: 'Under Review', time: '2026-09-29 03:00 PM', note: 'Heavy waste permits validated.' },
      { step: 'Assigned', time: '2026-09-29 04:10 PM', note: 'Dispatched to Heavy Waste Operator Marcus Vance.' }
    ]
  },
  {
    id: 'CC-8943',
    title: 'Pruned Tree Branches & Garden Greens',
    citizenName: 'Michael Sterling',
    citizenEmail: 'michael.sterling@homemail.net',
    citizenPhone: '+1 (555) 678-2233',
    location: 'Highland Business District',
    address: '88 Highland Corporate Plaza, Rear Service Alley',
    lat: 37.7833,
    lng: -122.4167,
    wasteType: 'Organic Waste',
    description: 'Seasonal tree trimming clippings, shrub clippings, and dead palm fronds gathered for civic composting.',
    preferredDate: '2026-10-01',
    preferredTime: '08:00 AM - 10:00 AM',
    submittedDate: '2026-09-27',
    status: 'Completed',
    priority: 'Low',
    assignedWorker: 'Aisha Noor',
    assignedWorkerId: 'W-105',
    expectedCompletion: '2026-09-28 11:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1611288879857-410a6230f368?auto=format&fit=crop&w=800&q=80',
    timeline: [
      { step: 'Submitted', time: '2026-09-27 10:00 AM', note: 'Request logged.' },
      { step: 'Under Review', time: '2026-09-27 11:15 AM', note: 'Approved for compost collection.' },
      { step: 'Assigned', time: '2026-09-27 01:00 PM', note: 'Assigned to Circular Economy Unit.' },
      { step: 'Cleanup in Progress', time: '2026-09-28 09:10 AM', note: 'Green-waste compactor deployed.' },
      { step: 'Completed', time: '2026-09-28 10:45 AM', note: 'Successfully transported to City Organic Composting Plant.' }
    ]
  },
  {
    id: 'CC-8944',
    title: 'Obsolete Electronics & Computer Monitors',
    citizenName: 'Aarav Mehta',
    citizenEmail: 'aarav.mehta@citymail.org',
    citizenPhone: '+1 (555) 890-1234',
    location: 'Old Market Square',
    address: 'Shop 22, Old Bazaar Arcade, Market Square',
    lat: 37.7580,
    lng: -122.4200,
    wasteType: 'Other',
    description: 'Safe disposal needed for 4 old CRT monitors, broken printers, laptop batteries, and tangle of cables.',
    preferredDate: '2026-10-04',
    preferredTime: '11:00 AM - 01:00 PM',
    submittedDate: '2026-09-30',
    status: 'Pending',
    priority: 'Medium',
    assignedWorker: 'Unassigned',
    assignedWorkerId: null,
    expectedCompletion: 'Pending dispatch',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    timeline: [
      { step: 'Submitted', time: '2026-09-30 08:15 AM', note: 'Request submitted. Awaiting municipal officer review.' }
    ]
  },
  {
    id: 'CC-8945',
    title: 'Discarded Furniture & Mattresses',
    citizenName: 'Camila Rodriguez',
    citizenEmail: 'camila.r@civic.org',
    citizenPhone: '+1 (555) 912-3456',
    location: 'Rosewood Suburb',
    address: '402 Rosewood Lane, Near Elementary School',
    lat: 37.7950,
    lng: -122.4050,
    wasteType: 'General Waste',
    description: 'Two old spring mattresses and a dismantled wooden wardrobe placed on private curb for municipal pickup.',
    preferredDate: '2026-10-02',
    preferredTime: '01:00 PM - 03:00 PM',
    submittedDate: '2026-09-29',
    status: 'In Progress',
    priority: 'Medium',
    assignedWorker: 'David Chen',
    assignedWorkerId: 'W-104',
    expectedCompletion: '2026-10-02 03:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    timeline: [
      { step: 'Submitted', time: '2026-09-29 09:30 AM', note: 'Request submitted.' },
      { step: 'Under Review', time: '2026-09-29 11:00 AM', note: 'Approved for large bulk vehicle.' },
      { step: 'Assigned', time: '2026-09-29 01:20 PM', note: 'Officer David Chen assigned.' },
      { step: 'Cleanup in Progress', time: '2026-09-30 09:00 AM', note: 'Collection vehicle arriving in sector.' }
    ]
  },
  {
    id: 'CC-8946',
    title: 'Hospitality Packaging Mixed Waste',
    citizenName: 'Liam O’Connor',
    citizenEmail: 'liam.oc@bistrogreen.com',
    citizenPhone: '+1 (555) 777-6655',
    location: 'Central Metro Station',
    address: 'North Concourse Entrance, Station Plaza',
    lat: 37.7780,
    lng: -122.4120,
    wasteType: 'Mixed Waste',
    description: 'Post-event catering surplus, cardboard food packaging, beverage cartons, and assorted dry food containers.',
    preferredDate: '2026-10-01',
    preferredTime: '04:00 PM - 06:00 PM',
    submittedDate: '2026-09-30',
    status: 'Pending',
    priority: 'High',
    assignedWorker: 'Unassigned',
    assignedWorkerId: null,
    expectedCompletion: 'Awaiting scheduling',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    timeline: [
      { step: 'Submitted', time: '2026-09-30 07:45 AM', note: 'Citizen filed urgent cleanup request for metro concourse.' }
    ]
  },
  {
    id: 'CC-8947',
    title: 'Paint Cans & Chemical Solvent Containers',
    citizenName: 'Nadia Thorne',
    citizenEmail: 'nadia.thorne@gmail.com',
    citizenPhone: '+1 (555) 345-9876',
    location: 'Sunset Boulevard Park',
    address: 'Behind Community Workshop Bay 3',
    lat: 37.7710,
    lng: -122.4490,
    wasteType: 'Other',
    description: 'Household paint residues, half-empty thinner cans, and mineral spirits that require hazardous material handling.',
    preferredDate: '2026-10-05',
    preferredTime: '09:00 AM - 11:00 AM',
    submittedDate: '2026-09-26',
    status: 'Completed',
    priority: 'High',
    assignedWorker: 'Elena Rostova',
    assignedWorkerId: 'W-103',
    expectedCompletion: '2026-09-28 01:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1574974671999-24b7dfba0d53?auto=format&fit=crop&w=800&q=80',
    timeline: [
      { step: 'Submitted', time: '2026-09-26 11:00 AM', note: 'Hazardous category flagged.' },
      { step: 'Under Review', time: '2026-09-26 12:30 PM', note: 'Special containment unit verified.' },
      { step: 'Assigned', time: '2026-09-27 09:00 AM', note: 'Officer Elena Rostova assigned.' },
      { step: 'Cleanup in Progress', time: '2026-09-27 10:15 AM', note: 'Loaded into certified hazardous carrier.' },
      { step: 'Completed', time: '2026-09-27 03:00 PM', note: 'Neutralized and safely stored at Regional Disposal Facility.' }
    ]
  },
  {
    id: 'CC-8948',
    title: 'Commercial Kitchen Grease Traps & Spoiled Produce',
    citizenName: 'Chef Antoine',
    citizenEmail: 'antoine@bistrocivic.fr',
    citizenPhone: '+1 (555) 431-7788',
    location: 'Highland Business District',
    address: '344 Highland Terrace',
    lat: 37.7812,
    lng: -122.4180,
    wasteType: 'Organic Waste',
    description: 'Non-compostable food grease and expired kitchen supplies requiring specific wet-waste sanitation.',
    preferredDate: '2026-09-25',
    preferredTime: '07:00 AM - 09:00 AM',
    submittedDate: '2026-09-24',
    status: 'Rejected',
    priority: 'Low',
    assignedWorker: 'Unassigned',
    assignedWorkerId: null,
    expectedCompletion: 'N/A',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    timeline: [
      { step: 'Submitted', time: '2026-09-24 08:30 AM', note: 'Request submitted.' },
      { step: 'Under Review', time: '2026-09-24 10:00 AM', note: 'Rejected: Commercial grease requires certified private wastewater hauler per Municipal Code §44-B.' }
    ]
  }
];

export const INITIAL_ISSUES = [
  {
    id: 'ISS-401',
    issueType: 'Overflowing Garbage Bin',
    location: 'Central Metro Station Plaza (Gate 2)',
    description: 'Public dual-stream trash bin is overflowing onto pedestrian walkway. Pigeons and pests gathering.',
    submittedDate: '2026-09-30 08:40 AM',
    status: 'Pending',
    priority: 'High',
    reportedBy: 'Aarav Mehta',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ISS-402',
    issueType: 'Garbage on Road',
    location: 'Corner of Maple & 5th Avenue',
    description: 'Cardboard cartons and plastic debris spilled across the bicycle lane from an unsecured vehicle.',
    submittedDate: '2026-09-29 04:15 PM',
    status: 'In Progress',
    priority: 'High',
    reportedBy: 'Devon Miles',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ISS-403',
    issueType: 'Missed Collection',
    location: 'Oakwood Suburb - Sector 9 Residential',
    description: 'Weekly curbside recycling was missed on Tuesday for even-numbered houses on Oakwood Drive.',
    submittedDate: '2026-09-29 11:20 AM',
    status: 'Resolved',
    priority: 'Medium',
    reportedBy: 'Hannah Vance',
    imageUrl: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ISS-404',
    issueType: 'Illegal Dumping',
    location: 'Vacant Lot behind Riverfront Warehouse',
    description: 'Several old tires and construction gypsum boards dumped overnight by an unknown truck.',
    submittedDate: '2026-09-28 07:50 AM',
    status: 'In Progress',
    priority: 'Urgent',
    reportedBy: 'Officer Chen',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
  }
];

export const WASTE_CATEGORIES = [
  {
    id: 'wet',
    name: 'Wet Waste',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    colorHex: '#16A34A',
    iconName: 'Apple',
    description: 'Biodegradable organic matter that decomposes naturally and can be turned into nutrient-rich compost.',
    examples: ['Fruit & vegetable peels', 'Leftover food scraps', 'Coffee grounds & tea bags', 'Egg shells & bones', 'Fallen leaves & garden clippings'],
    instructions: 'Collect in green bins. Avoid mixing with plastic bags or wrappers. Can be converted into home or city compost.',
    doList: ['Drain excess liquids before disposal', 'Use compostable bin liners or newspapers', 'Keep bin lid tightly closed'],
    dontList: ['Do not mix plastic cutlery or sachets', 'Do not dump diapers or sanitary items', 'Avoid pouring heavy cooking oils']
  },
  {
    id: 'dry',
    name: 'Dry Waste',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    colorHex: '#2563EB',
    iconName: 'Package',
    description: 'Non-biodegradable, clean, and dry items that do not decay and can be processed or recycled.',
    examples: ['Newspapers & office paper', 'Cardboard delivery boxes', 'Glass jars & bottles', 'Metal tins & aluminum foil', 'Rubber & dried wood'],
    instructions: 'Dispose in blue bins. Ensure items are free of food residue to prevent foul odors and contamination.',
    doList: ['Flatten cardboard boxes to save space', 'Rinse food jars lightly and air dry', 'Keep separate from organic waste'],
    dontList: ['Do not throw wet or grease-soaked paper', 'Avoid mixing shattered ceramics', 'Do not throw chemical bottles here']
  },
  {
    id: 'recyclable',
    name: 'Recyclable Waste',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    colorHex: '#0D9488',
    iconName: 'Recycle',
    description: 'Valuable secondary raw materials that can be remanufactured into new sustainable goods.',
    examples: ['PET beverage bottles', 'HDPE milk jugs', 'Aluminum soda cans', 'Clean corrugated cartons', 'Shredded clean paper'],
    instructions: 'Empty, rinse, and crush. Place in dedicated recycling collection bins or schedule municipal pickup.',
    doList: ['Check the resin identification code (1, 2, 5)', 'Remove bottle caps if non-recyclable', 'Bundle clean papers together'],
    dontList: ['Do not recycle dirty pizza boxes with cheese', 'Do not include bubble wrap in standard bins', 'Never bag recyclables in black trash sacks']
  },
  {
    id: 'hazardous',
    name: 'Hazardous Waste',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    colorHex: '#E11D48',
    iconName: 'AlertTriangle',
    description: 'Toxic, flammable, corrosive, or reactive materials that pose serious risks to human health and groundwater.',
    examples: ['Paint thinners & varnish', 'Lead-acid & lithium batteries', 'Pesticides & weed killers', 'Fluorescent CFL bulbs', 'Medical sharps & expired pills'],
    instructions: 'Must NEVER be thrown into household trash. Hand over to specialized hazardous waste drives or request special pickup.',
    doList: ['Keep in original labeled containers', 'Store in a cool, ventilated area away from children', 'Schedule certified municipal hazard collection'],
    dontList: ['Never pour chemicals down storm drains', 'Never burn batteries or aerosol cans', 'Do not mix different chemical cleaners']
  },
  {
    id: 'ewaste',
    name: 'Electronic Waste (E-Waste)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    colorHex: '#9333EA',
    iconName: 'Cpu',
    description: 'Discarded electrical or electronic equipment containing valuable precious metals as well as heavy metals.',
    examples: ['Old smartphones & tablets', 'Broken laptops & monitors', 'Cables, chargers & adapters', 'Household appliances', 'Circuit boards & RAM'],
    instructions: 'Hand over to authorized e-waste dismantling facilities through Vaccum scheduled e-waste collection drives.',
    doList: ['Wipe personal digital data before disposal', 'Remove detachable batteries safely', 'Keep appliances intact to avoid lead leakage'],
    dontList: ['Never throw electronic devices into general trash', 'Never break open CRT displays or batteries', 'Do not dismantle components without protection']
  }
];

export const CITY_AREAS = [
  'Greenwood Avenue, Sector 4',
  'Sunset Boulevard Park',
  'Highland Business District',
  'Old Market Square',
  'Rosewood Suburb',
  'Central Metro Station',
  'Riverfront Commercial Port',
  'Lakeside University Campus'
];

export const WASTE_TYPES = [
  'General Waste',
  'Plastic',
  'Construction Waste',
  'Organic Waste',
  'Mixed Waste',
  'Other'
];

export const ISSUE_TYPES = [
  'Overflowing Garbage Bin',
  'Garbage on Road',
  'Missed Collection',
  'Illegal Dumping',
  'Open Waste Area',
  'Other'
];

# Vaccum – Smart Waste Management System

A modern, responsive, and professional frontend for **Vaccum**, an enterprise-grade civic-technology platform empowering citizens and municipal sanitation authorities to collaborate on cleaner, healthier urban environments.

---

## 🌟 Highlights & Key Features

### 1. **Visual Environmental Scene (Login / Register)**
- **Animated Environmental Canvas**: Designed with pure CSS and SVG featuring:
  - Clean green city skyline with solar-paneled towers.
  - Swaying lush trees and drifting clouds.
  - Floating eco leaves and ambient particles.
  - An animated **Vaccum Electric Sanitation Truck** with rotating wheels and zero-emission branding smoothly traversing a clean road.
  - Moving quote: *“Together, we can build cleaner and healthier communities.”*
- **1-Click Quick Demo Login**: Toggle between citizen (`Aarav Mehta`) and admin (`Director Sarah Vance`) credentials with a single click.

### 2. **Citizen Portal**
- **Landing Page**:
  - Hero headline: *"Keep Your City Clean. Report. Request. Resolve."*
  - Key municipal statistics: 14,892+ Requests Submitted, 13,950+ Resolved, 840+ km² Cleaned, 48,200+ Active Citizens.
  - 5-Step **How It Works** roadmap (Register ➔ Select Location ➔ Submit Request ➔ Track Progress ➔ Get Resolution).
  - Waste Segregation category previews.
- **Citizen Dashboard**:
  - Personalized greeting with verified resident badge.
  - Statistics cards: Total Requests, Pending, In Progress, Resolved.
  - Prominent CTA: *"Need an area cleaned? Create Cleanup Request"*.
  - Recent requests table with status badges and quick modal view.
- **Request Waste Cleanup**:
  - Request title, waste classification selector (General, Plastic, Construction, Organic, Mixed, Other).
  - **Interactive Map Picker**: Click-to-pinpoint coordinate selector, simulated GPS detector button (*"Use Current GPS"*), and preset civic zones.
  - Date & preferred time slot picker.
  - Image uploader with live drag-and-drop preview and sample presets.
  - **Confetti Celebration & Success Screen** with Request ID and quick tracking shortcut.
- **Report Waste Issue**:
  - Fast reporting for civic hazards: Overflowing Garbage Bin, Garbage on Road, Missed Collection, Illegal Dumping, Open Waste Area.
  - Photo attachment & map tagging with immediate confirmation.
- **My Requests & Live Tracking**:
  - Visual 5-step milestone timeline:
    `Submitted` ➔ `Under Review` ➔ `Assigned` ➔ `Cleanup in Progress` ➔ `Completed`.
  - Filter tabs (All, Pending, Assigned, In Progress, Completed).
  - Search bar by Request ID, title, or area.
  - Full request modal with worker assignments, timestamps, and audit event logs.
- **Waste Awareness & Segregation Hub**:
  - Deep-dive guides for **Wet Waste**, **Dry Waste**, **Recyclable Waste**, **Hazardous Waste**, and **Electronic Waste (E-Waste)**.
  - Interactive **"Can I Recycle This?"** instant item search tool.
  - Comprehensive **Do's & Don'ts** guide with practical municipal rules.

### 3. **Admin Municipal Dashboard & Management**
- **Admin Dashboard**:
  - Municipal KPI metrics: Total Requests, Pending, In Progress, Completed, Reported Issues, Registered Citizens.
  - Real-time **Weekly Trend Curve Chart** (SVG intake vs resolved).
  - Radial **Resolution Rate & SLA Gauge** (98.4% timely resolution).
  - Priority dispatch queue with single-click crew assignment.
- **All Requests Management Console**:
  - Full table with Request ID, Citizen, Location, Waste Type, Date, Priority, Status, Assigned Officer, and Actions.
  - Status lifecycle management: `Pending` ➔ `Assigned` ➔ `In Progress` ➔ `Completed`.
  - Multi-filtering by Status, Area, Waste Type, and Search query.
  - Assign worker modal with real-time sanitation squad roster.
  - Confirmation dialogs for critical actions (Marking Complete, Rejecting).
- **Hotspots & Analytics**:
  - **Waste Hotspots Section**: Identifies critical complaint zones (Central Metro Plaza, Highland Corridor, Sunset Park) with complaint frequency, risk level, and patrol schedules.
  - Monthly trend comparisons and Landfill Diversion metrics.
- **Civic Hazards & Incidents**:
  - Review public hazard complaints and click **"Mark Resolved"** to dispatch crews and clear reports.

---

## 🎨 Design System & Palette

- **Primary Green**: `#16A34A`
- **Dark Green**: `#166534`
- **Light Green**: `#DCFCE7`
- **Background**: `#F8FAFC`
- **Text Main**: `#0F172A`
- **Secondary Text**: `#64748B`
- **White**: `#FFFFFF`
- **Typography**: Inter & Poppins via Google Fonts
- **Aesthetic**: Modern civic-tech, rounded cards, soft shadows, micro-interactions, responsive across mobile, tablet, and desktop.

---

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://127.0.0.1:5173/
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx               # Flexible button with loading states
│   │   ├── ConfirmationDialog.jsx   # Modal confirmation for actions
│   │   ├── EnvironmentalScene.jsx   # Animated SVG scene (skyline, truck, trees)
│   │   ├── Footer.jsx               # Civic-tech footer with helpline
│   │   ├── MapPicker.jsx            # Interactive click-to-pin map
│   │   ├── Modal.jsx                # Accessible popup dialog
│   │   ├── Navbar.jsx               # Navigation bar with role toggle
│   │   ├── Sidebar.jsx              # Responsive sidebar for citizen & admin
│   │   ├── StatCard.jsx             # Key metric card
│   │   ├── StatusBadge.jsx          # Color-coded status badge with pulse dot
│   │   └── ToastContainer.jsx       # Global toast notification stack
│   └── layout/
│       ├── AdminLayout.jsx          # Admin portal shell
│       ├── CitizenLayout.jsx        # Citizen portal shell
│       └── PublicLayout.jsx         # Public landing shell
├── context/
│   └── AppContext.jsx               # State management with localStorage sync
├── data/
│   └── mockData.js                  # Realistic seed requests, workers, issues
├── pages/
│   ├── LandingPage.jsx              # Hero, stats, how it works, CTAs
│   ├── LoginPage.jsx                # Split-screen login with animated scene
│   ├── RegisterPage.jsx             # Citizen registration with validation
│   ├── citizen/
│   │   ├── CitizenProfilePage.jsx   # Resident profile
│   │   ├── MyRequestsPage.jsx       # Visual tracking timeline & filter
│   │   ├── ReportIssuePage.jsx      # Rapid civic hazards reporting
│   │   ├── RequestCleanupPage.jsx   # Bulk waste cleanup form & map
│   │   ├── UserDashboard.jsx        # Citizen home dashboard
│   │   └── WasteAwarenessPage.jsx   # Education, 5 streams, item search
│   └── admin/
│       ├── AdminAnalyticsPage.jsx   # Charts, hotspots, SLA metrics
│       ├── AdminDashboard.jsx       # Municipal control deck
│       ├── AdminIssuesPage.jsx      # Hazard reports resolution
│       ├── AdminRequestsPage.jsx    # Table management & worker dispatch
│       ├── AdminSettingsPage.jsx    # SLA & demo data controls
│       └── AdminUsersPage.jsx       # Sanitation crew roster
├── App.jsx                          # Router configuration
├── index.css                        # Tailwind v4 & custom keyframe animations
└── main.jsx                         # Application entry point
```

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import CitizenLayout from './components/layout/CitizenLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WasteAwarenessPage from './pages/citizen/WasteAwarenessPage';

// Citizen Pages
import UserDashboard from './pages/citizen/UserDashboard';
import RequestCleanupPage from './pages/citizen/RequestCleanupPage';
import ReportIssuePage from './pages/citizen/ReportIssuePage';
import MyRequestsPage from './pages/citizen/MyRequestsPage';
import CitizenProfilePage from './pages/citizen/CitizenProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRequestsPage from './pages/admin/AdminRequestsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminIssuesPage from './pages/admin/AdminIssuesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Landing Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/waste-awareness" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><WasteAwarenessPage /></div>} />
          </Route>

          {/* Citizen Routes */}
          <Route element={<CitizenLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/cleanup-request" element={<RequestCleanupPage />} />
            <Route path="/report-issue" element={<ReportIssuePage />} />
            <Route path="/my-requests" element={<MyRequestsPage />} />
            <Route path="/profile" element={<CitizenProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<AdminRequestsPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/issues" element={<AdminIssuesPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

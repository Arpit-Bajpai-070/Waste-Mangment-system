import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import ToastContainer from '../common/ToastContainer';
import AdminAuthModal from '../common/AdminAuthModal';
import { ShieldAlert, Lock, ArrowLeft, KeyRound } from 'lucide-react';
import Button from '../common/Button';

const AdminLayout = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';
  const [modalOpen, setModalOpen] = useState(!isAdmin);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <div className="flex-1 flex mx-auto w-full max-w-7xl relative">
        <Sidebar role="admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative">
          {isAdmin ? (
            <Outlet />
          ) : (
            /* Restricted State for Normal Users */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
              <div className="max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-4 ring-rose-50">
                  <ShieldAlert className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Access Restricted
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The Admin View is restricted to authorized municipal officers. Normal citizen accounts do not have permission to view city dispatch operations without administrative login.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    icon={KeyRound}
                    onClick={() => setModalOpen(true)}
                  >
                    Open Admin Login Pop-up
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    icon={ArrowLeft}
                    onClick={() => navigate('/dashboard')}
                  >
                    Back to Citizen Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
      <ToastContainer />

      {/* Admin Login Popup Modal */}
      {!isAdmin && (
        <AdminAuthModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => setModalOpen(false)}
          redirectOnCancel={true}
        />
      )}
    </div>
  );
};

export default AdminLayout;

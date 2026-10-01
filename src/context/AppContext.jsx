import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_REQUESTS, INITIAL_ISSUES, INITIAL_WORKERS } from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current user state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vacuum_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      name: 'Aarav Mehta',
      email: 'aarav.mehta@citymail.org',
      phone: '+1 (555) 890-1234',
      role: 'citizen', // 'citizen' or 'admin'
      area: 'Greenwood Avenue, Sector 4',
      city: 'Metro Vacuum'
    };
  });

  // Requests state with localStorage sync
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('vacuum_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_REQUESTS;
  });

  // Issues state with localStorage sync
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('vacuum_issues');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ISSUES;
  });

  const [workers] = useState(INITIAL_WORKERS);
  const [toasts, setToasts] = useState([]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('vacuum_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vacuum_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('vacuum_issues', JSON.stringify(issues));
  }, [issues]);

  // Toast notification system
  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth functions
  const login = (email, password, role = 'citizen') => {
    let loggedUser;
    if (role === 'admin' || email.toLowerCase().includes('admin')) {
      loggedUser = {
        name: 'Director Sarah Vance',
        email: email || 'admin@vacuum.gov',
        phone: '+1 (555) 000-8899',
        role: 'admin',
        area: 'Municipal Central HQ',
        city: 'Metro Vacuum'
      };
    } else {
      loggedUser = {
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Aarav Mehta',
        email: email || 'aarav.mehta@citymail.org',
        phone: '+1 (555) 890-1234',
        role: 'citizen',
        area: 'Greenwood Avenue, Sector 4',
        city: 'Metro Vacuum'
      };
    }
    setUser(loggedUser);
    addToast('Welcome to Vacuum', `Signed in as ${loggedUser.name} (${loggedUser.role === 'admin' ? 'Administrator' : 'Citizen'})`, 'success');
    return loggedUser;
  };

  const register = (userData) => {
    const newUser = {
      name: userData.fullName || 'Citizen User',
      email: userData.email,
      phone: userData.phone || '+1 (555) 123-4567',
      role: 'citizen',
      area: userData.area || 'Greenwood Avenue, Sector 4',
      city: userData.city || 'Metro Vacuum'
    };
    setUser(newUser);
    addToast('Registration Complete', 'Your citizen account has been successfully created!', 'success');
    return newUser;
  };

  const logout = () => {
    setUser(null);
    addToast('Signed Out', 'You have been safely logged out of Vacuum.', 'info');
  };

  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      setUser({
        name: 'Director Sarah Vance',
        email: 'admin@vacuum.gov',
        phone: '+1 (555) 000-8899',
        role: 'admin',
        area: 'Municipal Central HQ',
        city: 'Metro Vacuum'
      });
      addToast('Role Switched', 'You are now viewing as Municipal Administrator.', 'info');
    } else {
      setUser({
        name: 'Aarav Mehta',
        email: 'aarav.mehta@citymail.org',
        phone: '+1 (555) 890-1234',
        role: 'citizen',
        area: 'Greenwood Avenue, Sector 4',
        city: 'Metro Vacuum'
      });
      addToast('Role Switched', 'You are now viewing as Citizen.', 'info');
    }
  };

  // Cleanup Request actions
  const createCleanupRequest = (data) => {
    const newId = `CC-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRequest = {
      id: newId,
      title: data.title || 'Waste Cleanup Request',
      citizenName: user?.name || 'Aarav Mehta',
      citizenEmail: user?.email || 'citizen@vacuum.org',
      citizenPhone: data.contactNumber || user?.phone || '+1 (555) 000-0000',
      location: data.location || 'Greenwood Avenue, Sector 4',
      address: data.address || 'Street 1, Main Road',
      lat: data.lat || 37.7749,
      lng: data.lng || -122.4194,
      wasteType: data.wasteType || 'General Waste',
      description: data.description || 'Civic waste pickup requested.',
      preferredDate: data.preferredDate || formattedDate,
      preferredTime: data.preferredTime || '10:00 AM - 12:00 PM',
      submittedDate: formattedDate,
      status: 'Pending',
      priority: data.priority || 'Medium',
      assignedWorker: 'Unassigned',
      assignedWorkerId: null,
      expectedCompletion: 'Under review',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      timeline: [
        {
          step: 'Submitted',
          time: `${formattedDate} ${formattedTime}`,
          note: `Request registered by ${user?.name || 'citizen'}.`
        }
      ]
    };

    setRequests(prev => [newRequest, ...prev]);
    addToast('Request Submitted', `Cleanup request #${newId} submitted successfully!`, 'success');
    return newRequest;
  };

  // Report Issue action
  const reportIssue = (data) => {
    const newId = `ISS-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newIssue = {
      id: newId,
      issueType: data.issueType || 'Overflowing Garbage Bin',
      location: data.location || 'Civic Road, Sector 3',
      description: data.description || 'Public waste nuisance reported.',
      submittedDate: formattedDate,
      status: 'Pending',
      priority: data.priority || 'High',
      reportedBy: user?.name || 'Citizen User',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80'
    };

    setIssues(prev => [newIssue, ...prev]);
    addToast('Issue Logged', `Waste report #${newId} logged for municipal dispatch!`, 'success');
    return newIssue;
  };

  // Update status (Admin)
  const updateRequestStatus = (id, newStatus, assignedWorker = null, note = '') => {
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setRequests(prev => prev.map(req => {
      if (req.id !== id) return req;

      const updatedTimeline = [...req.timeline];
      let timelineStep = newStatus;
      if (newStatus === 'In Progress') timelineStep = 'Cleanup in Progress';

      updatedTimeline.push({
        step: timelineStep,
        time: timestamp,
        note: note || `Status updated to ${newStatus} by municipal administration.`
      });

      return {
        ...req,
        status: newStatus,
        assignedWorker: assignedWorker || req.assignedWorker,
        expectedCompletion: newStatus === 'Completed' ? timestamp : req.expectedCompletion,
        timeline: updatedTimeline
      };
    }));

    addToast('Status Updated', `Request #${id} marked as ${newStatus}`, 'success');
  };

  // Assign worker (Admin)
  const assignWorker = (requestId, workerId, workerName) => {
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setRequests(prev => prev.map(req => {
      if (req.id !== requestId) return req;

      const newTimeline = [...req.timeline];
      newTimeline.push({
        step: 'Assigned',
        time: timestamp,
        note: `Assigned to sanitation worker ${workerName}.`
      });

      return {
        ...req,
        status: req.status === 'Pending' ? 'Assigned' : req.status,
        assignedWorker: workerName,
        assignedWorkerId: workerId,
        timeline: newTimeline
      };
    }));

    addToast('Worker Assigned', `${workerName} assigned to Request #${requestId}`, 'success');
  };

  // Reject Request (Admin)
  const rejectRequest = (requestId, reason) => {
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setRequests(prev => prev.map(req => {
      if (req.id !== requestId) return req;
      return {
        ...req,
        status: 'Rejected',
        timeline: [
          ...req.timeline,
          {
            step: 'Rejected',
            time: timestamp,
            note: reason || 'Request rejected by municipal review.'
          }
        ]
      };
    }));

    addToast('Request Rejected', `Request #${requestId} has been rejected.`, 'info');
  };

  // Resolve reported issue (Admin)
  const resolveIssue = (issueId) => {
    setIssues(prev => prev.map(iss => iss.id === issueId ? { ...iss, status: 'Resolved' } : iss));
    addToast('Issue Resolved', `Report #${issueId} marked as resolved.`, 'success');
  };

  // Reset seed data
  const resetDemoData = () => {
    setRequests(INITIAL_REQUESTS);
    setIssues(INITIAL_ISSUES);
    localStorage.removeItem('vacuum_requests');
    localStorage.removeItem('vacuum_issues');
    addToast('Demo Reset', 'Default Vacuum demonstration data restored.', 'info');
  };

  // Computed metrics
  const stats = {
    totalRequests: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    assigned: requests.filter(r => r.status === 'Assigned').length,
    inProgress: requests.filter(r => r.status === 'In Progress').length,
    completed: requests.filter(r => r.status === 'Completed').length,
    rejected: requests.filter(r => r.status === 'Rejected').length,
    totalIssues: issues.length,
    pendingIssues: issues.filter(i => i.status === 'Pending').length,
    activeCitizens: 18420,
    areasCleanedSqKm: 840,
    resolutionRate: Math.round((requests.filter(r => r.status === 'Completed').length / (requests.length || 1)) * 100)
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        switchRole,
        requests,
        issues,
        workers,
        stats,
        toasts,
        addToast,
        removeToast,
        createCleanupRequest,
        reportIssue,
        updateRequestStatus,
        assignWorker,
        rejectRequest,
        resolveIssue,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

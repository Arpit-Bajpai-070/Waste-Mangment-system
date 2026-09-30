import React from 'react';

const StatusBadge = ({ status, size = 'md' }) => {
  const normalized = status ? status.toLowerCase() : 'pending';

  let badgeStyles = 'bg-amber-50 text-amber-800 border-amber-200';
  let dotColor = 'bg-amber-500';

  if (normalized === 'completed' || normalized === 'resolved') {
    badgeStyles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (normalized === 'in progress' || normalized === 'cleanup in progress') {
    badgeStyles = 'bg-blue-50 text-blue-800 border-blue-200';
    dotColor = 'bg-blue-500 animate-pulse';
  } else if (normalized === 'assigned') {
    badgeStyles = 'bg-purple-50 text-purple-800 border-purple-200';
    dotColor = 'bg-purple-500';
  } else if (normalized === 'rejected') {
    badgeStyles = 'bg-rose-50 text-rose-800 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (normalized === 'under review') {
    badgeStyles = 'bg-indigo-50 text-indigo-800 border-indigo-200';
    dotColor = 'bg-indigo-500';
  } else if (normalized === 'high' || normalized === 'urgent') {
    badgeStyles = 'bg-red-50 text-red-700 border-red-200 font-semibold';
    dotColor = 'bg-red-500 animate-ping';
  } else if (normalized === 'medium') {
    badgeStyles = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-400';
  } else if (normalized === 'low') {
    badgeStyles = 'bg-slate-100 text-slate-700 border-slate-200';
    dotColor = 'bg-slate-400';
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3.5 py-1.5 text-sm font-medium' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-xs transition-colors ${sizeClass} ${badgeStyles}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;

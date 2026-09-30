import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'green', subtitle, trend, onClick }) => {
  const colorMap = {
    green: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'hover:border-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-700'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'hover:border-amber-300',
      iconBg: 'bg-amber-100 text-amber-700'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'hover:border-blue-300',
      iconBg: 'bg-blue-100 text-blue-700'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'hover:border-purple-300',
      iconBg: 'bg-purple-100 text-purple-700'
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'hover:border-rose-300',
      iconBg: 'bg-rose-100 text-rose-700'
    },
    slate: {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'hover:border-slate-300',
      iconBg: 'bg-slate-100 text-slate-700'
    }
  };

  const scheme = colorMap[color] || colorMap.green;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${scheme.border} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{value}</h3>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <span>↑ {trend}</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${scheme.iconBg}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${color}-500/20 to-transparent`} />
    </div>
  );
};

export default StatCard;

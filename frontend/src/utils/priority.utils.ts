import { Priority } from '../types/task.types';

export const PRIORITY_CONFIG: Record<Priority, { label: string; badgeClass: string; borderClass: string; }> = {
  low: {
    label: 'Baja',
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
    borderClass: 'border-l-slate-400',
  },
  medium: {
    label: 'Media',
    badgeClass: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    borderClass: 'border-l-indigo-400',
  },
  high: {
    label: 'Alta',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    borderClass: 'border-l-amber-400',
  },
  critical: {
    label: 'Crítica',
    badgeClass: 'bg-red-50 text-red-700 border border-red-200',
    borderClass: 'border-l-red-400',
  },
};
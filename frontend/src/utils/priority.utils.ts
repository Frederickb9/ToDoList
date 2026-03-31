import { Priority } from '../types/task.types';

interface PriorityConfig {
  label: string;
  badgeClass: string;
  borderClass: string;
  dotClass: string;
  bgClass: string;
}

export const PRIORITY_CONFIG: Record<Priority, PriorityConfig> = {
  low: {
    label: 'Baja',
    badgeClass: 'bg-stone-100 text-stone-500 border border-stone-200',
    borderClass: 'border-l-stone-300',
    dotClass: 'bg-stone-300',
    bgClass: 'bg-stone-50',
  },
  medium: {
    label: 'Media',
    badgeClass: 'bg-sage-50 text-sage-600 border border-sage-200',
    borderClass: 'border-l-sage-300',
    dotClass: 'bg-sage-300',
    bgClass: 'bg-sage-50',
  },
  high: {
    label: 'Alta',
    badgeClass: 'bg-amber-50 text-amber-600 border border-amber-200',
    borderClass: 'border-l-amber-300',
    dotClass: 'bg-amber-300',
    bgClass: 'bg-amber-50',
  },
  critical: {
    label: 'Crítica',
    badgeClass: 'bg-rose-50 text-rose-500 border border-rose-200',
    borderClass: 'border-l-rose-300',
    dotClass: 'bg-rose-300',
    bgClass: 'bg-rose-50',
  },
};
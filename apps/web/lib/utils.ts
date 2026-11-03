import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(num);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    PENDING: 'badge-pending',
    CONFIRMED: 'badge-confirmed',
    PROCESSING: 'badge-processing',
    SCHEDULED: 'badge-processing',
    OUT_FOR_DELIVERY: 'badge-processing',
    DELIVERED: 'badge-delivered',
    FAILED: 'badge-failed',
    CANCELLED: 'badge-failed',
    APPROVED: 'badge-delivered',
    REJECTED: 'badge-failed',
    DRAFT: 'badge-pending',
    SENT: 'badge-confirmed',
    ACCEPTED: 'badge-delivered',
    ACTIVE: 'badge-delivered',
    PAUSED: 'badge-pending',
    PAID: 'badge-delivered',
    OVERDUE: 'badge-failed',
    PARTIAL: 'badge-pending',
  };
  return map[status] || 'badge-pending';
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '…';
}


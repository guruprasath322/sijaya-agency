'use client';

import React, { useState } from 'react';
import { ShieldAlert, RefreshCw, UserCheck, Clock } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function AuditLogsPage() {
  const [logs] = useState([
    {
      id: 'log-1',
      action: 'LOAD_APPROVED',
      entityType: 'GasLoad',
      entityId: 'LOAD-AGIS-001',
      user: 'manager@sijaya.in',
      details: 'Approved 100x 19kg commercial cylinders to warehouse inventory.',
      timestamp: '2026-11-03T10:15:00Z',
    },
    {
      id: 'log-2',
      action: 'INVENTORY_ADJUSTED',
      entityType: 'Inventory',
      entityId: 'CYLINDER_14KG',
      user: 'admin@sijaya.in',
      details: 'Manual audit reconciliation: +2 cylinders.',
      timestamp: '2026-11-02T16:30:00Z',
    },
    {
      id: 'log-3',
      action: 'ORDER_STATUS_CHANGED',
      entityType: 'Order',
      entityId: 'ORD-1094',
      user: 'manager@sijaya.in',
      details: 'Status changed from PENDING to CONFIRMED.',
      timestamp: '2026-11-01T09:20:00Z',
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Security Audit Logs</h1>
        <p className="text-xs text-slate-500 mt-0.5">Immutable record of high-privilege operational adjustments and inventory ledger updates</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Security Action</th>
                <th>Entity Target</th>
                <th>Actor User</th>
                <th>Audit Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="text-xs text-slate-500">{formatDateTime(log.timestamp)}</td>
                  <td>
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="text-xs text-slate-700 font-mono">{log.entityType} ({log.entityId})</td>
                  <td className="text-xs text-[#176B9B] font-semibold">{log.user}</td>
                  <td className="text-xs text-slate-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


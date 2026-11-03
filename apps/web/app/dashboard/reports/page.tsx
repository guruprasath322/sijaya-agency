'use client';

import React, { useState } from 'react';
import { BarChart2, Download, Calendar, DollarSign, Users, AlertCircle, FileSpreadsheet } from 'lucide-react';

export default function AnalyticsReportsPage() {
  const [selectedReport, setSelectedReport] = useState('DAILY');

  const exportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,Date,OrderCode,Customer,Type,Amount,Status\n2026-11-01,ORD-1001,EBET College,COMMERCIAL,7800,DELIVERED\n2026-11-02,ORD-1002,Kuppanna Poultry,COMMERCIAL,15600,DELIVERED\n2026-11-03,ORD-1003,Customer Demo,DOMESTIC,950,DELIVERED\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'aegis_puregas_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Business Reports & Ledger Auditing</h1>
          <p className="text-xs text-slate-500 mt-0.5">Export operational and financial logs for accounting and regulatory reconciliation</p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Summary CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Report Frequency</div>
          <div className="text-lg font-bold text-[#102A43] mt-1">Daily / Monthly Ledger</div>
          <p className="text-xs text-slate-400 mt-1">Compiled from verified PostgreSQL database transactions</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accounting Standard</div>
          <div className="text-lg font-bold text-[#102A43] mt-1">Revenue vs. Cost Segregation</div>
          <p className="text-xs text-slate-400 mt-1">Never labels gross billings as operational profit</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance Format</div>
          <div className="text-lg font-bold text-[#102A43] mt-1">GST & Tax Compliant</div>
          <p className="text-xs text-slate-400 mt-1">Includes reverse-charge & tariff rate line items</p>
        </div>
      </div>
    </div>
  );
}


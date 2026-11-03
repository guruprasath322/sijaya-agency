'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/shared/AuthContext';
import { customersApi, Customer, CustomerAddress } from '@/lib/api';
import { User, Building, Phone, Mail, MapPin, Plus, Check, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CustomerProfilePage() {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState<Customer | null>(null);
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Address add form
  const [newLabel, setNewLabel] = useState('Home');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('Palani');
  const [newPincode, setNewPincode] = useState('');

  useEffect(() => {
    customersApi.getMe().then((data) => {
      setProfile(data);
      setName(data.name);
      setBusinessName(data.businessName || '');
      setPhone(data.phone);
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    try {
      await customersApi.update(profile.id, {
        name,
        businessName: businessName || undefined,
        phone,
      });
      setSuccess(true);
      await refreshUser();
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Customer Profile & Addresses</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage your account information and saved delivery destinations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Account Details Form */}
        <div className="md:col-span-7 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[#102A43] mb-4">Account Information</h2>

          {success && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Customer Identifier</label>
              <input
                type="text"
                disabled
                value={profile?.customerCode || 'Loading...'}
                className="input-field bg-slate-100 text-slate-500 font-mono text-xs cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field text-xs"
              />
            </div>

            {profile?.customerType === 'COMMERCIAL' && (
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Business / Hotel Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="input-field text-xs"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mobile Contact</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email (Account Username)</label>
              <input
                type="email"
                disabled
                value={profile?.email || user?.email || ''}
                className="input-field bg-slate-100 text-slate-500 text-xs cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold transition-all"
            >
              {loading ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Right Column: Saved Addresses */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-[#102A43] mb-4">Saved Delivery Locations</h2>

            {profile?.addresses && profile.addresses.length > 0 ? (
              <div className="space-y-3">
                {profile.addresses.map((addr) => (
                  <div key={addr.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#176B9B]">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          DEFAULT
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700">{addr.addressLine1}</p>
                    <p className="text-slate-500">{addr.city}, {addr.state} {addr.pincode}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No delivery addresses registered yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


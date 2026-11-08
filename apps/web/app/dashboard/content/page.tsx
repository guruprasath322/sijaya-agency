'use client';

import React, { useState, useEffect } from 'react';
import { contentApi, WebsiteContent } from '@/lib/api';
import { Sliders, Save, CheckCircle2, RefreshCw, AlertCircle, Phone, MapPin, Mail, MessageSquare } from 'lucide-react';

export default function WebsiteContentCMSPage() {
  const [heroHeadline, setHeroHeadline] = useState('Reliable Gas Supply. Smarter Business.');
  const [heroDesc, setHeroDesc] = useState(
    'Dependable LPG solutions for homes, businesses and industries — powered by reliable supply and smarter distribution.'
  );
  const [aboutText, setAboutText] = useState(
    'SIJAYA Agency is a trusted LPG gas distribution agency supplying domestic, commercial and bulk LPG to homes, businesses and institutions.'
  );
  const [address, setAddress] = useState('[Business Address — To Be Updated in Settings]');
  const [phone, setPhone] = useState('[Phone Number — To Be Updated]');
  const [email, setEmail] = useState('sijayaexcorp@gmail.com');
  const [whatsapp, setWhatsapp] = useState('[WhatsApp Number]');
  const [hours, setHours] = useState('Monday–Saturday: 9:00 AM – 6:00 PM');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Load initial content from DB
    contentApi.getAll().then((items) => {
      items.forEach((item) => {
        if (item.key === 'hero' && item.title) {
          setHeroHeadline(item.title);
          if (item.content) setHeroDesc(item.content);
        }
        if (item.key === 'about' && item.content) {
          setAboutText(item.content);
        }
        if (item.key === 'contact' && item.contentJson) {
          const c = item.contentJson as Record<string, string>;
          if (c.address) setAddress(c.address);
          if (c.phone) setPhone(c.phone);
          if (c.email) setEmail(c.email);
          if (c.whatsapp) setWhatsapp(c.whatsapp);
          if (c.businessHours) setHours(c.businessHours);
        }
      });
    }).catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        contentApi.update('hero', {
          title: heroHeadline,
          content: heroDesc,
        }),
        contentApi.update('about', {
          title: 'About SIJAYA Agency',
          content: aboutText,
        }),
        contentApi.update('contact', {
          title: 'Contact SIJAYA Agency',
          contentJson: {
            address,
            phone,
            email,
            whatsapp,
            businessHours: hours,
          },
        }),
      ]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Website content</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify public landing page headlines, business contacts, and operational claims without changing code
          </p>
        </div>

        {success && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Content Saved & Live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hero Section Content Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#102A43] border-b border-slate-100 pb-3">
            1. Hero Section Content
          </h2>

          <div>
            <label htmlFor="content-field-1" className="block text-sm font-medium text-slate-700 mb-1">Hero Main Headline</label>
            <input id="content-field-1"
              type="text"
              required
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label htmlFor="content-field-2" className="block text-sm font-medium text-slate-700 mb-1">Hero Supporting Description</label>
            <textarea id="content-field-2"
              rows={3}
              required
              value={heroDesc}
              onChange={(e) => setHeroDesc(e.target.value)}
              className="input-field text-sm resize-none"
            />
          </div>
        </div>

        {/* About Section Content Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#102A43] border-b border-slate-100 pb-3">
            2. About Agency Story
          </h2>

          <div>
            <label htmlFor="content-field-3" className="block text-sm font-medium text-slate-700 mb-1">Agency Overview Text</label>
            <textarea id="content-field-3"
              rows={4}
              required
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              className="input-field text-sm resize-none"
            />
          </div>
        </div>

        {/* Business Contact Details Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#102A43] border-b border-slate-100 pb-3">
            3. Business Contact Information
          </h2>

          <div>
            <label htmlFor="content-field-4" className="block text-sm font-medium text-slate-700 mb-1">Depot / Office Physical Address</label>
            <input id="content-field-4"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="content-field-5" className="block text-sm font-medium text-slate-700 mb-1">Official Contact Phone</label>
              <input id="content-field-5"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field text-sm"
              />
            </div>

            <div>
              <label htmlFor="content-field-6" className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Ordering Number</label>
              <input id="content-field-6"
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="input-field text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="content-field-7" className="block text-sm font-medium text-slate-700 mb-1">Official Email Address</label>
              <input id="content-field-7"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field text-sm"
              />
            </div>

            <div>
              <label htmlFor="content-field-8" className="block text-sm font-medium text-slate-700 mb-1">Operating Business Hours</label>
              <input id="content-field-8"
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="input-field text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing Updates...' : 'Publish Content Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

